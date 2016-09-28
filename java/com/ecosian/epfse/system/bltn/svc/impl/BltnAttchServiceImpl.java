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
package com.ecosian.epfse.system.bltn.svc.impl;

import com.ecosian.epfse.system.bltn.svc.BltnAttchService;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.ecosian.epfse.system.bltn.dao.BltnAttchDAO;
import com.ecosian.epfse.system.bltn.dao.vo.BltnAttchVO;
import com.ecosian.epfse.system.common.Channel;

@Service("bltnAttchService")
public class BltnAttchServiceImpl implements BltnAttchService
{
    @Resource(name = "bltnAttchOra")
    private BltnAttchDAO dao;

    public Channel getList(BltnAttchVO vo)
    {
        Channel chn = new Channel(); chn.setRsltList(dao.getList(vo));
        return chn;
    }
}