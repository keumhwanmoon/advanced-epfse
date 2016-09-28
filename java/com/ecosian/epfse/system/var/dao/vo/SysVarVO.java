/*
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 시스템변수 VO
    - 최초작성일 : 2014-06-24
    - 작  성  자 : 문금환
    - 비      고 :
--------------------------------------------------------------------------------
*/
package com.ecosian.epfse.system.var.dao.vo;

import com.ecosian.epfse.system.common.dao.vo.ComParamVO;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SysVarVO extends ComParamVO
{
    private String varId    ; // 변수ID
    private String varName  ; // 변수명
    private String intrrName; // 내부명
    private String rowId    ; // 행ID
    private String gridRowId; // 그리드행ID

    @Override
    public String toString() {
        return
            "SysVarVO ["
          + 	  "varId=" + varId
          + 	", varName=" + varName
          + 	", intrrName=" + intrrName
          + 	", rowId=" + rowId
          + 	", gridRowId=" + gridRowId
          + "]";
    }
}