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
package com.ecosian.epfse.system.filerm.svc;

import com.ecosian.epfse.system.common.Channel;
import com.ecosian.epfse.system.filerm.dao.vo.FilermAttchVO;
import com.ecosian.epfse.system.filerm.dao.vo.FilermVO;

public interface FilermService
{
    public Channel getList(FilermVO vo);
    public Channel getInfo(FilermVO vo);
    public Channel saveInfo(FilermVO vo, FilermAttchVO voFilermAttch);
    public Channel deltInfo(FilermVO vo, FilermAttchVO voFilermAttch);
}