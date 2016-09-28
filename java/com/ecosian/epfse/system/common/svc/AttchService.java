/*
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 첨부 Service Interface
    - 최초작성일 : 2014-05-15
    - 작  성  자 : 문금환
    - 비      고 :
--------------------------------------------------------------------------------
*/
package com.ecosian.epfse.system.common.svc;

import com.ecosian.epfse.system.common.dao.vo.AttchVO;
import com.ecosian.epfse.system.common.Channel;

public interface AttchService
{
    public Channel getInfo(AttchVO vo);
    public Channel rgstInfo(AttchVO vo);
}