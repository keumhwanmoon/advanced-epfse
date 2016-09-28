/*
--------------------------------------------------------------------------------
    PROJECT NAME : ES-MRV3
--------------------------------------------------------------------------------
    - 단위업무명 : 공지사항 Controller
    - 최초작성일 : 2014-09-18
    - 작  성  자 : 이승윤
    - 비      고 : Controller 클래스내 모든 함수는 매개변수에 HttpServletRequest 를 추가한다.
                   페이지경로 가져오는 함수의 return type 은 ModelAndView 이고, 그 외의 함수는 Channel 이다.
--------------------------------------------------------------------------------
*/
package com.ecosian.epfse.system.filerm.ctrl;

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

import com.ecosian.epfse.system.common.Base;
import com.ecosian.epfse.system.common.Channel;
import com.ecosian.epfse.system.common.dao.vo.ComParamVO;
import com.ecosian.epfse.system.filerm.dao.vo.FilermAttchVO;
import com.ecosian.epfse.system.filerm.dao.vo.FilermVO;
import com.ecosian.epfse.system.filerm.svc.FilermService;
// 공통매개변수

@Controller // Presentation Layer 를 구성하는 Controller Class 를 정의
public class FilermController
{
    @Resource(name = "filermService") // 해당 beanName 과 일치하는 bean 을 가져온다.
    private FilermService svc;

    // 페이지경로 가져오기 // 자료실 화면 요청시 사용한다.
    @RequestMapping(value={"/system/filermList.do", "/system/filermEdit.do", "/system/filermDtl.do"})
    public ModelAndView getPagePath(HttpServletRequest req)
    {
        // Page Path = [InternalResourceViewResolver prefix] + [return value] + [InternalResourceViewResolver suffix]
        //           = "/WEB-INF/views/" + [return value] + ".jsp"
        return new ModelAndView("/epfse" + Base.getReturnPath(req));
    }

    // 목록 가져오기 // 자료실 화면 조회 클릭시 사용한다.
    @RequestMapping(method=RequestMethod.POST, value="/system/getFilermList.do")
    @ResponseStatus(HttpStatus.OK)
    public @ResponseBody Channel getList(HttpServletRequest req, @ModelAttribute ComParamVO voComParam,
            @ModelAttribute FilermVO vo)
    {
        return svc.getList(vo);
    }

    // 정보 가져오기 // 자료실 상세 화면 로드시 사용한다. // 자료실 편집 화면 로드시 사용한다.
    @RequestMapping(method=RequestMethod.POST, value="/system/getFilermInfo.do")
    @ResponseStatus(HttpStatus.OK)
    public @ResponseBody Channel getInfo(HttpServletRequest req, @ModelAttribute ComParamVO voComParam,
            @ModelAttribute FilermVO vo)
    {
        return svc.getInfo(vo);
    }

    // 목록 저장 // 자료실 화면 저장 클릭시 사용한다.
    @RequestMapping(method=RequestMethod.POST, value="/system/saveFilermInfo.do")
    @ResponseStatus(HttpStatus.OK)
    public @ResponseBody Channel saveInfo(HttpServletRequest req, @ModelAttribute ComParamVO voComParam,
            @ModelAttribute FilermVO vo, @ModelAttribute FilermAttchVO voFilermAttch)
    {
        vo.setLoginUserId(vo.getComParamLoginUserId());
        vo.setRgstUserId(vo.getComParamLoginUserId());
        vo.setUpdtUserId(vo.getComParamLoginUserId());
        return svc.saveInfo(vo, voFilermAttch);
    }

    // 목록 삭제 // 자료실 화면 삭제 클릭시 사용한다.
    @RequestMapping(method=RequestMethod.POST, value="/system/deltFilermInfo.do")
    @ResponseStatus(HttpStatus.OK)
    public @ResponseBody Channel deltInfo(HttpServletRequest req, @ModelAttribute ComParamVO voComParam,
            @ModelAttribute FilermVO vo, @ModelAttribute FilermAttchVO voFilermAttch)
    {
        vo.setLoginUserId(vo.getComParamLoginUserId());
        return svc.deltInfo(vo, voFilermAttch);
    }
}