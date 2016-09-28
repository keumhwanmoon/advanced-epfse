/*
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 코드헤더 DAO Implements
    - 최초작성일 : 2014-06-24
    - 작  성  자 : 문금환
    - 비      고 :
--------------------------------------------------------------------------------
*/
package com.ecosian.epfse.system.code.dao.impl;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ecosian.epfse.system.code.dao.CodeHdrDAO;
import com.ecosian.epfse.system.code.dao.vo.CodeHdrVO;

@Repository("codeHdrOra")
public class CodeHdrDAOImpl implements CodeHdrDAO
{
    @Autowired // 해당 변수 type 과 일치하는 bean 을 가져온다.
    private SqlSession sql;

    public List<CodeHdrVO> getList(CodeHdrVO vo)
    {
        return sql.selectList("codeHdrOra.selectList", vo);
    }

    public String getDupYn(CodeHdrVO vo)
    {
        return sql.selectOne("codeHdrOra.selectDupYn", vo);
    }

    public int rgstInfo(CodeHdrVO vo)
    {
        return sql.insert("codeHdrOra.insertInfo", vo);
    }

    public int updtInfo(CodeHdrVO vo)
    {
        return sql.update("codeHdrOra.updateInfo", vo);
    }

    public int deltList(CodeHdrVO vo)
    {
        return sql.delete("codeHdrOra.deleteList", vo);
    }
}