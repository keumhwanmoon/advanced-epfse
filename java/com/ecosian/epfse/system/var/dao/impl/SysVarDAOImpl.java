/*
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 시스템변수 DAO Implements
    - 최초작성일 : 2014-06-24
    - 작  성  자 : 문금환
    - 비      고 :
--------------------------------------------------------------------------------
*/
package com.ecosian.epfse.system.var.dao.impl;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ecosian.epfse.system.var.dao.SysVarDAO;
import com.ecosian.epfse.system.var.dao.vo.SysVarVO;

@Repository("sysVarOra")
public class SysVarDAOImpl implements SysVarDAO
{
    @Autowired // 해당 변수 type 과 일치하는 bean 을 가져온다.
    private SqlSession sql;

    public List<SysVarVO> getList(SysVarVO vo)
    {
        return sql.selectList("sysVarOra.selectList", vo);
    }

    public String getDupYn(SysVarVO vo)
    {
        return sql.selectOne("sysVarOra.selectDupYn", vo);
    }

    public int rgstInfo(SysVarVO vo)
    {
        return sql.update("sysVarOra.insertInfo", vo);
    }

    public int updtInfo(SysVarVO vo)
    {
        return sql.update("sysVarOra.updateInfo", vo);
    }

    public int deltList(SysVarVO vo)
    {
        return sql.delete("sysVarOra.deleteList", vo);
    }
}