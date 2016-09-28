<%--
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 표준용어 조합
    - 최초작성일 : 2014-06-18
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
//==============================================================================
// 구분명 포커스해제시..
//------------------------------------------------------------------------------
function fnBlurClsfy2()
{
    txtClsfy2.value = txtClsfy2.value.toLowerCase();
}

//==============================================================================
// 구분 변경시..
//------------------------------------------------------------------------------
function fnChangeClsfy()
{
    if ( "7" == this.value )
    {
        txtClsfy2.value = Base.EMPTYSTR;
        txtClsfy2.style.imeMode = "disabled";
    } else
    {
        txtClsfy2.value = Base.EMPTYSTR;
        txtClsfy2.style.imeMode = "active";
    }
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
      , ( "5" == sltClsfy.value ? "/develop/getEngInqrStdtrmList.do" : "/develop/getKrnInqrStdtrmList.do" ) // 목록 가져오기
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
    g_arrFieldName = "rowId|krnName|engNfrmltName".split(Base.DELI1);

    gfnInitGrid(g_strGridId, g_arrFieldName, null, Base.GRID,
        {
            "columns": [
                { "width": 0, "fieldName": g_arrFieldName[0] } // 행ID
              , { "header": { "text": '${requestScope["ITEM.krnName"      ]}<%-- 한글명     --%>' }, "width": 150, "fieldName": g_arrFieldName[1] }
              , { "header": { "text": '${requestScope["ITEM.engNfrmltName"]}<%-- 영문약식명 --%>' }, "width": 150, "fieldName": g_arrFieldName[2] }
            ]
          , "options":
                {
                    "checkBar": { "visible": false } // 선택열 숨김
                  , "edit": { "readOnly": true } // 읽기전용
                }
        // 이벤트관련
          , "onloaddatacompleted": function(objDp) // 그리드 데이터 요청시 성공시..
                {
                    // 첫번째 행을 선택해준다.
                    gfnFocusGridCell(g_strGridId, 0, g_arrFieldName[1]);
                }
          , "onCurrentChanged": function(objGv, objCellIndex) // 포커스 변경시..
                {
                    // 그리드 정리시 좌측에 숨겨진 행ID 가 선택된다.
                    if ( "rowId" == objCellIndex.fieldName ) return;

                    fnCtrlScr("BFOREDTL"); // 화면 제어 : 상세전

                    fnDtl(gfnGetGridJsonRow(objGv, objCellIndex)); // 상세
                }
        });
}

//==============================================================================
// 상세
//------------------------------------------------------------------------------
function fnDtl(objRow)
{
    var KRN_NAME = objRow["krnName"], ENG_NFRMLT_NAME = objRow["engNfrmltName"];

    var arrKrnName = KRN_NAME.split(" | ");

    txtKrnName.value = arrKrnName[0];
    txtKrnName2.value = ( 1 < arrKrnName.length ? arrKrnName[1] : Base.EMPTYSTR);
    txtEngNfrmltName.value = ENG_NFRMLT_NAME;

    if ( null != ENG_NFRMLT_NAME )
    {
        var arrEngNfrmltName = ENG_NFRMLT_NAME.split("_");
        var LNGTH = arrEngNfrmltName.length;

        for ( var num = 0 ; num < LNGTH ; num++ )
            arrEngNfrmltName[num] = arrEngNfrmltName[num].substr(0, 1).toUpperCase() + arrEngNfrmltName[num].substr(1);

        txtEngNfrmltName2.value = ENG_NFRMLT_NAME.toUpperCase();
        txtEngNfrmltName3.value = arrEngNfrmltName.join(Base.EMPTYSTR); arrEngNfrmltName[0] = arrEngNfrmltName[0].toLowerCase();
        txtEngNfrmltName4.value = arrEngNfrmltName.join(Base.EMPTYSTR);

        arrEngNfrmltName = null;
    }

    arrKrnName = null;
}

// < Sub Procedure and Function - 차트 영역 >

// < Sub Procedure and Function - 화면 링크 및 이동 >

// < Sub Procedure and Function - 기타 영역+ >
//==============================================================================
// 화면 제어
//------------------------------------------------------------------------------
function fnCtrlScr(strClsfy)
{
    if ( "READY" == strClsfy ) // DOM준비
    {
        $(btnInqr).click(fnClickInqr); // 클릭

        $(txtClsfy2).blur(fnBlurClsfy2); // 포커스해제
        $(sltClsfy).change(fnChangeClsfy); // 변경

        $("#divInqrCond :text").each(function() {
            // 조회조건내 텍스트박스에서 ENTER 키 입력시 조회한다.
            $(this).keydown(function(objEvent) { if ( 13 == objEvent["keyCode"] ) btnInqr.click(); });
        });

        fnInitGrid(); // 그리드 초기화
    } else
    if ( "BFOREINQR" == strClsfy ) // 조회전
    {
        gfnClearGrid(g_strGridId); // 그리드 정리

        gfnClearScr("divDtl"); // 화면 정리
    } else
    if ( "BFOREDTL" == strClsfy ) // 상세전
    {
        gfnClearScr("divDtl"); // 화면 정리
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
        var MSG_INPUT_ITEM = '${requestScope["ITEM.msgInputItem"]}'; // 해당 항목을 입력하십시오.

        // 입력여부 검증
        if ( !gfnVerifInputYn(thoClsfy.innerText, "txtClsfy2", MSG_INPUT_ITEM) ) return false; // 구분
    }

    return true;
}
-->
</script>
<!-- // CSS 및 JavaScript 관련 -->

<!-- contents -->
<body>
    <div class="head">
        <h3>표준용어조합</h3>
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

    <div class="headSearch" id="divInqrCond">
        <fieldset>
            <label for="sltClsfy" id="thoClsfy">${requestScope["ITEM.clsfy"]}<%-- 구분 --%></label>
            <select id="sltClsfy" name="clsfyId" style="width: 15%">
                <option value="5" selected="selected">${requestScope["ITEM.krnName"]}<%-- 업무용어 --%></option>
                <option value="7">${requestScope["ITEM.engNfrmltName"]}<%-- 영문약식명 --%></option>
            </select>
            <input type="text" id="txtClsfy2" name="clsfyName" class="inputText01" style="ime-mode: active; width: 20%" maxlength="100" />

            <span class="button smallGray"><button type="button" id="btnInqr">${requestScope["ITEM.inqr"]}<%-- 조회 --%></button></span>
        </fieldset>
    </div>

    <!-- 그리드 //-->
    <div style="margin-right: 20px"><div id="divGrid" style="height: 182px"></div></div>

    <div style="margin-bottom: 20px"></div>
    <!-- 상세 //-->
    <div id="divDtl" class="yearInfo" style="margin-right: 20px">
        <table class="input01">
            <colgroup>
                <col />
                <col width="20%" />
                <col width="20%" />
                <col width="20%" />
                <col width="20%" />
            </colgroup>
            <tbody>
                <tr>
                    <th>${requestScope["ITEM.krnName"]}<%-- 한글텍스트 --%></th>
                    <td><input type="text" id="txtKrnName"  class="inputText01 readonly" style="cursor: hand" onclick='javascript: if ( 0 < this.value.length ) clipboardData.setData("text", this.value);' /></td>
                    <td><input type="text" id="txtKrnName2" class="inputText01 readonly" style="cursor: hand" onclick='javascript: if ( 0 < this.value.length ) clipboardData.setData("text", this.value);' /></td>
                    <td colspan="2" />
                </tr>
                <tr>
                    <th>${requestScope["ITEM.engNfrmltName"]}<%-- 영문약식명 --%></th>
                    <td><input type="text" id="txtEngNfrmltName"  class="inputText01 readonly" style="cursor: hand" onclick='javascript: if ( 0 < this.value.length ) clipboardData.setData("text", this.value);' /></td>
                    <td><input type="text" id="txtEngNfrmltName2" class="inputText01 readonly" style="cursor: hand" onclick='javascript: if ( 0 < this.value.length ) clipboardData.setData("text", this.value);' /></td>
                    <td><input type="text" id="txtEngNfrmltName3" class="inputText01 readonly" style="cursor: hand" onclick='javascript: if ( 0 < this.value.length ) clipboardData.setData("text", this.value);' /></td>
                    <td><input type="text" id="txtEngNfrmltName4" class="inputText01 readonly" style="cursor: hand" onclick='javascript: if ( 0 < this.value.length ) clipboardData.setData("text", this.value);' /></td>
                </tr>
            </tbody>
        </table>
    </div>
<!-- // contents -->

<%@ include file="../../epfse/system/tabFtr.jsp" %><%-- 탭 푸터 --%>