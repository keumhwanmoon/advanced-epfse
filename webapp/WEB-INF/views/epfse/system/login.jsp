<%--
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 로그인
    - 최초작성일 : 2016-07-05
    - 작  성  자 : 문금환
    - 비      고 :
--------------------------------------------------------------------------------
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <meta name="description" content="A fully featured admin theme which can be used to build CRM, CMS, etc.">
    <meta name="author" content="Coderthemes">

    <link rel="shortcut icon" href="assets/images/favicon_1.ico">

    <title>Minton - Responsive Admin Dashboard Template</title>

    <link href="common/minton/css/bootstrap.min.css" rel="stylesheet" type="text/css">
    <link href="common/minton/css/core.css" rel="stylesheet" type="text/css">
    <link href="common/minton/css/icons.css" rel="stylesheet" type="text/css">
    <link href="common/minton/css/components.css" rel="stylesheet" type="text/css">
    <link href="common/minton/css/pages.css" rel="stylesheet" type="text/css">
    <link href="common/minton/css/menu.css" rel="stylesheet" type="text/css">
    <link href="common/minton/css/responsive.css" rel="stylesheet" type="text/css">

    <script src="common/minton/js/modernizr.min.js"></script>

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
    <script src="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script>
    <![endif]-->


</head>
<body>

<form name="frmComPageReq" method="post"><!-- 공통페이지요청 //-->
    <div id="divComParamContnr"><!-- 공통매개변수컨테이너 //-->
        <input type="hidden" name="comParamUserLangCode" value='${requestScope["SYS_VAR.dfltLangCode"]}'/>
        <!-- 사용자언어코드 //-->
        <input type="hidden" name="comParamLangCodeHdrId"
               value='<%=com.ecosian.epfse.system.common.Base.LANG_CODE_HDR_ID%>'/><!-- 언어코드헤더ID //-->
        <input type="hidden" name="comParamScrAddrName" value='${requestScope["COM_PARAM.scrAddrName"]}'/>
        <!-- 화면주소명 //-->

        <input type="hidden" name="comParamSubMenuDispYn" value='N'/><!-- 서브메뉴표시여부 //-->

        <input type="hidden" id="hidComParamContextPatch" name="comParamContextPath"
               value='${pageContext.request.contextPath}'/><!-- Context Path -->
    </div>
</form>

<div class="wrapper-page">

    <div class="text-center">
        <a href="index.html" class="logo logo-lg"><i class="md md-equalizer"></i> <span>Minton</span> </a>
    </div>

    <form id="loginForm" class="form-horizontal m-t-20" novalidate>

        <div class="form-group">
            <div class="col-xs-12">
                <input class="form-control" id="userId" name="userId" type="text" required="" placeholder="Username">
                <i class="md md-account-circle form-control-feedback l-h-34"></i>
            </div>
        </div>

        <div class="form-group">
            <div class="col-xs-12">
                <input class="form-control" id="pwdName" name="pwdName" type="password" required="" placeholder="Password">
                <i class="md md-vpn-key form-control-feedback l-h-34"></i>
            </div>
        </div>

        <div class="form-group">
            <div class="col-xs-12">
                <div class="checkbox checkbox-primary">
                    <input id="checkbox-signup" type="checkbox">
                    <label for="checkbox-signup">
                        Remember me
                    </label>
                </div>

            </div>
        </div>

        <div class="form-group text-right m-t-20">
            <div class="col-xs-12">
                <button class="btn btn-primary btn-custom w-md waves-effect waves-light" id="loginBtn" type="submit">Log In
                </button>
            </div>
        </div>

        <div class="form-group m-t-30">
            <div class="col-sm-7">
                <a href="pages-recoverpw.html" class="text-muted"><i class="fa fa-lock m-r-5"></i> Forgot your
                    password?</a>
            </div>
            <div class="col-sm-5 text-right">
                <a href="pages-register.html" class="text-muted">Create an account</a>
            </div>
        </div>
    </form>
</div>


<script>
    var resizefunc = [];
</script>

<!-- Main  -->
<script src="common/minton/js/jquery.min.js"></script>
<script src="common/minton/js/bootstrap.min.js"></script>
<script src="common/minton/js/detect.js"></script>
<script src="common/minton/js/fastclick.js"></script>
<script src="common/minton/js/jquery.slimscroll.js"></script>
<script src="common/minton/js/jquery.blockUI.js"></script>
<script src="common/minton/js/waves.js"></script>
<script src="common/minton/js/wow.min.js"></script>
<script src="common/minton/js/jquery.nicescroll.js"></script>
<script src="common/minton/js/jquery.scrollTo.min.js"></script>

<!-- Custom main Js -->
<script src="common/minton/js/jquery.core.js"></script>
<script src="common/minton/js/jquery.app.js"></script>

<!-- EPF-SE Js -->
<script src="common/js/base.js"></script>

<script type="text/javascript">
    $(document).ready(function() {
        if (view) {
            view.loginView.init();
        }
    });

    var msg = {
        inputItem: '${requestScope["ITEM.msgInputItem"]}', // 해당 항목을 입력하십시오.
        noAuth: '${requestScope["ITEM.msgNoAuth"]}', // 권한이 없습니다. 관리자에게 문의하십시오.
        authCode: '${requestScope["MENU.authCode"]}', // 권한코드
        diff: '${requestScope["ITEM.msgDiff"]}', // 아이디 또는 비밀번호가 일치하지 않습니다. 다시 확인하십시오.
        noUse: '${requestScope["ITEM.msgNoUse"]}' // 사용할 수 없는 사용자입니다. 관리자에게 문의하십시오.
    };

    var view = {
        loginView: {
            loginForm: $("#loginForm"),
            id: $("#userId"),
            password: $("#pwdName"),
            loginBtn: $("#loginBtn"),

            init: function() {
                this.loginForm.bind("submit", function() {
                    if (!view.loginView.validate("LOGIN")) return false;

                    view.loginView.login();
                });
            },
            validate: function(strClsfy) {
                if (strClsfy == "LOGIN") {
                    if ( msg.authCode != Base.WRITE_AUTH ) // 쓰기 권한 검증
                    {
                        gfnDispMsg(msg.noAuth);
                        return false;
                    }

                    // 입력여부 검증
                    if ( !gfnVerifInputYn("아이디", this.id.get(0), msg.inputItem) ) return false; // 아이디
                }

                return true;
            },
            login: function() {
                gfnReq( // 요청
                        // URL
                        "/system/login.do" // 로그인
                        // 데이터
                        , gfnGetFormData(this.loginForm.get(0))
                        // 성공콜백함수
                        , function(objData)
                        {
                            var RSLT_VALUE = gfnGetJsonValue(objData, [ Base.RSLT_NO ]);

                            if ( Base.OK != RSLT_VALUE )
                            {
                                if ( -1 == RSLT_VALUE ) // 데이터없음
                                    gfnDispMsg(msg.diff, null, $('[name="userId"]').get(0));
                                else
                                if ( -5 == RSLT_VALUE ) // 비밀번호불일치
                                    gfnDispMsg(msg.diff, null, $('[name="pwdName"]').get(0));
                                else
                                if ( -3 == RSLT_VALUE ) // 사용불가
                                    gfnDispMsg(msg.noUse);
                                else
                                if ( !gfnIsBaseError(RSLT_VALUE) )
                                    gfnDispMsg(Base.msgRsltError); // 메시지 표시
                            } else
                            {
                                // 아이디 저장이 선택된 경우..
                                if ( chkIdSave.checked ) gfnSetCooki(g_strUserIdCookiName, this.id.get(0).value);
                                this.success(); // 이동
                            }
                        }
                );
            },
            success: function() {
                if ( !gfnIsEmpty('${param["bfore"]}') ) $('[name="comParamSubMenuDispYn"]').val("Y");

                // 페이지 이동
                gfnMovePage( !gfnIsEmpty('${param["bfore"]}') ? '${param["bfore"]}' : "/system/main.do" );
            }
        }
    }
</script>

</body>
</html>