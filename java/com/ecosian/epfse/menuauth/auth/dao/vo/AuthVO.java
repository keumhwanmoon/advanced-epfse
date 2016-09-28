/*
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 권한 VO
    - 최초작성일 : 2014-06-26
    - 작  성  자 : 문금환
    - 비      고 :
--------------------------------------------------------------------------------
*/
package com.ecosian.epfse.menuauth.auth.dao.vo;

import com.ecosian.epfse.system.common.dao.vo.ComParamVO;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthVO extends ComParamVO
{
    private String authId    ; // 권한ID
    private String authName  ; // 권한명
    private String anonyYn   ; // 익명여부
    private String rgstDtm   ; // 등록일시
    private String rgstUserId; // 등록사용자ID
    private String updtDtm   ; // 수정일시
    private String updtUserId; // 수정사용자ID
    private String rowId     ; // 행ID
    private String gridRowId ; // 그리드행ID

    @Override
    public String toString() {
        return
            "AuthVO ["
          + 	  "authId=" + authId
          + 	", authName=" + authName
          + 	", anonyYn=" + anonyYn
          + 	", rgstDtm=" + rgstDtm
          + 	", rgstUserId=" + rgstUserId
          + 	", updtDtm=" + updtDtm
          + 	", updtUserId=" + updtUserId
          + 	", rowId=" + rowId
          + 	", gridRowId=" + gridRowId
          + "]";
    }
}