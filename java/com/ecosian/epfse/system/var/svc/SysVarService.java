/*
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 시스템변수 Service Interface
    - 최초작성일 : 2014-06-24
    - 작  성  자 : 문금환
    - 비      고 :
--------------------------------------------------------------------------------
*/
package com.ecosian.epfse.system.var.svc;

import com.ecosian.epfse.system.var.dao.vo.SysVarVO;
import com.ecosian.epfse.system.common.Channel;

public interface SysVarService
{
    public Channel getList(SysVarVO vo);
    public Channel saveList(SysVarVO vo);
    public Channel deltList(SysVarVO vo);
}