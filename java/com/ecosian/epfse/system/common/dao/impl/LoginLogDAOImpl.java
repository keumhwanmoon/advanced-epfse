/*
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 로그인로그 DAO Implements
    - 최초작성일 : 2014-04-14
    - 작  성  자 : 문금환
    - 비      고 :
--------------------------------------------------------------------------------
*/
package com.ecosian.epfse.system.common.dao.impl;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ecosian.epfse.system.common.dao.LoginLogDAO;
import com.ecosian.epfse.system.common.dao.vo.LoginLogVO;

@Repository("loginLogOra")
public class LoginLogDAOImpl implements LoginLogDAO
{
    @Autowired // 해당 변수 type 과 일치하는 bean 을 가져온다.
    private SqlSession sql;

    public void rgstInfo(LoginLogVO vo)
    {
        sql.insert("loginLogOra.insertInfo", vo);
    }
}