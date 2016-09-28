/*
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 사용자 VO
    - 최초작성일 : 2014-06-25
    - 작  성  자 : 문금환
    - 비      고 :
--------------------------------------------------------------------------------
*/
package com.ecosian.epfse.member.user.dao.vo;

import com.ecosian.epfse.system.common.dao.vo.ComParamVO;

public class UserVO extends ComParamVO
{
    private String userId    ; // 사용자ID
    private String userName  ; // 사용자명
    private String pwdName   ; // 비밀번호명
    private String useYn     ; // 사용여부
    private String adminYn   ; // 관리자여부
    private String langCode  ; // 언어코드
    private String rgstDtm   ; // 등록일시
    private String rgstUserId; // 등록사용자ID
    private String updtDtm   ; // 수정일시
    private String updtUserId; // 수정사용자ID
    private String rowId     ; // 행ID
    private String gridRowId ; // 그리드행ID

    // getter
    public String getUserId    () { return userId    ; }
    public String getUserName  () { return userName  ; }
    public String getPwdName   () { return pwdName   ; }
    public String getUseYn     () { return useYn     ; }
    public String getAdminYn   () { return adminYn   ; }
    public String getLangCode  () { return langCode  ; }
    public String getRgstDtm   () { return rgstDtm   ; }
    public String getRgstUserId() { return rgstUserId; }
    public String getUpdtDtm   () { return updtDtm   ; }
    public String getUpdtUserId() { return updtUserId; }
    public String getRowId     () { return rowId     ; }
    public String getGridRowId () { return gridRowId ; }

    // setter
    public void setUserId    (String str) { this.userId     = str; }
    public void setUserName  (String str) { this.userName   = str; }
    public void setPwdName   (String str) { this.pwdName    = str; }
    public void setUseYn     (String str) { this.useYn      = str; }
    public void setAdminYn   (String str) { this.adminYn    = str; }
    public void setLangCode  (String str) { this.langCode   = str; }
    public void setRgstDtm   (String str) { this.rgstDtm    = str; }
    public void setRgstUserId(String str) { this.rgstUserId = str; }
    public void setUpdtDtm   (String str) { this.updtDtm    = str; }
    public void setUpdtUserId(String str) { this.updtUserId = str; }
    public void setRowId     (String str) { this.rowId      = str; }
    public void setGridRowId (String str) { this.gridRowId  = str; }

    @Override
    public String toString() {
        return
            "UserVO ["
          + 	  "userId=" + userId
          + 	", userName=" + userName
          + 	", pwdName=" + pwdName
          + 	", useYn=" + useYn
          + 	", adminYn=" + adminYn
          + 	", langCode=" + langCode
          + 	", rgstDtm=" + rgstDtm
          + 	", rgstUserId=" + rgstUserId
          + 	", updtDtm=" + updtDtm
          + 	", updtUserId=" + updtUserId
          + 	", rowId=" + rowId
          + 	", gridRowId=" + gridRowId
          + "]";
    }
}