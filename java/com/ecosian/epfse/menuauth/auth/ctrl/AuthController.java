/*
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 권한 Controller
    - 최초작성일 : 2014-06-26
    - 작  성  자 : 문금환
    - 비      고 : Controller 클래스내 모든 함수는 매개변수에 HttpServletRequest 를 추가한다.
                   페이지경로 가져오는 함수의 return type 은 ModelAndView 이고, 그 외의 함수는 Channel 이다.
--------------------------------------------------------------------------------
*/
package com.ecosian.epfse.menuauth.auth.ctrl;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.servlet.ModelAndView;

import com.ecosian.epfse.member.auth.dao.vo.UserAuthVO;
import com.ecosian.epfse.menuauth.auth.dao.vo.AuthVO;
import com.ecosian.epfse.menuauth.auth.dao.vo.MenuAuthVO;
import com.ecosian.epfse.menuauth.auth.svc.AuthService;
import com.ecosian.epfse.system.common.Base;
import com.ecosian.epfse.system.common.Channel;
// 공통매개변수
import com.ecosian.epfse.system.common.dao.vo.ComParamVO;

@Controller // Presentation Layer 를 구성하는 Controller Class 를 정의
public class AuthController
{
    @Resource(name = "authService") // 해당 beanName 과 일치하는 bean 을 가져온다.
    private AuthService svc;

    // 페이지경로 가져오기 // 권한 그리드 화면 요청시 사용한다.
    @RequestMapping(value="/menuauth/authGrid.do")
    public ModelAndView getPagePath(HttpServletRequest req)
    {
        // Page Path = [InternalResourceViewResolver prefix] + [return value] + [InternalResourceViewResolver suffix]
        //           = "/WEB-INF/views/" + [return value] + ".jsp"
        return new ModelAndView("/epfse" + Base.getReturnPath(req));
    }

    // 목록 가져오기 // 권한 그리드 화면 조회 클릭시 사용한다.
    @RequestMapping(method=RequestMethod.POST, value="/menuauth/getAuthList.do")
    @ResponseStatus(HttpStatus.OK)
    public @ResponseBody Channel getList(HttpServletRequest req, @ModelAttribute ComParamVO voComParam,
            @ModelAttribute AuthVO vo)
    {
        return svc.getList(vo);
    }

    // 콤보 목록 가져오기 // 권한 목록 화면 조회 클릭시 사용한다.
    @RequestMapping(method=RequestMethod.POST, value="/menuauth/getComboAuthList.do")
    @ResponseStatus(HttpStatus.OK)
    public @ResponseBody Channel getComboList(HttpServletRequest req, @ModelAttribute ComParamVO voComParam,
            @ModelAttribute AuthVO vo)
    {
        return svc.getComboList(vo);
    }

    // 목록 저장 // 권한 그리드 화면 저장 클릭시 사용한다.
    @RequestMapping(method=RequestMethod.POST, value="/menuauth/saveAuthList.do")
    @ResponseStatus(HttpStatus.OK)
    public @ResponseBody Channel saveList(HttpServletRequest req, @ModelAttribute ComParamVO voComParam,
            @ModelAttribute AuthVO vo, @ModelAttribute MenuAuthVO voMenuAuth, @ModelAttribute UserAuthVO voUserAuth)
    {
        vo.setRgstUserId(vo.getComParamLoginUserId());
        vo.setUpdtUserId(vo.getComParamLoginUserId());
        voUserAuth.setUpdtUserId(vo.getComParamLoginUserId());
        return svc.saveList(vo, voMenuAuth, voUserAuth);
    }

    // 목록 삭제 // 권한 그리드 화면 삭제 클릭시 사용한다.
    @RequestMapping(method=RequestMethod.POST, value="/menuauth/deltAuthList.do")
    @ResponseStatus(HttpStatus.OK)
    public @ResponseBody Channel deltList(HttpServletRequest req, @ModelAttribute ComParamVO voComParam,
            @ModelAttribute AuthVO vo, @ModelAttribute MenuAuthVO voMenuAuth, @ModelAttribute UserAuthVO voUserAuth)
    {
        return svc.deltList(vo, voMenuAuth, voUserAuth);
    }
}