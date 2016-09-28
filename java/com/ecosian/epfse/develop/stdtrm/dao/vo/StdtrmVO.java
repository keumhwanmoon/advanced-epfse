/*
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 표준용어 VO
    - 최초작성일 : 2014-04-14
    - 작  성  자 : 문금환
    - 비      고 :
--------------------------------------------------------------------------------
*/
package com.ecosian.epfse.develop.stdtrm.dao.vo;

import com.ecosian.epfse.system.common.dao.vo.ComParamVO;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StdtrmVO extends ComParamVO
{
    private String seq          ; // 일련번호
    private String krnName      ; // 한글명
    private String engNfrmltName; // 영문약식명
    private String engName      ; // 영문명
    private String pjtName      ; // 프로젝트명
    private String rowId        ; // 행ID
    private String gridRowId    ; // 그리드행ID

    private String clsfyId      ; // 구분ID
    private String clsfyName    ; // 구분명

    @Override
    public String toString() {
        return
            "StdtrmVO ["
          + 	  "seq=" + seq
          + 	", krnName=" + krnName
          + 	", engNfrmltName=" + engNfrmltName
          + 	", engName=" + engName
          + 	", pjtName=" + pjtName
          + 	", rowId=" + rowId
          + 	", gridRowId=" + gridRowId
          + 	", clsfyId=" + clsfyId
          + 	", clsfyName=" + clsfyName
          + "]";
    }
}