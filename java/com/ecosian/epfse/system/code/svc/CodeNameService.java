/*
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 코드명 Service Interface
    - 최초작성일 : 2014-04-17
    - 작  성  자 : 문금환
    - 비      고 :
--------------------------------------------------------------------------------
*/
package com.ecosian.epfse.system.code.svc;

import com.ecosian.epfse.system.code.dao.vo.CodeNameVO;
import com.ecosian.epfse.system.common.Channel;

public interface CodeNameService
{
    public Channel getList(CodeNameVO vo);
    public Channel getComboList(CodeNameVO vo);
}