/*
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 게시물 DAO Interface
    - 최초작성일 : 2014-05-20
    - 작  성  자 : 문금환
    - 비      고 :
--------------------------------------------------------------------------------
*/
package com.ecosian.epfse.system.bltn.dao;

import java.util.List;

import com.ecosian.epfse.system.bltn.dao.vo.BltnVO;

public interface BltnDAO
{
    public List<BltnVO> getList(BltnVO vo);
    public BltnVO getInfo(BltnVO vo);
    public String getRowId(BltnVO vo);
    public String getExistYn(BltnVO vo);
    public String getEditPsbleYn(BltnVO vo);
    public String getAnswrExistYn(BltnVO vo);
    public int rgstInfo(BltnVO vo);
    public int updtInfo(BltnVO vo);
    public int updtInqrCountInfo(BltnVO vo);
    public int deltInfo(BltnVO vo);
}