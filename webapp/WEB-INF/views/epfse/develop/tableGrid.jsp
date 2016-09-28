<%--
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 테이블 그리드
    - 최초작성일 : 2014-06-23
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
var g_strGridId = "divGrid", g_arrFieldName = null, g_arrFieldName2 = null; // 그리드ID // 그리드 FIELD 명
g_strDivIdDtl = "divGrid|divGrid2"; // 화면내 div 높이 설정을 위한 변수

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
//==============================================================================
// 테이블영문명 포커스해제시..
//------------------------------------------------------------------------------
function fnBlurTableEngName()
{
    txtTableEngName.value = txtTableEngName.value.toUpperCase();
}

//==============================================================================
// 컬럼영문명 포커스해제시..
//------------------------------------------------------------------------------
function fnBlurColEngName()
{
    txtColEngName.value = txtColEngName.value.toUpperCase();
}

//==============================================================================
// 조회 클릭시..
//------------------------------------------------------------------------------
function fnClickInqr()
{
    if ( !fnVerif("INQR") ) return; // 검증 : 조회

    fnCtrlScr("BFOREINQR"); // 화면 제어 : 조회전

    fnInqr(); // 조회
    if ( chkColInqrYn.checked ) fnInqrCol(); // 컬럼조회
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
      , "/develop/getTableList.do" // 목록 가져오기
        // 데이터(JSON Object Only)
      , gfnGetJsonFormData("divInqrCond")
    );
}

//==============================================================================
// 컬럼 조회
//------------------------------------------------------------------------------
function fnInqrCol()
{
    gfnReqGrid( // 그리드 요청
        // 그리드 ID
        g_strGridId + "2"
        // URI
      , "/develop/getColTableList.do" // 목록 가져오기
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
    g_arrFieldName = "rowId|tableEngName|tableKrnName|ownerName".split(Base.DELI1);

    gfnInitGrid(g_strGridId, g_arrFieldName, null, Base.GRID,
        {
            "columns": [
                { "width": 0, "fieldName": g_arrFieldName[0] } // 행ID
              , {
                    "header": { "text": '${requestScope["ITEM.table"]}<%-- 테이블 --%>' }, "width": 200
                  , "columns": [
                        { "header": { "text": '${requestScope["ITEM.tableEngName"]}<%-- 테이블영문명 --%>' }, "width": 100, "fieldName": g_arrFieldName[1] }
                      , { "header": { "text": '${requestScope["ITEM.tableKrnName"]}<%-- 테이블한글명 --%>' }, "width": 100, "fieldName": g_arrFieldName[2] }
                    ]
                }
            ]
          , "options":
                {
                    "checkBar": { "visible": false } // 선택열 숨김
                  , "edit": { "readOnly": true } // 읽기전용
                }
        // 이벤트관련
          , "onload": function(strId) // 그리드 초기화 완료시..
                {
                    btnInqr.click();
                }
          , "onDataCellDblClicked": fnDtl // 데이터 셀 더블클릭시..
        });

    // FIELD 정보를 설정한다.
    g_arrFieldName2 = "rowId|colSeq|colEngName|colKrnName|dataTypeId|dataLngthId|nullYn|pkYn|tableEngName|tableKrnName".split(Base.DELI1);

    gfnInitGrid(g_strGridId + "2", g_arrFieldName2, null, Base.GRID,
        {
            "columns": [
                { "width": 0, "fieldName": g_arrFieldName2[0] } // 행ID
              , { "header": { "text": '${requestScope["ITEM.colSeq"      ]}<%-- 열일련번호   --%>' }, "width": 30 , "fieldName": g_arrFieldName2[1], "styles": { "textAlignment": "center" } }
              , { "header": { "text": '${requestScope["ITEM.colEngName"  ]}<%-- 열영문명     --%>' }, "width": 150, "fieldName": g_arrFieldName2[2] }
              , { "header": { "text": '${requestScope["ITEM.colKrnName"  ]}<%-- 열한글명     --%>' }, "width": 150, "fieldName": g_arrFieldName2[3] }
              , { "header": { "text": '${requestScope["ITEM.dataTypeId"  ]}<%-- 데이터유형ID --%>' }, "width": 100, "fieldName": g_arrFieldName2[4], "styles": { "textAlignment": "center" } }
              , { "header": { "text": '${requestScope["ITEM.dataLngthId" ]}<%-- 데이터길이ID --%>' }, "width": 70 , "fieldName": g_arrFieldName2[5], "styles": { "textAlignment": "center" } }
              , { "header": { "text": '${requestScope["ITEM.nullYn"      ]}<%-- NULL여부     --%>' }, "width": 70 , "fieldName": g_arrFieldName2[6], "styles": { "textAlignment": "center", "figureBackground": Grid.FIGURE_BACKGROUND, "figureInactiveBackground": Grid.FIGURE_INACTIVE_BACKGROUND }, "renderer": { "type": "check", "trueValues": "Y", "falseValues": "N" } }
              , { "header": { "text": '${requestScope["ITEM.pkYn"        ]}<%-- PK여부       --%>' }, "width": 70 , "fieldName": g_arrFieldName2[7], "styles": { "textAlignment": "center", "figureBackground": Grid.FIGURE_BACKGROUND, "figureInactiveBackground": Grid.FIGURE_INACTIVE_BACKGROUND }, "renderer": { "type": "check", "trueValues": "Y", "falseValues": "N" } }
              , {
                    "header": { "text": '${requestScope["ITEM.table"]}<%-- 테이블 --%>' }, "width": 400
                  , "columns": [
                        { "header": { "text": '${requestScope["ITEM.tableEngName"]}<%-- 테이블영문명 --%>' }, "width": 150, "fieldName": g_arrFieldName2[8] }
                      , { "header": { "text": '${requestScope["ITEM.tableKrnName"]}<%-- 테이블한글명 --%>' }, "width": 150, "fieldName": g_arrFieldName2[9] }
                    ]
                }
            ]
          , "options":
                {
                    "checkBar": { "visible": false } // 선택열 숨김
                  , "edit": { "readOnly": true } // 읽기전용
                  , "fixed": { "colCount": 3 } // 틀고정 cf.) 틀고정될 열의 너비는 px 단위로 입력한다.
                }
        // 이벤트관련
          , "onloaddatacompleted": function(objDp) // 그리드 데이터 요청시 성공시..
                {
                    var arrRows = objDp.getJsonRows(0, -1);

                    // 열 FILTER 를 설정한다. cf.) 레코드가 적은 경우 사용한다.
                    gfnSetGridColList(g_strGridId + "2", true, [ // 그리드 열 목록 설정
                        { }
                      , { }
                      , { }
                      , { }
                      , { }
                      , { }
                      , { }
                      , { }
                      , {
                            "columns": [
                                { "filters": gfnGetGridColFilter(arrRows, g_arrFieldName2[8]) }
                              , { "filters": gfnGetGridColFilter(arrRows, g_arrFieldName2[9]) }
                            ]
                        }
                    ]); // 그리드 열 목록 설정

                    arrRows = null;
                }
        });
}

// < Sub Procedure and Function - 차트 영역 >

// < Sub Procedure and Function - 화면 링크 및 이동 >
//==============================================================================
// 상세
//------------------------------------------------------------------------------
function fnDtl()
{
    var objRow = gfnGetGridChcRow(g_strGridId);

    gfnSetScrParam("ownerName"   , objRow["ownerName"   ]); // 화면 매개변수 설정
    gfnSetScrParam("tableEngName", objRow["tableEngName"]);
    gfnSetScrParam("tableKrnName", objRow["tableKrnName"]);

    objRow = null;

    // 페이지 이동
    gfnMovePage("/develop/tableDtl.do"); // 상세
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
        $(btnDtl ).click(fnClickDtl );

        $(txtTableEngName).blur(fnBlurTableEngName); // 포커스해제
        $(txtColEngName  ).blur(fnBlurColEngName  );

        $("#divInqrCond :text").each(function() {
            // 조회조건내 텍스트박스에서 ENTER 키 입력시 조회한다.
            $(this).keydown(function(objEvent) { if ( 13 == objEvent["keyCode"] ) btnInqr.click(); });
        });
    } else
    if ( "BFOREINQR" == strClsfy ) // 조회전
    {
        gfnClearGrid(g_strGridId); // 그리드 정리
        gfnClearGrid(g_strGridId + "2");
    }
}

//==============================================================================
// 콤보 바인딩
//------------------------------------------------------------------------------
function fnBindCombo()
{
    // URI 콤보 바인딩
    gfnBindComboUri("sltOwnerName", "/develop/getOwnerTableList.do", null, null, null, function()
        { fnInitGrid(); /* 그리드 초기화 */ });
}

//==============================================================================
// 검증
//------------------------------------------------------------------------------
function fnVerif(strClsfy)
{
    if ( null == gfnGetGridView(g_strGridId) ) return false; // 그리드 로드되었는지 검증한다.
    if ( null == gfnGetGridView(g_strGridId + "2") ) return false;

    if ( "INQR" == strClsfy ) // 조회
    {
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
        <h3>테이블</h3>
        <div>
            <p><em><span class="ir common"></span>처음</em> &gt; 개발도구 &gt; 기타</p>
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
            <div style="float: left; margin-right: 20px">
                <label for="sltOwnerName">${requestScope["ITEM.owner"]}<%-- 소유자 --%></label>
                <select id="sltOwnerName" name="ownerName"></select>
                <br />
                <label for="chkColInqrYn">${requestScope["ITEM.colInqrYn"]}<%-- 컬럼조회여부 --%></label>
                <input type="checkbox" id="chkColInqrYn" name="colInqrYn" />
            </div>

            <div style="float: left">
                <label for="txtTableEngName">${requestScope["ITEM.table"]}<%-- 테이블 --%></label>
                <br />
                <label for="txtColEngName">${requestScope["ITEM.col"]}<%-- 컬럼 --%></label>
            </div>

            <div style="float: left; width: 15%">
                <input type="text" id="txtTableEngName" name="tableEngName" class="inputText01" style="ime-mode: disabled" maxlength="200" />
                <br />
                <input type="text" id="txtColEngName"   name="colEngName"   class="inputText01" style="ime-mode: disabled" maxlength="200" />
            </div>

            <div style="float: left; width: 20%">
                <input type="text" id="txtTableKrnName" name="tableKrnName" class="inputText01" style="ime-mode: active"   maxlength="100" />
                <br />
                <input type="text" id="txtColKrnName"   name="colKrnName"   class="inputText01" style="ime-mode: active"   maxlength="100" />
            </div>

            <br />
            <span class="button smallGray"><button type="button" id="btnInqr">${requestScope["ITEM.inqr"]}<%-- 조회 --%></button></span>
        </fieldset>
    </div>

    <!-- 그리드 //-->
    <div style="margin-right: 20px; ">
        <div style="float: left;  width: 35%"><div id="divGrid"  style="height: 210px"></div></div>
        <div style="float: right; width: 64%"><div id="divGrid2" style="height: 210px"></div></div>
    </div>

    <!-- 버튼 //-->
    <div class="buttonBox" style="margin-right: 20px">
        <div style="float: right; margin-top: 20px">
            <span class="button gray"><button type="button" id="btnDtl">${requestScope["ITEM.dtl"]}<%-- 상세 --%></button></span>
        </div>
    </div>
<!-- // contents -->

<%@ include file="../../epfse/system/tabFtr.jsp" %><%-- 탭 푸터 --%>