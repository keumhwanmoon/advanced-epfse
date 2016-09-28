/*
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 메뉴 Service Implements
    - 최초작성일 : 2014-05-02
    - 작  성  자 : 문금환
    - 비      고 :
--------------------------------------------------------------------------------
*/
package com.ecosian.epfse.menuauth.menu.svc.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.interceptor.TransactionAspectSupport;

import com.ecosian.epfse.menuauth.auth.dao.MenuAuthDAO;
import com.ecosian.epfse.menuauth.menu.dao.MenuDAO;
import com.ecosian.epfse.menuauth.menu.dao.MenuNameDAO;
import com.ecosian.epfse.menuauth.auth.dao.vo.MenuAuthVO;
import com.ecosian.epfse.menuauth.menu.dao.vo.MenuNameVO;
import com.ecosian.epfse.menuauth.menu.dao.vo.MenuVO;
import com.ecosian.epfse.menuauth.menu.svc.MenuService;
import com.ecosian.epfse.system.common.Base;
import com.ecosian.epfse.system.common.Channel;

@Service("menuService")
public class MenuServiceImpl implements MenuService
{
    @Resource(name = "menuOra") // 해당 beanName 과 일치하는 bean 을 가져온다.
    private MenuDAO dao;
    @Resource(name = "menuAuthOra") // 해당 beanName 과 일치하는 bean 을 가져온다.
    private MenuAuthDAO daoMenuAuth;
    @Resource(name = "menuNameOra") // 해당 beanName 과 일치하는 bean 을 가져온다.
    private MenuNameDAO daoMenuName;

    public Channel getTreeList(MenuVO vo)
    {
        Channel chn = new Channel(); chn.setRsltList(dao.getTreeList(vo));
        return chn;
    }

    public Channel getInfo(MenuVO vo)
    {
        Channel chn = new Channel(); chn.setRsltInfo(dao.getInfo(vo));
        return chn;
    }

    @Transactional // cf.) Exception 이 throw 면 Rollback 된다.
    public Channel rgstInfo(MenuVO vo)
    {
        Channel chn = new Channel();

        int intRow = dao.rgstInfo(vo);

        vo.setRowId(dao.getRowId(vo));

        chn.setRsltInfo(vo);
        chn.setRsltNo( 0 >= intRow ? Base.NO_DATA : Base.OK ); // 데이터없음 // OK

        // OK 가 아닌 경우 Transaction 이 COMMIT 되지 않도록 설정한다.
        if ( Base.OK != chn.getRsltNo() )
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();

        return chn;
    }

    @Transactional // cf.) Exception 이 throw 면 Rollback 된다.
    public Channel updtInfo(MenuVO vo, MenuNameVO voMenuName, MenuAuthVO voMenuAuth)
    {
        Channel chn = new Channel();

        // 1. 중복여부를 검증한다.
        if ( Base.YES.equals(dao.getDupYn(vo)) ) // 중복여부 검증
        {
            chn.setRsltNo(Base.DATA_DUP); // 데이터 중복
        } else
        if ( Base.YES.equals(dao.getAddrDupYn(vo)) ) // 주소중복여부 검증
        {
            chn.setRsltNo(-3); // 주소중복
        } else
        {
            // 2. 메뉴명을 저장한다.
            int intRow = daoMenuName.updtInfo(voMenuName);
            if ( 0 >= intRow ) intRow = daoMenuName.rgstInfo(voMenuName);

            // 3. 메뉴권한을 수정한다.
            if ( !vo.getMenuNo().equals(vo.getRowId()) ) daoMenuAuth.updtMenuInfo(voMenuAuth);

            // 4. 부모메뉴번호를 수정한다.
            if ( !vo.getMenuNo().equals(vo.getRowId()) ) dao.updtPrntsMenuNoInfo(vo);

            // 8. 메뉴를 수정한다.
            if ( 0 < intRow )
            {
                intRow = dao.updtInfo(vo);

                vo.setRowId(vo.getMenuNo());

                chn.setRsltInfo(vo);
            }

            chn.setRsltNo( 0 >= intRow ? Base.NO_DATA : Base.OK ); // 데이터없음 // OK

            // 9. 사용가능한 ROOT 수가 하나인지 검증한다.
            if ( 0 < intRow && 1 < Base.strToInt(dao.getRootCount(vo)) ) chn.setRsltNo(-1); // ROOT중복
        }

        // OK 가 아닌 경우 Transaction 이 COMMIT 되지 않도록 설정한다.
        if ( Base.OK != chn.getRsltNo() )
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();

        return chn;
    }

    @Transactional // cf.) Exception 이 throw 면 Rollback 된다.
    public Channel deltInfo(MenuVO vo, MenuNameVO voMenuName, MenuAuthVO voMenuAuth)
    {
        Channel chn = new Channel();

        final String PRNTS_MENU_NO = dao.getPrntsRowId(vo); // 부모메뉴번호를 조회한다.

        daoMenuName.deltInfo(voMenuName); // 메뉴명을 삭제한다.
        daoMenuAuth.deltMenuInfo(voMenuAuth); // 메뉴권한을 삭제한다.

        // 메뉴를 삭제한다.
        chn.setRsltNo( 0 >= dao.deltInfo(vo) ? Base.NO_DATA : Base.OK ); // 데이터없음 // OK

        vo.setRowId(PRNTS_MENU_NO); chn.setRsltInfo(vo);

        return chn;
    }
}