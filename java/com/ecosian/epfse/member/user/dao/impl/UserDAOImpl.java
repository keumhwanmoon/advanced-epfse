/*
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 사용자 DAO Implements
    - 최초작성일 : 2014-06-25
    - 작  성  자 : 문금환
    - 비      고 :
--------------------------------------------------------------------------------
*/
package com.ecosian.epfse.member.user.dao.impl;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ecosian.epfse.member.user.dao.UserDAO;
import com.ecosian.epfse.member.user.dao.vo.UserVO;

@Repository("userOra")
public class UserDAOImpl implements UserDAO
{
    @Autowired // 해당 변수 type 과 일치하는 bean 을 가져온다.
    private SqlSession sql;

    public List<UserVO> getList(UserVO vo)
    {
        return sql.selectList("userOra.selectList", vo);
    }

    public List<UserVO> getAuthRgstTargList(UserVO vo)
    {
        return sql.selectList("userOra.selectAuthRgstTargList", vo);
    }

    public String getDupYn(UserVO vo)
    {
        return sql.selectOne("userOra.selectDupYn", vo);
    }

    public String getAdminExistYn(UserVO vo)
    {
        return sql.selectOne("userOra.selectAdminExistYn", vo);
    }

    public int rgstInfo(UserVO vo)
    {
        return sql.insert("userOra.insertInfo", vo);
    }

    public int updtInfo(UserVO vo)
    {
        return sql.update("userOra.updateInfo", vo);
    }

    public int deltList(UserVO vo)
    {
        return sql.delete("userOra.deleteList", vo);
    }
}