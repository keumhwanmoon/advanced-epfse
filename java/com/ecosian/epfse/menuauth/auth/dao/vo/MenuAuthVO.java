/*
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 메뉴권한 VO
    - 최초작성일 : 2014-04-21
    - 작  성  자 : 문금환
    - 비      고 :
--------------------------------------------------------------------------------
*/
package com.ecosian.epfse.menuauth.auth.dao.vo;

import com.ecosian.epfse.system.common.dao.vo.ComParamVO;

public class MenuAuthVO extends ComParamVO
{
    private String authId             ; // 권한ID
    private String menuNo             ; // 메뉴번호
    private String authCode           ; // 권한코드
    private String rowId              ; // 행ID

    private String userId             ; // 사용자ID
    private String menuAddrName       ; // 메뉴주소명
    private String menuName           ; // 메뉴명
    private String childApplyYn       ; // 자식적용여부
    private String userLangCode       ; // 사용자언어코드
    private String menuDeli           ; // 메뉴구분자
    private String rowIdList          ; // 행ID목록
    private String authCodeHdrId      ; // 권한코드헤더ID
    private String authCodeName       ; // 권한코드명
    private String menuAddrNameClsfyId; // 메뉴주소명구분ID

    // getter
    public String getAuthId             () { return authId             ; }
    public String getMenuNo             () { return menuNo             ; }
    public String getAuthCode           () { return authCode           ; }
    public String getRowId              () { return rowId              ; }

    public String getUserId             () { return userId             ; }
    public String getMenuAddrName       () { return menuAddrName       ; }
    public String getMenuName           () { return menuName           ; }
    public String getChildApplyYn       () { return childApplyYn       ; }
    public String getUserLangCode       () { return userLangCode       ; }
    public String getMenuDeli           () { return menuDeli           ; }
    public String getRowIdList          () { return rowIdList          ; }
    public String getAuthCodeHdrId      () { return authCodeHdrId      ; }
    public String getAuthCodeName       () { return authCodeName       ; }
    public String getMenuAddrNameClsfyId() { return menuAddrNameClsfyId; }

    // setter
    public void setAuthId             (String str) { this.authId              = str; }
    public void setMenuNo             (String str) { this.menuNo              = str; }
    public void setAuthCode           (String str) { this.authCode            = str; }
    public void setRowId              (String str) { this.rowId               = str; }

    public void setUserId             (String str) { this.userId              = str; }
    public void setMenuAddrName       (String str) { this.menuAddrName        = str; }
    public void setMenuName           (String str) { this.menuName            = str; }
    public void setChildApplyYn       (String str) { this.childApplyYn        = str; }
    public void setUserLangCode       (String str) { this.userLangCode        = str; }
    public void setMenuDeli           (String str) { this.menuDeli            = str; }
    public void setRowIdList          (String str) { this.rowIdList           = str; }
    public void setAuthCodeHdrId      (String str) { this.authCodeHdrId       = str; }
    public void setAuthCodeName       (String str) { this.authCodeName        = str; }
    public void setMenuAddrNameClsfyId(String str) { this.menuAddrNameClsfyId = str; }

    @Override
    public String toString() {
        return
            "MenuAuthVO ["
          + 	  "authId=" + authId
          + 	", menuNo=" + menuNo
          + 	", authCode=" + authCode
          + 	", rowId=" + rowId
          + 	", userId=" + userId
          + 	", menuAddrName=" + menuAddrName
          + 	", menuName=" + menuName
          + 	", childApplyYn=" + childApplyYn
          + 	", userLangCode=" + userLangCode
          + 	", menuDeli=" + menuDeli
          + 	", rowIdList=" + rowIdList
          + 	", authCodeHdrId=" + authCodeHdrId
          + 	", authCodeName=" + authCodeName
          + 	", menuAddrNameClsfyId=" + menuAddrNameClsfyId
          + "]";
    }
}