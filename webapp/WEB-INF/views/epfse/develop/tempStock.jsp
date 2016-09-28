<%--
--------------------------------------------------------------------------------
    PROJECT NAME : ES-REMS
--------------------------------------------------------------------------------
    - 단위업무명 : 감축목표 대비실적 조회(조직별)
    - 최초작성일 : 2014-10-30
    - 작  성  자 : 장경국
    - 비	  고 :
--------------------------------------------------------------------------------
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="../../epfse/system/tabHdr.jsp" %><%-- 헤더 관련 --%>
<!-- CSS 및 JavaScript 관련 START //-->
<script src="${pageContext.request.contextPath}/common/highstock/js/highstock.js"></script><!-- HIGHSTOCK 관련 //-->

<script type="text/javascript">
//< Sub Procedure and Function - GLOBAL 영역 >

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
    gfnReq( // 요청
        // URL
        "/develop/getListStock.do" // 정보 조회
        // 데이터
      , gfnGetFormData("divInqrCond")
        // 성공콜백함수
      , function(objData)
        {
            if ( null != objData[Base.RSLT_LIST] && 0 < objData[Base.RSLT_LIST].length)
                fnSetChart(objData[Base.RSLT_LIST]);
        }
    );
}

// < Sub Procedure and Function - 그리드 영역 >

// < Sub Procedure and Function - 화면 링크 및 이동 >

// < Sub Procedure and Function - 툴바 영역 >

// < Sub Procedure and Function - 기타 영역 >
//==============================================================================
// 화면 제어
//------------------------------------------------------------------------------
function fnCtrlScr(strClsfy)
{
    if ( "READY" == strClsfy ) // DOM준비
    {
        // 클릭
        $("#btnInqr").click(fnClickInqr); // 조회
    } else
    if ( "BFOREINQR" == strClsfy ) // 조회전
    {
        if ( null != $(divChart).highcharts() ) $(divChart).highcharts().destroy();
    }
}

//==============================================================================
// 콤보 바인딩
//------------------------------------------------------------------------------
function fnBindCombo()
{
    var CRRNT_YEAR = '${requestScope["CRRNT.date"]}'.substr(0, 4);

    // 년도 콤보  바인딩
    gfnBindYearCombo("sltCondInqrStyear", 2014, parseInt(CRRNT_YEAR, 10) + 4, $("#sltCondInqrStyear>option:first").text(), CRRNT_YEAR); // 조회년도
    gfnBindYearCombo("sltCondInqrEdyear", 2014, parseInt(CRRNT_YEAR, 10) + 4, $("#sltCondInqrEdyear>option:first").text(), parseInt(CRRNT_YEAR, 10) + 4); // 조회년도
}

//==============================================================================
// 검증
//------------------------------------------------------------------------------
function fnVerif(strClsfy)
{
    if ( "INQR" == strClsfy ) // 조회
    {
        var MSG_CHG_ITEM = '${requestScope["ITEM.msgChgItem"]}'; // 해당 항목을 변경하십시오.

        // 입력여부 검증
        if ( !gfnVerifInputYn("기간", "sltCondInqrStyear", MSG_CHG_ITEM) ) return false; // 업체ID
        if ( !gfnVerifInputYn("기간", "sltCondInqrEdyear", MSG_CHG_ITEM) ) return false; // 업체ID
    }

    return true;
}

//==============================================================================
//차트 설정
//------------------------------------------------------------------------------
function gfnCompleteLeftMenuHide() { if ( null != $(divChart).highcharts() ) $(window).resize(); } // 좌측메뉴숨김 완료시.. cf.) jquery.esmrv.ui.js
function gfnCompleteLeftMenuDisp() { if ( null != $(divChart).highcharts() ) $(window).resize(); } // 좌측메뉴표시 완료시.. cf.) jquery.esmrv.ui.js
function fnSetChart(objRsltList)
{
    var LNGTH = ( null != objRsltList ? objRsltList.length : 0 );
    if ( 0 >= LNGTH ) { gfnDispMsg('${requestScope["ITEM.msgNoData"]}<%-- 데이터가 존재하지 않습니다. --%>'); return; }

    fnSetChartDefault(LNGTH, objRsltList);
}
function fnSetChartDefault(numLngth, objRsltList)
{
    var arrSeriesData = new Array(), numIndexSeries = -1;

    // 차트 값 설정
    arrSeriesData[++numIndexSeries] = {
                                            "name": "측정량"
                                          , "data": objRsltList
                                          , "turboThreshold": objRsltList.length
                                          , "tooltip": { "valueDecimals": 3 }

                                      };

    fnSetChartColumnDrilldown(
        {
            "series": arrSeriesData
        });

    objRow = null; arrColumnChartData = null; objLineChartData = null; arrValuePlan = null; arrXpttn = null; arrAcmplsh = null;
}
function fnSetChartColumnDrilldown(objValue)
{
    $(divChart).highcharts('StockChart',
        {
            "chart": { "type": "line" }
          , "credits" : { enabled: false }
          , "title": { "text": Base.EMPTYSTR }
// 		  , "xAxis": { "type": "category", "labels": { "rotation": -45 } }
// 		  , "yAxis": { "title": { "text": "tCO2eq" } }
// 		  , "rangeSelector": { "selected": "1" }
          , "series": objValue.series
          , "tooltip": {
                            "pointFormat": '<span style="color:{point.color}; fonts-weight: bold;">{series.name}</span> : {point.y:.3f}'
                        }
// 		  , "plotOptions":{
// 							"series": {
// 								"borderWidth": 0
// 							  , "dataLabels": { "enabled": true, "format": '{point.y:.3f}' }
// 							}
// 						}
        });

    arrSeries = null;
}

</script>
<!-- CSS 및 JavaScript 관련 END   //-->

<body>
    <div class="head">
        <h3>HIGHSTOCK</h3>
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

<!-- 조회조건 //-->
    <div class="headSearch" id="divInqrCond">
        <fieldset>
            <div style="float: left; margin-right: 20px">
                <label for="sltCondInqrStyear">기간</label>
                <select id="sltCondInqrStyear" name="inqrStyear" style="width: 110px;">
                    <option value="" selected>${requestScope["ITEM.comboTextChc"]}<%-- (선택) --%></option>
                </select> ~
                <select id="sltCondInqrEdyear" name="inqrEdyear" style="width: 110px;">
                    <option value="" selected>${requestScope["ITEM.comboTextChc"]}<%-- (선택) --%></option>
                </select>
            </div>
            <span class="button smallGray"><button type="button" id="btnInqr">${requestScope["ITEM.inqr"]}<%-- 조회 --%></button></span>
        </fieldset>
    </div>

    <!-- 차트 //-->
    <div style="margin-right: 20px; overflow: hidden"><div id="divChart" style="height: 400px; width: 100%;"></div></div>

<%@ include file="../../epfse/system/tabFtr.jsp" %><%-- 탭 푸터 --%>