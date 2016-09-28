/*
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 테이블 DAO Implements
    - 최초작성일 : 2014-04-22
    - 작  성  자 : 문금환
    - 비      고 :
--------------------------------------------------------------------------------
*/
package com.ecosian.epfse.develop.table.dao.impl;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ecosian.epfse.develop.table.dao.TableDAO;
import com.ecosian.epfse.develop.table.dao.vo.TableVO;

@Repository("tableOra")
public class TableDAOImpl implements TableDAO
{
    @Autowired // 해당 변수 type 과 일치하는 bean 을 가져온다.
    private SqlSession sql;

    public List<TableVO> getList(TableVO vo)
    {
        return sql.selectList("tableOra.selectList", vo);
    }

    public List<TableVO> getOwnerList(TableVO vo)
    {
        return sql.selectList("tableOra.selectOwnerList", vo);
    }

    public List<TableVO> getColList(TableVO vo)
    {
        return sql.selectList("tableOra.selectColList", vo);
    }

    public List<TableVO> getQueryList(TableVO vo)
    {
        return sql.selectList("tableOra.selectQueryList", vo);
    }

    public int rgstItemList(TableVO vo)
    {
        return sql.insert("tableOra.insertList", vo);
    }

    public int rgstMenuList(TableVO vo)
    {
        return sql.insert("tableOra.insertMenuList", vo);
    }

    public int rgstMenuNameList(TableVO vo)
    {
        return sql.insert("tableOra.insertMenuNameList", vo);
    }
}