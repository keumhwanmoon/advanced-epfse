/*
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 항목 Aspect
    - 최초작성일 : 2014-04-11
    - 작  성  자 : 문금환
    - 비      고 :
--------------------------------------------------------------------------------
*/
package com.ecosian.epfse.system.common;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.ibatis.session.SqlSession;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.aspectj.lang.JoinPoint;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.ModelAndView;

import com.ecosian.epfse.develop.item.dao.vo.ItemVO;
import com.ecosian.epfse.system.common.dao.vo.ComParamVO; // 공통매개변수

@Aspect // applicationContext-aspect.xml 내 설정된 Aspect Class
public class ItemAspect
{
    @Autowired // 해당 변수 type 과 일치하는 bean 을 가져온다.
    private SqlSession sql;

    private static final Logger logger =
            LoggerFactory.getLogger(ItemAspect.class);

    @Pointcut("execution(public org.springframework.web.servlet.ModelAndView com.ecosian.*.*.*.ctrl.*Controller.*(..))")
    private void getPointCutControllerPage() { }

    @AfterReturning(pointcut="getPointCutControllerPage()", returning="mavOutpt")
    private ModelAndView afterReturningControllerPage(JoinPoint jp, ModelAndView mavOutpt)
    {
        logger.debug("$$ ==================================================="); // 디버그 로그

        // redirect 가 아닌 경우..
        if ( null != mavOutpt && 0 > ((ModelAndView) mavOutpt).getViewName().indexOf("redirect:") )
        {
            HttpServletRequest req = getRequest(jp);
            ComParamVO voComParam = getComParam(jp);
            ItemVO voItem = new ItemVO();

            voItem.setLangCodeHdrId(Base.coalesce(voComParam.getComParamLangCodeHdrId(), Base.LANG_CODE_HDR_ID)); // 언어코드헤더ID
            voItem.setUserLangCode(Base.coalesce(voComParam.getComParamUserLangCode(),
                Base.coalesce(req.getParameter("userLangCode"),
                req.getLocale().toString()))); // 사용자언어코드
            voItem.setPathName(req.getRequestURI().replace(req.getContextPath(), "")); // 경로명
            voItem.setUserId(Base.coalesce((String) req.getSession().getAttribute(Base.LOGIN_USER_ID))); // 사용자ID
            voItem.setSubMenuDispYn(Base.coalesce(voComParam.getComParamSubMenuDispYn(), Base.YES)); // 서브메뉴표시여부
            voItem.setMenuAddrNameClsfyId(Base.coalesce(req.getParameter("menuAddrNameClsfyId"))); // 메뉴주소명구분ID
            //voItem.setAdminModulYn(Base.coalesce(voComParam.getComParamAdminModulYn(), Base.NO)); // 관리자모듈여부

            List<ItemVO> lst = sql.selectList("itemOra.selectListAspect", voItem);
            for ( ItemVO vo : lst ) mavOutpt.addObject(vo.getItemId(), vo.getItemName());

            Base.clear(lst); // 정리
            voItem = null; voComParam = null; req = null;
        }

        logger.debug("$$ ---------------------------------------------------"); // 디버그 로그

        return mavOutpt; // 리턴 처리
    }

    // 요청 가져오기
    private HttpServletRequest getRequest(JoinPoint jp)
    {
        HttpServletRequest reqOutpt = null;

        // 해당 메소드의 매개변수에서 HttpServletRequest 객체를 검색한다.
        Object[] arrObj = jp.getArgs();
        for ( Object objArg : arrObj )
        {
            if ( objArg instanceof HttpServletRequest )
            {
                reqOutpt = (HttpServletRequest) objArg; break;
            }
        }
        arrObj = null;

        return reqOutpt;
    }

    // 공통매개변수 가져오기
    private ComParamVO getComParam(JoinPoint jp)
    {
        ComParamVO voOutpt = null;

        // 해당 메소드의 매개변수에서 ComParam 객체를 검색한다.
        Object[] arrObj = jp.getArgs();
        for ( Object objArg : arrObj )
        {
            if ( objArg instanceof ComParamVO )
            {
                voOutpt = (ComParamVO) objArg; break;
            }
        }
        arrObj = null;

        return ( null != voOutpt ? voOutpt : new ComParamVO() );
    }
}