/*
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 코드명 DAO Implements
    - 최초작성일 : 2014-04-17
    - 작  성  자 : 문금환
    - 비      고 :
--------------------------------------------------------------------------------
*/
package com.ecosian.epfse.system.code.dao.impl;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ecosian.epfse.system.code.dao.CodeNameDAO;
import com.ecosian.epfse.system.code.dao.vo.CodeNameVO;

@Repository("codeNameOra")
public class CodeNameDAOImpl implements CodeNameDAO
{
    @Autowired // 해당 변수 type 과 일치하는 bean 을 가져온다.
    private SqlSession sql;

    public List<CodeNameVO> getList(CodeNameVO vo)
    {
        return sql.selectList("codeNameOra.selectList", vo);
    }

    public List<CodeNameVO> getComboList(CodeNameVO vo)
    {
        return sql.selectList("codeNameOra.selectComboList", vo);
    }

    public int rgstInfo(CodeNameVO vo)
    {
        return sql.update("codeNameOra.insertInfo", vo);
    }

    public int updtInfo(CodeNameVO vo)
    {
        return sql.update("codeNameOra.updateInfo", vo);
    }

    public int updtCodeHdrIdList(CodeNameVO vo)
    {
        return sql.update("codeNameOra.updateCodeHdrIdList", vo);
    }

    public int deltInfo(CodeNameVO vo)
    {
        return sql.delete("codeNameOra.deleteInfo", vo);
    }
}