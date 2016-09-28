/*
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 사용자권한 VO
    - 최초작성일 : 2014-06-26
    - 작  성  자 : 문금환
    - 비      고 :
--------------------------------------------------------------------------------
*/
package com.ecosian.epfse.member.auth.dao.vo;

import com.ecosian.epfse.system.common.dao.vo.ComParamVO;

public class UserAuthVO extends ComParamVO
{
    private String authId    ; // 권한ID
    private String userId    ; // 사용자ID
    private String rgstDtm   ; // 등록일시
    private String rgstUserId; // 등록사용자ID
    private String updtDtm   ; // 수정일시
    private String updtUserId; // 수정사용자ID
    private String rowId     ; // 행ID
    private String gridRowId ; // 그리드행ID

    private String userName  ; // 사용자명
    private String adminYn   ; // 권한여부

    // getter
    public String getAuthId    () { return authId    ; }
    public String getUserId    () { return userId    ; }
    public String getRgstDtm   () { return rgstDtm   ; }
    public String getRgstUserId() { return rgstUserId; }
    public String getUpdtDtm   () { return updtDtm   ; }
    public String getUpdtUserId() { return updtUserId; }
    public String getRowId     () { return rowId     ; }
    public String getGridRowId () { return gridRowId ; }

    public String getUserName  () { return userName  ; }
    public String getAdminYn   () { return adminYn   ; }

    // setter
    public void setAuthId    (String str) { this.authId     = str; }
    public void setUserId    (String str) { this.userId     = str; }
    public void setRgstDtm   (String str) { this.rgstDtm    = str; }
    public void setRgstUserId(String str) { this.rgstUserId = str; }
    public void setUpdtDtm   (String str) { this.updtDtm    = str; }
    public void setUpdtUserId(String str) { this.updtUserId = str; }
    public void setRowId     (String str) { this.rowId      = str; }
    public void setGridRowId (String str) { this.gridRowId  = str; }

    public void setUserName  (String str) { this.userName   = str; }
    public void setAdminYn   (String str) { this.adminYn    = str; }

    @Override
    public String toString() {
        return
            "UserAuthVO ["
          + 	  "authId=" + authId
          + 	", userId=" + userId
          + 	", rgstDtm=" + rgstDtm
          + 	", rgstUserId=" + rgstUserId
          + 	", updtDtm=" + updtDtm
          + 	", updtUserId=" + updtUserId
          + 	", rowId=" + rowId
          + 	", gridRowId=" + gridRowId
          + 	", userName=" + userName
          + 	", adminYn=" + adminYn
          + "]";
    }
}