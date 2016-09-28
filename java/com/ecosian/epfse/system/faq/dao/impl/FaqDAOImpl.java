/*
--------------------------------------------------------------------------------
    PROJECT NAME : ES-MRV3
--------------------------------------------------------------------------------
    - 단위업무명 : FAQ DAO Implements
    - 최초작성일 : 2014-09-18
    - 작  성  자 : 이승윤
    - 비      고 :
--------------------------------------------------------------------------------
*/
package com.ecosian.epfse.system.faq.dao.impl;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ecosian.epfse.system.faq.dao.FaqDAO;
import com.ecosian.epfse.system.faq.dao.vo.FaqVO;

@Repository("faqOra")
public class FaqDAOImpl implements FaqDAO
{
    @Autowired // 해당 변수 type 과 일치하는 bean 을 가져온다.
    private SqlSession sql;

    public List<FaqVO> getList(FaqVO vo)
    {
        return sql.selectList("faqOra.selectList", vo);
    }

    public List<FaqVO> getBestList(FaqVO vo)
    {
        return sql.selectList("faqOra.selectBestList", vo);
    }

    public String getEditPsbleYn(FaqVO vo)
    {
        return sql.selectOne("faqOra.selectEditPsbleYn", vo);
    }

    public String getDupYn(FaqVO vo)
    {
        return sql.selectOne("faqOra.selectDupYn", vo);
    }

    public int rgstInfo(FaqVO vo)
    {
        return sql.insert("faqOra.insertInfo", vo);
    }

    public int updtInfo(FaqVO vo)
    {
        return sql.update("faqOra.updateInfo", vo);
    }

    public int updtInqrCountInfo(FaqVO vo)
    {
        return sql.update("faqOra.updateInqrCountInfo", vo);
    }

    public int deltInfo(FaqVO vo)
    {
        return sql.delete("faqOra.deleteInfo", vo);
    }
}