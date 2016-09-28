<%--
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : Q&A 상세
    - 최초작성일 : 2014-09-25
    - 작  성  자 : 이승윤
    - 비      고 :
--------------------------------------------------------------------------------
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
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
    fnCtrlScr("READY"); // 화면 제어 : DOM준비
    fnBindCombo(); // 콤보 바인딩

    fnSetParam('${param["rowId"]}'); // 매개변수 설정

    if ( '${requestScope["MENU.authCode"]}' == Base.WRITE_AUTH ) // 쓰기 권한이 있는 경우..
    {
            btnAnswr.parentElement.style.visibility = "visible";
             btnDelt.parentElement.style.visibility = "visible";
        btnAnswrDelt.parentElement.style.visibility = "visible";
    }

});

//==============================================================================
// 매개변수 설정
//------------------------------------------------------------------------------
function fnSetParam(strRowId)
{
    if ( 0 < strRowId.length )
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
// 답변삭제 클릭시..
//------------------------------------------------------------------------------
function fnClickAnswrDelt()
{
    if ( !gfnCnfmMsg('${requestScope["ITEM.msgDeltCnfm"]}') ) return; // 삭제하시겠습니까?

    if ( !fnVerif("ANSWRDELT") ) return; // 검증 : 삭제

    fnAnswrDelt(); // 삭제
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

//==============================================================================
// 이전/다음 글 클릭시..
//------------------------------------------------------------------------------
function fnClickPreNext(strPreRowId)
{
    fnPreNext(strPreRowId); // 이전/다음 글
}

// < Sub Procedure and Function - 비지니스 로직 호출 영역 >
//==============================================================================
// 조회
//------------------------------------------------------------------------------
function fnInqr()
{
    gfnReq( // 요청
        // URL
        "/system/getQnaInfo.do" // 정보 조회
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
            }

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
        "/system/deltQnaInfo.do" // 정보 삭제
        // 데이터
      , gfnGetFormData("divInqrCond")
        // 성공콜백함수
      , function(objData)
        {
            var RSLT_VALUE = objData[Base.RSLT_NO];

            if ( Base.OK != RSLT_VALUE )
            {
                if ( -1 == RSLT_VALUE )
                    gfnDispMsg("관리자인 경우 삭제할 수 있습니다.");
                else
                if ( -3 == RSLT_VALUE )
                    gfnDispMsg("답변이 존재하여 삭제할 수 없습니다.");
                else
                if ( Base.NO_DATA == RSLT_VALUE )
                    gfnDispMsg("데이터가 존재하지 않습니다.");
                else
                    gfnDispMsg("요청결과 오류가 발생했습니다. 관리자에게 문의하십시오.");
            } else
            {
                gfnDispMsg("삭제가 완료되었습니다.");

                $('#divInqrCond [name="rowId"]').val(Base.EMPTYSTR);

                fnList(); // 목록
            }
        }
    );
}

//==============================================================================
// 답변삭제
//------------------------------------------------------------------------------
function fnAnswrDelt()
{
    gfnReq // 요청
    (
        // URL
        "/system/deltQnaAnswrInfo.do" // 정보 삭제
        // 데이터
      , gfnGetFormData("divInqrCond")
        // 성공콜백함수
      , function(objData)
        {
            var RSLT_VALUE = objData[Base.RSLT_NO];

            if ( Base.OK != RSLT_VALUE )
            {
                if ( -1 == RSLT_VALUE )
                    gfnDispMsg("관리자인 경우 삭제할 수 있습니다.");
                else
                if ( Base.NO_DATA == RSLT_VALUE )
                    gfnDispMsg("데이터가 존재하지 않습니다.");
                else
                    gfnDispMsg("요청결과 오류가 발생했습니다. 관리자에게 문의하십시오.");
            } else
            {
                gfnDispMsg("삭제가 완료되었습니다.");

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
    var ANSWR_EXIST = $('#divInqrCond [name="answrExist"]').val();

    gfnSetScrParam("inqrCountUpdtYn", Base.NO); // 조회수

    // 페이지 이동
    if( gfnIsEmpty(ANSWR_EXIST) )
        gfnMovePage("/system/qnaEdit.do?&rowId=" + encodeURIComponent(ROW_ID)); // 편집
    else
        gfnMovePage("/system/qnaAnswrEdit.do?&rowId=" + encodeURIComponent(ROW_ID)); // 편집
}

//==============================================================================
// 목록
//------------------------------------------------------------------------------
function fnList()
{
    // 페이지 이동
    gfnMovePage("/system/qnaList.do");
}

//==============================================================================
// 답변
//------------------------------------------------------------------------------
function fnAnswr()
{
    var ROW_ID = $('#divInqrCond [name="rowId"]').val();

    gfnSetScrParam("inqrCountUpdtYn", Base.NO); // 조회수수정여부

    // 페이지 이동
    gfnMovePage("/system/qnaAnswrEdit.do?&rowId=" + encodeURIComponent(ROW_ID)); // 편집
}

//==============================================================================
// 이전/다음 글
//------------------------------------------------------------------------------
function fnPreNext(strPreRowId)
{
    // 페이지 이동
    gfnMovePage("/system/qnaDtl.do?rowId=" + encodeURIComponent(strPreRowId)); // 상세
}

// < Sub Procedure and Function - 기타 영역 >
//==============================================================================
// 화면 제어
//------------------------------------------------------------------------------
function fnCtrlScr(strClsfy)
{
    if ( "READY" == strClsfy ) // DOM준비
    {
        $(btnUpdt     ).click(fnClickUpdt     ); // 클릭
        $(btnDelt     ).click(fnClickDelt     );
        $(btnAnswrDelt).click(fnClickAnswrDelt);
        $(btnList     ).click(fnClickList     );
        $(btnAnswr    ).click(fnClickAnswr    );
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
    if ( "UPDT" == strClsfy ) // 수정
    {
        if ( '${requestScope["MENU.authCode"]}' != Base.WRITE_AUTH ) // 쓰기 권한 검증
        {
            if ( !gfnIsEmpty($('#divInqrCond [name="answrExist"]').val()) )
            {
                gfnDispMsg("답변이 등록되어 수정할 수 없습니다. 신규 질문을 등록해주세요.");
                return false;
            }
        }
    } else
    if ( "DELT" == strClsfy  || "ANSWR" == strClsfy ) // 삭제 // 답변
    {
        if ( '${requestScope["MENU.authCode"]}' != Base.WRITE_AUTH ) // 쓰기 권한 검증
        {
            gfnDispMsg('${requestScope["ITEM.msgNoAuth"]}<%-- 권한이 없습니다. 관리자에게 문의하십시오. --%>');
            return false;
        }
    } else
    if ( "ANSWRDELT" == strClsfy ) // 답변삭제
    {
        if ( '${requestScope["MENU.authCode"]}' != Base.WRITE_AUTH ) // 쓰기 권한 검증
        {
            gfnDispMsg('${requestScope["ITEM.msgNoAuth"]}<%-- 권한이 없습니다. 관리자에게 문의하십시오. --%>');
            return false;
        } else
        if( gfnIsEmpty($('#divInqrCond [name="answrExist"]').val()) )
        {
            gfnDispMsg("답변이 존재하지않아 삭제할 수 없습니다.");
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

    // 답변 존재여부
    if ( !gfnIsEmpty(objRsltInfo["answrExist"]) )
    {
        btnAnswr.parentElement.style.display = "none"; // 답변버튼 숨기기

        $("#divDtl>table>tbody>tr:last").removeAttr('style');
        $('#divInqrCond [name="answrExist"]').val(objRsltInfo["answrExist"]);
    } else
    {
        btnAnswrDelt.parentElement.style.display = "none"; // 답변삭제버튼 숨기기
    }

    // 이전/다음 글을 설정한다.
    if ( !gfnIsEmpty(objRsltInfo["preInfo"]) )
    {
        $(".relativeLink > li:first").html(""); // 이전 글 화면정리
        $(".relativeLink > li:first").html('<span>이전글</span>'
                                         + '<a href="#" onclick="fnClickPreNext(\'' + objRsltInfo["preRowId"] + '\');" >' + objRsltInfo["preInfo"] + '</a>');
    }
    if ( !gfnIsEmpty(objRsltInfo["nextInfo"]) )
    {
        $(".relativeLink > li:last" ).html(""); // 다음 글 화면정리
        $(".relativeLink > li:last" ).html('<span>다음글</span>'
                                         + '<a href="#" onclick="fnClickPreNext(\'' + objRsltInfo["nextRowId"] + '\');" >' + objRsltInfo["nextInfo"] + '</a>');
    }

    // 포맷을 적용한다.
    eval(strPrfx + "rgstDtm").innerText = gfnFormt(eval(strPrfx + "rgstDtm").innerText, Base.DATE);

    // 게시물내용을 설정한다.
    if ( !gfnIsEmpty(objRsltInfo["ctts"]) ) tdoDtl_ctts.innerHTML = objRsltInfo["ctts"];
    if ( !gfnIsEmpty(objRsltInfo["answrCtts"]) ) tdoDtl_answrCtts.innerHTML = objRsltInfo["answrCtts"];

}
-->
</script>
<!-- // CSS 및 JavaScript 관련 -->

<!-- contents -->
<body>
    <div class="head">
        <h3>Q&amp;A</h3>
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

    <div id="divInqrCond" style="display: none">
        <input type="hidden" name="inqrCountUpdtYn" />
        <!-- 게시판ID //-->
        <input type="hidden" name="answrExist" />
        <!-- 답변존재여부 //-->
        <input type="hidden" name="rowId" />
        <!-- 행ID //-->
    </div>

    <!-- 상세 //-->
    <div class="headSearch">
        <p>※ 시스템 문의사항을 접수하시면 담당자가 빠른 시간내에 친절히 답변드리도록 하겠습니다.</p>
    </div>

    <div id="divDtl" class="tableWrap">
        <table class="boardView01 hasBorderBottom">
            <caption>게시물 본문</caption>
            <colgroup>
                <col width="70px" />
                <col width="*" />
                <col width="140px" />
                <col width="100px" />
            </colgroup>
            <thead>
                <tr style="min-height: 50px">
                    <th scope="col" colspan="2">제목 : <span id="tdoDtl_titleName"></span></th>
                    <td>작성일 : <span id="tdoDtl_rgstDtm"  ></span></td>
                    <td>조회수 : <span id="tdoDtl_inqrCount"></span></td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row" class="systemQ">
                        <img src="${pageContext.request.contextPath}/common/images/common/imgQ.png" alt="질문" />
                    </th>
                    <td id="tdoDtl_ctts" colspan="3" style="min-height: 120px">
                    </td>
                </tr>
                <tr style="display: none">
                    <th scope="row" class="systemA">
                        <img src="${pageContext.request.contextPath}/common/images/common/imgA.png" alt="답변" />
                    </th>
                    <td id="tdoDtl_answrCtts" colspan="3" style="min-height: 120px">
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

    <div class="buttonBox right">
        <span class="aLeft">
            <span class="button gray"><button type="button" id="btnUpdt">수정</button></span>
            <!-- 관리자 -->
            <span class="button green" style="visibility: hidden;"><button type="button" id="btnAnswr"    >답변</button></span>
            <span class="button gray"  style="visibility: hidden;"><button type="button" id="btnDelt"     >삭제</button></span>
            <span class="button gray"  style="visibility: hidden;"><button type="button" id="btnAnswrDelt">답변삭제</button></span>
        </span>

        <span class="button white"><button type="button" id="btnList">목록</button></span>
    </div>

    <ul class="relativeLink">
        <li>
            <span>이전글</span>
            <p>등록된 게시물이 없습니다.</p>
        </li>
        <li>
            <span>다음글</span>
            <p>등록된 게시물이 없습니다.</p>
        </li>
    </ul>
<!-- Contents end //-->
<%@ include file="../../epfse/system/tabFtr.jsp" %><%-- 탭 푸터 --%>