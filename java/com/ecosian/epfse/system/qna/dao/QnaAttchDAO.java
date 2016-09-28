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
package com.ecosian.epfse.system.qna.dao;

import java.util.List;

import com.ecosian.epfse.system.qna.dao.vo.QnaAttchVO;

public interface QnaAttchDAO
{
    public List<QnaAttchVO> getList(QnaAttchVO vo);
    public int rgstList(QnaAttchVO vo);
    public int deltList(QnaAttchVO vo);
}