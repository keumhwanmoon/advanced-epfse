/*
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 코드 DAO Implements
    - 최초작성일 : 2014-04-29
    - 작  성  자 : 문금환
    - 비      고 :
--------------------------------------------------------------------------------
*/
package com.ecosian.epfse.system.code.dao.impl;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ecosian.epfse.system.code.dao.CodeDAO;
import com.ecosian.epfse.system.code.dao.vo.CodeVO;

@Repository("codeOra")
public class CodeDAOImpl implements CodeDAO
{
    @Autowired // 해당 변수 type 과 일치하는 bean 을 가져온다.
    private SqlSession sql;

    public String getDupYn(CodeVO vo)
    {
        return sql.selectOne("codeOra.selectDupYn", vo);
    }

    public String getExistYn(CodeVO vo)
    {
        return sql.selectOne("codeOra.selectExistYn", vo);
    }

    public int rgstInfo(CodeVO vo)
    {
        return sql.insert("codeOra.insertInfo", vo);
    }

    public int updtInfo(CodeVO vo)
    {
        return sql.update("codeOra.updateInfo", vo);
    }

    public int updtCodeHdrIdList(CodeVO vo)
    {
        return sql.update("codeOra.updateCodeHdrIdList", vo);
    }

    public int deltInfo(CodeVO vo)
    {
        return sql.delete("codeOra.deleteInfo", vo);
    }
}