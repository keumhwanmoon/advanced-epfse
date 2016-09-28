/*
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 메뉴명 Controller
    - 최초작성일 : 2014-04-18
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

import com.ecosian.epfse.menuauth.menu.dao.vo.MenuNameVO;
import com.ecosian.epfse.menuauth.menu.svc.MenuNameService;
import com.ecosian.epfse.system.common.Channel;
import com.ecosian.epfse.system.common.dao.vo.ComParamVO;

@Controller // Presentation Layer 를 구성하는 Controller Class 를 정의
public class MenuNameController
{
    @Resource(name = "menuNameService") // 해당 beanName 과 일치하는 bean 을 가져온다.
    private MenuNameService svc;

    // 서브 목록 가져오기 // menu.jsp 공통화면에서 사용한다.
    @RequestMapping(method=RequestMethod.POST, value="/menuauth/getSubMenuNameList.do")
    @ResponseStatus(HttpStatus.OK)
    public @ResponseBody Channel getSubList(HttpServletRequest req,@ModelAttribute ComParamVO voComParam,
            @ModelAttribute MenuNameVO vo)
    {
        vo.setLangCode(vo.getComParamUserLangCode());
        vo.setUserId(vo.getComParamLoginUserId());
        return svc.getList(vo);
    }
}