/*
--------------------------------------------------------------------------------
    PROJECT NAME : ES-MRV3
--------------------------------------------------------------------------------
    - 단위업무명 : 공지사항 DAO Implements
    - 최초작성일 : 2014-09-18
    - 작  성  자 : 이승윤
    - 비      고 :
--------------------------------------------------------------------------------
*/
package com.ecosian.epfse.system.qna.dao.impl;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ecosian.epfse.system.qna.dao.QnaDAO;
import com.ecosian.epfse.system.qna.dao.vo.QnaVO;

@Repository("qnaOra")
public class QnaDAOImpl implements QnaDAO
{
    @Autowired // 해당 변수 type 과 일치하는 bean 을 가져온다.
    private SqlSession sql;

    public List<QnaVO> getList(QnaVO vo)
    {
        return sql.selectList("qnaOra.selectList", vo);
    }

    public QnaVO getInfo(QnaVO vo)
    {
        return sql.selectOne("qnaOra.selectInfo", vo);
    }

    public String getEditPsbleYn(QnaVO vo)
    {
        return sql.selectOne("qnaOra.selectEditPsbleYn", vo);
    }

    public String getDupYn(QnaVO vo)
    {
        return sql.selectOne("qnaOra.selectDupYn", vo);
    }

    public int rgstInfo(QnaVO vo)
    {
        return sql.insert("qnaOra.insertInfo", vo);
    }

    public int updtInfo(QnaVO vo)
    {
        return sql.update("qnaOra.updateInfo", vo);
    }

    public int updtInqrCountInfo(QnaVO vo)
    {
        return sql.update("qnaOra.updateInqrCountInfo", vo);
    }

    public int deltInfo(QnaVO vo)
    {
        return sql.delete("qnaOra.deleteInfo", vo);
    }
}