<%--
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 임시 그리드
    - 최초작성일 : 2014-06-24
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
var g_arrGridComboCode = new Array(); // 그리드 콤보 배열

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
    {
           btnAdd.parentElement.style.visibility = "visible";
        btnImport.parentElement.style.visibility = "visible";
          btnSave.parentElement.style.visibility = "visible";
          btnDelt.parentElement.style.visibility = "visible";
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
// 추가 클릭시..
//------------------------------------------------------------------------------
function fnClickAdd()
{
    if ( !fnVerif("ADD") ) return; // 검증 : 추가

    fnAdd(); // 추가
}

//==============================================================================
// Import 클릭시..
//------------------------------------------------------------------------------
function fnClickImport()
{
    frmImport.filImport.click();
}

//==============================================================================
// Import 변경시..
//------------------------------------------------------------------------------
function fnChangeImport()
{
    if ( !fnVerif("IMPORT") ) return; // 검증 : IMPORT

    var arrFieldName = g_arrFieldName.slice(0, 35); arrFieldName[0] = null;

    // 그리드 EXCEL 데이터 IMPORT
    gfnImportGridExcelData(g_strGridId, frmImport.filImport.value, arrFieldName,
        function(objGv) { gfnDispMsg('${requestScope["ITEM.msgInqrOk"]}<%-- 조회가 완료되었습니다. --%>'); },
        function(arrRows, objFieldType) // cf.) 레코드가 적은 경우 사용한다.
            {
                var LNGTH = arrRows.length, objValue;

                for ( var strFieldName in objFieldType )
                {
                    // dataType 이 numeric 인 FIELD 에 대하여 유효하지 않는 값을 처리한다.
                    if ( "amt" == strFieldName || "amt2" == strFieldName || "amtm" == strFieldName || "amtm2" == strFieldName || "no" == strFieldName || "no2" == strFieldName || "count" == strFieldName || "count2" == strFieldName || "rate" == strFieldName || "rate2" == strFieldName )
                    {
                        for ( var num = 0 ; num < LNGTH ; num++ )
                        {
                            objValue = arrRows[num][strFieldName];
                            if ( !gfnIsNum(objValue) ) arrRows[num][strFieldName] = null;
                        }
                    } else
                    // dataType 이 datetime 인 FIELD 에 대하여 유효하지 않는 값을 처리한다.
                    if ( "date1" == strFieldName || "date2" == strFieldName )
                    {
                        var DATE = "date";
                        for ( num = 0 ; num < LNGTH ; num++ )
                        {
                            objValue = arrRows[num][strFieldName]; if ( null == objValue ) continue;

                            if ( DATE == typeof objValue ) { arrRows[num][strFieldName] = gfnGetGriDateStr(new Date(objValue)); }
                            else                           { if ( !gfnCheckDate(objValue) ) arrRows[num][strFieldName] = null; }
                        }
                    }
                }

                return arrRows;
            }
    );

    arrFieldName = null;

    frmImport.reset();
}

//==============================================================================
// 저장 클릭시..
//------------------------------------------------------------------------------
function fnClickSave()
{
    // 그리드 셀을 편집 중 저장 버튼 클릭시 COMMIT 이 필요하다.
    gfnCallGridFunc(g_strGridId, "commit()"); // 편집내용 COMMIT

    if ( !fnVerif("SAVE") ) return; // 검증 : 저장

    fnSave(); // 저장
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
      , "/develop/getTempList.do" // 목록 가져오기
        // 데이터(JSON Object Only)
      , gfnGetJsonFormData("divInqrCond")
    );
}

//==============================================================================
// 저장
//------------------------------------------------------------------------------
function fnSave()
{
    gfnReq( // 요청
        // URL
        "/develop/saveTempList.do" // 목록 저장
        // 데이터
      , gfnGetGridFormData(g_strGridId, g_arrFieldName) + Base.AND
      + "gridRowId=" + encodeURIComponent(gfnCallGridFunc(g_strGridId, "getCheckedItems()").join(Base.DELI1)) // 그리드행ID목록
        // 성공콜백함수
      , function(objData)
        {
            var RSLT_VALUE = gfnGetJsonValue(objData, [ Base.RSLT_NO ]);

            if ( Base.OK != RSLT_VALUE )
            {
                var DATA_ROW = gfnGetJsonValue(objData, [ Base.RSLT_INFO, "gridRowId" ], 0);
                var strSffx  = gfnGetJsonValue(objData, [ Base.RSLT_INFO, "id2" ]);

                if ( !gfnIsEmpty(strSffx) ) strSffx = '${requestScope["ITEM.id2"]}<%-- ID2 --%> = ' + strSffx;

                if ( Base.DATA_DUP == RSLT_VALUE )
                    gfnSetGridCellFocus(g_strGridId, DATA_ROW, "id2", function() // 그리드 셀 포커스를 설정한다.
                        { gfnDispMsg('${requestScope["ITEM.msgRgstData"]}<%-- 이미 등록된 데이터입니다. 다시 확인하십시오. --%>', strSffx); });
                else
                if ( !gfnIsBaseError(RSLT_VALUE) )
                    gfnSetGridCellFocus(g_strGridId, DATA_ROW, null, function() // 그리드 셀 포커스를 설정한다.
                        { gfnDispMsg(Base.msgRsltError, strSffx); }); // 요청결과 오류가 발생했습니다. 관리자에게 문의하십시오.
            } else
            {
                gfnDispMsg('${requestScope["ITEM.msgSaveOk"]}<%-- 저장이 완료되었습니다. --%>');

                btnInqr.click(); // 재조회한다.
            }
        }
    );
}

//==============================================================================
// 삭제
//------------------------------------------------------------------------------
function fnDelt()
{
    gfnReq( // 요청
        // URL
        "/develop/deltTempList.do" // 목록 삭제
        // 데이터
      , "rowId=" + encodeURIComponent("'" + gfnGetGridChcColValue(g_strGridId, "rowId", false).join("', '") + "'") // 행ID목록
        // 성공콜백함수
      , function(objData)
        {
            var RSLT_VALUE = gfnGetJsonValue(objData, [ Base.RSLT_NO ]);

            if ( Base.OK != RSLT_VALUE )
            {
                if ( !gfnIsBaseError(RSLT_VALUE) ) gfnDispMsg(Base.msgRsltError); // 요청결과 오류가 발생했습니다. 관리자에게 문의하십시오.
            } else
            {
                gfnDispMsg('${requestScope["ITEM.msgDeltOk"]}<%-- 삭제가 완료되었습니다. --%>');

                btnInqr.click(); // 재조회한다.
            }
        }
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
            "year"  : { "dataType": "numeric" }
          , "year2" : { "dataType": "numeric" }
          , "amt"   : { "dataType": "numeric" }
          , "amt2"  : { "dataType": "numeric" }
          , "amtm"  : { "dataType": "numeric" }
          , "amtm2" : { "dataType": "numeric" }
          , "no"    : { "dataType": "numeric" }
          , "no2"   : { "dataType": "numeric" }
          , "count" : { "dataType": "numeric" }
          , "count2": { "dataType": "numeric" }
          , "rate"  : { "dataType": "numeric" }
          , "rate2" : { "dataType": "numeric" }
          , "date1" : { "dataType": "datetime", "datetimeFormat": "yyyyMMdd" }
          , "date2" : { "dataType": "datetime", "datetimeFormat": "yyyyMMdd" }
        };
    g_arrFieldName = "rowId|id2|id|name|name2|yn|yn2|code|code2|year|year2|ym|ym2|amt|amt2|amtm|amtm2|no|no2|corpno|corpno2|bzno|bzno2|count|count2|postNo|postNo2|rate|rate2|date1|date2|telNo|telNo2|emailName|emailName2|ymLabel|ym2Label|corpnoLabel|corpno2Label|bznoLabel|bzno2Label|postNoLabel|postNo2Label".split(Base.DELI1);

    gfnInitGrid(g_strGridId, g_arrFieldName, objFieldType, Base.GRID,
        {
            "pageId": "divPage" // 페이지 태그 ID
          , "columns": [
                { "width": 0, "fieldName": g_arrFieldName[0], "editable": false } // 행ID
              , { "header": { "text": '${requestScope["ITEM.id2"       ]}<%-- ID2             --%>' }, "width": 100, "fieldName": g_arrFieldName[1], "editor": { "maxLength": 20 } }
              , { "header": { "text": '${requestScope["ITEM.id"        ]}<%-- ID              --%>' }, "width": 100, "fieldName": g_arrFieldName[2], "editor": { "maxLength": 20 } }
              , { "header": { "text": '${requestScope["ITEM.name"      ]}<%-- 명              --%>' }, "width": 100, "fieldName": g_arrFieldName[3], "editor": { "maxLength": 100 } }
              , { "header": { "text": '${requestScope["ITEM.name2"     ]}<%-- 명2             --%>' }, "width": 100, "fieldName": g_arrFieldName[4], "editor": { "maxLength": 100 } }
              , { "header": { "text": '${requestScope["ITEM.yn"        ]}<%-- 여부            --%>' }, "width": 100, "fieldName": g_arrFieldName[5], "styles": { "textAlignment": "center" }, "editor": { "type": "dropdown", "domainOnly": true, "textReadOnly": true }, "lookupDisplay": true, "values": [ "", "Y", "N" ], "labels": [ '', Base.comboTextYes, Base.comboTextNo ] }
              , { "header": { "text": '${requestScope["ITEM.yn2"       ]}<%-- 여부2           --%>' }, "width": 100, "fieldName": g_arrFieldName[6], "styles": { "textAlignment": "center", "figureBackground": Grid.FIGURE_BACKGROUND, "figureInactiveBackground": Grid.FIGURE_INACTIVE_BACKGROUND }, "editable": false, "renderer": { "type": "check", "editable": true, "startEditOnClick": true, "trueValues": "Y", "falseValues": "N" } }
              , { "header": { "text": '${requestScope["ITEM.code"      ]}<%-- 코드            --%>' }, "width": 100, "fieldName": g_arrFieldName[7], "editor": { "type": "dropdown", "domainOnly": true, "textReadOnly": true }, "lookupDisplay": true, "values": g_arrGridComboCode[0][0], "labels": g_arrGridComboCode[0][1] }
              , { "header": { "text": '${requestScope["ITEM.code2"     ]}<%-- 코드2           --%>' }, "width": 100, "fieldName": g_arrFieldName[8], "editor": { "type": "dropdown", "domainOnly": true, "textReadOnly": true }, "lookupDisplay": true, "values": g_arrGridComboCode[1][0], "labels": g_arrGridComboCode[1][1] }
              , { "header": { "text": '${requestScope["ITEM.year"      ]}<%-- 년도            --%>' }, "width": 100, "fieldName": g_arrFieldName[9], "styles": { "textAlignment": "far" }, "editor": { "type": "number", "integerOnly": true, "maxLength": 4, "positiveOnly": true } }
              , { "header": { "text": '${requestScope["ITEM.year2"     ]}<%-- 년도2           --%>' }, "width": 100, "fieldName": g_arrFieldName[10], "styles": { "textAlignment": "far" }, "editor": { "type": "number", "integerOnly": true, "maxLength": 4, "positiveOnly": true } }
              , { "header": { "text": '${requestScope["ITEM.ym"        ]}<%-- 년월            --%>' }, "width": 100, "fieldName": g_arrFieldName[11], "styles": { "textAlignment": "center" }, "editor": { "maxLength": 6 }, "lookupDisplay": true, "labelField": "ymLabel" }
              , { "header": { "text": '${requestScope["ITEM.ym2"       ]}<%-- 년월2           --%>' }, "width": 100, "fieldName": g_arrFieldName[12], "styles": { "textAlignment": "center" }, "editor": { "maxLength": 6 }, "lookupDisplay": true, "labelField": "ym2Label" }
              , { "header": { "text": '${requestScope["ITEM.amt"       ]}<%-- 량              --%>' }, "width": 100, "fieldName": g_arrFieldName[13], "styles": { "textAlignment": "far", "numberFormat": "#,##0.000000" }, "editor": { "type": "number", "maxLength": 23 } }
              , { "header": { "text": '${requestScope["ITEM.amt2"      ]}<%-- 량2             --%>' }, "width": 100, "fieldName": g_arrFieldName[14], "styles": { "textAlignment": "far", "numberFormat": "#,##0.000000", "postfix": " (Unit)" }, "editor": { "type": "number", "maxLength": 23 } }
              , { "header": { "text": '${requestScope["ITEM.amtm"      ]}<%-- 액              --%>' }, "width": 100, "fieldName": g_arrFieldName[15], "styles": { "textAlignment": "far", "numberFormat": "#,##0" }, "editor": { "type": "number", "integerOnly": true, "maxLength": 15, "positiveOnly": true } }
              , { "header": { "text": '${requestScope["ITEM.amtm2"     ]}<%-- 액2             --%>' }, "width": 100, "fieldName": g_arrFieldName[16], "styles": { "textAlignment": "far", "numberFormat": "#,##0", "prefix": "\\ " }, "editor": { "type": "number", "integerOnly": true, "maxLength": 15, "positiveOnly": true } }
              , { "header": { "text": '${requestScope["ITEM.no"        ]}<%-- 번호            --%>' }, "width": 100, "fieldName": g_arrFieldName[17], "styles": { "textAlignment": "far" }, "editor": { "type": "number", "integerOnly": true, "maxLength": 10, "positiveOnly": true } }
              , { "header": { "text": '${requestScope["ITEM.no2"       ]}<%-- 번호2           --%>' }, "width": 100, "fieldName": g_arrFieldName[18], "styles": { "textAlignment": "far" }, "editor": { "type": "number", "integerOnly": true, "maxLength": 10, "positiveOnly": true } }
              , { "header": { "text": '${requestScope["ITEM.corpno"    ]}<%-- 법인등록번호    --%>' }, "width": 100, "fieldName": g_arrFieldName[19], "styles": { "textAlignment": "center" }, "editor": { "maxLength": 13 }, "lookupDisplay": true, "labelField": "corpnoLabel" }
              , { "header": { "text": '${requestScope["ITEM.corpno2"   ]}<%-- 법인등록번호2   --%>' }, "width": 100, "fieldName": g_arrFieldName[20], "styles": { "textAlignment": "center" }, "editor": { "maxLength": 13 }, "lookupDisplay": true, "labelField": "corpno2Label" }
              , { "header": { "text": '${requestScope["ITEM.bzno"      ]}<%-- 사업자등록번호  --%>' }, "width": 100, "fieldName": g_arrFieldName[21], "styles": { "textAlignment": "center" }, "editor": { "maxLength": 10 }, "lookupDisplay": true, "labelField": "bznoLabel" }
              , { "header": { "text": '${requestScope["ITEM.bzno2"     ]}<%-- 사업자등록번호2 --%>' }, "width": 100, "fieldName": g_arrFieldName[22], "styles": { "textAlignment": "center" }, "editor": { "maxLength": 10 }, "lookupDisplay": true, "labelField": "bzno2Label" }
              , { "header": { "text": '${requestScope["ITEM.count"     ]}<%-- 수              --%>' }, "width": 100, "fieldName": g_arrFieldName[23], "styles": { "textAlignment": "far", "numberFormat": "#,##0" }, "editor": { "type": "number", "integerOnly": true, "maxLength": 11 } }
              , { "header": { "text": '${requestScope["ITEM.count2"    ]}<%-- 수2             --%>' }, "width": 100, "fieldName": g_arrFieldName[24], "styles": { "textAlignment": "far", "numberFormat": "#,##0", "postfix": " (EA)" }, "editor": { "type": "number", "integerOnly": true, "maxLength": 11 } }
              , { "header": { "text": '${requestScope["ITEM.postNo"    ]}<%-- 우편번호        --%>' }, "width": 100, "fieldName": g_arrFieldName[25], "styles": { "textAlignment": "center" }, "editor": { "maxLength": 6 }, "lookupDisplay": true, "labelField": "postNoLabel" }
              , { "header": { "text": '${requestScope["ITEM.postNo2"   ]}<%-- 우편번호2       --%>' }, "width": 100, "fieldName": g_arrFieldName[26], "styles": { "textAlignment": "center" }, "editor": { "maxLength": 6 }, "lookupDisplay": true, "labelField": "postNo2Label" }
              , { "header": { "text": '${requestScope["ITEM.rate"      ]}<%-- 율              --%>' }, "width": 100, "fieldName": g_arrFieldName[27], "styles": { "textAlignment": "far", "numberFormat": "#,##0.00", "figureBackground": "linear" }, "editor": { "type": "number", "maxLength": 6 }, "renderer": { "type": "bar", "minimum": 0, "maximum": 100, "showLabel": true } }
              , { "header": { "text": '${requestScope["ITEM.rate2"     ]}<%-- 율2             --%>' }, "width": 100, "fieldName": g_arrFieldName[28], "styles": { "textAlignment": "far", "numberFormat": "#,##0.00", "postfix": " %", "figureBackground": "linear" }, "editor": { "type": "number", "maxLength": 6 }, "renderer": { "type": "bar", "minimum": 0, "maximum": 100, "showLabel": true } }
              , { "header": { "text": '${requestScope["ITEM.date1"     ]}<%-- 일자1           --%>' }, "width": 100, "fieldName": g_arrFieldName[29], "styles": { "textAlignment": "center", "datetimeFormat": "yyyy-MM-dd" }, "editor": { "type": "date", "editFormat": "yyyy-MM-dd", "yearNavigation": true } }
              , { "header": { "text": '${requestScope["ITEM.date2"     ]}<%-- 일자2           --%>' }, "width": 100, "fieldName": g_arrFieldName[30], "styles": { "textAlignment": "center", "datetimeFormat": "yyyy-MM-dd" }, "editor": { "type": "date", "editFormat": "yyyy-MM-dd", "yearNavigation": true } }
              , { "header": { "text": '${requestScope["ITEM.telNo"     ]}<%-- 전화번호        --%>' }, "width": 100, "fieldName": g_arrFieldName[31], "styles": { "textAlignment": "center" }, "editor": { "maxLength": 14 } }
              , { "header": { "text": '${requestScope["ITEM.telNo2"    ]}<%-- 전화번호2       --%>' }, "width": 100, "fieldName": g_arrFieldName[32], "styles": { "textAlignment": "center" }, "editor": { "maxLength": 14 } }
              , { "header": { "text": '${requestScope["ITEM.emailName" ]}<%-- 이메일명        --%>' }, "width": 100, "fieldName": g_arrFieldName[33], "editor": { "textCase": "lower", "maxLength": 200 } }
              , { "header": { "text": '${requestScope["ITEM.emailName2"]}<%-- 이메일명2       --%>' }, "width": 100, "fieldName": g_arrFieldName[34], "editor": { "textCase": "lower", "maxLength": 200 } }
            ]
          , "options": { "fixed": { "colCount": 2 } } // 틀고정 cf.) 틀고정될 열의 너비는 px 단위로 입력한다.
        // 이벤트관련
          , "onload": function(strId) // 그리드 초기화 완료시..
                {
                    btnInqr.click(); // 화면 로드시 조회한다.
                }
          , "onloaddatacompleted": function(objDp) // 그리드 데이터 요청시 성공시..
                {
                    var arrRows = objDp.getJsonRows(0, -1);

                    // 사용자정의 포맷적용을 위한 LABEL FIELD 를 추가한다. cf.) 레코드가 적은 경우 사용한다.
                    gfnCallGridAllRowFunc(g_strGridId, arrRows.length, fnFormtGridCellValue);

                    // 열 FILTER 를 설정한다. cf.) 레코드가 적은 경우 사용한다.
                    gfnSetGridColList(g_strGridId, true, [ // 그리드 열 목록 설정
                        { } // 행ID
                      , { } // { "filters": gfnGetGridColFilter(arrRows, g_arrFieldName[1]) } // cf.) 틀고정된 열인 경우 FILTER 아이콘 클릭시 오류발생
                      , { "filters": gfnGetGridColFilter(arrRows, g_arrFieldName[2]) }
                      , { "filters": gfnGetGridColFilter(arrRows, g_arrFieldName[3]) }
                      , { "filters": gfnGetGridColFilter(arrRows, g_arrFieldName[4]) }
                      , { "filters": gfnGetGridColFilter(arrRows, g_arrFieldName[5]) }
                      , { "filters": gfnGetGridColFilter(arrRows, g_arrFieldName[6]) }
                      , { "filters": gfnGetGridColFilter(arrRows, g_arrFieldName[7]) }
                      , { "filters": gfnGetGridColFilter(arrRows, g_arrFieldName[8]) }
                      , { "filters": gfnGetGridColFilter(arrRows, g_arrFieldName[9]) }
                      , { "filters": gfnGetGridColFilter(arrRows, g_arrFieldName[10]) }
                      , { "filters": gfnGetGridColFilter(arrRows, g_arrFieldName[11]) }
                      , { "filters": gfnGetGridColFilter(arrRows, g_arrFieldName[12]) }
                      , { "filters": gfnGetGridColFilter(arrRows, g_arrFieldName[13]) }
                      , { "filters": gfnGetGridColFilter(arrRows, g_arrFieldName[14]) }
                      , { "filters": gfnGetGridColFilter(arrRows, g_arrFieldName[15]) }
                      , { "filters": gfnGetGridColFilter(arrRows, g_arrFieldName[16]) }
                      , { "filters": gfnGetGridColFilter(arrRows, g_arrFieldName[17]) }
                      , { "filters": gfnGetGridColFilter(arrRows, g_arrFieldName[18]) }
                      , { "filters": gfnGetGridColFilter(arrRows, g_arrFieldName[19]) }
                      , { "filters": gfnGetGridColFilter(arrRows, g_arrFieldName[20]) }
                      , { "filters": gfnGetGridColFilter(arrRows, g_arrFieldName[21]) }
                      , { "filters": gfnGetGridColFilter(arrRows, g_arrFieldName[22]) }
                      , { "filters": gfnGetGridColFilter(arrRows, g_arrFieldName[23]) }
                      , { "filters": gfnGetGridColFilter(arrRows, g_arrFieldName[24]) }
                      , { "filters": gfnGetGridColFilter(arrRows, g_arrFieldName[25]) }
                      , { "filters": gfnGetGridColFilter(arrRows, g_arrFieldName[26]) }
                      , { "filters": gfnGetGridColFilter(arrRows, g_arrFieldName[27]) }
                      , { "filters": gfnGetGridColFilter(arrRows, g_arrFieldName[28]) }
                      , { "filters": gfnGetGridColFilter(arrRows, g_arrFieldName[29]) }
                      , { "filters": gfnGetGridColFilter(arrRows, g_arrFieldName[30]) }
                      , { "filters": gfnGetGridColFilter(arrRows, g_arrFieldName[31]) }
                      , { "filters": gfnGetGridColFilter(arrRows, g_arrFieldName[32]) }
                      , { "filters": gfnGetGridColFilter(arrRows, g_arrFieldName[33]) }
                      , { "filters": gfnGetGridColFilter(arrRows, g_arrFieldName[34]) }
                    ]); // 그리드 열 목록 설정

                    arrRows = null;
                }
          , "onclickpage": fnInqr // 페이지 클릭시..
          , "onCellEdited": function(objGv, numItemIndex, numDataRow, numFieldIndex) // 셀 편집 완료시..
                {
                    // 사용자정의 포맷적용을 위한 LABEL FIELD 를 설정한다. cf.) 레코드가 적은 경우 사용한다.
                    fnFormtGridCellValue(objGv, numItemIndex, numFieldIndex);
                }
        });

    objFieldType = null;
}

//==============================================================================
// 그리드 셀 값 포맷
//------------------------------------------------------------------------------
function fnFormtGridCellValue(objGv, numItemIndex, numFieldIndex)
{
    if ( null == numFieldIndex || 11 == numFieldIndex )
        objGv.setValue(numItemIndex, 35, gfnFormt(objGv.getValue(numItemIndex, 11), Base.DATE)); // 년월
    if ( null == numFieldIndex || 12 == numFieldIndex )
        objGv.setValue(numItemIndex, 36, gfnFormt(objGv.getValue(numItemIndex, 12), Base.DATE)); // 년월
    if ( null == numFieldIndex || 19 == numFieldIndex )
        objGv.setValue(numItemIndex, 37, gfnFormt(objGv.getValue(numItemIndex, 19), Base.CORPNO)); // 법인등록번호
    if ( null == numFieldIndex || 20 == numFieldIndex )
        objGv.setValue(numItemIndex, 38, gfnFormt(objGv.getValue(numItemIndex, 20), Base.CORPNO)); // 법인등록번호
    if ( null == numFieldIndex || 21 == numFieldIndex )
        objGv.setValue(numItemIndex, 39, gfnFormt(objGv.getValue(numItemIndex, 21), Base.BZNO)); // 사업자등록번호
    if ( null == numFieldIndex || 22 == numFieldIndex )
        objGv.setValue(numItemIndex, 40, gfnFormt(objGv.getValue(numItemIndex, 22), Base.BZNO)); // 사업자등록번호
    if ( null == numFieldIndex || 25 == numFieldIndex )
        objGv.setValue(numItemIndex, 41, gfnFormt(objGv.getValue(numItemIndex, 25), Base.POST)); // 우편번호
    if ( null == numFieldIndex || 26 == numFieldIndex )
        objGv.setValue(numItemIndex, 42, gfnFormt(objGv.getValue(numItemIndex, 26), Base.POST)); // 우편번호
}

//==============================================================================
// 추가
//------------------------------------------------------------------------------
function fnAdd()
{
    gfnAddGridRow(g_strGridId, // 그리드 행 추가
        { // 행 추가시 기본값을 설정한다.
            "yn2": "Y", "code2": "TEMP", "amt2": 0, "amtm2": 0, "count2": 0, "rate2": 0, "date1": '${requestScope["CRRNT.date"]}', "date2": '${requestScope["CRRNT.date"]}'
        });
}

//==============================================================================
// 그리드 검증
//------------------------------------------------------------------------------
function fnVerifGrid(strClsfy)
{
    if ( "SAVE" == strClsfy )
    {
        if ( !gfnCallGridChcRowFunc(g_strGridId, function(objGv, objRow, numItemIndex) // 그리드 선택 열별 셀 값을 검증한다.
            {
                return gfnVerifGridRow(objGv, objRow, numItemIndex, [ // 그리드 행 검증
                    {
                        "text": '${requestScope["ITEM.id2"]}<%-- ID2 --%>', "fieldName": "id2"
                      , "msgInputYn": '${requestScope["ITEM.msgInputItem"]}<%-- 해당 항목을 입력하십시오. --%>'
                      , "msgByteLngth": '${requestScope["ITEM.msgItemLngthMax"]}<%-- 해당 항목값의 길이가 최대값을 초과하였습니다. --%>', "maxByteSize": 20
                      , "msgMask": '${requestScope["ITEM.msgItemWrong"]}<%-- 해당 항목값이 잘못되었습니다. --%>', "maskChar": "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_", "textSuffix": ", Alphabet/Number/_ Only"
                    }
                  , {
                        "text": '${requestScope["ITEM.id"]}<%-- ID --%>', "fieldName": "id"
                      , "msgByteLngth": '${requestScope["ITEM.msgItemLngthMax"]}<%-- 해당 항목값의 길이가 최대값을 초과하였습니다. --%>', "maxByteSize": 20
                      , "msgMask": '${requestScope["ITEM.msgItemWrong"]}<%-- 해당 항목값이 잘못되었습니다. --%>', "maskChar": "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_", "textSuffix": ", Alphabet/Number/_ Only"
                    }
                  , {
                        "text": '${requestScope["ITEM.name"]}<%-- 명 --%>', "fieldName": "name"
                      , "msgByteLngth": '${requestScope["ITEM.msgItemLngthMax"]}<%-- 해당 항목값의 길이가 최대값을 초과하였습니다. --%>', "maxByteSize": 200
                    }
                  , {
                        "text": '${requestScope["ITEM.name2"]}<%-- 명2 --%>', "fieldName": "name2"
                      , "msgInputYn": '${requestScope["ITEM.msgInputItem"]}<%-- 해당 항목을 입력하십시오. --%>'
                      , "msgByteLngth": '${requestScope["ITEM.msgItemLngthMax"]}<%-- 해당 항목값의 길이가 최대값을 초과하였습니다. --%>', "maxByteSize": 200
                    }
                  , {
                        "text": '${requestScope["ITEM.yn"]}<%-- 여부 --%>', "fieldName": "yn"
                      , "msgChcValue": '${requestScope["ITEM.msgItemWrong"]}<%-- 해당 항목값이 잘못되었습니다. --%>'
                    }
                  , {
                        "text": '${requestScope["ITEM.code"]}<%-- 코드 --%>', "fieldName": "code"
                      , "msgChcValue": '${requestScope["ITEM.msgItemWrong"]}<%-- 해당 항목값이 잘못되었습니다. --%>'
                    }
                  , {
                        "text": '${requestScope["ITEM.code2"]}<%-- 코드2 --%>', "fieldName": "code2"
                      , "msgChcYn": '${requestScope["ITEM.msgChcItem"]}<%-- 해당 항목을 선택하십시오. --%>'
                      , "msgChcValue": '${requestScope["ITEM.msgItemWrong"]}<%-- 해당 항목값이 잘못되었습니다. --%>'
                    }
                  , {
                        "text": '${requestScope["ITEM.year"]}<%-- 년도 --%>', "fieldName": "year"
                      , "msgYear": '${requestScope["ITEM.msgItemWrong"]}<%-- 해당 항목값이 잘못되었습니다. --%>'
                    }
                  , {
                        "text": '${requestScope["ITEM.year2"]}<%-- 년도2 --%>', "fieldName": "year2"
                      , "msgInputYn": '${requestScope["ITEM.msgInputItem"]}<%-- 해당 항목을 입력하십시오. --%>'
                      , "msgYear": '${requestScope["ITEM.msgItemWrong"]}<%-- 해당 항목값이 잘못되었습니다. --%>'
                    }
                  , {
                        "text": '${requestScope["ITEM.ym"]}<%-- 년월 --%>', "fieldName": "ym"
                      , "msgYm": '${requestScope["ITEM.msgItemWrong"]}<%-- 해당 항목값이 잘못되었습니다. --%>'
                    }
                  , {
                        "text": '${requestScope["ITEM.ym2"]}<%-- 년월2 --%>', "fieldName": "ym2"
                      , "msgInputYn": '${requestScope["ITEM.msgInputItem"]}<%-- 해당 항목을 입력하십시오. --%>'
                      , "msgYm": '${requestScope["ITEM.msgItemWrong"]}<%-- 해당 항목값이 잘못되었습니다. --%>'
                    }
                  , {
                        "text": '${requestScope["ITEM.amt"]}<%-- 량 --%>', "fieldName": "amt"
                      , "msgNumYn": '${requestScope["ITEM.msgItemWrong"]}<%-- 해당 항목값이 잘못되었습니다. --%>'
                      , "msgNumRange": '${requestScope["ITEM.msgItemWrong"]}<%-- 해당 항목값이 잘못되었습니다. --%>'//, "minNum": -999999999999999, "maxNum": 999999999999999
                    }
                  , {
                        "text": '${requestScope["ITEM.amt2"]}<%-- 량2 --%>', "fieldName": "amt2"
                      , "msgInputYn": '${requestScope["ITEM.msgInputItem"]}<%-- 해당 항목을 입력하십시오. --%>'
                      , "msgNumYn": '${requestScope["ITEM.msgItemWrong"]}<%-- 해당 항목값이 잘못되었습니다. --%>'
                      , "msgNumRange": '${requestScope["ITEM.msgItemWrong"]}<%-- 해당 항목값이 잘못되었습니다. --%>'//, "minNum": -999999999999999, "maxNum": 999999999999999
                    }
                  , {
                        "text": '${requestScope["ITEM.amtm"]}<%-- 액 --%>', "fieldName": "amtm"
                      , "msgNumYn": '${requestScope["ITEM.msgItemWrong"]}<%-- 해당 항목값이 잘못되었습니다. --%>'
                      , "msgNumRange": '${requestScope["ITEM.msgItemWrong"]}<%-- 해당 항목값이 잘못되었습니다. --%>', "minNum": 0//, "maxNum": 999999999999999
                    }
                  , {
                        "text": '${requestScope["ITEM.amtm2"]}<%-- 액2 --%>', "fieldName": "amtm2"
                      , "msgInputYn": '${requestScope["ITEM.msgInputItem"]}<%-- 해당 항목을 입력하십시오. --%>'
                      , "msgNumYn": '${requestScope["ITEM.msgItemWrong"]}<%-- 해당 항목값이 잘못되었습니다. --%>'
                      , "msgNumRange": '${requestScope["ITEM.msgItemWrong"]}<%-- 해당 항목값이 잘못되었습니다. --%>', "minNum": 0//, "maxNum": 999999999999999
                    }
                  , {
                        "text": '${requestScope["ITEM.no"]}<%-- 번호 --%>', "fieldName": "no"
                      , "msgNumYn": '${requestScope["ITEM.msgItemWrong"]}<%-- 해당 항목값이 잘못되었습니다. --%>'
                      , "msgNumRange": '${requestScope["ITEM.msgItemWrong"]}<%-- 해당 항목값이 잘못되었습니다. --%>', "minNum": 0, "maxNum": 9999999999
                    }
                  , {
                        "text": '${requestScope["ITEM.no2"]}<%-- 번호2 --%>', "fieldName": "no2"
                      , "msgInputYn": '${requestScope["ITEM.msgInputItem"]}<%-- 해당 항목을 입력하십시오. --%>'
                      , "msgNumYn": '${requestScope["ITEM.msgItemWrong"]}<%-- 해당 항목값이 잘못되었습니다. --%>'
                      , "msgNumRange": '${requestScope["ITEM.msgItemWrong"]}<%-- 해당 항목값이 잘못되었습니다. --%>', "minNum": 0, "maxNum": 9999999999
                    }
                  , {
                        "text": '${requestScope["ITEM.corpno"]}<%-- 법인등록번호 --%>', "fieldName": "corpno"
                      , "msgCorpno": '${requestScope["ITEM.msgItemWrong"]}<%-- 해당 항목값이 잘못되었습니다. --%>'
                    }
                  , {
                        "text": '${requestScope["ITEM.corpno2"]}<%-- 법인등록번호2 --%>', "fieldName": "corpno2"
                      , "msgInputYn": '${requestScope["ITEM.msgInputItem"]}<%-- 해당 항목을 입력하십시오. --%>'
                      , "msgCorpno": '${requestScope["ITEM.msgItemWrong"]}<%-- 해당 항목값이 잘못되었습니다. --%>'
                    }
                  , {
                        "text": '${requestScope["ITEM.bzno"]}<%-- 사업자등록번호 --%>', "fieldName": "bzno"
                      , "msgBzno": '${requestScope["ITEM.msgItemWrong"]}<%-- 해당 항목값이 잘못되었습니다. --%>'
                    }
                  , {
                        "text": '${requestScope["ITEM.bzno2"]}<%-- 사업자등록번호2 --%>', "fieldName": "bzno2"
                      , "msgInputYn": '${requestScope["ITEM.msgInputItem"]}<%-- 해당 항목을 입력하십시오. --%>'
                      , "msgBzno": '${requestScope["ITEM.msgItemWrong"]}<%-- 해당 항목값이 잘못되었습니다. --%>'
                    }
                  , {
                        "text": '${requestScope["ITEM.count"]}<%-- 수 --%>', "fieldName": "count"
                      , "msgNumYn": '${requestScope["ITEM.msgItemWrong"]}<%-- 해당 항목값이 잘못되었습니다. --%>'
                      , "msgNumRange": '${requestScope["ITEM.msgItemWrong"]}<%-- 해당 항목값이 잘못되었습니다. --%>', "minNum": -9999999999, "maxNum": 9999999999
                    }
                  , {
                        "text": '${requestScope["ITEM.count2"]}<%-- 수2 --%>', "fieldName": "count2"
                      , "msgInputYn": '${requestScope["ITEM.msgInputItem"]}<%-- 해당 항목을 입력하십시오. --%>'
                      , "msgNumYn": '${requestScope["ITEM.msgItemWrong"]}<%-- 해당 항목값이 잘못되었습니다. --%>'
                      , "msgNumRange": '${requestScope["ITEM.msgItemWrong"]}<%-- 해당 항목값이 잘못되었습니다. --%>', "minNum": -9999999999, "maxNum": 9999999999
                    }
                  , {
                        "text": '${requestScope["ITEM.postNo"]}<%-- 우편번호 --%>', "fieldName": "postNo"
                      , "msgPostNo": '${requestScope["ITEM.msgItemWrong"]}<%-- 해당 항목값이 잘못되었습니다. --%>'
                    }
                  , {
                        "text": '${requestScope["ITEM.postNo2"]}<%-- 우편번호2 --%>', "fieldName": "postNo2"
                      , "msgInputYn": '${requestScope["ITEM.msgInputItem"]}<%-- 해당 항목을 입력하십시오. --%>'
                      , "msgPostNo": '${requestScope["ITEM.msgItemWrong"]}<%-- 해당 항목값이 잘못되었습니다. --%>'
                    }
                  , {
                        "text": '${requestScope["ITEM.rate"]}<%-- 율 --%>', "fieldName": "rate"
                      , "msgNumYn": '${requestScope["ITEM.msgItemWrong"]}<%-- 해당 항목값이 잘못되었습니다. --%>'
                      , "msgNumRange": '${requestScope["ITEM.msgItemWrong"]}<%-- 해당 항목값이 잘못되었습니다. --%>', "minNum": 0, "maxNum": 100
                    }
                  , {
                        "text": '${requestScope["ITEM.rate2"]}<%-- 율2 --%>', "fieldName": "rate2"
                      , "msgInputYn": '${requestScope["ITEM.msgInputItem"]}<%-- 해당 항목을 입력하십시오. --%>'
                      , "msgNumYn": '${requestScope["ITEM.msgItemWrong"]}<%-- 해당 항목값이 잘못되었습니다. --%>'
                      , "msgNumRange": '${requestScope["ITEM.msgItemWrong"]}<%-- 해당 항목값이 잘못되었습니다. --%>', "minNum": 0, "maxNum": 100
                    }
                  , {
                        "text": '${requestScope["ITEM.date1"]}<%-- 일자1 --%>', "fieldName": "date1"
                      , "msgDate": '${requestScope["ITEM.msgItemWrong"]}<%-- 해당 항목값이 잘못되었습니다. --%>'
                    }
                  , {
                        "text": '${requestScope["ITEM.date2"]}<%-- 일자2 --%>', "fieldName": "date2"
                      , "msgInputYn": '${requestScope["ITEM.msgInputItem"]}<%-- 해당 항목을 입력하십시오. --%>'
                      , "msgDate": '${requestScope["ITEM.msgItemWrong"]}<%-- 해당 항목값이 잘못되었습니다. --%>'
                    }
                  , {
                        "text": '${requestScope["ITEM.telNo"]}<%-- 전화번호 --%>', "fieldName": "telNo"
                      , "msgByteLngth": '${requestScope["ITEM.msgItemLngthMax"]}<%-- 해당 항목값의 길이가 최대값을 초과하였습니다. --%>', "maxByteSize": 14
                      , "msgMask": '${requestScope["ITEM.msgItemWrong"]}<%-- 해당 항목값이 잘못되었습니다. --%>', "maskChar": "1234567890-", "textSuffix": ", FORMAT = ####-####-####"
                    }
                  , {
                        "text": '${requestScope["ITEM.telNo2"]}<%-- 전화번호2 --%>', "fieldName": "telNo2"
                      , "msgInputYn": '${requestScope["ITEM.msgInputItem"]}<%-- 해당 항목을 입력하십시오. --%>'
                      , "msgByteLngth": '${requestScope["ITEM.msgItemLngthMax"]}<%-- 해당 항목값의 길이가 최대값을 초과하였습니다. --%>', "maxByteSize": 14
                      , "msgMask": '${requestScope["ITEM.msgItemWrong"]}<%-- 해당 항목값이 잘못되었습니다. --%>', "maskChar": "1234567890-", "textSuffix": ", FORMAT = ####-####-####"
                    }
                  , {
                        "text": '${requestScope["ITEM.emailName"]}<%-- 이메일명 --%>', "fieldName": "emailName"
                      , "msgByteLngth": '${requestScope["ITEM.msgItemLngthMax"]}<%-- 해당 항목값의 길이가 최대값을 초과하였습니다. --%>', "maxByteSize": 200
                      , "msgMask": '${requestScope["ITEM.msgItemWrong"]}<%-- 해당 항목값이 잘못되었습니다. --%>', "maskChar": "abcdefghijklmnopqrstuvwxyz0123456789@.-_", "textSuffix": ", ex.) sample@company.com"
                    }
                  , {
                        "text": '${requestScope["ITEM.emailName2"]}<%-- 이메일명2 --%>', "fieldName": "emailName2"
                      , "msgInputYn": '${requestScope["ITEM.msgInputItem"]}<%-- 해당 항목을 입력하십시오. --%>'
                      , "msgByteLngth": '${requestScope["ITEM.msgItemLngthMax"]}<%-- 해당 항목값의 길이가 최대값을 초과하였습니다. --%>', "maxByteSize": 200
                      , "msgMask": '${requestScope["ITEM.msgItemWrong"]}<%-- 해당 항목값이 잘못되었습니다. --%>', "maskChar": "abcdefghijklmnopqrstuvwxyz0123456789@.-_", "textSuffix": ", ex.) sample@company.com"
                    }
                ]); }) ) return false;
    }

    return true;
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
        $(btnInqr  ).click(fnClickInqr  ); // 클릭
        $(btnAdd   ).click(fnClickAdd   );
        $(btnImport).click(fnClickImport);
        $(btnSave  ).click(fnClickSave  );
        $(btnDelt  ).click(fnClickDelt  );

        $(frmImport.filImport).change(fnChangeImport); // 변경
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
    gfnBindCombo("sltCode|sltCode2", "TEMP|TEMP", null, null, function()
        {
            // 그리드 콤보 배열을 설정한다.
            g_arrGridComboCode[0] = new Array(2), g_arrGridComboCode[0][0] = new Array(), g_arrGridComboCode[0][1] = new Array(); g_arrGridComboCode[0][0][0] = Base.EMPTYSTR, g_arrGridComboCode[0][1][0] = Base.EMPTYSTR;
            g_arrGridComboCode[1] = new Array(2), g_arrGridComboCode[1][0] = new Array(), g_arrGridComboCode[1][1] = new Array();

            $("#sltCode>option" ).each(function() { g_arrGridComboCode[0][0][g_arrGridComboCode[0][0].length] = $(this).val(); g_arrGridComboCode[0][1][g_arrGridComboCode[0][1].length] = $(this).text(); });
            $("#sltCode2>option").each(function() { g_arrGridComboCode[1][0][g_arrGridComboCode[1][0].length] = $(this).val(); g_arrGridComboCode[1][1][g_arrGridComboCode[1][1].length] = $(this).text(); });

            fnInitGrid(); // 그리드 초기화
        });
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
    if ( "ADD" == strClsfy ) // 추가
    {
        if ( '${requestScope["MENU.authCode"]}' != Base.WRITE_AUTH ) // 쓰기 권한 검증
        {
            gfnDispMsg('${requestScope["ITEM.msgNoAuth"]}<%-- 권한이 없습니다. 관리자에게 문의하십시오. --%>');
            return false;
        }
    } else
    if ( "SAVE" == strClsfy ) // 저장
    {
        if ( !fnVerif("DELT") ) return false; // 검증 : 삭제

        if ( !fnVerifGrid(strClsfy) ) return false; // 그리드를 검증한다.
    } else
    if ( "DELT" == strClsfy ) // 삭제
    {
        if ( '${requestScope["MENU.authCode"]}' != Base.WRITE_AUTH ) // 쓰기 권한 검증
        {
            gfnDispMsg('${requestScope["ITEM.msgNoAuth"]}<%-- 권한이 없습니다. 관리자에게 문의하십시오. --%>');
            return false;
        }

        if ( 0 >= gfnGetInt(gfnCallGridFunc(g_strGridId, "getItemCount()")) ) // 그리드 데이터가 존재하지 않는 경우..
        {
            gfnDispMsg('${requestScope["ITEM.msgNoData"]}<%-- 데이터가 존재하지 않습니다. --%>');
            return false;
        } else
        if ( 0 >= gfnGetInt(gfnCallGridFunc(g_strGridId, "getCheckedItems().length")) ) // 그리드 데이터를 선택하지 않은 경우..
        {
            gfnDispMsg('${requestScope["ITEM.msgListChc"]}<%-- 조회된 목록에서 데이터를 선택하십시오. --%>');
            return false;
        }
    } else
    if ( "IMPORT" == strClsfy ) // IMPORT
    {
        if ( '${requestScope["MENU.authCode"]}' != Base.WRITE_AUTH ) // 쓰기 권한 검증
        {
            gfnDispMsg('${requestScope["ITEM.msgNoAuth"]}<%-- 권한이 없습니다. 관리자에게 문의하십시오. --%>');
            return false;
        }

        if ( gfnIsEmpty(frmImport.filImport.value) )
        {
            gfnDispMsg('${requestScope["ITEM.msgChcItem"]}<%-- 해당 항목을 선택하십시오. --%>', $(btnImport).text());
            frmImport.reset(); return false;
        } else
        if ( 0 > frmImport.filImport.value.toLowerCase().indexOf(".xls") && 0 > frmImport.filImport.value.toLowerCase().indexOf(".xlsx") )
        {
            gfnDispMsg('${requestScope["ITEM.msgFileWrong"]}<%-- 파일 확장자가 잘못되었습니다. 다음 파일을 선택하십시오. --%>', "*.xls or *.xlsx");
            frmImport.reset(); return false;
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
        <h3>임시</h3>
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

    <!-- 그리드 //-->
    <div style="margin-right: 20px"><div id="divGrid" style="height: 225px"></div></div>
    <div id="divPage">
        <div class="pageNav" style="height: 26px"></div>

        <input type="hidden" name="page"    value="1"  /><!-- 페이지   //-->
        <input type="hidden" name="pageRow" value="18" /><!-- 페이지행 //-->
    </div>

    <!-- 버튼 //-->
    <div class="buttonBox" style="margin-right: 20px">
        <div style="float: left">
            <span class="button lime" style="visibility: hidden"><button type="button" id="btnAdd"   >${requestScope["ITEM.add"]}<%-- 추가 --%></button></span>
            <span class="button gray" style="visibility: hidden"><button type="button" id="btnImport">Import</button></span>
        </div>
        <div style="float: right">
            <span class="button green" style="visibility: hidden"><button type="button" id="btnSave">${requestScope["ITEM.save"]}<%-- 저장 --%></button></span>
            <span class="button gray"  style="visibility: hidden"><button type="button" id="btnDelt">${requestScope["ITEM.delt"]}<%-- 삭제 --%></button></span>
        </div>
    </div>

    <div style="display: none">
        <form name="frmImport">
            <input type="file" id="filImport" />
        </form>
        <select id="sltCode"></select>
        <select id="sltCode2"></select>
    </div>
<!-- // contents -->

<%@ include file="../../epfse/system/tabFtr.jsp" %><%-- 탭 푸터 --%>