/*
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 게시물 Controller
    - 최초작성일 : 2014-05-21
    - 작  성  자 : 문금환
    - 비      고 : Controller 클래스내 모든 함수는 매개변수에 HttpServletRequest 를 추가한다.
                   페이지경로 가져오는 함수의 return type 은 ModelAndView 이고, 그 외의 함수는 Channel 이다.
--------------------------------------------------------------------------------
*/
package com.ecosian.epfse.system.bltn.ctrl;

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
import com.ecosian.epfse.system.bltn.dao.vo.BltnAttchVO;
import com.ecosian.epfse.system.bltn.dao.vo.BltnVO;
import com.ecosian.epfse.system.bltn.svc.BltnService;
import com.ecosian.epfse.system.common.Base;
import com.ecosian.epfse.system.common.Channel;
// 공통매개변수
import com.ecosian.epfse.system.common.dao.vo.ComParamVO;

@Controller // Presentation Layer 를 구성하는 Controller Class 를 정의
public class BltnController
{
    @Resource(name = "bltnService") // 해당 beanName 과 일치하는 bean 을 가져온다.
    private BltnService svc;
    @Resource(name = "bltbrdService") // 해당 beanName 과 일치하는 bean 을 가져온다.
    private BltbrdService svcBltbrd;

    // 페이지경로 가져오기 // 게시물 그리드/상세/편집 화면 요청시 사용한다.
    @RequestMapping(params={ "menuAddrNameClsfyId" }, value={ "/system/bltnGrid.do",
        "/system/bltnDtl.do", "/system/bltnEdit.do" })
    public ModelAndView getPagePath(HttpServletRequest req, @ModelAttribute ComParamVO voComParam,
            @ModelAttribute("menuAddrNameClsfyId") String strMenuAddrNameClsfyId)
    {
        // Page Path = [InternalResourceViewResolver prefix] + [return value] + [InternalResourceViewResolver suffix]
        //           = "/WEB-INF/views/" + [return value] + ".jsp"
        ModelAndView mav = new ModelAndView("/epfse" + Base.getReturnPath(req));

        BltbrdVO voBltbrd = new BltbrdVO();
        voBltbrd.setUserLangCode(Base.coalesce(req.getParameter("userLangCode"), req.getLocale().toString())); // 사용자언어코드
        voBltbrd.setScrAddrName(req.getRequestURI());
        voBltbrd.setRowId(strMenuAddrNameClsfyId);
        voBltbrd = (BltbrdVO) svcBltbrd.getInfo(voBltbrd).getRsltInfo();

        if ( null != voBltbrd )
        {
            mav.addObject("BLTBRD.bltbrdName"      , voBltbrd.getBltbrdName      ());
            mav.addObject("BLTBRD.titleItemId2"    , voBltbrd.getTitleItemId2    ());
            mav.addObject("BLTBRD.qstnBltbrdYn"    , voBltbrd.getQstnBltbrdYn    ());
            mav.addObject("BLTBRD.titleItemIdName" , voBltbrd.getTitleItemIdName ());
            mav.addObject("BLTBRD.titleItemId2Name", voBltbrd.getTitleItemId2Name());
            mav.addObject("BLTBRD.cttsItemIdName"  , voBltbrd.getCttsItemIdName  ());
            voBltbrd = null;
        }

        return mav;
    }

    // 목록 가져오기 // 게시물 목록 화면 조회 클릭시 사용한다.
    @RequestMapping(method=RequestMethod.POST, value="/system/getBltnList.do")
    @ResponseStatus(HttpStatus.OK)
    public @ResponseBody Channel getList(HttpServletRequest req, @ModelAttribute ComParamVO voComParam,
            @ModelAttribute BltnVO vo)
    {
        return svc.getList(vo);
    }

    // 정보 가져오기 // 게시물 상세 화면 로드시 사용한다. // 게시물 편집 화면 로드시 사용한다.
    @RequestMapping(method=RequestMethod.POST, value="/system/getBltnInfo.do")
    @ResponseStatus(HttpStatus.OK)
    public @ResponseBody Channel getInfo(HttpServletRequest req, @ModelAttribute ComParamVO voComParam,
            @ModelAttribute BltnVO vo)
    {
        return svc.getInfo(vo);
    }

    // 정보 저장 // 게시물 편집 화면 저장 클릭시 사용한다.
    @RequestMapping(method=RequestMethod.POST, value="/system/saveBltnInfo.do")
    @ResponseStatus(HttpStatus.OK)
    public @ResponseBody Channel saveInfo(HttpServletRequest req, @ModelAttribute ComParamVO voComParam,
            @ModelAttribute BltnVO vo, @ModelAttribute BltnAttchVO voBltnAttch)
    {
        vo.setLoginUserId(vo.getComParamLoginUserId());
        vo.setRgstUserId(vo.getComParamLoginUserId());
        vo.setUpdtUserId(vo.getComParamLoginUserId());
        return svc.saveInfo(vo, voBltnAttch);
    }

    // 정보 삭제 // 게시판 상세 화면 삭제 클릭시 사용한다.
    @RequestMapping(method=RequestMethod.POST, value="/system/deltBltnInfo.do")
    @ResponseStatus(HttpStatus.OK)
    public @ResponseBody Channel deltInfo(HttpServletRequest req, @ModelAttribute ComParamVO voComParam,
            @ModelAttribute BltnVO vo, @ModelAttribute BltnAttchVO voBltnAttch)
    {
        vo.setLoginUserId(vo.getComParamLoginUserId());
        return svc.deltInfo(vo, voBltnAttch);
    }
}