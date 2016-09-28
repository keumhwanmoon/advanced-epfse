<%--
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 표준용어 저장
    - 최초작성일 : 2014-06-30
    - 작  성  자 : 유광식
    - 비      고 :
--------------------------------------------------------------------------------
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="../../epfse/system/tabHdr.jsp" %><%-- 헤더 관련 --%>
<!-- CSS 및 JavaScript 관련 -->
<script type="text/javascript" src="${pageContext.request.contextPath}/common/realGrid/scripts/browserCheck.js"></script><!-- 그리드 관련 //-->
<script type="text/javascript" src="${pageContext.request.contextPath}/common/realGrid/scripts/realgridlic.js" ></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/common/realGrid/scripts/realgridplus.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/common/realGrid/scripts/realgridutil.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/common/realGrid/scripts/swfobject.js"   ></script>

<script src="${pageContext.request.contextPath}/common/js/grid.js" charset="utf-8"></script><!-- 그리드 jQuery //-->
<script src="${pageContext.request.contextPath}/common/js/table/fso.js" charset="utf-8"></script><!-- File System Object //-->
<script type="text/javascript">
//< Sub Procedure and Function - GLOBAL 영역 >
var g_strGridId = "divGrid", g_arrFieldName = null; // 그리드ID // 그리드 FIELD 명
g_strDivIdDtl = "divGrid"; // 화면내 div 높이 설정을 위한 변수

//< Sub Procedure and Function - MAIN 영역 >
//==============================================================================
// DOM 준비시..
//------------------------------------------------------------------------------
$(document).ready(function()
{
    gfnInit(); // 초기화
    fnCtrlScr("READY"); // 화면 제어 : DOM준비
    fnBindCombo(); // 콤보 바인딩
});

// < Sub Procedure and Function - 주요 이벤트 영역 >

// < Sub Procedure and Function - 비지니스 로직 호출 영역 >
//==============================================================================
// 조회
//------------------------------------------------------------------------------
function fnInqr()
{
    gfnReqGrid( // 그리드 요청
        // 그리드 ID
        g_strGridId
        // URI
      , "/develop/getSaveStdtrmList.do" // 목록 가져오기
        // 데이터(JSON Object Only)
      , null
    );
}

// < Sub Procedure and Function - 그리드 영역 >
//==============================================================================
// 그리드 초기화
//------------------------------------------------------------------------------
function fnInitGrid()
{
    // FIELD 정보를 설정한다.
    g_arrFieldName = "krnName|empty|empty|engNfrmltName|engName|empty|empty".split(Base.DELI1);

    gfnInitGrid(g_strGridId, g_arrFieldName, null, Base.GRID,
        {
            "pageId": "divPage" // 페이지 태그 ID
          , "columns": [
                { "header": { "text": "논리명"      }, "width": 150, "fieldName": g_arrFieldName[0] }
              , { "header": { "text": "설명"        }, "width": 100, "fieldName": g_arrFieldName[1] }
              , { "header": { "text": "논리 동의어" }, "width": 100, "fieldName": g_arrFieldName[2] }
              , { "header": { "text": "물리명"      }, "width": 150, "fieldName": g_arrFieldName[3] }
              , { "header": { "text": "물리명 설명" }, "width": 150, "fieldName": g_arrFieldName[4] }
              , { "header": { "text": "물리 동의어" }, "width": 100, "fieldName": g_arrFieldName[5] }
              , { "header": { "text": "태그"        }, "width": 100, "fieldName": g_arrFieldName[6] }
            ]
          , "options":
                {
                    "checkBar": { "visible": false }
                  , "edit": { "readOnly": true }
                }
        // 이벤트관련
          , "onload": function(strId) // 그리드 초기화 완료시..
                {
                    fnInqr(); // 화면 로드시 조회한다.
                }
        });
}

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
        fnInitGrid(); // 그리드 초기화
    }
}

//==============================================================================
// 콤보 바인딩
//------------------------------------------------------------------------------
function fnBindCombo()
{
}

//==============================================================================
// 검증
//------------------------------------------------------------------------------
function fnVerif(strClsfy)
{
    if ( null == gfnGetGridView(g_strGridId) ) return false; // 그리드 로드되었는지 검증한다.

    if ( "INQR" == strClsfy ) // 조회
    {
    }

    return true;
}

</script>
<!-- // CSS 및 JavaScript 관련 -->

<!-- contents -->
<body>
    <div class="head">
        <h3>용어사전</h3>
        <div>
            <p><em><span class="ir common"></span>처음</em> &gt; 개발도구 &gt; 표준용어</p>
            <ul>
                <li><a href="#" class="excel"><span class="ir common"></span>엑셀다운로드</a></li>
                <li><button type="button" class="print"><span class="ir common"></span>인쇄</button></li>
                <li><a href="#" class="help"><span class="ir common"></span>도움말</a></li>
                <li><a href="#" class="fav"><span class="ir common"></span>즐겨찾기추가</a></li>
            </ul>
        </div>
    </div>

    <!-- 그리드 //-->
    <div style="margin-right: 20px"><div id="divGrid" style="height: 340px"></div></div>
    <div id="divPage" style="display: none">
        <div class="pageNav" style="height: 26px"></div>

        <input type="hidden" name="page"    value="1"  /><!-- 페이지   //-->
        <input type="hidden" name="pageRow" value="999999999" /><!-- 페이지행 //-->
    </div>
<!-- // contents -->

<%@ include file="../../epfse/system/tabFtr.jsp" %><%-- 탭 푸터 --%>