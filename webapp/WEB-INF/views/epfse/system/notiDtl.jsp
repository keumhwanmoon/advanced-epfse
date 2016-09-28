<%--
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 공지사항 상세
    - 최초작성일 : 2014-09-25
    - 작  성  자 : 이승윤
    - 비      고 :
--------------------------------------------------------------------------------
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="../../epfse/system/tabHdr.jsp" %><%-- 헤더 관련 --%>
<!-- CSS 및 JavaScript 관련 -->
<script type="text/javascript" src="${pageContext.request.contextPath}/common/js/attch.js" charset="utf-8"></script><!-- 첨부 jQuery //-->
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
});

//==============================================================================
// 매개변수 설정
//------------------------------------------------------------------------------
function fnSetParam(strRowId)
{
    if ( 0 < strRowId.length )
    {
        $('#divInqrCond [name="inqrCountUpdtYn"]').val(gfnCoalesce(gfnGetScrParam("inqrCountUpdtYn"), Base.YES));
        $('#divInqrCond [name="rowId"]').val(strRowId);

        fnInqr(); // 조회
    }
}

// < Sub Procedure and Function - 주요 이벤트 영역 >
//==============================================================================
// 수정 클릭시..
//------------------------------------------------------------------------------
function fnClickUpdt()
{
    if ( !fnVerif("UPDT") ) return; // 검증 : 수정

    fnUpdt(); // 수정
}

//==============================================================================
// 삭제 클릭시..
//------------------------------------------------------------------------------
function fnClickDelt()
{
    if ( !gfnCnfmMsg('${requestScope["ITEM.msgDeltCnfm"]}') ) return; // 삭제하시겠습니까?

    if ( !fnVerif("DELT") ) return; // 검증 : 삭제

    fnDelt(); // 삭제
}

//==============================================================================
// 목록 클릭시..
//------------------------------------------------------------------------------
function fnClickList()
{
    fnList(); // 목록
}

//==============================================================================
// 이전/다음 글 클릭시..
//------------------------------------------------------------------------------
function fnClickPreNext(strPreRowId)
{
    fnPreNext(strPreRowId); // 이전/다음 글
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
             {
                 gfnDispMsg('${requestScope["ITEM.msgNoData"]}<%-- 데이터가 존재하지 않습니다. --%>');
             } else
             {
                 // JSON 객체 텍스트 속성 바인딩
                 gfnBindJsonObjTextAttr(objData[Base.RSLT_INFO], "divDtl", "tdoDtl_", fnBindDtl);

                 if ( '${requestScope["MENU.authCode"]}' == Base.WRITE_AUTH ) // 쓰기 권한이 있는 경우..
                 {
                     btnUpdt.parentElement.style.visibility = "visible";
                     btnDelt.parentElement.style.visibility = "visible";
                 }
             }

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
// 삭제
//------------------------------------------------------------------------------
function fnDelt()
{
    gfnReq // 요청
    (
        // URL
        "/system/deltNotiInfo.do" // 정보 삭제
        // 데이터
      , gfnGetFormData("divInqrCond")
        // 성공콜백함수
      , function(objData)
        {
            var RSLT_VALUE = objData[Base.RSLT_NO];

            if ( Base.OK != RSLT_VALUE )
            {
                if ( -1 == RSLT_VALUE )
                    gfnDispMsg('${requestScope["ITEM.msgNoEditAuth"]}<%-- 로그인사용자가 등록한 게시물이거나 관리자인 경우 삭제할 수 있습니다. --%>');
                else
                if ( Base.NO_DATA == RSLT_VALUE )
                    gfnDispMsg('${requestScope["ITEM.msgDeltNoData"]}<%-- 삭제된 데이터가 존재하지 않습니다. --%>');
                else
                    gfnDispMsg('${requestScope["ITEM.msgRsltError"]}<%-- 요청결과 오류가 발생했습니다. 관리자에게 문의하십시오. --%>');
            } else
            {
                gfnDispMsg('${requestScope["ITEM.msgDeltOk"]}<%-- 삭제가 완료되었습니다. --%>');

                $('#divInqrCond [name="rowId"]').val(Base.EMPTYSTR);

                fnList(); // 목록
            }
        }
    );
}

// < Sub Procedure and Function - 그리드 영역 >

// < Sub Procedure and Function - 화면 링크 및 이동 >
//==============================================================================
// 수정
//------------------------------------------------------------------------------
function fnUpdt()
{
    var ROW_ID = $('#divInqrCond [name="rowId"]').val();

    gfnSetScrParam("inqrCountUpdtYn", Base.NO); // 조회수

    // 페이지 이동
    gfnMovePage("/system/notiEdit.do?&rowId=" + encodeURIComponent(ROW_ID)); // 편집
}

//==============================================================================
// 목록
//------------------------------------------------------------------------------
function fnList()
{
    // 페이지 이동
    gfnMovePage("/system/notiList.do");
}

//==============================================================================
// 이전/다음 글
//------------------------------------------------------------------------------
function fnPreNext(strPreRowId)
{
    // 페이지 이동
    gfnMovePage("/system/notiDtl.do?rowId=" + encodeURIComponent(strPreRowId)); // 상세
}

// < Sub Procedure and Function - 툴바 영역 >

// < Sub Procedure and Function - 기타 영역 >
//==============================================================================
// 화면 제어
//------------------------------------------------------------------------------
function fnCtrlScr(strClsfy)
{
    if ( "READY" == strClsfy ) // DOM준비
    {
        $(btnUpdt).click(fnClickUpdt); // 클릭
        $(btnDelt).click(fnClickDelt);
        $(btnList).click(fnClickList);
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
    if ( "DELT" == strClsfy || "UPDT" == strClsfy ) // 삭제 // 수정 // 답변
    {
        if ( '${requestScope["MENU.authCode"]}' != Base.WRITE_AUTH ) // 쓰기 권한 검증
        {
            gfnDispMsg('${requestScope["ITEM.msgNoAuth"]}<%-- 권한이 없습니다. 관리자에게 문의하십시오. --%>');
            return false;
        }
    }

    return true; // 리턴 처리
}

//==============================================================================
// 상세 바인딩
//------------------------------------------------------------------------------
function fnBindDtl(objRsltInfo, strPrfx)
{
    if ( null == objRsltInfo ) return;

    // 이전/다음 글을 설정한다.
    if ( !gfnIsEmpty(objRsltInfo["preInfo"]) )
    {
        $(".relativeLink > li:first").html(""); // 이전 글 화면정리
        $(".relativeLink > li:first").html('<span>이전글</span>'
                                         + '<a href="#" onclick="fnClickPreNext(\'' + objRsltInfo["preRowId"] + '\');" >' + objRsltInfo["preInfo"] + '</a>');
    }
    if ( !gfnIsEmpty(objRsltInfo["nextInfo"]) )
    {
        $(".relativeLink > li:last" ).html(""); // 다음 글 화면정리
        $(".relativeLink > li:last" ).html('<span>다음글</span>'
                                         + '<a href="#" onclick="fnClickPreNext(\'' + objRsltInfo["nextRowId"] + '\');" >' + objRsltInfo["nextInfo"] + '</a>');
    }

    // 포맷을 적용한다.
    eval(strPrfx + "rgstDtm").innerText = gfnFormt(eval(strPrfx + "rgstDtm").innerText, Base.DATE);

    // 게시물내용을 설정한다.
    if ( !gfnIsEmpty(objRsltInfo["ctts"]) ) tdoDtl_ctts.innerHTML = objRsltInfo["ctts"];
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
        <input type="hidden" name="inqrCountUpdtYn" />
        <!-- 조회수수정여부 //-->
        <input type="hidden" name="rowId" />
        <!-- 행ID //-->
    </div>

    <!-- 상세 //-->
    <div class="headSearch">
        <p>※ 에코시안에서 전해드리는 공지 게시판 입니다.</p>
    </div>

    <div id="divDtl" class="tableWrap">
        <table class="boardView01" summary="게시물 본문 입니다">
            <caption>게시물 본문</caption>
            <colgroup>
                <col width="*" />
                <col width="140px" />
                <col width="100px" />
            </colgroup>
            <thead>
                <tr>
                    <th scope="col">제목 : <span id="tdoDtl_titleName"></span></th>
                    <td>작성일 : <span id="tdoDtl_rgstDtm"></span></td>
                    <td>조회수 : <span id="tdoDtl_inqrCount"></span></td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td colspan="3" class="content">
                        <div id="tdoDtl_ctts" class="content">
                        </div>
                        <!-- 첨부 영역 //-->
                        <div class="AttchContnr">
                            <div class="Thmnl">
                                <img src="${pageContext.request.contextPath}/common/images/common/noimage.gif" />
                            </div>
                            <div class="AttchList">
                                <select class="AttchFile"   size="4" onchange='javascript: gfnChgAttchOrgFileName();'></select>
                                <select class="AttchHref"   style="display: none"></select>
                                <select class="OrgFileName" style="display: none"></select>
                            </div>
                            <div class="AttchBtn">
                                <div class="Link">
                                    <button type="button" class="fnDownload" onclick="gfnClickAttchDownload();">${requestScope["ITEM.download"]}<%-- 다운로드 --%></button>
                                </div>
                                <div class="AttchCount">
                                    <span>${requestScope["ITEM.attchMaxCount"]}<%-- 첨부 횟수 제한 --%>:</span>
                                    <span class="CrrntCount">0</span> / <span class="MaxCount">3</span>
                                </div>
                                <div class="AttchSize">
                                    <span>${requestScope["ITEM.fileMaxSize"]}<%-- 파일 크기 제한 --%>:</span>
                                    <span class="MaxSize">${requestScope["SYS_VAR.attchFileMaxSize"]}</span>
                                    <span>MB</span>
                                </div>
                            </div>
                            <div class="AttchSetValue">
                                <input type="hidden" class="VarId" />
                                <!-- 첨부파일경로 시스템변수ID //-->
                                <input type="hidden" class="VarName" />
                                <!-- 첨부파일경로 시스템변수명 //-->
                                <input type="hidden" class="AddrNamePrfx" />
                                <!-- 주소명접두사 //-->
                                <input type="hidden" class="TargId" />
                                <!-- 본문 삽입 대상 ID //-->
                            </div>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

    <div class="buttonBox right">
        <span class="aLeft">
            <span class="button gray"><button type="button" id="btnUpdt">수정</button></span>
            <span class="button gray"><button type="button" id="btnDelt">삭제</button></span>
        </span>
        <span class="button white"><button type="button" id="btnList">목록</button></span>
    </div>

    <ul class="relativeLink">
        <li>
            <span>이전글</span>
            <p>등록된 게시물이 없습니다.</p>
        </li>
        <li>
            <span>다음글</span>
            <p>등록된 게시물이 없습니다.</p>
        </li>
    </ul>
<!-- Contents end //-->
<%@ include file="../../epfse/system/tabFtr.jsp" %><%-- 탭 푸터 --%>