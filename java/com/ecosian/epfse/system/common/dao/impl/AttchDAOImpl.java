/*
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 첨부 DAO Implements
    - 최초작성일 : 2014-05-15
    - 작  성  자 : 문금환
    - 비      고 :
--------------------------------------------------------------------------------
*/
package com.ecosian.epfse.system.common.dao.impl;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ecosian.epfse.system.common.dao.AttchDAO;
import com.ecosian.epfse.system.common.dao.vo.AttchVO;

@Repository("attchOra")
public class AttchDAOImpl implements AttchDAO
{
    @Autowired // 해당 변수 type 과 일치하는 bean 을 가져온다.
    private SqlSession sql;

    public AttchVO getInfo(AttchVO vo)
    {
        return sql.selectOne("attchOra.selectInfo", vo);
    }

    public String getDupYn(AttchVO vo)
    {
        return sql.selectOne("attchOra.selectDupYn", vo);
    }

    public int rgstInfo(AttchVO vo)
    {
        return sql.update("attchOra.insertInfo", vo);
    }
}