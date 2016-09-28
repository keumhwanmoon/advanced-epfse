<%--
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 사용자 그리드
    - 최초작성일 : 2014-06-25
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
// 사용자ID 포커스해제시..
//------------------------------------------------------------------------------
function fnBlurUserId()
{
    var obj = $('#divInqrCond [name="userId"]');
    $(obj).val($(obj).val().toUpperCase());
    obj = null;
}

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

    var arrFieldName = g_arrFieldName.slice(0, 7); arrFieldName[0] = null;

    // 그리드 EXCEL 데이터 IMPORT
    gfnImportGridExcelData(g_strGridId, frmImport.filImport.value, arrFieldName,
        function(objGv) { gfnDispMsg('${requestScope["ITEM.msgInqrOk"]}<%-- 조회가 완료되었습니다. --%>'); });

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
      , "/member/getUserList.do" // 목록 가져오기
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
        "/member/saveUserList.do" // 목록 저장
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
                var strSffx  = gfnGetJsonValue(objData, [ Base.RSLT_INFO, "userId" ]);

                if ( !gfnIsEmpty(strSffx) ) strSffx = '${requestScope["ITEM.userId"]}<%-- 사용자ID --%> = ' + strSffx;

                if ( -1 == RSLT_VALUE )
                    gfnSetGridCellFocus(g_strGridId, DATA_ROW, null, function() // 그리드 셀 포커스를 설정한다.
                        { gfnDispMsg('${requestScope["ITEM.msgNoAdmin"]}<%-- 요관리자는 반드시 존재해야합니다. --%>'); });
                else
                if ( Base.DATA_DUP == RSLT_VALUE )
                    gfnSetGridCellFocus(g_strGridId, DATA_ROW, "userId", function() // 그리드 셀 포커스를 설정한다.
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
        "/member/deltUserList.do" // 목록 삭제
        // 데이터
      , "rowId=" + encodeURIComponent("'" + gfnGetGridChcColValue(g_strGridId, "rowId", false).join("', '") + "'") // 행ID목록
        // 성공콜백함수
      , function(objData)
        {
            var RSLT_VALUE = gfnGetJsonValue(objData, [ Base.RSLT_NO ]);

            if ( Base.OK != RSLT_VALUE )
            {
                if ( -1 == RSLT_VALUE )
                    gfnDispMsg('${requestScope["ITEM.msgNoAdmin"]}<%-- 관리자는 반드시 존재해야합니다. --%>');
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

// < Sub Procedure and Function - 그리드 영역 >
//==============================================================================
// 그리드 초기화
//------------------------------------------------------------------------------
function fnInitGrid()
{
    // FIELD 정보를 설정한다.
    g_arrFieldName = "rowId|userId|userName|pwdName|useYn|adminYn|langCode".split(Base.DELI1);

    gfnInitGrid(g_strGridId, g_arrFieldName, null, Base.GRID,
        {
            "pageId": "divPage" // 페이지 태그 ID
          , "columns": [
                { "width": 0, "fieldName": g_arrFieldName[0], "editable": false } // 행ID
              , { "header": { "text": '${requestScope["ITEM.userId"  ]}<%-- 사용자ID   --%>' }, "width": 150, "fieldName": g_arrFieldName[1], "editor": { "maxLength": 20 } }
              , { "header": { "text": '${requestScope["ITEM.userName"]}<%-- 사용자명   --%>' }, "width": 100, "fieldName": g_arrFieldName[2], "editor": { "maxLength": 100 } }
              , { "header": { "text": '${requestScope["ITEM.pwdName" ]}<%-- 비밀번호명 --%>' }, "width": 150, "fieldName": g_arrFieldName[3], "editor": { "maxLength": 100 } }
              , { "header": { "text": '${requestScope["ITEM.useYn"   ]}<%-- 사용여부   --%>' }, "width": 70 , "fieldName": g_arrFieldName[4], "styles": { "textAlignment": "center", "figureBackground": Grid.FIGURE_BACKGROUND, "figureInactiveBackground": Grid.FIGURE_INACTIVE_BACKGROUND }, "editable": false, "renderer": { "type": "check", "editable": true, "startEditOnClick": true, "trueValues": "Y", "falseValues": "N" } }
              , { "header": { "text": '${requestScope["ITEM.adminYn" ]}<%-- 관리자여부 --%>' }, "width": 100, "fieldName": g_arrFieldName[5], "styles": { "textAlignment": "center", "figureBackground": Grid.FIGURE_BACKGROUND, "figureInactiveBackground": Grid.FIGURE_INACTIVE_BACKGROUND }, "editable": false, "renderer": { "type": "check", "editable": true, "startEditOnClick": true, "trueValues": "Y", "falseValues": "N" } }
              , { "header": { "text": '${requestScope["ITEM.langCode"]}<%-- 언어코드   --%>' }, "width": 70 , "fieldName": g_arrFieldName[6], "editor": { "type": "dropdown", "domainOnly": true, "textReadOnly": true }, "lookupDisplay": true, "values": g_arrGridComboCode[0][0], "labels": g_arrGridComboCode[0][1] }
            ]
        // 이벤트관련
          , "onload": function(strId) // 그리드 초기화 완료시..
                {
                    btnInqr.click(); // 화면 로드시 조회한다.
                }
          , "onclickpage": fnInqr // 페이지 클릭시..
        });
}

//==============================================================================
// 추가
//------------------------------------------------------------------------------
function fnAdd()
{
    gfnAddGridRow(g_strGridId, // 그리드 행 추가
        { // 행 추가시 기본값을 설정한다.
            "useYn": "Y", "adminYn": "Y", "langCode": $('[name="comParamUserLangCode"]').val()
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
                var blnOutpt = gfnVerifGridRow(objGv, objRow, numItemIndex, [ // 그리드 행 검증
                    {
                        "text": '${requestScope["ITEM.userId"]}<%-- 사용자ID --%>', "fieldName": "userId"
                      , "msgInputYn": '${requestScope["ITEM.msgInputItem"]}<%-- 해당 항목을 입력하십시오. --%>'
                      , "msgByteLngth": '${requestScope["ITEM.msgItemLngthMax"]}<%-- 해당 항목값의 길이가 최대값을 초과하였습니다. --%>', "maxByteSize": 20
                      , "msgMask": '${requestScope["ITEM.msgItemWrong"]}<%-- 해당 항목값이 잘못되었습니다. --%>', "maskChar": "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_", "textSuffix": ", Alphabet/Number/_ Only"
                    }
                  , {
                        "text": '${requestScope["ITEM.userName"]}<%-- 사용자명 --%>', "fieldName": "userName"
                      , "msgInputYn": '${requestScope["ITEM.msgInputItem"]}<%-- 해당 항목을 입력하십시오. --%>'
                      , "msgByteLngth": '${requestScope["ITEM.msgItemLngthMax"]}<%-- 해당 항목값의 길이가 최대값을 초과하였습니다. --%>', "maxByteSize": 200
                    }
                  , {
                        "text": '${requestScope["ITEM.pwdName"]}<%-- 비밀번호명 --%>', "fieldName": "pwdName"
                      , "msgByteLngth": '${requestScope["ITEM.msgItemLngthMax"]}<%-- 해당 항목값의 길이가 최대값을 초과하였습니다. --%>', "maxByteSize": 200
                      , "msgMask": '${requestScope["ITEM.msgItemWrong"]}<%-- 해당 항목값이 잘못되었습니다. --%>', "maskChar": "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789~`!@#$%^&*()-_=+[{]}\|;:'\",<.>/? "
                    }
                  , {
                        "text": '${requestScope["ITEM.langCode"]}<%-- 언어코드 --%>', "fieldName": "langCode"
                      , "msgChcYn": '${requestScope["ITEM.msgChcItem"]}<%-- 해당 항목을 선택하십시오. --%>'
                      , "msgChcValue": '${requestScope["ITEM.msgItemWrong"]}<%-- 해당 항목값이 잘못되었습니다. --%>'
                    }
                ]);

                // 새로 등록하는 경우 비밀번호를 입력해야한다.
                if ( blnOutpt && gfnIsEmpty(objRow["rowId"]) )
                    blnOutpt = gfnVerifGridRow(objGv, objRow, numItemIndex, [ // 그리드 행 검증
                        {
                            "text": '${requestScope["ITEM.pwdName"]}<%-- 비밀번호명 --%>', "fieldName": "pwdName"
                          , "msgInputYn": '${requestScope["ITEM.msgInputItem"]}<%-- 해당 항목을 입력하십시오. --%>'
                        }
                    ]);

                return blnOutpt;
            }) ) return false;
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

        $('#divInqrCond [name="userId"]').blur(fnBlurUserId); // 포커스해제

        $("#divInqrCond :text").each(function() {
            // 조회조건내 텍스트박스에서 ENTER 키 입력시 조회한다.
            $(this).keydown(function(objEvent) { if ( 13 == objEvent["keyCode"] ) { fnBlurUserId(); btnInqr.click(); } });
        });
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
    gfnBindCombo("sltLangCode", "LANG_CODE", null, null, function()
        {
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
        <h3>사용자관리</h3>
        <div>
            <p><em><span class="ir common"></span>처음</em> &gt; 시스템관리 &gt; 사용자관리</p>
            <ul>
                <li><a href="#" class="excel"><span class="ir common"></span>엑셀다운로드</a></li>
                <li><button type="button" class="print"><span class="ir common"></span>인쇄</button></li>
                <li><a href="#" class="help"><span class="ir common"></span>도움말</a></li>
                <li><a href="#" class="fav"><span class="ir common"></span>즐겨찾기추가</a></li>
            </ul>
        </div>
    </div>

    <div id="divInqrCond" class="headSearch"><!-- 조회조건 //-->
        <fieldset>
            <label>${requestScope["ITEM.userId"]}<%-- 사용자ID --%></label>
            <input type="text" name="userId" class="TxtId" style="margin-right: 15px" maxlength="20" />
            <label>${requestScope["ITEM.userName"]}<%-- 사용자명 --%></label>
            <input type="text" name="userName" style="margin-right: 15px; ime-mode: active" maxlength="100" />
            <label>${requestScope["ITEM.useYn"]}<%-- 사용여부 --%></label>
            <select name="useYn" style="width: 80px; margin-right: 15px">
                <option value="" selected="selected">${requestScope["ITEM.comboTextAll"]}<%-- (전체) --%></option>
                <option value="Y">${requestScope["ITEM.comboTextYes"]}<%-- 예 --%></option>
                <option value="N">${requestScope["ITEM.comboTextNo"]}<%-- 아니오 --%></option>
            </select>
            <label>${requestScope["ITEM.adminYn"]}<%-- 관리자여부 --%></label>
            <select name="adminYn" style="width: 80px; margin-right: 15px">
                <option value="" selected="selected">${requestScope["ITEM.comboTextAll"]}<%-- (전체) --%></option>
                <option value="Y">${requestScope["ITEM.comboTextYes"]}<%-- 예 --%></option>
                <option value="N">${requestScope["ITEM.comboTextNo"]}<%-- 아니오 --%></option>
            </select>
            <span class="button smallGray"><button type="button" id="btnInqr">${requestScope["ITEM.inqr"]}<%-- 조회 --%></button></span>
        </fieldset>
    </div>

    <!-- 그리드 //-->
    <div style="margin-right: 20px;"><div id="divGrid" style="height: 210px"></div></div>
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
        <select id="sltLangCode"></select>
    </div>
<!-- Contents end //-->

<%@ include file="../../epfse/system/tabFtr.jsp" %><%-- 탭 푸터 --%>