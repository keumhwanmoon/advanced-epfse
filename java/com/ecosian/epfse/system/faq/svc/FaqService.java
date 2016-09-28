/*
--------------------------------------------------------------------------------
    PROJECT NAME : ES-MRV3
--------------------------------------------------------------------------------
    - 단위업무명 : FAQ Service Interface
    - 최초작성일 : 2014-09-18
    - 작  성  자 : 이승윤
    - 비      고 :
--------------------------------------------------------------------------------
*/
package com.ecosian.epfse.system.faq.svc;

import com.ecosian.epfse.system.faq.dao.vo.FaqVO;
import com.ecosian.epfse.system.common.Channel;

public interface FaqService
{
    public Channel getList(FaqVO vo);
    public Channel getBestList(FaqVO vo);
    public Channel updtInqrCountInfo(FaqVO vo);
    public Channel saveInfo(FaqVO vo);
    public Channel deltInfo(FaqVO vo);
}