<%--
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 로그인
    - 최초작성일 : 2014-06-10
    - 작  성  자 : 문금환
    - 비      고 :
--------------------------------------------------------------------------------
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">

<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge, chrome=1" />
<title>${requestScope["ITEM.browserTitle"]}<%-- 브라우저제목 --%></title>

<!-- CSS 및 JavaScript 관련 -->
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/common/jquery/css/jquery-ui.min.css" /><!-- jQuery UI //-->
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/common/css/login.css" />

<script src="${pageContext.request.contextPath}/common/jquery/js/jquery.min.js"   ></script><!-- jQuery //-->
<script src="${pageContext.request.contextPath}/common/jquery/js/jquery-ui.min.js"></script><!-- jQuery UI //-->

<script src="${pageContext.request.contextPath}/common/js/base.js"  charset="utf-8"></script><!-- 기본 //-->
<script src="${pageContext.request.contextPath}/common/js/combo.js" charset="utf-8"></script><!-- 콤보 //-->

<script src="${pageContext.request.contextPath}/common/js/cookie.js" charset="utf-8"></script><!-- 쿠키 //-->
<script type="text/javascript">
// < Sub Procedure and Function - GLOBAL 영역 >
Base["msgReqError" ] = '${requestScope["ITEM.msgReqError" ]}'; // 오류가 발생했습니다. 관리자에게 문의하십시오.
Base["msgRsltError"] = '${requestScope["ITEM.msgRsltError"]}'; // 요청결과 오류가 발생했습니다. 관리자에게 문의하십시오.
Base["msgNoAddr"   ] = '${requestScope["ITEM.msgNoAddr"   ]}'; // [개발오류] 화면주소명이 누락되었습니다.
Base["msgNoMenu"   ] = '${requestScope["ITEM.msgNoMenu"   ]}'; // [개발오류] 메뉴정보가 존재하지 않습니다.
Base["msgLoginNeed"] = '${requestScope["ITEM.msgLoginNeed"]}'; // 로그인이 필요합니다.

var g_strUserIdCookiName = "userId" ; // 사용자ID쿠키명

// < Sub Procedure and Function - MAIN 영역 >
//==============================================================================
// DOM 로드시..
//------------------------------------------------------------------------------
$(document).ready(function()
{
    fnCtrlScr("READY"); // 화면 제어 : DOM로드
    fnBindCombo(); // 콤보 바인딩
});

// < Sub Procedure and Function - 주요 이벤트 영역 >
//==============================================================================
// 로그인 클릭시..
//------------------------------------------------------------------------------
function fnClickLogin()
{
    if ( !fnVerif("LOGIN") ) return; // 검증 : 로그인 // 리턴 처리

    fnCtrlScr("BFORELOGIN"); // 화면 제어 : 로그인전

    fnLogin(); // 로그인
}

//==============================================================================
// 팝업 클릭시..
//------------------------------------------------------------------------------
function fnClickPopup()
{
    window.open("/", "_blank", "channelmode=no,directories=yes,fullscreen=no,height=611,location=yes,menubar=yes,resizable=yes,scrollbars=yes,status=yes,titlebar=yes,toolbar=yes,width=977")
}

// < Sub Procedure and Function - 비지니스 로직 호출 영역 >
//==============================================================================
// 로그인
//------------------------------------------------------------------------------
function fnLogin()
{
    gfnReq( // 요청
        // URL
            "/system/login.do" // 로그인
        // 데이터
          , gfnGetFormData($("#loginBox").get(0))
        // 성공콜백함수
          , function(objData)
            {
                var RSLT_VALUE = gfnGetJsonValue(objData, [ Base.RSLT_NO ]);

                if ( Base.OK != RSLT_VALUE )
                {
                    if ( -1 == RSLT_VALUE ) // 데이터없음
                        gfnDispMsg('${requestScope["ITEM.msgDiff"]}<%-- 아이디 또는 비밀번호가 일치하지 않습니다. 다시 확인하십시오. --%>', null, $('[name="userId"]').get(0));
                    else
                    if ( -5 == RSLT_VALUE ) // 비밀번호불일치
                        gfnDispMsg('${requestScope["ITEM.msgDiff"]}<%-- 아이디 또는 비밀번호가 일치하지 않습니다. 다시 확인하십시오. --%>', null, $('[name="pwdName"]').get(0));
                    else
                    if ( -3 == RSLT_VALUE ) // 사용불가
                        gfnDispMsg('${requestScope["ITEM.msgNoUse"]}<%-- 사용할 수 없는 사용자입니다. 관리자에게 문의하십시오. --%>');
                    else
                    if ( !gfnIsBaseError(RSLT_VALUE) )
                        gfnDispMsg(Base.msgRsltError); // 메시지 표시
                } else
                {
                    // 아이디 저장이 선택된 경우..
                    if ( chkIdSave.checked ) gfnSetCooki(g_strUserIdCookiName, $('[name="userId"]').get(0).value);
                    fnMove(); // 이동
                }
            }
    );
}

// < Sub Procedure and Function - 그리드 영역 >

// < Sub Procedure and Function - 차트 영역 >

// < Sub Procedure and Function - 화면 링크 및 이동 >
//==============================================================================
// 이동
//------------------------------------------------------------------------------
function fnMove()
{
    if ( !gfnIsEmpty('${param["bfore"]}') ) $('[name="comParamSubMenuDispYn"]').val("Y");

    // 페이지 이동
    gfnMovePage( !gfnIsEmpty('${param["bfore"]}') ? '${param["bfore"]}' : "/system/main.do" );
}

// < Sub Procedure and Function - 기타 영역 >
//==============================================================================
// 화면 제어
//------------------------------------------------------------------------------
function fnCtrlScr(strClsfy)
{
    if ( strClsfy == "READY" ) // 구분 : DOM로드
    {
        gfnInitPgbar(); // PROGRESSBAR 초기화

        $('#btnLogin').click(fnClickLogin); // 클릭

        // Enter 키 이벤트 설정한다.
        $('[name="userId"]').keydown(function(objEvent)
        {
            if ( 13 == objEvent.keyCode ) gfnFocus($('[name="pwdName"]').get(0));
        }); // 키다운
        $('[name="pwdName"]').keydown(function(objEvent)
        {
            if ( 13 == objEvent.keyCode ) $('#btnLogin').get(0).click();
        });

        $('input.placeholder').bind('focus', function(){
            if(!$.trim($(this).val())) $(this).addClass('off').val('');
        }); // FOCUS

        $('input.placeholder').bind('blur', function(){
            var VAL = $(this).val();

            if(!$.trim(VAL)) $(this).removeClass('off').val('');
            if ( $(this).attr("name") == "userId" && !gfnIsEmpty(VAL) ) $(this).val(VAL.toUpperCase());
        }); // BLUR

        // 저장된 아이디를 설정한다.
        if ( 0 >= gfnGetCooki(g_strUserIdCookiName).length )
        {
            gfnFocus($('[name="userId" ]').get(0));
        } else {
            $('[name="userId"]').get(0).value = gfnGetCooki(g_strUserIdCookiName);
            gfnFocus($('[name="pwdName"]').get(0));
        }

        // 사이즈 조정
        $(window).bind('load resize', function(){
            var wHeight = $(window).height();
            var fHeight = $('#footer').outerHeight();
            var mHeight = 850;

            if(wHeight > mHeight){
                $('#footer').css({
                    position : 'absolute',
                    bottom : 0,
                    width : '100%'
                });
                $('#login').height(wHeight - fHeight);
            }else{
                $('#footer').css({
                    position : 'static'
                });
                $('#login').height(765);
            }
        });
    } else
    if ( strClsfy == "BFORELOGIN" )
    {
        // 사용자언어코드를 설정한다.
        $('#divComParamContnr>[name="comParamUserLangCode"]').val($("#sltLangCode").val());
    }
}

//==============================================================================
// 콤보 바인딩
//------------------------------------------------------------------------------
function fnBindCombo()
{
    gfnBindCombo("sltLangCode", $('[name="comParamLangCodeHdrId"]').val());
}

//==============================================================================
// 검증
//------------------------------------------------------------------------------
function fnVerif(strClsfy)
{
    if ( strClsfy == "LOGIN" ) // 로그인
    {
        var MSG_INPUT_ITEM = '${requestScope["ITEM.msgInputItem"]}'; // 해당 항목을 입력하십시오.

        if ( '${requestScope["MENU.authCode"]}' != Base.WRITE_AUTH ) // 쓰기 권한 검증
        {
            gfnDispMsg('${requestScope["ITEM.msgNoAuth"]}<%-- 권한이 없습니다. 관리자에게 문의하십시오. --%>');
            return false;
        }

        // 입력여부 검증
        if ( !gfnVerifInputYn("아이디", $('[name="userId"]').get(0), MSG_INPUT_ITEM) ) return false; // 아이디
    }

    return true;
}

</script>
<!-- // CSS 및 JavaScript 관련 -->
</head>

<body>
    <form name="frmComPageReq" method="post"><!-- 공통페이지요청 //-->
        <div id="divComParamContnr"><!-- 공통매개변수컨테이너 //-->
            <input type="hidden" name="comParamUserLangCode"  value='${requestScope["SYS_VAR.dfltLangCode"]}' /><!-- 사용자언어코드 //-->
            <input type="hidden" name="comParamLangCodeHdrId" value='<%=com.ecosian.epfse.system.common.Base.LANG_CODE_HDR_ID%>' /><!-- 언어코드헤더ID //-->
            <input type="hidden" name="comParamScrAddrName"   value='${requestScope["COM_PARAM.scrAddrName"]}' /><!-- 화면주소명 //-->

            <input type="hidden" name="comParamSubMenuDispYn" value='N' /><!-- 서브메뉴표시여부 //-->

            <input type="hidden" id="hidComParamContextPatch" name="comParamContextPath" value='${pageContext.request.contextPath}' /><!-- Context Path -->
        </div>
    </form>

    <!-- Progress Bar 영역 //-->
    <div id="divCommonJspPgbar" style="display: none; text-align: center; padding-top: 32px">
        <img src="${pageContext.request.contextPath}/common/images/common/loading.gif" />
    </div>

    <!-- s : header -->
    <div id="header">
        <div class="wrap">
            <span><span class="ir"></span>로그인</span>
        </div>
    </div>
    <!-- e : header -->

    <!-- s : body -->
    <div id="background"></div>
    <div id="loginBox">
        <h1><img src="${pageContext.request.contextPath}/common/images/login/logoLogin.png" alt="ES MRV - 온실가스 목표관리제 대응 시스템" /></h1>
        <div>
            <p><span class="ir"></span>ES-MRV System - Measurable, Reportable and Verifiable, 온실가스ㆍ에너지 목표관리 시스템</p>
            <div>
                <input type="text"     name="userId"  class="inputText uid placeholder off" style="ime-mode: disabled" title="아이디"  />
                <input type="password" name="pwdName" class="inputText upass placeholder"   title="비밀번호" />
                <label>
                    <input type="checkbox" id="chkIdSave" tabindex="-1"  />
                    <span>아이디 저장</span>
                </label>
                <button type="button" id="btnLogin"><span class="ir"></span>로그인</button>

                <input type="hidden" name="ssoYn"     value="N" /><!-- SSO여부 //--><!-- 부 //-->
                <input type="hidden" name="clsfyCode" value="1" /><!-- 구분코드 : 로그인 //-->

                <select id="sltLangCode" style="margin-top: 2px; width: 80px; display: none;"></select><!-- 언어코드 //-->
                <input type="button" value="팝업" style="display: none;" tabindex="-1" onclick="javascript: fnClickPopup();" />
            </div>
        </div>
    </div>
    <!-- e : body -->

    <!-- s : footer -->
    <div id="footer">
        <div class="wrap">
            <h1><span class="ir global"></span>ES-MRV</h1>
            <p>Copyright ⓒ ecosian. 2014 all rights reserved.</p>
        </div>
    </div>
    <!-- e : footer -->
</body>

</html>