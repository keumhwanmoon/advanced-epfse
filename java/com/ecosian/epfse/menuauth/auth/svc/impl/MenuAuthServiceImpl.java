/*
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 메뉴권한 Service Implements
    - 최초작성일 : 2014-05-12
    - 작  성  자 : 문금환
    - 비      고 :
--------------------------------------------------------------------------------
*/
package com.ecosian.epfse.menuauth.auth.svc.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.interceptor.TransactionAspectSupport;

import com.ecosian.epfse.menuauth.auth.dao.MenuAuthDAO;
import com.ecosian.epfse.menuauth.auth.dao.vo.MenuAuthVO;
import com.ecosian.epfse.menuauth.auth.svc.MenuAuthService;
import com.ecosian.epfse.system.common.Base;
import com.ecosian.epfse.system.common.Channel;

@Service("menuAuthService")
public class MenuAuthServiceImpl implements MenuAuthService
{
    @Resource(name = "menuAuthOra") // 해당 beanName 과 일치하는 bean 을 가져온다.
    private MenuAuthDAO dao;

    public Channel getList(MenuAuthVO vo)
    {
        Channel chn = new Channel(); chn.setRsltList(dao.getList(vo));
        return chn;
    }

    public Channel getInfo(MenuAuthVO vo)
    {
        Channel chn = new Channel(); chn.setRsltInfo(dao.getInfo(vo));
        return chn;
    }

    @Transactional // cf.) Exception 이 throw 면 Rollback 된다.
    public Channel saveList(MenuAuthVO vo)
    {
        Channel chn = new Channel();

        int intRow = 0;
        int intRow2 = 0;

        if ( Base.isEmpty(vo.getAuthCode()) ) // 권한코드가 N/A 인 경우..
        {
            intRow = dao.deltList(vo);
        } else
        {
            intRow  = dao.updtList(vo);
            intRow2 = dao.rgstList(vo);
        }

        chn.setRsltNo( 0 >= intRow && 0 >= intRow2 ? Base.NO_DATA : Base.OK ); // 데이터없음 // OK

        // OK 가 아닌 경우 Transaction 이 COMMIT 되지 않도록 설정한다.
        if ( Base.OK != chn.getRsltNo() )
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();

        return chn;
    }
}