/*
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 메뉴 DAO Interface
    - 최초작성일 : 2014-05-02
    - 작  성  자 : 문금환
    - 비      고 :
--------------------------------------------------------------------------------
*/
package com.ecosian.epfse.menuauth.menu.dao;

import java.util.List;

import com.ecosian.epfse.menuauth.menu.dao.vo.MenuVO;

public interface MenuDAO
{
    public List<MenuVO> getTreeList(MenuVO vo);
    public MenuVO getInfo(MenuVO vo);
    public String getDupYn(MenuVO vo);
    public String getAddrDupYn(MenuVO vo);
    public String getRootCount(MenuVO vo);
    public String getRowId(MenuVO vo);
    public String getPrntsRowId(MenuVO vo);
    public int rgstInfo(MenuVO vo);
    public int updtInfo(MenuVO vo);
    public int updtPrntsMenuNoInfo(MenuVO vo);
    public int deltInfo(MenuVO vo);
}