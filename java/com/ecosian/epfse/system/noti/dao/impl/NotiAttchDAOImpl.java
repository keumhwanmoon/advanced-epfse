/*
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 게시물첨부 DAO Implements
    - 최초작성일 : 2014-05-21
    - 작  성  자 : 문금환
    - 비      고 :
--------------------------------------------------------------------------------
*/
package com.ecosian.epfse.system.noti.dao.impl;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ecosian.epfse.system.noti.dao.NotiAttchDAO;
import com.ecosian.epfse.system.noti.dao.vo.NotiAttchVO;

@Repository("notiAttchOra")
public class NotiAttchDAOImpl implements NotiAttchDAO
{
    @Autowired // 해당 변수 type 과 일치하는 bean 을 가져온다.
    private SqlSession sql;

    public List<NotiAttchVO> getList(NotiAttchVO vo)
    {
        return sql.selectList("notiAttchOra.selectList", vo);
    }

    public int rgstList(NotiAttchVO vo)
    {
        return sql.insert("notiAttchOra.insertList", vo);
    }

    public int deltList(NotiAttchVO vo)
    {
        return sql.delete("notiAttchOra.deleteList", vo);
    }
}