/*
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 테이블 DAO Interface
    - 최초작성일 : 2014-04-22
    - 작성자     : 문금환
    - 비      고 :
--------------------------------------------------------------------------------
*/
package com.ecosian.epfse.develop.table.dao;

import java.util.List;

import com.ecosian.epfse.develop.table.dao.vo.TableVO;

public interface TableDAO
{
    public List<TableVO> getList(TableVO vo);
    public List<TableVO> getOwnerList(TableVO vo);
    public List<TableVO> getColList(TableVO vo);
    public List<TableVO> getQueryList(TableVO vo);
    public int rgstItemList(TableVO vo);
    public int rgstMenuList(TableVO vo);
    public int rgstMenuNameList(TableVO vo);
}