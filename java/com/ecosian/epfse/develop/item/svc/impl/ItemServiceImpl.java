/*
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 항목 Service Implements
    - 최초작성일 : 2014-06-24
    - 작  성  자 : 문금환
    - 비      고 :
--------------------------------------------------------------------------------
*/
package com.ecosian.epfse.develop.item.svc.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.interceptor.TransactionAspectSupport;

import com.ecosian.epfse.develop.item.dao.ItemDAO;
import com.ecosian.epfse.develop.item.dao.vo.ItemVO;
import com.ecosian.epfse.develop.item.svc.ItemService;
import com.ecosian.epfse.system.common.Base;
import com.ecosian.epfse.system.common.Channel;

@Service("itemService")
public class ItemServiceImpl implements ItemService
{
    @Resource(name = "itemOra") // 해당 beanName 과 일치하는 bean 을 가져온다.
    private ItemDAO dao;

    public Channel getList(ItemVO vo)
    {
        Channel chn = new Channel(); chn.setRsltList(dao.getList(vo));
        return chn;
    }

    @Transactional // cf.) Exception 이 throw 면 Rollback 된다.
    public Channel saveList(ItemVO vo)
    {
        Channel chn = new Channel();

        String[] arrLangCodeList  =  vo.getLangCode().split(Base.DELI12, -1);
        String[] arrPathNameList  =  vo.getPathName().split(Base.DELI12, -1);
        String[] arrItemIdList    =    vo.getItemId().split(Base.DELI12, -1);
        String[] arrItemNameList  =  vo.getItemName().split(Base.DELI12, -1);
        String[] arrIntrrNameList = vo.getIntrrName().split(Base.DELI12, -1);
        String[] arrRowIdList     =     vo.getRowId().split(Base.DELI12, -1);
        String[] arrGridRowIdList = vo.getGridRowId().split(Base.DELI12, -1);

        final int LNGTH = arrRowIdList.length;

        for ( int intIndex = 0 ; intIndex < LNGTH ; intIndex++ )
        {
             vo.setLangCode( arrLangCodeList[intIndex]);
             vo.setPathName( arrPathNameList[intIndex]);
               vo.setItemId(   arrItemIdList[intIndex]);
             vo.setItemName( arrItemNameList[intIndex]);
            vo.setIntrrName(arrIntrrNameList[intIndex]);
                vo.setRowId(    arrRowIdList[intIndex]);

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

        arrGridRowIdList = arrRowIdList = arrIntrrNameList = arrItemNameList = arrItemIdList = arrPathNameList = arrLangCodeList = null;

        return chn;
    }

    public Channel deltList(ItemVO vo)
    {
        Channel chn = new Channel();

        if ( !Base.isEmpty(vo.getRowId()) ) dao.deltList(vo);

        chn.setRsltNo(Base.OK); // OK
        return chn;
    }
}