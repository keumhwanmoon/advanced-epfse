/*
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 메뉴명 DAO Implements
    - 최초작성일 : 2014-04-18
    - 작  성  자 : 문금환
    - 비      고 :
--------------------------------------------------------------------------------
*/
package com.ecosian.epfse.menuauth.menu.dao.impl;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ecosian.epfse.menuauth.menu.dao.MenuNameDAO;
import com.ecosian.epfse.menuauth.menu.dao.vo.MenuNameVO;

@Repository("menuNameOra")
public class MenuNameDAOImpl implements MenuNameDAO
{
    @Autowired // 해당 변수 type 과 일치하는 bean 을 가져온다.
    private SqlSession sql;

    public List<MenuNameVO> getList(MenuNameVO vo)
    {
        return sql.selectList("menuNameOra.selectList", vo);
    }

    public int rgstInfo(MenuNameVO vo)
    {
        return sql.insert("menuNameOra.insertInfo", vo);
    }

    public int updtInfo(MenuNameVO vo)
    {
        return sql.update("menuNameOra.updateInfo", vo);
    }

    public int deltInfo(MenuNameVO vo)
    {
        return sql.delete("menuNameOra.deleteInfo", vo);
    }
}