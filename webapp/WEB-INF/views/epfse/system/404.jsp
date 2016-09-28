<%--
--------------------------------------------------------------------------------
    PROJECT NAME : ES-MRV3
--------------------------------------------------------------------------------
    - 단위업무명 : 404 Error
    - 최초작성일 : 2014-06-30
    - 작  성  자 : 유광식
    - 비      고 :
--------------------------------------------------------------------------------
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="../../epfse/system/hdr.jsp" %><%-- 헤더 관련 --%>
<!-- CSS 및 JavaScript 관련 -->
<script type="text/javascript">

//< Sub Procedure and Function - GLOBAL 영역 >

//< Sub Procedure and Function - MAIN 영역 >
//==============================================================================
// DOM 준비시..
//------------------------------------------------------------------------------
$(document).ready(function()
{
    frmComPageReq.comParamSubMenuDispYn.value = Base.NO;
    gfnInit(); // 초기화
});

// < Sub Procedure and Function - 주요 이벤트 영역 >

// < Sub Procedure and Function - 비지니스 로직 호출 영역 >

// < Sub Procedure and Function - 그리드 영역 >

// < Sub Procedure and Function - 차트 영역 >

// < Sub Procedure and Function - 화면 링크 및 이동 >

// < Sub Procedure and Function - 기타 영역 >

</script>
<!-- // CSS 및 JavaScript 관련 -->
<%@ include file="../../epfse/system/menu.jsp" %><%-- 메뉴 관련 --%>

<!-- contents -->
<div class="Contents">
    <div id="MissingPage">
        <div class="MissingBox">
            <ul style="margin-left: 180px">
                <li><strong>${requestScope["ITEM.msgNoPage"]}<%-- 페이지를 찾을 수 없습니다. --%></strong></li>
                <li><div class="BtnStyle InputType02"><button type="button" onclick="javascript:history.back();">${requestScope["ITEM.back"]}<%-- 돌아가기 --%></button></div></li>
            </ul>
            <div class="MissingBtm">
                <div class="EngTxt">
                    <dl>
                        <dt>${requestScope["ITEM.sorry"]}<%-- Sorry! --%></dt>
                        <dd>${requestScope["ITEM.msgEngNoPage"]}<%-- The Web server cannot find the file or script you asked for.<br/>Please check the URL to ensure that the path is correct. --%><dd>
                    </dl>
                </div>
                <div class="MissingLogo">
                    <img src="${pageContext.request.contextPath}/common/images/common/logo_gray.gif" alt="그린 IT 정보센터"/>
                </div>
                <div class="clear"></div>
            </div>
        </div>
    </div>
</div>
<!-- Contents end //-->

<%@ include file="../../epfse/system/ftr.jsp" %><%-- 푸터 관련 --%>