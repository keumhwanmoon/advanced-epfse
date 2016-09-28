/*
--------------------------------------------------------------------------------
    PROJECT NAME : ES-MRV3
--------------------------------------------------------------------------------
    - 단위업무명 : Q&A답변 Service Implements
    - 최초작성일 : 2014-09-18
    - 작  성  자 : 이승윤
    - 비      고 :
--------------------------------------------------------------------------------
*/
package com.ecosian.epfse.system.qna.svc.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.interceptor.TransactionAspectSupport;

import com.ecosian.epfse.system.common.Base;
import com.ecosian.epfse.system.common.Channel;
import com.ecosian.epfse.system.qna.dao.QnaAnswrDAO;
import com.ecosian.epfse.system.qna.dao.QnaDAO;
import com.ecosian.epfse.system.qna.dao.vo.QnaAnswrVO;
import com.ecosian.epfse.system.qna.dao.vo.QnaVO;
import com.ecosian.epfse.system.qna.svc.QnaAnswrService;

@Service("qnaAnswrService")
public class QnaAnswrServiceImpl implements QnaAnswrService
{
    @Resource(name = "qnaAnswrOra") // 해당 beanName 과 일치하는 bean 을 가져온다.
    private QnaAnswrDAO dao;
    @Resource(name = "qnaOra")
    private QnaDAO daoQna;

    @Transactional // cf.) Exception 이 throw 면 Rollback 된다.
    public Channel saveInfo(QnaAnswrVO vo, QnaVO voQna)
    {
        Channel chn = new Channel();

        int intRow = 0;

        if ( Base.isEmpty(vo.getRowId()) )
        {
            intRow = dao.rgstInfo(vo);

            chn.setRsltInfo(vo);
            chn.setRsltNo( 0 >= intRow ? Base.NO_DATA : Base.OK ); // 데이터없음 // OK
        } else
        if ( !Base.YES.equals(daoQna.getEditPsbleYn(voQna)) ) // 편집가능여부 검증
        {
            chn.setRsltNo(-1); // 편집권한없음
        }
        else
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

    public Channel deltInfo(QnaAnswrVO vo, QnaVO voQna)
    {
        Channel chn = new Channel();

        if ( !Base.YES.equals(daoQna.getEditPsbleYn(voQna)) ) // 편집가능여부 검증
        {
            chn.setRsltNo(-1); // 편집권한없음
        } else
        {
            chn.setRsltNo( 0 >= dao.deltInfo(vo) ? Base.NO_DATA : Base.OK ); // 데이터없음 // OK
        }

        return chn;
    }
}