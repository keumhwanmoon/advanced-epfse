/*
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 테이블 VO
    - 최초작성일 : 2014-06-23
    - 작  성  자 : 문금환
    - 비      고 :
--------------------------------------------------------------------------------
*/
package com.ecosian.epfse.develop.table.dao.vo;

import com.ecosian.epfse.system.common.dao.vo.ComParamVO;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TableVO extends ComParamVO
{
    private String ownerName   ; // 소유자명
    private String tableEngName; // 테이블영문명
    private String tableKrnName; // 테이블한글명
    private String colEngName  ; // 컬럼영문명
    private String colKrnName  ; // 컬럼한글명

    private String colSeq      ; // 컬럼일련번호
    private String dataTypeId  ; // 데이터유형ID
    private String dataLngthId ; // 데이터길이ID
    private String nullYn      ; // NULL여부
    private String pkYn        ; // PK여부

    private String colInqrYn   ; // 컬럼조회여부
    private String rowId       ; // 행ID
    private String query       ; // 쿼리
    private String pathNamePrfx; // 경로명접두사
    private String userLangCode; // 사용자언어코드
    private String rgstUserId  ; // 등록사용자ID

    @Override
    public String toString() {
        return
            "TableVO ["
          + 	  "ownerName=" + ownerName
          + 	", tableEngName=" + tableEngName
          + 	", tableKrnName=" + tableKrnName
          + 	", colEngName=" + colEngName
          + 	", colKrnName=" + colKrnName
          + 	", colSeq=" + colSeq
          + 	", dataTypeId=" + dataTypeId
          + 	", dataLngthId=" + dataLngthId
          + 	", nullYn=" + nullYn
          + 	", pkYn=" + pkYn
          + 	", colInqrYn=" + colInqrYn
          + 	", rowId=" + rowId
          + 	", query=" + query
          + 	", pathNamePrfx=" + pathNamePrfx
          + 	", userLangCode=" + userLangCode
          + 	", rgstUserId=" + rgstUserId
          + "]";
    }
}