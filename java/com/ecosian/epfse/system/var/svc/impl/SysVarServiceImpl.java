/*
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 시스템변수 Service Implements
    - 최초작성일 : 2014-06-24
    - 작  성  자 : 문금환
    - 비      고 :
--------------------------------------------------------------------------------
*/
package com.ecosian.epfse.system.var.svc.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.interceptor.TransactionAspectSupport;

import com.ecosian.epfse.system.var.dao.SysVarDAO;
import com.ecosian.epfse.system.var.dao.vo.SysVarVO;
import com.ecosian.epfse.system.var.svc.SysVarService;
import com.ecosian.epfse.system.common.Base;
import com.ecosian.epfse.system.common.Channel;

@Service("sysVarService")
public class SysVarServiceImpl implements SysVarService
{
    @Resource(name = "sysVarOra") // 해당 beanName 과 일치하는 bean 을 가져온다.
    private SysVarDAO dao;

    public Channel getList(SysVarVO vo)
    {
        Channel chn = new Channel(); chn.setRsltList(dao.getList(vo));
        return chn;
    }

    @Transactional // cf.) Exception 이 throw 면 Rollback 된다.
    public Channel saveList(SysVarVO vo)
    {
        Channel chn = new Channel();

        String[] arrVarIdList     =     vo.getVarId().split(Base.DELI12, -1);
        String[] arrVarNameList   =   vo.getVarName().split(Base.DELI12, -1);
        String[] arrIntrrNameList = vo.getIntrrName().split(Base.DELI12, -1);
        String[] arrRowIdList     =     vo.getRowId().split(Base.DELI12, -1);
        String[] arrGridRowIdList = vo.getGridRowId().split(Base.DELI12, -1);

        final int LNGTH = arrRowIdList.length;

        for ( int intIndex = 0 ; intIndex < LNGTH ; intIndex++ )
        {
                vo.setVarId(    arrVarIdList[intIndex]);
              vo.setVarName(  arrVarNameList[intIndex]);
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

        arrGridRowIdList = arrRowIdList = arrIntrrNameList = arrVarNameList = arrVarIdList = null;

        return chn;
    }

    public Channel deltList(SysVarVO vo)
    {
        Channel chn = new Channel();

        if ( !Base.isEmpty(vo.getRowId()) ) dao.deltList(vo);

        chn.setRsltNo(Base.OK); // OK

        return chn;
    }
}