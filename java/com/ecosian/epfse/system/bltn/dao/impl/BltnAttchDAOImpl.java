/*
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 게시물첨부 DAO Implements
    - 최초작성일 : 2014-05-21
    - 작  성  자 : 문금환
    - 비      고 :
--------------------------------------------------------------------------------
*/
package com.ecosian.epfse.system.bltn.dao.impl;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ecosian.epfse.system.bltn.dao.BltnAttchDAO;
import com.ecosian.epfse.system.bltn.dao.vo.BltnAttchVO;

@Repository("bltnAttchOra")
public class BltnAttchDAOImpl implements BltnAttchDAO
{
    @Autowired // 해당 변수 type 과 일치하는 bean 을 가져온다.
    private SqlSession sql;

    public List<BltnAttchVO> getList(BltnAttchVO vo)
    {
        return sql.selectList("bltnAttchOra.selectList", vo);
    }

    public int rgstList(BltnAttchVO vo)
    {
        return sql.update("bltnAttchOra.insertList", vo);
    }

    public int deltList(BltnAttchVO vo)
    {
        return sql.delete("bltnAttchOra.deleteList", vo);
    }
}