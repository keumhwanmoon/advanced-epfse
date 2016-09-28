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
package com.ecosian.epfse.system.qna.svc.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.ecosian.epfse.system.common.Channel;
import com.ecosian.epfse.system.qna.dao.QnaAttchDAO;
import com.ecosian.epfse.system.qna.dao.vo.QnaAttchVO;
import com.ecosian.epfse.system.qna.svc.QnaAttchService;

@Service("qnaAttchService")
public class QnaAttchServiceImpl implements QnaAttchService
{
    @Resource(name = "qnaAttchOra")
    private QnaAttchDAO dao;

    public Channel getList(QnaAttchVO vo)
    {
        Channel chn = new Channel(); chn.setRsltList(dao.getList(vo));
        return chn;
    }
}