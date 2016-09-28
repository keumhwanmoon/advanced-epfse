<%--
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : FAQ
    - 최초작성일 : 2014-09-25
    - 작  성  자 : 이승윤
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
    fnCtrlScr("READY"); // 화면 제어 : DOM준비
    fnBindCombo(); // 콤보 바인딩

    btnInqr.click(); // 조회

    if ( '${requestScope["MENU.authCode"]}' == Base.WRITE_AUTH ) // 쓰기 권한이 있는 경우..
        btnRgst.parentElement.style.visibility = "visible";
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

//==============================================================================
// 등록 클릭시..
//------------------------------------------------------------------------------
function fnClickRgst()
{
    if ( !fnVerif("RGST") ) return; // 검증 : 등록

    fnRgst(); // 등록
}

// < Sub Procedure and Function - 비지니스 로직 호출 영역 >
//==============================================================================
// 조회
//------------------------------------------------------------------------------
function fnInqr()
{
    gfnReq( // 요청
        // URL
        "/system/getFaqList.do" // 목록 가져오기
        // 데이터
      , gfnGetFormData("divInqrCond")
        // 성공콜백함수
      , function(objData)
        {
            var objRsltList = objData[Base.RSLT_LIST];

            for ( var numIndex = 0; numIndex < objRsltList.length; numIndex++ )
            {
                var strRowId     = objRsltList[numIndex]["rowId"];
                var strTitleName = objRsltList[numIndex]["titleName"]; // 제목
                var strCtts      = objRsltList[numIndex]["ctts"]; // 내용
                var strAttrList  = "#faq00" + objRsltList[numIndex]["rowId"]; // 행 HREF 속성 값 지정
                var strId        = "faq00"  + objRsltList[numIndex]["rowId"]; // 행 ID 값 지정
            }
                $('[class="faqList"]').append('<li id=' + strId + '><h4>Q .'
                                            + '<a href="' + strAttrList + '" onclick="fnInqrCount(\'' + strRowId + '\');" >' + strTitleName
                                            + '</a></h4>'
                                            + '<div><span>A</span>'
                                            + '<div>' + strCtts + '</div>'
                                            + '</div>'
                                            + '</li>'
                                             );

            fnBestInqr(); // BEST 조회
        }
    );
}
//==============================================================================
// BEST 조회
//------------------------------------------------------------------------------
function fnBestInqr()
{
    gfnReq( // 요청
        // URL
        "/system/getBestFaqList.do" // 목록 가져오기
        // 데이터
      , gfnGetFormData("divInqrCond")
        // 성공콜백함수
      , function(objData)
        {
            var objRsltList = objData[Base.RSLT_LIST];

            if ( objRsltList.length >= 1 )
            {
                for ( var numIndex =0; numIndex < 5; numIndex ++ )
                {
                    var strAttrList  = "#faq00" + objRsltList[numIndex]["rowId"]; // 행 HREF 속성 값 지정

                    $('[class="faqHead"] ul').append('<li><span>' + (numIndex + 1) + '</span><a href=' + strAttrList + '>' + objRsltList[numIndex]["titleName"] + '</a></li>');
                }
            }

            fnCtrlScr("AFTERINQR"); // 조회후
        }
    );
}

//==============================================================================
// 조회수 증가
//------------------------------------------------------------------------------
function fnInqrCount(strRowId)
{
    gfnReq( // 요청
        // URL
        "/system/updtInqrCountInfo.do" // 조회수 증가하기
        // 데이터
      , "rowId=" + encodeURIComponent(strRowId) // 행
        // 성공콜백함수
      , function(objData)
        {
           var RSLT_VAL = objData[Base.RSLT_NO];

           if ( Base.OK != RSLT_VAL )
           {
               if ( Base.NO_DATA == RSLT_VAL )
                   gfnDispMsg('${requestScope["ITEM.msgSaveNoData"]}<%-- 저장된 데이터가 존재하지 않습니다. --%>');
           }
        }
    );
}

// < Sub Procedure and Function - 그리드 영역 >

// < Sub Procedure and Function - 차트 영역 >

// < Sub Procedure and Function - 화면 링크 및 이동 >
//==============================================================================
// 등록
//------------------------------------------------------------------------------
function fnRgst()
{
    // 페이지 이동
    gfnMovePage("/system/faqEdit.do"); // 편집
}

// < Sub Procedure and Function - 기타 영역 >
//==============================================================================
// 화면 제어
//------------------------------------------------------------------------------
function fnCtrlScr(strClsfy)
{
    if ( "READY" == strClsfy ) // DOM준비
    {
        $(btnInqr).click(fnClickInqr); // 클릭
        $(btnRgst).click(fnClickRgst);
    } else
    if ( "BFOREINQR" == strClsfy ) // 조회전
    {
    } else
    if ( "AFTERINQR" == strClsfy ) // 조회후
    {
        // 행 클릭시 슬라이드 열기 <-> 닫기
        var faq = $('ul.faqList > li > :header > a');
        var time = 300;

        faq.bind('click', function(e){
            var faqA = $(this).parent().next();

            e.preventDefault();
            if(faqA.data('open')){
                faqA.slideUp(time).data('open', false);
            }else{
                faqA.slideDown(time).data('open', true).parent().siblings().find('> div').slideUp(time).data('open', false);
            }

            setTimeout(function(){
                setResize();
            }, time + 10);
         });

        // BEST5 행 클릭시 해당 행 자동열기
        var faqBest = $('div.faqHead ul a');

        faqBest.bind('click', function(){
            $('> :header a', $(this).attr('href')).trigger('click');
        });
    }
}

//==============================================================================
// 콤보 바인딩
//------------------------------------------------------------------------------
function fnBindCombo()
{
}

//===============================================================================
// 검증
//-------------------------------------------------------------------------------
function fnVerif(strClsfy)
{
    if ( "INQR" == strClsfy ) // 조회
    {
    } else
    if ( "RGST" == strClsfy ) // 등록
    {
        if ( '${requestScope["MENU.authCode"]}' != Base.WRITE_AUTH ) // 쓰기 권한 검증
        {
            gfnDispMsg('${requestScope["ITEM.msgNoAuth"]}<%-- 권한이 없습니다. 관리자에게 문의하십시오. --%>');
            return false;
        }
    }

    return true; // 리턴 처리
}

-->
</script>
<!-- // CSS 및 JavaScript 관련 -->

<!-- contents -->
<body>
    <div class="head">
        <h3>FAQ</h3>
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

    <div class="faqHead">
        <h4>자주 묻는 질문<span>BEST 5</span></h4>
        <ul>
        </ul>
        <span class="lt"></span>
        <span class="rt"></span>
        <span class="rb"></span>
        <span class="lb"></span>
    </div>

    <div id="divInqrCond" class="headSearch">
        <p>※ 원하시는 답변을 찾지 못하셨다면 시스템 문의를 통해 문의해주세요.</p>
        <span class="aRight">
            <input type="text" name="titleName" class="inputText" />
            <span class="button smallGray" style="visibility: hidden"><button type="button" id="btnInqr">${requestScope["ITEM.inqr"]}<%-- 조회 --%></button></span>
        </span>
    </div>

    <ul class="faqList">
    </ul>

    <div class="buttonBox right">
        <span class="button green"><button type="button" id="btnRgst">등록</button></span>
    </div>
<!-- // contents -->

<%@ include file="../../epfse/system/tabFtr.jsp" %><%-- 탭 푸터 --%>