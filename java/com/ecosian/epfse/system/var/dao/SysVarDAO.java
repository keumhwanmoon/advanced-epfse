/*
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 시스템변수 DAO Interface
    - 최초작성일 : 2014-06-24
    - 작  성  자 : 문금환
    - 비      고 :
--------------------------------------------------------------------------------
*/
package com.ecosian.epfse.system.var.dao;

import java.util.List;

import com.ecosian.epfse.system.var.dao.vo.SysVarVO;

public interface SysVarDAO
{
    public List<SysVarVO> getList(SysVarVO vo);
    public String getDupYn(SysVarVO vo);
    public int rgstInfo(SysVarVO vo);
    public int updtInfo(SysVarVO vo);
    public int deltList(SysVarVO vo);
}