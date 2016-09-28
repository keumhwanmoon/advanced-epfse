/*
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 로그 Aspect
    - 최초작성일 : 2014-04-09
    - 작  성  자 : 문금환
    - 비      고 :
--------------------------------------------------------------------------------
*/
package com.ecosian.epfse.system.common;

import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.aspectj.lang.JoinPoint;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Aspect // applicationContext-aspect.xml 내 설정된 Aspect Class
public class LogAspect
{
    private static final Logger logger =
            LoggerFactory.getLogger(LogAspect.class);

    @Pointcut("execution(* com.ecosian.*.*.*.ctrl.*Controller.*(..))")
    private void getPointCutController() { }

    @Before("getPointCutController()")
    public void beforeController(JoinPoint jp) throws Throwable
    {
        before(jp);
    }

    @AfterReturning(pointcut="getPointCutController()", returning="objOutpt")
    private Object afterReturningController(JoinPoint jp, Object objOutpt)
    {
        return afterReturning(jp, objOutpt); // 리턴 처리
    }
    //@AfterReturning(pointcut="getPointCutService()", returning="obj")
    //private Object afterReturningService(JoinPoint jp, Object obj){
        //return afterReturning(jp, obj); // 리턴 처리
    //}
    //@AfterReturning(pointcut="getPointCutDAO()", returning="obj")
    //private Object afterReturningDAO(JoinPoint jp, Object obj){
        //return afterReturning(jp, obj); // 리턴 처리
    //}

    private void before(JoinPoint jp)
    {
        logger.debug("$$ ==================================================="); // 디버그 로그
        logger.debug("$$ before : " + jp.toShortString()); // 디버그 로그

        Object[] args = jp.getArgs();

        if ( null != args ) {
            final int LNGTH = args.length;

            for ( int i = 0 ; i < LNGTH ; i++ )
                logger.debug("$$ - param " + (i + 1) + ". " + args[i].getClass().getName() + " : " + args[i]); // 디버그 로그
        }

        args = null;

        logger.debug("$$ ---------------------------------------------------"); // 디버그 로그
    }

    private Object afterReturning(JoinPoint jp, Object objOutpt)
    {
        logger.debug("$$ ==================================================="); // 디버그 로그
        logger.debug("$$ afterReturning : " + jp.toShortString()); // 디버그 로그
        if ( null != objOutpt )
        {
            logger.debug("$$  - return " + objOutpt.getClass().getName() + " : " + objOutpt); // 디버그 로그

            if ( "com.ecosian.epfse.system.common.Channel".equals(objOutpt.getClass().getName()) )
            {
                logger.debug("$$  - return Channel.getRsltNo  () : " + ((Channel) objOutpt).getRsltNo  ()); // 디버그 로그
                logger.debug("$$  - return Channel.getRsltInfo() : " + ((Channel) objOutpt).getRsltInfo()); // 디버그 로그
                logger.debug("$$  - return Channel.getRsltList() : " + ((Channel) objOutpt).getRsltList()); // 디버그 로그
            }
        }
        logger.debug("$$ ---------------------------------------------------"); // 디버그 로그

        return objOutpt; // 리턴 처리
    }
}