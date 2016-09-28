/*
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 메뉴 VO
    - 최초작성일 : 2014-04-17
    - 작  성  자 : 문금환
    - 비      고 :
--------------------------------------------------------------------------------
*/
package com.ecosian.epfse.menuauth.menu.dao.vo;

import java.util.Date;

import com.ecosian.epfse.system.common.dao.vo.ComParamVO;

public class MenuVO extends ComParamVO
{
    private String menuNo       ; // 메뉴번호
    private String intrrName    ; // 내부명
    private String sltnYn       ; // 솔루션여부
    private String sltnName     ; // 솔루션명
    private String prntsMenuNo  ; // 부모메뉴번호
    private String menuAddrName ; // 메뉴주소명
    private String clsfyUseYn   ; // 구분사용여부
    private String dispOrderNo  ; // 표시순서번호
    private String dispYn       ; // 표시여부
    private String useYn        ; // 사용여부
    private String authCode     ; // 권한코드
    private Date   rgstDtm      ; // 등록일시
    private String rgstUserId   ; // 등록사용자ID
    private Date   updtDtm      ; // 수정일시
    private String updtUserId   ; // 수정사용자ID

    private String userLangCode ; // 사용자언어코드
    private String menuName     ; // 메뉴명
    private String prntsMenuName; // 부모메뉴명
    private String rowId        ; // 행ID

    // getter
    public String getMenuNo       () { return menuNo       ; }
    public String getIntrrName    () { return intrrName    ; }
    public String getSltnYn       () { return sltnYn       ; }
    public String getSltnName     () { return sltnName     ; }
    public String getPrntsMenuNo  () { return prntsMenuNo  ; }
    public String getMenuAddrName () { return menuAddrName ; }
    public String getClsfyUseYn   () { return clsfyUseYn   ; }
    public String getDispOrderNo  () { return dispOrderNo  ; }
    public String getDispYn       () { return dispYn       ; }
    public String getUseYn        () { return useYn        ; }
    public String getAuthCode     () { return authCode     ; }
    public Date   getRgstDtm      () { return rgstDtm      ; }
    public String getRgstUserId   () { return rgstUserId   ; }
    public Date   getUpdtDtm      () { return updtDtm      ; }
    public String getUpdtUserId   () { return updtUserId   ; }

    public String getUserLangCode () { return userLangCode ; }
    public String getMenuName     () { return menuName     ; }
    public String getPrntsMenuName() { return prntsMenuName; }
    public String getRowId        () { return rowId        ; }

    // setter
    public void setMenuNo       (String str) { this.menuNo        = str; }
    public void setIntrrName    (String str) { this.intrrName     = str; }
    public void setSltnYn       (String str) { this.sltnYn        = str; }
    public void setSltnName     (String str) { this.sltnName      = str; }
    public void setPrntsMenuNo  (String str) { this.prntsMenuNo   = str; }
    public void setMenuAddrName (String str) { this.menuAddrName  = str; }
    public void setClsfyUseYn   (String str) { this.clsfyUseYn    = str; }
    public void setDispOrderNo  (String str) { this.dispOrderNo   = str; }
    public void setDispYn       (String str) { this.dispYn        = str; }
    public void setUseYn        (String str) { this.useYn         = str; }
    public void setAuthCode     (String str) { this.authCode      = str; }
    public void setRgstDtm      (Date   dat) { this.rgstDtm       = dat; }
    public void setRgstUserId   (String str) { this.rgstUserId    = str; }
    public void setUpdtDtm      (Date   dat) { this.updtDtm       = dat; }
    public void setUpdtUserId   (String str) { this.updtUserId    = str; }

    public void setUserLangCode (String str) { this.userLangCode  = str; }
    public void setMenuName     (String str) { this.menuName      = str; }
    public void setPrntsMenuName(String str) { this.prntsMenuName = str; }
    public void setRowId        (String str) { this.rowId         = str; }

    @Override
    public String toString() {
        return
            "MenuVO ["
          + 	  "menuNo=" + menuNo
          + 	", intrrName=" + intrrName
          + 	", sltnYn=" + sltnYn
          + 	", sltnName=" + sltnName
          + 	", prntsMenuNo=" + prntsMenuNo
          + 	", menuAddrName=" + menuAddrName
          + 	", dispOrderNo=" + dispOrderNo
          + 	", dispYn=" + dispYn
          + 	", useYn=" + useYn
          + 	", authCode=" + authCode
          + 	", rgstDtm=" + rgstDtm
          + 	", rgstUserId=" + rgstUserId
          + 	", updtDtm=" + updtDtm
          + 	", updtUserId=" + updtUserId
          + 	", userLangCode=" + userLangCode
          + 	", menuName=" + menuName
          + 	", prntsMenuName=" + prntsMenuName
          + 	", rowId=" + rowId
          + "]";
    }
}