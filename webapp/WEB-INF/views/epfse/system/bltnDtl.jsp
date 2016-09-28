<%--
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 게시물 상세
    - 최초작성일 : 2014-05-21
    - 작  성  자 : 유광식
    - 비      고 :
--------------------------------------------------------------------------------
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="../../epfse/system/tabHdr.jsp" %><%-- 헤더 관련 --%>
<!-- CSS 및 JavaScript 관련 -->
<link href="${pageContext.request.contextPath}/common/css/attch.css" rel="stylesheet" type="text/css" />

<script type="text/javascript" src="${pageContext.request.contextPath}/common/js/attch.js" charset="utf-8"></script>
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
    fnCtrlScr("READY"); // 화면 제어 : DOM준비
    fnBindCombo(); // 콤보 바인딩

    fnSetParam('${param["rowId"]}'); // 매개변수 설정
});

//==============================================================================
// 매개변수 설정
//------------------------------------------------------------------------------
function fnSetParam(strRowId)
{
    if ( 0 < strRowId.length ) // 등록인 경우..
    {
        $('#divInqrCond [name="inqrCountUpdtYn"]').val(gfnCoalesce(gfnGetScrParam("inqrCountUpdtYn"), Base.YES));
        $('#divInqrCond [name="rowId"]').val(strRowId);

        fnInqr(); // 조회
    }
}

// < Sub Procedure and Function - 주요 이벤트 영역 >
//==============================================================================
// 수정 클릭시..
//------------------------------------------------------------------------------
function fnClickUpdt()
{
    if ( !fnVerif("UPDT") ) return; // 검증 : 수정

    fnUpdt(); // 수정
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
// 목록 클릭시..
//------------------------------------------------------------------------------
function fnClickList()
{
    fnList(); // 목록
}

//==============================================================================
// 답변 클릭시..
//------------------------------------------------------------------------------
function fnClickAnswr()
{
    if ( !fnVerif("ANSWR") ) return; // 검증 : 답변

    fnAnswr(); // 답변
}

// < Sub Procedure and Function - 비지니스 로직 호출 영역 >
//==============================================================================
// 조회
//------------------------------------------------------------------------------
function fnInqr()
{
    gfnReq // 요청
    (
        // URL
        "/system/getBltnInfo.do" // 정보 조회
        // 데이터
      , gfnGetFormData("divInqrCond")
        // 성공콜백함수
      , function(objData)
        {
            if ( null == objData[Base.RSLT_INFO] )
            {
                gfnDispMsg('${requestScope["ITEM.msgNoData"]}<%-- 데이터가 존재하지 않습니다. --%>');
            } else
            {
                // JSON 객체 텍스트 속성 바인딩
                gfnBindJsonObjTextAttr(objData[Base.RSLT_INFO], "divDtl", "tdoDtl_", fnBindDtl);

                if ( '${requestScope["MENU.authCode"]}' == Base.WRITE_AUTH ) // 쓰기 권한이 있는 경우..
                {
                    btnDelt.parentElement.style.visibility = "visible";
                    btnUpdt.parentElement.style.visibility = "visible";

                    var QSTN_BLTBRD_YN = '${requestScope["BLTBRD.qstnBltbrdYn"]}';

                    if ( Base.YES == QSTN_BLTBRD_YN )
                        btnAnswr.parentElement.style.visibility = "visible";
                }
            }

            if ( null != objData[Base.RSLT_INFO] ) fnInqrAttch(); // 첨부 조회
        }
    );
}

//==============================================================================
// 첨부 조회
//------------------------------------------------------------------------------
function fnInqrAttch()
{
    gfnReq // 요청
    (
        // URL
            "/data/getBltnAttchList.do" // 목록 조회
        // 데이터
          , gfnGetFormData("divInqrCond")
        // 성공콜백함수
          , function(objData)
            {
                if ( null != objData[Base.RSLT_LIST] )
                    // 파일 목록 바인딩
                    gfnBindAttchFileList($('[class="AttchContnr"]'), objData[Base.RSLT_LIST]);
            }
    );
}

//==============================================================================
// 삭제
//------------------------------------------------------------------------------
function fnDelt()
{
    gfnReq // 요청
    (
        // URL
            "/system/deltBltnInfo.do" // 정보 삭제
        // 데이터
          , gfnGetFormData("divInqrCond")
        // 성공콜백함수
          , function(objData)
            {
                var RSLT_VALUE = objData[Base.RSLT_NO];

                if ( Base.OK != RSLT_VALUE )
                {
                    if ( -1 == RSLT_VALUE )
                        gfnDispMsg('${requestScope["ITEM.msgNoEditAuth"]}<%-- 로그인사용자가 등록한 게시물이거나 관리자인 경우 삭제할 수 있습니다. --%>');
                    else
                    if ( -3 == RSLT_VALUE )
                        gfnDispMsg('${requestScope["ITEM.msgAnswrExist"]}<%-- 답변이 존재하여 삭제할 수 없습니다. --%>');
                    else
                    if ( Base.NO_DATA == RSLT_VALUE )
                        gfnDispMsg('${requestScope["ITEM.msgDeltNoData"]}<%-- 삭제된 데이터가 존재하지 않습니다. --%>');
                    else
                        gfnDispMsg('${requestScope["ITEM.msgRsltError"]}<%-- 요청결과 오류가 발생했습니다. 관리자에게 문의하십시오. --%>');
                } else
                {
                    gfnDispMsg('${requestScope["ITEM.msgDeltOk"]}<%-- 삭제가 완료되었습니다. --%>');

                    $('#divInqrCond [name="rowId"]').val(Base.EMPTYSTR);

                    fnList(); // 목록
                }
            }
    );
}

// < Sub Procedure and Function - 그리드 영역 >

// < Sub Procedure and Function - 차트 영역 >

// < Sub Procedure and Function - 화면 링크 및 이동 >
//==============================================================================
// 수정
//------------------------------------------------------------------------------
function fnUpdt()
{
    var ROW_ID = $('#divInqrCond [name="rowId"]').val();

    gfnSetScrParam("inqrCountUpdtYn", Base.NO); // 조회수

    // 페이지 이동
    gfnMovePage("/system/bltnEdit.do?menuAddrNameClsfyId=" +
            encodeURIComponent($('[name="bltbrdNo"]').val()) + "&rowId=" +
            encodeURIComponent(ROW_ID)); // 편집
}

//==============================================================================
// 목록
//------------------------------------------------------------------------------
function fnList()
{
    // 페이지 이동
    gfnMovePage("/system/bltnGrid.do?menuAddrNameClsfyId=" +
            encodeURIComponent($('[name="bltbrdNo"]').val())); // 그리드
}

//==============================================================================
// 답변
//------------------------------------------------------------------------------
function fnAnswr()
{
    var PRNTS_BLTN_NO = tdoDtl_prntsBltnNo.innerText;
    var ROW_ID = $('#divInqrCond [name="rowId"]').val();

    if ( gfnIsEmpty(PRNTS_BLTN_NO) )
        gfnSetScrParam("prntsBltnNo", ROW_ID); // 부모게시물번호
    else
        gfnSetScrParam("prntsBltnNo", PRNTS_BLTN_NO); // 부모게시물번호

    gfnSetScrParam("inqrCountUpdtYn", Base.NO); // 조회수수정여부

    gfnSetScrParam("titleName", tdoDtl_titleName.innerText); // 제목명
    gfnSetScrParam("bltnCtts", tdoDtl_bltnCtts.innerHTML); // 게시물내용

    // 페이지 이동
    gfnMovePage("/system/bltnEdit.do?menuAddrNameClsfyId=" +
            encodeURIComponent($('[name="bltbrdNo"]').val())); // 편집
}

// < Sub Procedure and Function - 기타 영역 >
//==============================================================================
// 화면 제어
//------------------------------------------------------------------------------
function fnCtrlScr(strClsfy)
{
    if ( "READY" == strClsfy ) // DOM준비
    {
        $(btnUpdt ).click(fnClickUpdt ); // 클릭
        $(btnDelt ).click(fnClickDelt );
        $(btnList ).click(fnClickList );
        $(btnAnswr).click(fnClickAnswr);
    }
}

//===============================================================================
// 콤보 바인딩
//-------------------------------------------------------------------------------
function fnBindCombo()
{
}

//===============================================================================
// 검증
//-------------------------------------------------------------------------------
function fnVerif(strClsfy)
{
    if ( "DELT" == strClsfy || "UPDT" == strClsfy || "ANSWR" == strClsfy ) // 삭제 // 수정 // 답변
    {
        if ( '${requestScope["MENU.authCode"]}' != Base.WRITE_AUTH ) // 쓰기 권한 검증
        {
            gfnDispMsg('${requestScope["ITEM.msgNoAuth"]}<%-- 권한이 없습니다. 관리자에게 문의하십시오. --%>');
            return false;
        }
    }

    return true; // 리턴 처리
}

//==============================================================================
// 상세 바인딩
//------------------------------------------------------------------------------
function fnBindDtl(objRsltInfo, strPrfx)
{
    if ( null == objRsltInfo ) return;

    // 포맷을 적용한다.
    eval(strPrfx + "rgstDtm").innerText = gfnFormt(eval(strPrfx + "rgstDtm").innerText, Base.DTM);
    eval(strPrfx + "updtDtm").innerText = gfnFormt(eval(strPrfx + "updtDtm").innerText, Base.DTM);

    // 게시물내용을 설정한다.
    if ( !gfnIsEmpty(objRsltInfo["bltnCtts"]) ) tdoDtl_bltnCtts.innerHTML = objRsltInfo["bltnCtts"];
}
-->
</script>
<!-- // CSS 및 JavaScript 관련 -->

<!-- contents -->
<body>
    <div class="head">
        <h3>게시물</h3>
        <div>
            <p><em><span class="ir common"></span>처음</em> &gt; 시스템관리 &gt; 게시판</p>
            <ul>
                <li><a href="#" class="excel"><span class="ir common"></span>엑셀다운로드</a></li>
                <li><button type="button" class="print"><span class="ir common"></span>인쇄</button></li>
                <li><a href="#" class="help"><span class="ir common"></span>도움말</a></li>
                <li><a href="#" class="fav"><span class="ir common"></span>즐겨찾기추가</a></li>
            </ul>
        </div>
    </div>

    <div class="Contents">
        <h3>${requestScope["BLTBRD.bltbrdName"]}<%-- 공지사항/Q&A/FAQ --%> ${requestScope["ITEM.scrTitle"]}<%-- 상세 --%></h3>

        <!-- 조회조건 //-->
        <div id="divInqrCond" style="display: none">
            <input type="hidden" name="inqrCountUpdtYn" /><!-- 조회수수정여부 //-->
            <input type="hidden" name="bltbrdNo" value='${param["menuAddrNameClsfyId"]}' /><!-- 게시판ID //-->
            <input type="hidden" name="rowId" /><!-- 행ID //-->
        </div>

        <!-- 상세 //-->
        <div id="divDtl">
            <table class="BoardStyle BdDetail">
                <colgroup>
                    <col width="10%" />
                    <col width="" />
                    <col width="10%" />
                    <col width="15%" />
                    <col width="10%" />
                    <col width="15%" />
                    <col width="10%" />
                    <col width="15%" />
                </colgroup>
                <tbody>
                    <tr>
                        <th>${requestScope["BLTBRD.titleItemIdName"]}<%-- 제목/질문요약 --%></th>
                        <td id="tdoDtl_titleName"  colspan="5"></td>
                        <th>${requestScope["ITEM.inqrCount"]}<%-- 조회수 --%></th>
                        <td id="tdoDtl_inqrCount"></td>
                    </tr>
<c:if test='${null != requestScope["BLTBRD.titleItemId2"]}'>
                    <tr>
                        <th>${requestScope["BLTBRD.titleItemId2Name"]}<%-- 질문 --%></th>
                        <td id="tdoDtl_titleName2" colspan="7"></td>
                    </tr>
</c:if>
                    <tr>
                        <th rowspan="2">${requestScope["BLTBRD.cttsItemIdName"]}<%-- 내용 --%></th>
<c:if test='${null == requestScope["BLTBRD.titleItemId2"]}'>
                        <td id="tdoDtl_bltnCtts"   colspan="7" style="min-height: 380px; vertical-align: top"></td>
</c:if>
<c:if test='${null != requestScope["BLTBRD.titleItemId2"]}'>
                        <td id="tdoDtl_bltnCtts"   colspan="7" style="min-height: 344px; vertical-align: top"></td>
</c:if>
                    </tr>
                    <tr>
                        <td colspan="7">
                            <!-- 첨부 영역 //-->
                            <div class="AttchContnr">
                                <div class="Thmnl"><img src="${pageContext.request.contextPath}/common/images/common/noimage.gif" /></div>
                                <div class="AttchList"><select class="AttchFile" size="4" onchange='javascript: gfnChgAttchOrgFileName();'></select>
                                    <select class="AttchHref" style="display: none"></select><select class="OrgFileName" style="display: none"></select></div>
                                <div class="AttchBtn"><div class="Link">
                                        <a href="#" style="display: none"   onclick="javascript: gfnClickAttchPopupOpen();">${requestScope["ITEM.fileAttch"]}<%-- 파일 첨부 --%></a>
                                        <a href="#" style="display: none"   onclick="javascript: gfnClickAttchChcDelt();"  >${requestScope["ITEM.chcDelt"]}<%-- 선택 삭제 --%></a>
                                        <a href="#" style="display: none"   onclick="javascript: gfnClickAttchHtmlAdd();"  >${requestScope["ITEM.linkInsrt"]}<%-- 본문 삽입 --%></a>
                                        <a href="#" style="display: inline" onclick="javascript: gfnClickAttchDownload();" >${requestScope["ITEM.download"]}<%-- 다운로드 --%></a></div>
                                    <div class="AttchCount"><span>${requestScope["ITEM.attchMaxCount"]}<%-- 첨부 횟수 제한 --%>: </span><span class="CrrntCount">0</span> / <span class="MaxCount">3</span></div>
                                    <div class="AttchSize" ><span>${requestScope["ITEM.fileMaxSize"]}<%-- 파일 크기 제한 --%>: </span><span class="MaxSize">${requestScope["SYS_VAR.attchFileMaxSize"]}</span> <span>MB</span></div></div>
                                <div class="AttchSetValue">
                                    <input type="hidden" class="VarId"        /><!-- 첨부파일경로 시스템변수ID //-->
                                    <input type="hidden" class="VarName"      /><!-- 첨부파일경로 시스템변수명 //-->
                                    <input type="hidden" class="AddrNamePrfx" /><!-- 주소명접두사 //-->
                                    <input type="hidden" class="TargId"       /><!-- 본문 삽입 대상 ID //-->
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th>${requestScope["ITEM.rgstUserName"]}<%-- 등록사용자명 --%></th>
                        <td id="tdoDtl_rgstUserName"></td>
                        <th>${requestScope["ITEM.rgstDtm"]}<%-- 등록일시 --%></th>
                        <td id="tdoDtl_rgstDtm"     ></td>
                        <th>${requestScope["ITEM.updtUserName"]}<%-- 수정사용자명 --%></th>
                        <td id="tdoDtl_updtUserName"></td>
                        <th>${requestScope["ITEM.updtDtm"]}<%-- 수정일시 --%></th>
                        <td id="tdoDtl_updtDtm"     ></td>
                    </tr>
                    <tr style="display: none">
                        <td id="tdoDtl_prntsBltnNo"></td><!-- 부모메뉴번호 //-->
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- 버튼 //-->
        <div class="BoardBtn mg_top20">
            <span class="BtnStyle BoardType01 flt_lft" style="visibility: hidden"><button type="button" id="btnDelt">${requestScope["ITEM.delt"]}<%-- 삭제 --%></button></span>
            <span class="BtnStyle BoardType01" style="visibility: hidden"><button type="button" id="btnUpdt">${requestScope["ITEM.updt"]}<%-- 수정 --%></button></span>
            <span class="BtnStyle BoardType02 flt_rgt mg_lft5"><button type="button" id="btnList">${requestScope["ITEM.list"]}<%-- 목록 --%></button></span>
            <span class="BtnStyle BoardType01 flt_rgt" style="visibility: hidden"><button type="button" id="btnAnswr">${requestScope["ITEM.answr"]}<%-- 답변 --%></button></span>
        </div>
    </div>

<!-- Contents end //-->
<%@ include file="../../epfse/system/tabFtr.jsp" %><%-- 탭 푸터 --%>