/*
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 기준
    - 최초작성일 : 2014-04-09
    - 작  성  자 : 문금환
    - 비      고 :
--------------------------------------------------------------------------------
*/
package com.ecosian.epfse.system.common;

import java.math.BigDecimal;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Arrays;
import java.util.List;
import java.util.TreeSet;

import javax.servlet.http.HttpServletRequest;

public class Base
{
    public static final String EMPTYSTR = ""; // 빈문자열
    public static final String STR_ZERO = "0"; // 문자열 0
    public static final BigDecimal BDC_ZERO = BigDecimal.ZERO;
    public static final BigDecimal  BDC_ONE = BigDecimal.ONE;
    public static final String YES = "Y"; // 여
    public static final String NO  = "N"; // 부

    public static final String DELI11 = "|"; // 구분자
    public static final String DELI12 = "\\|";

    public static final int OK = 1; // OK // 결과번호
    public static final int NO_ADDR   = -1010; // 주소없음
    public static final int NO_MENU   = -1030; // 메뉴없음
    public static final int NO_AUTH   = -1050; // 권한없음
    public static final int NO_DATA   = -1100; // 데이터없음
    public static final int NOT_EXITS = -1110; // 존재하지 않음
    public static final int DATA_DUP  = -1200; // 데이터중복

    public static final String LOGIN_USER_ID = "loginUserId"; // 로그인사용자ID // 세션속성명

    public static final String LANG_CODE_HDR_ID = "LANG_CODE";

    private static int intStartValue = 1000; // 시작값
    private static int intEndValue   = 9999; // 종료값
    private static int intCrrntValue = 1000; // 현재값

    // Path 가져오기
    public static String getReturnPath(HttpServletRequest req)
    {
        return req.getRequestURI().replace(".do", "").replace(req.getContextPath(), "");
    }

    // 요청 유형 가져오기
    public static int getReqType(String strSignature)
    {
        int intOutpt = -1; // 오류

        // Controller 함수의 return type 에 따라 분류한다.
        if ( 0 == strSignature.indexOf("ModelAndView") ) intOutpt = 1; // 페이지
        //else
        //if ( 0 == strSignature.indexOf("Map"   ) ) intOutpt = 2; // 업무로직
        else
        if ( 0 == strSignature.indexOf("Channel"     ) ) intOutpt = 2; // 업무로직

        return intOutpt;
    }

    // 정리
    public static void clear(List lst)
    {
        if ( null != lst )
        {
            lst.clear(); lst = null;
        }
    }

    public static boolean isEmpty(String str)
    {
        return ( null == str || 0 >= str.length() );
    }

    public static String coalesce(String str)
    {
        return coalesce(str, EMPTYSTR);
    }
    public static String coalesce(String str, String strDflt)
    {
        return ( !isEmpty(str) ? str : strDflt );
    }

    public static int strToInt(String str)
    {
        int intOutpt = 0;
        try { intOutpt = Integer.parseInt(str); } catch ( Exception ectErr ) { ectErr.printStackTrace(); }
        return intOutpt; // 리턴 처리 - 출력 변수
    }

    // 해시 가져오기
    public static String getHash(String strMsg)
    {
        StringBuffer sbOutpt = new StringBuffer();
        MessageDigest md = null;

        try
        {
            md = MessageDigest.getInstance("SHA-512"); md.update(strMsg.getBytes());
            byte[] arrDigest = md.digest(); final int LNGTH = arrDigest.length;
            for ( int i = 0 ; i < LNGTH ; i++ )
                sbOutpt.append(Integer.toString((arrDigest[i] & 0xff) + 0x100, 16).substring(1));
        }
        catch ( NoSuchAlgorithmException e )
        {
            e.printStackTrace();
            sbOutpt.append(strMsg);
        }

        return sbOutpt.toString();
    }

    // ID 가져오기
    public static synchronized String getId()
    {
        final int intSffx = intCrrntValue; // 출력접미사

        intCrrntValue++;
        if ( intCrrntValue >= ( intEndValue + 1 ) ) intCrrntValue = intStartValue;

        return System.currentTimeMillis() + "_" + intSffx; // 리턴 처리
    }

    // 분할
    public static String[] split(String strData, String strDeli, int intLngth)
    {
        if ( null == strData )
            return new String[intLngth];
        else
            return strData.split(strDeli, -1);
    }

    // 문자열 관련
    /**
     *
     * @Method Name : replace
     * @작성일      : 2012-01-12
     * @작성자      : 문금환
     * @변경이력    :
     * @Method 설명 : 대체
     * @param   String, String, String
     * @return  String
     * @throws
     */
    public static String replace(String strOrg, String strOld, String strNew)
    {
        // 변수 선언 및 설정
        StringBuffer sbf = new StringBuffer(); // 임시

        int intCrrntPstion ; // 현재위치
        int intRcntPstion  = 0 ; // 최근위치

            while ( true )
            {
                intCrrntPstion = strOrg.indexOf(strOld, intRcntPstion); // 현재위치 설정
                if ( 0 > intCrrntPstion ) break ; // 대상 문자열이 맨앞에 있는 경우 return 되던 문제를 수정

                sbf.append(strOrg.substring(intRcntPstion, intCrrntPstion));
                sbf.append(strNew);

                intRcntPstion = intCrrntPstion + strOld.length();
                if ( intRcntPstion >= strOrg.length() ) break ;
            }
            sbf.append(strOrg.substring(intRcntPstion, strOrg.length()));

        final String strOutput = sbf.toString(); // 출력 변수 선언 및 설정

        sbf = null ;

        return strOutput ; // 리턴 처리 - 출력 변수
    }

    /**
    *
    * @Method Name : castArrayObjectToString
    * @작성일      : 2014-12-17
    * @작성자      : 문금환
    * @변경이력    :
    * @Method 설명 : Object배열을 String배열로 캐스팅한다. Object[] -> String[]
    * @param   String, String
    * @return  String
    * @throws
    */
    public static String[] castArrayObjectToString(Object[] arrObj)
    {
        String[] arrStr = null;

        arrStr = Arrays.copyOf(arrObj, arrObj.length, String[].class);

        return arrStr;
    }

    /**
    *
    * @Method Name : arrayJoinString
    * @작성일      : 2014-12-17
    * @작성자      : 문금환
    * @변경이력    :
    * @Method 설명 : String 배열을 String으로 조립한다.
    *                 return -> 사과|배|바나나
    * @param   String, String
    * @return  String
    * @throws
    */
    public static String arrayJoinString(Object[] arrObj)
    {
        String strOutpt = null;

        final int LNGTH = arrObj.length;

        StringBuffer sbf = new StringBuffer();

        for (int intIndex = 0; intIndex < LNGTH; intIndex++)
        {
            sbf.append(arrObj[intIndex]);

            if ( LNGTH != 1 && intIndex < LNGTH-1 ) sbf.append(Base.DELI11);
        }

        strOutpt = sbf.toString();

        return strOutpt;
    }

    /**
    *
    * @Method Name : removeDuplicateArray
    * @작성일      : 2014-12-17
    * @작성자      : 문금환
    * @변경이력    :
    * @Method 설명 : 배열 중복제거
    * @param   String, String
    * @return  String
    * @throws
    */
   public static String[] removeDuplicateArray(String[] arrOrg)
   {
       String[] arrOutpt = null;

       TreeSet<String> ts = new TreeSet<String>();

       for (int intIndex = 0; intIndex < arrOrg.length; intIndex++)
       {
           ts.add(arrOrg[intIndex]);
       }

       // Object Array를 String Array로 변환한다.
           // ts.toArray()가 Object Array를 리턴한다.
       arrOutpt = Base.castArrayObjectToString(ts.toArray());

       return arrOutpt;
   }

    /**
     *
     * @Method Name : removeDuplicateString
     * @작성일      : 2014-12-17
     * @작성자      : 문금환
     * @변경이력    :
     * @Method 설명 : 문자열 중복제거
     *                 removeDuplicateString("사과|사과|배|바나나|바나나", "\\|");
     *                 리턴 -> 사과|배|바나나
     * @param   String, String
     * @return  String
     * @throws
     */
    public static String removeDuplicateString(String strOrg, String strDeli)
    {
        String   strOutpt = Base.EMPTYSTR;
        String[] arrNew   = null;

        // 구분자 변경
        Base.replace(strOrg, strDeli, Base.DELI11);

        String[] arrOrg = strOrg.split(Base.DELI12);

        arrNew =  removeDuplicateArray(arrOrg); // 배열 중복 제거

        strOutpt = Base.arrayJoinString(arrNew); // 배열 String Join

        return Base.replace(strOutpt, Base.DELI11, strDeli); // 구분자 재변경
    }
}