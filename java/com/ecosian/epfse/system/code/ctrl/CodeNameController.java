/*
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 코드명 Controller
    - 최초작성일 : 2014-04-17
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

import com.ecosian.epfse.system.code.dao.vo.CodeNameVO;
import com.ecosian.epfse.system.code.svc.CodeNameService;
import com.ecosian.epfse.system.common.Channel;
import com.ecosian.epfse.system.common.dao.vo.ComParamVO;

@Controller // Presentation Layer 를 구성하는 Controller Class 를 정의
public class CodeNameController
{
    @Resource(name = "codeNameService") // 해당 beanName 과 일치하는 bean 을 가져온다.
    private CodeNameService svc;

    // 목록 가져오기 // 코드 그리드 화면 코드헤더 클릭시 사용한다.
    @RequestMapping(method=RequestMethod.POST, value="/system/getCodeNameList.do")
    @ResponseStatus(HttpStatus.OK)
    public @ResponseBody Channel getList(HttpServletRequest req,@ModelAttribute ComParamVO voComParam,
            @ModelAttribute CodeNameVO vo)
    {
        vo.setUserLangCode(vo.getComParamUserLangCode()); // 사용자언어코드
        vo.setLangCodeHdrId(vo.getComParamLangCodeHdrId()); // 언어코드헤더ID
        return svc.getList(vo);
    }

    // 콤보 목록 가져오기 // combo.js 공통함수에서 사용한다.
    @RequestMapping(method=RequestMethod.POST, value="/system/getComboCodeNameList.do")
    @ResponseStatus(HttpStatus.OK)
    public @ResponseBody Channel getComboList(HttpServletRequest req,@ModelAttribute ComParamVO voComParam,
            @ModelAttribute CodeNameVO vo)
    {
        vo.setUserLangCode(vo.getComParamUserLangCode()); // 언어코드
        return svc.getComboList(vo);
    }
}