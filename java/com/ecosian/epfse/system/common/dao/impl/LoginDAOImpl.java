/*
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 로그인 DAO Implements
    - 최초작성일 : 2014-04-14
    - 작  성  자 : 문금환
    - 비      고 :
--------------------------------------------------------------------------------
*/
package com.ecosian.epfse.system.common.dao.impl;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ecosian.epfse.system.common.dao.LoginDAO;
import com.ecosian.epfse.system.common.dao.vo.LoginVO;

@Repository("loginOra")
public class LoginDAOImpl implements LoginDAO
{
    @Autowired // 해당 변수 type 과 일치하는 bean 을 가져온다.
    private SqlSession sql;

    public LoginVO getInfo(LoginVO vo)
    {
        return sql.selectOne("loginOra.selectInfo", vo);
    }
}