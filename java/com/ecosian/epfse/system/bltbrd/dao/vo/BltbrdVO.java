/*
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 게시판 VO
    - 최초작성일 : 2014-06-30
    - 작  성  자 : 문금환
    - 비      고 :
--------------------------------------------------------------------------------
*/
package com.ecosian.epfse.system.bltbrd.dao.vo;

import com.ecosian.epfse.system.common.dao.vo.ComParamVO;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BltbrdVO extends ComParamVO
{
    private String bltbrdNo        ; // 게시판번호
    private String bltbrdName      ; // 게시판명
    private String titleItemId     ; // 제목항목ID
    private String titleItemId2    ; // 제목항목ID2
    private String cttsItemId      ; // 내용항목ID
    private String qstnBltbrdYn    ; // 질문게시판여부
    private String ascInqrYn       ; // 오름차순조회여부
    private String rgstDtm         ; // 등록일시
    private String rgstUserId      ; // 등록사용자ID
    private String updtDtm         ; // 수정일시
    private String updtUserId      ; // 수정사용자ID
    private String rowId           ; // 행ID
    private String gridRowId       ; // 그리드행ID

    private String titleItemIdName ; // 제목항목ID명
    private String titleItemId2Name; // 제목항목ID2명
    private String cttsItemIdName  ; // 내용항목ID명
    private String userLangCode    ; // 사용자언어코드
    private String scrAddrName     ; // 화면주소명

    @Override
    public String toString() {
        return
            "BltbrdVO ["
          + 	  "bltbrdNo=" + bltbrdNo
          + 	", bltbrdName=" + bltbrdName
          + 	", titleItemId=" + titleItemId
          + 	", titleItemId2=" + titleItemId2
          + 	", cttsItemId=" + cttsItemId
          + 	", qstnBltbrdYn=" + qstnBltbrdYn
          + 	", ascInqrYn=" + ascInqrYn
          + 	", rgstDtm=" + rgstDtm
          + 	", rgstUserId=" + rgstUserId
          + 	", updtDtm=" + updtDtm
          + 	", updtUserId=" + updtUserId
          + 	", rowId=" + rowId
          + 	", gridRowId=" + gridRowId
          + 	", titleItemIdName=" + titleItemIdName
          + 	", titleItemId2Name=" + titleItemId2Name
          + 	", cttsItemIdName=" + cttsItemIdName
          + 	", userLangCode=" + userLangCode
          + 	", scrAddrName=" + scrAddrName
          + "]";
    }
}