/*
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 사용자 Service Implements
    - 최초작성일 : 2014-06-25
    - 작  성  자 : 문금환
    - 비      고 :
--------------------------------------------------------------------------------
*/
package com.ecosian.epfse.member.user.svc.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.interceptor.TransactionAspectSupport;

import com.ecosian.epfse.member.auth.dao.UserAuthDAO;
import com.ecosian.epfse.member.user.dao.UserDAO;
import com.ecosian.epfse.member.auth.dao.vo.UserAuthVO;
import com.ecosian.epfse.member.user.dao.vo.UserVO;
import com.ecosian.epfse.member.user.svc.UserService;
import com.ecosian.epfse.system.common.Base;
import com.ecosian.epfse.system.common.Channel;

@Service("userService")
public class UserServiceImpl implements UserService
{
    @Resource(name = "userOra") // 해당 beanName 과 일치하는 bean 을 가져온다.
    private UserDAO dao;
    @Resource(name = "userAuthOra") // 해당 beanName 과 일치하는 bean 을 가져온다.
    private UserAuthDAO daoUserAuth;

    public Channel getList(UserVO vo)
    {
        Channel chn = new Channel(); chn.setRsltList(dao.getList(vo));

        return chn;
    }

    public Channel getAuthRgstTargList(UserVO vo)
    {
        Channel chn = new Channel(); chn.setRsltList(dao.getAuthRgstTargList(vo));

        return chn;
    }

    @Transactional // cf.) Exception 이 throw 면 Rollback 된다.
    public Channel saveList(UserVO vo, UserAuthVO voUserAuth)
    {
        Channel chn = new Channel();

        String[] arrUserIdList     =     vo.getUserId().split(Base.DELI12, -1);
        String[] arrUserNameList   =   vo.getUserName().split(Base.DELI12, -1);
        String[] arrPwdNameList    =    vo.getPwdName().split(Base.DELI12, -1);
        String[] arrUseYnList      =      vo.getUseYn().split(Base.DELI12, -1);
        String[] arrAdminYnList    =    vo.getAdminYn().split(Base.DELI12, -1);
        String[] arrLangCodeList   =   vo.getLangCode().split(Base.DELI12, -1);
        String[] arrRowIdList      =      vo.getRowId().split(Base.DELI12, -1);
        String[] arrGridRowIdList  =  vo.getGridRowId().split(Base.DELI12, -1);

        final int LNGTH = arrRowIdList.length;

        for ( int intIndex = 0 ; intIndex < LNGTH ; intIndex++ )
        {
                vo.setUserId(    arrUserIdList[intIndex]);
              vo.setUserName(  arrUserNameList[intIndex]);
               vo.setPwdName(   arrPwdNameList[intIndex]);
                 vo.setUseYn(     arrUseYnList[intIndex]);
               vo.setAdminYn(   arrAdminYnList[intIndex]);
              vo.setLangCode(  arrLangCodeList[intIndex]);
                 vo.setRowId(     arrRowIdList[intIndex]);

            if ( !vo.getUserId().equals(vo.getRowId()) ) // PK 를 변경하는 경우..
                daoUserAuth.updtUserInfo(voUserAuth); // 사용자권한을 수정한다.

            // 비밀번호를 암호화한다.
            final String PWD_NAME = vo.getPwdName(); // 비밀번호
            if ( !Base.isEmpty(PWD_NAME) ) vo.setPwdName(Base.getHash(PWD_NAME));

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

        // 사용중인 관리자 계정이 존재하지 않는 경우..
        if ( Base.OK == chn.getRsltNo() && !Base.YES.equals(dao.getAdminExistYn(vo)) )
        {
            chn.setRsltNo(-1); // 관리자없음
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
            vo.setGridRowId(arrGridRowIdList[0]); chn.setRsltInfo(vo);
        }

        arrGridRowIdList = arrRowIdList = arrLangCodeList = arrAdminYnList = arrUseYnList = arrPwdNameList = arrUserNameList = arrUserIdList = null;

        return chn;
    }

    @Transactional // cf.) Exception 이 throw 면 Rollback 된다.
    public Channel deltList(UserVO vo, UserAuthVO voUserAuth)
    {
        Channel chn = new Channel();

        if ( !Base.isEmpty(vo.getRowId()) )
        {
            daoUserAuth.deltUserList(voUserAuth); // 사용자권한을 삭제한다.
            dao.deltList(vo);
        }

        chn.setRsltNo(Base.OK); // OK

        // 사용중인 관리자 계정이 존재하지 않는 경우..
        if ( !Base.YES.equals(dao.getAdminExistYn(vo)) ) chn.setRsltNo(-1); // 관리자없음

        // OK 가 아닌 경우 Transaction 이 COMMIT 되지 않도록 설정한다.
        if ( Base.OK != chn.getRsltNo() )
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();

        return chn;
    }
}