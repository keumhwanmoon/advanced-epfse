/*
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 임시 VO
    - 최초작성일 : 2014-06-24
    - 작  성  자 : 문금환
    - 비      고 :
--------------------------------------------------------------------------------
*/
package com.ecosian.epfse.develop.temp.dao.vo;

import com.ecosian.epfse.system.common.dao.vo.ComParamVO;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TempVO extends ComParamVO
{
    private String id2       ; // ID2
    private String id        ; // ID
    private String name      ; // 명
    private String name2     ; // 명2
    private String yn        ; // 여부
    private String yn2       ; // 여부2
    private String code      ; // 코드
    private String code2     ; // 코드2
    private String year      ; // 년도
    private String year2     ; // 년도2
    private String ym        ; // 년월
    private String ym2       ; // 년월2
    private String amt       ; // 량
    private String amt2      ; // 량2
    private String amtm      ; // 액
    private String amtm2     ; // 액2
    private String no        ; // 번호
    private String no2       ; // 번호2
    private String corpno    ; // 법인등록번호
    private String corpno2   ; // 법인등록번호2
    private String bzno      ; // 사업자등록번호
    private String bzno2     ; // 사업자등록번호2
    private String count     ; // 수
    private String count2    ; // 수2
    private String postNo    ; // 우편번호
    private String postNo2   ; // 우편번호2
    private String rate      ; // 율
    private String rate2     ; // 율2
    private String date1     ; // 일자1
    private String date2     ; // 일자2
    private String telNo     ; // 전화번호
    private String telNo2    ; // 전화번호2
    private String emailName ; // 이메일명
    private String emailName2; // 이메일명2
    private String rgstDtm   ; // 등록일시
    private String rgstUserId; // 등록사용자ID
    private String updtDtm   ; // 수정일시
    private String updtUserId; // 수정사용자ID
    private String rowId     ; // 행ID
    private String gridRowId ; // 그리드행ID

    @Override
    public String toString() {
        return
            "TempVO ["
          + 	  "id2=" + id2
          + 	", id=" + id
          + 	", name=" + name
          + 	", name2=" + name2
          + 	", yn=" + yn
          + 	", yn2=" + yn2
          + 	", code=" + code
          + 	", code2=" + code2
          + 	", year=" + year
          + 	", year2=" + year2
          + 	", ym=" + ym
          + 	", ym2=" + ym2
          + 	", amt=" + amt
          + 	", amt2=" + amt2
          + 	", amtm=" + amtm
          + 	", amtm2=" + amtm2
          + 	", no=" + no
          + 	", no2=" + no2
          + 	", corpno=" + corpno
          + 	", corpno2=" + corpno2
          + 	", bzno=" + bzno
          + 	", bzno2=" + bzno2
          + 	", count=" + count
          + 	", count2=" + count2
          + 	", postNo=" + postNo
          + 	", postNo2=" + postNo2
          + 	", rate=" + rate
          + 	", rate2=" + rate2
          + 	", date1=" + date1
          + 	", date2=" + date2
          + 	", telNo=" + telNo
          + 	", telNo2=" + telNo2
          + 	", emailName=" + emailName
          + 	", emailName2=" + emailName2
          + 	", rgstDtm=" + rgstDtm
          + 	", rgstUserId=" + rgstUserId
          + 	", updtDtm=" + updtDtm
          + 	", updtUserId=" + updtUserId
          + 	", rowId=" + rowId
          + 	", gridRowId=" + gridRowId
          + "]";
    }
}