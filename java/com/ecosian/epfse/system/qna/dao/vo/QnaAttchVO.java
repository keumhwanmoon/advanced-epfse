/*
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 게시물첨부 VO
    - 최초작성일 : 2014-05-21
    - 작  성  자 : 문금환
    - 비      고 :
--------------------------------------------------------------------------------
*/
package com.ecosian.epfse.system.qna.dao.vo;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class QnaAttchVO
{
    private String attchSeq    ; // 첨부일련번호
    private String bltnNo      ; // 게시물번호
    private String attchId     ; // 첨부ID
    private String rowId       ; // 행ID
    private String rowIdList   ; // 행ID목록

    private String orgFileName ; // 원본파일명
    private String fileSizeAmt ; // 파일크기량
    private String sizeUnitCode; // 크기단위코드
    private String attchHref   ; // 첨부HREF

    @Override
    public String toString() {
        return
            "QnaAttchVO ["
          + 	  "attchSeq=" + attchSeq
          + 	", bltnNo=" + bltnNo
          + 	", attchId=" + attchId
          + 	", rowId=" + rowId
          + 	", rowIdList=" + rowIdList
          + 	", orgFileName=" + orgFileName
          + 	", fileSizeAmt=" + fileSizeAmt
          + 	", sizeUnitCode=" + sizeUnitCode
          + 	", attchHref=" + attchHref
          + "]";
    }
}