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
package com.ecosian.epfse.system.noti.svc;

import com.ecosian.epfse.system.noti.dao.vo.NotiAttchVO;
import com.ecosian.epfse.system.noti.dao.vo.NotiVO;
import com.ecosian.epfse.system.common.Channel;

public interface NotiService
{
    public Channel getList(NotiVO vo);
    public Channel getInfo(NotiVO vo);
    public Channel saveInfo(NotiVO vo, NotiAttchVO voNotiAttch);
    public Channel deltInfo(NotiVO vo, NotiAttchVO voNotiAttch);
}