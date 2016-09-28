/*
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 표준용어 DAO Implements
    - 최초작성일 : 2014-06-13
    - 작  성  자 : 문금환
    - 비      고 :
--------------------------------------------------------------------------------
*/
package com.ecosian.epfse.develop.stdtrm.dao.impl;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ecosian.epfse.develop.stdtrm.dao.StdtrmDAO;
import com.ecosian.epfse.develop.stdtrm.dao.vo.StdtrmVO;

@Repository("stdtrmDAO")
public class StdtrmDAOImpl implements StdtrmDAO
{
    @Autowired // 해당 변수 type 과 일치하는 bean 을 가져온다.
    private SqlSession sql;

    public List<StdtrmVO> getList(StdtrmVO vo)
    {
        return sql.selectList("stdtrmOra.selectList", vo);
    }

    public List<StdtrmVO> getEngInqrList(StdtrmVO vo)
    {
        return sql.selectList("stdtrmOra.selectEngInqrList", vo);
    }

    public List<StdtrmVO> getKrnInqrList(StdtrmVO vo)
    {
        return sql.selectList("stdtrmOra.selectKrnInqrList", vo);
    }

    public List<StdtrmVO> getSaveList()
    {
        return sql.selectList("stdtrmOra.selectSaveList");
    }

    public String getKrnNameDupYn(StdtrmVO vo)
    {
        return sql.selectOne("stdtrmOra.selectKrnNameDupYn", vo);
    }

    public String getEngNfrmltNameYn(StdtrmVO vo)
    {
        return sql.selectOne("stdtrmOra.selectEngNfrmltNameDupYn", vo);
    }

    public String getRowId(StdtrmVO vo)
    {
        return sql.selectOne("stdtrmOra.selectRowId", vo);
    }

    public int rgstInfo(StdtrmVO vo)
    {
        return sql.insert("stdtrmOra.insertInfo", vo);
    }

    public int updtInfo(StdtrmVO vo)
    {
        return sql.update("stdtrmOra.updateInfo", vo);
    }

    public int deltList(StdtrmVO vo)
    {
        return sql.delete("stdtrmOra.deleteList", vo);
    }
}