/*
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 표준용어 Service Implements
    - 최초작성일 : 2014-06-13
    - 작  성  자 : 문금환
    - 비      고 :
--------------------------------------------------------------------------------
*/
package com.ecosian.epfse.develop.stdtrm.svc.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.interceptor.TransactionAspectSupport;

import com.ecosian.epfse.develop.stdtrm.dao.StdtrmDAO;
import com.ecosian.epfse.develop.stdtrm.dao.vo.StdtrmVO;
import com.ecosian.epfse.develop.stdtrm.svc.StdtrmService;
import com.ecosian.epfse.system.common.Base;
import com.ecosian.epfse.system.common.Channel;

@Service("stdtrmService")
public class StdtrmServiceImpl implements StdtrmService
{
    @Resource(name = "stdtrmDAO") // 해당 beanName 과 일치하는 bean 을 가져온다.
    private StdtrmDAO dao;

    public Channel getList(StdtrmVO vo)
    {
        Channel chn = new Channel(); chn.setRsltList(dao.getList(vo));
        return chn;
    }

    public Channel getEngInqrList(StdtrmVO vo)
    {
        Channel chn = new Channel(); chn.setRsltList(dao.getEngInqrList(vo));
        return chn;
    }

    public Channel getKrnInqrList(StdtrmVO vo)
    {
        Channel chn = new Channel(); chn.setRsltList(dao.getKrnInqrList(vo));
        return chn;
    }

    public Channel getSaveList()
    {
        Channel chn = new Channel(); chn.setRsltList(dao.getSaveList());
        return chn;
    }

    @Transactional // cf.) Exception 이 throw 면 Rollback 된다.
    public Channel saveList(StdtrmVO vo)
    {
        Channel chn = new Channel();

        String[] arrKrnNameList       =       vo.getKrnName().split(Base.DELI12, -1);
        String[] arrEngNfrmltNameList = vo.getEngNfrmltName().split(Base.DELI12, -1);
        String[] arrEngNameList       =       vo.getEngName().split(Base.DELI12, -1);
        String[] arrPjtNameList       =       vo.getPjtName().split(Base.DELI12, -1);
        String[] arrRowIdList         =         vo.getRowId().split(Base.DELI12, -1);
        String[] arrGridRowIdList     =     vo.getGridRowId().split(Base.DELI12, -1);

        final int LNGTH = arrRowIdList.length;

        for ( int intIndex = 0 ; intIndex < LNGTH ; intIndex++ )
        {
                  vo.setKrnName(      arrKrnNameList[intIndex]);
            vo.setEngNfrmltName(arrEngNfrmltNameList[intIndex]);
                  vo.setEngName(      arrEngNameList[intIndex]);
                  vo.setPjtName(      arrPjtNameList[intIndex]);
                    vo.setRowId(        arrRowIdList[intIndex]);

            if ( Base.YES.equals(dao.getKrnNameDupYn(vo)) ) // 한글명중복여부
            {
                chn.setRsltNo(-1); // 한글명중복
            } else
            if ( Base.YES.equals(dao.getEngNfrmltNameYn(vo)) ) // 영문약식명중복여부
            {
                chn.setRsltNo(-3); // 영문약식명중복
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

        arrGridRowIdList = arrRowIdList = arrEngNameList = arrEngNfrmltNameList = arrKrnNameList = null;

        return chn;
    }

    public Channel deltList(StdtrmVO vo)
    {
        Channel chn = new Channel();

        if ( !Base.isEmpty(vo.getRowId()) ) dao.deltList(vo);

        chn.setRsltNo(Base.OK); // OK

        return chn;
    }
}