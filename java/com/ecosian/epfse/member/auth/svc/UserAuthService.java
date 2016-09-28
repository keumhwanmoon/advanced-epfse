/*
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 사용자권한 Service Interface
    - 최초작성일 : 2014-06-26
    - 작  성  자 : 문금환
    - 비      고 :
--------------------------------------------------------------------------------
*/
package com.ecosian.epfse.member.auth.svc;

import com.ecosian.epfse.member.auth.dao.vo.UserAuthVO;
import com.ecosian.epfse.system.common.Channel;

public interface UserAuthService
{
    public Channel getList(UserAuthVO vo);
    public Channel rgstList(UserAuthVO vo);
    public Channel deltList(UserAuthVO vo);
}