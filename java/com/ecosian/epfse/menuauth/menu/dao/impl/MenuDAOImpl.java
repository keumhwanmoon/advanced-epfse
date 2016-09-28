/*
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 메뉴 DAO Implements
    - 최초작성일 : 2014-05-02
    - 작  성  자 : 문금환
    - 비      고 :
--------------------------------------------------------------------------------
*/
package com.ecosian.epfse.menuauth.menu.dao.impl;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ecosian.epfse.menuauth.menu.dao.MenuDAO;
import com.ecosian.epfse.menuauth.menu.dao.vo.MenuVO;

@Repository("menuOra")
public class MenuDAOImpl implements MenuDAO
{
    @Autowired // 해당 변수 type 과 일치하는 bean 을 가져온다.
    private SqlSession sql;

    public List<MenuVO> getTreeList(MenuVO vo)
    {
        return sql.selectList("menuOra.selectTreeList", vo);
    }

    public MenuVO getInfo(MenuVO vo)
    {
        return sql.selectOne("menuOra.selectInfo", vo);
    }

    public String getDupYn(MenuVO vo)
    {
        return sql.selectOne("menuOra.selectDupYn", vo);
    }

    public String getAddrDupYn(MenuVO vo)
    {
        return sql.selectOne("menuOra.selectAddrDupYn", vo);
    }

    public String getRootCount(MenuVO vo)
    {
        return sql.selectOne("menuOra.selectRootCount", vo);
    }

    public String getRowId(MenuVO vo)
    {
        return sql.selectOne("menuOra.selectRowId", vo);
    }

    public String getPrntsRowId(MenuVO vo)
    {
        return sql.selectOne("menuOra.selectPrntsRowId", vo);
    }

    public int rgstInfo(MenuVO vo)
    {
        return sql.insert("menuOra.insertInfo", vo);
    }

    public int updtInfo(MenuVO vo)
    {
        return sql.update("menuOra.updateInfo", vo);
    }

    public int updtPrntsMenuNoInfo(MenuVO vo)
    {
        return sql.update("menuOra.updatePrntsMenuNoInfo", vo);
    }

    public int deltInfo(MenuVO vo)
    {
        return sql.update("menuOra.deleteInfo", vo);
    }
}