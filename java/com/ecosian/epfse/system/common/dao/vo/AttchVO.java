/*
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 첨부 VO
    - 최초작성일 : 2014-05-14
    - 작  성  자 : 문금환
    - 비      고 :
--------------------------------------------------------------------------------
*/
package com.ecosian.epfse.system.common.dao.vo;

import com.ecosian.epfse.system.common.Base;

public class AttchVO extends ComParamVO
{
    private String attchId      ; // 첨부ID
    private String attchPathName; // 첨부경로명
    private String orgFileName  ; // 원본파일명
    private String fileSizeAmt  ; // 파일크기량
    private String sizeUnitCode ; // 크기단위코드
    private String saveDtm      ; // 저장일시
    private String varId        ; // 변수ID
    private String varName      ; // 변수명
    private String rowId        ; // 행ID

    private String sccssFuncName; // 성공함수명
    private String errorFuncName; // 오류함수명
    private String attchHref    ; // 첨부HREF
    private String fileMaxSize  ; // 파일최대크기

    // getter
    public String getAttchId      () { return attchId      ; }
    public String getAttchPathName() { return attchPathName; }
    public String getOrgFileName  () { return orgFileName  ; }
    public String getFileSizeAmt  () { return fileSizeAmt  ; }
    public String getSizeUnitCode () { return sizeUnitCode ; }
    public String getSaveDtm      () { return saveDtm      ; }
    public String getVarId        () { return varId        ; }
    public String getVarName      () { return varName      ; }
    public String getRowId        () { return rowId        ; }

    public String getSccssFuncName() { return sccssFuncName; }
    public String getErrorFuncName() { return errorFuncName; }
    public String getAttchHref    () { return attchHref    ; }
    public String getFileMaxSize  () { return fileMaxSize  ; }

    // setter
    public void setAttchId      (String str) { this.attchId       = str; }
    public void setAttchPathName(String str) { this.attchPathName = str; }
    public void setOrgFileName  (String str) { this.orgFileName   = str; }
    public void setFileSizeAmt  (String str) { this.fileSizeAmt   = str; }
    public void setSizeUnitCode (String str) { this.sizeUnitCode  = str; }
    public void setSaveDtm      (String str) { this.saveDtm       = str; }
    public void setVarId        (String str) { this.varId         = str; }
    public void setVarName      (String str) { this.varName       = str; }
    public void setRowId        (String set) { this.rowId         = set; }

    public void setSccssFuncName(String str) { this.sccssFuncName = str; }
    public void setErrorFuncName(String str) { this.errorFuncName = str; }
    public void setAttchHref    (String str) { this.attchHref     = str; }
    public void setFileMaxSize  (String str) { this.fileMaxSize   = str; }

    @Override
    public String toString() {
        return
            "AttchVO ["
          + 	  "attchId=" + attchId
          + 	", attchPathName=" + attchPathName
          + 	", orgFileName=" + orgFileName
          + 	", fileSizeAmt=" + fileSizeAmt
          + 	", sizeUnitCode=" + sizeUnitCode
          + 	", saveDtm=" + saveDtm
          + 	", varId=" + varId
          + 	", varName=" + varName
          + 	", rowId=" + rowId
          + 	", sccssFuncName=" + sccssFuncName
          + 	", errorFuncName=" + errorFuncName
          + 	", attchHref=" + attchHref
          + 	", fileMaxSize=" + fileMaxSize
          + "]";
    }

    public String toJsonStr() {
        return
            "{ \"orgFileName\": " + getJsonValue(orgFileName)
          + ", \"fileSizeAmt\": " + getJsonValue(fileSizeAmt)
          + ", \"sizeUnitCode\": " + getJsonValue(sizeUnitCode)
          + ", \"attchHref\": " + getJsonValue(attchHref)
          + ", \"sccssFuncName\": " + getJsonValue(sccssFuncName)
          + ", \"errorFuncName\": " + getJsonValue(errorFuncName)
          + ", \"rowId\": " + getJsonValue(rowId)
          + " }";
    }

    private String getJsonValue(String strValue)
    {
        if ( null != strValue )
            return ( null != strValue ? "\"" : Base.EMPTYSTR ) + strValue + ( null != strValue ? "\"" : Base.EMPTYSTR );
        else
            return null;
    }
}