/*
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 코드헤더 Service Implements
    - 최초작성일 : 2014-06-24
    - 작  성  자 : 문금환
    - 비      고 :
--------------------------------------------------------------------------------
*/
package com.ecosian.epfse.system.code.svc.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.interceptor.TransactionAspectSupport;

import com.ecosian.epfse.system.code.dao.CodeDAO;
import com.ecosian.epfse.system.code.dao.CodeHdrDAO;
import com.ecosian.epfse.system.code.dao.CodeNameDAO;
import com.ecosian.epfse.system.code.dao.vo.CodeHdrVO;
import com.ecosian.epfse.system.code.dao.vo.CodeNameVO;
import com.ecosian.epfse.system.code.dao.vo.CodeVO;
import com.ecosian.epfse.system.code.svc.CodeHdrService;
import com.ecosian.epfse.system.common.Base;
import com.ecosian.epfse.system.common.Channel;

@Service("codeHdrService")
public class CodeHdrServiceImpl implements CodeHdrService
{
    @Resource(name = "codeHdrOra") // 해당 beanName 과 일치하는 bean 을 가져온다.
    private CodeHdrDAO dao;
    @Resource(name = "codeOra") // 해당 beanName 과 일치하는 bean 을 가져온다.
    private CodeDAO daoCode;
    @Resource(name = "codeNameOra") // 해당 beanName 과 일치하는 bean 을 가져온다.
    private CodeNameDAO daoCodeName;

    public Channel getList(CodeHdrVO vo)
    {
        Channel chn = new Channel(); chn.setRsltList(dao.getList(vo));
        return chn;
    }

    @Transactional // cf.) Exception 이 throw 면 Rollback 된다.
    public Channel saveList(CodeHdrVO vo, CodeVO voCode, CodeNameVO voCodeName)
    {
        Channel chn = new Channel();

        String[] arrCodeHdrIdList    =    vo.getCodeHdrId().split(Base.DELI12, -1);
        String[] arrCodeHdrNameList  =  vo.getCodeHdrName().split(Base.DELI12, -1);
        String[] arrIntrrHdrNameList = vo.getIntrrHdrName().split(Base.DELI12, -1);
        String[] arrRowIdList        =        vo.getRowId().split(Base.DELI12, -1);
        String[] arrGridRowIdList    =    vo.getGridRowId().split(Base.DELI12, -1);

        final int LNGTH = arrRowIdList.length;

        for ( int intIndex = 0 ; intIndex < LNGTH ; intIndex++ )
        {
               vo.setCodeHdrId(   arrCodeHdrIdList[intIndex]);
             vo.setCodeHdrName( arrCodeHdrNameList[intIndex]);
            vo.setIntrrHdrName(arrIntrrHdrNameList[intIndex]);
                   vo.setRowId(       arrRowIdList[intIndex]);

            if ( Base.YES.equals(dao.getDupYn(vo)) ) // 중복여부 검증
            {
                chn.setRsltNo(Base.DATA_DUP); // 데이터 중복
            } else
            {
                int intRow = 0;

                if ( Base.isEmpty(vo.getRowId()) )
                {
                    intRow = dao.rgstInfo(vo);
                } else
                {
                    // 코드헤더ID 를 변경하는 경우 코드 및 코드명 테이블에 반영한다.
                    if ( !vo.getRowId().equals(vo.getCodeHdrId()) )
                    {
                        daoCode.updtCodeHdrIdList(voCode);
                        daoCodeName.updtCodeHdrIdList(voCodeName);
                    }

                    intRow = dao.updtInfo(vo);
                }

                chn.setRsltNo( 0 >= intRow ? Base.NO_DATA : Base.OK ); // 데이터없음 // OK
            }

            // OK 가 아닌 경우 Transaction 이 COMMIT 되지 않도록 설정한다.
            if ( Base.OK != chn.getRsltNo() )
            {
                TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
                vo.setGridRowId(arrGridRowIdList[intIndex]); chn.setRsltInfo(vo); break;
            }
        }

        arrGridRowIdList = arrRowIdList = arrIntrrHdrNameList = arrCodeHdrNameList = arrCodeHdrIdList = null;

        return chn;
    }

    public Channel deltList(CodeHdrVO vo, CodeVO voCode)
    {
        Channel chn = new Channel();

        if ( !Base.isEmpty(vo.getRowId()) )
        {
            if ( Base.YES.equals(daoCode.getExistYn(voCode)) ) // 존재여부를 검증한다.
            {
                chn.setRsltNo(-1); // 자식존재
            } else
            {
                dao.deltList(vo);

                chn.setRsltNo(Base.OK); // OK
            }
        }

        return chn;
    }
}