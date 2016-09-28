/*
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 코드헤더 VO
    - 최초작성일 : 2014-06-24
    - 작  성  자 : 문금환
    - 비      고 :
--------------------------------------------------------------------------------
*/
package com.ecosian.epfse.system.code.dao.vo;

public class CodeHdrVO
{
    private String codeHdrId   ; // 코드헤더ID
    private String codeHdrName ; // 코드헤더명
    private String intrrHdrName; // 내부헤더명
    private String rowId       ; // 행ID
    private String gridRowId   ; // 그리드행ID

    private String langCode    ; // 언어코드
    private String clsfyId     ; // 구분ID
    private String clsfyName   ; // 구분명

    // getter
    public String getCodeHdrId   () { return codeHdrId   ; }
    public String getCodeHdrName () { return codeHdrName ; }
    public String getIntrrHdrName() { return intrrHdrName; }
    public String getRowId       () { return rowId       ; }
    public String getGridRowId   () { return gridRowId   ; }

    public String getLangCode    () { return langCode    ; }
    public String getClsfyId     () { return clsfyId     ; }
    public String getClsfyName   () { return clsfyName   ; }

    // setter
    public void setCodeHdrId   (String str) { this.codeHdrId    = str; }
    public void setCodeHdrName (String str) { this.codeHdrName  = str; }
    public void setIntrrHdrName(String str) { this.intrrHdrName = str; }
    public void setRowId       (String str) { this.rowId        = str; }
    public void setGridRowId   (String str) { this.gridRowId    = str; }

    public void setLangCode    (String str) { this.langCode     = str; }
    public void setClsfyId     (String str) { this.clsfyId      = str; }
    public void setClsfyName   (String str) { this.clsfyName    = str; }

    @Override
    public String toString() {
        return
            "CodeHdrVO ["
          + 	  "codeHdrId=" + codeHdrId
          + 	", codeHdrName=" + codeHdrName
          + 	", intrrHdrName=" + intrrHdrName
          + 	", rowId=" + rowId
          + 	", gridRowId=" + gridRowId
          + 	", langCode=" + langCode
          + 	", clsfyId=" + clsfyId
          + 	", clsfyName=" + clsfyName
          + "]";
    }
}