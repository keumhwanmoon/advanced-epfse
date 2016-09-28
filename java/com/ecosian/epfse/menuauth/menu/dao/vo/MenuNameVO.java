/*
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 메뉴명 VO
    - 최초작성일 : 2014-04-18
    - 작  성  자 : 문금환
    - 비      고 :
--------------------------------------------------------------------------------
*/
package com.ecosian.epfse.menuauth.menu.dao.vo;

import com.ecosian.epfse.system.common.dao.vo.ComParamVO;

public class MenuNameVO extends ComParamVO
{
    private String langCode    ; // 언어코드
    private String menuNo      ; // 메뉴번호
    private String menuName    ; // 메뉴명

    private String menuAddrName; // 메뉴주소명
    private String lastChildYn ; // 마지막자식여부
    private String prntsYn     ; // 부모여부
    private String childYn     ; // 자식여부
    private String userId      ; // 사용자ID
    private String rowId       ; // 행ID

    // getter
    public String getLangCode    () { return langCode    ; }
    public String getMenuNo      () { return menuNo      ; }
    public String getMenuName    () { return menuName    ; }

    public String getMenuAddrName() { return menuAddrName; }
    public String getLastChildYn () { return lastChildYn ; }
    public String getPrntsYn     () { return prntsYn     ; }
    public String getChildYn     () { return childYn     ; }
    public String getUserId      () { return userId      ; }
    public String getRowId       () { return rowId       ; }

    // setter
    public void setLangCode    (String str) { this.langCode     = str; }
    public void setMenuNo      (String str) { this.menuNo       = str; }
    public void setMenuName    (String str) { this.menuName     = str; }

    public void setMenuAddrName(String str) { this.menuAddrName = str; }
    public void setLastChildYn (String str) { this.lastChildYn  = str; }
    public void setPrtnsYn     (String str) { this.prntsYn      = str; }
    public void setChildYn     (String str) { this.childYn      = str; }
    public void setUserId      (String str) { this.userId       = str; }
    public void setRowId       (String str) { this.rowId        = str; }

    @Override
    public String toString() {
        return
            "MenuNameVO ["
          + 	  "langCode=" + langCode
          + 	", menuNo=" + menuNo
          + 	", menuName=" + menuName
          + 	", menuAddrName=" + menuAddrName
          + 	", lastChildYn=" + lastChildYn
          + 	", prntsYn=" + prntsYn
          + 	", childYn=" + childYn
          + 	", userId=" + userId
          + 	", rowId=" + rowId
          + "]";
    }
}