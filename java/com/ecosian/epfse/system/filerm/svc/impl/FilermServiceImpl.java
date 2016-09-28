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
package com.ecosian.epfse.system.filerm.svc.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.interceptor.TransactionAspectSupport;

import com.ecosian.epfse.system.common.Base;
import com.ecosian.epfse.system.common.Channel;
import com.ecosian.epfse.system.filerm.dao.FilermAttchDAO;
import com.ecosian.epfse.system.filerm.dao.FilermDAO;
import com.ecosian.epfse.system.filerm.dao.vo.FilermAttchVO;
import com.ecosian.epfse.system.filerm.dao.vo.FilermVO;
import com.ecosian.epfse.system.filerm.svc.FilermService;

@Service("filermService")
public class FilermServiceImpl implements FilermService
{
    @Resource(name = "filermOra") // 해당 beanName 과 일치하는 bean 을 가져온다.
    private FilermDAO dao;
    @Resource(name = "filermAttchOra")
    private FilermAttchDAO daoFilermAttch;

    public Channel getList(FilermVO vo)
    {
        Channel chn = new Channel(); chn.setRsltList(dao.getList(vo));
        return chn;
    }

    public Channel getInfo(FilermVO vo)
    {
        if ( !Base.NO.equals(vo.getInqrCountUpdtYn()) ) dao.updtInqrCountInfo(vo);

        Channel chn = new Channel(); chn.setRsltInfo(dao.getInfo(vo));
        return chn;
    }

    @Transactional // cf.) Exception 이 throw 면 Rollback 된다.
    public Channel saveInfo(FilermVO vo, FilermAttchVO voFilermAttch)
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
            voFilermAttch.setRowId(vo.getRowId()); // 행ID
            daoFilermAttch.deltList(voFilermAttch);
            if ( !Base.isEmpty(voFilermAttch.getRowIdList()) ) daoFilermAttch.rgstList(voFilermAttch);
        }

        // OK 가 아닌 경우 Transaction 이 COMMIT 되지 않도록 설정한다.
        if ( Base.OK != chn.getRsltNo() )
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();

        return chn;
    }

    public Channel deltInfo(FilermVO vo, FilermAttchVO voFilermAttch)
    {
        Channel chn = new Channel();

        if ( !Base.YES.equals(dao.getEditPsbleYn(vo)) ) // 편집가능여부 검증
        {
            chn.setRsltNo(-1); // 편집권한없음
        } else
        {
            // 첨부 목록을 삭제한다.
            daoFilermAttch.deltList(voFilermAttch);

            chn.setRsltNo( 0 >= dao.deltInfo(vo) ? Base.NO_DATA : Base.OK ); // 데이터없음 // OK
        }

        // OK 가 아닌 경우 Transaction 이 COMMIT 되지 않도록 설정한다.
        if ( Base.OK != chn.getRsltNo() )
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();

        return chn;
    }
}