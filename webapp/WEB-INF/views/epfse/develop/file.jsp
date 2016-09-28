<%--
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 파일
    - 최초작성일 : 2014-05-19
    - 작  성  자 : 유광식
    - 비      고 :
--------------------------------------------------------------------------------
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="../../epfse/system/tabHdr.jsp" %><%-- 헤더 관련 --%>
<!-- CSS 및 JavaScript 관련 -->
<link href="${pageContext.request.contextPath}/common/css/attch.css" rel="stylesheet" type="text/css" />

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
        { "attchId": "1_1000", "orgFileName": "base.css", "fileSizeAmt": 1370, "sizeUnitCode": "Bytes", "attchHref": "/attchFile/develop/edit/1_1000/base.css" }
      , { "attchId": "2_1001", "orgFileName": "logo.gif", "fileSizeAmt": 2.76, "sizeUnitCode": "KB"   , "attchHref": "/attchFile/develop/edit/2_1001/logo.gif" }
    ];
    //gfnBindAttchFileList($('[class="AttchContnr"]')); // 파일 목록 바인딩
    gfnBindAttchFileList($('[class="AttchContnr"]').eq(0), arrData); // 파일 목록 바인딩
    gfnBindAttchFileList($('[class="AttchContnr"]').eq(1), arrData); // 파일 목록 바인딩
    arrData = null;
});

// < Sub Procedure and Function - 주요 이벤트 영역 >
//==============================================================================
// 확인 클릭시..
//------------------------------------------------------------------------------
function fnClickCnfm()
{
    alert(gfnGetAttchIdList($('[class="AttchContnr"]').eq(0)) + "\n" + gfnGetAttchIdList($('[class="AttchContnr"]').eq(1)));
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
        $(btnCnfm).click(fnClickCnfm); // 클릭
    }
}

-->
</script>
<!-- // CSS 및 JavaScript 관련 -->

<!-- contents -->
<body>
    <div class="head">
        <h3>파일 업/다운로드</h3>
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

    <!-- 편집 //-->
    <div id="divEdit" class="yearInfo" style="margin-right: 20px">
        <table class="input01">
            <caption>편집</caption>
            <colgroup>
                <col width="70px" />
                <col />
            </colgroup>
            <tbody>
                <tr>
                    <th>첨부</th>
                    <td style="padding-left: 0">
                        <!-- 첨부 영역 //-->
                        <div class="AttchContnr">
                            <div class="Thmnl"><img src="${pageContext.request.contextPath}/common/images/common/noimage.gif" /></div>
                            <div class="AttchList"><select class="AttchFile" size="4" onchange='javascript: gfnChgAttchOrgFileName();'></select>
                                <select class="AttchHref" style="display: none"></select><select class="OrgFileName" style="display: none"></select></div>
                            <div class="AttchBtn"><div class="Link">
                                    <button type="button" class="fnAttach"   style="display: inline;" onclick="gfnClickAttchPopupOpen();">${requestScope["ITEM.fileAttch"]}<%-- 파일 첨부 --%></button>
                                    <button type="button" class="fnRemove"   style="display: inline;" onclick="gfnClickAttchChcDelt();"  >${requestScope["ITEM.chcDelt"]}<%-- 선택 삭제 --%></button>
                                    <button type="button" class="fnAppend"   style="display: none;"   onclick="gfnClickAttchHtmlAdd();"  >${requestScope["ITEM.linkInsrt"]}<%-- 본문 삽입 --%></button>
                                    <button type="button" class="fnDownload" style="display: inline;" onclick="gfnClickAttchDownload();" >${requestScope["ITEM.download"]}<%-- 다운로드 --%></button></div>
                                <div class="AttchCount"><span>${requestScope["ITEM.attchMaxCount"]}<%-- 첨부 횟수 제한 --%>: </span><span class="CrrntCount">0</span> / <span class="MaxCount">3</span></div>
                                <div class="AttchSize"><span>${requestScope["ITEM.fileMaxSize"]}<%-- 파일 크기 제한 --%>: </span><span class="MaxSize">${requestScope["SYS_VAR.attchFileMaxSize"]}</span> <span>MB</span></div></div>
                            <div class="AttchSetValue">
                                <input type="hidden" class="VarId"   value="attchFileIntrrPath" /><!-- 첨부파일경로 시스템변수ID //-->
                                <input type="hidden" class="VarName" value='${requestScope["SYS_VAR.attchFileIntrrPath"]}' /><!-- 첨부파일경로 시스템변수명 //-->
                                <input type="hidden" class="AddrNamePrfx" /><!-- 주소명접두사 //-->
                                <input type="hidden" class="TargId"       /><!-- 본문 삽입 대상 ID //-->
                            </div>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

    <!-- 상세 //-->
    <div id="divDtl" class="yearInfo" style="margin-right: 20px">
        <table class="input01">
            <caption>상세</caption>
            <colgroup>
                <col width="70px" />
                <col />
            </colgroup>
            <tbody>
                <tr>
                    <th>첨부</th>
                    <td style="padding-left: 0">
                        <!-- 첨부 영역 //-->
                        <div class="AttchContnr">
                            <div class="Thmnl"><img src="${pageContext.request.contextPath}/common/images/common/noimage.gif" /></div>
                            <div class="AttchList"><select class="AttchFile" size="4" onchange='javascript: gfnChgAttchOrgFileName();'></select>
                                <select class="AttchHref" style="display: none"></select><select class="OrgFileName" style="display: none"></select></div>
                            <div class="AttchBtn"><div class="Link">
                                    <button type="button" class="fnAttach"   style="display: none;"   onclick="gfnClickAttchPopupOpen();">${requestScope["ITEM.fileAttch"]}<%-- 파일 첨부 --%></button>
                                    <button type="button" class="fnRemove"   style="display: none;"   onclick="gfnClickAttchChcDelt();"  >${requestScope["ITEM.chcDelt"]}<%-- 선택 삭제 --%></button>
                                    <button type="button" class="fnAppend"   style="display: none;"   onclick="gfnClickAttchHtmlAdd();"  >${requestScope["ITEM.linkInsrt"]}<%-- 본문 삽입 --%></button>
                                    <button type="button" class="fnDownload" style="display: inline;" onclick="gfnClickAttchDownload();" >${requestScope["ITEM.download"]}<%-- 다운로드 --%></button></div>
                                <div class="AttchCount"><span>${requestScope["ITEM.attchMaxCount"]}<%-- 첨부 횟수 제한 --%>: </span><span class="CrrntCount">0</span> / <span class="MaxCount">3</span></div>
                                <div class="AttchSize" ><span>${requestScope["ITEM.fileMaxSize"]}<%-- 파일 크기 제한 --%>: </span><span class="MaxSize">${requestScope["SYS_VAR.attchFileMaxSize"]}</span> <span>MB</span></div></div>
                            <div class="AttchSetValue">
                                <input type="hidden" class="VarId"        /><!-- 첨부파일경로 시스템변수ID //-->
                                <input type="hidden" class="VarName"      /><!-- 첨부파일경로 시스템변수명 //-->
                                <input type="hidden" class="AddrNamePrfx" /><!-- 주소명접두사 //-->
                                <input type="hidden" class="TargId"       /><!-- 본문 삽입 대상 ID //-->
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