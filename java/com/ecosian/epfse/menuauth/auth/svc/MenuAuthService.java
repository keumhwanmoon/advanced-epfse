/*
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 메뉴권한 Service Interface
    - 최초작성일 : 2014-05-12
    - 작  성  자 : 문금환
    - 비      고 :
--------------------------------------------------------------------------------
*/
package com.ecosian.epfse.menuauth.auth.svc;

import com.ecosian.epfse.menuauth.auth.dao.vo.MenuAuthVO;
import com.ecosian.epfse.system.common.Channel;

public interface MenuAuthService
{
    public Channel getList(MenuAuthVO vo);
    public Channel getInfo(MenuAuthVO vo);
    public Channel saveList(MenuAuthVO vo);
}