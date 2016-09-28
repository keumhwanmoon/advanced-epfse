/*
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 게시판 DAO Interface
    - 최초작성일 : 2014-06-30
    - 작  성  자 : 문금환
    - 비      고 :
--------------------------------------------------------------------------------
*/
package com.ecosian.epfse.system.bltbrd.dao;

import java.util.List;

import com.ecosian.epfse.system.bltbrd.dao.vo.BltbrdVO;

public interface BltbrdDAO
{
    public List<BltbrdVO> getList(BltbrdVO vo);
    public BltbrdVO getInfo(BltbrdVO vo);
    public int rgstInfo(BltbrdVO vo);
    public int updtInfo(BltbrdVO vo);
    public int deltList(BltbrdVO vo);
}