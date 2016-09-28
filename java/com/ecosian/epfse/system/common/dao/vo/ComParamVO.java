/*
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 공통 매개변수 VO
    - 최초작성일 : 2014-04-21
    - 작  성  자 : 문금환
    - 비      고 :
-------------------------------------------------------------------------------
*/
package com.ecosian.epfse.system.common.dao.vo;

public class ComParamVO implements Cloneable
{
    private String comParamUserLangCode ; // 사용자언어코드
    private String comParamLangCodeHdrId; // 언어코드헤더ID
    private String comParamScrAddrName  ; // 화면주소명
    private String comParamContextPath  ; // ContextPath

    private String comParamIpAddrName   ; // IP주소명
    private String comParamSessnIdName  ; // 세션ID명
    private String comParamLoginUserId  ; // 로그인사용자ID
    private String comParamSubMenuDispYn; // 서브메뉴표시여부

    private String entprId              ; // 업체ID
    private String bizplcId             ; // 사업장ID

    private String targYear             ; // 대상년도
    private String targYm               ; // 대상년월

    // 화면
    private String rowId                ; // 행ID

    // 그리드
    private String gridRowId            ; // 그리드행ID

    // 페이징
    private int rowNo                   ; // 행번호 // 페이지관련
    private int total                   ; // 총수
    private int maxPage                 ; // 최대페이지
    private int page                    ; // 페이지
    private int pageRow                 ; // 페이지행

    // getter
    public String getComParamUserLangCode () { return comParamUserLangCode ; }
    public String getComParamLangCodeHdrId() { return comParamLangCodeHdrId; }
    public String getComParamScrAddrName  () { return comParamScrAddrName  ; }
    public String getComParamIpAddrName   () { return comParamIpAddrName   ; }
    public String getComParamContextPath  () { return comParamContextPath  ; }
    public String getComParamSessnIdName  () { return comParamSessnIdName  ; }
    public String getComParamLoginUserId  () { return comParamLoginUserId  ; }
    public String getComParamSubMenuDispYn() { return comParamSubMenuDispYn; }

    public String getEntprId              () { return entprId              ; }
    public String getBizplcId             () { return bizplcId             ; }

    public String getTargYear             () { return targYear             ; }
    public String getTargYm               () { return targYm               ; }

    public String getRowId                () { return rowId                ; }
    public String getGridRowId            () { return gridRowId            ; }

    public int getRowNo                   () { return rowNo                ; }
    public int getTotal                   () { return total                ; }
    public int getMaxPage                 () { return maxPage              ; }
    public int getPage                    () { return page                 ; }
    public int getPageRow                 () { return pageRow              ; }

    // setter
    public void setComParamUserLangCode (String str) { this.comParamUserLangCode  = str   ; }
    public void setComParamLangCodeHdrId(String str) { this.comParamLangCodeHdrId = str   ; }
    public void setComParamScrAddrName  (String str) { this.comParamScrAddrName   = str   ; }
    public void setComParamContextPath  (String str) { this.comParamContextPath   = str   ; }
    public void setComParamIpAddrName   (String str) { this.comParamIpAddrName    = str   ; }
    public void setComParamSessnIdName  (String str) { this.comParamSessnIdName   = str   ; }
    public void setComParamLoginUserId  (String str) { this.comParamLoginUserId   = str   ; }
    public void setComParamSubMenuDispYn(String str) { this.comParamSubMenuDispYn = str   ; }

    public void setEntprId              (String str) { this.entprId               = str   ; }
    public void setBizplcId             (String str) { this.bizplcId              = str   ; }

    public void setTargYear             (String str) { this.targYear              = str   ; }
    public void setTargYm               (String str) { this.targYm                = str   ; }

    public void setRowId                (String str) { this.rowId                 = str   ; }
    public void setGridRowId            (String str) { this.gridRowId             = str   ; }

    public void setRowNo                (int intSet) { this.rowNo                 = intSet; }
    public void setTotal                (int intSet) { this.total                 = intSet; }
    public void setMaxPage              (int intSet) { this.maxPage               = intSet; }
    public void setPage                 (int intSet) { this.page                  = intSet; }
    public void setPageRow              (int intSet) { this.pageRow               = intSet; }

    @Override
    public Object clone(){
        Object objOutpt = null;
        try {
            objOutpt = super.clone();
        } catch (CloneNotSupportedException e) {
            e.printStackTrace();
        }
        return objOutpt;
    }

    @Override
    public String toString() {
        return
            "ComParamVO ["
          + 	  "comParamUserLangCode=" + comParamUserLangCode
          + 	", comParamLangCodeHdrId=" + comParamLangCodeHdrId
          + 	", comParamScrAddrName=" + comParamScrAddrName
          + 	", comParamIpAddrName=" + comParamIpAddrName
          + 	", comParamSessnIdName=" + comParamSessnIdName
          + 	", comParamLoginUserId=" + comParamLoginUserId
          + 	", comParamSubMenuDispYn=" + comParamSubMenuDispYn
          + 	", entprId=" + entprId
          + 	", bizplcId=" + bizplcId
          + 	", targYear=" + targYear
          + 	", targYm=" + targYm
          + 	", rowId=" + rowId
          + 	", gridRowId=" + gridRowId
          + 	", rowNo=" + rowNo
          + 	", total=" + total
          + 	", maxPage=" + maxPage
          + 	", page=" + page
          + 	", pageRow=" + pageRow
          + "]";
    }
}