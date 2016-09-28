/*
--------------------------------------------------------------------------------
    PROJECT NAME : ES-MRV3
--------------------------------------------------------------------------------
    - 단위업무명 : Q&A DAO Interface
    - 최초작성일 : 2014-09-18
    - 작  성  자 : 이승윤
    - 비      고 :
--------------------------------------------------------------------------------
*/
package com.ecosian.epfse.system.qna.dao;

import java.util.List;

import com.ecosian.epfse.system.qna.dao.vo.QnaVO;

public interface QnaDAO
{
    public List<QnaVO> getList(QnaVO vo);
    public QnaVO getInfo(QnaVO vo);
    public String getEditPsbleYn(QnaVO vo);
    public String getDupYn(QnaVO vo);
    public int rgstInfo(QnaVO vo);
    public int updtInfo(QnaVO vo);
    public int updtInqrCountInfo(QnaVO vo);
    public int deltInfo(QnaVO vo);
}