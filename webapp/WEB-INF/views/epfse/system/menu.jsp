<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<!-- menu CSS 및 JavaScript 관련 START //-->
<script src="${pageContext.request.contextPath}/common/js/menu.js" charset="utf-8"></script>
<script type="text/javascript">
Base["msgReqError" ] = '${requestScope["ITEM.msgReqError" ]}'; // 오류가 발생했습니다. 관리자에게 문의하십시오.
Base["msgRsltError"] = '${requestScope["ITEM.msgRsltError"]}'; // 요청결과 오류가 발생했습니다. 관리자에게 문의하십시오.
Base["msgNoAddr"   ] = '${requestScope["ITEM.msgNoAddr"   ]}'; // [개발오류] 화면주소명이 누락되었습니다.
Base["msgNoMenu"   ] = '${requestScope["ITEM.msgNoMenu"   ]}'; // [개발오류] 메뉴정보가 존재하지 않습니다.
Base["msgLoginNeed"] = '${requestScope["ITEM.msgLoginNeed"]}'; // 로그인이 필요합니다.
Base["comboTextYes"] = '${requestScope["ITEM.comboTextYes"]}'; // 예
Base["comboTextNo" ] = '${requestScope["ITEM.comboTextNo" ]}'; // 아니오
</script>
<!-- // menu CSS 및 JavaScript 관련 -->
<!-- // header CSS 및 JavaScript 관련 -->
</head>

<!-- menu BODY -->
<body>
    <form name="frmComPageReq" method="post"><!-- 페이지 요청 //-->
        <div id="divComParamContnr"><!-- 공통매개변수컨테이너 //-->
            <input type="hidden" name="comParamUserLangCode"  value='${requestScope["COM_PARAM.langCode"]}' /><!-- 사용자언어코드 //-->
            <input type="hidden" name="comParamLangCodeHdrId" value='<%=com.ecosian.epfse.system.common.Base.LANG_CODE_HDR_ID%>' /><!-- 언어코드헤더ID //-->
            <input type="hidden" name="comParamScrAddrName"   value='${requestScope["COM_PARAM.scrAddrName"]}' /><!-- 화면주소명 //-->

            <input type="hidden" name="comParamLoginUserId"   value='${sessionScope["loginUserId"]}' /><!-- 로그인사용자ID //-->
            <input type="hidden" name="comParamSubMenuDispYn" value='${requestScope["USER.subMenuDispYn"]}' /><!-- 서브메뉴표시여부 //-->

            <input type="hidden" name="comParamScrDataJsonStrSet" value="" /><!-- 화면데이터JSON문자열설정     //-->
            <input type="hidden" name="comParamScrDataJsonStrGet" value='${param["comParamScrDataJsonStrSet"]}' /><!-- 화면데이터JSON문자열가져오기 //-->

            <input type="hidden" id="hidComParamContextPatch" name="comParamContextPath" value='${pageContext.request.contextPath}' /><!-- Context Path -->
        </div>
    </form>

    <!-- Progress Bar 영역 //-->
    <div id="divCommonJspPgbar" style="display: none; text-align: center; padding-top: 32px">
        <img src="${pageContext.request.contextPath}/common/images/common/loading.gif" />
    </div>

    <!-- Logout 영역 //-->
    <div id="divCommonLout" style="display: none">
        <input type="hidden" name="clsfyCode" value="9" /><!-- 구분코드 : 로그아웃 //-->
    </div>

    <!-- s : skip navigation -->
    <a href="#gnb"    class="skipNav">GNB로 건너뛰기</a>
    <a href="#lnb"    class="skipNav">LNB로 건너뛰기</a>
    <a href="#body"   class="skipNav">콘텐츠로 건너뛰기</a>
    <a href="#footer" class="skipNav">푸터로 건너뛰기</a>
    <!-- e : skip navigation -->

    <!-- s : header -->
    <div id="header">
        <div class="wrap local">
            <h1><a href="${pageContext.request.contextPath}/system/main.do"><span class="ir global"></span>ES-MRV 온실가스 목표관리제 대응 시스템</a></h1>

            <ul class="tnb">
                <li><a href="#" class="link01 on"><span class="ir global"></span>처음화면</a></li>
                <li><a href="#" class="link02"   ><span class="ir global" onclick="javascript: gfnMenuLout();"></span>로그인</a></li>
<c:if test='${null != requestScope["MENU.topNo05"]}'>				<li><a href="#" class="link03" onclick='javascript: gfnClickMenuTop("${requestScope["MENU.topNo05"]}","${requestScope["MENU.topName05"]}");'><span class="ir global"></span>${requestScope["MENU.topName05"]}<%-- 기준정보   --%></a></li></c:if>
<c:if test='${null != requestScope["MENU.topNo06"]}'>				<li><a href="#" class="link04" onclick='javascript: gfnClickMenuTop("${requestScope["MENU.topNo06"]}","${requestScope["MENU.topName06"]}");'><span class="ir global"></span>${requestScope["MENU.topName06"]}<%-- 시스템정보 --%></a></li></c:if>
<c:if test='${null != requestScope["MENU.topNo07"]}'>				<li><a href="#" class="link05" onclick='javascript: gfnClickMenuTop("${requestScope["MENU.topNo07"]}","${requestScope["MENU.topName07"]}");'><span class="ir global"></span>${requestScope["MENU.topName07"]}<%-- 개발도구   --%></a></li></c:if>
            </ul>

            <!-- s : gnb -->
            <ul id="gnb">
                <li class="link01">
                    <a href="#" onclick='javascript: gfnClickMenuTop("${requestScope["MENU.topNo01"]}","${requestScope["MENU.topName01"]}");'><span class="ir global"></span>${requestScope["MENU.topName01"]}<%-- 실적조회 --%></a>
                    <ul>
<c:if test='${null != requestScope["MENU.subName01_01"]}'>						<li><a href="#" onclick='javascript: gfnClickMenuTop("${requestScope["MENU.topNo01"]}","${requestScope["MENU.topName01"]}");'>${requestScope["MENU.subName01_01"]}<%-- 사업장 실적조회   --%></a></li></c:if>
<c:if test='${null != requestScope["MENU.subName01_02"]}'>						<li><a href="#" onclick='javascript: gfnClickMenuTop("${requestScope["MENU.topNo01"]}","${requestScope["MENU.topName01"]}");'>${requestScope["MENU.subName01_02"]}<%-- 배출시설 실적조회 --%></a></li></c:if>
<c:if test='${null != requestScope["MENU.subName01_03"]}'>						<li><a href="#" onclick='javascript: gfnClickMenuTop("${requestScope["MENU.topNo01"]}","${requestScope["MENU.topName01"]}");'>${requestScope["MENU.subName01_03"]}<%-- 연료 실적조회     --%></a></li></c:if>
                    </ul>
                </li>
                <li class="link02">
                    <a href="#" onclick='javascript: gfnClickMenuTop("${requestScope["MENU.topNo02"]}","${requestScope["MENU.topName02"]}");'><span class="ir global"></span>${requestScope["MENU.topName02"]}<%-- 목표설정 --%></a>
                    <ul>
<c:if test='${null != requestScope["MENU.subName02_01"]}'>						<li><a href="#" onclick='javascript: gfnClickMenuTop("${requestScope["MENU.topNo02"]}","${requestScope["MENU.topName02"]}");'>${requestScope["MENU.subName02_01"]}<%-- 업체 목표설정     --%></a></li></c:if>
<c:if test='${null != requestScope["MENU.subName02_02"]}'>						<li><a href="#" onclick='javascript: gfnClickMenuTop("${requestScope["MENU.topNo02"]}","${requestScope["MENU.topName02"]}");'>${requestScope["MENU.subName02_02"]}<%-- 사업장 목표설정   --%></a></li></c:if>
<c:if test='${null != requestScope["MENU.subName02_03"]}'>						<li><a href="#" onclick='javascript: gfnClickMenuTop("${requestScope["MENU.topNo02"]}","${requestScope["MENU.topName02"]}");'>${requestScope["MENU.subName02_03"]}<%-- 배출시설 목표설정 --%></a></li></c:if>
                    </ul>
                </li>
                <li class="link03">
                    <a href="#" onclick='javascript: gfnClickMenuTop("${requestScope["MENU.topNo03"]}","${requestScope["MENU.topName03"]}");'><span class="ir global"></span>${requestScope["MENU.topName03"]}<%-- 사용량입력 --%></a>
                    <ul>
<c:if test='${null != requestScope["MENU.subName03_01"]}'>						<li><a href="#" onclick='javascript: gfnClickMenuTop("${requestScope["MENU.topNo03"]}","${requestScope["MENU.topName03"]}");'>${requestScope["MENU.subName03_01"]}<%-- 연료 사용량입력     --%></a></li></c:if>
<c:if test='${null != requestScope["MENU.subName03_02"]}'>						<li><a href="#" onclick='javascript: gfnClickMenuTop("${requestScope["MENU.topNo03"]}","${requestScope["MENU.topName03"]}");'>${requestScope["MENU.subName03_02"]}<%-- 이동연소 사용량입력 --%></a></li></c:if>
<c:if test='${null != requestScope["MENU.subName03_03"]}'>						<li><a href="#" onclick='javascript: gfnClickMenuTop("${requestScope["MENU.topNo03"]}","${requestScope["MENU.topName03"]}");'>${requestScope["MENU.subName03_03"]}<%-- 배출량 재계산       --%></a></li></c:if>
                    </ul>
                </li>
                <li class="link04">
                    <a href="#" onclick='javascript: gfnClickMenuTop("${requestScope["MENU.topNo04"]}","${requestScope["MENU.topName04"]}");'><span class="ir global"></span>${requestScope["MENU.topName04"]}<%-- 커뮤니티 --%></a>
                    <ul>
<c:if test='${null != requestScope["MENU.subName04_01"]}'>						<li><a href="#" onclick='javascript: gfnClickMenuTop("${requestScope["MENU.topNo04"]}","${requestScope["MENU.topName04"]}");'>${requestScope["MENU.subName04_01"]}<%-- 공지사항   --%></a></li></c:if>
<c:if test='${null != requestScope["MENU.subName04_02"]}'>						<li><a href="#" onclick='javascript: gfnClickMenuTop("${requestScope["MENU.topNo04"]}","${requestScope["MENU.topName04"]}");'>${requestScope["MENU.subName04_02"]}<%-- 시스템문의 --%></a></li></c:if>
<c:if test='${null != requestScope["MENU.subName04_03"]}'>						<li><a href="#" onclick='javascript: gfnClickMenuTop("${requestScope["MENU.topNo04"]}","${requestScope["MENU.topName04"]}");'>${requestScope["MENU.subName04_03"]}<%-- 자료실     --%></a></li></c:if>
<c:if test='${null != requestScope["MENU.subName04_04"]}'>						<li><a href="#" onclick='javascript: gfnClickMenuTop("${requestScope["MENU.topNo04"]}","${requestScope["MENU.topName04"]}");'>${requestScope["MENU.subName04_04"]}<%-- FAQ        --%></a></li></c:if>
<c:if test='${null != requestScope["MENU.subName04_05"]}'>						<li><a href="#" onclick='javascript: gfnClickMenuTop("${requestScope["MENU.topNo04"]}","${requestScope["MENU.topName04"]}");'>${requestScope["MENU.subName04_05"]}<%-- Q&A        --%></a></li></c:if>
                    </ul>
                </li>
            </ul>
            <!-- e : gnb -->
        </div>
    </div>
    <!-- e : header -->

    <!-- s : body -->
    <div id="body">
        <div id="lnb">
            <h2><span></span>${requestScope["MENU.pathName02"]}</h2>
            <ul class="bold">
            </ul>
        </div>

        <div class="contentWrap">
            <div id="divTab" class="contentTab">
                <button type="button" class="exp" title="콘텐츠영역 확장"><span></span>콘텐츠영역 확장/축소</button>
                <button type="button" class="prevTab" title="이전 탭 활성화"><span></span>이전 탭 활성화</button>
                <button type="button" class="nextTab" title="다음 탭 활성화"><span></span>다음 탭 활성화</button>
                <ul></ul>
            </div>

        <div id="content">
<!-- menu BODY -->
