/*
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 사용자권한 Service Implements
    - 최초작성일 : 2014-06-26
    - 작  성  자 : 문금환
    - 비      고 :
--------------------------------------------------------------------------------
*/
package com.ecosian.epfse.member.auth.svc.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.ecosian.epfse.member.auth.dao.UserAuthDAO;
import com.ecosian.epfse.menuauth.auth.dao.AuthDAO;
import com.ecosian.epfse.member.auth.dao.vo.UserAuthVO;
import com.ecosian.epfse.menuauth.auth.dao.vo.AuthVO;
import com.ecosian.epfse.member.auth.svc.UserAuthService;
import com.ecosian.epfse.system.common.Base;
import com.ecosian.epfse.system.common.Channel;

@Service("userAuthService")
public class UserAuthServiceImpl implements UserAuthService
{
    @Resource(name = "userAuthOra") // 해당 beanName 과 일치하는 bean 을 가져온다.
    private UserAuthDAO dao;
    @Resource(name = "authOra") // 해당 beanName 과 일치하는 bean 을 가져온다.
    private AuthDAO daoAuth;

    public Channel getList(UserAuthVO vo)
    {
        Channel chn = new Channel(); chn.setRsltList(dao.getList(vo));
        return chn;
    }

    public Channel rgstList(UserAuthVO vo)
    {
        Channel chn   = new Channel();
        AuthVO voAuth = new AuthVO();

        voAuth.setAuthId(vo.getAuthId());

        if ( !Base.YES.equals(daoAuth.getDupYn(voAuth)) )
        {
            chn.setRsltNo(Base.NO_DATA);
        }
        else
        {
            dao.rgstList(vo);

            chn.setRsltNo(Base.OK);
        }

        voAuth = null;

        return chn;
    }

    public Channel deltList(UserAuthVO vo)
    {
        Channel chn = new Channel();
        AuthVO voAuth = new AuthVO();

        voAuth.setAuthId(vo.getAuthId());

        if ( !Base.YES.equals(daoAuth.getDupYn(voAuth)) )
        {
            chn.setRsltNo(Base.NO_DATA);
        }
        else
        if ( !Base.isEmpty(vo.getRowId()) )
        {
            dao.deltList(vo);

            chn.setRsltNo(Base.OK);
        }

        return chn;
    }
}