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
package com.ecosian.epfse.system.filerm.dao.impl;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ecosian.epfse.system.filerm.dao.FilermAttchDAO;
import com.ecosian.epfse.system.filerm.dao.vo.FilermAttchVO;


@Repository("filermAttchOra")
public class FilermAttchDAOImpl implements FilermAttchDAO
{
    @Autowired // 해당 변수 type 과 일치하는 bean 을 가져온다.
    private SqlSession sql;

    public List<FilermAttchVO> getList(FilermAttchVO vo)
    {
        return sql.selectList("filermAttchOra.selectList", vo);
    }

    public int rgstList(FilermAttchVO vo)
    {
        return sql.insert("filermAttchOra.insertList", vo);
    }

    public int deltList(FilermAttchVO vo)
    {
        return sql.delete("filermAttchOra.deleteList", vo);
    }
}