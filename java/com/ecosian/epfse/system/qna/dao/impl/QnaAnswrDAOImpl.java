/*
--------------------------------------------------------------------------------
    PROJECT NAME : ES-MRV3
--------------------------------------------------------------------------------
    - 단위업무명 : Q&A답변 DAO Implements
    - 최초작성일 : 2014-09-18
    - 작  성  자 : 이승윤
    - 비      고 :
--------------------------------------------------------------------------------
*/
package com.ecosian.epfse.system.qna.dao.impl;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ecosian.epfse.system.qna.dao.QnaAnswrDAO;
import com.ecosian.epfse.system.qna.dao.vo.QnaAnswrVO;

@Repository("qnaAnswrOra")
public class QnaAnswrDAOImpl implements QnaAnswrDAO
{
    @Autowired // 해당 변수 type 과 일치하는 bean 을 가져온다.
    private SqlSession sql;

    public int rgstInfo(QnaAnswrVO vo)
    {
        return sql.insert("qnaAnswrOra.insertInfo", vo);
    }

    public int updtInfo(QnaAnswrVO vo)
    {
        return sql.update("qnaAnswrOra.updateInfo", vo);
    }

    public int deltInfo(QnaAnswrVO vo)
    {
        return sql.delete("qnaAnswrOra.deleteInfo", vo);
    }
}