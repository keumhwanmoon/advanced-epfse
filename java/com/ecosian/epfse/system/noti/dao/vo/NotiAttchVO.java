/*
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 게시물첨부 VO
    - 최초작성일 : 2014-05-21
    - 작  성  자 : 문금환
    - 비      고 :
--------------------------------------------------------------------------------
*/
package com.ecosian.epfse.system.noti.dao.vo;

public class NotiAttchVO
{
    private String attchSeq    ; // 첨부일련번호
    private String bltnNo      ; // 게시물번호
    private String attchId     ; // 첨부ID
    private String rowId       ; // 행ID
    private String rowIdList   ; // 행ID목록

    private String orgFileName ; // 원본파일명
    private String fileSizeAmt ; // 파일크기량
    private String sizeUnitCode; // 크기단위코드
    private String attchHref   ; // 첨부HREF

    // getter
    public String getAttchSeq    () { return attchSeq    ; }
    public String getBltnNo      () { return bltnNo      ; }
    public String getAttchId     () { return attchId     ; }
    public String getRowId       () { return rowId       ; }
    public String getRowIdList   () { return rowIdList   ; }

    public String getOrgFileName () { return orgFileName ; }
    public String getFileSizeAmt () { return fileSizeAmt ; }
    public String getSizeUnitCode() { return sizeUnitCode; }
    public String getAttchHref   () { return attchHref   ; }

    // setter
    public void setAttchSeq    (String str) { this.attchSeq     = str; }
    public void setBltnNo      (String str) { this.bltnNo       = str; }
    public void setAttchId     (String str) { this.attchId      = str; }
    public void setRowId       (String str) { this.rowId        = str; }
    public void setRowIdList   (String str) { this.rowIdList    = str; }

    public void setOrgFileName (String str) { this.orgFileName  = str; }
    public void setFileSizeAmt (String str) { this.fileSizeAmt  = str; }
    public void setSizeUnitCode(String str) { this.sizeUnitCode = str; }
    public void setAttchHref   (String str) { this.attchHref    = str; }

    @Override
    public String toString() {
        return
            "NotiAttchVO ["
          + 	  "attchSeq=" + attchSeq
          + 	", bltnNo=" + bltnNo
          + 	", attchId=" + attchId
          + 	", rowId=" + rowId
          + 	", rowIdList=" + rowIdList
          + 	", orgFileName=" + orgFileName
          + 	", fileSizeAmt=" + fileSizeAmt
          + 	", sizeUnitCode=" + sizeUnitCode
          + 	", attchHref=" + attchHref
          + "]";
    }
}