/*
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 항목 VO
    - 최초작성일 : 2014-06-24
    - 작  성  자 : 문금환
    - 비      고 :
--------------------------------------------------------------------------------
*/
package com.ecosian.epfse.develop.item.dao.vo;

import com.ecosian.epfse.system.common.dao.vo.ComParamVO;

public class ItemVO extends ComParamVO
{
    private String langCode           ; // 언어코드
    private String pathName           ; // 경로명
    private String itemId             ; // 항목ID
    private String itemName           ; // 항목명
    private String intrrName          ; // 내부명
    private String rowId              ; // 행ID
    private String gridRowId          ; // 그리드행ID

    private String userId             ; // 사용자ID
    private String subMenuDispYn      ; // 서브메뉴표시여부
    private String menuNo             ; // 메뉴번호
    private String userLangCode       ; // 사용자언어코드
    private String langCodeHdrId      ; // 언어코드헤더ID
    private String menuAddrNameClsfyId; // 메뉴주소명구분ID

    // getter
    public String getLangCode           () { return langCode           ; }
    public String getPathName           () { return pathName           ; }
    public String getItemId             () { return itemId             ; }
    public String getItemName           () { return itemName           ; }
    public String getIntrrName          () { return intrrName          ; }
    public String getRowId              () { return rowId              ; }
    public String getGridRowId          () { return gridRowId          ; }

    public String getUserId             () { return userId             ; }
    public String getSubMenuDispYn      () { return subMenuDispYn      ; }
    public String getMenuNo             () { return menuNo             ; }
    public String getUserLangCode       () { return userLangCode       ; }
    public String getLangCodeHdrId      () { return langCodeHdrId      ; }
    public String getMenuAddrNameClsfyId() { return menuAddrNameClsfyId; }

    // setter
    public void setLangCode           (String str) { this.langCode            = str; }
    public void setPathName           (String str) { this.pathName            = str; }
    public void setItemId             (String str) { this.itemId              = str; }
    public void setItemName           (String str) { this.itemName            = str; }
    public void setIntrrName          (String str) { this.intrrName           = str; }
    public void setRowId              (String str) { this.rowId               = str; }
    public void setGridRowId          (String str) { this.gridRowId           = str; }

    public void setUserId             (String str) { this.userId              = str; }
    public void setSubMenuDispYn      (String str) { this.subMenuDispYn       = str; }
    public void setMenuNo             (String str) { this.menuNo              = str; }
    public void setUserLangCode       (String str) { this.userLangCode        = str; }
    public void setLangCodeHdrId      (String str) { this.langCodeHdrId       = str; }
    public void setMenuAddrNameClsfyId(String str) { this.menuAddrNameClsfyId = str; }

    @Override
    public String toString() {
        return
            "ItemVO ["
          + 	  "langCode=" + langCode
          + 	", pathName=" + pathName
          + 	", itemId=" + itemId
          + 	", itemName=" + itemName
          + 	", intrrName=" + intrrName
          + 	", rowId=" + rowId
          + 	", gridRowId=" + gridRowId
          + 	", userId=" + userId
          + 	", subMenuDispYn=" + subMenuDispYn
          + 	", menuNo=" + menuNo
          + 	", userLangCode=" + userLangCode
          + 	", langCodeHdrId=" + langCodeHdrId
          + 	", menuAddrNameClsfyId=" + menuAddrNameClsfyId
          + "]";
    }
}