/*
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 메뉴명 Service Implements
    - 최초작성일 : 2014-04-18
    - 작  성  자 : 문금환
    - 비      고 :
--------------------------------------------------------------------------------
*/
package com.ecosian.epfse.menuauth.menu.svc.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.ecosian.epfse.menuauth.menu.dao.MenuNameDAO;
import com.ecosian.epfse.menuauth.menu.dao.vo.MenuNameVO;
import com.ecosian.epfse.menuauth.menu.svc.MenuNameService;
import com.ecosian.epfse.system.common.Channel;

@Service("menuNameService")
public class MenuNameServiceImpl implements MenuNameService
{
    @Resource(name = "menuNameOra") // 해당 beanName 과 일치하는 bean 을 가져온다.
    private MenuNameDAO dao;

    public Channel getList(MenuNameVO vo)
    {
        Channel chn = new Channel(); chn.setRsltList(dao.getList(vo));
        return chn;
    }
}