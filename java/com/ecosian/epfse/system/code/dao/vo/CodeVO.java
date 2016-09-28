/*
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 코드 VO
    - 최초작성일 : 2014-06-24
    - 작  성  자 : 문금환
    - 비      고 :
--------------------------------------------------------------------------------
*/
package com.ecosian.epfse.system.code.dao.vo;

public class CodeVO
{
    private String codeHdrId  ; // 코드헤더ID
    private String userdefCode; // 사용자정의코드
    private String intrrName  ; // 내부명
    private String rowId      ; // 행ID
    private String gridRowId  ; // 그리드행ID

    private String langCode   ; // 언어코드

    // getter
    public String getCodeHdrId  () { return codeHdrId  ; }
    public String getUserdefCode() { return userdefCode; }
    public String getIntrrName  () { return intrrName  ; }
    public String getRowId      () { return rowId      ; }
    public String getGridRowId  () { return gridRowId  ; }

    public String getLangCode   () { return langCode   ; }

    // setter
    public void setCodeHdrId  (String str) { this.codeHdrId   = str; }
    public void setUserdefCode(String str) { this.userdefCode = str; }
    public void setIntrrName  (String str) { this.intrrName   = str; }
    public void setRowId      (String str) { this.rowId       = str; }
    public void setGridRowId  (String str) { this.gridRowId   = str; }

    public void setLangCode   (String str) { this.langCode    = str; }

    @Override
    public String toString() {
        return
            "CodeVO ["
          + 	  "codeHdrId=" + codeHdrId
          + 	", userdefCode=" + userdefCode
          + 	", intrrName=" + intrrName
          + 	", rowId=" + rowId
          + 	", gridRowId=" + gridRowId
          + 	", langCode=" + langCode
          + "]";
    }
}