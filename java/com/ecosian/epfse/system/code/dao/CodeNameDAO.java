/*
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 코드명 DAO Interface
    - 최초작성일 : 2014-04-17
    - 작성자     : 문금환
    - 비      고 :
--------------------------------------------------------------------------------
*/
package com.ecosian.epfse.system.code.dao;

import java.util.List;

import com.ecosian.epfse.system.code.dao.vo.CodeNameVO;

public interface CodeNameDAO
{
    public List<CodeNameVO> getList(CodeNameVO vo);
    public List<CodeNameVO> getComboList(CodeNameVO vo);
    public int rgstInfo(CodeNameVO vo);
    public int updtInfo(CodeNameVO vo);
    public int updtCodeHdrIdList(CodeNameVO vo);
    public int deltInfo(CodeNameVO vo);
}