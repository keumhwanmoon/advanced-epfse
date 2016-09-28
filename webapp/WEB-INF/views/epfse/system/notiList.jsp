<%--
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 공지사항 목록
    - 최초작성일 : 2014-09-25
    - 작  성  자 : 이승윤
    - 비      고 :
--------------------------------------------------------------------------------
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="../../epfse/system/tabHdr.jsp" %><%-- 헤더 관련 --%>
<!-- CSS 및 JavaScript 관련 -->
<script src="${pageContext.request.contextPath}/common/js/table.js" charset="utf-8"></script><!-- 테이블 jQuery //-->

<script type="text/javascript">
<!--
//< Sub Procedure and Function - GLOBAL 영역 >
var g_objTable = // 테이블
    {
        "tableId": "divList" // 테이블 DIV 태그 ID
      , "pageId": "divPage" // 페이지 DIV 태그 ID
      , "colId": // 바인딩 레코드 VO변수명
            [ "bltnNo", "titleName", "rgstDtm", "inqrCount", "rowId" ]
      , "colStyle": // 열스타일
            [ null, "text-align: left", null, null, "display: none" ]
      , "colFormt": // 열포맷
            [ null, fnSetTitle, gfnFormtTableDtm, null, null ]
      , "alignLeft":
            [ false, false, false, false, false ] // 좌측정렬여부
        // 이벤트관련
      , "onClickPage": fnInqr // 페이지 클릭시..
      , "onClickRow": function(objJsonRow, numRowIndex) // 행 클릭시..
            {
                fnDtl(objJsonRow["rowId"]); // 상세
            }
    };

//< Sub Procedure and Function - MAIN 영역 >
//==============================================================================
// DOM 준비시..
//------------------------------------------------------------------------------
$(document).ready(function()
{
    gfnInit(); // 초기화
    fnCtrlScr("READY"); // 화면 제어 : DOM준비
    fnBindCombo(); // 콤보 바인딩

    btnInqr.click(); // 조회

    if ( '${requestScope["MENU.authCode"]}' == Base.WRITE_AUTH ) // 쓰기 권한이 있는 경우..
    {
        btnRgst.parentElement.style.visibility = "visible";
    }
});

// < Sub Procedure and Function - 주요 이벤트 영역 >
//==============================================================================
// 조회 클릭시..
//------------------------------------------------------------------------------
function fnClickInqr()
{
    if ( !fnVerif("INQR") ) return; // 검증 : 조회

    fnCtrlScr("BFOREINQR"); // 화면 제어 : 조회전

    fnInqr(); // 조회
}

//==============================================================================
//	등록 클릭시..
//------------------------------------------------------------------------------
function fnClickRgst()
{
    if ( !fnVerif("RGST") ) return; // 검증 : 등록

    fnRgst(); // 등록
}

// < Sub Procedure and Function - 비지니스 로직 호출 영역 >
//==============================================================================
// 조회
//------------------------------------------------------------------------------
function fnInqr()
{
    gfnReq( // 요청
        // URL
        "/system/getNotiList.do" // 목록 가져오기
        // 데이터
      , gfnGetFormData("divInqrCond") + Base.AND + gfnGetTablePage(g_objTable)
        // 성공콜백함수
      , function(objData)
        {
            gfnBindTableData(g_objTable, objData[Base.RSLT_LIST]);
        }
    );
}

// < Sub Procedure and Function - 그리드 영역 >

// < Sub Procedure and Function - 차트 영역 >

// < Sub Procedure and Function - 화면 링크 및 이동 >
//==============================================================================
// 상세
//------------------------------------------------------------------------------
function fnDtl(strRowId)
{
    // 페이지 이동
    gfnMovePage("/system/notiDtl.do?rowId=" +
            encodeURIComponent(strRowId)); // 상세
}

//==============================================================================
// 등록
//------------------------------------------------------------------------------
function fnRgst()
{
    // 페이지 이동
    gfnMovePage("/system/notiEdit.do"); // 편집
}

// < Sub Procedure and Function - 기타 영역 >
//==============================================================================
// 화면 제어
//------------------------------------------------------------------------------
function fnCtrlScr(strClsfy)
{
    if ( "READY" == strClsfy ) // DOM준비
    {
        $(btnInqr).click(fnClickInqr); // 클릭
        $(btnRgst).click(fnClickRgst);

        gfnInitTable(g_objTable); // 테이블 초기화
    } else
    if ( "BFOREINQR" == strClsfy ) // 조회전
    {
        gfnClearTable(g_objTable); // 테이블 초기화
    }
}

//==============================================================================
// 콤보 바인딩
//------------------------------------------------------------------------------
function fnBindCombo()
{
}

//===============================================================================
// 검증
//-------------------------------------------------------------------------------
function fnVerif(strClsfy)
{
    if ( "INQR" == strClsfy ) // 조회
    {
    } else
    if ( "RGST" == strClsfy ) // 등록
    {
        if ( '${requestScope["MENU.authCode"]}' != Base.WRITE_AUTH ) // 쓰기 권한 검증
        {
            gfnDispMsg('${requestScope["ITEM.msgNoAuth"]}<%-- 권한이 없습니다. 관리자에게 문의하십시오. --%>');
            return false;
        }
    }

    return true; // 리턴 처리
}

//===============================================================================
// 신규여부 설정
//-------------------------------------------------------------------------------
function fnSetTitle(strData, objRow)
{
    var strNotiTitle = strData;

    if ( objRow["newYn"] == Base.YES )
    {
        strNotiTitle = '<img src="${pageContext.request.contextPath}/common/images/common/ico_new.gif" /> ' + strNotiTitle;
    }

    return strNotiTitle;
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

    <div id="divInqrCond" class="headSearch">
        <p>※ 에코시안에서 전해드리는 공지 게시판 입니다.</p>
        <span class="aRight">
            <input type="text" name="titleName" class="inputText" />
            <span class="button smallGray"><button type="button" id="btnInqr">${requestScope["ITEM.inqr"]}<%-- 조회 --%></button></span>
        </span>
    </div>

    <div id="divList" class="tableWrap">
        <table class="boardList01">
            <caption>게시판 목록</caption>
            <colgroup>
                <col width="65px" />
                <col width="*" />
                <col width="105px" />
                <col width="65px" />
            </colgroup>
            <thead>
                <tr>
                    <th scope="col">번호</th>
                    <th scope="col">제목</th>
                    <th scope="col">등록일</th>
                    <th scope="col">조회</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        </table>
    </div>

    <!-- 페이지 네비게이션 //-->
    <div id="divPage">
        <div class="pageNav"></div>

        <input type="hidden" name="page"    value="1"  /><!-- 페이지   //-->
        <input type="hidden" name="pageRow" value="10" /><!-- 페이지행 //-->
    </div>

    <div class="buttonBox right">
        <span class="button green"><button type="button" id="btnRgst">등록</button></span>
    </div>
<!-- // contents -->
<%@ include file="../../epfse/system/tabFtr.jsp" %><%-- 탭 푸터 --%>