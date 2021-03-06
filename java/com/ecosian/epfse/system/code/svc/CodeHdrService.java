/*
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 코드헤더 Service Interface
    - 최초작성일 : 2014-06-24
    - 작  성  자 : 문금환
    - 비      고 :
--------------------------------------------------------------------------------
*/
package com.ecosian.epfse.system.code.svc;

import com.ecosian.epfse.system.code.dao.vo.CodeHdrVO;
import com.ecosian.epfse.system.code.dao.vo.CodeNameVO;
import com.ecosian.epfse.system.code.dao.vo.CodeVO;
import com.ecosian.epfse.system.common.Channel;

public interface CodeHdrService
{
    public Channel getList(CodeHdrVO vo);
    public Channel saveList(CodeHdrVO vo, CodeVO voCode, CodeNameVO voCodeName);
    public Channel deltList(CodeHdrVO vo, CodeVO voCode);
}