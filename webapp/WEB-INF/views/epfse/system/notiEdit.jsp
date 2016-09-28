<%--
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 공지사항 편집
    - 최초작성일 : 2014-09-25
    - 작  성  자 : 이승윤
    - 비      고 :
--------------------------------------------------------------------------------
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="../../epfse/system/tabHdr.jsp" %><%-- 헤더 관련 --%>
<!-- CSS 및 JavaScript 관련 -->
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
    fnBindCombo(); // 콤보 바인딩

    fnSetParam('${param["rowId"]}'); // 매개변수 설정

    if ( '${requestScope["MENU.authCode"]}' == Base.WRITE_AUTH ) // 쓰기 권한이 있는 경우..
        btnSave.parentElement.style.visibility = "visible";
});

//==============================================================================
// 매개변수 설정
//------------------------------------------------------------------------------
function fnSetParam(strRowId)
{
    if ( 0 < strRowId.length ) // 수정인 경우..
    {
        $('#divInqrCond [name="rowId"]').val(strRowId);

        fnInqr(); // 조회
    }
}

// < Sub Procedure and Function - 주요 이벤트 영역 >
//==============================================================================
// 취소 클릭시..
//------------------------------------------------------------------------------
function fnClickCncl()
{
    fnCncl(); // 취소
}

//==============================================================================
// 저장 클릭시..
//------------------------------------------------------------------------------
function fnClickSave()
{
    if ( !fnVerif("SAVE") ) return; // 검증 : 저장

    fnCtrlScr("BFORESAVE"); // 화면 제어 : 저장전

    fnSave(); // 저장
}

// < Sub Procedure and Function - 비지니스 로직 호출 영역 >
//==============================================================================
// 조회
//------------------------------------------------------------------------------
function fnInqr()
{
    gfnReq // 요청
    (
        // URL
        "/system/getNotiInfo.do" // 정보 조회
        // 데이터
      , gfnGetFormData("divInqrCond")
        // 성공콜백함수
      , function(objData)
        {
            if ( null == objData[Base.RSLT_INFO] )
                gfnDispMsg('${requestScope["ITEM.msgNoData"]}<%-- 데이터가 존재하지 않습니다. --%>');
            else
                // JSON 객체 항목 바인딩
                gfnBindJsonObjItem(objData[Base.RSLT_INFO], "divEdit", fnBindEdit);

            if ( null != objData[Base.RSLT_INFO] ) fnInqrAttch(); // 첨부 조회
        }
    );
}

//==============================================================================
// 첨부 조회
//------------------------------------------------------------------------------
function fnInqrAttch()
{
    gfnReq // 요청
    (
        // URL
        "/data/getNotiAttchList.do" // 목록 조회
        // 데이터
      , gfnGetFormData("divInqrCond")
        // 성공콜백함수
      , function(objData)
        {
            if ( null != objData[Base.RSLT_LIST] )
                // 파일 목록 바인딩
                gfnBindAttchFileList($('[class="AttchContnr"]'), objData[Base.RSLT_LIST]);
        }
    );
}

//==============================================================================
// 저장
//------------------------------------------------------------------------------
function fnSave()
{
    var ROW_ID_LIST = gfnGetAttchIdList($('[class="AttchContnr"]')).join("', '");

    gfnReq // 요청
    (
        // URL
        "/system/saveNotiInfo.do" // 정보 저장
        // 데이터
      , gfnGetFormData("divInqrCond") + Base.AND + gfnGetFormData("divEdit")
      + Base.AND + "rowIdList" + Base.EQUAL + ( 0 < ROW_ID_LIST.length ? "'" + ROW_ID_LIST + "'" : Base.EMPTYSTR )
        // 성공콜백함수
      , function(objData)
        {
            var RSLT_VAL = objData[Base.RSLT_NO];

            if ( Base.OK != RSLT_VAL )
            {
                if ( -1 == RSLT_VAL )
                    gfnDispMsg('${requestScope["ITEM.msgNoEditAuth"]}<%-- 로그인사용자가 등록한 게시물이거나 관리자인 경우 수정할 수 있습니다. --%>');
                else
                if ( Base.NO_DATA == RSLT_VAL )
                    gfnDispMsg('${requestScope["ITEM.msgSaveNoData"]}<%-- 저장된 데이터가 존재하지 않습니다. --%>');
                else
                if ( Base.DATA_DUP == RSLT_VAL )
                    gfnDispMsg('${requestScope["ITEM.msgRgstData"]}<%-- 이미 등록된 데이터입니다. 다시 확인하십시오. --%>');
                else
                    gfnDispMsg('${requestScope["ITEM.msgRsltError"]}<%-- 요청결과 오류가 발생했습니다. 관리자에게 문의하십시오. --%>');
            } else
            {
                gfnDispMsg('${requestScope["ITEM.msgSaveOk"]}<%-- 저장이 완료되었습니다. --%>');

                if ( null != objData[Base.RSLT_INFO] && null != objData[Base.RSLT_INFO]["rowId"] )
                {
                    $('#divInqrCond [name="rowId"]').val(objData[Base.RSLT_INFO]["rowId"]);

                    fnCncl();
                }
            }
        }
    );
}


// < Sub Procedure and Function - 그리드 영역 >

// < Sub Procedure and Function - 차트 영역 >

// < Sub Procedure and Function - 화면 링크 및 이동 >
//==============================================================================
// 취소
//------------------------------------------------------------------------------
function fnCncl()
{
    var ROW_ID = $('#divInqrCond [name="rowId"]').val();

    if ( gfnIsEmpty(ROW_ID) )
    {
        // 페이지 이동
        gfnMovePage("/system/notiList.do"); // 목록
    } else
    {
        gfnSetScrParam("inqrCountUpdtYn", Base.NO); // 조회수

        // 페이지 이동
        gfnMovePage("/system/notiDtl.do?rowId=" + encodeURIComponent(ROW_ID)); // 상세
    }
}

// < Sub Procedure and Function - 기타 영역 >
//==============================================================================
// 화면 제어
//------------------------------------------------------------------------------
function fnCtrlScr(strClsfy)
{
    if ( "READY" == strClsfy ) // DOM준비
    {
        $(btnCncl).click(fnClickCncl); // 클릭
        $(btnSave).click(fnClickSave);

        var ROW_ID = '${param["rowId"]}';

        if ( 0 >= ROW_ID.length )
            // EDIT 를 초기화한다.
            gfnBindEditValue("txaNotiCtts"); // EDIT 값 바인딩
    } else
    if ( "BFORESAVE" == strClsfy ) // 저장전
    {
        // 편집한 EDIT 내용을 TEXTAREA 에 반영한다.
        gfnBindEditValue(); // EDIT 값 바인딩
    }
}

//===============================================================================
// 콤보 바인딩
//-------------------------------------------------------------------------------
function fnBindCombo()
{
}

//===============================================================================
// 검증
//-------------------------------------------------------------------------------
function fnVerif(strClsfy)
{
    if ( "SAVE" == strClsfy ) // 저장
    {
        var MSG_INPUT_ITEM = '${requestScope["ITEM.msgInputItem"]}'; // 해당 항목을 입력하십시오.

        if ( '${requestScope["MENU.authCode"]}' != Base.WRITE_AUTH ) // 쓰기 권한 검증
        {
            gfnDispMsg('${requestScope["ITEM.msgNoAuth"]}<%-- 권한이 없습니다. 관리자에게 문의하십시오. --%>');
            return false;
        }

        // 입력여부 검증
        if ( !gfnVerifInputYn(thoTitleName.innerText, "txtTitleName", MSG_INPUT_ITEM) ) return false; // 제목명
    }

    return true; // 리턴 처리
}

//==============================================================================
// 편집 바인딩
//------------------------------------------------------------------------------
function fnBindEdit(objRsltInfo)
{
    if ( null == objRsltInfo ) return;

    var ROW_ID = $('#divInqrCond [name="rowId"]').val();

    if ( 0 < ROW_ID.length )
    {
        // 조회된 TEXTAREA 값을 EDIT 내용에 반영한다.
        gfnBindEditValue("txaNotiCtts", txaNotiCtts.value); // EDIT 값 바인딩
    }
}

-->
</script>
<!-- // CSS 및 JavaScript 관련 -->

<!-- contents -->
<body>
    <div class="head">
        <h3>공지사항</h3>
        <div>
            <p><em><span class="ir common"></span>처음</em> &gt; 시스템관리 &gt; 게시판</p>
            <ul>
                <li><a href="#" class="excel"><span class="ir common"></span>엑셀다운로드</a></li>
                <li><button type="button" class="print"><span class="ir common"></span>인쇄</button></li>
                <li><a href="#" class="help"><span class="ir common"></span>도움말</a></li>
                <li><a href="#" class="fav"><span class="ir common"></span>즐겨찾기추가</a></li>
            </ul>
        </div>
    </div>

    <div id="divInqrCond" style="display: none">
        <input type="hidden" name="inqrCountUpdtYn" value="N" /><!-- 조회수수정여부 //-->
        <input type="hidden" name="rowId" /><!-- 행ID //-->
    </div>

    <div class="headSearch">
        <p>※ 에코시안에서 전해드리는 공지 게시판 입니다.</p>
    </div>

    <!-- 편집 //-->
    <div id="divEdit" class="tableWrap">
        <table class="boardInput01">
            <caption>게시물 입력</caption>
            <colgroup>
                <col width="75px" />
                <col width="*" />
            </colgroup>
            <thead>
                <tr>
                    <th id="thoTitleName" scope="row">제목 :</th>
                    <td>
                        <input type="text" id="txtTitleName" name="titleName" class="inputText subject" />
                    </td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td colspan="2" class="content">
                        <textarea id="txaNotiCtts" name="ctts" cols="100" rows="10" class="inputText"></textarea>

                        <!-- 첨부 영역 //-->
                        <div class="AttchContnr">
                            <div class="Thmnl"><img src="${pageContext.request.contextPath}/common/images/common/noimage.gif" /></div>
                            <div class="AttchList"><select class="AttchFile" size="4" onchange='javascript: gfnChgAttchOrgFileName();'></select>
                                <select class="AttchHref" style="display: none"></select><select class="OrgFileName" style="display: none"></select></div>
                            <div class="AttchBtn">
                                <div class="Link">
                                    <button type="button" class="fnAttach"   onclick="gfnClickAttchPopupOpen();">${requestScope["ITEM.fileAttch"]}<%-- 파일 첨부 --%></button>
                                    <button type="button" class="fnRemove"   onclick="gfnClickAttchChcDelt();"  >${requestScope["ITEM.chcDelt"]}<%-- 선택 삭제 --%></button>
                                    <button type="button" class="fnAppend"   onclick="gfnClickAttchHtmlAdd();"  >${requestScope["ITEM.linkInsrt"]}<%-- 본문 삽입 --%></button>
                                    <button type="button" class="fnDownload" onclick="gfnClickAttchDownload();" >${requestScope["ITEM.download"]}<%-- 다운로드 --%></button>
                                </div>
                                <div class="AttchCount"><span>${requestScope["ITEM.attchMaxCount"]}<%-- 첨부 횟수 제한 --%>: </span><span class="CrrntCount">0</span> / <span class="MaxCount">3</span></div>
                                <div class="AttchSize"><span>${requestScope["ITEM.fileMaxSize"]}<%-- 파일 크기 제한 --%>: </span><span class="MaxSize">${requestScope["SYS_VAR.attchFileMaxSize"]}</span> <span>MB</span></div></div>
                            <div class="AttchSetValue">
                                <input type="hidden" class="VarId"   value="attchFileExtrrPath" /><!-- 첨부파일경로 시스템변수ID //-->
                                <input type="hidden" class="VarName" value='${requestScope["SYS_VAR.attchFileExtrrPath"]}' /><!-- 첨부파일경로 시스템변수명 //-->
                                <input type="hidden" class="AddrNamePrfx" value="http://<%=request.getServerName()%>:<%=request.getServerPort()%>" /><!-- 주소명접두사 //-->
                                <input type="hidden" class="TargId"  value="txaCtts" /><!-- 본문 삽입 대상 ID //-->
                            </div>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

    <!-- 버튼 //-->
    <div class="buttonBox right">
        <span class="button green"><button type="button" id="btnSave">저장</button></span>
        <span class="button gray" ><button type="button" id="btnCncl">취소</button></span>
    </div>
<!-- Contents end //-->
<%@ include file="../../epfse/system/tabFtr.jsp" %><%-- 탭 푸터 --%>