/*
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 코드헤더 DAO Interface
    - 최초작성일 : 2014-06-24
    - 작  성  자 : 문금환
    - 비      고 :
--------------------------------------------------------------------------------
*/
package com.ecosian.epfse.system.code.dao;

import java.util.List;

import com.ecosian.epfse.system.code.dao.vo.CodeHdrVO;

public interface CodeHdrDAO
{
    public List<CodeHdrVO> getList(CodeHdrVO vo);
    public String getDupYn(CodeHdrVO vo);
    public int rgstInfo(CodeHdrVO vo);
    public int updtInfo(CodeHdrVO vo);
    public int deltList(CodeHdrVO vo);
}