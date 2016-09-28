/*
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 게시물 VO
    - 최초작성일 : 2014-05-20
    - 작  성  자 : 문금환
    - 비      고 :
--------------------------------------------------------------------------------
*/
package com.ecosian.epfse.system.bltn.dao.vo;

import com.ecosian.epfse.system.common.dao.vo.ComParamVO;

public class BltnVO extends ComParamVO
{
    private String bltnNo         ; // 게시물번호
    private String bltbrdNo       ; // 게시판번호
    private String titleName      ; // 제목명
    private String titleName2     ; // 제목명2
    private String bltnCtts       ; // 게시물내용
    private String bltnCtts2      ; // 게시물내용2
    private String inqrCount      ; // 조회수
    private String prntsBltnNo    ; // 부모게시물번호
    private String rgstDtm        ; // 등록일시
    private String rgstUserId     ; // 등록사용자ID
    private String updtDtm        ; // 수정일시
    private String updtUserId     ; // 수정사용자ID
    private String rowId          ; // 행ID

    private String newYn          ; // 신규여부
    private String updtYn         ; // 수정여부
    private String rowNo2         ; // 행번호2
    private String rgstUserName   ; // 등록사용자명
    private String updtUserName   ; // 수정사용자명
    private String clsfyId        ; // 구분ID
    private String clsfyName      ; // 구분명
    private String inqrCountUpdtYn; // 조회건수수정여부
    private String loginUserId    ; // 로그인사용자ID

    // getter
    public String getBltnNo         () { return bltnNo         ; }
    public String getBltbrdNo       () { return bltbrdNo       ; }
    public String getTitleName      () { return titleName      ; }
    public String getTitleName2     () { return titleName2     ; }
    public String getBltnCtts       () { return bltnCtts       ; }
    public String getBltnCtts2      () { return bltnCtts2      ; }
    public String getInqrCount      () { return inqrCount      ; }
    public String getPrntsBltnNo    () { return prntsBltnNo    ; }
    public String getRgstDtm        () { return rgstDtm        ; }
    public String getRgstUserId     () { return rgstUserId     ; }
    public String getUpdtDtm        () { return updtDtm        ; }
    public String getUpdtUserId     () { return updtUserId     ; }
    public String getRowId          () { return rowId          ; }

    public String getNewYn          () { return newYn          ; }
    public String getUpdtYn         () { return updtYn         ; }
    public String getRowNo2         () { return rowNo2         ; }
    public String getRgstUserName   () { return rgstUserName   ; }
    public String getUpdtUserName   () { return updtUserName   ; }
    public String getClsfyId        () { return clsfyId        ; }
    public String getClsfyName      () { return clsfyName      ; }
    public String getInqrCountUpdtYn() { return inqrCountUpdtYn; }
    public String getLoginUserId    () { return loginUserId    ; }

    // setter
    public void setBltnNo         (String str) { this.bltnNo          = str; }
    public void setBltbrdNo       (String str) { this.bltbrdNo        = str; }
    public void setTitleName      (String str) { this.titleName       = str; }
    public void setTitleName2     (String str) { this.titleName2      = str; }
    public void setBltnCtts       (String str) { this.bltnCtts        = str; }
    public void setBltnCtts2      (String str) { this.bltnCtts2       = str; }
    public void setInqrCount      (String str) { this.inqrCount       = str; }
    public void setPrntsBltnNo    (String str) { this.prntsBltnNo     = str; }
    public void setRgstDtm        (String str) { this.rgstDtm         = str; }
    public void setRgstUserId     (String str) { this.rgstUserId      = str; }
    public void setUpdtDtm        (String str) { this.updtDtm         = str; }
    public void setUpdtUserId     (String str) { this.updtUserId      = str; }
    public void setRowId          (String str) { this.rowId           = str; }

    public void setNewYn          (String str) { this.newYn           = str; }
    public void setUpdtYn         (String str) { this.updtYn          = str; }
    public void setRowNo2         (String str) { this.rowNo2          = str; }
    public void setRgstUserName   (String str) { this.rgstUserName    = str; }
    public void setUpdtUserName   (String str) { this.updtUserName    = str; }
    public void setClsfyId        (String str) { this.clsfyId         = str; }
    public void setClsfyName      (String str) { this.clsfyName       = str; }
    public void setInqrCountUpdtYn(String str) { this.inqrCountUpdtYn = str; }
    public void setLoginUserId    (String str) { this.loginUserId     = str; }

    @Override
    public String toString() {
        return
            "BltnVO ["
          + 	  "bltnNo=" + bltnNo
          + 	", bltbrdNo=" + bltbrdNo
          + 	", titleName=" + titleName
          + 	", titleName2=" + titleName2
          + 	", bltnCtts=" + bltnCtts
          + 	", bltnCtts2=" + bltnCtts2
          + 	", inqrCount=" + inqrCount
          + 	", prntsBltnNo=" + prntsBltnNo
          + 	", rgstDtm=" + rgstDtm
          + 	", rgstUserId=" + rgstUserId
          + 	", updtDtm=" + updtDtm
          + 	", updtUserId=" + updtUserId
          + 	", rowId=" + rowId
          + 	", newYn="  + newYn
          + 	", updtYn="  + updtYn
          + 	", rowNo2=" + rowNo2
          + 	", rgstUserName=" + rgstUserName
          + 	", updtUserName=" + updtUserName
          + 	", clsfyId=" + clsfyId
          + 	", clsfyName=" + clsfyName
          + 	", inqrCountUpdtYn=" + inqrCountUpdtYn
          + 	", loginUserId=" + loginUserId
          + "]";
    }
}