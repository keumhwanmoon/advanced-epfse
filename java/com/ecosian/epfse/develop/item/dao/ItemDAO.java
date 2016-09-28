/*
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 항목 DAO Interface
    - 최초작성일 : 2014-06-24
    - 작  성  자 : 문금환
    - 비      고 :
--------------------------------------------------------------------------------
*/
package com.ecosian.epfse.develop.item.dao;

import java.util.List;

import com.ecosian.epfse.develop.item.dao.vo.ItemVO;

public interface ItemDAO
{
    public List<ItemVO> getList(ItemVO vo);
    public String getDupYn(ItemVO vo);
    public int rgstInfo(ItemVO vo);
    public int updtInfo(ItemVO vo);
    public int deltList(ItemVO vo);
}