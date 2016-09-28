/*
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 임시 DAO Implements
    - 최초작성일 : 2014-06-24
    - 작  성  자 : 문금환
    - 비      고 :
--------------------------------------------------------------------------------
*/
package com.ecosian.epfse.develop.temp.dao.impl;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ecosian.epfse.develop.temp.dao.TempDAO;
import com.ecosian.epfse.develop.temp.dao.vo.TempVO;
import com.ecosian.epfse.system.common.dao.vo.StockVO;

@Repository("tempOra")
public class TempDAOImpl implements TempDAO
{
    @Autowired // 해당 변수 type 과 일치하는 bean 을 가져온다.
    private SqlSession sql;

    public List<TempVO> getList(TempVO vo)
    {
        return sql.selectList("tempOra.selectList", vo);
    }

    public List<StockVO> getStockList(StockVO vo)
    {
        return sql.selectList("tempOra.selectStockList", vo);
    }

    public String getDupYn(TempVO vo)
    {
        return sql.selectOne("tempOra.selectDupYn", vo);
    }

    public int rgstInfo(TempVO vo)
    {
        return sql.insert("tempOra.insertInfo", vo);
    }

    public int updtInfo(TempVO vo)
    {
        return sql.update("tempOra.updateInfo", vo);
    }

    public int deltList(TempVO vo)
    {
        return sql.delete("tempOra.deleteList", vo);
    }
}