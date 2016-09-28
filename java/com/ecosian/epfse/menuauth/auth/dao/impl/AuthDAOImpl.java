/*
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 권한 DAO Implements
    - 최초작성일 : 2014-06-26
    - 작  성  자 : 문금환
    - 비      고 :
--------------------------------------------------------------------------------
*/
package com.ecosian.epfse.menuauth.auth.dao.impl;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ecosian.epfse.menuauth.auth.dao.AuthDAO;
import com.ecosian.epfse.menuauth.auth.dao.vo.AuthVO;

@Repository("authOra")
public class AuthDAOImpl implements AuthDAO
{
    @Autowired // 해당 변수 type 과 일치하는 bean 을 가져온다.
    private SqlSession sql;

    public List<AuthVO> getList(AuthVO vo)
    {
        return sql.selectList("authOra.selectList", vo);
    }

    public List<AuthVO> getComboList(AuthVO vo)
    {
        return sql.selectList("authOra.selectComboList", vo);
    }

    public String getDupYn(AuthVO vo)
    {
        return sql.selectOne("authOra.selectDupYn", vo);
    }

    public int rgstInfo(AuthVO vo)
    {
        return sql.insert("authOra.insertInfo", vo);
    }

    public int updtInfo(AuthVO vo)
    {
        return sql.update("authOra.updateInfo", vo);
    }

    public int deltList(AuthVO vo)
    {
        return sql.delete("authOra.deleteList", vo);
    }
}