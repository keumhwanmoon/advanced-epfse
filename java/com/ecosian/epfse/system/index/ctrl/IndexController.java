/*
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 인덱스 Controller
    - 최초작성일 : 2014-04-15
    - 작  성  자 : 문금환
    - 비      고 : Controller 클래스내 모든 함수는 매개변수에 HttpServletRequest 를 추가한다.
                   페이지경로 가져오는 함수의 return type 은 ModelAndView 이고, 그 외의 함수는 Channel 이다.
--------------------------------------------------------------------------------
*/
package com.ecosian.epfse.system.index.ctrl;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.ecosian.epfse.system.common.Base;

@Controller // Presentation Layer 를 구성하는 Controller Class 를 정의
public class IndexController
{
    // 페이지경로 가져오기 // 인덱스 화면 요청시 사용한다.
    @RequestMapping(method=RequestMethod.GET, value={"/login.do", "/index.do", "/404.do", "/405.do"})
    public ModelAndView getPagePath(HttpServletRequest req)
    {
        // Page Path = [InternalResourceViewResolver prefix] + [return value] + [InternalResourceViewResolver suffix]
        //           = "/WEB-INF/views/" + [return value] + ".jsp"
        return new ModelAndView("/epfse/system" + Base.getReturnPath(req));
    }

    // 메인 페이지경로 가져오기 // 메인 화면 요청시 사용한다.
    @RequestMapping(value="/system/main.do")
    public ModelAndView getPagePathMain(HttpServletRequest req)
    {
        // Page Path = [InternalResourceViewResolver prefix] + [return value] + [InternalResourceViewResolver suffix]
        //           = "/WEB-INF/views/" + [return value] + ".jsp"
        return new ModelAndView("/epfse" + Base.getReturnPath(req));
    }
}