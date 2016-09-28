/*
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 임시 Service Implements
    - 최초작성일 : 2014-06-24
    - 작  성  자 : 문금환
    - 비      고 :
--------------------------------------------------------------------------------
*/
package com.ecosian.epfse.develop.temp.svc.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.interceptor.TransactionAspectSupport;

import com.ecosian.epfse.develop.temp.dao.TempDAO;
import com.ecosian.epfse.develop.temp.dao.vo.TempVO;
import com.ecosian.epfse.develop.temp.svc.TempService;
import com.ecosian.epfse.system.common.Base;
import com.ecosian.epfse.system.common.Channel;
import com.ecosian.epfse.system.common.dao.vo.StockVO;

@Service("tempService")
public class TempServiceImpl implements TempService
{
    @Resource(name = "tempOra") // 해당 beanName 과 일치하는 bean 을 가져온다.
    private TempDAO dao;

    public Channel getList(TempVO vo)
    {
        Channel chn = new Channel(); chn.setRsltList(dao.getList(vo));
        return chn;
    }

    public Channel getStockList(StockVO vo)
    {
        Channel chn = new Channel(); chn.setRsltList(dao.getStockList(vo));
        return chn;
    }

    @Transactional // cf.) Exception 이 throw 면 Rollback 된다.
    public Channel saveList(TempVO vo)
    {
        Channel chn = new Channel();

        String[] arrId2List         =        vo.getId2().split(Base.DELI12, -1);
        String[] arrIdList          =         vo.getId().split(Base.DELI12, -1);
        String[] arrNameList        =       vo.getName().split(Base.DELI12, -1);
        String[] arrName2List       =      vo.getName2().split(Base.DELI12, -1);
        String[] arrYnList          =         vo.getYn().split(Base.DELI12, -1);
        String[] arrYn2List         =        vo.getYn2().split(Base.DELI12, -1);
        String[] arrCodeList        =       vo.getCode().split(Base.DELI12, -1);
        String[] arrCode2List       =      vo.getCode2().split(Base.DELI12, -1);
        String[] arrYearList        =       vo.getYear().split(Base.DELI12, -1);
        String[] arrYear2List       =      vo.getYear2().split(Base.DELI12, -1);
        String[] arrYmList          =         vo.getYm().split(Base.DELI12, -1);
        String[] arrYm2List         =        vo.getYm2().split(Base.DELI12, -1);
        String[] arrAmtList         =        vo.getAmt().split(Base.DELI12, -1);
        String[] arrAmt2List        =       vo.getAmt2().split(Base.DELI12, -1);
        String[] arrAmtmList        =       vo.getAmtm().split(Base.DELI12, -1);
        String[] arrAmtm2List       =      vo.getAmtm2().split(Base.DELI12, -1);
        String[] arrNoList          =         vo.getNo().split(Base.DELI12, -1);
        String[] arrNo2List         =        vo.getNo2().split(Base.DELI12, -1);
        String[] arrCorpnoList      =     vo.getCorpno().split(Base.DELI12, -1);
        String[] arrCorpno2List     =    vo.getCorpno2().split(Base.DELI12, -1);
        String[] arrBznoList        =       vo.getBzno().split(Base.DELI12, -1);
        String[] arrBzno2List       =      vo.getBzno2().split(Base.DELI12, -1);
        String[] arrCountList       =      vo.getCount().split(Base.DELI12, -1);
        String[] arrCount2List      =     vo.getCount2().split(Base.DELI12, -1);
        String[] arrPostNoList      =     vo.getPostNo().split(Base.DELI12, -1);
        String[] arrPostNo2List     =    vo.getPostNo2().split(Base.DELI12, -1);
        String[] arrRateList        =       vo.getRate().split(Base.DELI12, -1);
        String[] arrRate2List       =      vo.getRate2().split(Base.DELI12, -1);
        String[] arrDate1List       =      vo.getDate1().split(Base.DELI12, -1);
        String[] arrDate2List       =      vo.getDate2().split(Base.DELI12, -1);
        String[] arrTelNoList       =      vo.getTelNo().split(Base.DELI12, -1);
        String[] arrTelNo2List      =     vo.getTelNo2().split(Base.DELI12, -1);
        String[] arrEmailNameList   =  vo.getEmailName().split(Base.DELI12, -1);
        String[] arrEmailName2List  = vo.getEmailName2().split(Base.DELI12, -1);
        String[] arrRowIdList       =      vo.getRowId().split(Base.DELI12, -1);
        String[] arrGridRowIdList   =  vo.getGridRowId().split(Base.DELI12, -1);

        final int LNGTH = arrRowIdList.length;

        for ( int intIndex = 0 ; intIndex < LNGTH ; intIndex++ )
        {
                   vo.setId2(       arrId2List[intIndex]);
                    vo.setId(        arrIdList[intIndex]);
                  vo.setName(      arrNameList[intIndex]);
                 vo.setName2(     arrName2List[intIndex]);
                    vo.setYn(        arrYnList[intIndex]);
                   vo.setYn2(       arrYn2List[intIndex]);
                  vo.setCode(      arrCodeList[intIndex]);
                 vo.setCode2(     arrCode2List[intIndex]);
                  vo.setYear(      arrYearList[intIndex]);
                 vo.setYear2(     arrYear2List[intIndex]);
                    vo.setYm(        arrYmList[intIndex]);
                   vo.setYm2(       arrYm2List[intIndex]);
                   vo.setAmt(       arrAmtList[intIndex]);
                  vo.setAmt2(      arrAmt2List[intIndex]);
                  vo.setAmtm(      arrAmtmList[intIndex]);
                 vo.setAmtm2(     arrAmtm2List[intIndex]);
                    vo.setNo(        arrNoList[intIndex]);
                   vo.setNo2(       arrNo2List[intIndex]);
                vo.setCorpno(    arrCorpnoList[intIndex]);
               vo.setCorpno2(   arrCorpno2List[intIndex]);
                  vo.setBzno(      arrBznoList[intIndex]);
                 vo.setBzno2(     arrBzno2List[intIndex]);
                 vo.setCount(     arrCountList[intIndex]);
                vo.setCount2(    arrCount2List[intIndex]);
                vo.setPostNo(    arrPostNoList[intIndex]);
               vo.setPostNo2(   arrPostNo2List[intIndex]);
                  vo.setRate(      arrRateList[intIndex]);
                 vo.setRate2(     arrRate2List[intIndex]);
                 vo.setDate1(     arrDate1List[intIndex]);
                 vo.setDate2(     arrDate2List[intIndex]);
                 vo.setTelNo(     arrTelNoList[intIndex]);
                vo.setTelNo2(    arrTelNo2List[intIndex]);
             vo.setEmailName( arrEmailNameList[intIndex]);
            vo.setEmailName2(arrEmailName2List[intIndex]);
                 vo.setRowId(     arrRowIdList[intIndex]);

            if ( Base.YES.equals(dao.getDupYn(vo)) ) // 중복여부 검증
            {
                chn.setRsltNo(Base.DATA_DUP); // 데이터 중복
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

        arrGridRowIdList = arrRowIdList = arrEmailName2List = arrEmailNameList = arrTelNo2List = arrTelNoList = arrDate2List = arrDate1List = arrRate2List = arrRateList = arrPostNo2List = arrPostNoList = arrCount2List = arrCountList = arrBzno2List = arrBznoList = arrCorpno2List = arrCorpnoList = arrNo2List = arrNoList = arrAmtm2List = arrAmtmList = arrAmt2List = arrAmtList = arrYm2List = arrYmList = arrYear2List = arrYearList = arrCode2List = arrCodeList = arrYn2List = arrYnList = arrName2List = arrNameList = arrIdList = arrId2List = null;

        return chn;
    }

    public Channel deltList(TempVO vo)
    {
        Channel chn = new Channel();

        if ( !Base.isEmpty(vo.getRowId()) ) dao.deltList(vo);

        chn.setRsltNo(Base.OK); // OK

        return chn;
    }
}