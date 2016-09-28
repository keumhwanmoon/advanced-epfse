/*
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 메뉴 Controller
    - 최초작성일 : ${re-qu-es
    - 작  성  자 : 문금환
    - 비      고 : Controller 클래스내 모든 함수는 매개변수에 HttpServletRequest 를 추가한다.
                   페이지경로 가져오는 함수의 return type 은 ModelAndView 이고, 그 외의 함수는 Channel 이다.
--------------------------------------------------------------------------------
*/
package com.ecosian.epfse.menuauth.menu.ctrl;

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
import com.ecosian.epfse.menuauth.menu.dao.vo.MenuNameVO;
import com.ecosian.epfse.menuauth.menu.dao.vo.MenuVO;
import com.ecosian.epfse.menuauth.menu.svc.MenuService;
import com.ecosian.epfse.system.common.Base;
import com.ecosian.epfse.system.common.Channel;
import com.ecosian.epfse.system.common.Tree;
import com.ecosian.epfse.system.common.dao.vo.ComParamVO;
import com.ecosian.epfse.system.common.dao.vo.TreeVO;
// 공통매개변수

@Controller // Presentation Layer 를 구성하는 Controller Class 를 정의
public class MenuController
{
    @Resource(name = "menuService") // 해당 beanName 과 일치하는 bean 을 가져온다.
    private MenuService svc;

    // 페이지경로 가져오기 // 메뉴 트리 화면 요청시 사용한다. // 메뉴 트리 팝업 화면 요청시 사용한다.
    @RequestMapping(value="/menuauth/menuTree.do")
    public ModelAndView getPagePath(HttpServletRequest req)
    {
        // Page Path = [InternalResourceViewResolver prefix] + [return value] + [InternalResourceViewResolver suffix]
        //           = "/WEB-INF/views/" + [return value] + ".jsp"
        return new ModelAndView("/epfse" + Base.getReturnPath(req));
    }

    // 트리 목록 가져오기 // 메뉴 트리 화면 조회 클릭시 사용한다. // 메뉴 트리 팝업 화면 조회 클릭시 사용한다.
    @RequestMapping(method=RequestMethod.POST, value="/menuauth/getTreeMenuList.do")
    @ResponseStatus(HttpStatus.OK)
    public @ResponseBody Channel getTreeList(HttpServletRequest req, @ModelAttribute ComParamVO voComParam,
            @ModelAttribute MenuVO vo)
    {
        vo.setUserLangCode(vo.getComParamUserLangCode());

        Channel chn = svc.getTreeList(vo); TreeVO voTree = new TreeVO();
        voTree.setJstree((new Tree()).getJstreeData(chn.getRsltList()));
        chn.setRsltInfo(voTree);
        return chn;
    }

    // 정보 가져오기 // 메뉴 트리 화면 트리 클릭시 사용한다.
    @RequestMapping(method=RequestMethod.POST, value="/menuauth/getMenuInfo.do")
    @ResponseStatus(HttpStatus.OK)
    public @ResponseBody Channel getInfo(HttpServletRequest req, @ModelAttribute ComParamVO voComParam,
            @ModelAttribute MenuVO vo)
    {
        vo.setUserLangCode(vo.getComParamUserLangCode());
        return svc.getInfo(vo);
    }

    // 정보 등록 // 메뉴 트리 화면 저장 클릭시 사용한다.
    @RequestMapping(method=RequestMethod.POST, value="/menuauth/rgstMenuInfo.do")
    @ResponseStatus(HttpStatus.OK)
    public @ResponseBody Channel rgstInfo(HttpServletRequest req, @ModelAttribute ComParamVO voComParam,
            @ModelAttribute MenuVO vo)
    {
        vo.setRgstUserId(vo.getComParamLoginUserId());
        return svc.rgstInfo(vo);
    }

    // 정보 저장 // 메뉴 편집 화면 저장 클릭시 사용한다.
    @RequestMapping(method=RequestMethod.POST, value="/menuauth/updtMenuInfo.do")
    @ResponseStatus(HttpStatus.OK)
    public @ResponseBody Channel updtInfo(HttpServletRequest req, @ModelAttribute ComParamVO voComParam,
            @ModelAttribute MenuVO vo, @ModelAttribute MenuNameVO voMenuName, @ModelAttribute MenuAuthVO voMenuAuth)
    {
        vo.setUpdtUserId(vo.getComParamLoginUserId());
        voMenuName.setLangCode(vo.getComParamUserLangCode());
        return svc.updtInfo(vo, voMenuName, voMenuAuth);
    }

    // 정보 삭제 // 메뉴 상세 화면 삭제 클릭시 사용한다.
    @RequestMapping(method=RequestMethod.POST, value="/menuauth/deltMenuInfo.do")
    @ResponseStatus(HttpStatus.OK)
    public @ResponseBody Channel deltInfo(HttpServletRequest req,@ModelAttribute ComParamVO voComParam,
            @ModelAttribute MenuVO vo, @ModelAttribute MenuNameVO voMenuName, @ModelAttribute MenuAuthVO voMenuAuth)
    {
        return svc.deltInfo(vo, voMenuName, voMenuAuth);
    }
}