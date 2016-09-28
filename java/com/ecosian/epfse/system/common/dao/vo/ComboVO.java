/*
--------------------------------------------------------------------------------
	PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
	- 단위업무명 : 콤보 VO
	- 최초작성일 : 2014-07-24
	- 작  성  자 : 문금환
	- 비      고 : 
--------------------------------------------------------------------------------
*/
package com.ecosian.epfse.system.common.dao.vo;

public class ComboVO
{
	private String userdefCode; // 사용자정의코드
	private String codeName   ; // 코드명
	private String chcValue   ; // 선택값

	// getter
	public String getUserdefCode() { return userdefCode; }
	public String getCodeName   () { return codeName   ; }
	public String getChcValue   () { return chcValue   ; }

	// setter
	public void setUserdefCode(String str) { this.userdefCode = str; }
	public void setCodeName   (String str) { this.codeName    = str; }
	public void setChcValue   (String str) { this.chcValue    = str; }

	@Override
	public String toString() {
		return
			"ComboVO ["
		  + 	", userdefCode=" + userdefCode
		  + 	", codeName=" + codeName
		  + 	", chcValue=" + chcValue
		  + "]";
	}
}