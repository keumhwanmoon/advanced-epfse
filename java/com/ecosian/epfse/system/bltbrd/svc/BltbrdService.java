/*
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 게시판 Service Interface
    - 최초작성일 : 2014-06-30
    - 작  성  자 : 문금환
    - 비      고 :
--------------------------------------------------------------------------------
*/
package com.ecosian.epfse.system.bltbrd.svc;

import com.ecosian.epfse.system.bltbrd.dao.vo.BltbrdVO;
import com.ecosian.epfse.system.bltn.dao.vo.BltnVO;
import com.ecosian.epfse.system.common.Channel;

public interface BltbrdService
{
    public Channel getList(BltbrdVO vo);
    public Channel getInfo(BltbrdVO vo);
    public Channel saveList(BltbrdVO vo);
    public Channel deltList(BltbrdVO vo, BltnVO voBltn);
}