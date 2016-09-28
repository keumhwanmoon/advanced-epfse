<%--
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 코드헤더 그리드
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
var g_strGridId = "divGrid", g_arrFieldNameHdr = null, g_arrFieldName = null; // 그리드ID // 그리드 FIELD 명
var g_arrGridComboCode = new Array(); // 그리드 콤보 배열
g_strDivIdDtl = "divGridHdr|divGrid"; // 화면내 div 높이 설정을 위한 변수

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
           btnAddHdr.parentElement.style.visibility = "visible";
        btnImportHdr.parentElement.style.visibility = "visible";
          btnSaveHdr.parentElement.style.visibility = "visible";
          btnDeltHdr.parentElement.style.visibility = "visible";

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

    fnCtrlScr("BFOREINQRHDR"); // 화면 제어 : 조회전

    fnInqrHdr(); // 조회
}

//==============================================================================
// 추가 클릭시..
//------------------------------------------------------------------------------
function fnClickAddHdr()
{
    if ( !fnVerif("ADDHDR") ) return; // 검증 : 추가

    fnAddHdr(); // 추가
}
function fnClickAdd()
{
    if ( !fnVerif("ADD") ) return; // 검증 : 추가

    fnAdd(); // 추가
}

//==============================================================================
// Import 클릭시..
//------------------------------------------------------------------------------
function fnClickImportHdr()
{
    frmImportHdr.filImportHdr.click();
}
function fnClickImport()
{
    frmImport.filImport.click();
}

//==============================================================================
// Import 변경시..
//------------------------------------------------------------------------------
function fnChangeImportHdr()
{
    if ( !fnVerif("IMPORTHDR") ) return; // 검증 : IMPORT

    var arrFieldName = g_arrFieldName.slice(0, 4); arrFieldName[0] = null;

    // 그리드 EXCEL 데이터 IMPORT
    gfnImportGridExcelData(g_strGridId + "Hdr", frmImportHdr.filImportHdr.value, arrFieldName,
        function() { gfnDispMsg('${requestScope["ITEM.msgInqrOk"]}<%-- 조회가 완료되었습니다. --%>'); },
        function(arrRows, objFieldType) // cf.) 레코드가 적은 경우 사용한다.
            {
                var LNGTH = arrRows.length, objValue;

                for ( var strFieldName in objFieldType )
                {
                    // dataType 이 numeric 인 FIELD 에 대하여 유효하지 않는 값을 처리한다.
                    if ( "dispOrderNo" == strFieldName )
                    {
                        for ( var num = 0 ; num < LNGTH ; num++ )
                        {
                            objValue = arrRows[num][strFieldName];
                            if ( !gfnIsNum(objValue) ) arrRows[num][strFieldName] = null;
                        }
                    }
                }

                return arrRows;
            }
    );

    arrFieldName = null;

    frmImportHdr.reset();
}
function fnChangeImport()
{
    if ( !fnVerif("IMPORT") ) return; // 검증 : IMPORT

    var arrFieldName = g_arrFieldName.slice(0, 8); arrFieldName[0] = null;

    // 그리드 EXCEL 데이터 IMPORT
    gfnImportGridExcelData(g_strGridId, frmImport.filImport.value, arrFieldName,
        function() { gfnDispMsg('${requestScope["ITEM.msgInqrOk"]}<%-- 조회가 완료되었습니다. --%>'); });

    arrFieldName = null;

    frmImport.reset();
}

//==============================================================================
// 저장 클릭시..
//------------------------------------------------------------------------------
function fnClickSaveHdr()
{
    // 그리드 셀을 편집 중 저장 버튼 클릭시 COMMIT 이 필요하다.
    gfnCallGridFunc(g_strGridId + "Hdr", "commit()"); // 편집내용 COMMIT

    if ( !fnVerif("SAVEHDR") ) return; // 검증 : 저장

    fnSaveHdr(); // 저장
}
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
function fnClickDeltHdr()
{
    if ( !gfnCnfmMsg('${requestScope["ITEM.msgDeltCnfm"]}') ) return; // 삭제하시겠습니까?

    if ( !fnVerif("DELTHDR") ) return; // 검증 : 삭제

    fnDeltHdr(); // 삭제
}
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
function fnInqrHdr()
{
    gfnReqGrid( // 그리드 요청
        // 그리드 ID
        g_strGridId + "Hdr"
        // URI
      , "/system/getCodeHdrList.do" // 목록 가져오기
        // 데이터(JSON Object Only)
      , gfnGetJsonFormData("divInqrCond")
    );
}
function fnInqr()
{
    gfnReqGrid( // 그리드 요청
        // 그리드 ID
        g_strGridId
        // URI
      , "/system/getCodeNameList.do" // 목록 가져오기
        // 데이터(JSON Object Only)
      , gfnGetJsonFormData("divInqrCond")
    );
}

//==============================================================================
// 저장
//------------------------------------------------------------------------------
function fnSaveHdr()
{
    gfnReq( // 요청
        // URL
        "/system/saveCodeHdrList.do" // 목록 저장
        // 데이터
      , gfnGetGridFormData(g_strGridId + "Hdr", g_arrFieldNameHdr) + Base.AND
      + "gridRowId=" + encodeURIComponent(gfnCallGridFunc(g_strGridId + "Hdr", "getCheckedItems()").join(Base.DELI1)) // 그리드행ID목록
        // 성공콜백함수
      , function(objData)
        {
            var RSLT_VALUE = gfnGetJsonValue(objData, [ Base.RSLT_NO ]);

            if ( Base.OK != RSLT_VALUE )
            {
                var DATA_ROW = gfnGetJsonValue(objData, [ Base.RSLT_INFO, "gridRowId" ], 0);
                var strSffx  = gfnGetJsonValue(objData, [ Base.RSLT_INFO, "codeHdrId" ]);

                if ( !gfnIsEmpty(strSffx) ) strSffx = '${requestScope["ITEM.codeHdrId"]}<%-- 코드헤더ID --%> = ' + strSffx;

                if ( Base.DATA_DUP == RSLT_VALUE )
                    gfnSetGridCellFocus(g_strGridId + "Hdr", DATA_ROW, "codeHdrId", function() // 그리드 셀 포커스를 설정한다.
                        { gfnDispMsg('${requestScope["ITEM.msgRgstData"]}<%-- 이미 등록된 데이터입니다. 다시 확인하십시오. --%>', strSffx); });
                else
                if ( !gfnIsBaseError(RSLT_VALUE) )
                    gfnSetGridCellFocus(g_strGridId + "Hdr", DATA_ROW, null, function() // 그리드 셀 포커스를 설정한다.
                        { gfnDispMsg(Base.msgRsltError, strSffx); }); // 요청결과 오류가 발생했습니다. 관리자에게 문의하십시오.
            } else
            {
                gfnDispMsg('${requestScope["ITEM.msgSaveOk"]}<%-- 저장이 완료되었습니다. --%>');

                btnInqr.click(); // 재조회한다.
            }
        }
    );
}
function fnSave()
{
    gfnReq( // 요청
        // URL
        "/system/saveCodeList.do" // 목록 저장
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
                var strSffx  = gfnGetJsonValue(objData, [ Base.RSLT_INFO, "userdefCode" ]);

                if ( !gfnIsEmpty(strSffx) ) strSffx = '${requestScope["ITEM.userdefCode"]}<%-- 사용자정의코드 --%> = ' + strSffx;

                var strSffx2 = gfnGetJsonValue(objData, [ Base.RSLT_INFO, "codeHdrId" ]);

                if ( !gfnIsEmpty(strSffx) ) strSffx = '${requestScope["ITEM.codeHdrId"]}<%-- 코드헤더ID --%> = ' + strSffx;

                if ( -1 == RSLT_VALUE ) // 부모없음
                    gfnSetGridCellFocus(g_strGridId, DATA_ROW, "codeHdrId", function() // 그리드 셀 포커스를 설정한다.
                        { gfnDispMsg('${requestScope["ITEM.msgNoData"]}<%-- 데이터가 존재하지 않습니다. --%>', strSffx2); });
                else
                if ( Base.DATA_DUP == RSLT_VALUE )
                    gfnSetGridCellFocus(g_strGridId, DATA_ROW, "userdefCode", function() // 그리드 셀 포커스를 설정한다.
                        { gfnDispMsg('${requestScope["ITEM.msgRgstData"]}<%-- 이미 등록된 데이터입니다. 다시 확인하십시오. --%>', strSffx); });
                else
                if ( !gfnIsBaseError(RSLT_VALUE) )
                    gfnSetGridCellFocus(g_strGridId, DATA_ROW, null, function() // 그리드 셀 포커스를 설정한다.
                        { gfnDispMsg(Base.msgRsltError, strSffx); }); // 요청결과 오류가 발생했습니다. 관리자에게 문의하십시오.
            } else
            {
                gfnDispMsg('${requestScope["ITEM.msgSaveOk"]}<%-- 저장이 완료되었습니다. --%>');

                // 재조회한다.
                if ( gfnIsEmpty($('[name="codeHdrId"]').val()) ) { btnInqr.click(); }
                else
                {
                    fnCtrlScr("BFOREINQR"); // 화면 제어 : 조회전
                    fnInqr(); // 조회
                }
            }
        }
    );
}

//==============================================================================
// 삭제
//------------------------------------------------------------------------------
function fnDeltHdr()
{
    gfnReq( // 요청
        // URL
        "/system/deltCodeHdrList.do" // 목록 삭제
        // 데이터
      , "rowId=" + encodeURIComponent("'" + gfnGetGridChcColValue(g_strGridId + "Hdr", "rowId", false).join("', '") + "'") // 행ID목록
        // 성공콜백함수
      , function(objData)
        {
            var RSLT_VALUE = gfnGetJsonValue(objData, [ Base.RSLT_NO ]);

            if ( Base.OK != RSLT_VALUE )
            {
                if ( -1 == RSLT_VALUE ) // 자식존재
                    gfnDispMsg('${requestScope["ITEM.msgCodeExist"]}<%-- 코드가 존재하여 삭제할 수 없습니다.--%>');
                else
                if ( !gfnIsBaseError(RSLT_VALUE) ) gfnDispMsg(Base.msgRsltError); // 요청결과 오류가 발생했습니다. 관리자에게 문의하십시오.
            } else
            {
                gfnDispMsg('${requestScope["ITEM.msgDeltOk"]}<%-- 삭제가 완료되었습니다. --%>');

                btnInqr.click(); // 재조회한다.
            }
        }
    );
}
function fnDelt()
{
    gfnReq( // 요청
        // URL
        "/system/deltCodeList.do" // 목록 삭제
        // 데이터
      , gfnGetGridFormData(g_strGridId, "rowId|langCode|codeHdrId".split(Base.DELI1))
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

                // 재조회한다.
                if ( gfnIsEmpty($('[name="codeHdrId"]').val()) ) { btnInqr.click(); }
                else
                {
                    fnCtrlScr("BFOREINQR"); // 화면 제어 : 조회전
                    fnInqr(); // 조회
                }
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
    g_arrFieldNameHdr = "rowId|codeHdrId|codeHdrName|intrrHdrName".split(Base.DELI1);

    gfnInitGrid(g_strGridId + "Hdr", g_arrFieldNameHdr, null, Base.GRID,
        {
            "columns": [
                { "width": 0, "fieldName": g_arrFieldNameHdr[0], "editable": false } // 행ID
              , { "header": { "text": '${requestScope["ITEM.codeHdrId"   ]}<%-- 코드헤더ID --%>' }, "width": 100, "fieldName": g_arrFieldNameHdr[1], "editor": { "maxLength": 20 } }
              , { "header": { "text": '${requestScope["ITEM.codeHdrName" ]}<%-- 코드헤더명 --%>' }, "width": 100, "fieldName": g_arrFieldNameHdr[2], "editor": { "maxLength": 100 } }
              , { "header": { "text": '${requestScope["ITEM.intrrHdrName"]}<%-- 내부헤더명 --%>' }, "width": 70 , "fieldName": g_arrFieldNameHdr[3], "editor": { "maxLength": 100 } }
            ]
        // 이벤트관련
          , "onload": function(strId) // 그리드 초기화 완료시..
                {
                    btnInqr.click(); // 화면 LAOD 시 조회한다.
                }
          , "onloaddatacompleted": function(objDp) // 그리드 데이터 요청시 성공시..
                {
                    var arrRows = objDp.getJsonRows(0, -1);

                    // 열 FILTER 를 설정한다. cf.) 레코드가 적은 경우 사용한다.
                    gfnSetGridColList(g_strGridId + "Hdr", true, [ // 그리드 열 목록 설정
                        { } // 행ID
                      , { }
                      , { }
                      , { "filters": gfnGetGridColFilter(arrRows, g_arrFieldNameHdr[3]) }
                    ]); // 그리드 열 목록 설정

                    arrRows = null;

                    // 1 건인 경우 첫번째 행을 선택해준다.
                    if ( 1 == gfnCallGridFunc(g_strGridId + "Hdr", "getItemCount()") )
                        gfnFocusGridCell(g_strGridId + "Hdr", 0, g_arrFieldNameHdr[1]);
                }
          , "onCurrentChanged": function(objGv, objCellIndex) // 포커스 변경시..
                {
                    // 그리드 정리시 좌측에 숨겨진 행ID 가 선택된다.
                    if ( "rowId" == objCellIndex.fieldName ) return;

                    fnCtrlScr("BFOREINQR"); // 화면 제어 : 조회전

                    var objRow = gfnGetGridJsonRow(objGv, objCellIndex); if ( null == objRow ) return;
                    var ROW_ID = objRow.rowId;
                    objRow = null;

                    if ( !gfnIsEmpty(ROW_ID) )
                    {
                        $('[name="codeHdrId"]').val(ROW_ID);
                        fnInqr(); // 조회
                    }
                }
        });

    // FIELD 정보를 설정한다.
    var objFieldType = { "dispOrderNo": { "dataType": "numeric" } };
    g_arrFieldName = "rowId|userdefCode|codeName|intrrName|dispOrderNo|useYn|langCode|codeHdrId".split(Base.DELI1);

    gfnInitGrid(g_strGridId, g_arrFieldName, objFieldType, Base.GRID,
        {
            "columns": [
                { "width": 0, "fieldName": g_arrFieldName[0], "editable": false } // 행ID
              , { "header": { "text": '${requestScope["ITEM.userdefCode"]}<%-- 사용자정의코드 --%>' }, "width": 100, "fieldName": g_arrFieldName[1], "editor": { "maxLength": 20 } }
              , { "header": { "text": '${requestScope["ITEM.codeName"   ]}<%-- 코드명         --%>' }, "width": 100, "fieldName": g_arrFieldName[2], "editor": { "maxLength": 100 } }
              , { "header": { "text": '${requestScope["ITEM.intrrName"  ]}<%-- 내부명         --%>' }, "width": 70 , "fieldName": g_arrFieldName[3], "editor": { "maxLength": 100 } }
              , { "header": { "text": '${requestScope["ITEM.dispOrderNo"]}<%-- 표시순서번호   --%>' }, "width": 70 , "fieldName": g_arrFieldName[4], "styles": { "textAlignment": "far" }, "editor": { "type": "number", "integerOnly": true, "maxLength": 10, "positiveOnly": true } }
              , { "header": { "text": '${requestScope["ITEM.useYn"      ]}<%-- 사용여부       --%>' }, "width": 70 , "fieldName": g_arrFieldName[5], "styles": { "textAlignment": "center", "figureBackground": Grid.FIGURE_BACKGROUND, "figureInactiveBackground": Grid.FIGURE_INACTIVE_BACKGROUND }, "editable": false, "renderer": { "type": "check", "editable": true, "startEditOnClick": true, "trueValues": "Y", "falseValues": "N" } }
              , { "header": { "text": '${requestScope["ITEM.langCode"   ]}<%-- 언어코드       --%>' }, "width": 70 , "fieldName": g_arrFieldName[6], "editor": { "type": "dropdown", "domainOnly": true, "textReadOnly": true }, "lookupDisplay": true, "values": g_arrGridComboCode[0][0], "labels": g_arrGridComboCode[0][1] }
              , { "header": { "text": '${requestScope["ITEM.codeHdrId"  ]}<%-- 코드헤더ID     --%>' }, "width": 100, "fieldName": g_arrFieldName[7], "editor": { "maxLength": 20 } }
            ]
        // 이벤트관련
          , "onloaddatacompleted": function(objDp) // 그리드 데이터 요청시 성공시..
                {
                    // 부모 그리드 셀 변경으로 자식 그리드 데이터 요청 완료시 부모 그리드에 포커스를 설정한다.
                    var objGv = gfnGetGridView(g_strGridId + "Hdr"); if ( null == objGv ) return;
                    var objCurrent = objGv.getCurrent();
                    if ( 0 <= objCurrent.itemIndex && "rowId" != objCurrent.fieldName ) objGv.setFocus();
                    objCurrent = null; objGv = null;
                }
        });

    objFieldType = null;
}

//==============================================================================
// 추가
//------------------------------------------------------------------------------
function fnAddHdr()
{
    gfnAddGridRow(g_strGridId + "Hdr"); // 그리드 행 추가
}
function fnAdd()
{
    var strLangCode = $(sltLang).val();
    if ( gfnIsEmpty(strLangCode) ) strLangCode = $('[name="comParamUserLangCode"]').val();

    gfnAddGridRow(g_strGridId, // 그리드 행 추가
        { // 행 추가시 기본값을 설정한다.
            "useYn": "Y", "langCode": strLangCode, "codeHdrId": $('[name="codeHdrId"]').val()
        });
}

//==============================================================================
// 그리드 검증
//------------------------------------------------------------------------------
function fnVerifGrid(strClsfy)
{
    if ( "SAVEHDR" == strClsfy )
    {
        if ( !gfnCallGridChcRowFunc(g_strGridId + "Hdr", function(objGv, objRow, numItemIndex) // 그리드 선택 열별 셀 값을 검증한다.
            {
                return gfnVerifGridRow(objGv, objRow, numItemIndex, [ // 그리드 행 검증
                    {
                        "text": '${requestScope["ITEM.codeHdrId"]}<%-- 코드헤더ID --%>', "fieldName": "codeHdrId"
                      , "msgInputYn": '${requestScope["ITEM.msgInputItem"]}<%-- 해당 항목을 입력하십시오. --%>'
                      , "msgByteLngth": '${requestScope["ITEM.msgItemLngthMax"]}<%-- 해당 항목값의 길이가 최대값을 초과하였습니다. --%>', "maxByteSize": 20
                      , "msgMask": '${requestScope["ITEM.msgItemWrong"]}<%-- 해당 항목값이 잘못되었습니다. --%>', "maskChar": "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_", "textSuffix": ", Alphabet/Number/_ Only"
                    }
                  , {
                        "text": '${requestScope["ITEM.codeHdrName"]}<%-- 코드헤더명 --%>', "fieldName": "codeHdrName"
                      , "msgInputYn": '${requestScope["ITEM.msgInputItem"]}<%-- 해당 항목을 입력하십시오. --%>'
                      , "msgByteLngth": '${requestScope["ITEM.msgItemLngthMax"]}<%-- 해당 항목값의 길이가 최대값을 초과하였습니다. --%>', "maxByteSize": 200
                    }
                  , {
                        "text": '${requestScope["ITEM.intrrHdrName"]}<%-- 내부헤더명 --%>', "fieldName": "intrrHdrName"
                      , "msgInputYn": '${requestScope["ITEM.msgInputItem"]}<%-- 해당 항목을 입력하십시오. --%>'
                      , "msgByteLngth": '${requestScope["ITEM.msgItemLngthMax"]}<%-- 해당 항목값의 길이가 최대값을 초과하였습니다. --%>', "maxByteSize": 200
                    }
                ]); }) ) return false;
    } else
    if ( "SAVE" == strClsfy )
    {
        if ( !gfnCallGridChcRowFunc(g_strGridId, function(objGv, objRow, numItemIndex) // 그리드 선택 열별 셀 값을 검증한다.
            {
                return gfnVerifGridRow(objGv, objRow, numItemIndex, [ // 그리드 행 검증
                    {
                        "text": '${requestScope["ITEM.userdefCode"]}<%-- 사용자정의코드 --%>', "fieldName": "userdefCode"
                      , "msgInputYn": '${requestScope["ITEM.msgInputItem"]}<%-- 해당 항목을 입력하십시오. --%>'
                      , "msgByteLngth": '${requestScope["ITEM.msgItemLngthMax"]}<%-- 해당 항목값의 길이가 최대값을 초과하였습니다. --%>', "maxByteSize": 20
                    }
                  , {
                        "text": '${requestScope["ITEM.codeName"]}<%-- 코드명 --%>', "fieldName": "codeName"
                      , "msgInputYn": '${requestScope["ITEM.msgInputItem"]}<%-- 해당 항목을 입력하십시오. --%>'
                      , "msgByteLngth": '${requestScope["ITEM.msgItemLngthMax"]}<%-- 해당 항목값의 길이가 최대값을 초과하였습니다. --%>', "maxByteSize": 200
                    }
                  , {
                        "text": '${requestScope["ITEM.intrrName"]}<%-- 내부명 --%>', "fieldName": "intrrName"
                      , "msgInputYn": '${requestScope["ITEM.msgInputItem"]}<%-- 해당 항목을 입력하십시오. --%>'
                      , "msgByteLngth": '${requestScope["ITEM.msgItemLngthMax"]}<%-- 해당 항목값의 길이가 최대값을 초과하였습니다. --%>', "maxByteSize": 200
                    }
                  , {
                        "text": '${requestScope["ITEM.dispOrderNo"]}<%-- 표시순서번호 --%>', "fieldName": "dispOrderNo"
                      , "msgInputYn": '${requestScope["ITEM.msgInputItem"]}<%-- 해당 항목을 입력하십시오. --%>'
                      , "msgNumYn": '${requestScope["ITEM.msgItemWrong"]}<%-- 해당 항목값이 잘못되었습니다. --%>'
                      , "msgNumRange": '${requestScope["ITEM.msgItemWrong"]}<%-- 해당 항목값이 잘못되었습니다. --%>', "minNum": 0, "maxNum": 9999999999
                    }
                  , {
                        "text": '${requestScope["ITEM.langCode"]}<%-- 언어코드 --%>', "fieldName": "langCode"
                      , "msgChcYn": '${requestScope["ITEM.msgChcItem"]}<%-- 해당 항목을 선택하십시오. --%>'
                      , "msgChcValue": '${requestScope["ITEM.msgItemWrong"]}<%-- 해당 항목값이 잘못되었습니다. --%>'
                    }
                  , {
                        "text": '${requestScope["ITEM.codeHdrId"]}<%-- 코드헤더ID --%>', "fieldName": "codeHdrId"
                      , "msgInputYn": '${requestScope["ITEM.msgInputItem"]}<%-- 해당 항목을 입력하십시오. --%>'
                      , "msgByteLngth": '${requestScope["ITEM.msgItemLngthMax"]}<%-- 해당 항목값의 길이가 최대값을 초과하였습니다. --%>', "maxByteSize": 20
                      , "msgMask": '${requestScope["ITEM.msgItemWrong"]}<%-- 해당 항목값이 잘못되었습니다. --%>', "maskChar": "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_", "textSuffix": ", Alphabet/Number/_ Only"
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
        $(btnInqr     ).click(fnClickInqr     ); // 클릭
        $(btnAddHdr   ).click(fnClickAddHdr   );
        $(btnImportHdr).click(fnClickImportHdr);
        $(btnSaveHdr  ).click(fnClickSaveHdr  );
        $(btnDeltHdr  ).click(fnClickDeltHdr  );
        $(btnAdd      ).click(fnClickAdd      );
        $(btnImport   ).click(fnClickImport   );
        $(btnSave     ).click(fnClickSave     );
        $(btnDelt     ).click(fnClickDelt     );

        $(frmImportHdr.filImportHdr).change(fnChangeImportHdr); // 변경
        $(frmImport.filImport      ).change(fnChangeImport   );

        $("#divInqrCond :text").each(function() {
            // 조회조건내 텍스트박스에서 ENTER 키 입력시 조회한다.
            $(this).keydown(function(objEvent) { if ( 13 == objEvent["keyCode"] ) btnInqr.click(); });
        });
    } else
    if ( "BFOREINQRHDR" == strClsfy ) // 조회전
    {
        gfnClearGrid(g_strGridId + "Hdr"); // 그리드 정리
        gfnClearGrid(g_strGridId);

        $('[name="codeHdrId"]').val("");
        $('[name="langCode"]').val($(sltLang).val());
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
    gfnBindCombo("sltLangCode", $('[name="langCodeHdrId"]').val(), null, null, function()
        {
            $(sltLang).html($(sltLang).html() + $(sltLangCode).html());

            // 그리드 콤보 배열을 설정한다.
            g_arrGridComboCode[0] = new Array(2), g_arrGridComboCode[0][0] = new Array(), g_arrGridComboCode[0][1] = new Array();

            $("#sltLangCode>option").each(function() { g_arrGridComboCode[0][0][g_arrGridComboCode[0][0].length] = $(this).val(); g_arrGridComboCode[0][1][g_arrGridComboCode[0][1].length] = $(this).text(); });

            fnInitGrid(); // 그리드 초기화
        });
}

//==============================================================================
// 검증
//------------------------------------------------------------------------------
function fnVerif(strClsfy)
{
    if ( null == gfnGetGridView(g_strGridId + "Hdr") ) return false; // 그리드 로드되었는지 검증한다.
    if ( null == gfnGetGridView(g_strGridId) ) return false;

    if ( "INQR" == strClsfy ) // 조회
    {
    } else
    if ( "ADDHDR" == strClsfy || "ADD" == strClsfy ) // 추가
    {
        if ( '${requestScope["MENU.authCode"]}' != Base.WRITE_AUTH ) // 쓰기 권한 검증
        {
            gfnDispMsg('${requestScope["ITEM.msgNoAuth"]}<%-- 권한이 없습니다. 관리자에게 문의하십시오. --%>');
            return false;
        }
    } else
    if ( "SAVEHDR" == strClsfy ) // 저장
    {
        if ( !fnVerif("DELTHDR") ) return false; // 검증 : 삭제

        if ( !fnVerifGrid(strClsfy) ) return false; // 그리드를 검증한다.
    } else
    if ( "SAVE" == strClsfy ) // 저장
    {
        if ( !fnVerif("DELT") ) return false; // 검증 : 삭제

        if ( !fnVerifGrid(strClsfy) ) return false; // 그리드를 검증한다.
    } else
    if ( "DELTHDR" == strClsfy ) // 삭제
    {
        if ( '${requestScope["MENU.authCode"]}' != Base.WRITE_AUTH ) // 쓰기 권한 검증
        {
            gfnDispMsg('${requestScope["ITEM.msgNoAuth"]}<%-- 권한이 없습니다. 관리자에게 문의하십시오. --%>');
            return false;
        }

        if ( 0 >= gfnGetInt(gfnCallGridFunc(g_strGridId + "Hdr", "getItemCount()")) ) // 그리드 데이터가 존재하지 않는 경우..
        {
            gfnDispMsg('${requestScope["ITEM.msgNoData"]}<%-- 데이터가 존재하지 않습니다. --%>');
            return false;
        } else
        if ( 0 >= gfnGetInt(gfnCallGridFunc(g_strGridId + "Hdr", "getCheckedItems().length")) ) // 그리드 데이터를 선택하지 않은 경우..
        {
            gfnDispMsg('${requestScope["ITEM.msgListChc"]}<%-- 조회된 목록에서 데이터를 선택하십시오. --%>');
            return false;
        }
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
    if ( "IMPORTHDR" == strClsfy ) // IMPORT
    {
        if ( '${requestScope["MENU.authCode"]}' != Base.WRITE_AUTH ) // 쓰기 권한 검증
        {
            gfnDispMsg('${requestScope["ITEM.msgNoAuth"]}<%-- 권한이 없습니다. 관리자에게 문의하십시오. --%>');
            return false;
        }

        if ( gfnIsEmpty(frmImportHdr.filImportHdr.value) )
        {
            gfnDispMsg('${requestScope["ITEM.msgChcItem"]}<%-- 해당 항목을 선택하십시오. --%>', $(btnImport).text());
            frmImport.reset(); return false;
        } else
        if ( 0 > frmImportHdr.filImportHdr.value.toLowerCase().indexOf(".xls") && 0 > frmImportHdr.filImportHdr.value.toLowerCase().indexOf(".xlsx") )
        {
            gfnDispMsg('${requestScope["ITEM.msgFileWrong"]}<%-- 파일 확장자가 잘못되었습니다. 다음 파일을 선택하십시오. --%>', "*.xls or *.xlsx");
            frmImport.reset(); return false;
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
        <h3>코드</h3>
        <div>
            <p><em><span class="ir common"></span>처음</em> &gt; 시스템관리 &gt; 기타</p>
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
            <label for="sltLang">${requestScope["ITEM.langCode"]}<%-- 언어코드 --%></label>
            <select id="sltLang" style="width: 70px; margin-right: 15px;">
                <option value="">${requestScope["ITEM.comboTextAll"]}</option>
            </select>
            <input type="hidden" name="langCode" /><!-- 언어코드 //-->
            <label for="sltLang">${requestScope["ITEM.clsfyId"]}<%-- 구분ID --%></label>
            <select id="sltClsfyId" name="clsfyId" style="width: 90px">
                <option value="11">${requestScope["ITEM.codeHdrId"]}<%-- 코드헤더ID --%></option>
                <option value="12" selected="selected">${requestScope["ITEM.codeHdrName"]}<%-- 코드헤더명 --%></option>
                <option value="21">${requestScope["ITEM.userdefCode"]}<%-- 사용자정의코드 --%></option>
                <option value="22">${requestScope["ITEM.codeName"]}<%-- 코드명 --%></option>
            </select>
            <label for="txtIntrrHdrName">내부명</label>
            <input type="text" id="txtIntrrHdrName" name="intrrHdrName" /><!-- 내부명 -->
            <span class="button smallGray"><button type="button" id="btnInqr">${requestScope["ITEM.inqr"]}<%-- 조회 --%></button></span>
        </fieldset>

        <input type="hidden" name="codeHdrId" /><!-- 코드헤더ID //-->
        <input type="hidden" name="langCodeHdrId" value="LANG_CODE" /><!-- 언어코드헤더ID //-->
    </div>

    <!-- 그리드 //-->
    <div style="margin-right: 20px">
        <div style="float: left; width: 35%"><div id="divGridHdr" style="height: 236px"></div></div>
        <div style="width: 1%"></div>
        <div style="float: right; width: 64%"><div id="divGrid"   style="height: 236px"></div></div>
    </div>

    <!-- 버튼 //-->
    <div class="buttonBox" style="margin-right: 20px">
        <div style="float: left; width: 35%; margin-top: 15px">
            <div style="float: left">
                <span class="button lime" style="visibility: hidden"><button type="button" id="btnAddHdr"   >${requestScope["ITEM.add"]}<%-- 추가 --%></button></span>
                <span class="button gray" style="visibility: hidden"><button type="button" id="btnImportHdr">Import</button></span>
            </div>
            <div style="float: right">
                <span class="button green" style="visibility: hidden"><button type="button" id="btnSaveHdr" >${requestScope["ITEM.save"]}<%-- 저장 --%></button></span>
                <span class="button gray"  style="visibility: hidden"><button type="button" id="btnDeltHdr" >${requestScope["ITEM.delt"]}<%-- 삭제 --%></button></span>
            </div>
        </div>
        <div style="width: 1%"></div>
        <div>
            <div style="float: right; width: 64%; margin-top: 15px">
                <div style="float: left">
                    <span class="button lime" style="visibility: hidden"><button type="button" id="btnAdd"   >${requestScope["ITEM.add"]}<%-- 추가 --%></button></span>
                    <span class="button gray" style="visibility: hidden"><button type="button" id="btnImport">Import</button></span>
                </div>
                <div style="float: right">
                    <span class="button green" style="visibility: hidden"><button type="button" id="btnSave" >${requestScope["ITEM.save"]}<%-- 저장 --%></button></span>
                    <span class="button gray"  style="visibility: hidden"><button type="button" id="btnDelt" >${requestScope["ITEM.delt"]}<%-- 삭제 --%></button></span>
                </div>
            </div>
        </div>
    </div>

    <div style="display: none">
        <form name="frmImportHdr">
            <input type="file" id="filImportHdr" />
        </form>
        <form name="frmImport">
            <input type="file" id="filImport" />
        </form>
        <select id="sltLangCode"></select>
    </div>
<!-- // contents -->

<%@ include file="../../epfse/system/tabFtr.jsp" %><%-- 탭 푸터 --%>