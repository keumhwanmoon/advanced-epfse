<%--
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 편집
    - 최초작성일 : 2014-05-13
    - 작  성  자 : 유광식
    - 비      고 :
--------------------------------------------------------------------------------
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="../../epfse/system/tabHdr.jsp" %><%-- 헤더 관련 --%>
<!-- CSS 및 JavaScript 관련 -->
<link href="${pageContext.request.contextPath}/common/css/attch.css" rel="stylesheet" type="text/css" />

<script type="text/javascript" src="${pageContext.request.contextPath}/common/smartEditor/js/HuskyEZCreator.js" charset="utf-8"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/common/js/edit.js" charset="utf-8"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/common/js/attch.js" charset="utf-8"></script>
<script type="text/javascript">
<!--
//< Sub Procedure and Function - GLOBAL 영역 >

//< Sub Procedure and Function - MAIN 영역 >
//==============================================================================
// DOM 준비시..
//------------------------------------------------------------------------------
$(document).ready(function()
{
    gfnInit(); // 초기화
    fnCtrlScr("READY"); // 화면 제어 : DOM준비

    var arrData = [
        { "attchId": "1", "orgFileName": "base.css", "fileSizeAmt": 1370, "sizeUnitCode": "Bytes", "attchHref": "/attchFile/develop/edit/2_1001/base.css" }
      , { "attchId": "2", "orgFileName": "logo.gif", "fileSizeAmt": 2.76, "sizeUnitCode": "KB"   , "attchHref": "/attchFile/develop/edit/2_1001/logo.gif" }
    ];
    //gfnBindAttchFileList($('[class="AttchContnr"]')); // 파일 목록 바인딩
    gfnBindAttchFileList($('[class="AttchContnr"]'), arrData); // 파일 목록 바인딩
    arrData = null;
});

// < Sub Procedure and Function - 주요 이벤트 영역 >
//==============================================================================
// 조회 클릭시..
//------------------------------------------------------------------------------
function fnClickInqr()
{
    txaCtts.value = "조회값"; alert(txaCtts.value);
    // 조회된 TEXTAREA 값을 EDIT 내용에 반영한다.
    //gfnBindEditValue("txaCtts", txaCtts.value); // EDIT 값 바인딩
    gfnBindEditValue("txaCtts", txaCtts.value, function() { alert("EDIT 내용 적용완료"); }); // EDIT 값 바인딩
}

//==============================================================================
// 확인 클릭시..
//------------------------------------------------------------------------------
function fnClickCnfm()
{
    alert(txaCtts.value);
    // 편집한 EDIT 내용을 TEXTAREA 에 반영한다.
    //gfnBindEditValue(); // EDIT 값 바인딩
    //gfnBindEditValue("txaCtts"); // EDIT 값 바인딩
    gfnBindEditValue(null, null, function() { alert("EDIT 편집값 바인딩 완료"); });
    alert(txaCtts.value);
}

// < Sub Procedure and Function - 비지니스 로직 호출 영역 >

// < Sub Procedure and Function - 그리드 영역 >

// < Sub Procedure and Function - 차트 영역 >

// < Sub Procedure and Function - 화면 링크 및 이동 >

// < Sub Procedure and Function - 기타 영역 >
//==============================================================================
// 화면 제어
//------------------------------------------------------------------------------
function fnCtrlScr(strClsfy)
{
    if ( "READY" == strClsfy ) // DOM준비
    {
        $(btnInqr).click(fnClickInqr); // 클릭
        $(btnCnfm).click(fnClickCnfm);

        // EDIT 를 초기화한다.
        //gfnBindEditValue("txaCtts"); // EDIT 값 바인딩
        //gfnBindEditValue("txaCtts", ""); // EDIT 값 바인딩
        gfnBindEditValue("txaCtts", "초기값", function() { alert("EDIT 내용 적용완료"); }); // EDIT 값 바인딩
    }
}

-->
</script>
<!-- // CSS 및 JavaScript 관련 -->

<!-- contents -->
<body>
    <div class="head">
        <h3>웹에디터</h3>
        <div>
            <p><em><span class="ir common"></span>처음</em> &gt; 개발도구 &gt; 템플릿</p>
            <ul>
                <li><a href="#" class="excel"><span class="ir common"></span>엑셀다운로드</a></li>
                <li><button type="button" class="print"><span class="ir common"></span>인쇄</button></li>
                <li><a href="#" class="help"><span class="ir common"></span>도움말</a></li>
                <li><a href="#" class="fav"><span class="ir common"></span>즐겨찾기추가</a></li>
            </ul>
        </div>
    </div>

    <div class="headSearch" id="divInqrCond">
        <fieldset>
            <span class="button smallGray"><button type="button" id="btnInqr">${requestScope["ITEM.inqr"]}<%-- 조회 --%></button></span>
        </fieldset>
    </div>

    <!-- 편집 //-->
    <div id="divEdit" class="yearInfo" style="margin-right: 20px">
        <table class="input01">
            <colgroup>
                <col width="70px" />
                <col />
            </colgroup>
            <tbody>
                <tr>
                    <th>내용</th>
                    <td style="padding-left: 0; padding-right: 0">
                        <!-- EDIT 바인딩용 TEXTAREA cf.) 높이 최소값은 250px 이며 그 이상 설정할 수 있다. //-->
                        <textarea id="txaCtts" style="height: 250px; visibility: hidden; width: 100%"></textarea>

                        <!-- 첨부 영역 //-->
                        <div class="AttchContnr" style="margin-top: 10px">
                            <div class="Thmnl"><img src="${pageContext.request.contextPath}/common/images/common/noimage.gif" /></div>
                            <div class="AttchList"><select class="AttchFile" size="4" onchange='javascript: gfnChgAttchOrgFileName();'></select>
                                <select class="AttchHref" style="display: none"></select><select class="OrgFileName" style="display: none"></select></div>
                            <div class="AttchBtn"><div class="Link">
                                    <a href="#" style="display: inline" onclick="javascript: gfnClickAttchPopupOpen();">${requestScope["ITEM.fileAttch"]}<%-- 파일 첨부 --%></a>
                                    <a href="#" style="display: inline" onclick="javascript: gfnClickAttchChcDelt();"  >${requestScope["ITEM.chcDelt"]}<%-- 선택 삭제 --%></a>
                                    <a href="#" style="display: inline" onclick='javascript: gfnClickAttchHtmlAdd();'  >${requestScope["ITEM.linkInsrt"]}<%-- 본문 삽입 --%></a>
                                    <a href="#" style="display: none"   onclick='javascript: gfnClickAttchDownload();' >${requestScope["ITEM.download"]}<%-- 다운로드 --%></a></div>
                                <div class="AttchCount"><span>${requestScope["ITEM.attchMaxCount"]}<%-- 첨부 횟수 제한 --%>: </span><span class="CrrntCount">0</span> / <span class="MaxCount">3</span></div>
                                <div class="AttchSize" ><span>${requestScope["ITEM.fileMaxSize"]}<%-- 파일 크기 제한 --%>: </span><span class="MaxSize">${requestScope["SYS_VAR.attchFileMaxSize"]}</span> <span>MB</span></div></div>
                            <div class="AttchSetValue">
                                <input type="hidden" class="VarId"        value="attchFileExtrrPath" /><!-- 첨부파일경로 시스템변수ID //-->
                                <input type="hidden" class="VarName"      value='${requestScope["SYS_VAR.attchFileExtrrPath"]}' /><!-- 첨부파일경로 시스템변수명 //-->
                                <input type="hidden" class="AddrNamePrfx" value="http://<%=request.getServerName()%>:<%=request.getServerPort()%>" /><!-- 주소명접두사 //-->
                                <input type="hidden" class="TargId"       value="txaCtts" /><!-- 본문 삽입 대상 ID //-->
                            </div>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

    <!-- 버튼 //-->
    <div class="buttonBox" style="margin-right: 20px">
        <div style="float: right">
            <span class="button green"><button type="button" id="btnCnfm">${requestScope["ITEM.cnfm"]}<%-- 확인 --%></button></span>
        </div>
    </div>
<!-- // contents -->

<%@ include file="../../epfse/system/tabFtr.jsp" %><%-- 탭 푸터 --%>