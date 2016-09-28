/*
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 공시자항 VO
    - 최초작성일 : 2014-09-18
    - 작  성  자 : 이승윤
    - 비      고 :
--------------------------------------------------------------------------------
*/
package com.ecosian.epfse.system.noti.dao.vo;

import com.ecosian.epfse.system.common.dao.vo.ComParamVO;

public class NotiVO extends ComParamVO
{
    private String seq            ; // 일련번호
    private String titleName      ; // 제목명
    private String ctts           ; // 내용
    private String inqrCount      ; // 조회수
    private String rgstDtm        ; // 등록일시
    private String rgstUserId     ; // 등록사용자ID
    private String updtDtm        ; // 수정일시
    private String updtUserId     ; // 수정사용자ID
    private String rowId          ; // 행ID

    private int bltnNo            ; // 게시물번호

    private String inqrClsfy      ; // 조회구분
    private String inqrValue      ; // 조회값
    private String newYn          ; // 신규여부
    private String updtYn         ; // 수정여부
    private String preInfo        ; // 이전글
    private String nextInfo       ; // 다음글
    private String preRowId       ; // 이전행ID
    private String nextRowId      ; // 다음행ID
    private String rgstUserName   ; // 등록사용자명
    private String updtUserName   ; // 수정사용자명
    private String inqrCountUpdtYn; // 조회건수수정여부
    private String loginUserId    ; // 로그인사용자ID

    // getter
    public String getSeq            () { return seq            ; }
    public String getTitleName      () { return titleName      ; }
    public String getCtts           () { return ctts           ; }
    public String getInqrCount      () { return inqrCount      ; }
    public String getRgstDtm        () { return rgstDtm        ; }
    public String getRgstUserId     () { return rgstUserId     ; }
    public String getUpdtDtm        () { return updtDtm        ; }
    public String getUpdtUserId     () { return updtUserId     ; }
    public String getRowId          () { return rowId          ; }

    public int getBltnNo            () { return bltnNo         ; }

    public String getInqrClsfy      () { return inqrClsfy      ; }
    public String getInqrValue      () { return inqrValue      ; }
    public String getNewYn          () { return newYn          ; }
    public String getUpdtYn         () { return updtYn         ; }
    public String getPreInfo        () { return preInfo        ; }
    public String getNextInfo       () { return nextInfo       ; }
    public String getPreRowId       () { return preRowId       ; }
    public String getNextRowId      () { return nextRowId      ; }
    public String getRgstUserName   () { return rgstUserName   ; }
    public String getUpdtUserName   () { return updtUserName   ; }
    public String getInqrCountUpdtYn() { return inqrCountUpdtYn; }
    public String getLoginUserId    () { return loginUserId    ; }

    // setter
    public void setSeq            (String str) { this.seq             = str   ; }
    public void setTitleName      (String str) { this.titleName       = str   ; }
    public void setCtts           (String str) { this.ctts            = str   ; }
    public void setInqrCount      (String str) { this.inqrCount       = str   ; }
    public void setRgstDtm        (String str) { this.rgstDtm         = str   ; }
    public void setRgstUserId     (String str) { this.rgstUserId      = str   ; }
    public void setUpdtDtm        (String str) { this.updtDtm         = str   ; }
    public void setUpdtUserId     (String str) { this.updtUserId      = str   ; }
    public void setRowId          (String str) { this.rowId           = str   ; }

    public void setBltnNo         (int intSet) { this.bltnNo          = intSet; }

    public void setInqrClsfy      (String str) { this.inqrClsfy       = str   ; }
    public void setInqrValue      (String str) { this.inqrValue       = str   ; }
    public void setNewYn          (String str) { this.newYn           = str   ; }
    public void setUpdtYn         (String str) { this.updtYn          = str   ; }
    public void setPreInfo        (String str) { this.preInfo         = str   ; }
    public void setNextInfo       (String str) { this.nextInfo        = str   ; }
    public void setPreRowId       (String str) { this.preRowId        = str   ; }
    public void setNextRowId      (String str) { this.nextRowId       = str   ; }
    public void setRgstUserName   (String str) { this.rgstUserName    = str   ; }
    public void setUpdtUserName   (String str) { this.updtUserName    = str   ; }
    public void setInqrCountUpdtYn(String str) { this.inqrCountUpdtYn = str   ; }
    public void setLoginUserId    (String str) { this.loginUserId     = str   ; }

    @Override
    public String toString() {
        return
            "NotiVO ["
          + 	  "seq=" + seq
          + 	", titleName=" + titleName
          + 	", ctts=" + ctts
          + 	", inqrCount=" + inqrCount
          + 	", rgstDtm=" + rgstDtm
          + 	", rgstUserId=" + rgstUserId
          + 	", updtDtm=" + updtDtm
          + 	", updtUserId=" + updtUserId
          + 	", rowId=" + rowId
          + 	", bltnNo=" + bltnNo
          + 	", inqrClsfy=" + inqrClsfy
          + 	", inqrValue=" + inqrValue
          + 	", newYn="  + newYn
          + 	", updtYn="  + updtYn
          + 	", preInfo="  + preInfo
          + 	", nextInfo="  + nextInfo
          + 	", preRowId="  + preRowId
          + 	", nextRowId="  + nextRowId
          + 	", rgstUserName=" + rgstUserName
          + 	", updtUserName=" + updtUserName
          + 	", inqrCountUpdtYn=" + inqrCountUpdtYn
          + 	", loginUserId=" + loginUserId
          + "]";
    }
}