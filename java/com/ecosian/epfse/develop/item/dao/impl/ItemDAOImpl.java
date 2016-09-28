/*
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 항목 DAO Implements
    - 최초작성일 : 2014-06-24
    - 작  성  자 : 문금환
    - 비      고 :
--------------------------------------------------------------------------------
*/
package com.ecosian.epfse.develop.item.dao.impl;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ecosian.epfse.develop.item.dao.ItemDAO;
import com.ecosian.epfse.develop.item.dao.vo.ItemVO;

@Repository("itemOra")
public class ItemDAOImpl implements ItemDAO
{
    @Autowired // 해당 변수 type 과 일치하는 bean 을 가져온다.
    private SqlSession sql;

    public List<ItemVO> getList(ItemVO vo)
    {
        return sql.selectList("itemOra.selectList", vo);
    }

    public String getDupYn(ItemVO vo)
    {
        return sql.selectOne("itemOra.selectDupYn", vo);
    }

    public int rgstInfo(ItemVO vo)
    {
        return sql.insert("itemOra.insertInfo", vo);
    }

    public int updtInfo(ItemVO vo)
    {
        return sql.update("itemOra.updateInfo", vo);
    }

    public int deltList(ItemVO vo)
    {
        return sql.delete("itemOra.deleteList", vo);
    }
}