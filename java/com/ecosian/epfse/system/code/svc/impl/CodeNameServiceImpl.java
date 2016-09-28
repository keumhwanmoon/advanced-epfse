/*
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 코드명 Service Implements
    - 최초작성일 : 2014-04-17
    - 작  성  자 : 문금환
    - 비      고 :
--------------------------------------------------------------------------------
*/
package com.ecosian.epfse.system.code.svc.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.ecosian.epfse.system.code.dao.CodeNameDAO;
import com.ecosian.epfse.system.code.dao.vo.CodeNameVO;
import com.ecosian.epfse.system.code.svc.CodeNameService;
import com.ecosian.epfse.system.common.Channel;

@Service("codeNameService")
public class CodeNameServiceImpl implements CodeNameService
{
    @Resource(name = "codeNameOra") // 해당 beanName 과 일치하는 bean 을 가져온다.
    private CodeNameDAO dao;

    public Channel getList(CodeNameVO vo)
    {
        Channel chn = new Channel(); chn.setRsltList(dao.getList(vo));
        return chn;
    }

    public Channel getComboList(CodeNameVO vo)
    {
        Channel chn = new Channel(); chn.setRsltList(dao.getComboList(vo));
        return chn;
    }
}