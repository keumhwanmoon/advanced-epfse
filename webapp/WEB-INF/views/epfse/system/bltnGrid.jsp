<%--
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 게시물 그리드
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
<script type="text/javascript">
<!--
//< Sub Procedure and Function - GLOBAL 영역 >
var g_strGridId = "divGrid", g_arrFieldName = null; // 그리드ID // 그리드 FIELD 명

//< Sub Procedure and Function - MAIN 영역 >
//==============================================================================
// DOM 준비시..
//------------------------------------------------------------------------------
$(document).ready(function()
{
    gfnInit(); // 초기화
    fnCtrlScr("READY"); // 화면 제어 : DOM준비
    fnBindCombo(); // 콤보 바인딩

    if ( '${requestScope["MENU.authCode"]}' == Base.WRITE_AUTH ) // 쓰기 권한이 있는 경우..
        btnRgst.parentElement.style.visibility = "visible";
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
// 등록 클릭시..
//------------------------------------------------------------------------------
function fnClickRgst()
{
    if ( !fnVerif("RGST") ) return; // 검증 : 등록

    fnRgst(); // 등록
}

//==============================================================================
// 상세 클릭시..
//------------------------------------------------------------------------------
function fnClickDtl()
{
    if ( !fnVerif("DTL") ) return; // 검증 : 상세

    fnDtl(); // 상세
}

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
      , "/system/getBltnList.do" // 목록 가져오기
        // 데이터(JSON Object Only)
      , gfnGetJsonFormData("divInqrCond")
    );
}

// < Sub Procedure and Function - 그리드 영역 >
//==============================================================================
// 그리드 초기화
//------------------------------------------------------------------------------
function fnInitGrid()
{
    // FIELD 정보를 설정한다.
     var objFieldType =
        {
            "rowNo2":    { "dataType": "numeric" }
          , "inqrCount": { "dataType": "numeric" }
          , "rgstDtm":   { "dataType": "datetime", "datetimeFormat": "yyyyMMdd" }
        };
    g_arrFieldName = "rowId|rowNo2|titleName|inqrCount|rgstUserName|rgstDtm|newYn|updtYn|prntsBltnNo".split(Base.DELI1);

    gfnInitGrid(g_strGridId, g_arrFieldName, objFieldType, Base.GRID,
        {
            "pageId": "divPage" // 페이지 태그 ID
          , "columns": [
                { "width": 0, "fieldName": g_arrFieldName[0] } // 행ID
              , { "header": { "text": '${requestScope["ITEM.no"               ]}<%-- 번호         --%>' }, "width": 70, "fieldName": g_arrFieldName[1], "styles": { "textAlignment": "far" } }
              , { "header": { "text": '${requestScope["BLTBRD.titleItemIdName"]}<%-- 제목/질문요약/질문/자료 --%>' }, "width": 500, "fieldName": g_arrFieldName[2], "renderer": { "type": "icon" }, "imageList": "gridImgList", "dynamicStyles": [
                    { "styles": "iconIndex=1", "criteria": '"Y" = values["newYn"]' } // 신규시..
                  , { "styles": "iconIndex=2", "criteria": '"Y" = values["updtYn"]' } // 수정시..
                  , { "styles": "iconIndex=3", "criteria": '( "Y" = values["newYn"] ) and ( "Y" = values["updtYn"] )' } ]
                }
              , { "header": { "text": '${requestScope["ITEM.inqrCount"        ]}<%-- 조회수       --%>' }, "width": 100, "fieldName": g_arrFieldName[3], "styles": { "textAlignment": "far", "numberFormat": "#,##0" } }
              , { "header": { "text": '${requestScope["ITEM.rgstUserName"     ]}<%-- 등록사용자명 --%>' }, "width": 100, "fieldName": g_arrFieldName[4], "styles": { "textAlignment": "center" } }
              , { "header": { "text": '${requestScope["ITEM.rgstDtm"          ]}<%-- 등록일시     --%>' }, "width": 100, "fieldName": g_arrFieldName[5], "styles": { "textAlignment": "center", "datetimeFormat": "yyyy-MM-dd" } }
            ]
          , "options":
                {
                    "checkBar": { "visible": false } // 선택열 숨김
                  , "edit": { "readOnly": true } // 읽기전용
                  , "sorting": { "enabled": false } // 정렬 비활성
                }
        // 이벤트관련
          , "onload": function(strId) // 그리드 초기화 완료시..
                {
                    var objImgList = new RealGrids.ImageList("gridImgList");
                    objImgList.rootUrl = "http://" + location.host + "${pageContext.request.contextPath}" + "/common/images/common/";
                    objImgList.images = [ null, "ico_new.gif", "ico_update.gif", "ico_new_update.gif" ];
                    gfnGetGridView(strId).addImageList(objImgList);
                    objImgList = null;

                    btnInqr.click(); // 화면 로드시 조회한다.
                }
          , "onDataCellDblClicked": fnDtl // 데이터 셀 더블클릭시..
          , "onclickpage": fnInqr // 페이지 클릭시..
        });

    objFieldType = null;
}

// < Sub Procedure and Function - 차트 영역 >

// < Sub Procedure and Function - 화면 링크 및 이동 >
//==============================================================================
// 등록
//------------------------------------------------------------------------------
function fnRgst()
{
    // 페이지 이동
    gfnMovePage("/system/bltnEdit.do?menuAddrNameClsfyId=" +
            encodeURIComponent($('[name="bltbrdNo"]').val())); // 편집
}

//==============================================================================
// 상세
//------------------------------------------------------------------------------
function fnDtl()
{
    // 페이지 이동
    gfnMovePage("/system/bltnDtl.do?menuAddrNameClsfyId=" + encodeURIComponent($('#divInqrCond>[name="bltbrdNo"]').val()) +
        "&rowId=" + encodeURIComponent(gfnGetGridChcRow(g_strGridId)[g_arrFieldName[0]])); // 상세
}

// < Sub Procedure and Function - 기타 영역 >
//==============================================================================
// 화면 제어
//------------------------------------------------------------------------------
function fnCtrlScr(strClsfy)
{
    if ( "READY" == strClsfy ) // DOM준비
    {
        $(".head>h3").text('${requestScope["BLTBRD.bltbrdName"]}<%-- 공지사항/FAQ/Q&A/자료실 --%>');

        $(btnInqr).click(fnClickInqr); // 클릭
        $(btnRgst).click(fnClickRgst);
        $(btnDtl ).click(fnClickDtl );

        fnInitGrid(); // 그리드 초기화
    } else
    if ( "BFOREINQR" == strClsfy ) // 조회전
    {
        gfnClearGrid(g_strGridId); // 그리드 정리
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
    } else
    if ( "RGST" == strClsfy ) // 등록
    {
        if ( '${requestScope["MENU.authCode"]}' != Base.WRITE_AUTH ) // 쓰기 권한 검증
        {
            gfnDispMsg('${requestScope["ITEM.msgNoAuth"]}<%-- 권한이 없습니다. 관리자에게 문의하십시오. --%>');
            return false;
        }
    } else
    if ( "DTL" == strClsfy ) // 상세
    {
        if ( 0 >= gfnGetInt(gfnCallGridFunc(g_strGridId, "getItemCount()")) ) // 그리드 데이터가 존재하지 않는 경우..
        {
            gfnDispMsg('${requestScope["ITEM.msgNoData"]}<%-- 데이터가 존재하지 않습니다. --%>');
            return false;
        } else
        if ( 0 > gfnCallGridFunc(g_strGridId, "getCurrent().itemIndex") ||
             g_arrFieldName[0] == gfnCoalesce(gfnCallGridFunc(g_strGridId, "getCurrent().fieldName"), g_arrFieldName[0])
           ) // 그리드 데이터에 포커스가 없는 경우..
        {
            gfnDispMsg('${requestScope["ITEM.msgListChc"]}<%-- 조회된 목록에서 데이터를 선택하십시오. --%>');
            return false;
        }
    }

    return true;
}
-->
</script>
<!-- // CSS 및 JavaScript 관련 -->

<!-- contents -->
<body>
    <div class="head">
        <h3>게시물</h3>
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

    <div class="headSearch" id="divInqrCond">
        <fieldset>
            <select id="sltClsfy" name="clsfyId" style="width: 100px">
                <option value="11" selected="selected">${requestScope["BLTBRD.titleItemIdName"]}<%-- 제목/질문요약/질문/자료 --%></option>
<c:if test='${null != requestScope["BLTBRD.titleItemId2"]}'>
                <option value="12">${requestScope["BLTBRD.titleItemId2Name"]}<%-- 질문 --%></option>
</c:if>
                <option value="13">${requestScope["BLTBRD.cttsItemIdName"]}<%-- 내용 --%></option>
<c:if test='${null == requestScope["BLTBRD.titleItemId2"]}'>
                <option value="21">${requestScope["BLTBRD.titleItemIdName"]} + ${requestScope["BLTBRD.cttsItemIdName"]}</option>
</c:if>
<c:if test='${null != requestScope["BLTBRD.titleItemId2"]}'>
                <option value="22">${requestScope["BLTBRD.titleItemIdName"]} + ${requestScope["BLTBRD.titleItemId2Name"]} + ${requestScope["BLTBRD.cttsItemIdName"]}</option>
</c:if>
            </select>
            <input type="text" id="txtClsfy2" name="clsfyName" class="inputText01" maxlength="100" style="width: 60%" onkeydown='javascript: if ( 13 == event.keyCode ) btnInqr.click();' />

            <span class="button smallGray"><button type="button" id="btnInqr">${requestScope["ITEM.inqr"]}<%-- 조회 --%></button></span>
        </fieldset>

        <input type="hidden" name="bltbrdNo" value='${param["menuAddrNameClsfyId"]}' /><!-- 게시판ID //-->
    </div>

    <!-- 그리드 //-->
    <div style="margin-right: 20px;"><div id="divGrid" style="height: 210px"></div></div>
    <div id="divPage">
        <div class="pageNav" style="height: 26px"></div>

        <input type="hidden" name="page"    value="1"  /><!-- 페이지   //-->
        <input type="hidden" name="pageRow" value="18" /><!-- 페이지행 //-->
    </div>

    <!-- 버튼 //-->
    <div class="buttonBox" style="text-align: right; margin-right: 20px; margin-top: 15px;" >
        <span class="button gray"><button type="button" id="btnDtl">${requestScope["ITEM.dtl"]}<%-- 상세 --%></button></span>
        <span class="button green" style="visibility: hidden"><button type="button" id="btnRgst">${requestScope["ITEM.rgst"]}<%-- 등록 --%></button></span>
    </div>
<!-- // contents -->

<%@ include file="../../epfse/system/tabFtr.jsp" %><%-- 탭 푸터 --%>