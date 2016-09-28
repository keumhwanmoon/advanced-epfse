/*
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 게시판 DAO Implements
    - 최초작성일 : 2014-06-30
    - 작  성  자 : 문금환
    - 비      고 :
--------------------------------------------------------------------------------
*/
package com.ecosian.epfse.system.bltbrd.dao.impl;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ecosian.epfse.system.bltbrd.dao.BltbrdDAO;
import com.ecosian.epfse.system.bltbrd.dao.vo.BltbrdVO;

@Repository("bltbrdOra")
public class BltbrdDAOImpl implements BltbrdDAO
{
    @Autowired // 해당 변수 type 과 일치하는 bean 을 가져온다.
    private SqlSession sql;

    public List<BltbrdVO> getList(BltbrdVO vo)
    {
        return sql.selectList("bltbrdOra.selectList", vo);
    }

    public BltbrdVO getInfo(BltbrdVO vo)
    {
        return sql.selectOne("bltbrdOra.selectInfo", vo);
    }

    public int rgstInfo(BltbrdVO vo)
    {
        return sql.insert("bltbrdOra.insertInfo", vo);
    }

    public int updtInfo(BltbrdVO vo)
    {
        return sql.update("bltbrdOra.updateInfo", vo);
    }

    public int deltList(BltbrdVO vo)
    {
        return sql.delete("bltbrdOra.deleteList", vo);
    }
}