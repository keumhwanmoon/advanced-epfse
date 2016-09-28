/*
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 사용자 Service Interface
    - 최초작성일 : 2014-06-25
    - 작  성  자 : 문금환
    - 비      고 :
--------------------------------------------------------------------------------
*/
package com.ecosian.epfse.member.user.svc;

import com.ecosian.epfse.member.auth.dao.vo.UserAuthVO;
import com.ecosian.epfse.member.user.dao.vo.UserVO;
import com.ecosian.epfse.system.common.Channel;

public interface UserService
{
    public Channel getList(UserVO vo);
    public Channel getAuthRgstTargList(UserVO vo);
    public Channel saveList(UserVO vo, UserAuthVO voUserAuth);
    public Channel deltList(UserVO vo, UserAuthVO voUserAuth);
}