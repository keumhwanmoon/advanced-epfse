/*
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 코드 DAO Interface
    - 최초작성일 : 2014-04-29
    - 작  성  자 : 문금환
    - 비      고 :
--------------------------------------------------------------------------------
*/
package com.ecosian.epfse.system.code.dao;

import com.ecosian.epfse.system.code.dao.vo.CodeVO;

public interface CodeDAO
{
    public String getDupYn(CodeVO vo);
    public String getExistYn(CodeVO vo);
    public int rgstInfo(CodeVO vo);
    public int updtInfo(CodeVO vo);
    public int updtCodeHdrIdList(CodeVO vo);
    public int deltInfo(CodeVO vo);
}