<%--
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 첨부
    - 최초작성일 : 2014-05-14
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
<link href="/common/jquery/css/jquery-ui.min.css" rel="stylesheet" type="text/css" /><!-- jQuery UI //-->
<link href="/common/css/attch.css" rel="stylesheet" type="text/css" />

<script src="/common/jquery/js/jquery.min.js"   ></script><!-- jQuery    //-->
<script src="/common/jquery/js/jquery-ui.min.js"></script><!-- jQuery UI //-->

<script src="/common/js/base.js"   charset="utf-8"></script><!-- 기본 //-->

<script type="text/javascript">
<!--
// < Sub Procedure and Function - GLOBAL 영역 >
Base["msgReqError" ] = '${requestScope["ITEM.msgReqError" ]}'; // 오류가 발생했습니다. 관리자에게 문의하십시오.
Base["msgNoAddr"   ] = '${requestScope["ITEM.msgNoAddr"   ]}'; // [개발오류] 화면주소명이 누락되었습니다.
Base["msgNoMenu"   ] = '${requestScope["ITEM.msgNoMenu"   ]}'; // [개발오류] 메뉴정보가 존재하지 않습니다.
Base["msgLoginNeed"] = '${requestScope["ITEM.msgLoginNeed"]}'; // 로그인이 필요합니다.

var g_blnAttchStart = false; // 첨부시작
var g_blnAttchEnd   = false; // 첨부종료

// < Sub Procedure and Function - MAIN 영역 >
//==============================================================================
// DOM 로드시..
//------------------------------------------------------------------------------
$(document).ready(function()
{
    fnCtrlScr("READY"); // 화면 제어 : DOM로드
    fnSetParam(); // 매개변수 설정

    if ( '${requestScope["MENU.authCode"]}' == Base.WRITE_AUTH ) // 쓰기 권한이 있는 경우..
    {
        if ( 0 >= $('[name="comParamScrAddrName"]').val().length ) return;
        if ( 0 >= $('[name="varId"]'              ).val().length ) return;
        if ( 0 >= $('[name="varName"]'            ).val().length ) return;

        frmAttch.style.visibility = "visible";
    }
});

//==============================================================================
// 매개변수 설정
//------------------------------------------------------------------------------
function fnSetParam()
{
    var obj = window.dialogArguments;

    if ( null != obj )
    {
        $('[name="comParamScrAddrName"]').val(gfnCoalesce(obj["comParamScrAddrName"]));
        $('[name="varId"]'              ).val(gfnCoalesce(obj["varId"]             ));
        $('[name="varName"]'            ).val(gfnCoalesce(obj["varName"]           ));

        $('[name="fileMaxSize"]').val(gfnCoalesce(obj["fileMaxSize"]));
    }

    obj = null;
}

//==============================================================================
// 윈도우 언로드시..
//------------------------------------------------------------------------------
$(window).unload(function()
{
    if ( g_blnAttchStart && !g_blnAttchEnd )
        // 메시지 표시 : 파일 첨부를 취소하였습니다.
        gfnDispMsg('${requestScope["ITEM.msgAttchCncl"]}');
});

// < Sub Procedure and Function - 주요 이벤트 영역 >
//==============================================================================
// 첨부파일 변경시..
//------------------------------------------------------------------------------
function fnChgAttchFile()
{
    if ( !fnVerif("CHGATTCHFILE") ) return; // 검증 : 첨부파일변경

    fnCtrlScr("BFORECHGATTCHFILE"); // 화면 제어 : 첨부파일변경전

    fnAttch(); // 첨부
}

// < Sub Procedure and Function - 비지니스 로직 호출 영역 >
//==============================================================================
// 첨부
//------------------------------------------------------------------------------
function fnAttch()
{
    frmAttch.action = "/system/saveInfoAttch.do"; // 정보 저장
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
    if ( "READY" == strClsfy ) // 준비
    {
        gfnInitPgbar(); // PROGRESSBAR 초기화
    } else
    if ( "BFORECHGATTCHFILE" == strClsfy ) // 첨부파일변경전
    {
        gfnDispPgbar(); // PROGRESSBAR 표시

        g_blnAttchStart = true; // 첨부시작

        txtFileAttch.value = $('[name="attchFile"]').val();
    } else
    if ( "AFTERCHGATTCHFILE" == strClsfy ) // 첨부파일변경후
    {
        gfnHidePgbar(); // PROGRESSBAR 숨김

        g_blnAttchEnd = true; // 첨부종료
    }
}

//==============================================================================
// 검증
//------------------------------------------------------------------------------
function fnVerif(strClsfy)
{
    if ( "CHGATTCHFILE" == strClsfy ) // 첨부파일변경
    {
        var MSG_CHC_ITEM = '${requestScope["ITEM.msgChcItem"]}'; // 해당 항목을 선택하십시오.

        var ATTCH_FILE = $('[name="attchFile"]').val(), LNGTH = ATTCH_FILE.length;

        if ( '${requestScope["MENU.authCode"]}' != Base.WRITE_AUTH ) // 쓰기 권한 검증
        {
            gfnDispMsg('${requestScope["ITEM.msgNoAuth"]}<%-- 권한이 없습니다. 관리자에게 문의하십시오. --%>');
            return false;
        }

        if ( 0 >= LNGTH )
        {
            // 메시지 표시 : 파일을 선택하십시오.
            gfnDispMsg('${requestScope["ITEM.msgChcItem"]}', btnFind.innerText);
            return false ; // 리턴 처리
        } else
        {
            var ERROR_STR  = "`&';^", LNGTH = ERROR_STR.length;
            var blnError = false;

            for ( var num = 0 ; num < LNGTH ; num++ )
            {
                if ( 0 <= ATTCH_FILE.indexOf(ERROR_STR.charAt(num)) ) { blnError = true; break; }
            }

            if ( blnError )
            {
                // 메시지 표시 : 일부 특수문자가 포함된 파일명은 첨부할 수 없습니다. 파일명을 변경하십시오.
                gfnDispMsg('${requestScope["ITEM.msgFileNameError"]}', ERROR_STR);
                return false ; // 리턴 처리
            }
        }
    }

    return true;
}

//==============================================================================
// 첨부 성공
//------------------------------------------------------------------------------
function fnSccssAttch(obj)
{
    fnCtrlScr("AFTERCHGATTCHFILE"); // 화면 제어 : 첨부파일변경후

    window.returnValue = obj;
    window.close();
}

//==============================================================================
// 첨부 오류
//------------------------------------------------------------------------------
function fnErrorAttch(numRsltNo)
{
    fnCtrlScr("AFTERCHGATTCHFILE"); // 화면 제어 : 첨부파일변경후

    if ( -1 == numRsltNo ) // 파일크기오류
        gfnDispMsg('${requestScope["ITEM.msgFileSizeError"]}<%-- 파일 크기 제한으로 첨부할 수 없습니다. 해당 파일의 크기를 확인하십시오. --%>'); // 메시지 표시
    else
    if ( -3 == numRsltNo ) // 디스크공간오류
        gfnDispMsg('${requestScope["ITEM.msgDiskSpaceError"]}<%-- 디스크의 여유공간이 부족하여 첨부할 수 없습니다. 관리자에게 문의하십시오. --%>'); // 메시지 표시
    else
    if ( -7 == numRsltNo ) // 폴더저장오류
        gfnDispMsg('${requestScope["ITEM.msgFoldrSaveError"]}<%-- 업로드할 경로를 찾을 수 없습니다. 관리자에게 문의하십시오. --%>'); // 메시지 표시
    else
    if ( -9 == numRsltNo ) // 파일저장오류
        gfnDispMsg('${requestScope["ITEM.msgFileSaveError"]}<%-- 파일을 업로드할 수 없습니다. 관리자에게 문의하십시오. --%>'); // 메시지 표시
    else
        gfnDispMsg('${requestScope["ITEM.msgAttchError"]}<%-- 파일을 첨부할 수 없습니다. 관리자에게 문의하십시오. --%>'); // 메시지 표시

    frmAttch.reset(); txtFileAttch.value = Base.EMPTYSTR;
    fnSetParam(); // 매개변수 설정
}
-->
</script>
<!-- // CSS 및 JavaScript 관련 -->
</head>

<body>
    <!-- Progress Bar 영역 //-->
    <div id="divCommonJspPgbar" style="display: none; text-align: center; padding-top: 22px">
        <img src="/common/images/common/progress_wh.gif" />
    </div>
 <%--
    <!-- Wrap start //-->
    <div id="Wrap">
        <!-- Container start //-->
        <div id="Container" style="background-color: white">
            <!-- 조회조건 //-->
            <div id="divInqrCond" style="padding-left: 10px; padding-top: 10px; width: 580px">
                <table class="InquiryBox">
                    <colgroup>
                        <col width="18%" />
                        <col width="" />
                        <col width="14%" />
                        <col width="1%" />
                    </colgroup>
                    <tbody>
                        <tr style="height: 31px">
                            <th><span class="IcoCheck">${requestScope["ITEM.fileAttch"]}<!-- 파일첨부 --></span></th>
                            <td><div class="FormLayout ReadOnly" style="background-color: #e6e6e6"><input type="text" id="txtFileAttch" readonly /></div></td>
                            <td align="right" class="NolineL">

                                <form id="frmAttch" enctype="multipart/form-data" method="post" target="ifrUpload" style="visibility: hidden">
                                    <input type="file" name="attchFile" style="border: none; cursor: hand; fonts-size: 11px; height: 20px; width: 100%" onchange="javascript: fnChgAttchFile();" />

                                    <input type="hidden" name="sccssFuncName" value="fnSccssAttch" /><!-- 성공함수명 //-->
                                    <input type="hidden" name="errorFuncName" value="fnErrorAttch" /><!-- 오류함수명 //-->

                                    <input type="hidden" name="comParamScrAddrName" /><!-- 화면주소명   //-->
                                    <input type="hidden" name="varId"               /><!-- 변수ID       //-->
                                    <input type="hidden" name="varName"             /><!-- 변수ID명     //-->

                                    <input type="hidden" name="fileMaxSize" /><!-- 파일최대크기 //-->
                                </form>
                          </td>
                            <td />
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <!-- Container end //-->
    </div>
    <!-- Wrap end //-->
  --%>



    <h1>${requestScope["ITEM.fileAttch"]}</h1>
    <div class="attachBody">
        <table summary="파일 다운로드를 위한 테이블 입니다">
        <caption>파일 다운로드</caption>
        <colgroup>
            <col width="60px" />
            <col width="*" />
        </colgroup>
        <tr>
            <th scope="row">${requestScope["ITEM.fileAttch"]}</th>
            <td>
                <form id="frmAttch" enctype="multipart/form-data" method="post" target="ifrUpload">
                    <span id="txtFileAttch" class="fileName"></span>
                    <span class="fileUpload">
                        <button type="button"><img src="/common/images/common/btnRegFile01.png" alt="파일선택" /></button>
                        <input  type="file" name="attchFile" class="upload fake" onchange="fnChgAttchFile();" />
                    </span>
                <!--
                    <input type="file" name="attchFile" onchange="fnChgAttchFile();" />
                 -->
                    <input type="hidden" name="sccssFuncName" value="fnSccssAttch" /><!-- 성공함수명 //-->
                    <input type="hidden" name="errorFuncName" value="fnErrorAttch" /><!-- 오류함수명 //-->

                    <input type="hidden" name="comParamScrAddrName" /><!-- 화면주소명   //-->
                    <input type="hidden" name="varId"               /><!-- 변수ID       //-->
                    <input type="hidden" name="varName"             /><!-- 변수ID명     //-->

                    <input type="hidden" name="fileMaxSize" /><!-- 파일최대크기 //-->
                </form>
                <iframe id="ifrUpload" name="ifrUpload" style="height: 0; width: 0"></iframe><!-- 업로드용 //-->
            </td>
        </tr>
        </table>

    </div>
    <div class="attachFooter">
        <span class="button gray"><button type="button" onclick="self.close();">${requestScope["ITEM.close"]}</button></span>
    </div>
</body>

</html>