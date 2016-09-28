/*
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 게시물첨부 Service Interface
    - 최초작성일 : 2014-05-21
    - 작  성  자 : 문금환
    - 비      고 :
--------------------------------------------------------------------------------
*/
package com.ecosian.epfse.system.bltn.svc;

import com.ecosian.epfse.system.bltn.dao.vo.BltnAttchVO;
import com.ecosian.epfse.system.common.Channel;

public interface BltnAttchService
{
    public Channel getList(BltnAttchVO vo);
}