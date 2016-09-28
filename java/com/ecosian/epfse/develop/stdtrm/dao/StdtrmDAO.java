/*
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 표준용어 DAO Interface
    - 최초작성일 : 2014-06-13
    - 작성자     : 문금환
    - 비      고 :
--------------------------------------------------------------------------------
*/
package com.ecosian.epfse.develop.stdtrm.dao;

import java.util.List;

import com.ecosian.epfse.develop.stdtrm.dao.vo.StdtrmVO;

public interface StdtrmDAO
{
    public List<StdtrmVO> getList(StdtrmVO vo);
    public List<StdtrmVO> getEngInqrList(StdtrmVO vo);
    public List<StdtrmVO> getKrnInqrList(StdtrmVO vo);
    public List<StdtrmVO> getSaveList();
    public String getKrnNameDupYn(StdtrmVO vo);
    public String getEngNfrmltNameYn(StdtrmVO vo);
    public String getRowId(StdtrmVO vo);
    public int rgstInfo(StdtrmVO vo);
    public int updtInfo(StdtrmVO vo);
    public int deltList(StdtrmVO vo);
}