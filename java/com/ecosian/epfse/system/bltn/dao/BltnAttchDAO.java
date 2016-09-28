/*
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 게시물첨부 DAO Interface
    - 최초작성일 : 2014-05-21
    - 작  성  자 : 문금환
    - 비      고 :
--------------------------------------------------------------------------------
*/
package com.ecosian.epfse.system.bltn.dao;

import java.util.List;

import com.ecosian.epfse.system.bltn.dao.vo.BltnAttchVO;

public interface BltnAttchDAO
{
    public List<BltnAttchVO> getList(BltnAttchVO vo);
    public int rgstList(BltnAttchVO vo);
    public int deltList(BltnAttchVO vo);
}