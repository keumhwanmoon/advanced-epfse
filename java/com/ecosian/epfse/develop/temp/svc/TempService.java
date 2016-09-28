/*
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 임시 Service Interface
    - 최초작성일 : 2014-06-24
    - 작  성  자 : 문금환
    - 비      고 :
--------------------------------------------------------------------------------
*/
package com.ecosian.epfse.develop.temp.svc;

import com.ecosian.epfse.develop.temp.dao.vo.TempVO;
import com.ecosian.epfse.system.common.Channel;
import com.ecosian.epfse.system.common.dao.vo.StockVO;

public interface TempService
{
    public Channel getList(TempVO vo);
    public Channel getStockList(StockVO vo);
    public Channel saveList(TempVO vo);
    public Channel deltList(TempVO vo);
}