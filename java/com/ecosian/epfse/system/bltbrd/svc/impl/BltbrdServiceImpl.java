/*
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 게시판 Service Implements
    - 최초작성일 : 2014-06-30
    - 작  성  자 : 문금환
    - 비      고 :
--------------------------------------------------------------------------------
*/
package com.ecosian.epfse.system.bltbrd.svc.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.interceptor.TransactionAspectSupport;

import com.ecosian.epfse.system.bltbrd.dao.BltbrdDAO;
import com.ecosian.epfse.system.bltn.dao.BltnDAO;
import com.ecosian.epfse.system.bltbrd.dao.vo.BltbrdVO;
import com.ecosian.epfse.system.bltn.dao.vo.BltnVO;
import com.ecosian.epfse.system.bltbrd.svc.BltbrdService;
import com.ecosian.epfse.system.common.Base;
import com.ecosian.epfse.system.common.Channel;

@Service("bltbrdService")
public class BltbrdServiceImpl implements BltbrdService
{
    @Resource(name = "bltbrdOra") // 해당 beanName 과 일치하는 bean 을 가져온다.
    private BltbrdDAO dao;
    @Resource(name = "bltnOra") // 해당 beanName 과 일치하는 bean 을 가져온다.
    private BltnDAO daoBltn;

    public Channel getList(BltbrdVO vo)
    {
        Channel chn = new Channel(); chn.setRsltList(dao.getList(vo));
        return chn;
    }

    public Channel getInfo(BltbrdVO vo)
    {
        Channel chn = new Channel(); chn.setRsltInfo(dao.getInfo(vo));
        return chn;
    }

    @Transactional // cf.) Exception 이 throw 면 Rollback 된다.
    public Channel saveList(BltbrdVO vo)
    {
        Channel chn = new Channel();

        String[] arrBltbrdNameList   =   vo.getBltbrdName().split(Base.DELI12, -1);
        String[] arrTitleItemIdList  =  vo.getTitleItemId().split(Base.DELI12, -1);
        String[] arrTitleItemId2List = vo.getTitleItemId2().split(Base.DELI12, -1);
        String[] arrCttsItemIdList   =   vo.getCttsItemId().split(Base.DELI12, -1);
        String[] arrQstnBltbrdYnList = vo.getQstnBltbrdYn().split(Base.DELI12, -1);
        String[] arrAscInqrYnList    =    vo.getAscInqrYn().split(Base.DELI12, -1);
        String[] arrRowIdList        =        vo.getRowId().split(Base.DELI12, -1);
        String[] arrGridRowIdList    =    vo.getGridRowId().split(Base.DELI12, -1);

        final int LNGTH = arrRowIdList.length;

        for ( int intIndex = 0 ; intIndex < LNGTH ; intIndex++ )
        {
              vo.setBltbrdName(  arrBltbrdNameList[intIndex]);
             vo.setTitleItemId( arrTitleItemIdList[intIndex]);
            vo.setTitleItemId2(arrTitleItemId2List[intIndex]);
              vo.setCttsItemId(  arrCttsItemIdList[intIndex]);
            vo.setQstnBltbrdYn(arrQstnBltbrdYnList[intIndex]);
               vo.setAscInqrYn(   arrAscInqrYnList[intIndex]);
                   vo.setRowId(       arrRowIdList[intIndex]);

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

        arrGridRowIdList = arrRowIdList = arrAscInqrYnList = arrQstnBltbrdYnList = arrCttsItemIdList = arrTitleItemId2List = arrTitleItemIdList = arrBltbrdNameList = null;

        return chn;
    }

    public Channel deltList(BltbrdVO vo, BltnVO voBltn)
    {
        Channel chn = new Channel();

        if ( !Base.isEmpty(vo.getRowId()) )
        {
            if ( Base.YES.equals(daoBltn.getExistYn(voBltn)) ) // 게시물 존재여부 검증
            {
                chn.setRsltNo(-1); // 게시물존재
            } else
            {
                dao.deltList(vo); chn.setRsltNo(Base.OK); // OK
            }
        }

        return chn;
    }
}