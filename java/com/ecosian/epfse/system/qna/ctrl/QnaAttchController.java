/*
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 게시물첨부 Controller
    - 최초작성일 : 2014-05-21
    - 작  성  자 : 문금환
    - 비      고 : Controller 클래스내 모든 함수는 매개변수에 HttpServletRequest 를 추가한다.
                   페이지경로 가져오는 함수의 return type 은 ModelAndView 이고, 그 외의 함수는 Channel 이다.
--------------------------------------------------------------------------------
*/
package com.ecosian.epfse.system.qna.ctrl;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.ecosian.epfse.system.common.Channel;
import com.ecosian.epfse.system.common.dao.vo.ComParamVO;
import com.ecosian.epfse.system.qna.dao.vo.QnaAttchVO;
import com.ecosian.epfse.system.qna.svc.QnaAttchService;

@Controller // Presentation Layer 를 구성하는 Controller Class 를 정의
public class QnaAttchController
{
    @Resource(name = "qnaAttchService")
    private QnaAttchService svc;

    // 목록 가져오기 // 게시물 상세 화면 로드시 사용한다. // 게시물 편집 화면 로드시 사용한다.
    @RequestMapping(method=RequestMethod.POST, value="/data/getQnaAttchList.do")
    @ResponseStatus(HttpStatus.OK)
    public @ResponseBody Channel getList(HttpServletRequest req, @ModelAttribute ComParamVO voComParam,
            @ModelAttribute QnaAttchVO vo)
    {
        return svc.getList(vo);
    }
}