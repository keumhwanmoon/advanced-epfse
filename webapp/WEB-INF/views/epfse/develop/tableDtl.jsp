<%--
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 테이블 상세
    - 최초작성일 : 2014-06-23
    - 작  성  자 : 유광식
    - 비      고 :
--------------------------------------------------------------------------------
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="../../epfse/system/tabHdr.jsp" %><%-- 헤더 관련 --%>
<!-- CSS 및 JavaScript 관련 -->
<script src="${pageContext.request.contextPath}/common/js/table/fso.js" charset="utf-8"></script><!-- File System Object //-->
<script src="${pageContext.request.contextPath}/common/js/table/tableVo.js" charset="utf-8"></script>
<script src="${pageContext.request.contextPath}/common/js/table/tableSql.js" charset="utf-8"></script>
<script src="${pageContext.request.contextPath}/common/js/table/tableDao.js" charset="utf-8"></script>
<script src="${pageContext.request.contextPath}/common/js/table/tableDao2.js" charset="utf-8"></script>
<script src="${pageContext.request.contextPath}/common/js/table/tableSvc.js" charset="utf-8"></script>
<script src="${pageContext.request.contextPath}/common/js/table/tableSvc2.js" charset="utf-8"></script>
<script src="${pageContext.request.contextPath}/common/js/table/tableCtrlr.js" charset="utf-8"></script>
<script src="${pageContext.request.contextPath}/common/js/table/tableScr.js" charset="utf-8"></script>
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

    fnSetParam(); // 매개변수 설정
});

//==============================================================================
// 매개변수 설정
//------------------------------------------------------------------------------
function fnSetParam()
{
    var OWNER_NAME     = gfnGetScrParam("ownerName"   ); // 화면 매개변수 가져오기
    var TABLE_ENG_NAME = gfnGetScrParam("tableEngName");
    var TABLE_KRN_NAME = gfnGetScrParam("tableKrnName");

    if ( !gfnIsEmpty(OWNER_NAME) && !gfnIsEmpty(TABLE_ENG_NAME) && !gfnIsEmpty(TABLE_KRN_NAME) )
    {
           txtOwnerName.value = OWNER_NAME    ;
        txtTableEngName.value = TABLE_ENG_NAME;
        txtTableKrnName.value = TABLE_KRN_NAME;

        fnInqr(); // 조회
    }
}

// < Sub Procedure and Function - 주요 이벤트 영역 >
//==============================================================================
// Project Name 변경시..
//------------------------------------------------------------------------------
function fnChgPrjctName()
{
    hidPrjctName.value = this.value;
    txtPackgName.value = "com.ecosian." + this.value + Base.DOT;
}

//==============================================================================
// VO 클릭시..
//------------------------------------------------------------------------------
function fnClickValueObj()
{
    if ( !fnVerif("VALUEOBJ") ) return; // 검증 : VO

    fnSaveValueObj('${requestScope["ITEM.msgSaveOk"]}<%-- 저장이 완료되었습니다. --%>'); // VO 저장
}

//==============================================================================
// SQL 클릭시..
//------------------------------------------------------------------------------
function fnClickQuery()
{
    if ( !fnVerif("QUERY") ) return; // 검증 : 쿼리

    fnSaveQuery('${requestScope["ITEM.msgSaveOk"]}<%-- 저장이 완료되었습니다. --%>'); // 쿼리 저장
}

//==============================================================================
// DAO 클릭시..
//------------------------------------------------------------------------------
function fnClickDao()
{
    if ( !fnVerif("Ora") ) return; // 검증 : DAO

    fnSaveDao('${requestScope["ITEM.msgSaveOk"]}<%-- 저장이 완료되었습니다. --%>'); // DAO 저장
}

//==============================================================================
// DAO Impl 클릭시..
//------------------------------------------------------------------------------
function fnClickDao2()
{
    if ( !fnVerif("DAO2") ) return; // 검증 : DAO2

    fnSaveDao2('${requestScope["ITEM.msgSaveOk"]}<%-- 저장이 완료되었습니다. --%>'); // DAO2 저장
}

//==============================================================================
// SVC 클릭시..
//------------------------------------------------------------------------------
function fnClickSvc()
{
    if ( !fnVerif("SVC") ) return; // 검증 : SVC

    fnSaveSvc('${requestScope["ITEM.msgSaveOk"]}<%-- 저장이 완료되었습니다. --%>'); // SVC 저장
}

//==============================================================================
// SVC Impl 클릭시..
//------------------------------------------------------------------------------
function fnClickSvc2()
{
    if ( !fnVerif("SVC2") ) return; // 검증 : SVC2

    fnSaveSvc2('${requestScope["ITEM.msgSaveOk"]}<%-- 저장이 완료되었습니다. --%>'); // SVC2 저장
}

//==============================================================================
// CTRL 클릭시..
//------------------------------------------------------------------------------
function fnClickCtrlr()
{
    if ( !fnVerif("CTRLR") ) return; // 검증 : CONTROLLER

    fnSaveCtrlr('${requestScope["ITEM.msgSaveOk"]}<%-- 저장이 완료되었습니다. --%>'); // CONTROLLER 저장
}

//==============================================================================
// 화면 클릭시..
//------------------------------------------------------------------------------
function fnClickScr()
{
    if ( !fnVerif("SCR") ) return; // 검증 : 화면

    fnSaveScr('${requestScope["ITEM.msgSaveOk"]}<%-- 저장이 완료되었습니다. --%>'); // 화면 저장
}

//==============================================================================
// 항목 클릭시..
//------------------------------------------------------------------------------
function fnClickItem()
{
    if ( !fnVerif("ITEM") ) return; // 검증 : 항목

    fnSaveItem(); // 항목 저장
}

//==============================================================================
// 메뉴 클릭시..
//------------------------------------------------------------------------------
function fnClickMenu()
{
    if ( !fnVerif("MENU") ) return; // 검증 : 메뉴

    fnSaveMenu(); // 항목 저장
}

//==============================================================================
// 목록 클릭시..
//------------------------------------------------------------------------------
function fnClickList()
{
    fnList(); // 목록
}

// < Sub Procedure and Function - 비지니스 로직 호출 영역 >
//==============================================================================
// 조회
//------------------------------------------------------------------------------
function fnInqr()
{
    gfnReq( // 요청
        // URL
        "/develop/getQueryTableList.do" // 목록 조회
        // 데이터
      , gfnGetFormData("troInqrCond")
        // 성공콜백함수
      , function(objData)
        {
            fnBindDtl(gfnGetJsonValue(objData, [ Base.RSLT_LIST ])); // 상세 바인딩
        }
    );
}

//==============================================================================
// 항목 저장
//------------------------------------------------------------------------------
function fnSaveItem()
{
    gfnReq( // 요청
        // URL
        "/develop/rgstItemTableList.do" // 등록
        // 데이터
      , gfnGetFormData("troInqrCond")
      + Base.AND + "pathNamePrfx=" + encodeURIComponent(fnGetScrPath("/") + fnGetTableEngName(2))
        // 성공콜백함수
      , function(objData)
        {
            var RSLT_VALUE = gfnGetJsonValue(objData, [ Base.RSLT_NO ]);

            if ( Base.OK != RSLT_VALUE )
            {
                if ( !gfnIsBaseError(RSLT_VALUE) ) gfnDispMsg(Base.msgRsltError); // 요청결과 오류가 발생했습니다. 관리자에게 문의하십시오.
            } else
            {
                gfnDispMsg('${requestScope["ITEM.msgSaveOk"]}<%-- 저장이 완료되었습니다. --%>');
            }
        }
    );
}

//==============================================================================
// 메뉴 저장
//------------------------------------------------------------------------------
function fnSaveMenu()
{
    gfnReq( // 요청
        // URL
        "/develop/rgstMenuTableList.do" // 등록
        // 데이터
      , gfnGetFormData("troInqrCond")
      + Base.AND + "pathNamePrfx=" + encodeURIComponent(fnGetScrPath("/") + fnGetTableEngName(2))
        // 성공콜백함수
      , function(objData)
        {
            var RSLT_VALUE = gfnGetJsonValue(objData, [ Base.RSLT_NO ]);

            if ( Base.OK != RSLT_VALUE )
            {
                if ( !gfnIsBaseError(RSLT_VALUE) ) gfnDispMsg(Base.msgRsltError); // 요청결과 오류가 발생했습니다. 관리자에게 문의하십시오.
            } else
            {
                gfnDispMsg('${requestScope["ITEM.msgSaveOk"]}<%-- 저장이 완료되었습니다. --%>');
            }
        }
    );
}

//==============================================================================
// VO 저장
//------------------------------------------------------------------------------
function fnSaveValueObj(strOkMsg)
{
    var objFso = gfnGetFso('${requestScope["ITEM.msgNoFso"]}<%-- 브라우저에 의해 해당 기능이 제한되었습니다. 브라우저 보안설정을 낮게 변경한 후 브라우저를 다시 실행하십시오. --%>');

    if ( null == objFso ) return;

    // 폴더를 추가한다.
    txtRootPath.value = gfnAddFoldr(objFso, txtRootPath.value);
    var FILE_PATH = gfnAddFoldr(objFso, txtRootPath.value + Fso.FOLDR_DELI + "java\\" + ( txtPackgName.value + txtPackgName2.value ).replace(/\./g, Fso.FOLDR_DELI) + "\\dao\\vo\\") + fnGetTableEngName(1) + "VO.java";

    // 텍스트 파일을 저장한다.
    var RSLT = gfnSaveTextFile(objFso, FILE_PATH, gfnGetTableValueObj('${requestScope["CRRNT.date"]}'), true);

    objFso = null;

    if ( Fso.ERROR_FILE == RSLT )
    {
        gfnDispMsg('${requestScope["ITEM.msgFsoErrorFile"]}<%-- 텍스트파일 저장시 오류가 발생하였습니다. 관리자에게 문의하십시오. --%>');
    } else
    if ( Fso.ERROR == RSLT )
    {
        gfnDispMsg('${requestScope["ITEM.msgFsoError"]}<%-- 텍스트파일 저장 요청시 오류가 발생하였습니다. 관리자에게 문의하십시오. --%>');
    } else
    {
        if ( Base.OK == RSLT ) gfnDispMsg(strOkMsg, FILE_PATH);
    }
}

//==============================================================================
// 쿼리 저장
//------------------------------------------------------------------------------
function fnSaveQuery(strOkMsg)
{
    var objFso = gfnGetFso('${requestScope["ITEM.msgNoFso"]}<%-- 브라우저에 의해 해당 기능이 제한되었습니다. 브라우저 보안설정을 낮게 변경한 후 브라우저를 다시 실행하십시오. --%>');

    if ( null == objFso ) return;

    // 폴더를 추가한다.
    txtRootPath.value = gfnAddFoldr(objFso, txtRootPath.value);
    var FILE_PATH = gfnAddFoldr(objFso, txtRootPath.value + Fso.FOLDR_DELI + "java\\" + ( txtPackgName.value + txtPackgName2.value ).replace(/\./g, Fso.FOLDR_DELI) + "\\dao\\sql\\") + fnGetTableEngName(1) + "Ora.xml";

    // 텍스트 파일을 저장한다.
    var RSLT = gfnSaveTextFile(objFso, FILE_PATH, gfnGetTableSql(), true);

    objFso = null;

    if ( Fso.ERROR_FILE == RSLT )
    {
        gfnDispMsg('${requestScope["ITEM.msgFsoErrorFile"]}<%-- 텍스트파일 저장시 오류가 발생하였습니다. 관리자에게 문의하십시오. --%>');
    } else
    if ( Fso.ERROR == RSLT )
    {
        gfnDispMsg('${requestScope["ITEM.msgFsoError"]}<%-- 텍스트파일 저장 요청시 오류가 발생하였습니다. 관리자에게 문의하십시오. --%>');
    } else
    {
        if ( Base.OK == RSLT ) gfnDispMsg(strOkMsg, FILE_PATH);
    }
}

//==============================================================================
// DAO 저장
//------------------------------------------------------------------------------
function fnSaveDao(strOkMsg)
{
    var objFso = gfnGetFso('${requestScope["ITEM.msgNoFso"]}<%-- 브라우저에 의해 해당 기능이 제한되었습니다. 브라우저 보안설정을 낮게 변경한 후 브라우저를 다시 실행하십시오. --%>');

    if ( null == objFso ) return;

    // 폴더를 추가한다.
    txtRootPath.value = gfnAddFoldr(objFso, txtRootPath.value);
    var FILE_PATH = gfnAddFoldr(objFso, txtRootPath.value + Fso.FOLDR_DELI + "java\\" + ( txtPackgName.value + txtPackgName2.value ).replace(/\./g, Fso.FOLDR_DELI) + "\\dao\\") + fnGetTableEngName(1) + "DAO.java";

    // 텍스트 파일을 저장한다.
    var RSLT = gfnSaveTextFile(objFso, FILE_PATH, gfnGetTableDao('${requestScope["CRRNT.date"]}'), true);

    objFso = null;

    if ( Fso.ERROR_FILE == RSLT )
    {
        gfnDispMsg('${requestScope["ITEM.msgFsoErrorFile"]}<%-- 텍스트파일 저장시 오류가 발생하였습니다. 관리자에게 문의하십시오. --%>');
    } else
    if ( Fso.ERROR == RSLT )
    {
        gfnDispMsg('${requestScope["ITEM.msgFsoError"]}<%-- 텍스트파일 저장 요청시 오류가 발생하였습니다. 관리자에게 문의하십시오. --%>');
    } else
    {
        if ( Base.OK == RSLT ) gfnDispMsg(strOkMsg, FILE_PATH);
    }
}

//==============================================================================
// DAO Impl 저장
//------------------------------------------------------------------------------
function fnSaveDao2(strOkMsg)
{
    var objFso = gfnGetFso('${requestScope["ITEM.msgNoFso"]}<%-- 브라우저에 의해 해당 기능이 제한되었습니다. 브라우저 보안설정을 낮게 변경한 후 브라우저를 다시 실행하십시오. --%>');

    if ( null == objFso ) return;

    // 폴더를 추가한다.
    txtRootPath.value = gfnAddFoldr(objFso, txtRootPath.value);
    var FILE_PATH = gfnAddFoldr(objFso, txtRootPath.value + Fso.FOLDR_DELI + "java\\" + ( txtPackgName.value + txtPackgName2.value ).replace(/\./g, Fso.FOLDR_DELI) + "\\dao\\impl\\") + fnGetTableEngName(1) + "DAOImpl.java";

    // 텍스트 파일을 저장한다.
    var RSLT = gfnSaveTextFile(objFso, FILE_PATH, gfnGetTableDao2('${requestScope["CRRNT.date"]}'), true);

    objFso = null;

    if ( Fso.ERROR_FILE == RSLT )
    {
        gfnDispMsg('${requestScope["ITEM.msgFsoErrorFile"]}<%-- 텍스트파일 저장시 오류가 발생하였습니다. 관리자에게 문의하십시오. --%>');
    } else
    if ( Fso.ERROR == RSLT )
    {
        gfnDispMsg('${requestScope["ITEM.msgFsoError"]}<%-- 텍스트파일 저장 요청시 오류가 발생하였습니다. 관리자에게 문의하십시오. --%>');
    } else
    {
        if ( Base.OK == RSLT ) gfnDispMsg(strOkMsg, FILE_PATH);
    }
}

//==============================================================================
// SVC 저장
//------------------------------------------------------------------------------
function fnSaveSvc(strOkMsg)
{
    var objFso = gfnGetFso('${requestScope["ITEM.msgNoFso"]}<%-- 브라우저에 의해 해당 기능이 제한되었습니다. 브라우저 보안설정을 낮게 변경한 후 브라우저를 다시 실행하십시오. --%>');

    if ( null == objFso ) return;

    // 폴더를 추가한다.
    txtRootPath.value = gfnAddFoldr(objFso, txtRootPath.value);
    var FILE_PATH = gfnAddFoldr(objFso, txtRootPath.value + Fso.FOLDR_DELI + "java\\" + ( txtPackgName.value + txtPackgName2.value ).replace(/\./g, Fso.FOLDR_DELI) + "\\svc\\") + fnGetTableEngName(1) + "Service.java";

    // 텍스트 파일을 저장한다.
    var RSLT = gfnSaveTextFile(objFso, FILE_PATH, gfnGetTableSvc('${requestScope["CRRNT.date"]}'), true);

    objFso = null;

    if ( Fso.ERROR_FILE == RSLT )
    {
        gfnDispMsg('${requestScope["ITEM.msgFsoErrorFile"]}<%-- 텍스트파일 저장시 오류가 발생하였습니다. 관리자에게 문의하십시오. --%>');
    } else
    if ( Fso.ERROR == RSLT )
    {
        gfnDispMsg('${requestScope["ITEM.msgFsoError"]}<%-- 텍스트파일 저장 요청시 오류가 발생하였습니다. 관리자에게 문의하십시오. --%>');
    } else
    {
        if ( Base.OK == RSLT ) gfnDispMsg(strOkMsg, FILE_PATH);
    }
}

//==============================================================================
// SVC Impl 저장
//------------------------------------------------------------------------------
function fnSaveSvc2(strOkMsg)
{
    var objFso = gfnGetFso('${requestScope["ITEM.msgNoFso"]}<%-- 브라우저에 의해 해당 기능이 제한되었습니다. 브라우저 보안설정을 낮게 변경한 후 브라우저를 다시 실행하십시오. --%>');

    if ( null == objFso ) return;

    // 폴더를 추가한다.
    txtRootPath.value = gfnAddFoldr(objFso, txtRootPath.value);
    var FILE_PATH = gfnAddFoldr(objFso, txtRootPath.value + Fso.FOLDR_DELI + "java\\" + ( txtPackgName.value + txtPackgName2.value ).replace(/\./g, Fso.FOLDR_DELI) + "\\svc\\impl\\") + fnGetTableEngName(1) + "ServiceImpl.java";

    // 텍스트 파일을 저장한다.
    var RSLT = gfnSaveTextFile(objFso, FILE_PATH, gfnGetTableSvc2('${requestScope["CRRNT.date"]}'), true);

    objFso = null;

    if ( Fso.ERROR_FILE == RSLT )
    {
        gfnDispMsg('${requestScope["ITEM.msgFsoErrorFile"]}<%-- 텍스트파일 저장시 오류가 발생하였습니다. 관리자에게 문의하십시오. --%>');
    } else
    if ( Fso.ERROR == RSLT )
    {
        gfnDispMsg('${requestScope["ITEM.msgFsoError"]}<%-- 텍스트파일 저장 요청시 오류가 발생하였습니다. 관리자에게 문의하십시오. --%>');
    } else
    {
        if ( Base.OK == RSLT ) gfnDispMsg(strOkMsg, FILE_PATH);
    }
}

//==============================================================================
// CONTROLLER 저장
//------------------------------------------------------------------------------
function fnSaveCtrlr(strOkMsg)
{
    var objFso = gfnGetFso('${requestScope["ITEM.msgNoFso"]}<%-- 브라우저에 의해 해당 기능이 제한되었습니다. 브라우저 보안설정을 낮게 변경한 후 브라우저를 다시 실행하십시오. --%>');

    if ( null == objFso ) return;

    // 폴더를 추가한다.
    txtRootPath.value = gfnAddFoldr(objFso, txtRootPath.value);
    var FILE_PATH = gfnAddFoldr(objFso, txtRootPath.value + Fso.FOLDR_DELI + "java\\" + ( txtPackgName.value + txtPackgName2.value ).replace(/\./g, Fso.FOLDR_DELI) + "\\ctrl\\") + fnGetTableEngName(1) + "Controller.java";

    // 텍스트 파일을 저장한다.
    var RSLT = gfnSaveTextFile(objFso, FILE_PATH, gfnGetTableCtrlr('${requestScope["CRRNT.date"]}'), true);

    objFso = null;

    if ( Fso.ERROR_FILE == RSLT )
    {
        gfnDispMsg('${requestScope["ITEM.msgFsoErrorFile"]}<%-- 텍스트파일 저장시 오류가 발생하였습니다. 관리자에게 문의하십시오. --%>');
    } else
    if ( Fso.ERROR == RSLT )
    {
        gfnDispMsg('${requestScope["ITEM.msgFsoError"]}<%-- 텍스트파일 저장 요청시 오류가 발생하였습니다. 관리자에게 문의하십시오. --%>');
    } else
    {
        if ( Base.OK == RSLT ) gfnDispMsg(strOkMsg, FILE_PATH);
    }
}

//==============================================================================
// 화면 저장
//------------------------------------------------------------------------------
function fnSaveScr(strOkMsg)
{
    var objFso = gfnGetFso('${requestScope["ITEM.msgNoFso"]}<%-- 브라우저에 의해 해당 기능이 제한되었습니다. 브라우저 보안설정을 낮게 변경한 후 브라우저를 다시 실행하십시오. --%>');

    if ( null == objFso ) return;

    // 폴더를 추가한다.
    txtRootPath.value = gfnAddFoldr(objFso, txtRootPath.value);
    var FILE_PATH = gfnAddFoldr(objFso, txtRootPath.value + Fso.FOLDR_DELI + "webapp\\WEB-INF\\views\\" + hidPrjctName.value + Fso.FOLDR_DELI + fnGetScrPath(Fso.FOLDR_DELI)) + fnGetTableEngName(2) + "Grid.jsp";

    // 텍스트 파일을 저장한다.
    var RSLT = gfnSaveTextFile(objFso, FILE_PATH, gfnGetTableScr('${requestScope["CRRNT.date"]}'), true);

    objFso = null;

    if ( Fso.ERROR_FILE == RSLT )
    {
        gfnDispMsg('${requestScope["ITEM.msgFsoErrorFile"]}<%-- 텍스트파일 저장시 오류가 발생하였습니다. 관리자에게 문의하십시오. --%>');
    } else
    if ( Fso.ERROR == RSLT )
    {
        gfnDispMsg('${requestScope["ITEM.msgFsoError"]}<%-- 텍스트파일 저장 요청시 오류가 발생하였습니다. 관리자에게 문의하십시오. --%>');
    } else
    {
        if ( Base.OK == RSLT ) gfnDispMsg(strOkMsg, FILE_PATH);
    }
}

// < Sub Procedure and Function - 그리드 영역 >

// < Sub Procedure and Function - 차트 영역 >

// < Sub Procedure and Function - 화면 링크 및 이동 >
//==============================================================================
// 목록
//------------------------------------------------------------------------------
function fnList()
{
    // 페이지 이동
    gfnMovePage("/develop/tableGrid.do"); // 목록
}

// < Sub Procedure and Function - 기타 영역 >
//==============================================================================
// 화면 제어
//------------------------------------------------------------------------------
function fnCtrlScr(strClsfy)
{
    if ( "READY" == strClsfy ) // DOM준비
    {
        $(btnList    ).click(fnClickList    ); // 클릭
        $(btnValueObj).click(fnClickValueObj);
        $(btnQuery   ).click(fnClickQuery   );
        $(btnDao     ).click(fnClickDao     );
        $(btnDao2    ).click(fnClickDao2    );
        $(btnSvc     ).click(fnClickSvc     );
        $(btnSvc2    ).click(fnClickSvc2    );
        $(btnCtrlr   ).click(fnClickCtrlr   );
        $(btnScr     ).click(fnClickScr     );
        $(btnItem    ).click(fnClickItem    );
        $(btnMenu    ).click(fnClickMenu    );

        $(sltPrjctName).change(fnChgPrjctName); // 변경
        $(sltPrjctName).change();
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
    if ( 0 <= "|VALUEOBJ|DAO|DAO2|SVC|SVC2|CTRLR|".indexOf(Base.DELI1 + strClsfy + Base.DELI1) ) // VO // DAO // DAO2 // SVC // SVC2 // CONTROLLER
    {
        var MSG_INPUT_ITEM = '${requestScope["ITEM.msgInputItem"]}'; // 해당 항목을 입력하십시오.

        // 입력여부 검증
        if ( !gfnVerifInputYn( thoUserName.innerText, "txtUserName"  , MSG_INPUT_ITEM) ) return false; // 작성자
        if ( !gfnVerifInputYn( thoRootPath.innerText, "txtRootPath"  , MSG_INPUT_ITEM) ) return false; // Root Path
        if ( !gfnVerifInputYn(thoPackgName.innerText, "txtPackgName2", MSG_INPUT_ITEM) ) return false; // Package

        if ( gfnIsEmpty(txaQuery6.value) )
        {
            gfnDispMsg('${requestScope["ITEM.msgNoData"]}<%-- 데이터가 존재하지 않습니다. --%>');
            return false;
        }
    } else
    if ( "QUERY" == strClsfy ) // 쿼리
    {
        var MSG_INPUT_ITEM = '${requestScope["ITEM.msgInputItem"]}'; // 해당 항목을 입력하십시오.

        // 입력여부 검증
        if ( !gfnVerifInputYn( thoRootPath.innerText, "txtRootPath"  , MSG_INPUT_ITEM) ) return false; // Root Path
        if ( !gfnVerifInputYn(thoPackgName.innerText, "txtPackgName2", MSG_INPUT_ITEM) ) return false; // Package

        if ( gfnIsEmpty(txaQuery1.value) )
        {
            gfnDispMsg('${requestScope["ITEM.msgNoData"]}<%-- 데이터가 존재하지 않습니다. --%>');
            return false;
        }
    }

    return true; // 리턴 처리
}

//==============================================================================
// 상세 바인딩
//------------------------------------------------------------------------------
function fnBindDtl(arrRsltList)
{
    if ( null == arrRsltList ) return;

    var LNGTH = arrRsltList.length, QUERY = "query", NEW_LINE = "\n";
    var strQuery, numNo = 1 ;

    for ( var num = 0 ; num < LNGTH ; num++ ) {
        strQuery = arrRsltList[num][QUERY];

        if ( !gfnIsEmpty(strQuery) )
            eval("txaQuery" + numNo).value += strQuery + NEW_LINE;
        else
            numNo++;
    }

    // 일련번호여부를 설정한다.
    var arrQuery4 = txaQuery4.value.split("\r\n"), LNGTH4 = arrQuery4.length - 1;
    arrQuery4 = arrQuery4.slice(0, arrQuery4.length - 1);

    var numTmp4 = null;
    for ( var num = 0 ; num < LNGTH4 ; num++ )
    {
        if ( 0 == arrQuery4[num].indexOf("WHERE   ") )
        {
            numTmp4 = num; break;
        }
    }

    if ( ( numTmp4 + 1 ) == LNGTH4 )
    {
        if ( 0 < arrQuery4[2].indexOf(" SEQ ") || 0 < arrQuery4[2].indexOf("_SEQ ")
        ||   0 < arrQuery4[2].indexOf("_NO " ) || 0 < arrQuery4[2].indexOf(" NO " ) )
            hidSeqYn.value = Base.YES;
    }

    // PK수를 설정한다.
    if ( numTmp4 < LNGTH4 )
        hidPkCount.value = ( LNGTH4 - numTmp4 ).toString();

    arrQuery4 = null;
}

//==============================================================================
// 텍스트 가져오기
//------------------------------------------------------------------------------
function fnGetText(obj)
{
    return ( gfnIsEmpty(obj) ? "N/A" : obj );
}

//==============================================================================
// 테이블 영문명 가져오기
//------------------------------------------------------------------------------
function fnGetTableEngName(numType)
{
    return fnConvt(txtTableEngName.value.replace(/TB_/, Base.EMPTYSTR), numType);
}

//==============================================================================
// 변환
//------------------------------------------------------------------------------
function fnConvt(strData, numType)
{
    if ( 1 == numType ) // VO Prefix
    {
        var arrOutpt = strData.toLowerCase().split("_");
        var LNGTH = arrOutpt.length;

        if ( 0 < LNGTH )
        {
            var strTmp;

            for ( var num = 0 ; num < LNGTH ; num++ )
            {
                strTmp = arrOutpt[num];
                arrOutpt[num] = strTmp.substr(0, 1).toUpperCase() + strTmp.substr(1).toLowerCase();
            }
        }

        return arrOutpt.join(Base.EMPTYSTR);
    } else
    if ( 2 == numType ) // camel
    {
        var arrOutpt = strData.toLowerCase().split("_");
        var LNGTH = arrOutpt.length;

        if ( 0 < LNGTH )
        {
            var strTmp;

            for ( var num = 0 ; num < LNGTH ; num++ )
            {
                strTmp = arrOutpt[num];
                if ( 0 == num )
                    arrOutpt[num] = strTmp.toLowerCase();
                else
                    arrOutpt[num] = strTmp.substr(0, 1).toUpperCase() + strTmp.substr(1).toLowerCase();
            }
        }

        return arrOutpt.join(Base.EMPTYSTR);
    } else
    {
        return strData;
    }
}

//==============================================================================
// 화면 경로 가져오기
//------------------------------------------------------------------------------
function fnGetScrPath(strDeli) {
    var DELI = Base.DOT;

    var arrOutpt = txtPackgName2.value.split(DELI);
    arrOutpt[2] = null;

    return strDeli + arrOutpt.join(DELI).replace(/\./g, strDeli);
}

//==============================================================================
// PK 마지막 변수 가져오기
//------------------------------------------------------------------------------
function fnGetPkLastVar(numType)
{
    var strOutpt;

    var arrQuery4 = txaQuery4.value.split("\r\n");
    arrQuery4 = arrQuery4.slice(0, arrQuery4.length - 1);
    strOutpt = arrQuery4[arrQuery4.length - 1].substr(41);
    strOutpt = strOutpt.substr(0, strOutpt.indexOf("}"));
    arrQuery4 = null;

    if ( 1 == numType )
        return strOutpt;
    else
        return strOutpt.substr(0, 1).toUpperCase() + strOutpt.substr(1);
}

//==============================================================================
// 마지막 숫자 삭제
//------------------------------------------------------------------------------
function fnDeltLastNum(str)
{
    var strOutpt = str;

    var LNGTH = ( null != str ? str.length : 0 );

    for ( var num = LNGTH - 1 ; num >= 1 ; num-- )
    {
        if ( gfnIsNum(strOutpt.charAt(num)) ) strOutpt = strOutpt.substr(0, num);
        else break;
    }

    return strOutpt;
}

//==============================================================================
// 존재
//------------------------------------------------------------------------------
function fnExist(strTarg, strData, blnReplaceAll)
{
    if ( null == blnReplaceAll ) blnReplaceAll = false;

    var DATA = strData.substr(0, 1).toUpperCase() + strData.substr(1);
    var TMP = ( blnReplaceAll ? strTarg.replace(/[0-9]/g, Base.EMPTYSTR) : fnDeltLastNum(strTarg) );

    return ( strData == TMP || DATA == TMP.substr(TMP.length - DATA.length) );
}
function fnExistList(strTarg, arrData, blnReplaceAll)
{
    if ( null == blnReplaceAll ) blnReplaceAll = false;

    var LNGTH = arrData.length;

    var blnOutpt = false;

    var strData, strTmp;

    for ( var num = 0 ; num < LNGTH ; num++ )
    {
        strData = arrData[num].substr(0, 1).toUpperCase() + arrData[num].substr(1);
        strTmp = ( blnReplaceAll ? strTarg.replace(/[0-9]/g, Base.EMPTYSTR) : fnDeltLastNum(strTarg) );
        blnOutpt = ( arrData[num] == strTmp || strData == strTmp.substr(strTmp.length - strData.length) );
        if ( blnOutpt ) break;
    }

    return blnOutpt;
}

//==============================================================================
// 코드헤더 가져오기
//------------------------------------------------------------------------------
function fnGetCodeHdr(strData)
{
    var strOutpt = strData;

    var ENG_NAME = txtTableEngName.value.replace(/TB_/, Base.EMPTYSTR);

    if ( 0 > strOutpt.indexOf(ENG_NAME) ) strOutpt = ENG_NAME + "_" + strOutpt;
    if ( 0 < strOutpt.indexOf("_CODE") ) strOutpt = strOutpt.replace(/_CODE/, "");

    strOutpt = fnDeltLastNum(strOutpt);

    return strOutpt;
}
-->
</script>
<!-- // CSS 및 JavaScript 관련 -->

<!-- contents -->
<body>
    <div class="head">
        <h3>테이블상세</h3>
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

    <div class="divBox"><div class="divRight" style="width: 100%">
        <input type="hidden" id="hidSeqYn" value="N" /><!-- 일련번호여부 //-->
        <input type="hidden" id="hidPkCount" value="0" /><!-- PK수 //-->

        <div class="yearInfo" id="divDtl">
            <table class="input01">
                <colgroup>
                    <col width="11%" />
                    <col width="15%" />
                    <col width="13%" />
                    <col width="23%" />
                    <col width="13%" />
                    <col />
                </colgroup>
                <tbody>
                    <tr id="troInqrCond">
                        <th>${requestScope["ITEM.owner"]}<%-- 소유자 --%></th>
                        <td><input type="text" id="txtOwnerName"    name="ownerName"    class="inputText01 readonly" tabindex="-1" /></td>
                        <th>${requestScope["ITEM.tableEngName"]}<%-- 테이블(영문) --%></th>
                        <td><input type="text" id="txtTableEngName" name="tableEngName" class="inputText01 readonly" tabindex="-1" /></td>
                        <th>${requestScope["ITEM.tableKrnName"]}<%-- 테이블(한글) --%></th>
                        <td><input type="text" id="txtTableKrnName" name="tableKrnName" class="inputText01 readonly" tabindex="-1" /></td>
                    </tr>
                    <tr>
                        <th>${requestScope["ITEM.query"]}<%-- 쿼리 --%></th>
                        <td colspan="5" style="padding-left: 0">
                            <textarea id="txaQuery1" tabindex="110" style="font-family: 돋움체; word-wrap: normal; width: 100%; height: 50px"></textarea>
                            <textarea id="txaQuery2" tabindex="120" style="font-family: 돋움체; word-wrap: normal; width: 100%; height: 50px"></textarea>
                            <textarea id="txaQuery3" tabindex="130" style="font-family: 돋움체; word-wrap: normal; width: 100%; height: 50px"></textarea>
                            <textarea id="txaQuery4" tabindex="140" style="font-family: 돋움체; word-wrap: normal; width: 100%; height: 30px"></textarea>
                            <textarea id="txaQuery5" tabindex="150" style="font-family: 돋움체; word-wrap: normal; width: 100%; height: 30px"></textarea>
                            <textarea id="txaQuery6" tabindex="160" style="font-family: 돋움체; word-wrap: normal; width: 100%; height: 30px"></textarea>
                            <textarea id="txaQuery7" tabindex="170" style="font-family: 돋움체; word-wrap: normal; width: 100%; height: 30px"></textarea>
                            <textarea id="txaQuery8" tabindex="180" style="font-family: 돋움체; word-wrap: normal; width: 100%; height: 30px"></textarea>
                            <textarea id="txaQuery9" tabindex="190" style="font-family: 돋움체; word-wrap: normal; width: 100%; height: 30px"></textarea>
                            <textarea id="txaQuery10" tabindex="200" style="font-family: 돋움체; word-wrap: normal; width: 10%; height: 30px"></textarea>
                            <textarea id="txaQuery11" tabindex="210" style="font-family: 돋움체; word-wrap: normal; width: 10%; height: 30px"></textarea>
                            <textarea id="txaQuery12" tabindex="220" style="font-family: 돋움체; word-wrap: normal; width: 10%; height: 30px"></textarea>
                            <textarea id="txaQuery13" tabindex="230" style="font-family: 돋움체; word-wrap: normal; width: 10%; height: 30px"></textarea>
                            <textarea id="txaQuery14" tabindex="240" style="font-family: 돋움체; word-wrap: normal; width: 10%; height: 30px"></textarea>
                            <textarea id="txaQuery15" tabindex="250" style="font-family: 돋움체; word-wrap: normal; width: 10%; height: 30px"></textarea>
                            <textarea id="txaQuery16" tabindex="260" style="font-family: 돋움체; word-wrap: normal; width: 10%; height: 30px"></textarea>
                            <textarea id="txaQuery17" tabindex="270" style="font-family: 돋움체; word-wrap: normal; width: 10%; height: 30px"></textarea>
                            <textarea id="txaQuery18" tabindex="280" style="font-family: 돋움체; word-wrap: normal; width: 100%; height: 30px"></textarea>
                            <textarea id="txaQuery19" tabindex="290" style="font-family: 돋움체; word-wrap: normal; width: 100%; height: 30px"></textarea>
                            <textarea id="txaQuery20" tabindex="300" style="font-family: 돋움체; word-wrap: normal; width: 100%; height: 30px"></textarea>
                        </td>
                    </tr>
                </tbody>
            </table>

            <div style="margin-bottom: 20px"></div>
            <table class="input01">
                <colgroup>
                    <col width="14%" />
                    <col width="14%" />
                    <col width="9%" />
                    <col width="8%" />
                    <col width="12%" />
                    <col />
                </colgroup>
                <tbody>
                    <tr>
                        <th class="require" id="thoPrjctName">Project Name</th>
                        <td>
                            <select id="sltPrjctName" style="width: 100%">
                                <option value="epfse">EPF-SE</option>
                                <option value="ghgs">GREENHOUSEGAS</option>
                                <option value="esmrv" selected="selected">ES-MRV3</option>
                            </select>
                            <input type="hidden" id="hidPrjctName" value="" />
                        </td>
                        <th class="require" id="thoUserName">${requestScope["ITEM.userName"]}<%-- 작성자 --%></th>
                        <td><input type="text" id="txtUserName" class="inputText01" value="유광식" style="ime-mode: active" /></td>
                        <th class="require" id="thoRootPath">Root Path</th>
                        <td><input type="text" id="txtRootPath" class="inputText01" value="C:\~\" /></td>
                    </tr>
                    <tr>
                        <th class="require" id="thoPackgName">Package</th>
                        <td colspan="2"><input type="text" id="txtPackgName"  class="inputText01 readonly" /></td>
                        <td colspan="2"><input type="text" id="txtPackgName2" class="inputText01" value="com.base.temp" style="ime-mode: disabled" /></td>
                        <td />
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- 버튼 //-->
        <div class="buttonBox">
            <div style="float: left">
                <span class="button gray"><button type="button" id="btnValueObj">VO</button></span>
                <span class="button gray"><button type="button" id="btnQuery">SQL</button></span>
                <span class="button gray"><button type="button" id="btnDao">DAO</button></span>
                <span class="button gray"><button type="button" id="btnDao2">DAO Impl</button></span>
                <span class="button gray"><button type="button" id="btnSvc">SVC</button></span>

                <span class="button gray"><button type="button" id="btnSvc2">SVC Impl</button></span>
                <span class="button gray"><button type="button" id="btnCtrlr">CTRL</button></span>
                <span class="button gray"><button type="button" id="btnScr">화면</button></span>
                <span class="button gray"><button type="button" id="btnItem">항목</button></span>
                <span class="button gray"><button type="button" id="btnMenu">메뉴</button></span>
            </div>

            <span class="button lime"><button type="button" id="btnList">${requestScope["ITEM.list"]}<%-- 목록 --%></button></span>
        </div>
    </div></div>
<!-- // contents -->

<%@ include file="../../epfse/system/tabFtr.jsp" %><%-- 탭 푸터 --%>