/*
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 표준용어 Controller
    - 최초작성일 : 2014-06-13
    - 작  성  자 : 문금환
    - 비      고 : Controller 클래스내 모든 함수는 매개변수에 HttpServletRequest 를 추가한다.
                   페이지경로 가져오는 함수의 return type 은 ModelAndView 이고, 그 외의 함수는 Channel 이다.
--------------------------------------------------------------------------------
*/
package com.ecosian.epfse.develop.stdtrm.ctrl;

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

import com.ecosian.epfse.develop.stdtrm.dao.vo.StdtrmVO;
import com.ecosian.epfse.develop.stdtrm.svc.StdtrmService;
import com.ecosian.epfse.system.common.Base;
import com.ecosian.epfse.system.common.Channel;
// 공통매개변수
import com.ecosian.epfse.system.common.dao.vo.ComParamVO;

@Controller // Presentation Layer 를 구성하는 Controller Class 를 정의
public class StdtrmController
{
    @Resource(name = "stdtrmService") // 해당 beanName 과 일치하는 bean 을 가져온다.
    private StdtrmService svc;

    // 페이지경로 가져오기 // 표준용어 그리드/저장/조합 화면 요청시 사용한다.
    @RequestMapping(value=
        { "/develop/stdtrmGrid.do", "/develop/stdtrmSave.do", "/develop/stdtrmJoin.do" })
    public ModelAndView getPagePath(HttpServletRequest req)
    {
        // Page Path = [InternalResourceViewResolver prefix] + [return value] + [InternalResourceViewResolver suffix]
        //           = "/WEB-INF/views/" + [return value] + ".jsp"
        return new ModelAndView("/epfse" + Base.getReturnPath(req));
    }

    // 목록 가져오기 // 표준용어 그리드 화면 조회 클릭시 사용한다.
    @RequestMapping(method=RequestMethod.POST, value="/develop/getStdtrmList.do")
    @ResponseStatus(HttpStatus.OK)
    public @ResponseBody Channel getList(HttpServletRequest req, @ModelAttribute ComParamVO voComParam,
            @ModelAttribute StdtrmVO vo)
    {
        return svc.getList(vo);
    }

    // 영문조회 목록 가져오기 // 표준용어 조합 화면 조회 클릭시 사용한다.
    @RequestMapping(method=RequestMethod.POST, value="/develop/getEngInqrStdtrmList.do")
    @ResponseStatus(HttpStatus.OK)
    public @ResponseBody Channel getEngInqrList(HttpServletRequest req, @ModelAttribute ComParamVO voComParam,
            @ModelAttribute StdtrmVO vo)
    {
        return svc.getEngInqrList(vo);
    }

    // 한글조회 목록 가져오기 // 표준용어 조합 화면 조회 클릭시 사용한다.
    @RequestMapping(method=RequestMethod.POST, value="/develop/getKrnInqrStdtrmList.do")
    @ResponseStatus(HttpStatus.OK)
    public @ResponseBody Channel getInqrList(HttpServletRequest req, @ModelAttribute ComParamVO voComParam,
            @ModelAttribute StdtrmVO vo)
    {
        return svc.getKrnInqrList(vo);
    }

    // 저장 목록 가져오기 // 표준용어 저장 화면 조회 클릭시 사용한다.
    @RequestMapping(method=RequestMethod.POST, value="/develop/getSaveStdtrmList.do")
    @ResponseStatus(HttpStatus.OK)
    public @ResponseBody Channel getSaveList(HttpServletRequest req, @ModelAttribute ComParamVO voComParam)
    {
        return svc.getSaveList();
    }

    // 목록 저장 // 표준용어 그리드 화면 저장 클릭시 사용한다.
    @RequestMapping(method=RequestMethod.POST, value="/develop/saveStdtrmList.do")
    @ResponseStatus(HttpStatus.OK)
    public @ResponseBody Channel saveList(HttpServletRequest req, @ModelAttribute ComParamVO voComParam,
            @ModelAttribute StdtrmVO vo)
    {
        return svc.saveList(vo);
    }

    // 목록 삭제 // 표준용어 그리드 화면 삭제 클릭시 사용한다.
    @RequestMapping(method=RequestMethod.POST, value="/develop/deltStdtrmList.do")
    @ResponseStatus(HttpStatus.OK)
    public @ResponseBody Channel deltList(HttpServletRequest req, @ModelAttribute ComParamVO voComParam,
            @ModelAttribute StdtrmVO vo)
    {
        return svc.deltList(vo);
    }
}