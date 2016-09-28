/*
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 임시 Controller
    - 최초작성일 : 2014-06-24
    - 작  성  자 : 문금환
    - 비      고 : Controller 클래스내 모든 함수는 매개변수에 HttpServletRequest 를 추가한다.
                   페이지경로 가져오는 함수의 return type 은 ModelAndView 이고, 그 외의 함수는 Channel 이다.
--------------------------------------------------------------------------------
*/
package com.ecosian.epfse.develop.temp.ctrl;

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

import com.ecosian.epfse.develop.temp.dao.vo.TempVO;
import com.ecosian.epfse.develop.temp.svc.TempService;
import com.ecosian.epfse.system.common.Base;
import com.ecosian.epfse.system.common.Channel;
import com.ecosian.epfse.system.common.dao.vo.ComParamVO;
import com.ecosian.epfse.system.common.dao.vo.StockVO;
// 공통매개변수

@Controller // Presentation Layer 를 구성하는 Controller Class 를 정의
public class TempController
{
    @Resource(name = "tempService") // 해당 beanName 과 일치하는 bean 을 가져온다.
    private TempService svc;

    // 페이지경로 가져오기 // 임시 그리드 화면 요청시 사용한다.
    @RequestMapping(value={"/develop/tempGrid.do", "/develop/tempStock.do"})
    public ModelAndView getPagePath(HttpServletRequest req)
    {
        // Page Path = [InternalResourceViewResolver prefix] + [return value] + [InternalResourceViewResolver suffix]
        //           = "/WEB-INF/views/" + [return value] + ".jsp"
        return new ModelAndView("/epfse" + Base.getReturnPath(req));
    }

    // 목록 가져오기 // 임시 그리드 화면 조회 클릭시 사용한다.
    @RequestMapping(method=RequestMethod.POST, value="/develop/getTempList.do")
    @ResponseStatus(HttpStatus.OK)
    public @ResponseBody Channel getList(HttpServletRequest req, @ModelAttribute ComParamVO voComParam,
            @ModelAttribute TempVO vo)
    {
        return svc.getList(vo);
    }

    // 목록 가져오기 // HIGHSTOCK 템플릿 화면 조회 클릭시 사용한다.
    @RequestMapping(method=RequestMethod.POST, value="/develop/getStockList.do")
    @ResponseStatus(HttpStatus.OK)
    public @ResponseBody Channel getStockList(HttpServletRequest req, @ModelAttribute ComParamVO voComParam,
            @ModelAttribute StockVO vo)
    {
        return svc.getStockList(vo);
    }

    // 목록 저장 // 임시 그리드 화면 저장 클릭시 사용한다.
    @RequestMapping(method=RequestMethod.POST, value="/develop/saveTempList.do")
    @ResponseStatus(HttpStatus.OK)
    public @ResponseBody Channel saveList(HttpServletRequest req, @ModelAttribute ComParamVO voComParam,
            @ModelAttribute TempVO vo)
    {
        vo.setRgstUserId(vo.getComParamLoginUserId());
        vo.setUpdtUserId(vo.getComParamLoginUserId());
        return svc.saveList(vo);
    }

    // 목록 삭제 // 임시 그리드 화면 삭제 클릭시 사용한다.
    @RequestMapping(method=RequestMethod.POST, value="/develop/deltTempList.do")
    @ResponseStatus(HttpStatus.OK)
    public @ResponseBody Channel deltList(HttpServletRequest req, @ModelAttribute ComParamVO voComParam,
            @ModelAttribute TempVO vo)
    {
        return svc.deltList(vo);
    }
}