/*
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 게시물 Service Implements
    - 최초작성일 : 2014-05-20
    - 작  성  자 : 문금환
    - 비      고 :
--------------------------------------------------------------------------------
*/
package com.ecosian.epfse.system.bltn.svc.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.interceptor.TransactionAspectSupport;

import com.ecosian.epfse.system.bltn.dao.BltnAttchDAO;
import com.ecosian.epfse.system.bltn.dao.BltnDAO;
import com.ecosian.epfse.system.bltn.dao.vo.BltnAttchVO;
import com.ecosian.epfse.system.bltn.dao.vo.BltnVO;
import com.ecosian.epfse.system.bltn.svc.BltnService;
import com.ecosian.epfse.system.common.Base;
import com.ecosian.epfse.system.common.Channel;

@Service("bltnService")
public class BltnServiceImpl implements BltnService
{
    @Resource(name = "bltnOra") // 해당 beanName 과 일치하는 bean 을 가져온다.
    private BltnDAO dao;
    @Resource(name = "bltnAttchOra")
    private BltnAttchDAO daoBltnAttch;

    public Channel getList(BltnVO vo)
    {
        Channel chn = new Channel(); chn.setRsltList(dao.getList(vo));
        return chn;
    }

    public Channel getInfo(BltnVO vo)
    {
        if ( !Base.NO.equals(vo.getInqrCountUpdtYn()) ) dao.updtInqrCountInfo(vo);

        Channel chn = new Channel(); chn.setRsltInfo(dao.getInfo(vo));
        return chn;
    }

    @Transactional // cf.) Exception 이 throw 면 Rollback 된다.
    public Channel saveInfo(BltnVO vo, BltnAttchVO voBltnAttch)
    {
        Channel chn = new Channel();

        int intRow = 0;

        if ( Base.isEmpty(vo.getRowId()) )
        {
            intRow = dao.rgstInfo(vo);

            vo.setRowId(dao.getRowId(vo));

            chn.setRsltInfo(vo);
            chn.setRsltNo( 0 >= intRow ? Base.NO_DATA : Base.OK ); // 데이터없음 // OK
        }
        else
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
            voBltnAttch.setRowId(vo.getRowId()); // 행ID

            daoBltnAttch.deltList(voBltnAttch);

            if ( !Base.isEmpty(voBltnAttch.getRowIdList()) ) daoBltnAttch.rgstList(voBltnAttch);
        }

        // OK 가 아닌 경우 Transaction 이 COMMIT 되지 않도록 설정한다.
        if ( Base.OK != chn.getRsltNo() )
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();

        return chn;
    }

    @Transactional // cf.) Exception 이 throw 면 Rollback 된다.
    public Channel deltInfo(BltnVO vo, BltnAttchVO voBltnAttch)
    {
        Channel chn = new Channel();

        if ( !Base.YES.equals(dao.getEditPsbleYn(vo)) ) // 편집가능여부 검증
        {
            chn.setRsltNo(-1); // 편집권한없음
        } else
        if ( Base.YES.equals(dao.getAnswrExistYn(vo)) ) // 답변존재여부 검증
        {
            chn.setRsltNo(-3); // 답변존재
        } else
        {
            // 첨부 목록을 삭제한다.
            daoBltnAttch.deltList(voBltnAttch);

            chn.setRsltNo( 0 >= dao.deltInfo(vo) ? Base.NO_DATA : Base.OK ); // 데이터없음 // OK
        }

        // OK 가 아닌 경우 Transaction 이 COMMIT 되지 않도록 설정한다.
        if ( Base.OK != chn.getRsltNo() )
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();

        return chn;
    }
}