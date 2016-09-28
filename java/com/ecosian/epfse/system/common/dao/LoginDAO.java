/*
--------------------------------------------------------------------------------
	PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
	- 단위업무명 : 로그인 DAO Interface
	- 최초작성일 : 2014-04-14
	- 작성자     : 문금환
	- 비      고 : 
--------------------------------------------------------------------------------
*/
package com.ecosian.epfse.system.common.dao;

import com.ecosian.epfse.system.common.dao.vo.LoginVO;

public interface LoginDAO
{
	public LoginVO getInfo(LoginVO vo);
}