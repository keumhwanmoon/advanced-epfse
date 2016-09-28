/*
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 임시 DAO Interface
    - 최초작성일 : 2014-06-24
    - 작  성  자 : 문금환
    - 비      고 :
--------------------------------------------------------------------------------
*/
package com.ecosian.epfse.develop.temp.dao;

import java.util.List;

import com.ecosian.epfse.develop.temp.dao.vo.TempVO;
import com.ecosian.epfse.system.common.dao.vo.StockVO;

public interface TempDAO
{
    public List<TempVO> getList(TempVO vo);
    public List<StockVO> getStockList(StockVO vo);
    public String getDupYn(TempVO vo);
    public int rgstInfo(TempVO vo);
    public int updtInfo(TempVO vo);
    public int deltList(TempVO vo);
}