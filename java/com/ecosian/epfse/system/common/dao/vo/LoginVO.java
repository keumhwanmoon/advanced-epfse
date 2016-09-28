/*
--------------------------------------------------------------------------------
	PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
	- 단위업무명 : 로그인 VO
	- 최초작성일 : 2014-04-14
	- 작  성  자 : 문금환
	- 비      고 : 
-------------------------------------------------------------------------------
*/
package com.ecosian.epfse.system.common.dao.vo;

public class LoginVO
{
	private String userId   ; // 사용자ID
	private String pwdName  ; // 비밀번호명
	private String ssoYn    ; // SSO여부
	private String clsfyCode; // 구분코드
	private String addrName ; // 주소명
	private String sessnName; // 세션명
	private String useYn    ; // 사용여부

	// getter
	public String getUserId   () { return userId   ; }
	public String getPwdName  () { return pwdName  ; }
	public String getSsoYn    () { return ssoYn    ; }
	public String getClsfyCode() { return clsfyCode; }
	public String getAddrName () { return addrName ; }
	public String getSessnName() { return sessnName; }
	public String getUseYn    () { return useYn    ; }

	// setter
	public void setUserId   (String str) { this.userId    = str; }
	public void setPwdName  (String str) { this.pwdName   = str; }
	public void setSsoYn    (String str) { this.ssoYn     = str; }
	public void setClsfyCode(String str) { this.clsfyCode = str; }
	public void setAddrName (String str) { this.addrName  = str; }
	public void setSessnName(String str) { this.sessnName = str; }
	public void setUseYn    (String str) { this.useYn     = str; }

	@Override
	public String toString() {
		return
			"LoginVO ["
		  + 	  "userId=" + userId
		  + 	", pwdName=" + pwdName
		  + 	", ssoYn=" + ssoYn
		  + 	", clsfyCode=" + clsfyCode
		  + 	", addrName=" + addrName
		  + 	", sessnName=" + sessnName
		  + 	", useYn=" + useYn
		  + "]";
	}
}