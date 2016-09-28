/*
--------------------------------------------------------------------------------
    PROJECT NAME : ES-MRV3
--------------------------------------------------------------------------------
    - 단위업무명 : 공지사항 Service Interface
    - 최초작성일 : 2014-09-18
    - 작  성  자 : 이승윤
    - 비      고 :
--------------------------------------------------------------------------------
*/
package com.ecosian.epfse.system.qna.svc;

import com.ecosian.epfse.system.qna.dao.vo.QnaAnswrVO;
import com.ecosian.epfse.system.qna.dao.vo.QnaVO;
import com.ecosian.epfse.system.common.Channel;

public interface QnaService
{
    public Channel getList(QnaVO vo);
    public Channel getInfo(QnaVO vo);
    public Channel saveInfo(QnaVO vo);
    public Channel deltInfo(QnaVO vo, QnaAnswrVO voQnaAnswr);
}