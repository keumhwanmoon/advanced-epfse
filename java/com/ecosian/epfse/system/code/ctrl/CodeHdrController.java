/*
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 코드헤더 Controller
    - 최초작성일 : 2014-06-24
    - 작  성  자 : 문금환
    - 비      고 : Controller 클래스내 모든 함수는 매개변수에 HttpServletRequest 를 추가한다.
                   페이지경로 가져오는 함수의 return type 은 ModelAndView 이고, 그 외의 함수는 Channel 이다.
--------------------------------------------------------------------------------
*/
package com.ecosian.epfse.system.code.ctrl;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.ecosian.epfse.system.code.dao.vo.CodeHdrVO;
import com.ecosian.epfse.system.code.dao.vo.CodeNameVO;
import com.ecosian.epfse.system.code.dao.vo.CodeVO;
import com.ecosian.epfse.system.code.svc.CodeHdrService;
import com.ecosian.epfse.system.common.Channel;
import com.ecosian.epfse.system.common.dao.vo.ComParamVO;

@Controller // Presentation Layer 를 구성하는 Controller Class 를 정의
public class CodeHdrController
{
    @Resource(name = "codeHdrService") // 해당 beanName 과 일치하는 bean 을 가져온다.
    private CodeHdrService svc;

    // 목록 가져오기 // 코드 그리드 화면 조회 클릭시 사용한다.
    @RequestMapping(method=RequestMethod.POST, value="/system/getCodeHdrList.do")
    @ResponseStatus(HttpStatus.OK)
    public @ResponseBody Channel getComboList(HttpServletRequest req,@ModelAttribute ComParamVO voComParam,
            @ModelAttribute CodeHdrVO vo)
    {
        return svc.getList(vo);
    }

    // 목록 저장 // 코드 그리드 화면 저장 클릭시 사용한다.
    @RequestMapping(method=RequestMethod.POST, value="/system/saveCodeHdrList.do")
    @ResponseStatus(HttpStatus.OK)
    public @ResponseBody Channel saveList(HttpServletRequest req,@ModelAttribute ComParamVO voComParam,
            @ModelAttribute CodeHdrVO vo, @ModelAttribute CodeVO voCode, @ModelAttribute CodeNameVO voCodeName)
    {
        return svc.saveList(vo, voCode, voCodeName);
    }

    // 목록 삭제 // 코드 그리드 화면 삭제 클릭시 사용한다.
    @RequestMapping(method=RequestMethod.POST, value="/system/deltCodeHdrList.do")
    @ResponseStatus(HttpStatus.OK)
    public @ResponseBody Channel deltList(HttpServletRequest req,@ModelAttribute ComParamVO voComParam,
            @ModelAttribute CodeHdrVO vo, @ModelAttribute CodeVO voCode)
    {
        return svc.deltList(vo, voCode);
    }
}