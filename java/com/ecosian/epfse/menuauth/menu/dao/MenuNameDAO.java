/*
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 메뉴명 DAO Interface
    - 최초작성일 : 2014-04-18
    - 작성자     : 문금환
    - 비      고 :
--------------------------------------------------------------------------------
*/
package com.ecosian.epfse.menuauth.menu.dao;

import java.util.List;

import com.ecosian.epfse.menuauth.menu.dao.vo.MenuNameVO;

public interface MenuNameDAO
{
    public List<MenuNameVO> getList(MenuNameVO vo);
    public int rgstInfo(MenuNameVO vo);
    public int updtInfo(MenuNameVO vo);
    public int deltInfo(MenuNameVO vo);
}