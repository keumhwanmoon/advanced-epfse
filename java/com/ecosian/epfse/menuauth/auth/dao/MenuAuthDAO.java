/*
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 메뉴권한 DAO Interface
    - 최초작성일 : 2014-05-08
    - 작  성  자 : 문금환
    - 비      고 :
--------------------------------------------------------------------------------
*/
package com.ecosian.epfse.menuauth.auth.dao;

import java.util.List;

import com.ecosian.epfse.menuauth.auth.dao.vo.MenuAuthVO;

public interface MenuAuthDAO
{
    public List<MenuAuthVO> getList(MenuAuthVO vo);
    public MenuAuthVO getInfo(MenuAuthVO vo);
    public int rgstList(MenuAuthVO vo);
    public int updtList(MenuAuthVO vo);
    public int updtAuthInfo(MenuAuthVO vo);
    public int updtMenuInfo(MenuAuthVO vo);
    public int deltList(MenuAuthVO vo);
    public int deltAuthList(MenuAuthVO vo);
    public int deltMenuInfo(MenuAuthVO vo);
}