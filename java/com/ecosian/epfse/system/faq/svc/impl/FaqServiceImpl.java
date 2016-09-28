/*
--------------------------------------------------------------------------------
    PROJECT NAME : ES-MRV3
--------------------------------------------------------------------------------
    - 단위업무명 : FAQ Service Implements
    - 최초작성일 : 2014-09-18
    - 작  성  자 : 이승윤
    - 비      고 :
--------------------------------------------------------------------------------
*/
package com.ecosian.epfse.system.faq.svc.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.interceptor.TransactionAspectSupport;

import com.ecosian.epfse.system.common.Base;
import com.ecosian.epfse.system.common.Channel;
import com.ecosian.epfse.system.faq.dao.FaqDAO;
import com.ecosian.epfse.system.faq.dao.vo.FaqVO;
import com.ecosian.epfse.system.faq.svc.FaqService;

@Service("faqService")
public class FaqServiceImpl implements FaqService
{
    @Resource(name = "faqOra") // 해당 beanName 과 일치하는 bean 을 가져온다.
    private FaqDAO dao;

    public Channel getList(FaqVO vo)
    {
        Channel chn = new Channel(); chn.setRsltList(dao.getList(vo));
        return chn;
    }

    public Channel getBestList(FaqVO vo)
    {
        Channel chn = new Channel(); chn.setRsltList(dao.getBestList(vo));
        return chn;
    }

    public Channel updtInqrCountInfo(FaqVO vo)
    {
        Channel chn = new Channel();

        int intRow = 0;

        intRow = dao.updtInqrCountInfo(vo);

        chn.setRsltNo( 0 >= intRow ? Base.NO_DATA : Base.OK ); // 데이터없음 // OK

        return chn;
    }

    @Transactional // cf.) Exception 이 throw 면 Rollback 된다.
    public Channel saveInfo(FaqVO vo)
    {
        Channel chn = new Channel();

        int intRow = 0;

        if ( Base.isEmpty(vo.getRowId()) )
        {
            intRow = dao.rgstInfo(vo);

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

        // OK 가 아닌 경우 Transaction 이 COMMIT 되지 않도록 설정한다.
        if ( Base.OK != chn.getRsltNo() )
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();

        return chn;
    }

    public Channel deltInfo(FaqVO vo)
    {
        Channel chn = new Channel();

        if ( !Base.YES.equals(dao.getEditPsbleYn(vo)) ) // 편집가능여부 검증
        {
            chn.setRsltNo(-1); // 편집권한없음
        } else
        {
            chn.setRsltNo( 0 >= dao.deltInfo(vo) ? Base.NO_DATA : Base.OK ); // 데이터없음 // OK
        }

        // OK 가 아닌 경우 Transaction 이 COMMIT 되지 않도록 설정한다.
        if ( Base.OK != chn.getRsltNo() )
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();

        return chn;
    }
}