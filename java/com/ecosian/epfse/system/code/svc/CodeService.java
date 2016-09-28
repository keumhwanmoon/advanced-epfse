/*
--------------------------------------------------------------------------------
	PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
	- 단위업무명 : 코드 Service Interface
	- 최초작성일 : 2014-04-29
	- 작  성  자 : 문금환
	- 비      고 : 
--------------------------------------------------------------------------------
*/
package com.ecosian.epfse.system.code.svc;

import com.ecosian.epfse.system.code.dao.vo.CodeNameVO;
import com.ecosian.epfse.system.code.dao.vo.CodeVO;
import com.ecosian.epfse.system.common.Channel;

public interface CodeService
{
	public Channel saveList(CodeVO vo, CodeNameVO voCodeName);
	public Channel deltList(CodeVO vo);
}