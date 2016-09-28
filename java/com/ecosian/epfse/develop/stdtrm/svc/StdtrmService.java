/*
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 표준용어 Service Interface
    - 최초작성일 : 2014-06-13
    - 작  성  자 : 문금환
    - 비      고 :
--------------------------------------------------------------------------------
*/
package com.ecosian.epfse.develop.stdtrm.svc;

import com.ecosian.epfse.develop.stdtrm.dao.vo.StdtrmVO;
import com.ecosian.epfse.system.common.Channel;

public interface StdtrmService
{
    public Channel getList(StdtrmVO vo);
    public Channel getEngInqrList(StdtrmVO vo);
    public Channel getKrnInqrList(StdtrmVO vo);
    public Channel getSaveList();
    public Channel saveList(StdtrmVO vo);
    public Channel deltList(StdtrmVO vo);
}