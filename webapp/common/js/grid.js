/*
--------------------------------------------------------------------------------
    PROJECT NAME : ES-MRV3
--------------------------------------------------------------------------------
    - 단위업무명 : 그리드 jQuery
    - 최초작성일 : 2014-06-13
    - 작  성  자 : 유광식
    - 비      고 : jQuery 를 include 해야 한다.

                   틀고정될 열의 너비는 px 단위로 입력한다.
                   search/searchItem() 사용시 해당 필드에 null 있으면 제대로 검색되지 않는다.
                   alwaysShowEditButton 설정은 데이터 바인딩 후 가능하다.
                   날짜 셀이 비어 있는 경우 F2 키를 입력하면 오늘날짜가 보이나 ENTER 키를 입력하면 사라진다.
                   indicator 열에 선택된 행이 표시되는데 데이터재바인딩시 남아있는 버그가 있다.
                   dataType 이 numeric 인 FIELD 값이 null 인 경우 EXCEL EXPORT 시 NaN 으로 출력된다.
                   그리드 셀 값 COPY(Ctrl+C) 시 NULL 로 조회된 경우 오류가 발생한다.

                   Column Grouping, Column Layout, Column Footer, Blank Cell, Merged Row Grouping,
                   Loading Policy, Get Values, Lazy Loading, Renderers, Series, Edit Buttons, Popup Menu
--------------------------------------------------------------------------------
*/

// 편집내용 COMMIT
//gfnCallGridFunc(g_strGridId, "commit()")
// 행 건수 가져오기
//gfnCallGridFunc(g_strGridId, "getItemCount()")
// 선택된 항목 인덱스 배열 가져오기
//gfnCallGridFunc(g_strGridId, "getCheckedItems()")
// 선택된 항목 수 가져오기
//gfnCallGridFunc(g_strGridId, "getCheckedItems().length")

// 틀고정 설정
//gfnCallGridFunc(g_strGridId, 'fixedOptions({ "rowCount": 2 })');
// 정렬
//gfnCallGridFunc(g_strGridId, 'orderBy([ "engName" ])');
// 항목 기준 셀 값 설정
//gfnCallGridFunc(g_strGridId, 'setValue(' + numItemIndex + ', 0, "' + KRN_NAME.toLowerCase() + '")');
// 선택행 컬럼 값 가져오기
//gfnGetGridChcRow(g_strGridId)["fieldName"]

// 그리드 초기화
/*function fnInitGrid()
{
    // FIELD 정보를 설정한다.
    var objFieldType = null; //{ "amt": { "dataType": "numeric" }, "date1": { "dataType": "datetime", "datetimeFormat": "yyyyMMdd" } };
    g_arrFieldName = "krnName|engNfrmltName|engName|rowId".split(Base.DELI1);

    gfnInitGrid(g_strGridId, "100%", "243", g_arrFieldName, objFieldType,
        {
            "pageId": "divPage" // 페이지 태그 ID
          , "columns": [
//
// ex.) 그룹핑
//				{ "header": { "text": "한글" }, "width": 400, "fieldName": "krnName"       } // 한글명
//			  , { "header": { "text": "영문" }, "width": 400, "type": "group", "columns": [
//						{ "header": { "text": "약식명" }, "width": 200, "fieldName": "engNfrmltName" } // 영문약식명
//					  , { "header": { "text": "정식명" }, "width": 200, "fieldName": "engName"       } // 영문명
//					] }
// ex.) 셀 병합
//			  , { "header": { "text": "영문정식명" }, "width": 40, "fieldName": "engName", "mergeRule": { "criteria": "value" } } // 영문명
//
                { "header": { "text": '${requestScope["ITEM.krnName"]}'       }, "width": 30, "fieldName": "krnName"       } // 한글명
              , { "header": { "text": '${requestScope["ITEM.engNfrmltName"]}' }, "width": 30, "fieldName": "engNfrmltName" } // 영문약식명
              , { "header": { "text": '${requestScope["ITEM.engName"]}'       }, "width": 40, "fieldName": "engName"       } // 영문명
            ]
          //, "displayOptions" :
                {
                    "focusVisible": false // 선택 컬럼 포커스 숨김
                }
          //, "options":
                //{
                  //, "checkBar": { "exclusive": true } // 선택열 라디오버튼 설정
                  //, "checkBar": { "visible": false } // 선택열 숨김
                  //, "display": { "columnMovable": true } // 열이동 활성
                  //, "edit": { "readOnly": true } // 읽기전용
                  //, "fixed": { "colCount": 2 } // 틀고정 cf.) 틀고정될 열의 너비는 px 단위로 입력한다.
                  //, "sorting": { "enabled": false } // 정렬 비활성
                //}
          //, "styles":
                {
                    // 선택행 스타일 변경.
                    "body": { "dynamicStyles": [ { "criteria": "checked", "styles": "background=" + g_objGridColumnColor.CHECKED } ] }
                }
        // 이벤트관련
          , "onload": function(strId) // 그리드 초기화 완료시..
                {
                    //alert("onload");
                }
          , "onloaddatacompleted": function(objDp) // 그리드 데이터 요청시 성공시..
                {
                    //alert("onloaddatacompleted");
                }
          , "onclickpage": fnInqr // 페이지 클릭시..
          , "onCellEdited": function(objGv, numItemIndex, numDataRow, numFieldIndex) // 셀 편집 완료시..
                {
                    //alert("onCellEdited : " + "(" + numItemIndex + ", " + numFieldIndex + ") / (" + numDataRow + ", " + numFieldIndex + ")");
                }
          , "onCurrentChanged": function(objGv, objCellIndex) // 포커스 변경시..
                {
                    //var objRow = gfnGetGridJsonRow(objGv, objCellIndex); if ( null == objRow ) objRow = null;
                    //for ( var strKey in objRow ) { alert('onCurrentChanged : { ' + strKey + ': ' + objRow[strKey] + ', ... }'); break; }
                    //objRow = null;
                }
          , "onRowInserted": function(objDp, numDataRow) // 행 삽입 완료시..
                {
                    //alert("onRowInserted : " + numDataRow);
                }
          , "onRowUpdated": function(objDp, numDataRow) // 행 수정 완료시..
                {
                    //alert("onRowUpdated : " + numDataRow);
                }
          , "onDataCellClicked": function(objGv, objCellIndex) //
                {
                    //objGv.checkRow(objCellIndex["dataRow"], true , true); // 체크
                }
          , "onDataCellDblClicked": function(objGv, objCellIndex) // 데이터 셀 더블클릭시..
                {
                    //var objRow = gfnGetGridJsonRow(objGv, objCellIndex); if ( null == objRow ) objRow = null;
                    //for ( var strKey in objRow ) { alert('onDataCellDblClicked : { ' + strKey + ': ' + objRow[strKey] + ', ... }'); break; }
                    //objRow = null;
                }
          , "onLinkableCellClicked": function(objGv, objCellIndex, strUrl) // URL 링크 클릭시..
                {
                }
        });

    objFieldType = null;
}*/

var Grid = { "FIGURE_BACKGROUND": "#777777", "FIGURE_INACTIVE_BACKGROUND": "#dddddd", "READ_ONLY_BACKGROUND": "#e6e6e6", "EDITABLE_BACKGROUND": "#ffd9ec" };
var g_arrGridColumnColor = ["#D0FA58", "#F3F781", "#9FF781", "#81F7F3", "#9F81F7", "#F781F3"];
var g_objGridColumnColor = { "AGG": "#848484", "CHECKED": "#EFF5FB" };
var g_objGridFontColor = { "AGG": "#FAFAFA" };
var g_objGridColumnStyle =
{
    "AGG" : { "foreground": g_objGridFontColor.AGG, "background" : g_objGridColumnColor.AGG, "textAlignment": "far", "numberFormat": "#,##0.000" }
}

var g_objRealGridInfo = { };

// Flash 가 embed 된 페이지에서 url에 hash(#)가 포함됐을 때 IE 에서 window.title 값이 바뀌는 문제 해결용..
if ( "Microsoft Internet Explorer" == browserName )
{
    var g_strOriginalTitle = document.title.split("#")[0];
    document.attachEvent('onpropertychange', function (evt)
        {
            if ( 'title' === evt.propertyName && document.title !== g_strOriginalTitle )
                setTimeout(function () { document.title = g_strOriginalTitle; }, 1);
        });
}

//==============================================================================
// 용도     : 그리드 행 추가
// 파라미터 : 1. strId  - ID
//            2. objRow - 행(선택)
// 리턴값   :
// 참고사항 : gfnInitGrid() 호출 후 사용한다.
// 기타     : 개발자 배포용
// 작성일자 : 2014-07-15
//------------------------------------------------------------------------------
function gfnAddGridRow(strId, objRow)
{
    var objGv = gfnGetGridView(strId); if ( null == objGv ) return;
    var objDp = objGv.getDataProvider();
    var obj = { };

    if ( null != objDp )
    {
        objGv.commit(); // 편집내용 COMMIT

        if ( null != objRow ) $.extend(true, obj, objRow);
        if ( null != objDp  ) objDp.addRow(obj); // 행을 추가한다.
    }

    obj = null; objDp = null; objGv = null;
}

//==============================================================================
// 용도     : 그리드 전체 행 함수 호출
// 파라미터 : 1. strId       - ID
//            2. numRowCount - 행 수
//            3. objFunc     - 함수
// 리턴값   : Object
// 참고사항 : gfnInitGrid() 호출 후 사용한다.
// 기타     : 개발자 배포용
// 작성일자 : 2014-06-19
//------------------------------------------------------------------------------
function gfnCallGridAllRowFunc(strId, numRowCount, objFunc)
{
    var objGv = gfnGetGridView(strId); if ( null == objGv ) return;
    for ( var numItemIndex = 0 ; numItemIndex < numRowCount ; numItemIndex++ ) objFunc(objGv, numItemIndex);
    objGv = null;
}

//==============================================================================
// 용도     : 그리드 선택 행 함수 호출
// 파라미터 : 1. strId   - ID
//            2. objFunc - 함수
// 리턴값   : Object
// 참고사항 : gfnInitGrid() 호출 후 사용한다.
// 기타     : 개발자 배포용
// 작성일자 : 2014-06-13
//------------------------------------------------------------------------------
function gfnCallGridChcRowFunc(strId, objFunc)
{
    var blnOutpt = false;

    var objGv = gfnGetGridView(strId);
    var objDp = ( null != objGv ? objGv.getDataProvider() : null );

    if ( null != objDp )
    {
        var arrItemIndex = objGv.getCheckedItems(), LNGTH = arrItemIndex.length;
        var numItemIndex, numDataRow;

        blnOutpt = true;

        for ( var num = 0 ; num < LNGTH ; num++ )
        {
            numItemIndex = arrItemIndex[num], numDataRow = objGv.getRowId(numItemIndex);
            blnOutpt = objFunc(objGv, objDp.getJsonRows(numDataRow, numDataRow)[0], numItemIndex);
            if ( !blnOutpt ) break;
        }

        arrItemIndex = null; objDp = null;
    }

    objGv = null;

    return blnOutpt;
}

//==============================================================================
// 용도     : 그리드 함수 호출
// 파라미터 : 1. strId   - ID
//            2. strEval - EVAL
// 리턴값   : Object
// 참고사항 :
// 기타     : 개발자 배포용
// 작성일자 : 2014-06-13
//------------------------------------------------------------------------------
function gfnCallGridFunc(strId, strEval)
{
    var obj = null;

    var objGv = gfnGetGridView(strId);

    if ( null != objGv )
    {
        try { eval("obj = objGv." + strEval); } catch ( ectTmp ) { }
        objGv = null;
    }

    return obj;
}

//==============================================================================
// 용도     : 그리드 정리
// 파라미터 : strId - ID
// 리턴값   :
// 참고사항 : gfnInitGrid() 호출 후 사용한다.
//            행이 기존에 존재하고 FOCUS 가 설정된 상태에서 clearRows() 함수를 호출하면 onCurrentChanged 이벤트가 발생한다.
// 기타     : 개발자 배포용
// 작성일자 : 2014-06-13
//------------------------------------------------------------------------------
function gfnClearGrid(strId)
{
    var objGv = gfnGetGridView(strId); if ( null == objGv ) return;
    var objDp = objGv.getDataProvider();
    //alert("objDp : "+objDp+", objGv : "+objGv+", strId : "+strId);

    objGv.orderBy([ ]); // 열정렬을 초기화한다.
    objGv.cancel(); // 편집모드를 취소한다.

    if ( null != objDp )
    {
        var PAGE_ID = g_objRealGridInfo[strId]["pageId"];
        //alert("PAGE_ID : "+PAGE_ID); // divPage

        // 그리드 열 필터를 정리한다.
        gfnSetGridColList(strId); // 그리드 열 목록 설정
        //alert("gfnSetGridColList(strId) : "+gfnSetGridColList(strId));
        if ( !gfnIsEmpty(PAGE_ID) && PAGE_ID in window )
        {
            gfnSetHtml($("#" + PAGE_ID + ">div:first-child").get(0), Base.EMPTYSTR);
            $('#' + PAGE_ID + ' [name="page"]').val(1);
        }

        objDp.clearRows(); // 행을 모두 정리한다.
    }

    objDp = null; objGv = null;
}

//==============================================================================
// 용도     : 그리드 셀 FOCUS
// 파라미터 : 1. strId         - ID
//            2. numItemIndex  - 데이터 행
//            3. strFieldName  - fieldName(선택)
//            4. objFunc       - 함수(선택)
// 리턴값   :
// 참고사항 : gfnInitGrid() 호출 후 사용한다.
// 기타     : 개발자 배포용
// 작성일자 : 2014-06-25
//------------------------------------------------------------------------------
function gfnFocusGridCell(strId, numItemIndex, strFieldName, objFunc)
{
    var objGv = gfnGetGridView(strId); if ( null == objGv ) return;
    gfnShowGridCellEditor(objGv, numItemIndex, strFieldName, objFunc, false); // 그리드 셀 포커스
    objGv = null;
}

//==============================================================================
// 용도     : 그리드 선택 열 값 가져오기
// 파라미터 : 1. strId        - ID
//            2. strFieldName - fieldName
//            3. blnIncludeEmptyStr - 빈 문자열 포함(선택)
//            3. objFunc      - 함수(선택)
// 리턴값   : Array
// 참고사항 : gfnInitGrid() 호출 후 사용한다.
//            셀 값에 | 이 포함된 경우 " " 로 대체한다.
// 기타     : 개발자 배포용
// 작성일자 : 2014-06-13
//------------------------------------------------------------------------------
function gfnGetGridChcColValue(strId, strFieldName, blnIncludeEmptyStr, objFunc, blnChecked)
{
    if ( null == blnIncludeEmptyStr ) blnIncludeEmptyStr = true;
    if ( null == blnChecked ) blnChecked = true;

    var arrOutpt = new Array(), numIndex = -1;

    var objGv = gfnGetGridView(strId);
    var objDp = objGv.getDataProvider();

    if ( null != objGv && null != objDp )
    {
        var DATETIME =
            ( null != g_objRealGridInfo[strId]["fieldTypeList"] &&
              null != g_objRealGridInfo[strId]["fieldTypeList"][strFieldName] &&
              "datetime" == g_objRealGridInfo[strId]["fieldTypeList"][strFieldName]["dataType"] ); // 일자여부

        var arrFieldValues = objDp.getFieldValues(strFieldName, 0);
        var arrItemIndex = ( blnChecked ? objGv.getCheckedItems() : (function() { var arrOutpt = new Array(objGv.getItemCount()), LNGTH = arrOutpt.length; for ( var num = 0 ; num < LNGTH ; num++ ) { arrOutpt[num] = num; } return arrOutpt; })() ), LNGTH = arrItemIndex.length;
        var objValue, numDataRow;

        if ( null == objFunc )
        {
            if ( DATETIME )
            {
                for ( var num = 0 ; num < LNGTH ; num++ )
                {
                    numDataRow = objGv.getRowId(arrItemIndex[num]);
                    objValue = arrFieldValues[numDataRow]; if ( !blnIncludeEmptyStr && gfnIsEmpty(objValue) ) continue;

                    if ( null != objValue ) objValue = gfnGetGriDateStr(objValue);
                    arrOutpt[++numIndex] = objValue;
                }
            } else
            {
                for ( var num = 0 ; num < LNGTH ; num++ )
                {
                    numDataRow = objGv.getRowId(arrItemIndex[num]);
                    objValue = arrFieldValues[numDataRow]; if ( !blnIncludeEmptyStr && gfnIsEmpty(objValue) ) continue;

                    if ( null != objValue ) objValue = objValue.toString().replace(/\|/g, " ");
                    arrOutpt[++numIndex] = objValue;
                }
            }
        } else
        {
            for ( var num = 0 ; num < LNGTH ; num++ )
            {
                numDataRow = objGv.getRowId(arrItemIndex[num]);
                objValue = arrFieldValues[numDataRow]; if ( !blnIncludeEmptyStr && gfnIsEmpty(objValue) ) continue;

                arrOutpt[++numIndex] = objFunc(objValue);
            }
        }

        arrItemIndex = null; arrFieldValues = null; objDp = null; objGv = null;
    }

    return arrOutpt;
}

//==============================================================================
// 용도     : 그리드 비교 열 값 가져오기
// 파라미터 : 1. strId - ID
//            2. strComprFieldName - fieldName
//            3. strComprValue - String
//            4. strTargFieldName - fieldName
//            5. blnSameYn - boolean
// 리턴값   : String
//            예) 1|1|1|524|234|724|235|524|824|234|624|5345|7345|545|834|934|32
// 참고사항 : gfnInitGrid() 호출 후 사용한다.
//
// 기타     : 개발자 배포용
// 작성일자 : 2014-06-23
//------------------------------------------------------------------------------
function gfnGetGridColValCompr(strId, strComprFieldName, strComprValue, strTargFieldName, blnSameYn)
{
    var strOutpt = Base.EMPTYSTR;
    var arrOutpt = new Array(), numIndex = -1;
    if ( null == blnSameYn ) blnSameYn = true;

    var objGv = gfnGetGridView(strId);
    var objDp = objGv.getDataProvider();

    if ( null != objGv && null != objDp )
    {
        var arrComprFieldValues = objDp.getFieldValues(strComprFieldName, 0);
        var  arrTargFieldValues = objDp.getFieldValues(strTargFieldName, 0);

        var LNGTH = arrComprFieldValues.length;

        for ( var num = 0 ; num < LNGTH ; num++ )
        {
            strComprFieldValue = arrComprFieldValues[num];

            if ( blnSameYn == (strComprValue == strComprFieldValue) )
            {
                arrOutpt[++numIndex] = arrTargFieldValues[num];
            }
        }

        strOutpt = arrOutpt.join(Base.DELI1);
    }

    arrOutpt = null; objGv = null; objDp = null;

    return strOutpt;
}

//==============================================================================
// 용도     : 그리드 비교 행 인덱스 가져오기
// 파라미터 : 1. strId - ID
//            2. strComprFieldName - fieldName
//            3. strComprValue - String
//            4. blnSameYn - boolean
// 리턴값   : Array
//            예) [0, 1, 2, 4, 5, 6, 10, 14]
// 참고사항 : gfnInitGrid() 호출 후 사용한다.
//
// 기타     : 개발자 배포용
// 작성일자 : 2014-06-23
//------------------------------------------------------------------------------
function gfnGetGridRowIndexCompr(strId, strComprFieldName, strComprValue, blnSameYn)
{
    var arrOutpt = new Array(), numIndex = -1;
    if ( null == blnSameYn ) blnSameYn = true;

    var objGv = gfnGetGridView(strId);
    var objDp = objGv.getDataProvider();

    if ( null != objGv && null != objDp )
    {
        var arrComprFieldValues = objDp.getFieldValues(strComprFieldName, 0);

        var LNGTH = arrComprFieldValues.length;

        for ( var num = 0 ; num < LNGTH ; num++ )
        {
            strComprFieldValue = arrComprFieldValues[num];

            if ( blnSameYn == (strComprValue == strComprFieldValue))
            {
                arrOutpt[++numIndex] = num;
            }
        }
    }
    objGv = null; objDp = null;

    return arrOutpt;
}

//==============================================================================
// 용도     : 그리드 선택 행 가져오기
// 파라미터 : strId - ID
// 리턴값   :
// 참고사항 : gfnInitGrid() 호출 후 사용한다.
// 기타     : 개발자 배포용
// 작성일자 : 2014-06-23
//------------------------------------------------------------------------------
function gfnGetGridChcRow(strId)
{
    var objGv = gfnGetGridView(strId); if ( null == objGv ) return;
    var objDp = objGv.getDataProvider();

    var objOutpt = Base.EMPTYSTR;

    if ( null != objDp )
    {
        var DATA_ROW = objGv.getCurrent().dataRow;

        if ( null != DATA_ROW && 0 <= DATA_ROW )
            objOutpt = objDp.getJsonRows(DATA_ROW, DATA_ROW)[0];
    }

    objDp = null; objGv = null;

    return objOutpt;
}

//==============================================================================
// 용도     : 그리드 열 FILTER 가져오기
// 파라미터 : 1. arrData - 데이터(선택)
//            2. strKey  - KEY
// 리턴값   :
// 참고사항 : gfnInitGrid() 호출 후 사용한다.
// 기타     : 개발자 배포용
// 작성일자 : 2014-06-17
//------------------------------------------------------------------------------
function gfnGetGridColFilter(arrData, strKey)
{
    var arrOutpt = null, numIndex = -1, LNGTH = ( null != arrData ? arrData.length : 0 );

    if ( 0 < LNGTH && !gfnIsEmptySpace(strKey) )
    {
        var objRow, objValue, strValue, arrDup = new Array(), numIndex2 = -1;

        arrOutpt = new Array();

        arrOutpt[++numIndex] = { "name": "(empty)"    , "criteria": "value is empty"     };
        arrOutpt[++numIndex] = { "name": "(not empty)", "criteria": "value is not empty" };

        for ( var num = 0 ; num < LNGTH ; num++ )
        {
            objRow = arrData[num]; objValue = objRow[strKey];

            if ( !gfnIsEmptySpace(objValue) )
            {
                strValue = objValue.toString();

                if ( 0 > (Base.DELI1 + arrDup.join(Base.DELI1) + Base.DELI1).indexOf(Base.DELI1 + strValue + Base.DELI1) )
                {
                    arrDup[++numIndex2] = strValue; strValue = strValue.replace(/['"]/g, "");
                    if ( !gfnIsEmptySpace(strValue) )
                        arrOutpt[++numIndex] = { "name": strValue, "criteria": 'value = "' + strValue + '"' };
                }
            }
        }

        arrDup = null; objValue = null; objRow = null;
    }

    return arrOutpt;
}

//==============================================================================
// 용도     : 그리드 FORM 데이터 가져오기
// 파라미터 : 1. strId        - ID
//            2. arrFieldList - FIELD 목록
// 리턴값   :
// 참고사항 : gfnInitGrid() 호출 후 사용한다.
// 기타     : 개발자 배포용
// 작성일자 : 2014-06-18
//------------------------------------------------------------------------------
function gfnGetGridFormData(strId, arrFieldList, blnChecked)
{
    var arrOutpt = new Array(), numIndex = -1;

    var LNGTH = ( null != arrFieldList ? arrFieldList.length : 0 );
    var arr = new Array(1);

    for ( var num = 0 ; num < LNGTH ; num++ )
    {
        arr[0] = arrFieldList[num];
        arr[1] = encodeURIComponent(gfnGetGridChcColValue(strId, arrFieldList[num], null, null, blnChecked).join(Base.DELI1));

        arrOutpt[++numIndex] = arr.join(Base.EQUAL);
    }

    arr = null;

    return arrOutpt.join(Base.AND);
}
function gfnGetGridJsonFormData(strId, arrFieldList, blnChecked)
{
    var objOutpt = { };

    var LNGTH = ( null != arrFieldList ? arrFieldList.length : 0 );

    for ( var num = 0 ; num < LNGTH ; num++ )
        objOutpt[arrFieldList[num]] = gfnGetGridChcColValue(strId, arrFieldList[num], null, null, blnChecked).join(Base.DELI1);

    return objOutpt;
}

//==============================================================================
// 용도     : 그리드 JSON 행 가져오기
// 파라미터 : 1. objGv        - GRID VIEW
//            2. objCellIndex - 셀 인덱스
// 리턴값   :
// 참고사항 : gfnInitGrid() 호출 후 사용한다.
// 기타     : 개발자 배포용
// 작성일자 : 2014-06-18
//------------------------------------------------------------------------------
function gfnGetGridJsonRow(objGv, objCellIndex)
{
    var objOutpt = null;
    var objDp = objGv.getDataProvider(); if ( null == objDp ) return;
    var DATA_ROW = objCellIndex["dataRow"]; if ( null == DATA_ROW || 0 > DATA_ROW ) return;
    var objJsonRows = objDp.getJsonRows(DATA_ROW, DATA_ROW);
    if ( null == objJsonRows || 0 >= objJsonRows.length ) return;
    objOutpt = objJsonRows[0];
    objJsonRows = null; objDp = null;
    return objOutpt;
}

//==============================================================================
// 용도     : 그리드 VIEW 가져오기
// 파라미터 : strId - ID
// 리턴값   : Object
// 참고사항 : gfnInitGrid() 호출 후 사용한다.
// 기타     : 개발자 배포용
// 작성일자 : 2014-06-13
//------------------------------------------------------------------------------
function gfnGetGridView(strId)
{
    var objOutpt;

    if ( g_objRealGridInfo[strId]["type"] == Base.GRID )
        objOutpt = g_objRealGridInfo[strId]["gridView"];
    else
    if ( g_objRealGridInfo[strId]["type"] == Base.TREE )
        objOutpt = g_objRealGridInfo[strId]["treeView"];
    return objOutpt;
}

//==============================================================================
// 용도     : 그리드 EXCEL 데이터 IMPORT
// 파라미터 : 1. strId        - ID
//            2. strFilePath  - 파일 경로
//            3. arrFieldList - FIELD 목록
//            4. objFunc      - 함수(선택)
// 리턴값   :
// 참고사항 : gfnInitGrid() 호출 후 사용한다.
//            엑셀A열 -> arrFieldList[0], 엑셀B열 -> arrFieldList[1], ... 순으로 데이터를 LOAD 한다.
// 기타     : 개발자 배포용
// 작성일자 : 2014-06-17
//------------------------------------------------------------------------------
function gfnImportGridExcelData(strId, strFilePath, arrFieldList, objFunc, objBforeFunc)
{
    var objGv = gfnGetGridView(strId); if ( null == objGv ) return;
    var arr = null;

    gfnDispPgbar();
    gfnClearGrid(strId); // 그리드 정리
    arr = gfnGetGridExcelData(strFilePath); // 그리드 EXCEL 데이터 가져오기

    var ROW_COUNT = gfnGetInt(arr[0]), COL_COUNT = gfnGetInt(arr[1]);
    var FIELD_LNGTH = ( null != arrFieldList ? arrFieldList.length : 0 );

    if ( 0 < ROW_COUNT && 0 < COL_COUNT && 0 < FIELD_LNGTH )
    {
        var MAX_COL = ( COL_COUNT < FIELD_LNGTH ? COL_COUNT : FIELD_LNGTH );

        var arrRows = new Array(ROW_COUNT - 1 /* 첫번째 행을 제외한다. */), numIndex = -1;
        var num, num2, objRow;

        for ( num = 0 ; num < ROW_COUNT - 1 ; num++ )
        {
            objRow = { };

            for ( num2 = 0 ; num2 < MAX_COL ; num2++ )
                objRow[arrFieldList[num2]] = arr[2][ROW_COUNT * num2 + num + 1 ]; // 첫번째 행을 제외한다.

            arrRows[++numIndex] = objRow;
        }

        if ( null != objBforeFunc ) arrRows = objBforeFunc(arrRows, g_objRealGridInfo[strId]["fieldTypeList"]);

        gfnBindGrid(strId, arrRows); // 그리드 바인딩
        objGv.checkAll(true);

        objRow = null; arrRows = null;

        if ( null != objFunc ) objFunc(objGv);
    }

    gfnHidePgbar();

    arr = null; objGv = null;
}

//==============================================================================
// 용도     : 그리드 초기화
// 파라미터 : 1. strId        - ID
//            2. arrFieldList - FIELD 목록
//            3. objFieldTypeList - FIELD 유형 목록
//            4. objInfo      - 정보
// 리턴값   :
// 참고사항 : 업무화면 ready 이벤트핸들러 함수에서 호출한다.
// 기타     : 개발자 배포용
// 작성일자 : 2014-07-23
//------------------------------------------------------------------------------
function gfnInitGrid(strId, arrFieldList, objFieldTypeList, strType, objInfo)
{
    var obj = g_objRealGridInfo[strId];
    if ( strType == null ) strType = Base.GRID;

    if ( null == obj ) obj = { };

    $.extend(true, obj,
        {
            "fieldList": arrFieldList
          , "fieldTypeList": objFieldTypeList
          , "search": { "fieldIndex": null, "itemIndex": null, "word": null }
          , "options":
                {
                    "display": { "columnMovable": false, "fitStyle": "even" }
                  , "edit": { "enterToNextRow": true }
                  , "sorting": { "style": "inclusive" } // 정렬
                  ,
                    "checkBar": { "width": 40 } // 선택 열
                  , "indicator": { "visible": false } // 행번호 열
                  , "stateBar": { "visible": false } // 행편집상태 열
                  ,
                    "footer": { "visible": false } // 푸터 영역
                  , "panel": { "visible": false } // 상단 그룹핑 영역
                }
          , "treeOptions" :
          {
                "expanderWidth" : 40
          }
          , "selectStyles" :
                {
                    "style": "none" // block, rows, columns, singleRow, singleColumn, none
                }
          , "styles":
                {
                    "body": { "fontFamily": "dotum" }
                  , "header":
                        {
                            "background": "#dddddd", "fontFamily": "dotum"
                          , "group": { "background": "#dddddd", "fontFamily": "dotum" }
                          , "hoveredBackground": "#888888", "hoveredForeground": "#000000"
                        }
                  , "fixed": { "background": "#ffffff", "fontFamily": "dotum" }
                  , "selection" :
                        {
                            "background" : "#18ff8800"
                          , "border" : "#ccff8800,2"
                        }
                }
          , "type" : strType
        });

    if ( null != objInfo ) $.extend(true, obj, objInfo);

    g_objRealGridInfo[strId] = obj;

    obj = null;

    if ( strType == Base.GRID )
        setupGrid(strId, "100%", $("#" + strId).css("height")); // 그리드 초기화
    else
    if ( strType == Base.TREE )
        setupTree(strId, "100%", $("#" + strId).css("height")); // 그리드 트리 초기화
}

//==============================================================================
// 용도     : 그리드 요청
// 파라미터 : 1. strId         - ID
//            2. strUri        - URI
//            3. objData       - 데이터(선택)
//            4. objFunc       - 함수(선택)
// 리턴값   :
// 참고사항 : gfnInitGrid() 호출 후 사용한다.
//            objData 는 JSON Object 는 가능하다.
//            데이터가 존재하지 않을 때 실행할 코드는 는 오류콜백에 작성한다.
// 기타     : 개발자 배포용
// 작성일자 : 2014-06-19
//------------------------------------------------------------------------------
function gfnReqGrid(strId, strUri, objData, objFunc)
{
    if ( Base.NO == gfnCheckLogin() ) { gfnDispMsg(Base.msgLoginNeed); gfnMovePage("/", false); };

    var objGv = gfnGetGridView(strId); if ( null == objGv ) return;
    var objDp = objGv.getDataProvider();
    var strTitle = document.title;

    if ( null != objDp )
    {
        var PAGE_ID = g_objRealGridInfo[strId]["pageId"];

        gfnDispPgbar();

        var objParams = { };
        if ( "divComParamContnr" in window )
            $.extend(true, objParams, gfnGetJsonFormData("divComParamContnr"));
        if ( !gfnIsEmptySpace(PAGE_ID) && PAGE_ID in window )
            $.extend(true, objParams, gfnGetJsonFormData(PAGE_ID));
        if ( null != objData )
            $.extend(true, objParams, objData);

        var strContextPath = $("#hidComParamContextPatch").val();

        if (Base.EMPTYSTR != strContextPath) strUri = strContextPath + strUri;

        objDp.loadData( // 데이터 LOAD
            {
                "url": strUri
              , "method": "post"
              , "params": objParams
              , "rows": Base.RSLT_LIST
            }
          , function(objDp)
                {
                    var arrRows = objDp.getJsonRows(0, -1);

                    if ( !gfnIsEmpty(PAGE_ID) && PAGE_ID in window )
                        gfnBindGridPage(strId, PAGE_ID, arrRows);

                    arrRows = null;

                    gfnHidePgbar();

                    if ( 0 < $("#" + strId + ":visible").length )
                    {
                        var objGv = gfnGetGridView(strId); if ( null == objGv ) return;

                        var blnFocus = g_objRealGridInfo[strId]["options"].focus;
                        if ( blnFocus != false ) objGv.setFocus();
                        objGv = null;
                    }

                    if ( null != g_objRealGridInfo[strId]["onloaddatacompleted"] ) g_objRealGridInfo[strId]["onloaddatacompleted"](objDp);

                    // Flash 가 embed 된 페이지에서 url에 hash(#)가 포함됐을 때 IE 에서 window.title 값이 바뀌는 문제 해결용..
                    document.title = strTitle;

                    parent.setResize(); // 화면 사이즈 조정

                    if ( null != objFunc ) objFunc(objDp);
                }
          , function(objDp, strMsg)
                {
                    gfnHidePgbar();
                }
        );

        objParams = null;
    }

    objDp = null; objGv = null;
}

//==============================================================================
// 용도     : 그리드 트리 바인딩
// 파라미터 : 1. strId         - ID
//            2. objData       - 데이터
// 리턴값   :
// 참고사항 : gfnInitGrid() 호출 후 사용한다.
// 기타     : 개발자 배포용
// 작성일자 : 2014-11-06
// 작성자   : 문금환
//------------------------------------------------------------------------------
function gfnBindGridTree(strId, objData)
{
    var objGv = gfnGetGridView(strId); if ( null == objGv ) return;
    var objDp = objGv.getDataProvider();

    var objJson = $.parseJSON(gfnGetJsonValue(objData, [Base.RSLT_INFO]));

    objDp.setJsonRows(objJson, Base.ROWS);

    var numExpandDepth = g_objRealGridInfo[strId]["treeExpandDepth"];

    // gfnExpandGridTree(strId, 0, numExpandDepth);

    objGv.expandAll();
}

function gfnBindGridTreeJSON(strId, objData)
{
    var objGv = gfnGetGridView(strId); if ( null == objGv ) return;
    var objDp = objGv.getDataProvider();

    var objJson = $.parseJSON(objData[Base.RSLT_INFO]["gridTreeJSON"]);

    objDp.setJsonRows(objJson, Base.ROWS);

    var numExandDepth = g_objRealGridInfo[strId]["treeExpandDepth"];

    //gfnExpandGridTree(strId, numExandDepth);

    objGv.expandAll();
}

// 그리드 업데이트 후 재수정 필요함.
function gfnExpandGridTree(strId, numExpandDepth, numRowId)
{
    var objGv = gfnGetGridView(strId); if ( null == objGv ) return;

    if ( null == numRowId ) numRowId = -1 ;

    if ( numExpandDepth >= 1 )
    {
        var arrRowsIndex = objGv.getChildren(numRowId);
        for ( key in arrRowsIndex) {

            objGv.expand(objGv.getItemIndex(arrRowsIndex[key]));

            if (numExpandDepth > 1)
            {
                gfnExpandGridTree(strId, numExpandDepth - 1, arrRowsIndex[key]);
            }
        }
    }
}

//==============================================================================
// 용도     : 그리드 셀 FOCUS 설정
// 파라미터 : 1. strId         - ID
//            2. numItemIndex  - 데이터 행
//            3. strFieldName  - fieldName(선택)
//            4. objFunc       - 함수(선택)
// 리턴값   :
// 참고사항 : gfnInitGrid() 호출 후 사용한다.
// 기타     : 개발자 배포용
// 작성일자 : 2014-06-13
//------------------------------------------------------------------------------
function gfnSetGridCellFocus(strId, numItemIndex, strFieldName, objFunc)
{
    var objGv = gfnGetGridView(strId); if ( null == objGv ) return;
    gfnShowGridCellEditor(objGv, numItemIndex, strFieldName, objFunc); // 그리드 셀 포커스
    objGv = null;
}

//==============================================================================
// 용도     : 그리드 셀 열 목록 설정
// 파라미터 : 1. strId      - ID
//            2. blnClone   - CLONE(선택)
//            3. arrColList - 열 목록(선택)
// 리턴값   :
// 참고사항 : gfnInitGrid() 호출 후 사용한다.
// 기타     : 개발자 배포용
// 작성일자 : 2014-06-17
//------------------------------------------------------------------------------
function gfnSetGridColList(strId, blnClone, arrColList)
{
    if ( null == blnClone ) blnClone = false;

    var objGv = gfnGetGridView(strId); if ( null == objGv ) return;
    //alert("objGv : "+objGv); //object Object
    var arr = null;

    if ( blnClone ) { arr = new Array(); $.extend(true, arr, g_objRealGridInfo[strId]["columns"]); }
    else            { arr = g_objRealGridInfo[strId]["columns"]; }
    if ( null != arrColList ) $.extend(true, arr, arrColList);
    //alert(blnClone); //false
    //alert(arr);
    objGv.setColumns(arr);
    //alert(objGv.setColumns(arr)); //undifine
    arr = null; objGv = null;
}

//==============================================================================
// 용도     : 그리드 행 검증
// 파라미터 : 1. objGv        - GRID VIEW
//            2. objRow       - 행
//            3. numItemIndex - 항목 인덱스
//            4. arrInfo      - 정보
// 리턴값   :
// 참고사항 : gfnInitGrid() 호출 후 사용한다.
// 기타     : 개발자 배포용
// 작성일자 : 2014-06-19
//------------------------------------------------------------------------------
function gfnVerifGridRow(objGv, objRow, numItemIndex, arrInfo)
{
    var LNGTH = arrInfo.length;
    for ( var num = 0 ; num < LNGTH ; num++ )
        if ( !gfnVerifGridCellValue(objGv, objRow, numItemIndex, arrInfo[num]) ) return false;
    return true;
}


//==============================================================================
// 용도     : 그리드 저장 행 FOCUS
// 파라미터 : 1. strId    - ID
//            2. strRowId - 행ID
//            3. strFocusFieldName - FOCUS FIELD 명
//            3. strRowIdFieldName - 행ID FIELD 명(선택)
// 리턴값   :
// 참고사항 : gfnInitGrid() 호출 후 사용한다.
// 기타     : 개발자 배포용
// 작성일자 : 2014-07-16
//------------------------------------------------------------------------------
function gfnFocusGridSaveRow(strId, strRowId, strFocusFieldName, strRowIdFieldName)
{
    var objGv = gfnGetGridView(strId); if ( null == objGv ) return;
    var objDp = objGv.getDataProvider();

    if ( gfnIsEmpty(strRowId) ) return;
    if ( null == strRowIdFieldName ) strRowIdFieldName = "rowId";

    if ( null != objDp )
    {
        var ITEM_COUNT = objGv.getItemCount();

        for ( var num = 0 ; num < ITEM_COUNT ; num++ )
        {
            if ( strRowId == objGv.getValue(num, strRowIdFieldName) )
                { gfnFocusGridCell(strId, num, strFocusFieldName); break; }
        }

        objDp = null;
    }

    objGv = null;
}

//==============================================================================
// 용도     : 그리드 컬럼 콤보 변경
// 파라미터 : 1. strId      - ID
//            2. strColumnId   - 열 ID
//            3. arrValue   - 값 목록
//            4. arrLabel   - 라벨 목록
// 리턴값   :
// 참고사항 : gfnInitGrid() 호출 후 사용한다.
// 기타     : 개발자 배포용
// 작성일자 : 2014-10-23
// 작성자   : 문금환
//------------------------------------------------------------------------------
function gfnChangeGridColCombo(strId, strColumnId, arrValue, arrLabel)
{
    var objGv = gfnGetGridView(strId); if ( null == objGv ) return;

    var objColumn = objGv.columnByField(strColumnId);

    objColumn.values = arrValue;

    objColumn.labels = arrLabel;

    objGv.setColumn(objColumn);

    objGv = null; objColumn = null;
}

//==============================================================================
// 용도     : 그리드 컬럼 색상 변경
// 문법     : gfnChangeGridColColor(strId As String, objColumnId As Object, objColor As Object)
// 파라미터 : 1. strId        - ID       (필수)
//            2. objColumnId  - 열 ID    (필수)
//            3. objColor     - 색상코드 (선택)
// 예제     : 1. gfnChangeGridColColor("strGridId", "strColumnId"); // 기본색상 설정
//            2. gfnChangeGridColColor("strGridId", "strColumnId", "#d0f5a9"); // 색상 설정
//            3. gfnChangeGridColColor("strGridId", "strColumnId", 0); // 색상 설정
//            4. gfnChangeGridColColor("strGridId", "strColumnId1|strColumnId2".split(Base.DELI1)); // 기본색상 설정
//            5. gfnChangeGridColColor("strGridId", "strColumnId1|strColumnId2".split(Base.DELI1), "#d0f5a9"); // 색상 설정
//            6. gfnChangeGridColColor("strGridId", "strColumnId1|strColumnId2".split(Base.DELI1), "#d0f5a9|#9ff781".split(Base.DELI1)); // 색상 설정
//            7. gfnChangeGridColColor("strGridId", "strColumnId1|strColumnId2".split(Base.DELI1), ["#d0f5a9", "#9ff781"]); // 색상 설정
//            8. gfnChangeGridColColor("strGridId", "strColumnId1|strColumnId2".split(Base.DELI1), [ 0, 1 ]); // 색상 설정
//            8. gfnChangeGridColColor("strGridId", "strColumnId1|strColumnId2".split(Base.DELI1), [ "#d0f5a9", 1 ]); // 색상 설정
// 리턴값   :
// 참고사항 : gfnInitGrid() 호출 후 사용한다.
// 기타     : 개발자 배포용
// 작성일자 : 2014-10-30
// 작성자   : 문금환
//------------------------------------------------------------------------------
function gfnChangeGridColColor(strId, objColumnId, objColor)
{
    var objGv = gfnGetGridView(strId); if ( null == objGv ) return;
    var strColor = Base.EMPTYSTR;
    var strColorType = "string" ;
    var objColumn;
    var obj;

    // 색상 설정
    if ( objColor == null ) strColor = "#d0f5a9";
    else
    if ( typeof objColor == "string" )
    {
        strColor = objColor;
    }
    else
    if ( typeof objColor == "number" )
    {
        if ( objColor <= g_arrGridColumnColor.length )
        {
            strColor = g_arrGridColumnColor[objColor];
        }
    }
    else
    if ( typeof objColor == "object" )
    {
        if ( $.isArray(objColor) )
        {
            if ( objColor.length == 0 ) strColor = "#d0f5a9";
            else
            if ( objColor.length == 1 ) strColor = objColor;
            else                        strColorType = "array" ;
        }
    }

    // 컬럼 설정
    if ( typeof objColumnId == "string" )
    {
        objColumn = objGv.columnByField(objColumnId);
              obj = { "styles": { "background": strColor } };

        $.extend(objColumn, obj); objGv.setColumn(objColumn);

        objColumn = null; obj = null;
    }
    else
    if ( typeof objColumnId == "object" )
    {
        var LNGTH = objColumnId.length;

        for ( var numIndex = 0; numIndex < LNGTH; numIndex++)
        {
            objColumn = objGv.columnByField(objColumnId[numIndex]);
                  obj = { "styles": { "background": ( strColorType == "string" ? strColor : ( typeof objColor[numIndex] == "string" ? objColor[numIndex] : g_arrGridColumnColor[objColor[numIndex]]) ) } };

            $.extend(objColumn, obj); objGv.setColumn(objColumn);

            objColumn = null; obj = null;
        }
    }

    objGv = null; ;
}

//==============================================================================
// 용도     : 그리드 컬럼 가시 변경
// 파라미터 : 1. strId        - ID
//            2. objColumnId  - 열 ID
//            3. blnVsble     - 가시
// 리턴값   :
// 참고사항 : gfnInitGrid() 호출 후 사용한다.
// 기타     : 개발자 배포용
// 작성일자 : 2014-11-04
// 작성예시 : gfnChangeGridColVsble(g_strGridId, "lcofcName|cnterName|bsnssId".split(Base.DELI1), false);
// 작성자   : 문금환
//------------------------------------------------------------------------------
function gfnChangeGridColVsble(strId, objColumnId, blnVsble)
{
    if ( blnVsble == null ) blnVsble = true;

    var objGv = gfnGetGridView(strId); if ( null == objGv ) return;
    var objColumn;

    if ( typeof objColumnId == "string" )
    {
        objColumn = objGv.columnByField(objColumnId);

        objGv.setColumnProperty(objColumn, "visible", blnVsble);

        objColumn = null;
    }
    else
    if ( typeof objColumnId == "object" )
    {
        var LNGTH = objColumnId.length;

        for ( var numIndex = 0; numIndex < LNGTH; numIndex++)
        {
            objColumn = objGv.columnByField(objColumnId[numIndex]);

            if ( null == objColumn ) objColumn = objGv.columnByTag(objColumnId[numIndex]);

            objGv.setColumnProperty(objColumn, "visible", blnVsble);

            objColumn = null;
        }
    }

    objGv = null;
}

//==============================================================================
// 용도     : 그리드 행 컬럼 스타일 변경
// 파라미터 : 1. strId        - ID
//            2. objRowId     - 행ID
//            3. objColumnId  - 열 ID
//            4. blnEditable  - 편집가능여부
//            4. strStyleId   - 스타일ID
// 리턴값   :
// 참고사항 : gfnInitGrid() 호출 후 사용한다.
// 기타     : 개발자 배포용
// 작성일자 : 2014-11-11
// 작성자   : 문금환
//------------------------------------------------------------------------------
function gfnChangeGridRowColStyle(strId, objRowId, objColumnId, blnEditable, strStyleId)
{
    if ( blnEditable == null ) blnEditable = true;
    if ( strStyleId  == null ) strStyleId  = "readOnly";

    var objGv = gfnGetGridView(strId); if ( null == objGv ) return;

    if ( typeof objColumnId == "object" )
    {
        if ( $.isArray(objColumnId) )
        {
            for ( var numIndex = 0; numIndex < objColumnId.length; numIndex++ )
            {
                objGv.setCellStyles(objRowId, objColumnId[numIndex], strStyleId);
            }
        }
    } else
    if ( typeof objColumnId == "string" )
    {
        objGv.setCellStyles(objRowId, objColumnId, strStyleId);
    }

    objGv = null;
}

//==============================================================================
// 엑셀 내보내기
//------------------------------------------------------------------------------
function gfnExportScrGrid()
{
    if ( typeof(g_strGridId ) != undefined ) var objGv  = gfnGetGridView(g_strGridId ); if ( null == objGv  ) return; gfnClickGridExcelExport(objGv);
    if ( typeof(g_strGridId2) != undefined ) var objGv2 = gfnGetGridView(g_strGridId2); if ( null == objGv2 ) return; gfnClickGridExcelExport(objGv2);
    if ( typeof(g_strGridId3) != undefined ) var objGv3 = gfnGetGridView(g_strGridId3); if ( null == objGv3 ) return; gfnClickGridExcelExport(objGv3);
    if ( typeof(g_strGridId4) != undefined ) var objGv4 = gfnGetGridView(g_strGridId4); if ( null == objGv4 ) return; gfnClickGridExcelExport(objGv4);
    if ( typeof(g_strGridId5) != undefined ) var objGv5 = gfnGetGridView(g_strGridId5); if ( null == objGv5 ) return; gfnClickGridExcelExport(objGv5);
}

//==============================================================================
// 내부호출용
//------------------------------------------------------------------------------
// 그리드 초기화 완료시..
RealGrids.onload = function(strId)
{
    RealGrids.onerror = function(strId, strMsg) { gfnDispMsg("<Grid Errors - " + strId + ">\n" + strMsg); };

    if ( g_objRealGridInfo[strId]["type"] == Base.GRID )
        gfnSetupRealGrid(strId);
    else
    if ( g_objRealGridInfo[strId]["type"] == Base.TREE )
        gfnSetupGridTree(strId);
    else
        gfnDispMsg("그리드 초기화중 오류가 발생했습니다. 관리자에게 문의하십시오.");
};

// 그리드 설정
function gfnSetupRealGrid(strId)
{
    g_objRealGridInfo[strId]["gridView"] = new RealGrids.GridView(strId);

    var objGv = gfnGetGridView(strId);
    var objOptions = g_objRealGridInfo[strId]["options"];
    var objStyles  = g_objRealGridInfo[strId]["styles" ];
    var objColumns = g_objRealGridInfo[strId]["columns"];
    var objSelectStyles = g_objRealGridInfo[strId]["selectStyles"];
    var objDisplayOptions = g_objRealGridInfo[strId]["displayOptions"];
    var objDp = new RealGrids.LocalDataProvider();

    if ( null != objOptions ) objGv.setOptions(objOptions);
    if ( null != objStyles  ) objGv.setStyles(objStyles);
    if ( null != objColumns ) objGv.setColumns(objColumns);
    if ( null != objSelectStyles ) objGv.setSelectOptions(objSelectStyles)
        else objGv.setSelectOptions({ "style": "none" });
    if ( null != objDisplayOptions ) objGv.setDisplayOptions(objDisplayOptions)
    if ( null != objDp      ) objGv.setDataProvider(objDp);
    objGv.setCopyOptions({ "datetimeFormat": "yyyyMMdd" });

    // 휠이벤트 설정. // 마우스가 그리드에 위치하고 있을 때 마우스 휠 이벤트 공유하지 않는다.
    RealGrids.setExternalWheelEvents(objGv, true, false);

    // 그리드 스타일 설정
    objGv.addCellStyle("readOnly", { "foreground": "#000000", "background": "#f2f2f2", "editable": false });
    objGv.addCellStyle("aggRow", $.extend(g_objGridColumnStyle.AGG, { "editable": false }) ); // 합계행

    // 그리드 FIELD 목록 설정
    gfnSetGridFieldList(strId, objDp, g_objRealGridInfo[strId]["fieldList"], g_objRealGridInfo[strId]["fieldTypeList"]);

    objGv.onCurrentChanged      = g_objRealGridInfo[strId]["onCurrentChanged"];
    objGv.onCellEdited          = g_objRealGridInfo[strId]["onCellEdited"];
    objGv.onDataCellDblClicked  = g_objRealGridInfo[strId]["onDataCellDblClicked"];
    objGv.onCellButtonClicked   = g_objRealGridInfo[strId]["onCellButtonClicked"];
    objGv.onDataCellClicked     = g_objRealGridInfo[strId]["onDataCellClicked"];
    objGv.onLinkableCellClicked = g_objRealGridInfo[strId]["onLinkableCellClicked"];

    objGv.setContextMenu([
        { "label": "Export to Excel..." }
      , { "label": "-" }, { "label": "Find..." }, { "label": "Find Next" }, { "label": "Find Previous" }
      //, { "label": "-" }, { "label": "Filter..." }
      , { "label": "-" }, { "label": "About keyboard shortcut..." }
    ]);
    objGv.onContextMenuItemClicked = function(objGv, strLabel, objCellIndex) // CONTEXT 메뉴 항목 클릭시..
        {
            if ( "Export to Excel..." == strLabel )
                gfnClickGridExcelExport(objGv); // 그리드 EXCEL EXPORT 클릭시..
            else
            if ( "Find..." == strLabel )
                gfnClickGridCellFind(strId, objGv); // 그리드 CELL FIND 클릭시..
            else
            if ( "Find Next" == strLabel )
                gfnClickGridCellFindNextPrev(strId, objGv); // 그리드 CELL FIND NEXT/PREV 클릭시..
            else
            if ( "Find Previous" == strLabel )
                gfnClickGridCellFindNextPrev(strId, objGv, true); // 그리드 CELL FIND NEXT/PREV 클릭시..
            else
            if ( "Filter..." == strLabel )
                gfnClickGridColFilter(strId, objGv); // 그리드 열 FILTER 클릭시..
            else
            if ( "About keyboard shortcut..." == strLabel )
                gfnClickGridKeyboardShortcut(); // 그리드 KEYBOARD SHORTCUT 클릭시..
        };

    objDp.onRowInserted = function(objDp, numDataRow) // 행 삽입 완료시..
        {
            var objGv = gfnGetGridView(strId); if ( null == objGv ) return;

            objGv.checkRow(numDataRow, true); // 행을 선택한다.
            objGv.setCurrent({ "dataRow": numDataRow });
            objGv.showEditor();
            if ( null != g_objRealGridInfo[strId]["onRowInserted"] )
                g_objRealGridInfo[strId]["onRowInserted"](objDp, numDataRow);
            objGv.setFocus();

            objGv = null;
        };
    objDp.onRowUpdated = function(objDp, numDataRow) // 행 수정 완료시..
        {
            var objGv = gfnGetGridView(strId);

            if ( null != objGv ) objGv.checkRow(numDataRow, true); // 행을 선택한다.

            var objFunc = g_objRealGridInfo[strId]["onRowUpdated"];
            if ( null != objFunc ) objFunc(objDp, numDataRow);
            objFunc = null; objGv = null;
        };

    var objOnload = g_objRealGridInfo[strId]["onload"];

    if ( null != objOnload ) objOnload(strId);

    objOnload = null; objdp = null;
    objColumns = null; objStyles = null; objOptions = null; objGv = null;
}

// 그리드 트리 설정
function gfnSetupGridTree(strId)
{
    g_objRealGridInfo[strId]["treeView"] = new RealGrids.TreeView(strId);

    var objGv = gfnGetGridView(strId);
    var objOptions = g_objRealGridInfo[strId]["options"];
    var objTreeOptions = g_objRealGridInfo[strId]["treeOptions"];
    var objStyles  = g_objRealGridInfo[strId]["styles" ];
    var objColumns = g_objRealGridInfo[strId]["columns"];
    var objSelectStyles = g_objRealGridInfo[strId]["selectStyles"];
    var objDisplayOptions = g_objRealGridInfo[strId]["displayOptions"];
    var objDp = new RealGrids.TreeDataProvider();

    if ( null != objOptions ) objGv.setOptions(objOptions);
    if ( null != objStyles  ) objGv.setStyles(objStyles);
    if ( null != objColumns ) objGv.setColumns(objColumns);
    if ( null != objSelectStyles ) objGv.setSelectOptions(objSelectStyles)
        else objGv.setSelectOptions({ "style": "none" });
    if ( null != objDisplayOptions ) objGv.setDisplayOptions(objDisplayOptions)
    if ( null != objDp      ) objGv.setDataProvider(objDp);
    objGv.setCopyOptions({ "datetimeFormat": "yyyyMMdd" });

    // 그리드 스타일 설정
    objGv.addCellStyle("readOnly", { "foreground": "#000000", "background": "#f2f2f2", "editable": false });
    objGv.addCellStyle("aggRow", $.extend(g_objGridColumnStyle.AGG, { "editable": false }) ); // 합계행

    // 그리드 FIELD 목록 설정
    gfnSetGridFieldList(strId, objDp, g_objRealGridInfo[strId]["fieldList"], g_objRealGridInfo[strId]["fieldTypeList"]);

    objGv.onCurrentChanged     = g_objRealGridInfo[strId]["onCurrentChanged"];
    objGv.onCellEdited         = g_objRealGridInfo[strId]["onCellEdited"];
    objGv.onDataCellDblClicked = g_objRealGridInfo[strId]["onDataCellDblClicked"];
    objGv.onCellButtonClicked  = g_objRealGridInfo[strId]["onCellButtonClicked"];
    objGv.onDataCellClicked    = g_objRealGridInfo[strId]["onDataCellClicked"];
    objGv.onLinkableCellClicked = g_objRealGridInfo[strId]["onLinkableCellClicked"];
    objGv.onTreeItemExpanding  = g_objRealGridInfo[strId]["onTreeItemExpanding"];

    objGv.setContextMenu([
        { "label": "Export to Excel..." }
      , { "label": "-" }, { "label": "Find..." }, { "label": "Find Next" }, { "label": "Find Previous" }
      //, { "label": "-" }, { "label": "Filter..." }
      , { "label": "-" }, { "label": "About keyboard shortcut..." }
    ]);
    objGv.onContextMenuItemClicked = function(objGv, strLabel, objCellIndex) // CONTEXT 메뉴 항목 클릭시..
        {
            if ( "Export to Excel..." == strLabel )
                gfnClickGridExcelExport(objGv); // 그리드 EXCEL EXPORT 클릭시..
            else
            if ( "Find..." == strLabel )
                gfnClickGridCellFind(strId, objGv); // 그리드 CELL FIND 클릭시..
            else
            if ( "Find Next" == strLabel )
                gfnClickGridCellFindNextPrev(strId, objGv); // 그리드 CELL FIND NEXT/PREV 클릭시..
            else
            if ( "Find Previous" == strLabel )
                gfnClickGridCellFindNextPrev(strId, objGv, true); // 그리드 CELL FIND NEXT/PREV 클릭시..
            else
            if ( "Filter..." == strLabel )
                gfnClickGridColFilter(strId, objGv); // 그리드 열 FILTER 클릭시..
            else
            if ( "About keyboard shortcut..." == strLabel )
                gfnClickGridKeyboardShortcut(); // 그리드 KEYBOARD SHORTCUT 클릭시..
        };

    objDp.onRowInserted = function(objDp, numDataRow) // 행 삽입 완료시..
        {
            var objGv = gfnGetGridView(strId); if ( null == objGv ) return;

            objGv.checkRow(numDataRow, true); // 행을 선택한다.
            objGv.setCurrent({ "dataRow": numDataRow });
            objGv.showEditor();
            if ( null != g_objRealGridInfo[strId]["onRowInserted"] )
                g_objRealGridInfo[strId]["onRowInserted"](objDp, numDataRow);
            objGv.setFocus();

            objGv = null;
        };
    objDp.onRowUpdated = function(objDp, numDataRow) // 행 수정 완료시..
        {
            var objGv = gfnGetGridView(strId);

            if ( null != objGv ) objGv.checkRow(numDataRow, true); // 행을 선택한다.

            var objFunc = g_objRealGridInfo[strId]["onRowUpdated"];
            if ( null != objFunc ) objFunc(objDp, numDataRow);
            objFunc = null; objGv = null;
        };

    var objOnload = g_objRealGridInfo[strId]["onload"];

    if ( null != objOnload ) objOnload(strId);

    objOnload = null; objdp = null;
    objColumns = null; objStyles = null; objOptions = null; objGv = null;
}


// 그리드 페이지 바인딩
function gfnBindGridPage(strId, strPageId, arrList)
{
    var arrOutput = new Array(), numIndex = -1;

    var MAX_PAGE = ( null != arrList && 0 < arrList.length ? gfnGetInt(arrList[0]["maxPage"]) : 0 );
    var PAGE = ( 0 < MAX_PAGE ? gfnGetInt(arrList[0]["page"]) : 0 );

    if ( 0 < MAX_PAGE )
    {
        var ANC = '<a>', ANC9 = '</a>';
        var STRONG = '<strong>', STRONG9 = '</strong>';

        var numEndPage   = ( gfnGetInt(( PAGE - 1 ) / 10) + 1 ) * 10;
        var numStartPage = numEndPage - 9;
        if ( MAX_PAGE < numEndPage ) numEndPage = MAX_PAGE;

        arrOutput[++numIndex] = '<a class="first"><span></span>처음</a>';
        arrOutput[++numIndex] = '<a class="prev"><span></span>이전</a>';

        for ( var num = numStartPage ; num <= numEndPage ; num++ )
        {
            arrOutput[++numIndex] = ( PAGE == num ? STRONG  : Base.EMPTYSTR );
                arrOutput[++numIndex] = '<a href="#">' + num.toString() + '</a>';
            arrOutput[++numIndex] = ( PAGE == num ? STRONG9 : Base.EMPTYSTR );
        }

        arrOutput[++numIndex] = '<a class="next"><span></span>다음</a>';
        arrOutput[++numIndex] = '<a class="last"><span></span>끝</a>';
    }

    gfnSetHtml($("#" + strPageId + ">div:first-child").get(0), arrOutput.join(Base.EMPTYSTR));

    arrOutput = null;

    if ( null != g_objRealGridInfo[strId]["onclickpage"] )
        // 그리드 페이지 클릭 설정
        gfnSetGridPageClick(strPageId, g_objRealGridInfo[strId]["onclickpage"], PAGE, MAX_PAGE);
}

// 그리드 페이지 클릭 설정
function gfnSetGridPageClick(strPageId, objFunc, numPage, numMaxPage)
{
    if ( 0 >= numMaxPage ) return;

    var objTagList = $('#' + strPageId + ' [class="pageNav"]>a');
    var LNGTH = objTagList.length - 2;

    if ( 0 < LNGTH )
    {
        if ( 1 < numPage )
        {
            $(objTagList.get(0)).click(function() { gfnClickGridPage(strPageId, 1, objFunc); });
            $(objTagList.get(1)).click(function() { gfnClickGridPage(strPageId, numPage - 1, objFunc); });

            objTagList.get(0).className = "first"; objTagList.get(0).style.cursor = "hand";
            objTagList.get(1).className = "prev" ; objTagList.get(1).style.cursor = "hand";
        } else
        {
            objTagList.get(0).className = "first dis"; objTagList.get(0).style.cursor = "default";
            objTagList.get(1).className = "prev dis"; objTagList.get(1).style.cursor = "default";
        }

        for ( var num = 2 ; num < LNGTH ; num++ )
            $(objTagList.get(num)).click(function() { gfnClickGridPage(strPageId, event.srcElement.innerText, objFunc); });

        if ( numMaxPage > numPage )
        {
            $(objTagList.get(num    )).click(function() { gfnClickGridPage(strPageId, numPage + 1, objFunc); });
            $(objTagList.get(num + 1)).click(function() { gfnClickGridPage(strPageId, numMaxPage , objFunc); });

            objTagList.get(num    ).className = "next"; objTagList.get(num    ).style.cursor = "hand";
            objTagList.get(num + 1).className = "last" ; objTagList.get(num + 1).style.cursor = "hand";
        } else
        {
            objTagList.get(num    ).className = "next dis"; objTagList.get(num    ).style.cursor = "default";
            objTagList.get(num + 1).className = "last dis" ; objTagList.get(num + 1).style.cursor = "default";
        }
    }

    objTagList = null;
}

// 그리드 페이지 클릭시..
function gfnClickGridPage(strPageId, numPage, objFunc)
{
    $('#' + strPageId + ' [name="page"]').val(numPage);

    if ( null != objFunc ) objFunc();
}

// 그리드 EXCEL EXPORT 클릭시..
function gfnClickGridExcelExport(objGv)
{
    objGv.exportGrid(
        {
            "confirmMessage": "Do you want to save an Excel document?"
          , "confirmTitle": "Save to Excel"
          , "target": "local"
          , "type": "excel"
          , "url": "export.xls"
          //, "linear": true // cf.) Header 3 줄이상이면 오류가 발생하고 있음.
        });
}

// 그리드 CELL FIND 클릭시..
function gfnClickGridCellFind(strId, objGv)
{
    var WORD = window.prompt(Base.EMPTYSTR, Base.EMPTYSTR); if ( gfnIsEmpty(WORD) ) return;

    var obj = gfnFindGridCellIndex(strId, objGv, WORD.toUpperCase()); // 그리드 셀 인덱스 FIND

    if ( null != obj )
    {
        g_objRealGridInfo[strId]["search"]["fieldIndex"] = obj.fieldIndex;
        g_objRealGridInfo[strId]["search"]["itemIndex" ] = obj.itemIndex ;
        g_objRealGridInfo[strId]["search"]["word"      ] = WORD;
        objGv.setCurrent(obj); // 추가된 행 포커스
        obj = null;
    } else
    {
        gfnDispMsg("The word is not exist.", WORD);
    }

    objGv.setFocus(); // 선택된 행을 편집한다.
}

// 그리드 셀 인덱스 FIND
function gfnFindGridCellIndex(strId, objGv, strWord, numStartItemIndex, numStartFieldIndex, blnPrev)
{
    var LNGTH = objGv.getItemCount(), LNGTH2 = g_objRealGridInfo[strId]["fieldList"].length;

    if ( null == blnPrev ) blnPrev = false;
    if ( null == numStartItemIndex  ) numStartItemIndex  = ( !blnPrev ? 0 : LNGTH  );
    if ( null == numStartFieldIndex ) numStartFieldIndex = ( !blnPrev ? 0 : LNGTH2 );

    var objOutpt = null;
    var num, num2, objValue;

    num2 = numStartFieldIndex;

    gfnDispPgbar();

    if ( !blnPrev )
    {
        for ( num = numStartItemIndex ; num < LNGTH ; num++ )
        {
            for ( ; num2 < LNGTH2 ; num2++ )
            {
                objValue = objGv.getValue(num, num2);
                if ( gfnIsEmpty(objValue) ) continue;
                if ( 0 <= objValue.toString().toUpperCase().indexOf(strWord) )
                {
                    objOutpt = objGv.columnByField(g_objRealGridInfo[strId]["fieldList"][num2]);
                    if ( null == objOutpt ) continue;
                    else                    break;
                }
            }
            if ( null != objOutpt ) break;
            num2 = 0;
        }
    } else
    {
        for ( num = numStartItemIndex ; num >= 0 ; num-- )
        {
            for ( ; num2 >= 0 ; num2-- )
            {
                objValue = objGv.getValue(num, num2);
                if ( gfnIsEmpty(objValue) ) continue;
                if ( 0 <= objValue.toString().toUpperCase().indexOf(strWord) )
                {
                    objOutpt = objGv.columnByField(g_objRealGridInfo[strId]["fieldList"][num2]);
                    if ( null == objOutpt ) continue;
                    else                    break;
                }
            }
            if ( null != objOutpt ) break;
            num2 = LNGTH2 - 1;
        }
    }

    gfnHidePgbar();

    if ( null != objOutpt )
        objOutpt = { "itemIndex": num, "fieldIndex": num2, "fieldName": objOutpt.fieldName };

    return objOutpt;
}

// 그리드 CELL FIND NEXT/PREV 클릭시..
function gfnClickGridCellFindNextPrev(strId, objGv, blnPrev)
{
    if ( null == blnPrev ) blnPrev = false;

    var WORD = g_objRealGridInfo[strId]["search"]["word"];

    if ( gfnIsEmpty(WORD) )
    {
        gfnClickGridCellFind(strId, objGv); // 그리드 CELL FIND 클릭시..
    } else
    {
        var CRRNT_FIELD_INDEX = objGv.getCurrent().fieldIndex;
        var CRRNT_ITEM_INDEX  = objGv.getCurrent().itemIndex;
        var START_FIELD_INDEX = ( null != CRRNT_FIELD_INDEX && 0 <= CRRNT_FIELD_INDEX ? CRRNT_FIELD_INDEX : g_objRealGridInfo[strId]["search"]["fieldIndex"] ) + ( !blnPrev ? 1 : -1 );
        var START_ITEM_INDEX  = ( null != CRRNT_ITEM_INDEX  && 0 <= CRRNT_ITEM_INDEX  ? CRRNT_ITEM_INDEX  : g_objRealGridInfo[strId]["search"]["itemIndex" ] );

        // 그리드 셀 인덱스 FIND
        var obj = gfnFindGridCellIndex(strId, objGv, WORD.toUpperCase(),
                    START_ITEM_INDEX, START_FIELD_INDEX, blnPrev);

        if ( null != obj )
        {
            g_objRealGridInfo[strId]["search"]["fieldIndex"] = obj.fieldIndex;
            g_objRealGridInfo[strId]["search"]["itemIndex" ] = obj.itemIndex ;
            objGv.setCurrent(obj); // 추가된 행 포커스
            obj = null;
        } else
        {
            if ( !blnPrev )
                gfnDispMsg("The word is not found.(Find Next)", WORD);
            else
                gfnDispMsg("The word is not found.(Find Previous)", WORD);
        }

        objGv.setFocus(); // 선택된 행을 편집한다.
    }
}

// 그리드 CELL FIND PREV 클릭시..
function gfnClickGridCellFindPrev(strId, objGv)
{
    var WORD = g_objRealGridInfo[strId]["search"]["word"];

    if ( gfnIsEmpty(WORD) )
    {
        gfnClickGridCellFind(strId, objGv); // 그리드 CELL FIND 클릭시..
    } else
    {
        // 그리드 셀 인덱스 FIND
        var obj = gfnFindGridCellIndex(strId, objGv, WORD.toUpperCase(),
                    g_objRealGridInfo[strId]["search"]["itemIndex" ],
                    g_objRealGridInfo[strId]["search"]["fieldIndex"] - 1, true);

        if ( null != obj )
        {
            g_objRealGridInfo[strId]["search"]["fieldIndex"] = obj.fieldIndex;
            g_objRealGridInfo[strId]["search"]["itemIndex" ] = obj.itemIndex ;
            objGv.setCurrent(obj); // 추가된 행 포커스
            obj = null;
        } else
        {
            gfnDispMsg("The word is not found.", WORD);
        }

        objGv.setFocus(); // 선택된 행을 편집한다.
    }
}

// 그리드 FIELD 목록 설정
function gfnSetGridFieldList(strId, objDp, arrFieldList, objFieldTypeList)
{
    var arr = new Array(), numIndex = -1, LNGTH = arrFieldList.length;

    if ( null == objFieldTypeList )
    {
        for ( var num = 0 ; num < LNGTH ; num++ )
            arr[++numIndex] = { "fieldName": arrFieldList[num] };
    } else
    {
        for ( var num = 0 ; num < LNGTH ; num++ )
        {
            arr[++numIndex] = { "fieldName": arrFieldList[num] };

            if ( null != objFieldTypeList[arrFieldList[num]] )
                $.extend(true, arr[numIndex], objFieldTypeList[arrFieldList[num]]);
        }
    }

    var PAGE_ID = g_objRealGridInfo[strId]["pageId"];

    if ( !gfnIsEmpty(PAGE_ID) && PAGE_ID in window )
    {
        arr[++numIndex] = { "fieldName": "rowNo"  , "dataType": "numeric" };
        arr[++numIndex] = { "fieldName": "total"  , "dataType": "numeric" };
        arr[++numIndex] = { "fieldName": "maxPage", "dataType": "numeric" };
        arr[++numIndex] = { "fieldName": "page"   , "dataType": "numeric" };
    }

    objDp.setFields(arr);

    arr = null;
}

// 그리드 KEYBOARD SHORTCUT 클릭시..
function gfnClickGridKeyboardShortcut()
{
    // 메시지 표시
    gfnDispMsg(
        "<KEYBOARD SHORTCUT>\n↑ or PageUp or CTRL + HOME : cursor up\n↓ or PageDown or CTRL + END: cursor down\n← or HOME : cursor left\n→ or END : cursor right"
    );
}

// 그리드 EXCEL 데이터 가져오기
function gfnGetGridExcelData(strFilePath)
{
    var arrOutpt = new Array(3);

    var objExcelApp = null, objWorkBook = null;

    try
    {
        objExcelApp = new ActiveXObject("Excel.Application"); // 엑셀 애플리케이션 변수 설정
        objWorkBook = objExcelApp.Workbooks.Open(strFilePath);    // 워크북 변수 설정

        var ROW_COUNT = objWorkBook.Sheets(1).UsedRange.Rows(objWorkBook.Sheets(1).UsedRange.Rows.Count).Row ;          // 행건수 변수 설정
        var COL_COUNT = objWorkBook.Sheets(1).UsedRange.Columns(objWorkBook.Sheets(1).UsedRange.Columns.Count).Column ; // 열건수 변수 설정

        arrOutpt[0] = ROW_COUNT; arrOutpt[1] = COL_COUNT;
        arrOutpt[2] = // ex.) A1값, A2값, ..., B1값, B2값, ..., C1값, C2값, ...
            objWorkBook.Sheets(1).Range(objWorkBook.Sheets(1).Cells(1, 1),
                                    objWorkBook.Sheets(1).Cells(ROW_COUNT, COL_COUNT)).Value.toArray();
    }
    catch ( objError )
    {
        // 엑셀 애플리케이션 변수 체크
        if ( null == objExcelApp ) gfnDispMsg("Its function has been limited by the browser. Please change your browser security settings to low.");
    }
    finally
    {
        if ( null != objWorkBook ) objWorkBook.Close();
        if ( null != objExcelApp ) objExcelApp.Quit();
        objWorkBook = null; objExcelApp  = null;
    }

    return arrOutpt;
}

// 그리드 셀 값 검증
function gfnVerifGridCellValue(objGv, objRow, numItemIndex, objInfo)
{
    var blnOutpt = true;

    var FIELD_NAME = objInfo["fieldName"], VALUE = objRow[FIELD_NAME];

    if ( blnOutpt && null != objInfo["msgInputYn"] && gfnIsEmpty(VALUE) ) // 입력여부를 검증한다.
    {
        gfnShowGridCellEditor(objGv, numItemIndex, FIELD_NAME, function()
            { gfnDispMsg(objInfo["msgInputYn"], objInfo["text"]); }); blnOutpt = false;
    }

    if ( blnOutpt && null != objInfo["msgChcYn"] && gfnIsEmpty(VALUE) ) // 선택여부를 검증한다.
    {
        gfnShowGridCellEditor(objGv, numItemIndex, FIELD_NAME, function()
            { gfnDispMsg(objInfo["msgChcYn"], objInfo["text"]); }); blnOutpt = false;
    }

    if ( blnOutpt && null != objInfo["msgByteLngth"] && gfnGetInt(objInfo["maxByteSize"]) < gfnGetByteSize(VALUE) ) // 길이초과여부를 검증한다.
    {
        gfnShowGridCellEditor(objGv, numItemIndex, FIELD_NAME, function()
            { gfnDispMsg(objInfo["msgByteLngth"], objInfo["text"] + ", \nCurr./Max. = " +
                gfnGetByteSize(VALUE) + "/" + gfnGetInt(objInfo["maxByteSize"]) + " Bytes"); }); blnOutpt = false;
    }

    if ( blnOutpt && null != objInfo["msgChcValue"] && // 선택값을 검증한다.
         ( null == objGv.columnByField(FIELD_NAME)["values"] ||
           0 > (Base.DELI1 + objGv.columnByField(FIELD_NAME).values.join(Base.DELI1) + Base.DELI1).indexOf(gfnCoalesce(VALUE)) )
       )
    {
        gfnShowGridCellEditor(objGv, numItemIndex, FIELD_NAME, function()
            { gfnDispMsg(objInfo["msgChcValue"], objInfo["text"] + ", VALUE = " + VALUE); }); blnOutpt = false;
    }

    if ( blnOutpt && null != objInfo["msgYear"] ) // 년도를 검증한다.
    {
        var BYTE_SIZE = ( null != VALUE ? gfnGetByteSize(VALUE.toString()) : 0 );

        if ( 0 != BYTE_SIZE )
        {
            if ( 4 != BYTE_SIZE || !gfnCheckYear(VALUE.toString().substr(0, 4)) ) blnOutpt = false;
        }
        if ( !blnOutpt )
            gfnShowGridCellEditor(objGv, numItemIndex, FIELD_NAME, function()
                { gfnDispMsg(objInfo["msgYear"], objInfo["text"] + ", Range = 1900 ~ 9999"); });
    }

    if ( blnOutpt && null != objInfo["msgYm"] ) // 년월을 검증한다.
    {
        var BYTE_SIZE = gfnGetByteSize(VALUE);
        if ( 0 != BYTE_SIZE )
        {
            if ( 6 != BYTE_SIZE ||
                 !gfnCheckYear(VALUE.toString().substr(0, 4)) ||
                 !gfnCheckMonth(VALUE.toString().substr(4, 2)) ) blnOutpt = false;
        }
        if ( !blnOutpt )
            gfnShowGridCellEditor(objGv, numItemIndex, FIELD_NAME, function()
                { gfnDispMsg(objInfo["msgYm"], objInfo["text"] + ", Range = 190001 ~ 999912"); });
    }

    if ( blnOutpt && null != objInfo["msgNumYn"] ) // 숫자여부를 검증한다.
    {
        if ( null != VALUE && !gfnIsNum(VALUE) ) { blnOutpt = false; }

        if ( !blnOutpt )
            gfnShowGridCellEditor(objGv, numItemIndex, FIELD_NAME, function()
                { gfnDispMsg(objInfo["msgNumYn"], objInfo["text"] + ", VALUE = " + VALUE + ", Number Only"); });
    }

    if ( blnOutpt && null != objInfo["msgNumRange"] ) // 숫자범위를 검증한다.
    {
        var MAX_NUM = ( null != objInfo["maxNum"] ? objInfo["maxNum"] :  999999999999999);
        var MIN_NUM = ( null != objInfo["minNum"] ? objInfo["minNum"] : -999999999999999);

        if ( null != VALUE )
        {
            var NUM = gfnGetNum(VALUE);

            if ( MAX_NUM < NUM || MIN_NUM > NUM ) blnOutpt = false;
        }

        if ( !blnOutpt )
            gfnShowGridCellEditor(objGv, numItemIndex, FIELD_NAME, function()
                { gfnDispMsg(objInfo["msgNumRange"], objInfo["text"] + ", \nRange = " + gfnFormt(MIN_NUM, Base.NUM) + " ~ " + gfnFormt(MAX_NUM, Base.NUM)); });
    }

    if ( blnOutpt && null != objInfo["msgCorpno"] ) // 법인등록번호를 검증한다.
    {
        var BYTE_SIZE = gfnGetByteSize(VALUE), DFLT_BYTE_SIZE = 13;

        if ( 0 < BYTE_SIZE )
        {
            if ( !gfnIsNum(VALUE) || DFLT_BYTE_SIZE != BYTE_SIZE ) blnOutpt = false;
        }

        if ( !blnOutpt )
            gfnShowGridCellEditor(objGv, numItemIndex, FIELD_NAME, function()
                { gfnDispMsg(objInfo["msgCorpno"], objInfo["text"] + ", Number Only, Length = " + DFLT_BYTE_SIZE); });
    }

    if ( blnOutpt && null != objInfo["msgBzno"] ) // 사업자등록번호를 검증한다.
    {
        var BYTE_SIZE = gfnGetByteSize(VALUE), DFLT_BYTE_SIZE = 10;

        if ( 0 < BYTE_SIZE )
        {
            if ( !gfnIsNum(VALUE) || DFLT_BYTE_SIZE != BYTE_SIZE ) blnOutpt = false;
        }

        if ( !blnOutpt )
            gfnShowGridCellEditor(objGv, numItemIndex, FIELD_NAME, function()
                { gfnDispMsg(objInfo["msgBzno"], objInfo["text"] + ", Number Only, Length = " + DFLT_BYTE_SIZE); });
    }

    if ( blnOutpt && null != objInfo["msgPostNo"] ) // 우편번호를 검증한다.
    {
        var BYTE_SIZE = gfnGetByteSize(VALUE), DFLT_BYTE_SIZE = 6;

        if ( 0 < BYTE_SIZE )
        {
            if ( !gfnIsNum(VALUE) || DFLT_BYTE_SIZE != BYTE_SIZE ) blnOutpt = false;
        }

        if ( !blnOutpt )
            gfnShowGridCellEditor(objGv, numItemIndex, FIELD_NAME, function()
                { gfnDispMsg(objInfo["msgPostNo"], objInfo["text"] + ", Number Only, Length = " + DFLT_BYTE_SIZE); });
    }

    if ( blnOutpt && null != objInfo["msgDate"] ) // 일자를 검증한다.
    {
        var BYTE_SIZE = gfnGetByteSize(VALUE), DFLT_BYTE_SIZE = 8;

        if ( 0 < BYTE_SIZE )
        {
            if ( !gfnCheckDate(VALUE) || DFLT_BYTE_SIZE != BYTE_SIZE ) blnOutpt = false;
        }

        if ( !blnOutpt )
            gfnShowGridCellEditor(objGv, numItemIndex, FIELD_NAME, function()
                { gfnDispMsg(objInfo["msgDate"], objInfo["text"] + ", FORMAT = YYYY-MM-DD"); });
    }

    if ( blnOutpt && null != objInfo["msgMask"] ) // MASK 를 검증한다.
    {
        var BYTE_SIZE = gfnGetByteSize(VALUE);

        if ( 0 < BYTE_SIZE )
        {
            var STR_VALUE = VALUE.toString(), LNGTH = STR_VALUE.length;
            var MASK_CHAR = objInfo["maskChar"];

            for ( var num = 0 ; num < LNGTH ; num++ )
            {
                if ( 0 > MASK_CHAR.indexOf(STR_VALUE.charAt(num)) )
                {
                    blnOutpt = false;
                    break;
                }
            }
        }

        if ( !blnOutpt )
            gfnShowGridCellEditor(objGv, numItemIndex, FIELD_NAME, function()
                { gfnDispMsg(objInfo["msgMask"], objInfo["text"] + ( null != objInfo["textSuffix"] ? objInfo["textSuffix"] : Base.EMPTYSTR )); });
    }

    return blnOutpt;
}

// 그리드 바인딩
function gfnBindGrid(strId, arrData)
{
    var objGv = gfnGetGridView(strId); if ( null == objGv ) return;
    var objDp = objGv.getDataProvider();
    if ( null != objDp ) objDp.setRows(arrData);
    objDp = null; objGv = null;
}

// 그리드 JSON 가져오기
function gfnGetGridJson(objJson, strPrfx, blnDispValue)
{
    if ( null == blnDispValue ) blnDispValue = false;

    var arrOutpt = new Array();
    if ( blnDispValue )
    {
        if ( gfnIsEmpty(strPrfx) )
        {
            for ( var strKey in objJson )
                arrOutpt[arrOutpt.length] = strKey + ": " + objJson[strKey];
        } else
        {
            for ( var strKey in objJson )
            {
                if ( 0 <= strKey.indexOf(strPrfx) )
                    arrOutpt[arrOutpt.length] = strKey + ": " + objJson[strKey];
            }
        }
    } else
    {
        if ( gfnIsEmpty(strPrfx) )
        {
            for ( var strKey in objJson )
                arrOutpt[arrOutpt.length] = strKey;
        } else
        {
            for ( var strKey in objJson )
            {
                if ( 0 <= strKey.indexOf(strPrfx) )
                    arrOutpt[arrOutpt.length] = strKey;
            }
        }
    }
    return arrOutpt;
}

// 그리드 셀 EDITOR 보여주기
function gfnShowGridCellEditor(objGv, numItemIndex, strFieldName, objFunc, blnShowEditor)
{
    if ( null == objGv ) return;
    if ( null != numItemIndex && 0 <= numItemIndex )
    {
        if ( null == blnShowEditor ) blnShowEditor = true;

        objGv.setCurrent({ "dataRow": objGv.getRowId(numItemIndex), "fieldName": strFieldName }); // 추가된 행 포커스
        if ( null != objFunc ) objFunc();
        if ( null != strFieldName && blnShowEditor ) objGv.showEditor(); // EDITOR 표시
        objGv.setFocus(); // 선택된 행을 편집한다.
    }
}

// 그리드 일자 문자열 가져오기
function gfnGetGriDateStr(objValue)
{
    var strOutpt = null;

    strOutpt =
        objValue.getFullYear().toString()
      + (Base.ZERO + (objValue.getMonth() + 1)).substr((objValue.getMonth() + 1).toString().length - 1, 2)
      + (Base.ZERO + objValue.getDate()).substr(objValue.getDate().toString().length - 1, 2);

    return strOutpt;
}

// 수정요망
// 그리드 열 FILTER 클릭시..
function gfnClickGridColFilter(strId, objGv)
{
    var WORD = window.prompt(Base.EMPTYSTR, Base.EMPTYSTR); if ( gfnIsEmpty(WORD) ) return;

    var FIELD_NAME = objGv.getCurrent().fieldName; if ( null == FIELD_NAME ) return;

    objGv.addColumnFilters(FIELD_NAME, { "name": WORD, "criteria": 'value = "' + WORD + '"', "active": true }, true);
}
