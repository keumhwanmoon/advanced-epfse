/*
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 로그인 Service Implements
    - 최초작성일 : 2014-04-09
    - 작  성  자 : 문금환
    - 비      고 :
--------------------------------------------------------------------------------
*/
package com.ecosian.epfse.system.common.svc.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.ecosian.epfse.system.common.Base;
import com.ecosian.epfse.system.common.Channel;
import com.ecosian.epfse.system.common.dao.LoginDAO;
import com.ecosian.epfse.system.common.dao.LoginLogDAO;
import com.ecosian.epfse.system.common.dao.vo.LoginVO;
import com.ecosian.epfse.system.common.dao.vo.LoginLogVO;
import com.ecosian.epfse.system.common.svc.LoginService;

@Service("loginService")
public class LoginServiceImpl implements LoginService
{
    @Resource(name = "loginOra") // 해당 beanName 과 일치하는 bean 을 가져온다.
    private LoginDAO dao;
    @Resource(name = "loginLogOra") // 해당 beanName 과 일치하는 bean 을 가져온다.
    private LoginLogDAO daoLoginLog;

    public Channel login(LoginVO vo)
    {
        Channel chn = new Channel();

        // 사용자정보를 검증한다.
        LoginVO voInfo = dao.getInfo(vo);

        if ( null == voInfo )
        {
            chn.setRsltNo(-1); // 데이터없음
        } else
        if ( !Base.YES.equals(voInfo.getUseYn()) )
        {
            chn.setRsltNo(-3); // 사용불가
        } else
        if ( !Base.YES.equals(vo.getSsoYn()) && // SSO 로그인이 아닌 경우..
             !voInfo.getPwdName().equals(Base.getHash(vo.getPwdName())) // 비밀번호가 일치하지 않는 경우..
           )
        {
            chn.setRsltNo(-5); // 비밀번호불일치
        } else
        {
            chn.setRsltNo(Base.OK); // OK

            // 로그인로그를 등록한다.
            LoginLogVO voLoginLog = new LoginLogVO();
            voLoginLog.setUserId(vo.getUserId());
            voLoginLog.setClsfyCode(vo.getClsfyCode());
            voLoginLog.setAddrName(vo.getAddrName());
            voLoginLog.setSessnName(vo.getSessnName());
            voLoginLog.setBforeAddrName(Base.EMPTYSTR);
            voLoginLog.setBforeSessnName(Base.EMPTYSTR);
            daoLoginLog.rgstInfo(voLoginLog);
            voLoginLog = null;
        }

        voInfo = null;

        return chn;
    }

    public Channel lout(LoginVO vo)
    {
        Channel chn = new Channel();

        if ( Base.isEmpty(vo.getUserId()) || Base.isEmpty(vo.getAddrName()) || Base.isEmpty(vo.getSessnName()) )
        {
            chn.setRsltNo(Base.NO_DATA); // 데이터없음
        } else
        {
            chn.setRsltNo(Base.OK); // OK

            // 로그인로그를 등록한다.
            LoginLogVO voLoginLog = new LoginLogVO();
            voLoginLog.setUserId(vo.getUserId());
            voLoginLog.setClsfyCode(vo.getClsfyCode());
            voLoginLog.setAddrName(vo.getAddrName());
            voLoginLog.setSessnName(vo.getSessnName());
            voLoginLog.setBforeAddrName(Base.EMPTYSTR);
            voLoginLog.setBforeSessnName(Base.EMPTYSTR);
            daoLoginLog.rgstInfo(voLoginLog);
            voLoginLog = null;
        }

        return chn;
    }
}