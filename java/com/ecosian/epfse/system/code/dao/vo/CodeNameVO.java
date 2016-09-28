/*
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 코드명 VO
    - 최초작성일 : 2014-04-17
    - 작  성  자 : 문금환
    - 비      고 :
--------------------------------------------------------------------------------
*/
package com.ecosian.epfse.system.code.dao.vo;

import com.ecosian.epfse.system.common.dao.vo.ComParamVO;

public class CodeNameVO extends ComParamVO
{
    private String langCode     ; // 언어코드
    private String codeHdrId    ; // 코드헤더ID
    private String userdefCode  ; // 사용자정의코드
    private String codeName     ; // 코드명
    private String dispOrderNo  ; // 표시순서번호
    private String useYn        ; // 사용여부
    private String rowId        ; // 행ID

    private String codeHdrIdList; // 코드헤더ID목록
    private String intrrName    ; // 내부명
    private String langCodeName ; // 언어코드명
    private String codeHdrName  ; // 코드헤더명
    private String clsfyId      ; // 구분ID
    private String clsfyName    ; // 구분명
    private String langCodeHdrId; // 언어코드헤더ID
    private String userLangCode ; // 사용자언어코드

    // getter
    public String getLangCode     () { return langCode     ; }
    public String getCodeHdrId    () { return codeHdrId    ; }
    public String getUserdefCode  () { return userdefCode  ; }
    public String getCodeName     () { return codeName     ; }
    public String getDispOrderNo  () { return dispOrderNo  ; }
    public String getUseYn        () { return useYn        ; }
    public String getRowId        () { return rowId        ; }

    public String getCodeHdrIdList() { return codeHdrIdList; }
    public String getIntrrName    () { return intrrName    ; }
    public String getLangCodeName () { return langCodeName ; }
    public String getCodeHdrName  () { return codeHdrName  ; }
    public String getClsfyId      () { return clsfyId      ; }
    public String getClsfyName    () { return clsfyName    ; }
    public String getLangCodeHdrId() { return langCodeHdrId; }
    public String getUserLangCode () { return userLangCode ; }

    // setter
    public void setLangCode     (String strSet) { this.langCode      = strSet; }
    public void setCodeHdrId    (String strSet) { this.codeHdrId     = strSet; }
    public void setUserdefCode  (String strSet) { this.userdefCode   = strSet; }
    public void setCodeName     (String strSet) { this.codeName      = strSet; }
    public void setDispOrderNo  (String strSet) { this.dispOrderNo   = strSet; }
    public void setUseYn        (String strSet) { this.useYn         = strSet; }
    public void setRowId        (String strSet) { this.rowId         = strSet; }

    public void setCodeHdrIdList(String strSet) { this.codeHdrIdList = strSet; }
    public void setIntrrName    (String str   ) { this.intrrName     = str   ; }
    public void setLangCodeName (String str   ) { this.langCodeName  = str   ; }
    public void setCodeHdrName  (String str   ) { this.codeHdrName   = str   ; }
    public void setClsfyId      (String str   ) { this.clsfyId       = str   ; }
    public void setClsfyName    (String str   ) { this.clsfyName     = str   ; }
    public void setLangCodeHdrId(String str   ) { this.langCodeHdrId = str   ; }
    public void setUserLangCode (String strSet) { this.userLangCode  = strSet; }

    @Override
    public String toString() {
        return
            "CodeNameVO ["
          + 	  "langCode=" + langCode
          + 	", codeHdrId=" + codeHdrId
          + 	", userdefCode=" + userdefCode
          + 	", codeName=" + codeName
          + 	", dispOrderNo=" + dispOrderNo
          + 	", useYn=" + useYn
          + 	", rowId=" + rowId
          + 	", codeHdrIdList=" + codeHdrIdList
          + 	", intrrName=" + intrrName
          + 	", langCodeName=" + langCodeName
          + 	", codeHdrName=" + codeHdrName
          + 	", clsfyId=" + clsfyId
          + 	", clsfyName=" + clsfyName
          + 	", langCodeHdrId=" + langCodeHdrId
          + 	", userLangCode=" + userLangCode
          + "]";
    }
}