<%--
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 메뉴 트리
    - 최초작성일 : 2014-05-02
    - 작  성  자 : 유광식
    - 비      고 :
--------------------------------------------------------------------------------
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="../../epfse/system/tabHdr.jsp" %><%-- 헤더 관련 --%>
<!-- CSS 및 JavaScript 관련 -->
<link href="${pageContext.request.contextPath}/common/jstree/themes/default/style.min.css" rel="stylesheet" type="text/css" />

<script src="${pageContext.request.contextPath}/common/jstree/js/jstree.js" charset="utf-8"></script>
<script src="${pageContext.request.contextPath}/common/js/tree.js" charset="utf-8"></script>
<script type="text/javascript">
<!--
//< Sub Procedure and Function - GLOBAL 영역 >
var g_objTree =
    {
        "id": "divTree" // DIV 태그 ID (필수)
      , "output": "jstree" // 바인딩할 조회결과 key (필수)
      // 이벤트 관련
      , "select_node.jstree": function(objEvent, objInfo) // 노드 선택시..
            {
                hidTreeRowId.value = objInfo["node"].id; // 행ID

                fnInqrInfo(); // 정보 조회
            }
    };
var g_objTreeDlg =
    {
        "id": "divTreeDlg" // DIV 태그 ID (필수)
      , "output": "jstree" // 바인딩할 조회결과 key (필수)
    };
g_strDivIdDtl = "divTree"; // 화면내 div 높이 설정을 위한 변수

//< Sub Procedure and Function - MAIN 영역 >
//==============================================================================
// DOM 준비시..
//------------------------------------------------------------------------------
$(document).ready(function()
{
    gfnInit(); // 초기화
    fnCtrlScr("READY"); // 화면 제어 : DOM준비
    fnBindCombo(); // 콤보 바인딩

    btnInqr.click(); // 화면 로드시 조회한다.

    if ( '${requestScope["MENU.authCode"]}' == Base.WRITE_AUTH ) // 쓰기 권한이 있는 경우..
    {
         btnAdd.parentElement.style.visibility = "visible";
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

    fnInqr(g_objTree); // 조회
}

//==============================================================================
// 검색 클릭시..
//------------------------------------------------------------------------------
function fnClickSearch()
{
    fnCtrlScr("BFORESEARCH"); // 화면 제어 : 검색전

    fnInqr(g_objTreeDlg); // 조회
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
// 저장 클릭시..
//------------------------------------------------------------------------------
function fnClickSave()
{
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

//==============================================================================
// 선택 클릭시..
//------------------------------------------------------------------------------
function fnClickChc()
{
    if ( !fnVerif("CHC") ) return; // 검증 : 선택

    fnCtrlScr("BFORECHC"); // 화면 제어 : 선택전

    fnChc(); // 선택
}

// < Sub Procedure and Function - 비지니스 로직 호출 영역 >
//==============================================================================
// 조회
//------------------------------------------------------------------------------
function fnInqr(objTree)
{
    gfnReq( // 요청
        // URL
        "/menuauth/getTreeMenuList.do" // 트리 목록 가져오기
        // 데이터
      , gfnGetFormData("divInqrCond")
        // 성공콜백함수
      , function(objData)
        {
            gfnBindTree(objTree, objData); // 트리 바인딩

            // 바인딩 후 기존에 선택된 노드를 다시 선택해준다.
            if ( !gfnIsEmpty(hidTreePrevRowId.value) )
            {
                $("#" + objTree["id"] + ":jstree").jstree("select_node", hidTreePrevRowId.value); // 노드 선택

                hidTreePrevRowId.value = Base.EMPTYSTR;
            }
        }
    );
}

//==============================================================================
// 정보 조회
//------------------------------------------------------------------------------
function fnInqrInfo()
{
    gfnReq( // 요청
        // URL
        "/menuauth/getMenuInfo.do" // 정보 조회
        // 데이터
      , gfnGetFormData("divInqrCond")
        // 성공콜백함수
      , function(objData)
        {
            var objRsltInfo = gfnGetJsonValue(objData, [ Base.RSLT_INFO ]);

            if ( null == objRsltInfo )
                gfnDispMsg('${requestScope["ITEM.msgNoData"]}<%-- 데이터가 존재하지 않습니다. --%>');
            else
                // JSON 객체 항목 바인딩
                gfnBindJsonObjItem(objRsltInfo, "tblEdit", fnBindEdit);

            objRsltInfo = null;
        }
    );
}

//==============================================================================
// 추가
//------------------------------------------------------------------------------
function fnAdd()
{
    var arr = $("#" + g_objTree["id"] + ":jstree").jstree("get_selected"); // 선택된 노드 ID 배열 가져오기
    var PRNTS_MENU_NO = ( 0 < arr.length ? arr[0] : Base.EMPTYSTR );
    arr = null;

    gfnReq( // 요청
        // URL
        "/menuauth/rgstMenuInfo.do" // 정보 등록
        // 데이터
      , "prntsMenuNo=" + encodeURIComponent(PRNTS_MENU_NO) // 부모메뉴번호
        // 성공콜백함수
      , function(objData)
        {
            var RSLT_VALUE = gfnGetJsonValue(objData, [ Base.RSLT_NO ]);

            if ( Base.OK != RSLT_VALUE )
            {
                if ( Base.NO_DATA == RSLT_VALUE )
                    gfnDispMsg('${requestScope["ITEM.msgSaveNoData"]}<%-- 저장된 데이터가 존재하지 않습니다. --%>');
                else
                if ( !gfnIsBaseError(RSLT_VALUE) ) gfnDispMsg(Base.msgRsltError); // 요청결과 오류가 발생했습니다. 관리자에게 문의하십시오.
            } else
            {
                gfnDispMsg('${requestScope["ITEM.msgSaveOk"]}<%-- 저장이 완료되었습니다. --%>');

                var ROW_ID = gfnGetJsonValue(objData, [ Base.RSLT_INFO, "rowId" ]);

                if ( null != ROW_ID )
                {
                    hidTreeRowId.value = ROW_ID;

                    hidTreePrevRowId.value = hidTreeRowId.value;
                    btnInqr.click(); // 저장 완료시 조회한다.
                }
            }
        }
    );
}

//==============================================================================
// 저장
//------------------------------------------------------------------------------
function fnSave()
{
    gfnReq( // 요청
        // URL
        "/menuauth/updtMenuInfo.do" // 정보 수정
        // 데이터
      , gfnGetFormData("divInqrCond") + Base.AND + gfnGetFormData("tblEdit")
        // 성공콜백함수
      , function(objData)
        {
            var RSLT_VALUE = gfnGetJsonValue(objData, [ Base.RSLT_NO ]);

            if ( Base.OK != RSLT_VALUE )
            {
                if ( -1 == RSLT_VALUE ) // ROOT중복
                    gfnDispMsg('${requestScope["ITEM.msgRootDup"]}<%-- 사용가능한 ROOT 메뉴는 2개이상 존재할 수 없습니다. --%>');
                else
                if ( -3 == RSLT_VALUE ) // 주소중복
                    gfnDispMsg('${requestScope["ITEM.msgAddrDup"]}<%-- 메뉴주소가 동일한 메뉴는 2개이상 존재할 수 없습니다. --%>');
                else
                if ( Base.NO_DATA == RSLT_VALUE )
                    gfnDispMsg('${requestScope["ITEM.msgSaveNoData"]}<%-- 저장된 데이터가 존재하지 않습니다. --%>');
                else
                if ( Base.DATA_DUP == RSLT_VALUE )
                    gfnDispMsg('${requestScope["ITEM.msgRgstData"]}<%-- 이미 등록된 데이터입니다. 다시 확인하십시오. --%>');
                else
                if ( !gfnIsBaseError(RSLT_VALUE) ) gfnDispMsg(Base.msgRsltError); // 요청결과 오류가 발생했습니다. 관리자에게 문의하십시오.
            } else
            {
                gfnDispMsg('${requestScope["ITEM.msgSaveOk"]}<%-- 저장이 완료되었습니다. --%>');

                var ROW_ID = gfnGetJsonValue(objData, [ Base.RSLT_INFO, "rowId" ]);

                if ( null != ROW_ID )
                {
                    hidTreeRowId.value = ROW_ID;

                    hidTreePrevRowId.value = hidTreeRowId.value;

                    btnInqr.click(); // 저장 완료시 조회한다.
                }
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
        "/menuauth/deltMenuInfo.do" // 정보 삭제
        // 데이터
      , gfnGetFormData("divInqrCond")
        // 성공콜백함수
      , function(objData)
        {
            var RSLT_VALUE = gfnGetJsonValue(objData, [ Base.RSLT_NO ]);

            if ( Base.OK != RSLT_VALUE )
            {
                if ( Base.NO_DATA == RSLT_VALUE )
                    gfnDispMsg('${requestScope["ITEM.msgSaveNoData"]}<%-- 저장된 데이터가 존재하지 않습니다. --%>');
                else
                if ( !gfnIsBaseError(RSLT_VALUE) ) gfnDispMsg(Base.msgRsltError); // 요청결과 오류가 발생했습니다. 관리자에게 문의하십시오.
            } else
            {
                gfnDispMsg('${requestScope["ITEM.msgDeltOk"]}<%-- 삭제가 완료되었습니다. --%>');

                var ROW_ID = gfnGetJsonValue(objData, [ Base.RSLT_INFO, "rowId" ]);

                if ( null != ROW_ID && "#" != ROW_ID )
                    hidTreeRowId.value = ROW_ID;
                else
                    hidTreeRowId.value = Base.EMPTYSTR;

                hidTreePrevRowId.value = hidPrntsMenuNo.value;

                btnInqr.click(); // 저장 완료시 조회한다.
            }
        }
    );
}

// < Sub Procedure and Function - 그리드 영역 >
//==============================================================================
// 선택
//------------------------------------------------------------------------------
function fnChc()
{
    var arr = $("#" + g_objTreeDlg["id"] + ":jstree").jstree("get_selected", true); // 선택된 노드 객체 배열 가져오기

    $('#tblEdit [name="prntsMenuName"]').val(arr[0].text);
    hidPrntsMenuNo.value = arr[0].id;

    arr = null;
}

// < Sub Procedure and Function - 차트 영역 >

// < Sub Procedure and Function - 화면 링크 및 이동 >
//==============================================================================
// 상세
//------------------------------------------------------------------------------
function fnDtl(strRowId)
{
    // 페이지 이동
    gfnMovePage("/menuauth/menuDtl.do?rowId=" + encodeURIComponent(strRowId)); // 상세
}

//==============================================================================
// 등록
//------------------------------------------------------------------------------
function fnRgst()
{
    // 페이지 이동
    gfnMovePage("/menuauth/menuEdit.do"); // 편집
}

// < Sub Procedure and Function - 기타 영역 >
//==============================================================================
// 화면 제어
//------------------------------------------------------------------------------
function fnCtrlScr(strClsfy)
{
    if ( "READY" == strClsfy ) // DOM준비
    {
        $(btnInqr  ).click(fnClickInqr  ); // 클릭
        $(ancSearch).click(fnClickSearch);
        $(btnAdd   ).click(fnClickAdd   );
        $(btnSave  ).click(fnClickSave  );
        $(btnDelt  ).click(fnClickDelt  );
        $(btnDlgChc).click(fnClickChc   );

        $(divTreeDlg).dblclick(fnClickChc);
    } else
    if ( "BFORESEARCH" == strClsfy ) // 검색전
    {
        gfnClearTree(g_objTreeDlg); // 트리 정리

        hidTreePrevRowId.value = hidPrntsMenuNo.value;

        $('a[href="#divDlg"]').click();
    } else
    if ( "BFOREINQR" == strClsfy ) // 조회전
    {
        gfnClearTree(g_objTree); // 트리 정리

        gfnClearScr("tblEdit"); // 화면 정리
    } else
    if ( "BFORECHC" == strClsfy ) // 선택전
    {
        $("#divDlg>.closeLayer").click();
    }
}

//==============================================================================
// 콤보 바인딩
//------------------------------------------------------------------------------
function fnBindCombo()
{
    gfnBindCombo("sltAuthCode", hidAuthCodeHdrId.value, "&nbsp;");
}

//==============================================================================
// 검증
//------------------------------------------------------------------------------
function fnVerif(strClsfy)
{
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
        var MSG_CHC_ITEM   = '${requestScope["ITEM.msgChcItem"  ]}'; // 해당 항목을 선택하십시오.
        var MSG_INPUT_ITEM = '${requestScope["ITEM.msgInputItem"]}'; // 해당 항목을 입력하십시오.

        if ( '${requestScope["MENU.authCode"]}' != Base.WRITE_AUTH ) // 쓰기 권한 검증
        {
            gfnDispMsg('${requestScope["ITEM.msgNoAuth"]}<%-- 권한이 없습니다. 관리자에게 문의하십시오. --%>');
            return false;
        }

        if ( 0 >= $("#" + g_objTree["id"] + ":jstree").length ) // 트리가 바인딩되지 않은 경우..
        {
            gfnDispMsg('${requestScope["ITEM.msgNoData"]}<%-- 데이터가 존재하지 않습니다. --%>');
            return false;
        }

        // 트리 노드를 선택하지 않은 경우..
        if ( 0 >= $("#" + g_objTree["id"] + ":jstree").jstree("get_selected").length ) // 선택된 노드 ID 배열 가져오기
        {
            gfnDispMsg('${requestScope["ITEM.msgListChc"]}<%-- 조회된 목록에서 데이터를 선택하십시오. --%>');
            return false;
        }

        // 입력여부 검증
        if ( !gfnVerifInputYn(     thoMenuNo.innerText, "hidTreeRowId"  , MSG_CHC_ITEM  ) ) return false; // 메뉴번호
        if ( !gfnVerifInputYn(     thoMenuNo.innerText, "txtMenuNo"     , MSG_INPUT_ITEM) ) return false; // 메뉴번호
        if ( !gfnVerifInputYn(   thoMenuName.innerText, "txtMenuName"   , MSG_INPUT_ITEM) ) return false; // 메뉴명
        if ( !gfnVerifInputYn(  thoIntrrName.innerText, "txtIntrrName"  , MSG_INPUT_ITEM) ) return false; // 내부명
        if ( !gfnVerifInputYn(thoDispOrderNo.innerText, "txtDispOrderNo", MSG_INPUT_ITEM) ) return false; // 표시순서번호
    } else
    if ( "DELT" == strClsfy ) // 삭제
    {
        if ( '${requestScope["MENU.authCode"]}' != Base.WRITE_AUTH ) // 쓰기 권한 검증
        {
            gfnDispMsg('${requestScope["ITEM.msgNoAuth"]}<%-- 권한이 없습니다. 관리자에게 문의하십시오. --%>');
            return false;
        }

        if ( 0 >= $("#" + g_objTree["id"] + ":jstree").length ) // 트리가 바인딩되지 않은 경우..
        {
            gfnDispMsg('${requestScope["ITEM.msgNoData"]}<%-- 데이터가 존재하지 않습니다. --%>');
            return false;
        }

        // 트리 노드를 선택하지 않은 경우..
        if ( 0 >= $("#" + g_objTree["id"] + ":jstree").jstree("get_selected").length ) // 선택된 노드 ID 배열 가져오기
        {
            gfnDispMsg('${requestScope["ITEM.msgListChc"]}<%-- 조회된 목록에서 데이터를 선택하십시오. --%>');
            return false;
        }
    } else
    if ( "CHC" == strClsfy ) // 선택
    {
        if ( 0 >= $("#" + g_objTreeDlg["id"] + ":jstree").length ) // 트리가 바인딩되지 않은 경우..
        {
            gfnDispMsg('${requestScope["ITEM.msgNoData"]}<%-- 데이터가 존재하지 않습니다. --%>');
            return false;
        }

        var LNGTH = $("#" + g_objTreeDlg["id"] + ":jstree").jstree("get_selected").length; // 선택된 노드 ID 배열 가져오기

        if ( 0 >= LNGTH ) // 트리 노드를 선택하지 않은 경우..
        {
            gfnDispMsg('${requestScope["ITEM.msgListChc"]}<%-- 조회된 목록에서 데이터를 선택하십시오. --%>');
            return false;
        } else
        if ( 2 <= LNGTH ) // 트리 노드를 2 개 이상 선택한 경우..
        {
            gfnDispMsg('${requestScope["ITEM.msgListChcOne"]}<%-- 조회된 목록에서 데이터를 하나만 선택하십시오. --%>');
            return false;
        }
    }

    return true; // 리턴 처리
}

//==============================================================================
// 편집 바인딩
//------------------------------------------------------------------------------
function fnBindEdit(objRsltInfo)
{
    if ( null == objRsltInfo ) return;
}
-->
</script>
<!-- // CSS 및 JavaScript 관련 -->

<body>
    <div class="head">
        <h3>메뉴관리</h3>
        <div>
            <p><em><span class="ir common"></span>처음</em> &gt; 시스템관리 &gt; 메뉴관리</p>
            <ul>
                <li><a href="#" class="excel"><span class="ir common"></span>엑셀다운로드</a></li>
                <li><button type="button" class="print"><span class="ir common"></span>인쇄</button></li>
                <li><a href="#" class="help"><span class="ir common"></span>도움말</a></li>
                <li><a href="#" class="fav"><span class="ir common"></span>즐겨찾기추가</a></li>
            </ul>
        </div>
    </div>

    <div id="divInqrCond" style="display: none">
        <table class="InquiryBox mg_btm20">
            <colgroup>
                <col width="" />
                <col width="10%" />
            </colgroup>
            <tbody>
                <tr>
                    <td>&nbsp;</td>
                    <td class="NolineL" style="padding-right: 5px; text-align: right"><div class="BtnStyle InputType"><button type="button" id="btnInqr">${requestScope["ITEM.inqr"]}<%-- 조회 --%></button></div></td>
                </tr>
            </tbody>
        </table>

        <input type="hidden" id="hidTreeRowId" name="rowId" /><!-- 행ID //-->
        <input type="hidden" id="hidTreePrevRowId" /><!-- 이전행ID //-->
    </div>

    <div class="divBox">
        <div class="divLeft" style="width: 40%">
            <div class="normalInfo">
                <h4 class="title01">${requestScope["ITEM.menuChc"]}<%-- 메뉴 선택 --%></h4>

                <div style="height: 370px; overflow: auto"><div id="divTree"></div></div><!-- 트리 //-->

                <!-- 버튼 //-->
                <div class="buttonBox">
                    <span class="button lime" style="visibility: hidden"><button type="button" id="btnAdd" >${requestScope["ITEM.add"]}<%-- 추가 --%></button></span>
                    <span class="button gray" style="visibility: hidden"><button type="button" id="btnDelt">${requestScope["ITEM.delt"]}<%-- 삭제 --%></button></span>
                </div>
            </div>
        </div>

        <!-- 편집 //-->
        <div class="divRight" style="width: 60%">
            <div class="yearInfo">
                <h4 class="title02">${requestScope["ITEM.chcMenuMng"]}<%-- 선택 메뉴 관리 --%></h4>

                <table id="tblEdit" class="input01">
                    <colgroup>
                        <col width="20%" />
                        <col width="20%" />
                        <col />
                    </colgroup>
                    <tbody>
                        <tr>
                            <th class="require" id="thoMenuNo">${requestScope["ITEM.menuNo"]}<%-- 메뉴번호 --%></th>
                            <td><input type="text" id="txtMenuNo" name="menuNo" class="inputText01 TxtNumMan" style="text-align: right" maxlength="10" onkeydown="javascript: if ( 13 == event.keyCode ) fnClickSave();" /></td>
                            <td />
                        </tr>
                        <tr>
                            <th>${requestScope["ITEM.prntsMenuNo"]}<%-- 부모메뉴번호 --%></th>
                            <td colspan="2">
                                <div>
                                    <input type="text" name="prntsMenuName" class="inputText01 readonly" style="width: 65%" />
                                    <a id="ancSearch" href="#"><span>검색</span></a>
                                    <input type="text" id="hidPrntsMenuNo" name="prntsMenuNo" /><!-- 부모메뉴번호 //-->
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th class="require" id="thoMenuName">${requestScope["ITEM.menuName"]}<%-- 메뉴명 --%></th>
                            <td colspan="2"><input type="text" id="txtMenuName"  name="menuName"  class="inputText01" style="ime-mode: active" maxlength="100" onkeydown="javascript: if ( 13 == event.keyCode ) fnClickSave();" /></td>
                        </tr>
                        <tr>
                            <th class="require" id="thoIntrrName">${requestScope["ITEM.intrrName"]}<%-- 내부명 --%></th>
                            <td colspan="2"><input type="text" id="txtIntrrName" name="intrrName" class="inputText01" style="ime-mode: active" maxlength="100" onkeydown="javascript: if ( 13 == event.keyCode ) fnClickSave();" /></td>
                        </tr>
                        <tr>
                            <th class="required" id="thoIntrrName">솔루션여부</th>
                            <td colspan="2">
                                <select id="sltSltnYn" name="sltnYn" class="onlyChild" onkeydown="javascript: if ( 13 == event.keyCode ) fnClickSave();">
                                    <option value="Y" selected>솔루션</option>
                                    <option value="N">프로젝트</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th class="required" id="thoSltnName">솔루션명</th>
                            <td colspan="2"><input type="text" id="txtSltnName" name="sltnName" class="onlyChild" maxlength="100" style="ime-mode: active" onkeydown="javascript: if ( 13 == event.keyCode ) fnClickSave();" /></td>
                        </tr>
                        <tr>
                            <th>${requestScope["ITEM.menuAddrName"]}<%-- 메뉴주소명 --%></th>
                            <td colspan="2"><input type="text" name="menuAddrName" class="inputText01" style="ime-mode: active" maxlength="100" onkeydown="javascript: if ( 13 == event.keyCode ) fnClickSave();" /></td>
                        </tr>
                        <tr>
                            <th class="require" id="thoDispOrderNo">${requestScope["ITEM.dispOrderNo"]}<%-- 표시순서번호 --%></th>
                            <td><input type="text" id="txtDispOrderNo" name="dispOrderNo" class="inputText01 TxtNumMan" style="text-align: right" maxlength="3" onkeydown="javascript: if ( 13 == event.keyCode ) fnClickSave();" /></td>
                            <td />
                        </tr>
                        <tr>
                            <th class="require">${requestScope["ITEM.dispYn"]}<%-- 표시여부 --%></th>
                            <td>
                                <select id="sltDispYn" name="dispYn" style="width: 100%" onkeydown="javascript: if ( 13 == event.keyCode ) fnClickSave();">
                                    <option value="Y" selected="selected">${requestScope["ITEM.comboTextYes"]}<%-- 예 --%></option>
                                    <option value="N">${requestScope["ITEM.comboTextNo"]}<%-- 아니오 --%></option>
                                </select>
                            </td>
                            <td />
                        </tr>
                        <tr>
                            <th class="require">${requestScope["ITEM.useYn"]}<%-- 사용여부 --%></th>
                            <td>
                                <select name="useYn" style="width: 100%" onkeydown="javascript: if ( 13 == event.keyCode ) fnClickSave();">
                                    <option value="Y" selected="selected">${requestScope["ITEM.comboTextYes"]}<%-- 예 --%></option>
                                    <option value="N">${requestScope["ITEM.comboTextNo"]}<%-- 아니오 --%></option>
                                </select>
                            </td>
                            <td />
                        </tr>
                        <tr>
                            <th>${requestScope["ITEM.authCode"]}<%-- 권한코드 --%></th>
                            <td>
                                <select id="sltAuthCode" name="authCode" style="width: 100%" onkeydown="javascript: if ( 13 == event.keyCode ) fnClickSave();" ></select>
                                <input type="hidden" id="hidAuthCodeHdrId" value="MENU_AUTH" /><!-- 권한코드헤더ID //-->
                            </td>
                            <td />
                        </tr>
                        <tr>
                            <th class="require" colspan="2">${requestScope["ITEM.clsfyUseYn"]}<%-- 구분사용여부 --%></th>
                            <td>
                                <select name="clsfyUseYn" style="width: 80px" onkeydown="javascript: if ( 13 == event.keyCode ) fnClickSave();">
                                    <option value="Y" selected="selected">${requestScope["ITEM.comboTextYes"]}<%-- 예 --%></option>
                                    <option value="N">${requestScope["ITEM.comboTextNo"]}<%-- 아니오 --%></option>
                                </select>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- 버튼 //-->
            <div class="buttonBox">
                <span class="button green" style="visibility: hidden"><button type="button" id="btnSave">${requestScope["ITEM.save"]}<%-- 저장 --%></button></span>
            </div>
        </div>

        <!-- 대화창 //-->
        <!-- s : popup layer -->
        <a href="#divDlg" class="openLayer" style="display: none">레이어호출</a>
        <div id="divDlg" class="popup" style="margin:-190px 0 0 -185px; width: 370px">
            <h1 class="normal">${requestScope["ITEM.prntsMenuNo"]}<%-- 부모메뉴번호 --%></h1>
            <button type="button" class="closeLayer"><span class="ir"></span>레이어 닫기</button>

            <div class="content">
                <div style="border: solid 1px lightgray; height: 370px; width: 100%; overflow: auto"><div id="divTreeDlg"></div></div><!-- 트리 //-->
            </div>

            <!-- 버튼 //-->
            <div class="buttonBox">
                <span class="button smallWhite"><button type="button" id="btnDlgChc">${requestScope["ITEM.chc"]}<%-- 선택 --%></button></span>
                <span class="button smallWhite"><button type="button" class="closeLayer">${requestScope["ITEM.close"]}<%-- 닫기 --%></button></span>
            </div>
        </div>
    </div>
<!-- // contents -->

<%@ include file="../../epfse/system/tabFtr.jsp" %><%-- 탭 푸터 --%>