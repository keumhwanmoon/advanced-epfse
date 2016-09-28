/*
--------------------------------------------------------------------------------
    PROJECT NAME : ES-MRV3
--------------------------------------------------------------------------------
    - 단위업무명 : Q&A답변 Service Interface
    - 최초작성일 : 2014-09-18
    - 작  성  자 : 이승윤
    - 비      고 :
--------------------------------------------------------------------------------
*/
package com.ecosian.epfse.system.qna.svc;

import com.ecosian.epfse.system.qna.dao.vo.QnaAnswrVO;
import com.ecosian.epfse.system.qna.dao.vo.QnaVO;
import com.ecosian.epfse.system.common.Channel;

public interface QnaAnswrService
{
    public Channel saveInfo(QnaAnswrVO vo, QnaVO voQna);
    public Channel deltInfo(QnaAnswrVO vo, QnaVO voQna);
}