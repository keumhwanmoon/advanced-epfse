/*
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 게시물 DAO Implements
    - 최초작성일 : 2014-05-20
    - 작  성  자 : 문금환
    - 비      고 :
--------------------------------------------------------------------------------
*/
package com.ecosian.epfse.system.bltn.dao.impl;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ecosian.epfse.system.bltn.dao.BltnDAO;
import com.ecosian.epfse.system.bltn.dao.vo.BltnVO;

@Repository("bltnOra")
public class BltnDAOImpl implements BltnDAO
{
    @Autowired // 해당 변수 type 과 일치하는 bean 을 가져온다.
    private SqlSession sql;

    public List<BltnVO> getList(BltnVO vo)
    {
        return sql.selectList("bltnOra.selectList", vo);
    }

    public BltnVO getInfo(BltnVO vo)
    {
        return sql.selectOne("bltnOra.selectInfo", vo);
    }

    public String getRowId(BltnVO vo)
    {
        return sql.selectOne("bltnOra.selectRowId", vo);
    }

    public String getExistYn(BltnVO vo)
    {
        return sql.selectOne("bltnOra.selectExistYn", vo);
    }

    public String getEditPsbleYn(BltnVO vo)
    {
        return sql.selectOne("bltnOra.selectEditPsbleYn", vo);
    }

    public String getAnswrExistYn(BltnVO vo)
    {
        return sql.selectOne("bltnOra.selectAnswrExistYn", vo);
    }

    public int rgstInfo(BltnVO vo)
    {
        return sql.insert("bltnOra.insertInfo", vo);
    }

    public int updtInfo(BltnVO vo)
    {
        return sql.update("bltnOra.updateInfo", vo);
    }

    public int updtInqrCountInfo(BltnVO vo)
    {
        return sql.update("bltnOra.updateInqrCountInfo", vo);
    }

    public int deltInfo(BltnVO vo)
    {
        return sql.delete("bltnOra.deleteInfo", vo);
    }
}