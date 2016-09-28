/*
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 게시물 VO
    - 최초작성일 : 2014-09-25
    - 작  성  자 : 이승윤
    - 비      고 :
--------------------------------------------------------------------------------
*/
package com.ecosian.epfse.system.qna.dao.vo;

import com.ecosian.epfse.system.common.dao.vo.ComParamVO;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class QnaVO extends ComParamVO
{
    private String seq            ; // 일련번호
    private String titleName      ; // 제목명
    private String ctts           ; // 내용
    private String answrCtts      ; // 답변내용
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
    private String answrExist     ;  // 답변존재여부
    private String rowNo2         ; // 행번호2
    private String rgstUserName   ; // 등록사용자명
    private String updtUserName   ; // 수정사용자명
    private String inqrCountUpdtYn; // 조회건수수정여부
    private String loginUserId    ; // 로그인사용자ID

    @Override
    public String toString() {
        return
            "QnaVO ["
          + 	  "seq=" + seq
          + 	", titleName=" + titleName
          + 	", ctts=" + ctts
          + 	", answrCtts=" + answrCtts
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
          + 	", answrExist="  + answrExist
          + 	", rowNo2="  + rowNo2
          + 	", rgstUserName=" + rgstUserName
          + 	", updtUserName=" + updtUserName
          + 	", inqrCountUpdtYn=" + inqrCountUpdtYn
          + 	", loginUserId=" + loginUserId
          + "]";
    }
}