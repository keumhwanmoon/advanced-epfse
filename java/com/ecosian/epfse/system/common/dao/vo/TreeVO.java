/*
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 트리 VO
    - 최초작성일 : 2014-07-23
    - 작  성  자 : 문금환
    - 비      고 :
--------------------------------------------------------------------------------
*/
package com.ecosian.epfse.system.common.dao.vo;

import com.ecosian.epfse.system.common.Base;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TreeVO
{
    private String jstree      ; // JSTREE
    private String jstreeId    ; // JSTREE ID
    private String jstreePrnts ; // JSTREE 부모
    private String jstreeText  ; // JSTREE 텍스트
    private String jstreeIcon  ; // JSTREE ICON
    private String jstreeIcon2 ;
    private String jstreeIcon3 ;
    private String jstreeOpened; // JSTREE OPENED

    @Override
    public String toString() {
        return
            "TreeVO ["
          + 	  "jstree=" + jstree
          + 	", jstreeId=" + jstreeId
          + 	", jstreePrnts=" + jstreePrnts
          + 	", jstreeText=" + jstreeText
          + 	", jstreeIcon=" + jstreeIcon
          + 	", jstreeIcon2=" + jstreeIcon2
          + 	", jstreeIcon3=" + jstreeIcon3
          + 	", jstreeOpened=" + jstreeOpened
          + "]";
    }

    public String toJstreeJsonStr() {
        return
            "{ \"id\": \"" + jstreeId
          + "\", \"parent\": \"" + jstreePrnts
          + "\", \"text\": \"" + jstreeText
          + ( !Base.isEmpty(jstreeIcon) ? "\", \"icon\": \"" + jstreeIcon : Base.EMPTYSTR )
          + "\", \"state\": { \"opened\": " + jstreeOpened
          + " } }";
    }
}