/*
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 로그인 Controller
    - 최초작성일 : 2014-04-11
    - 작  성  자 : 문금환
    - 비      고 : Controller 클래스내 모든 함수는 매개변수에 HttpServletRequest 를 추가한다.
                   페이지경로 가져오는 함수의 return type 은 String 이고, 그 외의 함수는 Channel 이다.
--------------------------------------------------------------------------------
*/
package com.ecosian.epfse.system.common.ctrl;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.ecosian.epfse.system.common.Base;
import com.ecosian.epfse.system.common.Channel;
import com.ecosian.epfse.system.common.dao.vo.ComParamVO;
import com.ecosian.epfse.system.common.dao.vo.LoginVO;
import com.ecosian.epfse.system.common.svc.LoginService;

@Controller // Presentation Layer 를 구성하는 Controller Class 를 정의
public class LoginController
{
    @Resource(name = "loginService") // 해당 beanName 과 일치하는 bean 을 가져온다.
    private LoginService svc;

    // 로그인 // 인덱스 화면 login 클릭시 사용한다.
    @RequestMapping(method=RequestMethod.POST, value="/system/login.do")
    @ResponseStatus(HttpStatus.OK)
    public @ResponseBody Channel login(HttpServletRequest req,
            @ModelAttribute ComParamVO voComParam, @ModelAttribute LoginVO vo)
    {
        vo.setAddrName(req.getRemoteAddr()); // 주소명
        vo.setSessnName(req.getSession().getId()); // 세션명

        Channel chn = svc.login(vo);
        if ( Base.OK == chn.getRsltNo() ) setSessn(req.getSession(), vo.getUserId());
        return chn;
    }

    // 로그아웃 // 메뉴 화면 로그아웃 클릭시 사용한다.
    @RequestMapping(method=RequestMethod.POST, value="/system/lout.do")
    @ResponseStatus(HttpStatus.OK)
    public @ResponseBody Channel lout(HttpServletRequest req,
            @ModelAttribute ComParamVO voComParam, @ModelAttribute LoginVO vo)
    {
        vo.setUserId(Base.coalesce((String) req.getSession().getAttribute(Base.LOGIN_USER_ID))); // 사용자ID
        vo.setAddrName(req.getRemoteAddr()); // 주소명
        vo.setSessnName(req.getSession().getId()); // 세션명

        Channel chn = svc.lout(vo);
        if ( Base.OK == chn.getRsltNo() ) setSessn(req.getSession(), null);
        return chn;
    }

    // 로그인 체크 // 그리드 조회시 사용한다.
    @RequestMapping(method=RequestMethod.POST, value="/system/checkLogin.do")
    @ResponseStatus(HttpStatus.OK)
    public @ResponseBody Channel check(HttpServletRequest req,
            @ModelAttribute ComParamVO voComParam, @ModelAttribute LoginVO vo)
    {
        Channel chn = new Channel();

        return chn;
    }

    // 세션 설정
    private void setSessn(HttpSession hss, String strUserId)
    {
        hss.setAttribute(Base.LOGIN_USER_ID, strUserId);
    }
}