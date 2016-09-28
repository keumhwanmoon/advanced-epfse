/*
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 메뉴 Service Interface
    - 최초작성일 : 2014-05-02
    - 작  성  자 : 문금환
    - 비      고 :
--------------------------------------------------------------------------------
*/
package com.ecosian.epfse.menuauth.menu.svc;

import com.ecosian.epfse.menuauth.auth.dao.vo.MenuAuthVO;
import com.ecosian.epfse.menuauth.menu.dao.vo.MenuNameVO;
import com.ecosian.epfse.menuauth.menu.dao.vo.MenuVO;
import com.ecosian.epfse.system.common.Channel;

public interface MenuService
{
    public Channel getTreeList(MenuVO vo);
    public Channel getInfo(MenuVO vo);
    public Channel rgstInfo(MenuVO vo);
    public Channel updtInfo(MenuVO vo, MenuNameVO voMenuName, MenuAuthVO voMenuAuth);
    public Channel deltInfo(MenuVO vo, MenuNameVO voMenuName, MenuAuthVO voMenuAuth);
}