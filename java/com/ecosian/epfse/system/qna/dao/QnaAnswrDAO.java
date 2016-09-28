/*
--------------------------------------------------------------------------------
    PROJECT NAME : ES-MRV3
--------------------------------------------------------------------------------
    - 단위업무명 : Q&A답변 DAO Interface
    - 최초작성일 : 2014-09-18
    - 작  성  자 : 이승윤
    - 비      고 :
--------------------------------------------------------------------------------
*/
package com.ecosian.epfse.system.qna.dao;

import com.ecosian.epfse.system.qna.dao.vo.QnaAnswrVO;

public interface QnaAnswrDAO
{
    public int rgstInfo(QnaAnswrVO vo);
    public int updtInfo(QnaAnswrVO vo);
    public int deltInfo(QnaAnswrVO vo);
}