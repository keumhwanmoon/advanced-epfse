/*
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 첨부 Service Implements
    - 최초작성일 : 2014-05-15
    - 작  성  자 : 문금환
    - 비      고 :
--------------------------------------------------------------------------------
*/
package com.ecosian.epfse.system.common.svc.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.interceptor.TransactionAspectSupport;

import com.ecosian.epfse.system.common.dao.AttchDAO;
import com.ecosian.epfse.system.common.dao.vo.AttchVO;
import com.ecosian.epfse.system.common.svc.AttchService;
import com.ecosian.epfse.system.common.Base;
import com.ecosian.epfse.system.common.Channel;

@Service("attchService")
public class AttchServiceImpl implements AttchService
{
    @Resource(name = "attchOra") // 해당 beanName 과 일치하는 bean 을 가져온다.
    private AttchDAO dao;

    public Channel getInfo(AttchVO vo)
    {
        Channel chn = new Channel(); chn.setRsltInfo(dao.getInfo(vo));
        return chn;
    }

    @Transactional // cf.) Exception 이 throw 면 Rollback 된다.
    public Channel rgstInfo(AttchVO vo)
    {
        Channel chn = new Channel();

        int intRow = 0;

        if ( Base.YES.equals(dao.getDupYn(vo)) ) // 중복여부 검증
        {
            chn.setRsltNo(Base.DATA_DUP); // 데이터 중복
        } else
        {
            intRow = dao.rgstInfo(vo);

            vo.setRowId(vo.getAttchId());
            chn.setRsltInfo( 0 >= intRow ? vo : dao.getInfo(vo) );
            chn.setRsltNo( 0 >= intRow ? Base.NO_DATA : Base.OK ); // 데이터없음 // OK
        }

        // OK 가 아닌 경우 Transaction 이 COMMIT 되지 않도록 설정한다.
        if ( Base.OK != chn.getRsltNo() )
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();

        return chn;
    }
}