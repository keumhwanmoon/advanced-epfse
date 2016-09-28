/*
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 메뉴명 Service Interface
    - 최초작성일 : 2014-04-18
    - 작  성  자 : 문금환
    - 비      고 :
--------------------------------------------------------------------------------
*/
package com.ecosian.epfse.menuauth.menu.svc;

import com.ecosian.epfse.menuauth.menu.dao.vo.MenuNameVO;
import com.ecosian.epfse.system.common.Channel;

public interface MenuNameService
{
    public Channel getList(MenuNameVO vo);
}