/*
--------------------------------------------------------------------------------
    PROJECT NAME : ES-MRV3
--------------------------------------------------------------------------------
    - 단위업무명 : 공지사항 DAO Implements
    - 최초작성일 : 2014-09-18
    - 작  성  자 : 이승윤
    - 비      고 :
--------------------------------------------------------------------------------
*/
package com.ecosian.epfse.system.filerm.dao.impl;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ecosian.epfse.system.filerm.dao.FilermDAO;
import com.ecosian.epfse.system.filerm.dao.vo.FilermVO;

@Repository("filermOra")
public class FilermDAOImpl implements FilermDAO
{
    @Autowired // 해당 변수 type 과 일치하는 bean 을 가져온다.
    private SqlSession sql;

    public List<FilermVO> getList(FilermVO vo)
    {
        return sql.selectList("filermOra.selectList", vo);
    }

    public FilermVO getInfo(FilermVO vo)
    {
        return sql.selectOne("filermOra.selectInfo", vo);
    }

    public String getRowId(FilermVO vo)
    {
        return sql.selectOne("filermOra.selectRowId", vo);
    }

    public String getEditPsbleYn(FilermVO vo)
    {
        return sql.selectOne("filermOra.selectEditPsbleYn", vo);
    }

    public String getDupYn(FilermVO vo)
    {
        return sql.selectOne("filermOra.selectDupYn", vo);
    }

    public int rgstInfo(FilermVO vo)
    {
        return sql.insert("filermOra.insertInfo", vo);
    }

    public int updtInfo(FilermVO vo)
    {
        return sql.update("filermOra.updateInfo", vo);
    }

    public int updtInqrCountInfo(FilermVO vo)
    {
        return sql.update("filermOra.updateInqrCountInfo", vo);
    }

    public int deltInfo(FilermVO vo)
    {
        return sql.delete("filermOra.deleteInfo", vo);
    }
}