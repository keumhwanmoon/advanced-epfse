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
package com.ecosian.epfse.system.qna.dao.impl;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ecosian.epfse.system.qna.dao.QnaAttchDAO;
import com.ecosian.epfse.system.qna.dao.vo.QnaAttchVO;

@Repository("qnaAttchOra")
public class QnaAttchDAOImpl implements QnaAttchDAO
{
    @Autowired // 해당 변수 type 과 일치하는 bean 을 가져온다.
    private SqlSession sql;

    public List<QnaAttchVO> getList(QnaAttchVO vo)
    {
        return sql.selectList("qnaAttchOra.selectList", vo);
    }

    public int rgstList(QnaAttchVO vo)
    {
        return sql.insert("qnaAttchOra.insertList", vo);
    }

    public int deltList(QnaAttchVO vo)
    {
        return sql.delete("qnaAttchOra.deleteList", vo);
    }
}