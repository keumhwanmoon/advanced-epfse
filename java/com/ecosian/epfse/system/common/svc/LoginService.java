/*
--------------------------------------------------------------------------------
	PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
	- 단위업무명 : 로그인 Service Interface
	- 최초작성일 : 2014-04-11
	- 작  성  자 : 문금환
	- 비      고 : 
--------------------------------------------------------------------------------
*/
package com.ecosian.epfse.system.common.svc;

import com.ecosian.epfse.system.common.dao.vo.LoginVO;
import com.ecosian.epfse.system.common.Channel;

public interface LoginService
{
	public Channel login(LoginVO vo);
	public Channel lout(LoginVO vo);
}