/*
--------------------------------------------------------------------------------
	PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
	- 단위업무명 : 로그인로그 VO
	- 최초작성일 : 2014-04-11
	- 작  성  자 : 문금환
	- 비      고 : 
-------------------------------------------------------------------------------
*/
package com.ecosian.epfse.system.common.dao.vo;

public class LoginLogVO
{
	private String loginLogId    ; // 로그인로그ID
	private String userId        ; // 사용자ID
	private String clsfyCode     ; // 구분코드
	private String addrName      ; // 주소명
	private String sessnName     ; // 세션명
	private String bforeAddrName ; // 전주소명
	private String bforeSessnName; // 전세션명

	// getter
	public String getLoginLogId    () { return loginLogId    ; }
	public String getUserId        () { return userId        ; }
	public String getClsfyCode     () { return clsfyCode     ; }
	public String getAddrName      () { return addrName      ; }
	public String getSessnName     () { return sessnName     ; }
	public String getBforeAddrName () { return bforeAddrName ; }
	public String getBforeSessnName() { return bforeSessnName; }

	// setter
	public void setLoginLogId    (String str) { this.loginLogId     = str; }
	public void setUserId        (String str) { this.userId         = str; }
	public void setClsfyCode     (String str) { this.clsfyCode      = str; }
	public void setAddrName      (String str) { this.addrName       = str; }
	public void setSessnName     (String str) { this.sessnName      = str; }
	public void setBforeAddrName (String str) { this.bforeAddrName  = str; }
	public void setBforeSessnName(String str) { this.bforeSessnName = str; }

	@Override
	public String toString() {
		return
			"LoginLogVO ["
		  + 	  "loginLogId=" + loginLogId
		  + 	", userId=" + userId
		  + 	", clsfyCode=" + clsfyCode
		  + 	", addrName=" + addrName
		  + 	", sessnName=" + sessnName
		  + 	", bforeAddrName=" + bforeAddrName
		  + 	", bforeSessnName=" + bforeSessnName
		  + "]";
	}
}