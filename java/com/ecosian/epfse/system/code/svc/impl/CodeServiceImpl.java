/*
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 코드 Service Implements
    - 최초작성일 : 2014-04-29
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
import com.ecosian.epfse.system.code.svc.CodeService;
import com.ecosian.epfse.system.common.Base;
import com.ecosian.epfse.system.common.Channel;

@Service("codeService")
public class CodeServiceImpl implements CodeService
{
    @Resource(name = "codeOra") // 해당 beanName 과 일치하는 bean 을 가져온다.
    private CodeDAO dao;
    @Resource(name = "codeHdrOra") // 해당 beanName 과 일치하는 bean 을 가져온다.
    private CodeHdrDAO daoCodeHdr;
    @Resource(name = "codeNameOra") // 해당 beanName 과 일치하는 bean 을 가져온다.
    private CodeNameDAO daoCodeName;

    @Transactional // cf.) Exception 이 throw 면 Rollback 된다.
    public Channel saveList(CodeVO vo, CodeNameVO voCodeName)
    {
        Channel chn         = new Channel();
        CodeHdrVO voCodeHdr = new CodeHdrVO();

        String[] arrCodeHdrIdList   =   vo.getCodeHdrId().split(Base.DELI12, -1);
        String[] arrUserdefCodeList = vo.getUserdefCode().split(Base.DELI12, -1);
        String[] arrIntrrNameList   =   vo.getIntrrName().split(Base.DELI12, -1);
        String[] arrRowIdList       =       vo.getRowId().split(Base.DELI12, -1);
        String[] arrGridRowIdList   =   vo.getGridRowId().split(Base.DELI12, -1);

        String[] arrLangCodeList    =    voCodeName.getLangCode().split(Base.DELI12, -1);
        String[] arrCodeNameList    =    voCodeName.getCodeName().split(Base.DELI12, -1);
        String[] arrDispOrderNoList = voCodeName.getDispOrderNo().split(Base.DELI12, -1);
        String[] arrUseYnList       =       voCodeName.getUseYn().split(Base.DELI12, -1);

        final int LNGTH = arrRowIdList.length;

        for ( int intIndex = 0 ; intIndex < LNGTH ; intIndex++ )
        {
            voCodeHdr.setCodeHdrId(arrCodeHdrIdList[intIndex]);
            voCodeHdr.setRowId(null);

              vo.setCodeHdrId(  arrCodeHdrIdList[intIndex]);
            vo.setUserdefCode(arrUserdefCodeList[intIndex]);
              vo.setIntrrName(  arrIntrrNameList[intIndex]);
                  vo.setRowId(      arrRowIdList[intIndex]);

            if ( !Base.YES.equals(daoCodeHdr.getDupYn(voCodeHdr)) ) // 중복여부 검증
            {
                chn.setRsltNo(-1); // 부모없음
            } else
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

                // 코드명정보를 저장한다.
                if ( 0 < intRow )
                {
                       voCodeName.setLangCode(   arrLangCodeList[intIndex]);
                      voCodeName.setCodeHdrId(  arrCodeHdrIdList[intIndex]);
                    voCodeName.setUserdefCode(arrUserdefCodeList[intIndex]);
                       voCodeName.setCodeName(   arrCodeNameList[intIndex]);
                    voCodeName.setDispOrderNo(arrDispOrderNoList[intIndex]);
                          voCodeName.setUseYn(      arrUseYnList[intIndex]);
                          voCodeName.setRowId(      arrRowIdList[intIndex]);

                    intRow = daoCodeName.updtInfo(voCodeName);
                    if ( 0 >= intRow ) intRow = daoCodeName.rgstInfo(voCodeName);
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

        voCodeHdr = null;
        arrUseYnList = arrDispOrderNoList = arrCodeNameList = arrLangCodeList = arrGridRowIdList = arrRowIdList = arrIntrrNameList = arrUserdefCodeList = arrCodeHdrIdList = null;

        return chn;
    }

    @Transactional // cf.) Exception 이 throw 면 Rollback 된다.
    public Channel deltList(CodeVO vo)
    {
        Channel chn           = new Channel();
        CodeNameVO voCodeName = new CodeNameVO();

        String[] arrLangCodeList  =  vo.getLangCode().split(Base.DELI12, -1);
        String[] arrCodeHdrIdList = vo.getCodeHdrId().split(Base.DELI12, -1);
        String[] arrRowIdList     =     vo.getRowId().split(Base.DELI12, -1);

        final int LNGTH = arrRowIdList.length;

        for ( int intIndex = 0 ; intIndex < LNGTH ; intIndex++ )
        {
            if ( Base.isEmpty(arrRowIdList[intIndex]) ) continue;

             voCodeName.setLangCode( arrLangCodeList[intIndex]);
            voCodeName.setCodeHdrId(arrCodeHdrIdList[intIndex]);
                voCodeName.setRowId(    arrRowIdList[intIndex]);

            daoCodeName.deltInfo(voCodeName); // 코드명을 삭제한다.

            vo.setCodeHdrId(arrCodeHdrIdList[intIndex]);
                vo.setRowId(    arrRowIdList[intIndex]);
             vo.setLangCode( arrLangCodeList[intIndex]);

            dao.deltInfo(vo);
        }

        chn.setRsltNo(Base.OK); // OK

        voCodeName = null;
        arrRowIdList = arrCodeHdrIdList = arrLangCodeList = null;

        return chn;
    }
}