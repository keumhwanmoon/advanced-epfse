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
package com.ecosian.epfse.system.noti.dao.impl;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ecosian.epfse.system.noti.dao.NotiDAO;
import com.ecosian.epfse.system.noti.dao.vo.NotiVO;

@Repository("notiOra")
public class NotiDAOImpl implements NotiDAO
{
    @Autowired // 해당 변수 type 과 일치하는 bean 을 가져온다.
    private SqlSession sql;

    public List<NotiVO> getList(NotiVO vo)
    {
        return sql.selectList("notiOra.selectList", vo);
    }

    public NotiVO getInfo(NotiVO vo)
    {
        return sql.selectOne("notiOra.selectInfo", vo);
    }

    public String getRowId(NotiVO vo)
    {
        return sql.selectOne("notiOra.selectRowId", vo);
    }

    public String getEditPsbleYn(NotiVO vo)
    {
        return sql.selectOne("notiOra.selectEditPsbleYn", vo);
    }

    public String getDupYn(NotiVO vo)
    {
        return sql.selectOne("notiOra.selectDupYn", vo);
    }

    public int rgstInfo(NotiVO vo)
    {
        return sql.insert("notiOra.insertInfo", vo);
    }

    public int updtInfo(NotiVO vo)
    {
        return sql.update("notiOra.updateInfo", vo);
    }

    public int updtInqrCount(NotiVO vo)
    {
        return sql.update("notiOra.updateInqrCountInfo", vo);
    }

    public int deltInfo(NotiVO vo)
    {
        return sql.delete("notiOra.deleteInfo", vo);
    }
}