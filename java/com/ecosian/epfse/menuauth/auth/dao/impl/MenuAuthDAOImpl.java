/*
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 메뉴권한 DAO Implements
    - 최초작성일 : 2014-05-08
    - 작  성  자 : 문금환
    - 비      고 :
--------------------------------------------------------------------------------
*/
package com.ecosian.epfse.menuauth.auth.dao.impl;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ecosian.epfse.menuauth.auth.dao.MenuAuthDAO;
import com.ecosian.epfse.menuauth.auth.dao.vo.MenuAuthVO;

@Repository("menuAuthOra")
public class MenuAuthDAOImpl implements MenuAuthDAO
{
    @Autowired // 해당 변수 type 과 일치하는 bean 을 가져온다.
    private SqlSession sql;

    public List<MenuAuthVO> getList(MenuAuthVO vo)
    {
        return sql.selectList("menuAuthOra.selectList", vo);
    }

    public MenuAuthVO getInfo(MenuAuthVO vo)
    {
        return sql.selectOne("menuAuthOra.selectInfo", vo);
    }

    public int rgstList(MenuAuthVO vo)
    {
        return sql.insert("menuAuthOra.insertList", vo);
    }

    public int updtList(MenuAuthVO vo)
    {
        return sql.update("menuAuthOra.updateList", vo);
    }

    public int updtAuthInfo(MenuAuthVO vo)
    {
        return sql.update("menuAuthOra.updateAuthInfo", vo);
    }

    public int updtMenuInfo(MenuAuthVO vo)
    {
        return sql.update("menuAuthOra.updateMenuNoInfo", vo);
    }

    public int deltList(MenuAuthVO vo)
    {
        return sql.delete("menuAuthOra.deleteList", vo);
    }

    public int deltAuthList(MenuAuthVO vo)
    {
        return sql.delete("menuAuthOra.deleteAuthList", vo);
    }

    public int deltMenuInfo(MenuAuthVO vo)
    {
        return sql.delete("menuAuthOra.deleteMenuInfo", vo);
    }
}