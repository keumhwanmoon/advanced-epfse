/*
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 테이블 Service Interface
    - 최초작성일 : 2014-04-22
    - 작  성  자 : 문금환
    - 비      고 :
--------------------------------------------------------------------------------
*/
package com.ecosian.epfse.develop.table.svc;

import com.ecosian.epfse.develop.table.dao.vo.TableVO;
import com.ecosian.epfse.system.common.Channel;

public interface TableService
{
    public Channel getList(TableVO vo);
    public Channel getOwnerList(TableVO vo);
    public Channel getColList(TableVO vo);
    public Channel getQueryList(TableVO vo);
    public Channel rgstItemList(TableVO vo);
    public Channel rgstMenuList(TableVO vo);
}