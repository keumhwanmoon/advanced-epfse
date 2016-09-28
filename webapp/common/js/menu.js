/*
--------------------------------------------------------------------------------
    PROJECT NAME : ENPORTAL
--------------------------------------------------------------------------------
    - 단위업무명 : 메뉴 jQuery
    - 최초작성일 : 2014-05-11
    - 작  성  자 : 유광식
    - 비      고 :
--------------------------------------------------------------------------------
*/
// < Sub Procedure and Function - GLOBAL 영역 >

// < menu Sub Procedure and Function - MAIN 영역 >

// < menu Sub Procedure and Function - 주요 이벤트 영역 >
//==============================================================================
// 상단 메뉴 클릭시..
//------------------------------------------------------------------------------
function gfnClickMenuTop(strMenuNo, strMenuName)
{
    // 좌측메뉴를 표시한다.
    $('[name="comParamSubMenuDispYn"]').val(Base.YES);

    $("#lnb>H2").html("<span></span>" + strMenuName);

    // 서브메뉴 제목을 표시한다.
    gfnInqrMenuSub(strMenuNo); // 서브 메뉴 조회
}

//==============================================================================
// 서브 메뉴 클릭시..
//------------------------------------------------------------------------------
function gfnClickMenuSub(strUri)
{
    if ( !gfnIsEmpty(strUri) ) gfnMovePage(strUri); // 페이지 이동
}

// < menu Sub Procedure and Function - 비지니스 로직 호출 영역 >
//==============================================================================
// 로그아웃
//------------------------------------------------------------------------------
function gfnMenuLout()
{
    var strContextPath = $("#hidComParamContextPatch").val();

    gfnReq( // 요청
        // URL
        "/system/lout.do" // 로그아웃
        // 데이터
      , gfnGetFormData("divCommonLout")
        // 성공콜백함수
      , function(objData)
        {
            var RSLT_VALUE = gfnGetJsonValue(objData, [ Base.RSLT_NO ]);

            if ( Base.NO_AUTH == RSLT_VALUE )
            {
                gfnDispPgbar(); // PROGRESSBAR 표시

                window.location.href = strContextPath + "/";
            } else
            if ( Base.NO_DATA == RSLT_VALUE )
            {
                gfnDispPgbar(); // PROGRESSBAR 표시

                window.location.href = strContextPath + "/";
            } else
            if ( Base.OK != RSLT_VALUE )
            {
                if ( Base.NO_ADDR == RSLT_VALUE ) gfnDispMsg(Base.msgNoAddr);
                else
                if ( Base.NO_MENU == RSLT_VALUE ) gfnDispMsg(Base.msgNoMenu);
            } else
            {
                gfnDispPgbar(); // PROGRESSBAR 표시

                window.location.href = strContextPath + "/";
            }
        }
      , null, false
    );
}

//==============================================================================
// 서브 메뉴 조회
//------------------------------------------------------------------------------
function gfnInqrMenuSub(strMenuNo)
{
    gfnReq( // 요청
        // URL
        "/menuauth/getSubMenuNameList.do" // 목록 가져오기
        // 데이터
      , "menuNo=" + encodeURIComponent(strMenuNo)
        // 성공콜백함수
      , function(objData)
        {
            gfnBindMenuSub(gfnGetJsonValue(objData, [ Base.RSLT_LIST ])); // 서브 메뉴 바인딩

            // 현재 화면에 해당하는 메뉴를 표시해준다.
            if ( "hidMenuPathNo03" in window && "hidMenuPathNo04" in window )
            {
                var MENU_NO = hidMenuPathNo04.value;

                if ( !gfnIsEmpty(MENU_NO) )
                {
                    var PRNTS_MENU_NO = hidMenuPathNo03.value;

                    if ( !gfnIsEmpty(PRNTS_MENU_NO) && ( "ancSubMenu_" + PRNTS_MENU_NO in window ) )
                    {
                        if ( $("ancSubMenu_" + PRNTS_MENU_NO).hasClass("NoMenuAddr") )
                            eval("ancSubMenu_" + PRNTS_MENU_NO).click();
                    }
                }
            }
        }
    );
}

// < menu Sub Procedure and Function - 그리드 영역 >

// < menu Sub Procedure and Function - 화면 링크 및 이동 >

// < menu Sub Procedure and Function - 툴바 영역 >

// < menu Sub Procedure and Function - 기타 영역 >
//==============================================================================
// 서브 메뉴 바인딩
//------------------------------------------------------------------------------
function gfnBindMenuSub(arrRsltList)
{
    var arrHtml = new Array(), numIndex = -1;
    var LNGTH = ( null != arrRsltList ? arrRsltList.length : 0 );

    for ( var num = 0 ; num < LNGTH ; num++ ) arrHtml[++numIndex] = gfnGetMenuSubHtml(arrRsltList[num]);

    gfnSetHtml($("#lnb>ul").get(0), arrHtml.join(Base.EMPTYSTR));

    arrHtml = null;

    /* lnb 동작 바인딩 */ // cf.) jquery.esmrv.ui.js 참조
    setLNB($('#lnb')); setContentHeight();

    // 좌측메뉴를 표시한다.
    if ( Base.YES == $('[name="comParamSubMenuDispYn"]').val() )
    {
        if ( 0 < LNGTH )
        {
            if ( '180px' != $('button.exp').css('left') ) $('button.exp').click();
        }
    }
}

//==============================================================================
// 서브 메뉴 바인딩
//------------------------------------------------------------------------------
function gfnGetMenuSubHtml(objRow)
{
    var arrOutpt = new Array(), numIndex = -1;

    // objRow : { comParamUserLangCode, comParamLangCodeHdrId, comParamScrAddrName, comParamIpAddrName, comParamSessnIdName, comParamLoginUserId, comParamSubMenuDispYn, rowId, gridRowId, rowNo, total, maxPage, page, pageRow, langCode, menuNo, menuName, menuAddrName, lastChildYn, prntsYn, childYn, userId }

    var strContextPath = $("#hidComParamContextPatch").val();

    if ( Base.YES != objRow["childYn"] )
    {
        // 중메뉴일때
        arrOutpt[++numIndex] = '\n<li>\n<a ';
        if ( !gfnIsEmpty(objRow["menuAddrName"]) )
            arrOutpt[++numIndex] = 'class="onlyChild"';
        arrOutpt[++numIndex] = ' href="#"';
        if ( Base.NO == objRow["prntsYn"] ) // 부모 메뉴가 아닐때..
        {
            arrOutpt[++numIndex] = ' data-tabpage="' + strContextPath;
            arrOutpt[++numIndex] = objRow["menuAddrName"]; arrOutpt[++numIndex] = '"';
            arrOutpt[++numIndex] = ' data-tabtitle="';
            arrOutpt[++numIndex] = objRow["menuName"]; arrOutpt[++numIndex] = '"';
        }

        arrOutpt[++numIndex] = '>';
        arrOutpt[++numIndex] = objRow["menuName"]; arrOutpt[++numIndex] = '</a>';

        if ( Base.YES == objRow["prntsYn"] )
        arrOutpt[++numIndex] = '\n	<ul>';
        else
        arrOutpt[++numIndex] = '\n</li>';
    } else
    {
        // 소메뉴일때
        arrOutpt[++numIndex] = '<li><span></span><a href="#" data-tabpage="' + strContextPath;
        arrOutpt[++numIndex] = objRow["menuAddrName"]; arrOutpt[++numIndex] = '"';
        arrOutpt[++numIndex] = ' data-tabtitle="';
        arrOutpt[++numIndex] = objRow["menuName"]; arrOutpt[++numIndex] = '">';
        arrOutpt[++numIndex] = objRow["menuName"]; arrOutpt[++numIndex] = '</a>';

        if ( Base.YES == objRow["lastChildYn"] )
        {
        arrOutpt[++numIndex] = '\n	</ul>';
        arrOutpt[++numIndex] = '\n</li>';
        }
    }

    return arrOutpt.join(Base.EMPTYSTR);
}