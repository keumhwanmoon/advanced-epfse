<%--
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 사용자권한 그리드
    - 최초작성일 : 2014-06-26
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

    if ( '${requestScope["MENU.authCode"]}' == Base.WRITE_AUTH ) // 쓰기 권한이 있는 경우..
    {
         btnAdd.parentElement.style.visibility = "visible";
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
    fnInqr2(); // 조회2
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
      , "/member/getUserAuthList.do" // 목록 가져오기
        // 데이터(JSON Object Only)
      , gfnGetJsonFormData("divInqrCond")
    );
}
function fnInqr2()
{
    gfnReqGrid( // 그리드 요청
        // 그리드 ID
        g_strGridId + "2"
        // URI
      , "/member/getAuthRgstTargUserList.do" // 목록 가져오기
        // 데이터(JSON Object Only)
      , gfnGetJsonFormData("divInqrCond")
    );
}

//==============================================================================
// 추가
//------------------------------------------------------------------------------
function fnAdd()
{
    gfnReq( // 요청
        // URL
        "/member/rgstUserAuthList.do" // 목록 등록
        // 데이터
      , gfnGetFormData("divInqrCond") + Base.AND
      + "rowId=" + encodeURIComponent("'" + gfnGetGridChcColValue(g_strGridId + "2", "rowId", false).join("', '") + "'") // 행ID목록
        // 성공콜백함수
      , function(objData)
        {
            var RSLT_VALUE = gfnGetJsonValue(objData, [ Base.RSLT_NO ]);

            if ( Base.OK != RSLT_VALUE )
            {
                if ( Base.NO_DATA == RSLT_VALUE ) gfnDispMsg('${requestScope["ITEM.msgNoData"]}<%-- 데이터가 존재하지 않습니다. --%>', '${requestScope["ITEM.authId"]}<%-- 권한 --%> = ' + $('#divInqrCond [name="authId"]').val());
                else
                if ( !gfnIsBaseError(RSLT_VALUE) ) gfnDispMsg(Base.msgRsltError); // 요청결과 오류가 발생했습니다. 관리자에게 문의하십시오.
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
        "/member/deltUserAuthList.do" // 목록 삭제
        // 데이터
      , gfnGetFormData("divInqrCond") + Base.AND
      + "rowId=" + encodeURIComponent("'" + gfnGetGridChcColValue(g_strGridId, "rowId", false).join("', '") + "'") // 행ID목록
        // 성공콜백함수
      , function(objData)
        {
            var RSLT_VALUE = gfnGetJsonValue(objData, [ Base.RSLT_NO ]);

            if ( Base.OK != RSLT_VALUE )
            {
                if ( Base.NO_DATA == RSLT_VALUE ) gfnDispMsg('${requestScope["ITEM.msgNoData"]}<%-- 데이터가 존재하지 않습니다. --%>', '${requestScope["ITEM.authId"]}<%-- 권한 --%> = ' + $('#divInqrCond [name="authId"]').val());
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
    g_arrFieldName = "rowId|userId|userName|adminYn".split(Base.DELI1);

    gfnInitGrid(g_strGridId, g_arrFieldName, null, Base.GRID,
        {
            "pageId": "divPage" // 페이지 태그 ID
          , "columns": [
                { "width": 0, "fieldName": g_arrFieldName[0] } // 행ID
              , {
                    "header": { "text": '${requestScope["ITEM.rgstUser"]}<%-- 등록사용자 --%>' }, "width": 400
                  , "columns": [
                        { "header": { "text": '${requestScope["ITEM.userId"  ]}<%-- 사용자ID   --%>' }, "width": 140, "fieldName": g_arrFieldName[1] }
                      , { "header": { "text": '${requestScope["ITEM.userName"]}<%-- 사용자명   --%>' }, "width": 80, "fieldName": g_arrFieldName[2] }
                      , { "header": { "text": '${requestScope["ITEM.adminYn" ]}<%-- 관리자여부 --%>' }, "width": 80, "fieldName": g_arrFieldName[3], "styles": { "textAlignment": "center", "figureBackground": Grid.FIGURE_BACKGROUND, "figureInactiveBackground": Grid.FIGURE_INACTIVE_BACKGROUND }, "renderer": { "type": "check", "trueValues": "Y", "falseValues": "N" } }
                    ]
                }
            ]
          , "options": { "edit": { "readOnly": true } } // 읽기전용
        // 이벤트관련
          , "onclickpage": fnInqr // 페이지 클릭시..
        });

    gfnInitGrid(g_strGridId + "2", g_arrFieldName, null, Base.GRID,
        {
            "pageId": "divPage2" // 페이지 태그 ID
          , "columns": [
                { "width": 0, "fieldName": g_arrFieldName[0] } // 행ID
              , {
                    "header": { "text": '${requestScope["ITEM.rgstTargUser"]}<%-- 등록대상사용자 --%>' }, "width": 400
                  , "columns": [
                        { "header": { "text": '${requestScope["ITEM.userId"  ]}<%-- 사용자ID   --%>' }, "width": 100, "fieldName": g_arrFieldName[1] }
                      , { "header": { "text": '${requestScope["ITEM.userName"]}<%-- 사용자명   --%>' }, "width": 100, "fieldName": g_arrFieldName[2] }
                      , { "header": { "text": '${requestScope["ITEM.adminYn" ]}<%-- 관리자여부 --%>' }, "width": 80, "fieldName": g_arrFieldName[3], "styles": { "textAlignment": "center", "figureBackground": Grid.FIGURE_BACKGROUND, "figureInactiveBackground": Grid.FIGURE_INACTIVE_BACKGROUND }, "renderer": { "type": "check", "trueValues": "Y", "falseValues": "N" } }
                    ]
                }
            ]
          , "options": { "edit": { "readOnly": true } } // 읽기전용
        // 이벤트관련
          , "onclickpage": fnInqr2 // 페이지 클릭시..
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
        $(btnInqr).click(fnClickInqr); // 클릭
        $(btnAdd ).click(fnClickAdd );
        $(btnDelt).click(fnClickDelt);
    } else
    if ( "BFOREINQR" == strClsfy ) // 조회전
    {
        gfnClearGrid(g_strGridId); // 그리드 정리
        gfnClearGrid(g_strGridId + "2");

        $('#divInqrCond [name="authId"]').val(sltAuthId.value);
    }
}

//==============================================================================
// 콤보 바인딩
//------------------------------------------------------------------------------
function fnBindCombo()
{
    // URI 콤보 바인딩
    gfnBindComboUri("sltAuthId", "/menuauth/getComboAuthList.do", "anonyYn=N", // 익명여부 : 부
            $("#sltAuthId>option:first").text(), null, function() { fnInitGrid(); /* 그리드 초기화 */ });
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
        var MSG_CHG_ITEM = '${requestScope["ITEM.msgChgItem"]}'; // 해당 항목을 변경하십시오.

        // 입력여부 검증
        if ( !gfnVerifInputYn(lblAuthId.innerText, "sltAuthId", MSG_CHG_ITEM) ) return false; // 권한
    } else
    if ( "ADD" == strClsfy ) // 추가
    {
        if ( '${requestScope["MENU.authCode"]}' != Base.WRITE_AUTH ) // 쓰기 권한 검증
        {
            gfnDispMsg('${requestScope["ITEM.msgNoAuth"]}<%-- 권한이 없습니다. 관리자에게 문의하십시오. --%>');
            return false;
        }

        if ( 0 >= gfnGetInt(gfnCallGridFunc(g_strGridId + "2", "getItemCount()")) ) // 그리드 데이터가 존재하지 않는 경우..
        {
            gfnDispMsg('${requestScope["ITEM.msgNoData"]}<%-- 데이터가 존재하지 않습니다. --%>', '${requestScope["ITEM.rgstTargUser"]}<%-- 등록대상사용자 --%>');
            return false;
        } else
        if ( 0 >= gfnGetInt(gfnCallGridFunc(g_strGridId + "2", "getCheckedItems().length")) ) // 그리드 데이터를 선택하지 않은 경우..
        {
            gfnDispMsg('${requestScope["ITEM.msgListChc"]}<%-- 조회된 목록에서 데이터를 선택하십시오. --%>', '${requestScope["ITEM.rgstTargUser"]}<%-- 등록대상사용자 --%>');
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
            gfnDispMsg('${requestScope["ITEM.msgNoData"]}<%-- 데이터가 존재하지 않습니다. --%>', '${requestScope["ITEM.rgstUser"]}<%-- 등록사용자 --%>');
            return false;
        } else
        if ( 0 >= gfnGetInt(gfnCallGridFunc(g_strGridId, "getCheckedItems().length")) ) // 그리드 데이터를 선택하지 않은 경우..
        {
            gfnDispMsg('${requestScope["ITEM.msgListChc"]}<%-- 조회된 목록에서 데이터를 선택하십시오. --%>', '${requestScope["ITEM.rgstUser"]}<%-- 등록사용자 --%>');
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
        <h3>사용자권한</h3>
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

    <div class="headSearch" id="divInqrCond">
        <fieldset>
            <label id="lblAuthId" for="sltClsfy">${requestScope["ITEM.authId"]}<%-- 권한ID --%></label>
            <select id="sltAuthId" style="width: 200px">
                <option value="" selected="selected">${requestScope["ITEM.comboTextChc"]}<%-- (선택) --%></option>
            </select>
            <input type="hidden" name="authId" /><!-- 권한 //-->
            <span class="button smallGray"><button type="button" id="btnInqr">${requestScope["ITEM.inqr"]}<%-- 조회 --%></button></span>
        </fieldset>
    </div>

    <!-- 그리드 //-->
    <div style="margin-right: 20px;">
        <div style="float: left; width: 49%">
            <div id="divGrid" style="height: 225px"></div>
            <div id="divPage">
                <div class="pageNav" style="height: 26px"></div>

                <input type="hidden" name="page"    value="1"  /><!-- 페이지   //-->
                <input type="hidden" name="pageRow" value="10" /><!-- 페이지행 //-->
            </div>
        </div>
        <div>
            <div style="float: right; width: 50%">
                <div id="divGrid2" style="height: 225px"></div>
                <div id="divPage2">
                    <div class="pageNav" style="height: 26px"></div>

                    <input type="hidden" name="page"    value="1"  /><!-- 페이지   //-->
                    <input type="hidden" name="pageRow" value="10" /><!-- 페이지행 //-->
                </div>
            </div>
        </div>
    </div>

    <!-- 버튼 //-->
    <div class="buttonBox" style="text-align: right; margin-right: 20px; margin-top: 15px;" >
        <span class="button lime" style="visibility: hidden"><button type="button" id="btnAdd" >${requestScope["ITEM.add"]}<%-- 추가 --%></button></span>
        <span class="button gray" style="visibility: hidden"><button type="button" id="btnDelt">${requestScope["ITEM.delt"]}<%-- 삭제 --%></button></span>
    </div>
<!-- // contents -->

<%@ include file="../../epfse/system/tabFtr.jsp" %><%-- 탭 푸터 --%>