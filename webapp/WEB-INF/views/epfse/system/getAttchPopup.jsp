<%--
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 첨부 가져오기
    - 최초작성일 : 2014-05-19
    - 작  성  자 : 유광식
    - 비      고 :
--------------------------------------------------------------------------------
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">

<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>${requestScope["ITEM.browserTitle"]}<%-- 브라우저제목 --%></title>

<!-- CSS 및 JavaScript 관련 -->
<link href="${pageContext.request.contextPath}/common/jquery/css/jquery-ui.min.css" rel="stylesheet" type="text/css" /><!-- jQuery UI //-->
<link href="${pageContext.request.contextPath}/common/css/attch.css" rel="stylesheet" type="text/css" />

<script src="${pageContext.request.contextPath}/common/jquery/js/jquery.min.js"   ></script><!-- jQuery    //-->
<script src="${pageContext.request.contextPath}/common/jquery/js/jquery-ui.min.js"></script><!-- jQuery UI //-->

<script src="${pageContext.request.contextPath}/common/js/base.js"   charset="utf-8"></script><!-- 기본 //-->

<script type="text/javascript">
<!--
// < Sub Procedure and Function - GLOBAL 영역 >
Base["msgReqError" ] = '${requestScope["ITEM.msgReqError" ]}'; // 오류가 발생했습니다. 관리자에게 문의하십시오.
Base["msgNoAddr"   ] = '${requestScope["ITEM.msgNoAddr"   ]}'; // [개발오류] 화면주소명이 누락되었습니다.
Base["msgNoMenu"   ] = '${requestScope["ITEM.msgNoMenu"   ]}'; // [개발오류] 메뉴정보가 존재하지 않습니다.
Base["msgLoginNeed"] = '${requestScope["ITEM.msgLoginNeed"]}'; // 로그인이 필요합니다.

// < Sub Procedure and Function - MAIN 영역 >
//==============================================================================
// DOM 로드시..
//------------------------------------------------------------------------------
$(document).ready(function()
{
    fnCtrlScr("READY"); // 화면 제어 : DOM준비
    fnSetParam(); // 매개변수 설정
});

//==============================================================================
// 매개변수 설정
//------------------------------------------------------------------------------
function fnSetParam()
{
    var obj = window.dialogArguments;

    if ( null != obj )
    {
        //   $(txtFileInfo).val(gfnCoalesce(obj["fileInfo"]));
        $('.txtFileInfo').text(gfnCoalesce(obj["fileInfo"]));

        $('[name="comParamScrAddrName"]').val(gfnCoalesce(obj["comParamScrAddrName"]));
        $('[name="rowId"]').val(gfnCoalesce(obj["attchId"]));

        fnGetFile(); // 파일 가져오기
    }

    obj = null;
}

// < Sub Procedure and Function - 주요 이벤트 영역 >
//==============================================================================
// 닫기 클릭시..
//------------------------------------------------------------------------------
function fnClickClose()
{
    window.close();
}

//==============================================================================
// 저장 클릭시..
//------------------------------------------------------------------------------
function fnClickSave()
{
    fnGetFile(); // 파일 가져오기
}

// < Sub Procedure and Function - 비지니스 로직 호출 영역 >
//==============================================================================
// 파일 가져오기
//------------------------------------------------------------------------------
function fnGetFile()
{
    frmAttch.action = "/system/getFileAttch.do"; // 파일 가져오기
    frmAttch.submit();
}

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
        $(btnClose).click(fnClickClose); // 클릭
        $(btnSave ).click(fnClickSave ); // 클릭
    }
}

//==============================================================================
// 첨부 오류
//------------------------------------------------------------------------------
function fnErrorAttch(numRsltNo)
{
    if ( -1 == numRsltNo ) // 첨부정보없음
        gfnDispMsg('${requestScope["ITEM.msgNoAttchInfo"]}<%-- 첨부정보가 존재하지 않습니다. 관리자에게 문의하십시오. --%>'); // 메시지 표시
    else
    if ( -3 == numRsltNo ) // 파일명오류
        gfnDispMsg('${requestScope["ITEM.msgFileNameError"]}<%-- 파일명을 가져올 수 없습니다. 관리자에게 문의하십시오. --%>'); // 메시지 표시
    else
        gfnDispMsg('${requestScope["ITEM.msgFileError"]}<%-- 파일을 가져올 수 없습니다. 관리자에게 문의하십시오. --%>'); // 메시지 표시
}
-->
</script>
<!-- // CSS 및 JavaScript 관련 -->
</head>

<body>
    <%--
    <!-- Wrap start //-->
    <div id="Wrap">
        <!-- Container start //-->
        <div id="Container" style="background-color: white">
            <!-- 조회조건 //-->
            <div id="divInqrCond" style="padding-left: 10px; padding-top: 10px; width: 410px">
                <table class="InquiryBox">
                    <colgroup>
                        <col width="22%" />
                        <col width="" />
                        <col width="1%" />
                    </colgroup>
                    <tbody>
                        <tr style="height: 31px">
                            <th><span class="IcoCheck">${requestScope["ITEM.download"]}<!-- 다운로드 --></span></th>
                            <td><div class="FormLayout" style="background-color: #e6e6e6"><input type="text" id="txtFileInfo" readonly /></div></td>
                            <td align="right" class="NolineL">
                                <form id="frmAttch" method="post" target="ifrDownload" style="visibility: hidden">
                                    <input type="hidden" name="sccssFuncName" value="" /><!-- 성공함수명 //-->
                                    <input type="hidden" name="errorFuncName" value="fnErrorAttch" /><!-- 오류함수명 //-->

                                    <input type="hidden" name="comParamScrAddrName" /><!-- 화면주소명 //-->
                                    <input type="hidden" name="rowId" /><!-- 행ID //-->
                                </form>
                                <iframe id="ifrDownload" name="ifrDownload" style="height: 0; width: 0"></iframe><!-- 다운로드용 //-->
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- 버튼 //-->
            <div class="BoardBtn" style="padding-left: 10px; padding-top: 10px; width: 410px">
                <span class="BtnStyle BoardType02 flt_rgt mg_lft5"><button type="button" id="btnClose">${requestScope["ITEM.close"]}<!--  닫기 --></button></span>
                <span class="BtnStyle BoardType01 flt_rgt"><button type="button" id="btnSave">${requestScope["ITEM.download"]}<!-- 다운로드 --></button></span>
            </div>



        </div>
        <!-- Container end //-->
    </div>
    <!-- Wrap end //-->
    --%>

    <!-- Progress Bar 영역 //-->
    <div id="divCommonJspPgbar" style="display: none; text-align: center; padding-top: 22px">
        <img src="${pageContext.request.contextPath}/common/images/common/progress_wh.gif" />
    </div>

    <h1>${requestScope["ITEM.download"]}</h1>
    <div class="attachBody">
        <table summary="파일 다운로드를 위한 테이블 입니다">
            <caption>파일 다운로드</caption>
            <colgroup>
                <col width="100px" />
                <col width="*" />
                <col width="100px" />
            </colgroup>
            <tr>
                <th scope="row">${requestScope["ITEM.download"]}</th>
                <td class="txtFileInfo"></td>
                <td class="buttonBox"><span class="button blue"><button type="button" id="btnSave">${requestScope["ITEM.download"]}</button></span></td>
            </tr>
        </table>
        <form id="frmAttch" method="post" target="ifrDownload" style="visibility: hidden">
            <input type="hidden" name="sccssFuncName" value="" /><!-- 성공함수명 //-->
            <input type="hidden" name="errorFuncName" value="fnErrorAttch" /><!-- 오류함수명 //-->

            <input type="hidden" name="comParamScrAddrName" /><!-- 화면주소명 //-->
            <input type="hidden" name="rowId" /><!-- 행ID //-->
        </form>
        <iframe id="ifrDownload" name="ifrDownload" style="height: 0; width: 0"></iframe><!-- 다운로드용 //-->
    </div>
    <div class="attachFooter">
        <span class="button gray"><button type="button" id="btnClose">${requestScope["ITEM.close"]}</button></span>
    </div>
</body>
</html>