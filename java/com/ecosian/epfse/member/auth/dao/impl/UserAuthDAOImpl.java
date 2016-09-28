/*
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 사용자권한 DAO Implements
    - 최초작성일 : 2014-06-26
    - 작  성  자 : 문금환
    - 비      고 :
--------------------------------------------------------------------------------
*/
package com.ecosian.epfse.member.auth.dao.impl;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ecosian.epfse.member.auth.dao.UserAuthDAO;
import com.ecosian.epfse.member.auth.dao.vo.UserAuthVO;

@Repository("userAuthOra")
public class UserAuthDAOImpl implements UserAuthDAO
{
    @Autowired // 해당 변수 type 과 일치하는 bean 을 가져온다.
    private SqlSession sql;

    public List<UserAuthVO> getList(UserAuthVO vo)
    {
        return sql.selectList("userAuthOra.selectList", vo);
    }

    public int rgstList(UserAuthVO vo)
    {
        return sql.insert("userAuthOra.insertList", vo);
    }

    public int updtAuthInfo(UserAuthVO vo)
    {
        return sql.update("userAuthOra.updateAuthInfo", vo);
    }

    public int updtUserInfo(UserAuthVO vo)
    {
        return sql.update("userAuthOra.updateUserIdInfo", vo);
    }

    public int deltList(UserAuthVO vo)
    {
        return sql.delete("userAuthOra.deleteList", vo);
    }

    public int deltAuthList(UserAuthVO vo)
    {
        return sql.delete("userAuthOra.deleteAuthList", vo);
    }

    public int deltUserList(UserAuthVO vo)
    {
        return sql.delete("userAuthOra.deleteUserList", vo);
    }
}