/*
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : Q&A답변 VO
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
public class QnaAnswrVO extends ComParamVO
{
    private String seq         ; // 일련번호
    private String answrCtts   ; // 답변내용
    private String rgstDtm     ; // 등록일시
    private String rgstUserId  ; // 등록사용자ID
    private String updtDtm     ; // 수정일시
    private String updtUserId  ; // 수정사용자ID
    private String rowId       ; // 행ID

    private String answrExist  ;  // 답변존재여부
    private String rgstUserName; // 등록사용자명
    private String updtUserName; // 수정사용자명
    private String loginUserId ; // 로그인사용자ID

    @Override
    public String toString() {
        return
            "QnaAnswrVO ["
          + 	  "seq=" + seq
          + 	", answrCtts=" + answrCtts
          + 	", rgstDtm=" + rgstDtm
          + 	", rgstUserId=" + rgstUserId
          + 	", updtDtm=" + updtDtm
          + 	", updtUserId=" + updtUserId
          + 	", rowId=" + rowId
          + 	", answrExist="  + answrExist
          + 	", rgstUserName=" + rgstUserName
          + 	", updtUserName=" + updtUserName
          + 	", loginUserId=" + loginUserId
          + "]";
    }
}