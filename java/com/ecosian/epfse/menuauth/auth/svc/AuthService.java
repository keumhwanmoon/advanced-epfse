/*
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 권한 Service Interface
    - 최초작성일 : 2014-06-26
    - 작  성  자 : 문금환
    - 비      고 :
--------------------------------------------------------------------------------
*/
package com.ecosian.epfse.menuauth.auth.svc;

import com.ecosian.epfse.member.auth.dao.vo.UserAuthVO;
import com.ecosian.epfse.menuauth.auth.dao.vo.AuthVO;
import com.ecosian.epfse.menuauth.auth.dao.vo.MenuAuthVO;
import com.ecosian.epfse.system.common.Channel;

public interface AuthService
{
    public Channel getList(AuthVO vo);
    public Channel getComboList(AuthVO vo);
    public Channel saveList(AuthVO vo, MenuAuthVO voMenuAuth, UserAuthVO voUserAuth);
    public Channel deltList(AuthVO vo, MenuAuthVO voMenuAuth, UserAuthVO voUserAuth);
}