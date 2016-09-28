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
package com.ecosian.epfse.system.filerm.svc.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.ecosian.epfse.system.common.Channel;
import com.ecosian.epfse.system.filerm.dao.FilermAttchDAO;
import com.ecosian.epfse.system.filerm.dao.vo.FilermAttchVO;
import com.ecosian.epfse.system.filerm.svc.FilermAttchService;

@Service("filermAttchService")
public class FilermAttchServiceImpl implements FilermAttchService
{
    @Resource(name = "filermAttchOra")
    private FilermAttchDAO dao;

    public Channel getList(FilermAttchVO vo)
    {
        Channel chn = new Channel(); chn.setRsltList(dao.getList(vo));
        return chn;
    }
}