<%--
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 쿼리
    - 최초작성일 : 2014-04-29
    - 작  성  자 : 유광식
    - 비      고 : MyBatis 쿼리를 오라클 쿼리로 변환한다.
--------------------------------------------------------------------------------
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="../../epfse/system/tabHdr.jsp" %><%-- 헤더 관련 --%>
<!-- CSS 및 JavaScript 관련 -->
<script type="text/javascript">
<!--
//< Sub Procedure and Function - GLOBAL 영역 >

//< Sub Procedure and Function - MAIN 영역 >
//==============================================================================
// DOM 준비시..
//------------------------------------------------------------------------------
$(document).ready(function()
{
    gfnInit(); // 초기화
});

// < Sub Procedure and Function - 주요 이벤트 영역 >

// < Sub Procedure and Function - 비지니스 로직 호출 영역 >

// < Sub Procedure and Function - 그리드 영역 >

// < Sub Procedure and Function - 차트 영역 >

// < Sub Procedure and Function - 화면 링크 및 이동 >

// < Sub Procedure and Function - 기타 영역 >
//==============================================================================
// 변환
//------------------------------------------------------------------------------
function fnConvt()
{
    var str = txaMybatis.value;
    str = str.replace(/<!--/g, "  --")
             .replace(/<if/g, "-- if")
             .replace(/#\{/g, " :")
             .replace(/\}/g, Base.SPACE)
             .replace(/ :rowId /g, " :rowId_")
             .replace(/<!\[CDATA\[/g, "         ")
             .replace(/\]\]>/g, "   ");

    var DELI = '\r\n';
    var arr = str.split(DELI), LNGTH = arr.length;

    var TMP = "-- ", strStartTmp, strEndTmp;

    // ORDER BY 주석 시작태그라인과 종료태그라인 사이의 코드를 주석처리한다.
    strStartTmp = "  -- ORDER BY 문은 주석처리한다. START";
    strEndTmp   = "     ORDER BY 문은 주석처리한다. END";
    for ( var num = 0 ; num < LNGTH ; num++ )
    {
        if ( 0 <= arr[num].indexOf(strStartTmp) )
        {
            do
            {
                num++;
                arr[num] = TMP + arr[num];
            } while ( 0 > arr[num].indexOf(strEndTmp) )
        }
    }

    // if 시작태그라인과 종료태그라인 사이의 코드를 주석처리한다.
    strStartTmp = "-- if";
    strEndTmp   = "</if>";
    for ( var num = 0 ; num < LNGTH ; num++ )
    {
        if ( 0 <= arr[num].indexOf(strStartTmp) )
        {
            do
            {
                num++;
                arr[num] = TMP + arr[num];
            } while ( 0 > arr[num].indexOf(strEndTmp) )
        }
    }

    txaOracle.value = arr.join(DELI);
}
-->
</script>
<!-- // CSS 및 JavaScript 관련 -->

<!-- contents -->
<body>
    <div class="head">
        <h3>오라클쿼리화</h3>
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

    <div class="yearInfo" style="margin-right: 20px">
        <table class="input01">
            <colgroup>
                <col width="11%" />
                <col />
            </colgroup>
            <tbody>
                <tr>
                    <th>MyBatis</th>
                    <td style="padding-left: 0">
                        <textarea id="txaMybatis" style="height: 285px; overflow: scroll; width: 100%; word-wrap: normal" onkeyup="javascript: fnConvt();" oncontextmenu="javascript: return false;" title="키입력시 변환한다."></textarea>
                    </td>
                </tr>
                <tr>
                    <th>Oracle</th>
                    <td style="padding-left: 0">
                        <textarea id="txaOracle"  style="cursor: hand; height: 286px; overflow: scroll; width: 100%; word-wrap: normal" onclick='javascript: if ( 0 < this.value.length ) clipboardData.setData("text", this.value)' title="클릭시 복사한다."></textarea>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
<!-- // contents -->

<%@ include file="../../epfse/system/tabFtr.jsp" %><%-- 탭 푸터 --%>