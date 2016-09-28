/*
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 게시물첨부 Service Implements
    - 최초작성일 : 2014-05-21
    - 작  성  자 : 문금환
    - 비      고 :
--------------------------------------------------------------------------------
*/
package com.ecosian.epfse.system.noti.svc.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.ecosian.epfse.system.common.Channel;
import com.ecosian.epfse.system.noti.dao.NotiAttchDAO;
import com.ecosian.epfse.system.noti.dao.vo.NotiAttchVO;
import com.ecosian.epfse.system.noti.svc.NotiAttchService;

@Service("notiAttchService")
public class NotiAttchServiceImpl implements NotiAttchService
{
    @Resource(name = "notiAttchOra")
    private NotiAttchDAO dao;

    public Channel getList(NotiAttchVO vo)
    {
        Channel chn = new Channel(); chn.setRsltList(dao.getList(vo));
        return chn;
    }
}