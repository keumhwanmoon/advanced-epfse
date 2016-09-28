/*
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 테이블 Controller
    - 최초작성일 : 2014-04-22
    - 작  성  자 : 문금환
    - 비      고 : Controller 클래스내 모든 함수는 매개변수에 HttpServletRequest 를 추가한다.
                   페이지경로 가져오는 함수의 return type 은 ModelAndView 이고, 그 외의 함수는 Channel 이다.
--------------------------------------------------------------------------------
*/
package com.ecosian.epfse.develop.table.ctrl;

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

import com.ecosian.epfse.develop.table.dao.vo.TableVO;
import com.ecosian.epfse.develop.table.svc.TableService;
import com.ecosian.epfse.system.common.Base;
import com.ecosian.epfse.system.common.Channel;
// 공통매개변수
import com.ecosian.epfse.system.common.dao.vo.ComParamVO;

@Controller // Presentation Layer 를 구성하는 Controller Class 를 정의
public class TableController
{
    @Resource(name = "tableService") // 해당 beanName 과 일치하는 bean 을 가져온다.
    private TableService svc;

    // 페이지경로 가져오기 // 테이블 그리드/상세 화면 요청시 사용한다.
    @RequestMapping(value=
        { "/develop/tableGrid.do", "/develop/tableDtl.do", "/develop/mask.do",
          "/develop/query.do", "/develop/edit.do", "/develop/file.do" })
    public ModelAndView getPagePath(HttpServletRequest req)
    {
        // Page Path = [InternalResourceViewResolver prefix] + [return value] + [InternalResourceViewResolver suffix]
        //           = "/WEB-INF/views/" + [return value] + ".jsp"
        return new ModelAndView("/epfse" + Base.getReturnPath(req));
    }

    // 목록 가져오기 // 테이블 그리드 화면 조회 클릭시 사용한다.
    @RequestMapping(method=RequestMethod.POST, value="/develop/getTableList.do")
    @ResponseStatus(HttpStatus.OK)
    public @ResponseBody Channel getList(HttpServletRequest req, @ModelAttribute ComParamVO voComParam,
            @ModelAttribute TableVO vo)
    {
        return svc.getList(vo);
    }

    // 소유자 목록 가져오기 // 테이블 그리드 화면 로드시 사용한다.
    @RequestMapping(method=RequestMethod.POST, value="/develop/getOwnerTableList.do")
    @ResponseStatus(HttpStatus.OK)
    public @ResponseBody Channel getListOwner(HttpServletRequest req, @ModelAttribute ComParamVO voComParam,
            @ModelAttribute TableVO vo)
    {
        return svc.getOwnerList(vo);
    }

    // 컬럼 목록 가져오기 // 테이블 그리드 화면 조회 클릭시 사용한다.
    @RequestMapping(method=RequestMethod.POST, value="/develop/getColTableList.do")
    @ResponseStatus(HttpStatus.OK)
    public @ResponseBody Channel getColList(HttpServletRequest req, @ModelAttribute ComParamVO voComParam,
            @ModelAttribute TableVO vo)
    {
        return svc.getColList(vo);
    }

    // 쿼리 목록 가져오기 // 테이블 상세 화면 조회 클릭시 사용한다.
    @RequestMapping(method=RequestMethod.POST, value="/develop/getQueryTableList.do")
    @ResponseStatus(HttpStatus.OK)
    public @ResponseBody Channel getQueryList(HttpServletRequest req, @ModelAttribute ComParamVO voComParam,
            @ModelAttribute TableVO vo)
    {
        return svc.getQueryList(vo);
    }

    // 항목 목록 등록 // 테이블 상세 화면 항목 클릭시 사용한다.
    @RequestMapping(method=RequestMethod.POST, value="/develop/rgstItemTableList.do")
    @ResponseStatus(HttpStatus.OK)
    public @ResponseBody Channel rgstItemList(HttpServletRequest req, @ModelAttribute ComParamVO voComParam,
            @ModelAttribute TableVO vo)
    {
        vo.setUserLangCode(vo.getComParamUserLangCode());
        return svc.rgstItemList(vo);
    }

    // 메뉴 목록 등록 // 테이블 상세 화면 항목 클릭시 사용한다.
    @RequestMapping(method=RequestMethod.POST, value="/develop/rgstMenuTableList.do")
    @ResponseStatus(HttpStatus.OK)
    public @ResponseBody Channel rgstMenuList(HttpServletRequest req, @ModelAttribute ComParamVO voComParam,
            @ModelAttribute TableVO vo)
    {
        vo.setUserLangCode(vo.getComParamUserLangCode());
        vo.setRgstUserId(vo.getComParamLoginUserId());
        return svc.rgstMenuList(vo);
    }
}