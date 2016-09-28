/*
--------------------------------------------------------------------------------
    PROJECT NAME : ES-MRV3
--------------------------------------------------------------------------------
    - 단위업무명 : 공지사항 Service Implements
    - 최초작성일 : 2014-09-18
    - 작  성  자 : 이승윤
    - 비      고 :
--------------------------------------------------------------------------------
*/
package com.ecosian.epfse.system.noti.svc.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.interceptor.TransactionAspectSupport;

import com.ecosian.epfse.system.common.Base;
import com.ecosian.epfse.system.common.Channel;
import com.ecosian.epfse.system.noti.dao.NotiAttchDAO;
import com.ecosian.epfse.system.noti.dao.NotiDAO;
import com.ecosian.epfse.system.noti.dao.vo.NotiAttchVO;
import com.ecosian.epfse.system.noti.dao.vo.NotiVO;
import com.ecosian.epfse.system.noti.svc.NotiService;

@Service("notiService")
public class NotiServiceImpl implements NotiService
{
    @Resource(name = "notiOra") // 해당 beanName 과 일치하는 bean 을 가져온다.
    private NotiDAO dao;
    @Resource(name = "notiAttchOra")
    private NotiAttchDAO daoNotiAttch;

    public Channel getList(NotiVO vo)
    {
        Channel chn = new Channel(); chn.setRsltList(dao.getList(vo));
        return chn;
    }

    public Channel getInfo(NotiVO vo)
    {
        if ( !Base.NO.equals(vo.getInqrCountUpdtYn()) ) dao.updtInqrCount(vo);

        Channel chn = new Channel(); chn.setRsltInfo(dao.getInfo(vo));
        return chn;
    }

    @Transactional // cf.) Exception 이 throw 면 Rollback 된다.
    public Channel saveInfo(NotiVO vo, NotiAttchVO voNotiAttch)
    {
        Channel chn = new Channel();

        int intRow = 0;

        if ( Base.isEmpty(vo.getRowId()) )
        {
            intRow = dao.rgstInfo(vo);

            vo.setRowId(dao.getRowId(vo));
            chn.setRsltInfo(vo);
            chn.setRsltNo( 0 >= intRow ? Base.NO_DATA : Base.OK ); // 데이터없음 // OK
        } else
        if ( !Base.YES.equals(dao.getEditPsbleYn(vo)) ) // 편집가능여부 검증
        {
            chn.setRsltNo(-1); // 편집권한없음
        } else
        {
            intRow = dao.updtInfo(vo);

            chn.setRsltInfo(vo);
            chn.setRsltNo( 0 >= intRow ? Base.NO_DATA : Base.OK ); // 데이터없음 // OK
        }

        // 첨부 목록을 저장한다.
        if ( 0 < intRow )
        {
            voNotiAttch.setRowId(vo.getRowId()); // 행ID
            daoNotiAttch.deltList(voNotiAttch);
            if ( !Base.isEmpty(voNotiAttch.getRowIdList()) ) daoNotiAttch.rgstList(voNotiAttch);
        }

        // OK 가 아닌 경우 Transaction 이 COMMIT 되지 않도록 설정한다.
        if ( Base.OK != chn.getRsltNo() )
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();

        return chn;
    }

    public Channel deltInfo(NotiVO vo, NotiAttchVO voNotiAttch)
    {
        Channel chn = new Channel();

        if ( !Base.YES.equals(dao.getEditPsbleYn(vo)) ) // 편집가능여부 검증
        {
            chn.setRsltNo(-1); // 편집권한없음
        } else
        {
            // 첨부 목록을 삭제한다.
            daoNotiAttch.deltList(voNotiAttch);

            chn.setRsltNo( 0 >= dao.deltInfo(vo) ? Base.NO_DATA : Base.OK ); // 데이터없음 // OK
        }

        // OK 가 아닌 경우 Transaction 이 COMMIT 되지 않도록 설정한다.
        if ( Base.OK != chn.getRsltNo() )
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();

        return chn;
    }
}