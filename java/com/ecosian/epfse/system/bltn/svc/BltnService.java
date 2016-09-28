/*
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 게시물 Service Interface
    - 최초작성일 : 2014-05-20
    - 작  성  자 : 문금환
    - 비      고 :
--------------------------------------------------------------------------------
*/
package com.ecosian.epfse.system.bltn.svc;

import com.ecosian.epfse.system.bltn.dao.vo.BltnAttchVO;
import com.ecosian.epfse.system.bltn.dao.vo.BltnVO;
import com.ecosian.epfse.system.common.Channel;

public interface BltnService
{
    public Channel getList(BltnVO vo);
    public Channel getInfo(BltnVO vo);
    public Channel saveInfo(BltnVO vo, BltnAttchVO voBltnAttch);
    public Channel deltInfo(BltnVO vo, BltnAttchVO voBltnAttch);
}