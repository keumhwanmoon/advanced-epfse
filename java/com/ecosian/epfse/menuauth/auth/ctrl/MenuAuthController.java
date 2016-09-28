/*
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 메뉴권한 Controller
    - 최초작성일 : 2014-05-12
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

import com.ecosian.epfse.menuauth.auth.dao.vo.MenuAuthVO;
import com.ecosian.epfse.menuauth.auth.svc.MenuAuthService;
import com.ecosian.epfse.system.common.Base;
import com.ecosian.epfse.system.common.Channel;
// 공통매개변수
import com.ecosian.epfse.system.common.dao.vo.ComParamVO;

@Controller // Presentation Layer 를 구성하는 Controller Class 를 정의
public class MenuAuthController
{
    @Resource(name = "menuAuthService") // 해당 beanName 과 일치하는 bean 을 가져온다.
    private MenuAuthService svc;

    // 페이지경로 가져오기 // 메뉴권한 트리 화면 요청시 사용한다.
    @RequestMapping(value="/menuauth/menuAuthTree.do")
    public ModelAndView getPagePath(HttpServletRequest req)
    {
        // Page Path = [InternalResourceViewResolver prefix] + [return value] + [InternalResourceViewResolver suffix]
        //           = "/WEB-INF/views/" + [return value] + ".jsp"
        return new ModelAndView("/epfse" + Base.getReturnPath(req));
    }

    // 목록 가져오기 // 메뉴권한 트리 화면 트리 클릭시 사용한다.
    @RequestMapping(method=RequestMethod.POST, value="/menuauth/getMenuAuthList.do")
    @ResponseStatus(HttpStatus.OK)
    public @ResponseBody Channel getList(HttpServletRequest req, @ModelAttribute ComParamVO voComParam,
            @ModelAttribute MenuAuthVO vo)
    {
        vo.setUserLangCode(vo.getComParamUserLangCode());
        return svc.getList(vo);
    }

    // 정보 가져오기 // 메뉴권한 트리 화면 트리 클릭시 사용한다.
    @RequestMapping(method=RequestMethod.POST, value="/menuauth/getMenuAuthInfo.do")
    @ResponseStatus(HttpStatus.OK)
    public @ResponseBody Channel getInfo(HttpServletRequest req, @ModelAttribute ComParamVO voComParam,
            @ModelAttribute MenuAuthVO vo)
    {
        vo.setUserLangCode(vo.getComParamUserLangCode());
        return svc.getInfo(vo);
    }

    // 목록 저장 // 메뉴권한 트리 화면 저장/읽기권한/쓰기권한 클릭시 사용한다.
    @RequestMapping(method=RequestMethod.POST, value="/menuauth/saveMenuAuthList.do")
    @ResponseStatus(HttpStatus.OK)
    public @ResponseBody Channel saveList(HttpServletRequest req, @ModelAttribute ComParamVO voComParam,
            @ModelAttribute MenuAuthVO vo)
    {
        return svc.saveList(vo);
    }
}