<%--
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 마스크
    - 최초작성일 : 2014-04-29
    - 작  성  자 : 유광식
    - 비      고 :
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

    $("#txaLog").val("<gfnUnFormat() 예제>");
    fnSetLog("999,999,999,999", gfnUnformt("999,999,999,999", Base.STR_NUM));
    fnSetLog("-999,999,999,999.9999", gfnUnformt("-999,999,999,999.9999", Base.NUM));
    fnSetLog("2011-01-01", gfnUnformt("2011-01-01", Base.STR_NUM));
    fnSetLog("2011-01", gfnUnformt("2011-01", Base.STR_NUM));
    fnSetLog("133-040", gfnUnformt("133-040", Base.STR_NUM));
    fnSetLog("133-040", gfnUnformt("133-040", Base.STR_NUM));
    fnSetLog("123-45-67890", gfnUnformt("123-45-67890", Base.STR_NUM));
    fnSetLog("801222-1234567", gfnUnformt("801222-1234567", Base.STR_NUM));

    // 동적으로 변경이 가능함.
    //gfnSetDateUserDefineMask($("#txtEmssAmt"));
    //gfnSetCurrUserDefineMask($("#txtEmssAmt"), "15", "4", true);
});

// < Sub Procedure and Function - 주요 이벤트 영역 >

// < Sub Procedure and Function - 비지니스 로직 호출 영역 >

// < Sub Procedure and Function - 그리드 영역 >

// < Sub Procedure and Function - 차트 영역 >

// < Sub Procedure and Function - 화면 링크 및 이동 >

// < Sub Procedure and Function - 기타 영역 >
//==============================================================================
// 로그 설정
//------------------------------------------------------------------------------
function fnSetLog(strKey, objValue)
{
    if ( strKey == null ) strKey = "" ;

    var strLog = $("#txaLog").val();

    $("#txaLog").val(strLog + "\n" + strKey + " = " + "[" + objValue + "]");
}
-->
</script>
<!-- // CSS 및 JavaScript 관련 -->

<!-- contents -->
<body>
    <div class="head">
        <h3>마스크</h3>
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

    <div class="yearInfo" style="margin-right: 20px">
        <table class="input01">
            <colgroup>
                <col width="30%" />
                <col width="25%" />
                <col />
                <col width="25%" />
            </colgroup>
            <tbody>
                <tr>
                    <th>배출량 (-999,999,999,999.9999)</th>
                    <td><input type="text" id="txtEmssAmt" class="inputText01 TxtCurr" value="-999999999999999.9999가" userdefinemaskminusinputyn="Y" /></td>
                    <th>숫자 (0123456789)</th>
                    <td><input type="text" id="txtNum"     class="inputText01 TxtNum"  value="9999999999가" maxlength="10" /></td>
                </tr>
                <tr>
                    <th>생산량 (999,999,999,999.9999)</th>
                    <td><input type="text" id="txtPrdtAmt" class="inputText01 TxtCurr" value="-999999999999999.9999가" /></td>
                    <td />
                    <td />
                </tr>
                <tr>
                    <th>금액 (999,999,999,999,999)</th>
                    <td><input type="text" id="txtAmtm"    class="inputText01 TxtCurr" value="-999999999999999가" userdefinemaskdecmaxlength="0" /></td>
                    <td />
                    <td />
                </tr>
                <tr>
                    <th>율 (-999.99)</th>
                    <td><input type="text" id="txtRate"    class="inputText01 TxtCurr" value="-가99.998" userdefinemaskintmaxlength="3" userdefinemaskdecmaxlength="2" userdefinemaskminusinputyn="Y" /></td>
                    <td />
                    <td />
                </tr>
                <tr>
                    <th>날짜 (YYYY-MM-DD)</th>
                    <td><input type="text" id="txtDate"    class="inputText01 TxtDate" value="20110101가" /></td>
                    <td />
                    <td />
                </tr>
                <tr>
                    <th>년월 (YYYY-MM)</th>
                    <td><input type="text" id="txtYm"      class="inputText01 TxtDate" value="20111101" maxlength="7" /></td>
                    <td />
                    <td />
                </tr>
                <tr>
                    <th>우편번호 (999-999)</th>
                    <td><input type="text" id="txtPost"    class="inputText01 TxtPost" value="133040가" /></td>
                    <td />
                    <td />
                </tr>
                <tr>
                    <th>사업자등록번호 (999-99-99999)</th>
                    <td><input type="text" id="txtBzno"    class="inputText01 TxtBzno" value="123-45-67890가" /></td>
                    <td />
                    <td />
                </tr>
                <tr>
                    <!--<th>주민등록번호 (991939-4999999)</th>-->
                    <!--<td><input type="text" id="txtRsdno" value="801222-1234567가" class="inputText01 TxtRsdno" /></td>-->
                    <th>법인등록번호 (999999-9999999)</th>
                    <td><input type="text" id="txtCorpno"  class="inputText01 TxtCorpno" value="801222-1234567가" /></td>
                    <td />
                    <td />
                </tr>
                <tr>
                    <th>전화 (9999-9999-9999)</th>
                    <td><input type="text" id="txtTel"     class="inputText01 TxtTel"    value="02-123-4567가" /></td>
                    <td />
                    <td />
                </tr>
                <tr>
                    <th colspan="3">전자우편 (abcdefghjijklmnopqrstuvwxyz0123456789@.-_)</th>
                    <td><input type="text" id="txtEmail"   class="inputText01 TxtEmail"  value="p가pPurefool@hotmail.com" /></td>
                </tr>
                <tr>
                    <th colspan="3">시설ID (ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_)</th>
                    <td><input type="text" id="txtId"      class="inputText01 TxtId"     value="가나다1213_-34" /></td>
                </tr>
            </tbody>
        </table>
    </div>

    <div style="margin-right: 20px; margin-top: 20px">
        <textarea id="txaLog" style="height: 160px; width: 99%"></textarea>
    </div>
<!-- // contents -->

<%@ include file="../../epfse/system/tabFtr.jsp" %><%-- 탭 푸터 --%>