/*
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 로그인 Aspect
    - 최초작성일 : 2014-04-09
    - 작  성  자 : 문금환
    - 비      고 :
--------------------------------------------------------------------------------
*/
package com.ecosian.epfse.system.common;

import javax.servlet.http.HttpServletRequest;

import org.apache.ibatis.session.SqlSession;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Pointcut;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.ModelAndView;

import com.ecosian.epfse.menuauth.auth.dao.vo.MenuAuthVO; // 메뉴권한
import com.ecosian.epfse.system.common.dao.vo.ComParamVO; // 공통매개변수

@Aspect // applicationContext-aspect.xml 내 설정된 Aspect Class
public class LoginAspect
{
    @Autowired // 해당 변수 type 과 일치하는 bean 을 가져온다.
    private SqlSession sql;

    private static final Logger logger =
            LoggerFactory.getLogger(LoginAspect.class);

    @Pointcut("execution(* com.ecosian.*.*.*.ctrl.*Controller.*(..))")
    private void getPointCutController() { }

    @Around("getPointCutController()")
    public Object beforeController(ProceedingJoinPoint pjp) throws Throwable {
        logger.debug("$$ ==================================================="); // 디버그 로그

        final int REQUEST_TYPE = Base.getReqType(pjp.getSignature().toString()); // 요청 유형

        HttpServletRequest req = getReq(pjp);

        Object objOutpt = null;

        final String URI = ( null != req ? req.getRequestURI().replace(req.getContextPath(), "") : null );

        logger.debug("$$ 1. Request URI : " + URI); // 디버그 로그
        logger.debug("$$ 2. Request Type : " + REQUEST_TYPE); // 디버그 로그

        if ( 0 > REQUEST_TYPE )
        {
            logger.error("$$ [개발오류] RequestMapping Controller Method 의 return type 이 잘못되었습니다. : " + pjp.getSignature()); // 디버그 로그
        } else
        {
            final String LOGIN_USER_ID = ( null != req ? (String) req.getSession().getAttribute(Base.LOGIN_USER_ID) : null );
            final String SCR_ADDR_NAME = getScrAddrName(REQUEST_TYPE, URI, getComParam(pjp).getComParamScrAddrName());
            final String MENU_ADDR_NAME_CLSFY_ID = ( null != req ? req.getParameter("menuAddrNameClsfyId") : null );
            final int AUTH_NO = getAuthNo(SCR_ADDR_NAME, MENU_ADDR_NAME_CLSFY_ID, LOGIN_USER_ID);

            logger.debug("$$ 3. Login User ID  : " + LOGIN_USER_ID); // 디버그 로그
            logger.debug("$$ 4. Screen Address : " + SCR_ADDR_NAME); // 디버그 로그
            logger.debug("$$ 5. Auth Number    : " + AUTH_NO); // 디버그 로그

            if ( 1 == REQUEST_TYPE ) // 페이지경로
            {
                if ( -9 == AUTH_NO ) // 잘못된요청
                {
                    final String REDIRECT_URI9 = "/404.do";

                    logger.debug("$$ [개발오류] 메뉴정보가 존재하지 않습니다. 메뉴가 적절하게 등록되었는지 확인하십시오. : " + URI); // 디버그 로그

                    if ( !getRedirectPsbleYn(URI, REDIRECT_URI9) )
                        objOutpt = new ModelAndView("redirect:" + REDIRECT_URI9);
                } else
                if ( -1 == AUTH_NO ) // 권한없음
                {
                    final String REDIRECT_URI1 = "/";
                    final String QUERY_STR = req.getQueryString();

                    logger.debug("$$ 9. 로그인이 필요합니다. 로그인한 상태인 경우 권한이 적절하게 등록되었는지 확인하십시오. : " + URI); // 디버그 로그
                    logger.debug("$$  - req.getQueryString() : " + QUERY_STR); // 디버그 로그

                    if ( !getRedirectPsbleYn(URI, REDIRECT_URI1) )
                        objOutpt = new ModelAndView("redirect:" + REDIRECT_URI1 + "?bfore=" + URI + ( !Base.isEmpty(QUERY_STR) ? "?" + QUERY_STR : Base.EMPTYSTR ));
                } else // 1. 익명권한, 3. 관리자권한, 5. 사용자권한
                {
                    logger.debug("$$ 9. OK"); // 디버그 로그
                    objOutpt = pjp.proceed();
                }
            } else                   // 업무로직
            {
                if ( Base.isEmpty(SCR_ADDR_NAME) )
                {
                    logger.debug("$$ [개발오류] 화면주소명이 누락되었습니다."); // 디버그 로그
                    Channel chn = new Channel();
                    chn.setRsltNo(Base.NO_ADDR); // 주소없음
                    objOutpt = chn;
                } else
                if ( -9 == AUTH_NO ) // 잘못되요청
                {
                    logger.debug("$$ [개발오류] 메뉴정보가 존재하지 않습니다. : " + SCR_ADDR_NAME); // 디버그 로그
                    Channel chn = new Channel();
                    chn.setRsltNo(Base.NO_MENU); // 메뉴없음
                    objOutpt = chn;
                } else
                if ( -1 == AUTH_NO ) // 권한없음
                {
                    logger.debug("$$ 9. Login is needed."); // 디버그 로그
                    Channel chn = new Channel();
                    chn.setRsltNo(Base.NO_AUTH); // 권한없음
                    objOutpt = chn;
                } else // 1. 익명권한, 3. 관리자권한, 5. 사용자권한
                {
                    logger.debug("$$ 9. OK"); // 디버그 로그
                    objOutpt = pjp.proceed();
                }
            }
        }

        req = null;

        logger.debug("$$ ---------------------------------------------------"); // 디버그 로그

        return objOutpt;
    }

    // REDIRECT 가능여부 가져오기
    private boolean getRedirectPsbleYn(String strUri, String strRedirect)
    {
        boolean blnOutpt = false;

        if ( !Base.isEmpty(strUri) && !Base.isEmpty(strRedirect) )
        {
            final String REDIRECT_URI = ( !"/".equals(strRedirect) ? strRedirect : "/index.do" );

            blnOutpt = strUri.equals(REDIRECT_URI) || 0 == strUri.indexOf(REDIRECT_URI + ";");
        }

        return blnOutpt;
    }

    // 권한번호 가져오기
    private int getAuthNo(String strScrAddrName, String strMenuAddrNameClsfyId, String strLoginUserId)
    {
        int intOutpt = -9; // 잘못된요청

        MenuAuthVO vo = new MenuAuthVO();

        vo.setMenuAddrName( null != strScrAddrName ? strScrAddrName : Base.EMPTYSTR );
        vo.setMenuAddrNameClsfyId( null != strMenuAddrNameClsfyId ? strMenuAddrNameClsfyId : Base.EMPTYSTR );
        vo.setUserId( null != strLoginUserId ? strLoginUserId : Base.EMPTYSTR );

        intOutpt = Base.strToInt((String) sql.selectOne("menuAuthOra.selectAuthNo", vo));

        vo = null;

        return intOutpt;
    }

    // 화면주소명 가져오기
    private String getScrAddrName(int intReqType, String strUri, String strScrAddrName)
    {
        return ( 1 == intReqType ? strUri : strScrAddrName );
    }

    // 공통매개변수 가져오기
    private ComParamVO getComParam(ProceedingJoinPoint pjp)
    {
        ComParamVO reqOutpt = null;

        // 해당 메소드의 매개변수에서 ComParamVO 객체를 검색한다.
        Object[] objArr = pjp.getArgs();
        for ( Object objArg : objArr )
        {
            if ( objArg instanceof ComParamVO )
            {
                reqOutpt = (ComParamVO) objArg; break;
            }
        }
        objArr = null;

        return ( null != reqOutpt ? reqOutpt : new ComParamVO() );
    }

    // 요청 가져오기
    private HttpServletRequest getReq(ProceedingJoinPoint pjp)
    {
        HttpServletRequest reqOutpt = null;

        // 해당 메소드의 매개변수에서 HttpServletRequest 객체를 검색한다.
        Object[] objArr = pjp.getArgs();
        for ( Object objArg : objArr )
        {
            if ( objArg instanceof HttpServletRequest )
            {
                reqOutpt = (HttpServletRequest) objArg; break;
            }
        }
        objArr = null;

        return reqOutpt;
    }
}