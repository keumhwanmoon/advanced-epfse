/*
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 권한 Service Implements
    - 최초작성일 : 2014-06-26
    - 작  성  자 : 문금환
    - 비      고 :
--------------------------------------------------------------------------------
*/
package com.ecosian.epfse.menuauth.auth.svc.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.interceptor.TransactionAspectSupport;

import com.ecosian.epfse.member.auth.dao.UserAuthDAO;
import com.ecosian.epfse.menuauth.auth.dao.AuthDAO;
import com.ecosian.epfse.menuauth.auth.dao.MenuAuthDAO;
import com.ecosian.epfse.member.auth.dao.vo.UserAuthVO;
import com.ecosian.epfse.menuauth.auth.dao.vo.AuthVO;
import com.ecosian.epfse.menuauth.auth.dao.vo.MenuAuthVO;
import com.ecosian.epfse.menuauth.auth.svc.AuthService;
import com.ecosian.epfse.system.common.Base;
import com.ecosian.epfse.system.common.Channel;

@Service("authService")
public class AuthServiceImpl implements AuthService
{
    @Resource(name = "authOra") // 해당 beanName 과 일치하는 bean 을 가져온다.
    private AuthDAO dao;
    @Resource(name = "menuAuthOra") // 해당 beanName 과 일치하는 bean 을 가져온다.
    private MenuAuthDAO daoMenuAuth;
    @Resource(name = "userAuthOra") // 해당 beanName 과 일치하는 bean 을 가져온다.
    private UserAuthDAO daoUserAuth;

    public Channel getList(AuthVO vo)
    {
        Channel chn = new Channel(); chn.setRsltList(dao.getList(vo));
        return chn;
    }

    public Channel getComboList(AuthVO vo)
    {
        Channel chn = new Channel(); chn.setRsltList(dao.getComboList(vo));
        return chn;
    }

    @Transactional // cf.) Exception 이 throw 면 Rollback 된다.
    public Channel saveList(AuthVO vo, MenuAuthVO voMenuAuth, UserAuthVO voUserAuth)
    {
        Channel chn = new Channel();

        String[] arrAuthIdList     =     vo.getAuthId().split(Base.DELI12, -1);
        String[] arrAuthNameList   =   vo.getAuthName().split(Base.DELI12, -1);
        String[] arrAnonyYnList    =    vo.getAnonyYn().split(Base.DELI12, -1);
        String[] arrRowIdList      =      vo.getRowId().split(Base.DELI12, -1);
        String[] arrGridRowIdList  =  vo.getGridRowId().split(Base.DELI12, -1);

        final int LNGTH = arrRowIdList.length;

        for ( int intIndex = 0 ; intIndex < LNGTH ; intIndex++ )
        {
                vo.setAuthId(    arrAuthIdList[intIndex]);
              vo.setAuthName(  arrAuthNameList[intIndex]);
               vo.setAnonyYn(   arrAnonyYnList[intIndex]);
                 vo.setRowId(     arrRowIdList[intIndex]);

            if ( !vo.getAuthId().equals(vo.getRowId()) ) // PK 를 변경하는 경우..
            {
                daoMenuAuth.updtAuthInfo(voMenuAuth); // 메뉴권한을 수정한다.
                daoUserAuth.updtAuthInfo(voUserAuth); // 사용자권한을 수정한다.
            }

            if ( Base.YES.equals(dao.getDupYn(vo)) ) // 중복여부 검증
            {
                chn.setRsltNo(Base.DATA_DUP); // 데이터 중복
            } else
            {
                int intRow = 0;

                if ( Base.isEmpty(vo.getRowId()) )
                    intRow = dao.rgstInfo(vo);
                else
                    intRow = dao.updtInfo(vo);

                chn.setRsltNo( 0 >= intRow ? Base.NO_DATA : Base.OK ); // 데이터없음 // OK
            }

            // OK 가 아닌 경우 Transaction 이 COMMIT 되지 않도록 설정한다.
            if ( Base.OK != chn.getRsltNo() )
            {
                TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
                vo.setGridRowId(arrGridRowIdList[intIndex]); chn.setRsltInfo(vo); break;
            }
        }

        arrGridRowIdList = arrRowIdList = arrAnonyYnList = arrAuthNameList = arrAuthIdList = null;

        return chn;
    }

    public Channel deltList(AuthVO vo, MenuAuthVO voMenuAuth, UserAuthVO voUserAuth)
    {
        Channel chn = new Channel();

        if ( !Base.isEmpty(vo.getRowId()) )
        {
            daoMenuAuth.deltAuthList(voMenuAuth); // 메뉴권한을 삭제한다.
            daoUserAuth.deltAuthList(voUserAuth); // 사용자권한을 삭제한다.
            dao.deltList(vo);

            chn.setRsltNo(Base.OK); // OK
        }

        return chn;
    }
}