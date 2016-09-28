/*
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 게시판 Controller
    - 최초작성일 : 2014-06-30
    - 작  성  자 : 문금환
    - 비      고 : Controller 클래스내 모든 함수는 매개변수에 HttpServletRequest 를 추가한다.
                   페이지경로 가져오는 함수의 return type 은 ModelAndView 이고, 그 외의 함수는 Channel 이다.
--------------------------------------------------------------------------------
*/
package com.ecosian.epfse.system.bltbrd.ctrl;

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

import com.ecosian.epfse.system.bltbrd.dao.vo.BltbrdVO;
import com.ecosian.epfse.system.bltbrd.svc.BltbrdService;
import com.ecosian.epfse.system.bltn.dao.vo.BltnVO;
import com.ecosian.epfse.system.common.Base;
import com.ecosian.epfse.system.common.Channel;
// 공통매개변수
import com.ecosian.epfse.system.common.dao.vo.ComParamVO;

@Controller // Presentation Layer 를 구성하는 Controller Class 를 정의
public class BltbrdController
{
    @Resource(name = "bltbrdService") // 해당 beanName 과 일치하는 bean 을 가져온다.
    private BltbrdService svc;

    // 페이지경로 가져오기 // 게시판 그리드 화면 요청시 사용한다.
    @RequestMapping(value="/system/bltbrdGrid.do")
    public ModelAndView getPagePath(HttpServletRequest req)
    {
        // Page Path = [InternalResourceViewResolver prefix] + [return value] + [InternalResourceViewResolver suffix]
        //           = "/WEB-INF/views/" + [return value] + ".jsp"
        return new ModelAndView("/epfse" + Base.getReturnPath(req));
    }

    // 목록 가져오기 // 게시판 그리드 화면 조회 클릭시 사용한다.
    @RequestMapping(method=RequestMethod.POST, value="/system/getBltbrdList.do")
    @ResponseStatus(HttpStatus.OK)
    public @ResponseBody Channel getList(HttpServletRequest req, @ModelAttribute ComParamVO voComParam,
            @ModelAttribute BltbrdVO vo)
    {
        return svc.getList(vo);
    }

    // 정보 가져오기 // 게시판 상세/편집 화면 로드시 사용한다.
    @RequestMapping(method=RequestMethod.POST, value="/system/getBltbrdInfo.do")
    @ResponseStatus(HttpStatus.OK)
    public @ResponseBody Channel getInfo(HttpServletRequest req, @ModelAttribute ComParamVO voComParam,
            @ModelAttribute BltbrdVO vo)
    {
        vo.setUserLangCode(vo.getComParamUserLangCode());
        vo.setScrAddrName(vo.getComParamScrAddrName());
        return svc.getInfo(vo);
    }

    // 목록 저장 // 게시판 그리드 화면 저장 클릭시 사용한다.
    @RequestMapping(method=RequestMethod.POST, value="/system/saveBltbrdList.do")
    @ResponseStatus(HttpStatus.OK)
    public @ResponseBody Channel saveList(HttpServletRequest req, @ModelAttribute ComParamVO voComParam,
            @ModelAttribute BltbrdVO vo)
    {
        vo.setRgstUserId(vo.getComParamLoginUserId());
        vo.setUpdtUserId(vo.getComParamLoginUserId());
        return svc.saveList(vo);
    }

    // 목록 삭제 // 게시판 그리드 화면 삭제 클릭시 사용한다.
    @RequestMapping(method=RequestMethod.POST, value="/system/deltBltbrdList.do")
    @ResponseStatus(HttpStatus.OK)
    public @ResponseBody Channel deltList(HttpServletRequest req, @ModelAttribute ComParamVO voComParam,
            @ModelAttribute BltbrdVO vo, @ModelAttribute BltnVO voBltn)
    {
        return svc.deltList(vo, voBltn);
    }
}