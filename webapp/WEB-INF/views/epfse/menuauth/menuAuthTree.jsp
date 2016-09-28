<%--
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 메뉴권한 트리
    - 최초작성일 : 2014-06-26
    - 작  성  자 : 유광식
    - 비      고 :
--------------------------------------------------------------------------------
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="../../epfse/system/tabHdr.jsp" %><%-- 헤더 관련 --%>
<!-- CSS 및 JavaScript 관련 -->
<link href="${pageContext.request.contextPath}/common/jstree/themes/default/style.min.css" rel="stylesheet" type="text/css" />

<script type="text/javascript" src="${pageContext.request.contextPath}/common/realGrid/scripts/browserCheck.js"></script><!-- 그리드 관련 //-->
<script type="text/javascript" src="${pageContext.request.contextPath}/common/realGrid/scripts/realgridlic.js" ></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/common/realGrid/scripts/realgridplus.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/common/realGrid/scripts/realgridutil.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/common/realGrid/scripts/swfobject.js"   ></script>

<script src="${pageContext.request.contextPath}/common/js/grid.js" charset="utf-8"></script><!-- 그리드 jQuery //-->
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
                fnCtrlScr("BFORENODECHC"); // 화면 제어 : 노드선택전

                hidTreeRowId.value = objInfo["node"].id; // 행ID

                fnInqrInfo(); // 정보 조회
                fnInqrList(); // 목록 조회
            }
    };
var g_strGridId = "divGrid", g_arrFieldName = null; // 그리드ID // 그리드 FIELD 명
g_strDivIdDtl = "divTree"; // 화면내 div 높이 설정을 위한 변수
g_numMinusHeight = 555;

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
             btnSave.parentElement.style.visibility = "visible";
         btnReadAuth.parentElement.style.visibility = "visible";
        btnWriteAuth.parentElement.style.visibility = "visible";
           btnNoAuth.parentElement.style.visibility = "visible";
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
// 저장 클릭시..
//------------------------------------------------------------------------------
function fnClickSave()
{
    if ( chkChildApplyYn.checked )
    {
        if ( !gfnCnfmMsg('${requestScope["ITEM.msgChildApplyCnfm"]}') ) return; // 선택한 메뉴 및 모든 하위메뉴에 대하여 해당 메뉴권한으로 저장하시겠습니까?
    }

    if ( !fnVerif("SAVE") ) return; // 검증 : 저장

    fnSave(); // 저장
}

//==============================================================================
// 읽기권한 클릭시..
//------------------------------------------------------------------------------
function fnClickReadAuth()
{
    if ( !fnVerif("SAVELIST") ) return; // 검증 : 목록저장

    fnSaveList("5"); // 목록 저장 // 읽기
}

//==============================================================================
// 쓰기권한 클릭시..
//------------------------------------------------------------------------------
function fnClickWriteAuth()
{
    if ( !fnVerif("SAVELIST") ) return; // 검증 : 목록저장

    fnSaveList("7"); // 목록 저장 // 쓰기
}

//==============================================================================
// N/A 클릭시..
//------------------------------------------------------------------------------
function fnClickNoAuth()
{
    if ( !fnVerif("SAVELIST") ) return; // 검증 : 목록저장

    fnSaveList(Base.EMPTYSTR); // 목록 저장 // N/A
}

// < Sub Procedure and Function - 비지니스 로직 호출 영역 >
//==============================================================================
// 조회
//------------------------------------------------------------------------------
function fnInqr(objTree)
{
    gfnReq // 요청
    (
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
    gfnReq // 요청
    (
        // URL
            "/menuauth/getMenuAuthInfo.do" // 정보 조회
        // 데이터
          , gfnGetFormData("divInqrCond")
        // 성공콜백함수
          , function(objData)
            {
                if ( null == objData[Base.RSLT_INFO] )
                    gfnDispMsg('${requestScope["ITEM.msgNoData"]}<%-- 데이터가 존재하지 않습니다. --%>');
                else
                    // JSON 객체 항목 바인딩
                    gfnBindJsonObjItem(objData[Base.RSLT_INFO], "tblEdit", fnBindEdit);
            }
    );
}

//==============================================================================
// 목록 조회
//------------------------------------------------------------------------------
function fnInqrList()
{
    if ( !gfnIsEmpty(hidPrevPage.value) )
    {
        $('#divPage [name="page"]').val(hidPrevPage.value);

        hidPrevPage.value = Base.EMPTYSTR;
    }

    fnCtrlScr("BFOREINQRLIST"); // 화면 제어 : 목록조회처리전

    gfnReqGrid( // 그리드 요청
        // 그리드 ID
        g_strGridId
        // URI
      , "/menuauth/getMenuAuthList.do" // 목록 가져오기
        // 데이터(JSON Object Only)
      , gfnGetJsonFormData("divInqrCond")
    );
}

//==============================================================================
// 저장
//------------------------------------------------------------------------------
function fnSave()
{
    gfnReq // 요청
    (
        // URL
            "/menuauth/saveMenuAuthList.do" // 목록 저장
        // 데이터
          , "rowIdList=" + encodeURIComponent("'" + hidTreeRowId.value + "'")
          + Base.AND + gfnGetFormData("divInqrCond") + Base.AND + gfnGetFormData("divEditDtl")
        // 성공콜백함수
          , function(objData)
            {
                var RSLT_VALUE = objData[Base.RSLT_NO];

                if ( Base.OK != RSLT_VALUE )
                {
                    if ( Base.NO_DATA == RSLT_VALUE )
                        gfnDispMsg('${requestScope["ITEM.msgSaveNoData"]}<%-- 저장된 데이터가 존재하지 않습니다. --%>');
                    else
                    if ( !gfnIsBaseError(RSLT_VALUEUE) ) gfnDispMsg(Base.msgRsltError); // 요청결과 오류가 발생했습니다. 관리자에게 문의하십시오.
                } else
                {
                    gfnDispMsg('${requestScope["ITEM.msgSaveOk"]}<%-- 저장이 완료되었습니다. --%>');

                    hidTreePrevRowId.value = hidTreeRowId.value;
                    hidPrevPage.value = $('#divPage [name="page"]').val();

                    btnInqr.click(); // 저장완료시 조회한다.
                }
            }
    );
}

//==============================================================================
// 목록 저장
//------------------------------------------------------------------------------
function fnSaveList(strAuthCode)
{
    gfnReq // 요청
    (
        // URL
            "/menuauth/saveMenuAuthList.do" // 목록 저장
        // 데이터
          , "rowIdList=" + encodeURIComponent("'" + gfnGetGridChcColValue(g_strGridId, "rowId", false).join("', '") + "'")
          + Base.AND + "authCode=" + encodeURIComponent(strAuthCode)
          + Base.AND + "childApplyYn=N"
          + Base.AND + gfnGetFormData("divInqrCond")
        // 성공콜백함수
          , function(objData)
            {
                var RSLT_VALUE = objData[Base.RSLT_NO];

                if ( Base.OK != RSLT_VALUE )
                {
                    if ( Base.NO_DATA == RSLT_VALUE )
                        gfnDispMsg('${requestScope["ITEM.msgSaveNoData"]}<%-- 저장된 데이터가 존재하지 않습니다. --%>');
                    else
                    if ( !gfnIsBaseError(RSLT_VALUEUE) ) gfnDispMsg(Base.msgRsltError); // 요청결과 오류가 발생했습니다. 관리자에게 문의하십시오.
                } else
                {
                    gfnDispMsg('${requestScope["ITEM.msgSaveOk"]}<%-- 저장이 완료되었습니다. --%>');

                    hidTreePrevRowId.value = hidTreeRowId.value;
                    hidPrevPage.value = $('#divPage [name="page"]').val();

                    btnInqr.click(); // 저장완료시 조회한다.
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
    g_arrFieldName = "rowId|menuName|authCodeName".split(Base.DELI1);

    gfnInitGrid(g_strGridId, g_arrFieldName, null, Base.GRID,
        {
            "pageId": "divPage" // 페이지 태그 ID
          , "columns": [
                { "width": 0, "fieldName": g_arrFieldName[0] } // 행ID
              , { "header": { "text": '${requestScope["ITEM.menuName"]}<%-- 메뉴명   --%>' }, "width": 400, "fieldName": g_arrFieldName[1] }
              , { "header": { "text": '${requestScope["ITEM.authCode"]}<%-- 권한코드 --%>' }, "width": 80 , "fieldName": g_arrFieldName[2], "styles": { "textAlignment": "center" } }
            ]
          , "options": { "edit": { "readOnly": true } } // 읽기전용
        // 이벤트관련
          , "onclickpage": fnInqrList // 페이지 클릭시..
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
        $(btnInqr     ).click(fnClickInqr     ); // 클릭
        $(btnSave     ).click(fnClickSave     );
        $(btnReadAuth ).click(fnClickReadAuth );
        $(btnWriteAuth).click(fnClickWriteAuth);
        $(btnNoAuth   ).click(fnClickNoAuth   );

        fnInitGrid(); // 그리드 초기화
    } else
    if ( "BFOREINQR" == strClsfy ) // 조회전
    {
        gfnClearTree(g_objTree  ); // 트리 정리
        gfnClearGrid(g_strGridId); // 그리드 정리
        gfnClearScr("divEditDtl"); // 화면 정리

        $('#divInqrCond [name="authId"]').val(sltAuthId.value);
        hidTreeRowId.value = Base.EMPTYSTR;
    } else
    if ( "BFORENODECHC" == strClsfy ) // 노드선택전
    {
        gfnClearGrid(g_strGridId); // 그리드 정리

        gfnClearScr("divEditDtl"); // 화면 정리
    } else
    if ( "BFOREINQRLIST" == strClsfy ) // 리스트조회전
    {
    }
}

//==============================================================================
// 콤보 바인딩
//------------------------------------------------------------------------------
function fnBindCombo()
{
    gfnBindCombo("sltAuthCode", hidAuthCodeHdrId.value, 'N/A');

    // URI 콤보 바인딩
    gfnBindComboUri("sltAuthId", "/menuauth/getComboAuthList.do", null,
            $("#sltAuthId>option:first").text());
}

//==============================================================================
// 검증
//------------------------------------------------------------------------------
function fnVerif(strClsfy)
{
    if ( null == gfnGetGridView(g_strGridId) ) return false; // 그리드 로드되었는지 검증한다.

    if ( "INQR" == strClsfy ) // 조회
    {
        var MSG_CHG_ITEM = '${requestScope["ITEM.msgChgItem"]}'; // 해당 항목을 변경하십시오.

        // 입력여부 검증
        if ( !gfnVerifInputYn(lblAuthId.innerText, "sltAuthId", MSG_CHG_ITEM) ) return false; // 권한
    } else
    if ( "SAVE" == strClsfy ) // 저장
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
    if ( "SAVELIST" == strClsfy ) // 목록저장
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

<!-- contents -->
<body>
    <div class="head">
        <h3>메뉴권한</h3>
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

    <div id="divInqrCond">
        <!-- 상세조건 //-->
        <div class="headSearch">
            <label id="lblAuthId" for="sltAuthId">${requestScope["ITEM.authId"]}<%-- 권한ID --%></label>
            <select id="sltAuthId" style="width: 120px">
                <option value="" selected="selected">${requestScope["ITEM.comboTextChc"]}<%-- (선택) --%></option>
            </select>
            <input type="hidden" name="authId" /><!-- 권한ID -->
            <span class="button smallGray"><button type="button" id="btnInqr">${requestScope["ITEM.inqr"]}<%-- 조회 --%></button></span>
        </div>

        <input type="hidden" name="menuDeli"     value=" > " /><!-- 메뉴구분자 //-->
        <input type="hidden" name="adminModulYn" value='${param["menuAddrNameClsfyId"]}' /><!-- 메뉴주소명구분ID //-->

        <input type="hidden" id="hidAuthCodeHdrId" name="authCodeHdrId" value="MENU_AUTH" /><!-- 권한코드헤더ID //-->

        <input type="hidden" id="hidTreeRowId"     name="rowId" /><!-- 행ID //-->
        <input type="hidden" id="hidTreePrevRowId" /><!-- 이전행ID //-->

        <input type="hidden" id="hidPrevPage"      /><!-- 이전페이지 //-->
    </div>

    <div class="divBox">
        <div class="divLeft">
            <div class="menuInfo">
                <h4 class="title01">메뉴정보</h4>

                <!-- 트리 //-->
                <div style="overflow: auto"><div id="divTree" class="tree"></div></div>

                <h4 class="title01">메뉴권한 설정</h4>
                <table id="tblEdit">
                    <colgroup>
                        <col width="73px" />
                        <col width="*" />
                    </colgroup>
                    <tbody>
                        <tr>
                            <th id="thoMenuName">${requestScope["ITEM.menuName"]}<%-- 메뉴명 --%></th>
                            <td><input type="text" id="txtMenuName" name="menuName" class="inputText01 readonly" title="메뉴명"/></td>
                        </tr>
                        <tr>
                            <th>${requestScope["ITEM.authCode"]}<%-- 권한코드 --%></th>
                            <td>
                                <select id="sltAuthCode" name="authCode" class="menu" title="메뉴권한"></select>
                                <label>
                                    <input type="checkbox"  id="chkChildApplyYn" name="childApplyYn" />
                                    <span>${requestScope["ITEM.childApplyYn"]}<%-- 자식적용여부 --%></span>
                                </label>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="buttonBox">
                    <span class="button lime" style="visibility: hidden"><button type="button" id="btnSave">${requestScope["ITEM.save"]}<%-- 저장 --%></button></span>
                </div>

            </div>
        </div>

        <!-- 편집 //-->
        <div class="divRight">
            <!-- 편집상세 //-->
            <div id="divEditDtl" class="detailInfo">
                <h4 class="title02">상세정보</h4>
                <div id="divGrid" style="height: 458px"></div>

                <div id="divPage">
                    <div class="pageNav"></div>

                    <input type="hidden" name="page"    value="1"  /><!-- 페이지   //-->
                    <input type="hidden" name="pageRow" value="17" /><!-- 페이지행 //-->
                </div>
            </div>
            <!-- 버튼 //-->
            <div class="buttonBox" align="right">
                <span class="button green" style="visibility: hidden"><button type="button" id="btnReadAuth" >${requestScope["ITEM.readAuth"]}<%-- 읽기 --%></button></span>
                <span class="button green" style="visibility: hidden"><button type="button" id="btnWriteAuth">${requestScope["ITEM.writeAuth"]}<%-- 쓰기 --%></button></span>
                <span class="button gray"  style="visibility: hidden"><button type="button" id="btnNoAuth"   >${requestScope["ITEM.noAuth"]}<%-- N/A --%></button></span>
            </div>
        </div>
    </div>
<!-- Contents end //-->

<%@ include file="../../epfse/system/tabFtr.jsp" %><%-- 탭 푸터 --%>