/*
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 항목 Service Interface
    - 최초작성일 : 2014-06-24
    - 작  성  자 : 문금환
    - 비      고 :
--------------------------------------------------------------------------------
*/
package com.ecosian.epfse.develop.item.svc;

import com.ecosian.epfse.develop.item.dao.vo.ItemVO;
import com.ecosian.epfse.system.common.Channel;

public interface ItemService
{
    public Channel getList(ItemVO vo);
    public Channel saveList(ItemVO vo);
    public Channel deltList(ItemVO vo);
}