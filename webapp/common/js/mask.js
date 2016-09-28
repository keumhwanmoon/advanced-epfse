/*
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 마스크
    - 최초작성일 : 2014-04-29
    - 작  성  자 : 유광식
    - 비      고 :
--------------------------------------------------------------------------------
*/
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 전역변수 관련
//==============================================================================

var g_strUserDefineMaskMaskTypeID       = "userdefinemaskmasktype"       ; // 사용자정의 마스크 마스크타입 ID 전역변수 선언 및 설정
var g_strUserDefineMaskFormatTargetYnID = "userdefinemaskformattargetyn" ; // 사용자정의 마스크 포맷대상여부 ID 전역변수 선언 및 설정
var g_strUserDefineMaskIntMaxLengthID   = "userdefinemaskintmaxlength"   ; // 사용자정의 마스크 통화 정수최대길이 ID 전역변수 선언 및 설정

var g_strUserDefineMaskCurrMaskType    = "curr"    ; // 사용자정의 마스크 통화 마스크타입 ID 전역변수 선언 및 설정
var g_strUserDefineMaskDateMaskType    = "date"    ; // 사용자정의 마스크 날짜 마스크타입 ID 전역변수 선언 및 설정
var g_strUserDefineMaskFixedMaskType   = "fixed"   ; // 사용자정의 마스크 고정된 마스크타입 ID 전역변수 선언 및 설정
var g_strUserDefineMaskUnFixedMaskType = "unfixed" ; // 사용자정의 마스크 고정되지 않은 마스크타입 ID 전역변수 선언 및 설정
var g_strUserDefineMaskLimitedMaskType = "limited" ; // 사용자정의 마스크 제한된 마스크타입 ID 전역변수 선언 및 설정

var g_strUserDefineMaskCurrDecMaxLengthID = "userdefinemaskdecmaxlength" ; // 사용자정의 마스크 통화 소수최대길이 ID 전역변수 선언 및 설정
var g_strUserDefineMaskCurrMinusInputYnID = "userdefinemaskminusinputyn" ; // 사용자정의 마스크 통화 음수입력여부 ID 전역변수 선언 및 설정
var g_strUserDefineMaskDateYmYnID         = "userdefinemaskdateymyn"     ; // 사용자정의 마스크 날짜 년월여부 ID 전역변수 선언 및 설정
var g_strUserDefineMaskMaskStrID          = "userdefinemaskmaskstr"      ; // 사용자정의 마스크 마스크문자열 ID 전역변수 선언 및 설정

var g_strUserDefineMaskContextMenuObjID = "divUserDefineMaskContextMenu" ; // 사용자정의 마스크 컨텍스트 메뉴 ID 전역변수 선언 및 설정
var g_strUserDefineMaskTargetObjID      = "hidUserDefineMaskTargetObjID" ; // 사용자정의 마스크 대상 개체ID 전역변수 선언 및 설정

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 마스크 설정 관련
//==============================================================================

//==============================================================================
// 용도     : 통화 사용자정의 마스크 설정
// 문법     : gfnSetCurrUserDefineMask(jobjText As Object, strIntMaxLength As String, strDecMaxLength As String, bMinusInputYn As Boolean)
// 파라미터 : 1. jobjText        - 텍스트 개체  (필수)
//            2. strIntMaxLength - 정수최대길이 (선택) 참고) 미입력시 "15" 입력과 동일(단, 해당 속성값이 정의되지 않은 경우..)
//            3. strDecMaxLength - 소수최대길이 (선택) 참고) 미입력시 "6" 입력과 동일(단, 해당 속성값이 정의되지 않은 경우..)
//            4. bMinusInputYn   - 음수입력여부 (선택) 참고) 미입력시 false 입력과 동일(단, 해당 속성값이 정의되지 않은 경우..)
// 예제     : 1. gfnSetCurrUserDefineMask($("#txtCurr"));
//            2. gfnSetCurrUserDefineMask($("#txtCurr"), "10");
//            3. gfnSetCurrUserDefineMask($("#txtCurr"), null, "3");
//            4. gfnSetCurrUserDefineMask($("#txtCurr"), "10", "3");
//            5. gfnSetCurrUserDefineMask($("#txtCurr"), "10", "3", true);
// 리턴값   : 없음
// 참고사항 : 1. 한글은 입력할 수 없다.
//            2. 키다운 및 키업 이벤트를 사용한다.
//            3. 선택된 텍스트의 드래그는 사용할 수 없다.
//            4. 입력가능한 키는 gfnKeyDownCurrUserDefineMask() 를 참고한다.
// 기타     : 개발자배포용
// 작성일자 : 2011-09-27
//------------------------------------------------------------------------------
function gfnSetCurrUserDefineMask(jobjText, strIntMaxLength, strDecMaxLength, bMinusInputYn)
{
    if ( strIntMaxLength == null || strIntMaxLength.toString().length <= 0 ) strIntMaxLength = jobjText.attr(g_strUserDefineMaskIntMaxLengthID);
    if ( strIntMaxLength == null || strIntMaxLength.toString().length <= 0 ) strIntMaxLength = "15" ;
    if ( strDecMaxLength == null || strDecMaxLength.toString().length <= 0 ) strDecMaxLength = jobjText.attr(g_strUserDefineMaskCurrDecMaxLengthID);
    if ( strDecMaxLength == null || strDecMaxLength.toString().length <= 0 ) strDecMaxLength = "6"   ;
    if ( bMinusInputYn   == null ) bMinusInputYn = ( jobjText.attr(g_strUserDefineMaskCurrMinusInputYnID) == "Y" ? true : false );

    var strDeli = "|" ;
    var strPrevMaskType = jobjText.attr(g_strUserDefineMaskMaskTypeID);

    var bPrevMaskTypeXstnYn = ( ( strDeli + g_strUserDefineMaskCurrMaskType + strDeli + g_strUserDefineMaskDateMaskType + strDeli + g_strUserDefineMaskFixedMaskType + strDeli + g_strUserDefineMaskUnFixedMaskType + strDeli + g_strUserDefineMaskLimitedMaskType + strDeli ).indexOf(strDeli + strPrevMaskType + strDeli) >= 0 );

    // 사용자정의속성 제거
    jobjText.removeAttr(g_strUserDefineMaskDateYmYnID); // 사용자정의 마스크 날짜 년월여부
    jobjText.removeAttr(g_strUserDefineMaskMaskStrID); // 사용자정의 마스크 마스크문자열

    // 사용자정의속성 설정
    jobjText.attr(g_strUserDefineMaskMaskTypeID, g_strUserDefineMaskCurrMaskType); // 사용자정의 마스크 마스크유형
    jobjText.attr(g_strUserDefineMaskFormatTargetYnID, "Y"); // 사용자정의 마스크 포맷대상여부
    jobjText.attr(g_strUserDefineMaskIntMaxLengthID, strIntMaxLength.toString()); // 사용자정의 마스크 정수최대길이
    jobjText.attr(g_strUserDefineMaskCurrDecMaxLengthID, strDecMaxLength.toString()); // 사용자정의 마스크 소수최대길이
    jobjText.attr(g_strUserDefineMaskCurrMinusInputYnID, ( bMinusInputYn ? "Y" : "N" )); // 사용자정의 마스크 음수입력여부

    // 속성 설정
    jobjText.attr("maxlength", null);

    // CSS 설정
    jobjText.css("ime-mode", "disabled"); // 한글입력을 제한한다.
    jobjText.css("text-align", "right");

    if ( !bPrevMaskTypeXstnYn )
    {
        // 이벤트 설정
        jobjText.keyup(function() { gfnKeyUpUserDefineMask(event); }); // 키업
        jobjText.keydown(function() { return gfnKeyDownUserDefineMask(event); }); // 키다운
        jobjText.bind("contextmenu", gfnContextMenuUserDefineMask); // 컨텍스트 메뉴
        jobjText.bind("dragstart"  , function() { return false ; }); // 선택된 텍스트의 드래그를 허용하지 않는다.
    }

    gfnReleaseFormatTargetYnUserDefineMask(jobjText, false); // 사용자정의 마스크 포맷대상여부 해제
}

//==============================================================================
// 용도     : 날짜 사용자정의 마스크 설정
// 문법     : gfnSetDateUserDefineMask(jobjText As Object, bYmYn As Boolean)
// 파라미터 : 1. jobjText - 텍스트 개체 (필수)
//            2. bYmYn    - 년월여부    (선택) 참고) 미입력시 false 입력과 동일(단, 해당 속성값이 정의되지 않은 경우..)
// 예제     : 1. gfnSetDateUserDefineMask($("#txtDate"));
//            2. gfnSetDateUserDefineMask($("#txtDate"), true);
// 리턴값   : 없음
// 참고사항 : 1. 한글은 입력할 수 없다.
//            2. 키다운 및 키업 이벤트를 사용한다.
//            3. 선택된 텍스트의 드래그는 사용할 수 없다.
//            4. 입력가능한 키는 gfnKeyDownDateUserDefineMask() 를 참고한다.
// 기타     : 개발자배포용
// 작성일자 : 2011-09-27
//------------------------------------------------------------------------------
function gfnSetDateUserDefineMask(jobjText, bYmYn)
{
    if ( bYmYn == null ) bYmYn = ( jobjText.attr("maxlength") == "7" ? true : false );

    var strDeli = "|" ;
    var strPrevMaskType = jobjText.attr(g_strUserDefineMaskMaskTypeID);
    var bPrevMaskTypeXstnYn = ( ( strDeli + g_strUserDefineMaskCurrMaskType + strDeli + g_strUserDefineMaskDateMaskType + strDeli + g_strUserDefineMaskFixedMaskType + strDeli + g_strUserDefineMaskUnFixedMaskType + strDeli + g_strUserDefineMaskLimitedMaskType + strDeli ).indexOf(strDeli + strPrevMaskType + strDeli) >= 0 );

    // 사용자정의속성 제거
    jobjText.removeAttr(g_strUserDefineMaskCurrDecMaxLengthID); // 사용자정의 마스크 소수최대길이
    jobjText.removeAttr(g_strUserDefineMaskCurrMinusInputYnID); // 사용자정의 마스크 음수입력여부
    jobjText.removeAttr(g_strUserDefineMaskMaskStrID); // 사용자정의 마스크 마스크문자열

    // 사용자정의속성 설정
    jobjText.attr(g_strUserDefineMaskMaskTypeID, g_strUserDefineMaskDateMaskType); // 사용자정의 마스크 마스크유형
    jobjText.attr(g_strUserDefineMaskFormatTargetYnID, "Y"); // 사용자정의 마스크 포맷대상여부
    jobjText.attr(g_strUserDefineMaskDateYmYnID, ( bYmYn ? "Y" : "N" )); // 사용자정의 마스크 날짜 년월여부
    jobjText.attr(g_strUserDefineMaskIntMaxLengthID, ( bYmYn ? "7" : "10" )); // 사용자정의 마스크 날짜 년월여부

    // 속성 설정
    jobjText.attr("maxlength", null);

    // CSS 설정
    jobjText.css("ime-mode", "disabled"); // 한글입력을 제한한다.
    jobjText.css("text-align", "center");

    if ( !bPrevMaskTypeXstnYn )
    {
        // 이벤트 설정
        jobjText.keyup(function() { gfnKeyUpUserDefineMask(event); }); // 키업
        jobjText.keydown(function() { return gfnKeyDownUserDefineMask(event); }); // 키다운
        jobjText.bind("contextmenu", gfnContextMenuUserDefineMask); // 컨텍스트 메뉴
        jobjText.bind("dragstart"  , function() { return false ; }); // 선택된 텍스트의 드래그를 허용하지 않는다.
    }

    gfnReleaseFormatTargetYnUserDefineMask(jobjText, false); // 사용자정의 마스크 포맷대상여부 해제
}

//==============================================================================
// 용도     : 고정된 사용자정의 마스크 설정
// 문법     : gfnSetFixedUserDefineMask(jobjText As Object, strMaskStr As String)
// 파라미터 : 1. jobjText   - 텍스트 개체
//            2. strMaskStr - 마스크문자열 예제) "999-999". 우편번호
// 예제     : 1. gfnSetFixedUserDefineMask($("#txtPost"), "999-999");
//            2. gfnSetFixedUserDefineMask($("#txtPost"), "우) 999 999");
// 리턴값   : 없음
// 참고사항 : 1. 한글은 입력할 수 없다.
//            2. 키다운 및 키업 이벤트를 사용한다.
//            3. 선택된 텍스트의 드래그는 사용할 수 없다.
//            4. 입력가능한 키는 gfnKeyDownFixedUserDefineMask() 를 참고한다.
//            5. 마스크는 숫자 및 그 외 문자들로 구성한다.
// 기타     : 개발자배포용
// 작성일자 : 2011-09-27
//------------------------------------------------------------------------------
function gfnSetFixedUserDefineMask(jobjText, strMaskStr)
{
    var strDeli = "|" ;
    var strPrevMaskType = jobjText.attr(g_strUserDefineMaskMaskTypeID);
    var bPrevMaskTypeXstnYn = ( ( strDeli + g_strUserDefineMaskCurrMaskType + strDeli + g_strUserDefineMaskDateMaskType + strDeli + g_strUserDefineMaskFixedMaskType + strDeli + g_strUserDefineMaskUnFixedMaskType + strDeli + g_strUserDefineMaskLimitedMaskType + strDeli ).indexOf(strDeli + strPrevMaskType + strDeli) >= 0 );

    // 사용자정의속성 제거
    jobjText.removeAttr(g_strUserDefineMaskIntMaxLengthID); // 사용자정의 마스크 정수최대길이
    jobjText.removeAttr(g_strUserDefineMaskCurrDecMaxLengthID); // 사용자정의 마스크 소수최대길이
    jobjText.removeAttr(g_strUserDefineMaskCurrMinusInputYnID); // 사용자정의 마스크 음수입력여부
    jobjText.removeAttr(g_strUserDefineMaskDateYmYnID); // 사용자정의 마스크 날짜 년월여부

    // 사용자정의속성 설정
    jobjText.attr(g_strUserDefineMaskMaskTypeID, g_strUserDefineMaskFixedMaskType); // 사용자정의 마스크 마스크유형
    jobjText.attr(g_strUserDefineMaskFormatTargetYnID, "Y"); // 사용자정의 마스크 포맷대상여부
    jobjText.attr(g_strUserDefineMaskMaskStrID, strMaskStr.toString()); // 사용자정의 마스크 마스크문자열

    // 속성 설정
    jobjText.attr("maxlength", null);

    // CSS 설정
    jobjText.css("ime-mode", "disabled"); // 한글입력을 제한한다.
    jobjText.css("text-align", "center");

    if ( !bPrevMaskTypeXstnYn )
    {
        // 이벤트 설정
        jobjText.keyup(function() { gfnKeyUpUserDefineMask(event); }); // 키업
        jobjText.keydown(function() { return gfnKeyDownUserDefineMask(event); }); // 키다운
        jobjText.bind("contextmenu", gfnContextMenuUserDefineMask); // 컨텍스트 메뉴
        jobjText.bind("dragstart"  , function() { return false ; }); // 선택된 텍스트의 드래그를 허용하지 않는다.
    }

    gfnReleaseFormatTargetYnUserDefineMask(jobjText, false); // 사용자정의 마스크 포맷대상여부 해제
}

//==============================================================================
// 용도     : 고정되지 않은 사용자정의 마스크 설정
// 문법     : gfnSetUnFixedUserDefineMask(jobjText As Object, strMaskStr As String)
// 파라미터 : 1. jobjText   - 텍스트 개체
//            2. strMaskStr - 마스크문자열 예제) "9999-9999-9999". 전화번호
// 예제     : 1. gfnSetUnFixedUserDefineMask($("#txtTel"), "9999-9999-9999");
//            2. gfnSetUnFixedUserDefineMask($("#txtTel"), "9999) 9999~9999");
// 리턴값   : 없음
// 참고사항 : 1. 한글은 입력할 수 없다.
//            2. 키다운 및 키업 이벤트를 사용한다.
//            3. 선택된 텍스트의 드래그는 사용할 수 없다.
//            4. 입력가능한 키는 gfnKeyDownUnFixedUserDefineMask() 를 참고한다.
//            5. 마스크는 숫자 및 몇몇 특수기호들만으로 구성한다.
//            6. 사용가능한 특수기호는 gfnGetSymbolKeyDownValUserDefineMask() 를 참고한다.
// 기타     : 개발자배포용
// 작성일자 : 2011-09-27
//------------------------------------------------------------------------------
function gfnSetUnFixedUserDefineMask(jobjText, strMaskStr)
{
    var strDeli = "|" ;
    var strPrevMaskType = jobjText.attr(g_strUserDefineMaskMaskTypeID);
    var bPrevMaskTypeXstnYn = ( ( strDeli + g_strUserDefineMaskCurrMaskType + strDeli + g_strUserDefineMaskDateMaskType + strDeli + g_strUserDefineMaskFixedMaskType + strDeli + g_strUserDefineMaskUnFixedMaskType + strDeli + g_strUserDefineMaskLimitedMaskType + strDeli ).indexOf(strDeli + strPrevMaskType + strDeli) >= 0 );

    strMaskStr = strMaskStr.toString().replace(/[^0-9)!@#$%^&*(+-./;=,`:<_>?~\[\\\]'{|}\" ]/g, "");

    // 사용자정의속성 제거
    jobjText.removeAttr(g_strUserDefineMaskIntMaxLengthID); // 사용자정의 마스크 정수최대길이
    jobjText.removeAttr(g_strUserDefineMaskCurrDecMaxLengthID); // 사용자정의 마스크 소수최대길이
    jobjText.removeAttr(g_strUserDefineMaskCurrMinusInputYnID); // 사용자정의 마스크 음수입력여부
    jobjText.removeAttr(g_strUserDefineMaskDateYmYnID); // 사용자정의 마스크 날짜 년월여부

    // 사용자정의속성 설정
    jobjText.attr(g_strUserDefineMaskMaskTypeID, g_strUserDefineMaskUnFixedMaskType); // 사용자정의 마스크 마스크유형
    jobjText.attr(g_strUserDefineMaskFormatTargetYnID, "Y"); // 사용자정의 마스크 포맷대상여부
    jobjText.attr(g_strUserDefineMaskMaskStrID, strMaskStr); // 사용자정의 마스크 마스크문자열

    // 속성 설정
    jobjText.attr("maxlength", null);

    // CSS 설정
    jobjText.css("ime-mode", "disabled"); // 한글입력을 제한한다.
    jobjText.css("text-align", "center");

    if ( !bPrevMaskTypeXstnYn )
    {
        // 이벤트 설정
        jobjText.keyup(function() { gfnKeyUpUserDefineMask(event); }); // 키업
        jobjText.keydown(function() { return gfnKeyDownUserDefineMask(event); }); // 키다운
        jobjText.bind("contextmenu", gfnContextMenuUserDefineMask); // 컨텍스트 메뉴
        jobjText.bind("dragstart"  , function() { return false ; }); // 선택된 텍스트의 드래그를 허용하지 않는다.
    }

    gfnReleaseFormatTargetYnUserDefineMask(jobjText, false); // 사용자정의 마스크 포맷대상여부 해제
}

//==============================================================================
// 용도     : 제한된 사용자정의 마스크 설정
// 문법     : gfnSetLimitedUserDefineMask(jobjText As Object, strMaskStr As String, strMaxLength As String)
// 파라미터 : 1. jobjText     - 텍스트 개체    (필수)
//            2. strMaskStr   - 마스크문자열   (필수) 예제) "abcdefghjijklmnopqrstuvwxyz0123456789@.-_". 전자우편
//            3. strMaxLength - 최대길이       (선택)
//            4. strTextAlign - 텍스트좌우정렬 (선택) 예제) "left", "center", "right"
// 예제     : 1. gfnSetLimitedUserDefineMask($("#txtEmail"), "abcdefghjijklmnopqrstuvwxyz0123456789@.-_");
//            2. gfnSetLimitedUserDefineMask($("#txtEmail"), "abcdefghjijklmnopqrstuvwxyz0123456789@.-_", "50");
// 리턴값   : 없음
// 참고사항 : 1. 한글은 입력할 수 없다.
//            2. 키프레스, 키다운 및 키업 이벤트를 사용한다.
//            3. 선택된 텍스트의 드래그는 사용할 수 없다.
//            4. 마스크는 한글을 제외한 문자들만으로 구성한다.
// 기타     : 개발자배포용
// 작성일자 : 2011-09-27
//------------------------------------------------------------------------------
function gfnSetLimitedUserDefineMask(jobjText, strMaskStr, strMaxLength, strTextAlign)
{
    if ( strMaxLength == null || strMaxLength.toString().length <= 0 ) strMaxLength = jobjText.attr("maxlength");
    if ( strMaxLength == null || strMaxLength.toString().length <= 0 ) strMaxLength = "-1" ;

    var strDeli = "|" ;
    var strPrevMaskType = jobjText.attr(g_strUserDefineMaskMaskTypeID);
    var bPrevMaskTypeXstnYn = ( ( strDeli + g_strUserDefineMaskCurrMaskType + strDeli + g_strUserDefineMaskDateMaskType + strDeli + g_strUserDefineMaskFixedMaskType + strDeli + g_strUserDefineMaskUnFixedMaskType + strDeli + g_strUserDefineMaskLimitedMaskType + strDeli ).indexOf(strDeli + strPrevMaskType + strDeli) >= 0 );

    // 사용자정의속성 제거
    jobjText.removeAttr(g_strUserDefineMaskCurrDecMaxLengthID); // 사용자정의 마스크 소수최대길이
    jobjText.removeAttr(g_strUserDefineMaskCurrMinusInputYnID); // 사용자정의 마스크 음수입력여부
    jobjText.removeAttr(g_strUserDefineMaskDateYmYnID); // 사용자정의 마스크 날짜 년월여부

    // 사용자정의속성 설정
    jobjText.attr(g_strUserDefineMaskMaskTypeID, g_strUserDefineMaskLimitedMaskType); // 사용자정의 마스크 마스크유형
    jobjText.attr(g_strUserDefineMaskFormatTargetYnID, "Y"); // 사용자정의 마스크 포맷대상여부
    jobjText.attr(g_strUserDefineMaskMaskStrID, strMaskStr); // 사용자정의 마스크 마스크문자열
    jobjText.attr(g_strUserDefineMaskIntMaxLengthID, strMaxLength.toString()); // 사용자정의 마스크 최대길이

    // 속성 설정
    jobjText.attr("maxlength", null);

    // CSS 설정
    jobjText.css("ime-mode", "disabled"); // 한글입력을 제한한다.
    if ( "|left|center|right|".indexOf("|" + strTextAlign + "|") >= 0 ) jobjText.css("text-align", strTextAlign)

    if ( !bPrevMaskTypeXstnYn )
    {
        // 이벤트 설정
        jobjText.keyup(function() { gfnKeyUpUserDefineMask(event); }); // 키업
        jobjText.keydown(function() { return gfnKeyDownUserDefineMask(event); }); // 키다운
        jobjText.keypress(function() { return gfnKeyPressUserDefineMask(event); }); // 키다운
        jobjText.bind("contextmenu", gfnContextMenuUserDefineMask); // 컨텍스트 메뉴
        jobjText.bind("dragstart"  , function() { return false ; }); // 선택된 텍스트의 드래그를 허용하지 않는다.
    }

    gfnReleaseFormatTargetYnUserDefineMask(jobjText, false); // 사용자정의 마스크 포맷대상여부 해제
}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 공통 관련
//==============================================================================

//==============================================================================
// 용도     : 사용자정의 마스크 키입력여부 가져오기
// 문법     : gfnGetKeyInputYnsUserDefineMask(objEvent As Object)
// 파라미터 : objEvent - 이벤트 개체
// 예제     : var arrKeyInputYns = gfnGetKeyInputYnsUserDefineMask(objEvent); // 사용자정의 마스크 키입력여부 가져오기
// 리턴값   : 없음
// 참고사항 : 키다운 이벤트 핸들러에서 사용가능하다.
// 기타     : 내부 호출용
// 작성일자 : 2011-09-06
//------------------------------------------------------------------------------
function gfnGetKeyInputYnsUserDefineMask(objEvent)
{
    var arrOutputs = new Array(); // 출력 변수 설정

    var strTempKeyCode = "|" + objEvent["keyCode"].toString() + "|" ;
    var bCtrlKey       = objEvent["ctrlKey"];
    var bAltKey        = objEvent["altKey"];
    var bShiftKey      = objEvent["shiftKey"];

    arrOutputs["ctrl"  ] = "|17|25|".indexOf(strTempKeyCode) >= 0 ; // Ctrl 키
    arrOutputs["tab"   ] =     "|9|".indexOf(strTempKeyCode) >= 0 && !bCtrlKey && !bAltKey ; // Tab 키
    arrOutputs["remove"] =  "|8|46|".indexOf(strTempKeyCode) >= 0 && !bCtrlKey && !bAltKey && !bShiftKey ; // 제거키
    arrOutputs["select"] =    "|65|".indexOf(strTempKeyCode) >= 0 &&  bCtrlKey && !bAltKey && !bShiftKey ; // Ctrl + A 키
    arrOutputs["cut"   ] =    "|88|".indexOf(strTempKeyCode) >= 0 &&  bCtrlKey && !bAltKey && !bShiftKey ; // Ctrl + X 키
    arrOutputs["copy"  ] =    "|67|".indexOf(strTempKeyCode) >= 0 &&  bCtrlKey && !bAltKey && !bShiftKey ; // Ctrl + C 키
    arrOutputs["paste" ] =    "|86|".indexOf(strTempKeyCode) >= 0 &&  bCtrlKey && !bAltKey && !bShiftKey ; // Ctrl + V 키
    arrOutputs["move"  ] = "|36|35|33|34|37|39|".indexOf(strTempKeyCode) >= 0 && !bAltKey ; // Home/End/PageUp/PageDown/좌/우 키

    arrOutputs["browserfunc"] = "|81|87|69|82|84|68|72|74|75|76|66|78|".indexOf(strTempKeyCode) >= 0 &&  bCtrlKey && !bAltKey && !bShiftKey ; // Ctrl + Q/W/E/R/T/D/H/J/K/L/B/N 키

    arrOutputs["number"] = "|48|49|50|51|52|53|54|55|56|57|96|97|98|99|100|101|102|103|104|105|".indexOf(strTempKeyCode) >= 0 && !bCtrlKey && !bAltKey && !bShiftKey ; // 숫자키
    arrOutputs["minus" ] = "|189|109|".indexOf(strTempKeyCode) >= 0 && !bCtrlKey && !bAltKey && !bShiftKey ; // - 키
    arrOutputs["plus"  ] =     "|107|".indexOf(strTempKeyCode) >= 0 && !bCtrlKey && !bAltKey && !bShiftKey ; // + 키
    arrOutputs["dot"   ] = "|190|110|".indexOf(strTempKeyCode) >= 0 && !bCtrlKey && !bAltKey && !bShiftKey ; // . 키

    return arrOutputs ; // 리턴 처리 - 출력 변수
}

//==============================================================================
// 용도     : 사용자정의 마스크 숫자키다운값 가져오기
// 문법     : gfnGetNumberKeyDownValUserDefineMask(nKeyCode As Integer, bShift As Boolean)
// 파라미터 : 1. nKeyCode - 키코드
//            2. bShift   - Shift 상태
// 예제     : gfnGetNumberKeyDownValUserDefineMask(objEvent["keyCode"], objEvent["shiftKey"]);
// 리턴값   : String
// 참고사항 : 키다운 이벤트 핸들러에서 사용가능하다.
// 기타     : 내부 호출용
// 작성일자 : 2011-09-16
//------------------------------------------------------------------------------
function gfnGetNumberKeyDownValUserDefineMask(nKeyCode, bShift)
{
    var strOutput = "" ; // 출력 변수 선언 및 설정

    if ( nKeyCode >= 48 && nKeyCode <= 57  && bShift != true ) strOutput = String.fromCharCode(nKeyCode);
    if ( nKeyCode >= 96 && nKeyCode <= 105 && bShift != true ) strOutput = ( nKeyCode - 96 ).toString();

    return strOutput ; // 리턴 처리 - 출력 변수
}

//==============================================================================
// 용도     : 사용자정의 마스크 특수기호키다운값 가져오기
// 문법     : gfnGetSymbolKeyDownValUserDefineMask(nKeyCode As Integer, bShift As Boolean)
// 파라미터 : 1. nKeyCode - 키코드
//            2. bShift   - Shift 상태
// 예제     : gfnGetSymbolKeyDownValUserDefineMask(objEvent["keyCode"], objEvent["shiftKey"]);
// 리턴값   : String
// 참고사항 : 1. 키다운 이벤트 핸들러에서 사용가능하다.
//            2. 몇몇 특수기호들만 가져올 수 있다.
//               ex.) ) ! @ # $ % ^ & * ( + - . / ; = , ` : < _ > ? ~ [ \ ] ' { | } " Space
// 기타     : 내부 호출용
// 작성일자 : 2011-09-16
//------------------------------------------------------------------------------
function gfnGetSymbolKeyDownValUserDefineMask(nKeyCode, bShift)
{
    var strOutput = "" ; // 출력 변수 선언 및 설정

    if ( nKeyCode == 32 && bShift != true ) strOutput = " " ;

    if ( nKeyCode >= 48 && nKeyCode <= 57  && bShift == true ) strOutput = ")|!|@|#|$|%|^|&|*|(".split("|")[nKeyCode - 48];

    if ( nKeyCode == 106 && bShift != true ) strOutput = "*" ;
    if ( nKeyCode == 107 && bShift != true ) strOutput = "+" ;

    if ( nKeyCode >= 109 && nKeyCode <= 111 && bShift != true ) strOutput = "-|.|/".split("|")[nKeyCode - 109];;

    if ( nKeyCode >= 186 && nKeyCode <= 192 && bShift != true ) strOutput = ";|=|,|-|.|/|`".split("|")[nKeyCode - 186];
    if ( nKeyCode >= 186 && nKeyCode <= 192 && bShift == true ) strOutput = ":|+|<|_|>|?|~".split("|")[nKeyCode - 186];
    if ( nKeyCode >= 219 && nKeyCode <= 222 && bShift != true ) strOutput = "[|\\|]|'".split("|")[nKeyCode - 219];
    if ( nKeyCode >= 219 && nKeyCode <= 222 && bShift == true ) strOutput = "{^|^}^\"".split("^")[nKeyCode - 219];

    return strOutput ; // 리턴 처리 - 출력 변수
}

//==============================================================================
// 용도     : 사용자정의 마스크 키프레스값 가져오기
// 문법     : gfnGetKeyPressValUserDefineMask(nKeyCode As Integer)
// 파라미터 : nKeyCode - 키코드
// 예제     : $("#txtLimited").keydown(gfnGetKeyPressValUserDefineMask); // 키다운
// 리턴값   : 키프레스 이벤트 핸들러에서 사용가능하다.
// 참고사항 : 없음
// 기타     : 내부 호출용
// 작성일자 : 2011-09-20
//------------------------------------------------------------------------------
function gfnGetKeyPressValUserDefineMask(nKeyCode)
{
    var strOutput = "" ; // 출력 변수 선언 및 설정

    strOutput = String.fromCharCode(nKeyCode);

    return strOutput ; // 리턴 처리 - 출력 변수
}

//==============================================================================
// 용도     : 사용자정의 마스크 값 설정
// 문법     : gfnSetValUserDefineMask(jobjText As Object, strVal AS String, bChangeCursor As Boolean)
// 파라미터 : 1. jobjText      - 텍스트 개체 (필수)
//            2. strVal        - 값          (필수)
//            3. bChangeCursor - 커서변경    (선택) 참고) 미입력시 true 입력과 동일
// 예제     : gfnSetValUserDefineMask($("#txtDate"), "2011-01-01");
// 리턴값   : 없음
// 참고사항 : 해당 텍스트 항목에 값을 설정한 후 커서위치를 제일 오른쪽으로 위치시킨다.
// 기타     : 내부 호출용
// 작성일자 : 2011-09-08
//------------------------------------------------------------------------------
function gfnSetValUserDefineMask(jobjText, strVal, bChangeCursor)
{
    if ( bChangeCursor == null ) bChangeCursor = true ;

    jobjText.val(strVal); // 값 설정

    if ( bChangeCursor == true )
    {
        // 커서 위치를 마지막으로 변경한다.
        var objTextRange = jobjText.get(0).createTextRange();

        var nLength = jobjText.val().toString().length ;

        objTextRange.collapse(true);
        objTextRange.moveEnd("character", nLength);
        objTextRange.moveStart("character", nLength);

        objTextRange.select(); // 선택
    }
}

//==============================================================================
// 용도     : 사용자정의 마스크 키업
// 문법     : gfnKeyUpUserDefineMask(objEvent As Object)
// 파라미터 : objEvent - 이벤트 개체
// 예제     : $("#txt").keyup(gfnKeyUpUserDefineMask); // 키업
// 리턴값   : 없음
// 참고사항 : 사용자정의 마스크 포맷대상여부 값에 따라 포맷을 재적용한다.
// 기타     : 내부 호출용
// 작성일자 : 2011-09-27
//------------------------------------------------------------------------------
function gfnKeyUpUserDefineMask(objEvent)
{
    var strMaskType = $(objEvent["srcElement"]).attr(g_strUserDefineMaskMaskTypeID); // 사용자정의 마스크 마스크유형

    if ( strMaskType == g_strUserDefineMaskCurrMaskType )
        gfnKeyUpCurrUserDefineMask(objEvent);
    else
    if ( strMaskType == g_strUserDefineMaskDateMaskType )
        gfnKeyUpDateUserDefineMask(objEvent);
    else
    if ( strMaskType == g_strUserDefineMaskFixedMaskType )
        gfnKeyUpFixedUserDefineMask(objEvent);
    else
    if ( strMaskType == g_strUserDefineMaskUnFixedMaskType )
        gfnKeyUpUnFixedUserDefineMask(objEvent);
    else
    if ( strMaskType == g_strUserDefineMaskLimitedMaskType )
        gfnKeyUpLimitedUserDefineMask(objEvent);
}

//==============================================================================
// 용도     : 사용자정의 마스크 키다운
// 문법     : gfnKeyDownUserDefineMask(objEvent As Object)
// 파라미터 : objEvent - 이벤트 개체
// 예제     : $("#txt").keydown(gfnKeyDownUserDefineMask); // 키다운
// 리턴값   : 없음
// 참고사항 : 키입력시 포맷을 적용한다.
// 기타     : 내부 호출용
// 작성일자 : 2011-09-27
//------------------------------------------------------------------------------
function gfnKeyDownUserDefineMask(objEvent)
{
    var strMaskType = $(objEvent["srcElement"]).attr(g_strUserDefineMaskMaskTypeID); // 사용자정의 마스크 마스크유형

    if ( strMaskType == g_strUserDefineMaskCurrMaskType )
        return gfnKeyDownCurrUserDefineMask(objEvent);
    else
    if ( strMaskType == g_strUserDefineMaskDateMaskType )
        return gfnKeyDownDateUserDefineMask(objEvent);
    else
    if ( strMaskType == g_strUserDefineMaskFixedMaskType )
        return gfnKeyDownFixedUserDefineMask(objEvent);
    else
    if ( strMaskType == g_strUserDefineMaskUnFixedMaskType )
        return gfnKeyDownUnFixedUserDefineMask(objEvent);
    else
    if ( strMaskType == g_strUserDefineMaskLimitedMaskType )
        return gfnKeyDownLimitedUserDefineMask(objEvent);
    else
        return true ;
}

//==============================================================================
// 용도     : 사용자정의 마스크 키프레스
// 문법     : gfnKeyPressUserDefineMask(objEvent As Object)
// 파라미터 : objEvent - 이벤트 개체
// 예제     : $("#txt").keypress(gfnKeyPressUserDefineMask); // 키프레스
// 리턴값   : 없음
// 참고사항 : 마스크에 정의한 경우 문자만 입력할 수 있다.
// 기타     : 내부 호출용
// 작성일자 : 2011-09-27
//------------------------------------------------------------------------------
function gfnKeyPressUserDefineMask(objEvent)
{
    var strMaskType = $(objEvent["srcElement"]).attr(g_strUserDefineMaskMaskTypeID); // 사용자정의 마스크 마스크유형

    if ( strMaskType == g_strUserDefineMaskLimitedMaskType )
        return gfnKeyPressLimitedUserDefineMask(objEvent);
    else
        return true ;
}

//==============================================================================
// 용도     : 사용자정의 마스크 포맷대상여부 해제
// 문법     : gfnReleaseFormatTargetYnUserDefineMask(jobjText As Object, bChangeCursor As Boolean)
// 파라미터 : 1. jobjText      - 텍스트 개체 (필수)
//            2. bChangeCursor - 커서변경    (선택) 참고) 미입력시 true 입력과 동일
// 예제     : gfnReleaseFormatTargetYnUserDefineMask($("#txtCurr"));
// 리턴값   : 없음
// 참고사항 : 없음
// 기타     : 내부 호출용
// 작성일자 : 2011-09-27
//------------------------------------------------------------------------------
function gfnReleaseFormatTargetYnUserDefineMask(jobjText, bChangeCursor)
{
    var strMaskType = jobjText.attr(g_strUserDefineMaskMaskTypeID); // 사용자정의 마스크 마스크유형

    if ( strMaskType == g_strUserDefineMaskCurrMaskType )
        gfnReleaseFormatTargetYnCurrUserDefineMask(jobjText, bChangeCursor);
    else
    if ( strMaskType == g_strUserDefineMaskDateMaskType )
        gfnReleaseFormatTargetYnDateUserDefineMask(jobjText, bChangeCursor);
    else
    if ( strMaskType == g_strUserDefineMaskFixedMaskType )
        gfnReleaseFormatTargetYnFixedUserDefineMask(jobjText, bChangeCursor);
    else
    if ( strMaskType == g_strUserDefineMaskUnFixedMaskType )
        gfnReleaseFormatTargetYnUnFixedUserDefineMask(jobjText, bChangeCursor);
    else
    if ( strMaskType == g_strUserDefineMaskLimitedMaskType )
        gfnReleaseFormatTargetYnLimitedUserDefineMask(jobjText, bChangeCursor);
}

//==============================================================================
// 용도     : 사용자정의 마스크 컨텍스트메뉴
// 문법     : gfnContextMenuUserDefineMask(objEvent As Object)
// 파라미터 : objEvent - 이벤트 개체
// 예제     : $("#txt").bind("contextmenu", gfnContextMenuUserDefineMask); // 컨텍스트 메뉴
// 리턴값   : 없음
// 참고사항 : 없음
// 기타     : 내부 호출용
// 작성일자 : 2011-09-27
//------------------------------------------------------------------------------
function gfnContextMenuUserDefineMask(objEvent)
{
    gfnShowUserDefineMaskContextMenu(objEvent); // 사용자정의 마스크 컨텍스트 메뉴 보여주기

    return false ;
}

//==============================================================================
// 용도     : 사용자정의 마스크 잘라내기 클릭
// 문법     : gfnClickCutUserDefineMask()
// 파라미터 : 없음
// 예제     : gfnClickCutUserDefineMask(); // 사용자정의 마스크 잘라내기 클릭
// 리턴값   : 없음
// 참고사항 : 없음
// 기타     : 내부 호출용
// 작성일자 : 2011-09-27
//------------------------------------------------------------------------------
function gfnClickCutUserDefineMask()
{
    var objTextRange;
    var strSelectedText;

    if ( document.selection )
    {
        objTextRange = document.selection.createRange();
        strSelectedText = objTextRange.text ;
    }
    else
    if ( event.srcElement.createTextRange() )
    {
        objTextRange = event.srcElement.createTextRange();
        strSelectedText = $(event.srcElement).val().substring($(event.srcElement)[0].selectionStart, $(event.srcElement)[0].selectionEnd);
    }

    var objElement = $(objTextRange.parentElement());

    if ( objElement.attr(g_strUserDefineMaskMaskTypeID) != null && objElement.attr(g_strUserDefineMaskMaskTypeID).length > 0 )
    {
        if ( strSelectedText != null && strSelectedText.length > 0 )
        {
            var jobjText = $(objTextRange.parentElement());

            objTextRange.execCommand("Cut");

            jobjText.attr(g_strUserDefineMaskFormatTargetYnID, "Y"); // 사용자정의 마스크 포맷대상여부
            gfnReleaseFormatTargetYnUserDefineMask(jobjText, true); // 사용자정의 마스크 포맷대상여부 해제
            jobjText.keyup(); // 키업
        }
    }
}

//==============================================================================
// 용도     : 사용자정의 마스크 복사 클릭
// 문법     : gfnClickCopyUserDefineMask()
// 파라미터 : 없음
// 예제     : gfnClickCopyUserDefineMask(); // 사용자정의 마스크 복사 클릭
// 리턴값   : 없음
// 참고사항 : 없음
// 기타     : 내부 호출용
// 작성일자 : 2011-09-27
//------------------------------------------------------------------------------
function gfnClickCopyUserDefineMask()
{
    var objTextRange = document.selection.createRange();
    var objElement = objTextRange.parentElement();
    if ( objElement[g_strUserDefineMaskMaskTypeID] != null && objElement[g_strUserDefineMaskMaskTypeID].length > 0 )
    {
        var strSelectedText = objTextRange.text ;
        if ( strSelectedText != null && strSelectedText.length > 0 ) objTextRange.execCommand("Copy");
    }
}

//==============================================================================
// 용도     : 사용자정의 마스크 붙여넣기 클릭
// 문법     : gfnClickPasteUserDefineMask()
// 파라미터 : 없음
// 예제     : gfnClickPasteUserDefineMask(); // 사용자정의 마스크 붙여넣기 클릭
// 리턴값   : 없음
// 참고사항 : 없음
// 기타     : 내부 호출용
// 작성일자 : 2011-09-27
//------------------------------------------------------------------------------
function gfnClickPasteUserDefineMask()
{
    var objTextRange = document.selection.createRange();
    var objElement = objTextRange.parentElement();
    if ( objElement[g_strUserDefineMaskMaskTypeID] != null && objElement[g_strUserDefineMaskMaskTypeID].length > 0 )
    {
        var strClipBoardData = window.clipboardData.getData("text");
        if ( strClipBoardData != null && strClipBoardData.length > 0 )
        {
            objTextRange.execCommand("Paste");

            var jobjText = $(objTextRange.parentElement());
            jobjText.attr(g_strUserDefineMaskFormatTargetYnID, "Y"); // 사용자정의 마스크 포맷대상여부
            gfnReleaseFormatTargetYnUserDefineMask(jobjText, true); // 사용자정의 마스크 포맷대상여부 해제
            jobjText.keyup(); // 키업
        }
    }
}

//==============================================================================
// 용도     : 사용자정의 마스크 삭제 클릭
// 문법     : gfnClickDeleteUserDefineMask()
// 파라미터 : 없음
// 예제     : gfnClickDeleteUserDefineMask(); // 사용자정의 마스크 삭제 클릭
// 리턴값   : 없음
// 참고사항 : 없음
// 기타     : 내부 호출용
// 작성일자 : 2011-09-27
//------------------------------------------------------------------------------
function gfnClickDeleteUserDefineMask()
{
    var objTextRange = document.selection.createRange();
    var objElement = objTextRange.parentElement();
    if ( objElement[g_strUserDefineMaskMaskTypeID] != null && objElement[g_strUserDefineMaskMaskTypeID].length > 0 )
    {
        var strSelectedText = objTextRange.text ;
        if ( strSelectedText != null && strSelectedText.length > 0 )
        {
            objTextRange.execCommand("Delete");

            var jobjText = $(objTextRange.parentElement());
            jobjText.attr(g_strUserDefineMaskFormatTargetYnID, "Y"); // 사용자정의 마스크 포맷대상여부
            gfnReleaseFormatTargetYnUserDefineMask(jobjText, true); // 사용자정의 마스크 포맷대상여부 해제
            jobjText.keyup(); // 키업
        }
    }
}

//==============================================================================
// 용도     : 사용자정의 마스크 모두 선택 클릭
// 문법     : gfnClickSelectAllUserDefineMask()
// 파라미터 : 없음
// 예제     : gfnClickSelectAllUserDefineMask(); // 사용자정의 마스크 모두 선택 클릭
// 리턴값   : 없음
// 참고사항 : 없음
// 기타     : 내부 호출용
// 작성일자 : 2011-09-27
//------------------------------------------------------------------------------
function gfnClickSelectAllUserDefineMask()
{
    var strTargetObjID = $("#" + g_strUserDefineMaskTargetObjID).val();
    if ( strTargetObjID != null && strTargetObjID.length > 0 ) $("#" + strTargetObjID).select();
}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 통화 관련
//==============================================================================

//==============================================================================
// 용도     : 통화 사용자정의 마스크 키업
// 문법     : gfnKeyUpCurrUserDefineMask(objEvent As Object)
// 파라미터 : objEvent - 이벤트 개체
// 예제     : $("#txtCurr").keyup(gfnKeyUpCurrUserDefineMask); // 키업
// 리턴값   : 없음
// 참고사항 : 사용자정의 마스크 포맷대상여부 값에 따라 포맷을 재적용한다.
// 기타     : 내부 호출용
// 작성일자 : 2011-09-06
//------------------------------------------------------------------------------
function gfnKeyUpCurrUserDefineMask(objEvent)
{
    gfnReleaseFormatTargetYnCurrUserDefineMask($(event.srcElement)); // 사용자정의 마스크 통화 포맷대상여부 해제
}

//==============================================================================
// 용도     : 통화 사용자정의 마스크 키다운
// 문법     : gfnKeyDownCurrUserDefineMask(objEvent As Object)
// 파라미터 : objEvent - 이벤트 개체
// 예제     : $("#txtCurr").keydown(gfnKeyDownCurrUserDefineMask); // 키다운
// 리턴값   : 없음
// 참고사항 : 1. 키입력시 포맷을 적용한다.
//            2. 숫자 및 몇몇 단축키와 특수기호를 입력할 수 있다.
//               ex.) Ctrl Tab BackSpace Del Ctrl+A Ctrl+X Ctrl+C Ctrl+V Home/End/PageUp/PageDown/좌/우
//                    Ctrl+Q Ctrl+W Ctrl+E Ctrl+R Ctrl+T Ctrl+D Ctrl+H Ctrl+J Ctrl+K Ctrl+L Ctrl+B Ctrl+N
//                    1 2 3 4 5 6 7 8 9 0
//                    + - .
// 기타     : 내부 호출용
// 작성일자 : 2011-09-06
//------------------------------------------------------------------------------
function gfnKeyDownCurrUserDefineMask(objEvent)
{
    // 변수 선언 및 설정
    var bOutput = false ; // 출력

    var jobjText = $(event.srcElement);
    //if ( jobjText.attr("readonly") == true ) return ( objEvent["keyCode"] != 8 ); // 읽기전용인 경우.. // 8. BackSpace
    if ( jobjText.prop("readOnly") ) return ( objEvent["keyCode"] != 8 ); // 읽기전용인 경우..

    // 키입력여부
    var arrKeyInputYns = gfnGetKeyInputYnsUserDefineMask(objEvent); // 사용자정의 마스크 키입력여부 가져오기

    var bCtrlKey   = arrKeyInputYns["ctrl"  ];
    var bTabKey    = arrKeyInputYns["tab"   ];
    var bRemoveKey = arrKeyInputYns["remove"];
    var bSelectKey = arrKeyInputYns["select"];
    var bCutKey    = arrKeyInputYns["cut"   ];
    var bCopyKey   = arrKeyInputYns["copy"  ];
    var bPasteKey  = arrKeyInputYns["paste" ];
    var bMoveKey   = arrKeyInputYns["move"  ];

    var bBrowserFunc = arrKeyInputYns["browserfunc"];

    var bNumberKey = arrKeyInputYns["number"];
    var bPlusKey   = arrKeyInputYns["plus"  ];
    var bMinusKey  = arrKeyInputYns["minus" ];
    var bDotKey    = arrKeyInputYns["dot"   ];

    // 숫자키값
    var strNumberKeyVal = gfnGetNumberKeyDownValUserDefineMask(objEvent["keyCode"], objEvent["shiftKey"]); // 사용자정의 마스크 키값 가져오기

    var strSelectedText; // 선택된 텍스트

    if ( document.selection )
        strSelectedText = document.selection.createRange().text ;
    else
    if ( window.getSelection )
    {
        strSelectedText = jobjText.val().substring(jobjText[0].selectionStart, jobjText[0].selectionEnd);
    }

    // 선택된 텍스트유무에 따라 처리한다.
    if ( strSelectedText.length > 0 ) // 선택된 텍스트가 있을 경우..
    {
        // 1. 잘라내기/붙여넣기/삭제를 처리한다.
        if ( bCutKey )
            {}//gfnClickCutUserDefineMask(); // 사용자정의 마스크 잘라내기 클릭
        else
        if ( bPasteKey )
            gfnClickPasteUserDefineMask(); // 사용자정의 마스크 붙여넣기 클릭
        else
        if ( bRemoveKey )
            gfnClickDeleteUserDefineMask(); // 사용자정의 마스크 삭제 클릭

        // 2. KeyUp 이벤트에서 포맷을 재적용시킬지 설정한다.
        if ( bNumberKey ) jobjText.attr(g_strUserDefineMaskFormatTargetYnID, "Y");

        // 3. 출력여부를 설정한다.
        if ( bCtrlKey || bTabKey || bSelectKey || bCopyKey || bMoveKey || bBrowserFunc ||
             bNumberKey
           ) bOutput = true ;
    }
    else
    {
        // 1. 잘라내기/붙여넣기/삭제를 처리한다.
        if ( bPasteKey ) gfnClickPasteUserDefineMask(); // 사용자정의 마스크 붙여넣기 클릭

        // 2. KeyUp 이벤트에서 포맷을 재적용시킬지 설정한다.

        // 3. 출력여부를 설정한다.
        if ( bTabKey || bSelectKey || bMoveKey || bBrowserFunc ) bOutput = true ;

        // 4. 값을 설정한다.
        {
            // 변수 선언 및 설정
            var strPrevVal = jobjText.val(); // 이전 값

            var bMinusVal = strPrevVal.indexOf("-") == 0 ; // 음수값
            var bDecVal   = strPrevVal.indexOf(".") >  0 ; // 소수값

            var nIntValLength = gfnGetCurrIntValLengthUserDefineMask(jobjText); // 정수값 길이
            var nDecValLength = gfnGetCurrDecValLengthUserDefineMask(jobjText); // 소수값 길이

            var nIntMaxLength = parseInt(jobjText.attr(g_strUserDefineMaskIntMaxLengthID), 10); // 정수최대길이
            var nDecMaxLength = parseInt(jobjText.attr(g_strUserDefineMaskCurrDecMaxLengthID), 10); // 소수최대길이
            var bMinusInputYn = ( jobjText.attr(g_strUserDefineMaskCurrMinusInputYnID) == "Y" ); // 음수입력여부

            if ( bRemoveKey == true )
            {
                if ( nIntValLength == 1 && nDecValLength == 0 ) // 한자리 정수만 존재하는 경우 모두 제거
                    gfnSetValUserDefineMask(jobjText, ""); // 사용자정의 마스크 값 설정
                else
                    gfnSetValUserDefineMask(jobjText, gfnFormatCurrUserDefineMask(strPrevVal.substr(0, strPrevVal.length - 1), nIntMaxLength, nDecMaxLength)); // 사용자정의 마스크 값 설정
            }
            else
            if ( bNumberKey == true )
            {
                // 숫자 출력여부를 설정한다.
                if ( ( bDecVal != true && nIntValLength < nIntMaxLength )
                     ||
                     ( bDecVal == true && nDecValLength < nDecMaxLength )
                   ) // 최대길이 체크
                {
                    gfnSetValUserDefineMask(jobjText, gfnFormatCurrUserDefineMask(strPrevVal + strNumberKeyVal, nIntMaxLength, nDecMaxLength)); // 사용자정의 마스크 값 설정
                }
            }
            else
            if ( bPlusKey == true ) // + 입력시..
            {
                if ( bMinusVal == true ) gfnSetValUserDefineMask(jobjText, strPrevVal.replace(/-/, "")); // 사용자정의 마스크 값 설정
            }
            else
            if ( bMinusKey == true ) // - 입력시..
            {
                if ( bMinusVal != true )
                {
                    if ( bMinusInputYn == true )
                    {
                        if ( strPrevVal.length <= 0 ) // 입력값이 존재하지 않는 경우..
                            gfnSetValUserDefineMask(jobjText, "-0"); // 사용자정의 마스크 값 설정
                        else
                            gfnSetValUserDefineMask(jobjText, "-" + strPrevVal); // 사용자정의 마스크 값 설정
                    }
                }
            }
            else
            if ( bDotKey == true ) // . 입력시..
            {
                if ( nDecMaxLength > 0 )
                {
                    if ( strPrevVal.length <= 0 ) // 입력값이 존재하지 않는 경우..
                        gfnSetValUserDefineMask(jobjText, "0."); // 사용자정의 마스크 값 설정
                    else
                    if ( bDecVal != true && nDecMaxLength > 0 )
                        gfnSetValUserDefineMask(jobjText, strPrevVal + "."); // 사용자정의 마스크 값 설정
                }
            }
        }
    }

    return bOutput ; // 리턴 처리 - 출력 변수
}

//==============================================================================
// 용도     : 사용자정의 마스크 통화 포맷
// 문법     : gfnFormatCurrUserDefineMask(strInputVal As String, nIntMaxLength As Integer, nDecMaxLength As Integer)
// 파라미터 : 1. strInputVal   - 입력값       (필수)
//            2. nIntMaxLength - 정수최대길이 (선택) 참고) 미입력시 15 입력과 동일
//            3. nDecMaxLength - 소수최대길이 (선택) 참고) 미입력시 4 입력과 동일
// 예제     : 1. gfnFormatCurrUserDefineMask(null); // null
//            2. gfnFormatCurrUserDefineMask(""); // ""
//            3. gfnFormatCurrUserDefineMask("-"); // "0"
//            4. gfnFormatCurrUserDefineMask("--"); // "0"
//            5. gfnFormatCurrUserDefineMask("."); // "0"
//            6. gfnFormatCurrUserDefineMask("-0"); // "0"
//            7. gfnFormatCurrUserDefineMask("-."); // "0"
//            8. gfnFormatCurrUserDefineMask("abc"); // "0"
//            9. gfnFormatCurrUserDefineMask("-.123"); // "-0.123"
//            10. gfnFormatCurrUserDefineMask("-1234.1234"); // "-1,234.1234"
//            11. gfnFormatCurrUserDefineMask("--12a34.12.34"); // "-1,234.1234"
//            12. gfnFormatCurrUserDefineMask("--12a34.12.3400"); // "-1,234.123400"
//            13. gfnFormatCurrUserDefineMask("-123456789", 10, 4); // "-123,456,789"
//            14. gfnFormatCurrUserDefineMask("-12345678901", 10, 4); // "-1,234,567,890.1"
//            15. gfnFormatCurrUserDefineMask("-12345678901.12345", 10, 4); // "-1,234,567,890.1123"
//            16. gfnFormatCurrUserDefineMask("88888888888888888888888888888888", 10, 4); // 8,888,888,888
// 리턴값   : String
// 참고사항 : 없음
// 기타     : 내부 호출용
// 작성일자 : 2011-09-06
//------------------------------------------------------------------------------
function gfnFormatCurrUserDefineMask(strInputVal, nIntMaxLength, nDecMaxLength)
{
    if ( nIntMaxLength == null ) nIntMaxLength = 15 ;
    if ( nDecMaxLength == null ) nDecMaxLength = 4  ;

    // 출력 변수 선언 및 설정
    var strOutput = null ;

    if ( strInputVal != null ) // 데이터가 존재하는 경우
    {
        var strOutput = strInputVal.toString();

        if ( strOutput.length > 0 )
        {
            var strUnFormatted = gfnUnFormatCurrUserDefineMask(strInputVal);
            var bDecVal = ( strUnFormatted.indexOf(".") > 0 );

            // 정수부 최대길이 처리
            if ( nIntMaxLength > 0 )
            {
                var strTemp = strUnFormatted ;

                var bMinus = ( strTemp.indexOf("-") == 0 );
                if ( bMinus == true ) strTemp = strTemp.substr(1);

                var arrTemp = strTemp.split(".");
                if ( arrTemp[0].length > nIntMaxLength )
                {
                    if ( arrTemp[1] == null ) arrTemp[1] = "" ;
                    arrTemp[1] = arrTemp[0].substr(nIntMaxLength, arrTemp[0].length - nIntMaxLength) + arrTemp[1];
                    arrTemp[0] = arrTemp[0].substr(0, nIntMaxLength);
                    strUnFormatted = ( bMinus == true ? "-" : "" ) + arrTemp.join(".");
                }
            }

            // 소수부 최대길이 처리
            if ( nDecMaxLength >= 0 )
            {
                var strTemp = strUnFormatted ;

                var bMinus = ( strTemp.indexOf("-") == 0 );
                if ( bMinus == true ) strTemp = strTemp.substr(1);

                var arrTemp = strTemp.split(".");
                if ( arrTemp[1] == null ) arrTemp[1] = "" ;
                if ( arrTemp[1].length > nDecMaxLength )
                {
                    arrTemp[1] = arrTemp[1].substr(0, nDecMaxLength);
                    strUnFormatted = ( bMinus == true ? "-" : "" ) + arrTemp.join(".");
                }
            }

            // 정수부에 , 를 추가
            strOutput = Number(strUnFormatted.split(".")[0] + ".1").toLocaleString().split(".")[0];

            // 소수점이 존재하는 경우..
            if ( bDecVal ) strOutput += "." + strUnFormatted.split(".")[1];
        }
    }

    return strOutput ; // 리턴 처리 - 출력 변수
}

//==============================================================================
// 용도     : 사용자정의 마스크 통화 포맷 해제
// 문법     : gfnUnFormatCurrUserDefineMask(strInputVal As String)
// 파라미터 : strInputVal - 입력값
// 예제     : 1. gfnUnFormatCurrUserDefineMask("-1,000.26"); // "-1000.26"
//            2. gfnUnFormatCurrUserDefineMask("-1,000.26"); // "-1000.26"
//            3. gfnUnFormatCurrUserDefineMask(null); // "0"
//            4. gfnUnFormatCurrUserDefineMask(""); // "0"
//            5. gfnUnFormatCurrUserDefineMask("-"); // "0"
//            6. gfnUnFormatCurrUserDefineMask("--"); // "0"
//            7. gfnUnFormatCurrUserDefineMask("."); // "0"
//            8. gfnUnFormatCurrUserDefineMask("-0"); // "0"
//            9. gfnUnFormatCurrUserDefineMask("-."); // "0"
//            10. gfnUnFormatCurrUserDefineMask("-.123"); // "-0.123"
//            11. gfnUnFormatCurrUserDefineMask("--12a34.12.34"); // "-1234.1234"
//            12. gfnUnFormatCurrUserDefineMask("--12a34.12.3400"); // "-1234.123400"
// 리턴값   : String
// 참고사항 : 없음
// 기타     : 내부 호출용
// 작성일자 : 2011-09-06
//------------------------------------------------------------------------------
function gfnUnFormatCurrUserDefineMask(strInputVal)
{
    var strOutput = "0" ; // 출력 변수 선언 및 설정

    if ( strInputVal != null && strInputVal.toString().length > 0 ) // 데이터가 존재하는 경우
    {
        var strFormatted = strInputVal.toString();
        var bMinus = strFormatted.indexOf("-") == 0 ; // 음수

        strFormatted = strFormatted.replace(/[^0-9\.]/g, ""); // 숫자, . 을 제외한 모든 문자 제거

        // 맨 앞 . 을 제외하고 모두 제거
        if ( strFormatted.indexOf(".") != strFormatted.lastIndexOf(".") )
        {
            var arrFormatted = strFormatted.split(".");

            strFormatted = arrFormatted[0];
            arrFormatted[0] = "" ;

            strFormatted += "." + arrFormatted.join("");
        }

        if ( strFormatted.length > 0 )
        {
            strOutput = ( bMinus == true ? "-" : "" ) + ( strFormatted.indexOf(".") == 0 ? "0" : "" ) + strFormatted ;

            // 마지막에 . 이 존재하면 제거
            var nLength = strOutput.length ;
            if ( strOutput.lastIndexOf(".") == ( nLength - 1 ) ) strOutput = strOutput.substr(0, nLength - 1);

            if ( strOutput == "-0") strOutput = "0" ;
        }
    }

    return strOutput ; // 리턴 처리 - 출력 변수
}

//==============================================================================
// 용도     : 사용자정의 마스크 통화 정수값길이 가져오기
// 문법     : gfnGetCurrIntValLengthUserDefineMask(jobjText As Object)
// 파라미터 : jobjText - 텍스트 개체
// 예제     : gfnGetCurrIntValLengthUserDefineMask($("#txtCurr"));
// 리턴값   : Integer
// 참고사항 : 없음
// 기타     : 내부 호출용
// 작성일자 : 2011-09-06
//------------------------------------------------------------------------------
function gfnGetCurrIntValLengthUserDefineMask(jobjText)
{
    // 변수 선언 및 설정
    var nOutput = 0 ;

    var strFormattedVal   = jobjText.val();
    var strUnFormattedVal = gfnUnFormatCurrUserDefineMask(strFormattedVal); // 포맷해제된 값

    if ( strUnFormattedVal.indexOf("-") == 0 ) strUnFormattedVal = strUnFormattedVal.substr(1); // - 제거

    // 입력값이 존재하는 경우..
    if ( strFormattedVal.length > 0 && strUnFormattedVal.length > 0 ) nOutput = strUnFormattedVal.split(".")[0].length ;

    return nOutput ; // 리턴 처리 - 출력 변수
}

//==============================================================================
// 용도     : 사용자정의 마스크 통화 소수값길이 가져오기
// 문법     : gfnGetCurrDecValLengthUserDefineMask(jobjText As Object)
// 파라미터 : jobjText - 텍스트 개체
// 예제     : gfnGetCurrDecValLengthUserDefineMask($("#txtCurr"));
// 리턴값   : Integer
// 참고사항 : 없음
// 기타     : 내부 호출용
// 작성일자 : 2011-09-06
//------------------------------------------------------------------------------
function gfnGetCurrDecValLengthUserDefineMask(jobjText)
{
    // 변수 선언 및 설정
    var nOutput = 0 ;

    var strUnFormattedVal = gfnUnFormatCurrUserDefineMask(jobjText.val()); // 포맷해제된 값
    if ( strUnFormattedVal.indexOf("-") == 0 ) strUnFormattedVal = strUnFormattedVal.substr(1); // - 제거

    if ( strUnFormattedVal.length > 0 ) // 입력값이 존재하는 경우..
    {
        var arrUnFormattedVals = strUnFormattedVal.split(".");

        if ( arrUnFormattedVals.length != 1 ) nOutput = arrUnFormattedVals[1].length ;
    }

    return nOutput ; // 리턴 처리 - 출력 변수
}

//==============================================================================
// 용도     : 사용자정의 마스크 통화 포맷대상여부 해제
// 문법     : gfnReleaseFormatTargetYnCurrUserDefineMask(jobjText As Object, bChangeCursor As Boolean)
// 파라미터 : 1. jobjText      - 텍스트 개체 (필수)
//            2. bChangeCursor - 커서변경    (선택) 참고) 미입력시 true 입력과 동일
// 예제     : gfnReleaseFormatTargetYnCurrUserDefineMask($("#txtCurr"));
// 리턴값   : 없음
// 참고사항 : 없음
// 기타     : 내부 호출용
// 작성일자 : 2011-09-06
//------------------------------------------------------------------------------
function gfnReleaseFormatTargetYnCurrUserDefineMask(jobjText, bChangeCursor)
{
    if ( bChangeCursor == null ) bChangeCursor = true ;

    if ( jobjText.attr(g_strUserDefineMaskFormatTargetYnID) == "Y" ) // 사용자정의 마스크 포맷대상여부 체크
    {
        jobjText.attr(g_strUserDefineMaskFormatTargetYnID, "N"); // 속설 설정

        var nIntMaxLength = parseInt(jobjText.attr(g_strUserDefineMaskIntMaxLengthID), 10);
        var nDecMaxLength = parseInt(jobjText.attr(g_strUserDefineMaskCurrDecMaxLengthID), 10);
        var bMinusInputYn = ( jobjText.attr(g_strUserDefineMaskCurrMinusInputYnID) == "Y" ); // 음수입력여부

        var strVal = gfnFormatCurrUserDefineMask(jobjText.val(), nIntMaxLength, nDecMaxLength);
        if ( nDecMaxLength <= 0 && strVal.length > 0 && strVal.substr(strVal.length - 1) == "." ) strVal = strVal.substr(0, strVal.length - 1);
        if ( bMinusInputYn != true && strVal.length > 0 && strVal.indexOf("-") >= 0 ) strVal = strVal.substr(1);

        gfnSetValUserDefineMask(jobjText, strVal, bChangeCursor); // 사용자정의 마스크 값 설정
    }
}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 날짜 관련
//==============================================================================

//==============================================================================
// 용도     : 날짜 사용자정의 마스크 키업
// 문법     : gfnKeyUpDateUserDefineMask(objEvent As Object)
// 파라미터 : objEvent - 이벤트 개체
// 예제     : $("#txtDate").keyup(gfnKeyUpDateUserDefineMask); // 키업
// 리턴값   : 없음
// 참고사항 : 사용자정의 마스크 포맷대상여부 값에 따라 포맷을 재적용한다.
// 기타     : 내부 호출용
// 작성일자 : 2011-09-06
//------------------------------------------------------------------------------
function gfnKeyUpDateUserDefineMask(objEvent)
{
    gfnReleaseFormatTargetYnDateUserDefineMask($(event.srcElement)); // 사용자정의 마스크 날짜 포맷대상여부 해제
}

//==============================================================================
// 용도     : 날짜 사용자정의 마스크 키다운
// 문법     : gfnKeyDownDateUserDefineMask(objEvent As Object)
// 파라미터 : objEvent - 이벤트 개체
// 예제     : $("#txtDate").keydown(gfnKeyDownCurrUserDefineMask); // 키다운
// 리턴값   : 없음
// 참고사항 : 1. 키입력시 포맷을 적용한다.
//            2. 숫자 및 몇몇 단축키를 입력할 수 있다.
//               ex.) Ctrl Tab BackSpace Del Ctrl+A Ctrl+X Ctrl+C Ctrl+V Home/End/PageUp/PageDown/좌/우
//                    Ctrl+Q Ctrl+W Ctrl+E Ctrl+R Ctrl+T Ctrl+D Ctrl+H Ctrl+J Ctrl+K Ctrl+L Ctrl+B Ctrl+N
//                    1 2 3 4 5 6 7 8 9 0
// 기타     : 내부 호출용
// 작성일자 : 2011-09-06
//------------------------------------------------------------------------------
function gfnKeyDownDateUserDefineMask(objEvent)
{
    // 변수 선언 및 설정
    var bOutput = false ; // 출력

    var jobjText = $(event.srcElement);
    //if ( jobjText.attr("readonly") == true ) return ( objEvent["keyCode"] != 8 ); // 읽기전용인 경우.. // 8. BackSpace
    if ( jobjText.prop("readOnly") ) return ( objEvent["keyCode"] != 8 ); // 읽기전용인 경우..

    // 키입력여부
    var arrKeyInputYns = gfnGetKeyInputYnsUserDefineMask(objEvent); // 사용자정의 마스크 키입력여부 가져오기

    var bCtrlKey   = arrKeyInputYns["ctrl"  ];
    var bTabKey    = arrKeyInputYns["tab"   ];
    var bRemoveKey = arrKeyInputYns["remove"];
    var bSelectKey = arrKeyInputYns["select"];
    var bCutKey    = arrKeyInputYns["cut"   ];
    var bCopyKey   = arrKeyInputYns["copy"  ];
    var bPasteKey  = arrKeyInputYns["paste" ];
    var bMoveKey   = arrKeyInputYns["move"  ];

    var bBrowserFunc = arrKeyInputYns["browserfunc"];

    var bNumberKey = arrKeyInputYns["number"];

    // 숫자키값
    var strNumberKeyVal = gfnGetNumberKeyDownValUserDefineMask(objEvent["keyCode"], objEvent["shiftKey"]); // 사용자정의 마스크 키값 가져오기

    var strSelectedText; // 선택된 텍스트

    if ( document.selection )
        strSelectedText = document.selection.createRange().text ;
    else
    if ( window.getSelection )
    {
        strSelectedText = jobjText.val().substring(jobjText[0].selectionStart, jobjText[0].selectionEnd);
    }

    // 선택된 텍스트유무에 따라 처리한다.
    if ( strSelectedText.length > 0 ) // 선택된 텍스트가 있을 경우..
    {
        // 1. 잘라내기/붙여넣기/삭제를 처리한다.
        if ( bCutKey )
            {}//gfnClickCutUserDefineMask(); // 사용자정의 마스크 잘라내기 클릭
        else
        if ( bPasteKey )
            gfnClickPasteUserDefineMask(); // 사용자정의 마스크 붙여넣기 클릭
        else
        if ( bRemoveKey )
            gfnClickDeleteUserDefineMask(); // 사용자정의 마스크 삭제 클릭

        // 2. KeyUp 이벤트에서 포맷을 재적용시킬지 설정한다.
        if ( bNumberKey ) jobjText.attr(g_strUserDefineMaskFormatTargetYnID, "Y");

        // 3. 출력여부를 설정한다.
        if ( bCtrlKey || bTabKey || bSelectKey || bCopyKey || bMoveKey || bBrowserFunc ||
             bNumberKey
           ) bOutput = true ;
    }
    else
    {
        // 1. 잘라내기/붙여넣기/삭제를 처리한다.
        if ( bPasteKey ) gfnClickPasteUserDefineMask(); // 사용자정의 마스크 붙여넣기 클릭

        // 2. KeyUp 이벤트에서 포맷을 재적용시킬지 설정한다.

        // 3. 출력여부를 설정한다.
        if ( bTabKey || bSelectKey || bMoveKey || bBrowserFunc ) bOutput = true ;

        // 4. 값을 설정한다.
        {
            // 변수 선언 및 설정
            var strPrevVal = jobjText.val(); // 이전값

            var nLength = strPrevVal.length ;

            if ( bRemoveKey == true )
            {
                // 길이 체크
                if ( nLength > 0 ) gfnSetValUserDefineMask(jobjText, gfnFormatDateUserDefineMask(strPrevVal.substr(0, nLength - 1), ( jobjText.attr(g_strUserDefineMaskDateYmYnID) == "Y" ))); // 사용자정의 마스크 값 설정
            }
            else
            if ( bNumberKey == true )
            {
                // 최대길이 체크
                if ( nLength < parseInt(jobjText.attr(g_strUserDefineMaskIntMaxLengthID), 10) )
                {
                    if ( nLength == 6 )
                    {
                        if ( parseInt(strPrevVal.charAt(5) + strNumberKeyVal, 10) <= 12 )
                            gfnSetValUserDefineMask(jobjText, gfnFormatDateUserDefineMask(strPrevVal + strNumberKeyVal)); // 사용자정의 마스크 값 설정
                        else
                        if ( jobjText.attr(g_strUserDefineMaskDateYmYnID) != "Y" )
                            gfnSetValUserDefineMask(jobjText, gfnFormatDateUserDefineMask(strPrevVal + strNumberKeyVal)); // 사용자정의 마스크 값 설정
                    }
                    else
                    if ( nLength == 9 )
                    {
                        if ( parseInt(strPrevVal.charAt(8) + strNumberKeyVal, 10) <= gfnGetLastDayUserDefineMask(strPrevVal) )
                            gfnSetValUserDefineMask(jobjText, gfnFormatDateUserDefineMask(strPrevVal + strNumberKeyVal)); // 사용자정의 마스크 값 설정
                    }
                    else
                    {
                        gfnSetValUserDefineMask(jobjText, gfnFormatDateUserDefineMask(strPrevVal + strNumberKeyVal)); // 사용자정의 마스크 값 설정
                    }
                }
            }
        }
    }

    return bOutput ; // 리턴 처리 - 출력 변수
}

//==============================================================================
// 용도     : 사용자정의 마스크 날짜 포맷
// 문법     : gfnFormatDateUserDefineMask(strInputVal As String, bYmYn As Boolean)
// 파라미터 : 1. strInputVal - 입력값   (필수)
//            2. bYmYn       - 년월여부 (선택) 참고) 미입력시 false 입력과 동일
// 예제     : 1. gfnFormatDateUserDefineMask("20110902"); // 2011-09-02
//            2. gfnFormatDateUserDefineMask("20110902", true); // 2011-09
// 리턴값   : String
// 참고사항 : 없음
// 기타     : 내부 호출용
// 작성일자 : 2011-09-06
//------------------------------------------------------------------------------
function gfnFormatDateUserDefineMask(strInputVal, bYmYn)
{
    // 변수 선언 및 설정
    var strOutput = null ; // 출력

    if ( strInputVal != null )
    {
        var strInput = strInputVal.toString();

        strOutput = strInput.replace(/[^0-9]/, ""); // 숫자를 제외한 문자를 모두 제거

        if ( strOutput.length > 0 )
        {
            strOutput = gfnUnFormatDateUserDefineMask(strOutput);

            var nLength = strOutput.length ;
            var strDeli = "-" ;

            strOutput = strOutput.substr(0, 4)
                      + ( nLength >= 5 ? strDeli : "" ) + strOutput.substr(4, 2)
                      + ( bYmYn != true ? ( nLength >= 7 ? strDeli : "" ) + strOutput.substr(6) : "" );
        }
    }

    return strOutput ; // 리턴 처리 - 출력 변수
}

//==============================================================================
// 용도     : 사용자정의 마스크 날짜 포맷 해제
// 문법     : gfnUnFormatDateUserDefineMask(strInputVal As String, bYmYn As Boolean)
// 파라미터 : 1. strInputVal - 입력값   (필수)
//            2. bYmYn       - 년월여부 (선택) 참고) 미입력시 false 입력과 동일
// 예제     : 1. gfnUnFormatDateUserDefineMask(null); // ""
//            2. gfnUnFormatDateUserDefineMask(""); // ""
//            3. gfnUnFormatDateUserDefineMask("201"); // "201"
//            4. gfnUnFormatDateUserDefineMask("2011"); // "2011"
//            5. gfnUnFormatDateUserDefineMask("20119"); // "201109"
//            6. gfnUnFormatDateUserDefineMask("20111"); // "20111"
//            7. gfnUnFormatDateUserDefineMask("201199"); // "20110909"
//            8. gfnUnFormatDateUserDefineMask("201119"); // "20111009"
//            9. gfnUnFormatDateUserDefineMask("2011999"); // "20110909"
//            10. gfnUnFormatDateUserDefineMask("2011199"); // "20111009"
//            11. gfnUnFormatDateUserDefineMask("2011119"); // "20111109"
//            12. gfnUnFormatDateUserDefineMask("2011111"); // "2011111"
//            13. gfnUnFormatDateUserDefineMask("20119999"); // "20110909"
//            14. gfnUnFormatDateUserDefineMask("20111999"); // "20111009"
//            15. gfnUnFormatDateUserDefineMask("20111199"); // "20111109"
//            16. gfnUnFormatDateUserDefineMask("20111119"); // "20111119"
//            17. gfnUnFormatDateUserDefineMask("201193"); // "2011093"
//            18. gfnUnFormatDateUserDefineMask("2011931"); // "20110903"
//            19. gfnUnFormatDateUserDefineMask("999901"); // "999901"
//            20. gfnUnFormatDateUserDefineMask("0"); // "190"
//            21. gfnUnFormatDateUserDefineMask("00"); // "1900"
//            22. gfnUnFormatDateUserDefineMask("000"); // "19000"
//            23. gfnUnFormatDateUserDefineMask("0000"); // "19000"
//            24. gfnUnFormatDateUserDefineMask("00000"); // "19000"
//            25. gfnUnFormatDateUserDefineMask("9"); // "9"
//            26. gfnUnFormatDateUserDefineMask("90"); // "90"
//            27. gfnUnFormatDateUserDefineMask("900"); // "900"
//            28. gfnUnFormatDateUserDefineMask("9000"); // "9000"
//            29. gfnUnFormatDateUserDefineMask("90000"); // "90000"
//            30. gfnUnFormatDateUserDefineMask("9999099"); // "9999099"
//            31. gfnUnFormatDateUserDefineMask("9999090"); // "9999090"
//            32. gfnUnFormatDateUserDefineMask("1"); // "1"
//            33. gfnUnFormatDateUserDefineMask("11"); // "191"
//            34. gfnUnFormatDateUserDefineMask("914002-04"); // "91400204"
//            35. gfnUnFormatDateUserDefineMask("191910-99"); // "19191009"
//            36. gfnUnFormatDateUserDefineMask("191910-99", true); // "19191009"
// 리턴값   : String
// 참고사항 : 없음
// 기타     : 내부 호출용
// 작성일자 : 2011-09-06
//------------------------------------------------------------------------------
function gfnUnFormatDateUserDefineMask(strInputVal, bYmYn)
{
    var strOutput = "" ; // 출력 변수 선언 및 설정

    if ( strInputVal != null )
    {
        strInput = strInputVal.toString().replace(/[^0-9]/g, ""); // 숫자, . 을 제외한 모든 문자 제거

        // 년도를 조립한다.
        if ( strInput.length > 0 )
        {
            if ( strInput.charAt(0) == "0"  ) strInput = "19" + strInput ;
            if ( strInput.length >= 2 && strInput.charAt(0) == "1" && strInput.charAt(1) != "9" ) strInput = "19" + strInput.substr(1);

            strOutput += strInput.substr(0, 4); strInput = strInput.substr(4);

            // 월을 조립한다.
            if ( strInput.length > 0 )
            {
                var strMonth = strInput.substr(0, 2);

                if ( parseInt(strMonth, 10) > 12 )
                {
                    strOutput += "0" + strInput.charAt(0)   ; strInput = strInput.substr(1);
                }
                else
                if ( parseInt(strMonth, 10) >= 10 )
                {
                    strOutput +=       strMonth             ; strInput = strInput.substr(2);
                }
                else
                if ( parseInt(strMonth, 10) > 1 )
                {
                    if ( strMonth.length < 2 )
                    {
                        strOutput += "0" + strMonth             ; strInput = strInput.substr(1);
                    }
                    else
                    {
                        strOutput +=       strMonth             ; strInput = strInput.substr(2);
                    }
                }
                else
                if ( parseInt(strMonth, 10) == 1 )
                {
                    strOutput +=       strMonth             ; strInput = strInput.substr(strMonth.length);
                }
                else
                {
                    // 0 을 모두 제거한다.
                    var strTmp = "" ;
                    for ( var i = 0 ; i < strTmp.length ; i++ )
                    {
                        if ( strInput.charAt(i) != "0" )
                        {
                            strTmp = strInput.substr(i);
                            break ;
                        }
                    }
                    strInput = "0" + strTmp ;

                    strOutput +=       strInput.substr(0, 2); strInput = strInput.substr(2);
                }

                // 일을 조립한다.
                if ( strInput.length > 0 && bYmYn != true )
                {
                    var nLastDay = gfnGetLastDayUserDefineMask(strOutput);
                    var strDay = strInput.substr(0, 2);

                    if ( parseInt(strDay, 10) > nLastDay )
                    {
                        strOutput += "0" + strInput.charAt(0);
                    }
                    else
                    if ( parseInt(strDay, 10) >= 10 )
                        strOutput +=       strDay ;
                    else
                    if ( parseInt(strDay, 10) > Math.floor(nLastDay / 10) )
                    {
                        if ( strDay.length < 2 )
                            strOutput += "0" + strDay ;
                        else
                            strOutput +=       strDay ;
                    }
                    else
                    if ( parseInt(strDay, 10) >= 1 )
                        strOutput +=       strDay ;
                    else
                        strOutput +=       strDay.charAt(0);
                }
            }
        }
    }

    return strOutput ; // 리턴 처리 - 출력 변수
}

//==============================================================================
// 용도     : 사용자정의 마스크 말일 가져오기
// 문법     : gfnGetLastDayUserDefineMask(strDate As String)
// 파라미터 : strDate - 날짜(년월 또는 년월일)
// 예제     : 1. gfnGetLastDayUserDefineMask("201001");
//            2. gfnGetLastDayUserDefineMask("2010-01");
//            3. gfnGetLastDayUserDefineMask("20100101");
//            4. gfnGetLastDayUserDefineMask("2010-01-01");
// 리턴값   : Integer
// 참고사항 : 없음
// 기타     : 내부 호출용
// 작성일자 : 2011-09-06
//------------------------------------------------------------------------------
function gfnGetLastDayUserDefineMask(strDate)
{
    var nYear = parseInt(strDate.substr(0, 4), 10);                  // 년도 변수 선언 및 설정
    var nMn   = parseInt(strDate.replace(/-/, "").substr(4, 2), 10); // 월 변수 선언 및 설정

    var arrDds = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
    if ( ( nYear % 4 == 0 && nYear % 100 != 0 ) || nYear % 400 == 0 ) arrDds[1] = 29 ;

    return arrDds[nMn - 1]; // 리턴 처리
}

//==============================================================================
// 용도     : 사용자정의 마스크 날짜 포맷대상여부 해제
// 문법     : gfnReleaseFormatTargetYnDateUserDefineMask(jobjText As Object, bChangeCursor As Boolean)
// 파라미터 : 1. jobjText      - 텍스트 개체 (필수)
//            2. bChangeCursor - 커서변경    (선택) 참고) 미입력시 true 입력과 동일
// 예제     : gfnReleaseFormatTargetYnDateUserDefineMask($("#txtDate"));
// 리턴값   : 없음
// 참고사항 : 없음
// 기타     : 내부 호출용
// 작성일자 : 2011-09-06
//------------------------------------------------------------------------------
function gfnReleaseFormatTargetYnDateUserDefineMask(jobjText, bChangeCursor)
{
    if ( bChangeCursor == null ) bChangeCursor = true ;

    if ( jobjText.attr(g_strUserDefineMaskFormatTargetYnID) == "Y" ) // 사용자정의 마스크 포맷대상여부 체크
    {
        jobjText.attr(g_strUserDefineMaskFormatTargetYnID, "N"); // 속성 설정

        gfnSetValUserDefineMask(jobjText, gfnFormatDateUserDefineMask(jobjText.val(), ( jobjText.attr(g_strUserDefineMaskDateYmYnID) == "Y" )), bChangeCursor); // 사용자정의 마스크 값 설정
    }
}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 고정된 사용자정의 마스크 관련
//==============================================================================

//==============================================================================
// 용도     : 고정된 사용자정의 마스크 키업
// 문법     : gfnKeyUpFixedUserDefineMask(objEvent As Object)
// 파라미터 : objEvent - 이벤트 개체
// 예제     : $("#txtPost").keyup(gfnKeyUpFixedUserDefineMask); // 키업
// 리턴값   : 없음
// 참고사항 : 사용자정의 마스크 포맷대상여부 값에 따라 포맷을 재적용한다.
// 기타     : 내부 호출용
// 작성일자 : 2011-09-08
//------------------------------------------------------------------------------
function gfnKeyUpFixedUserDefineMask(objEvent)
{
    gfnReleaseFormatTargetYnFixedUserDefineMask($(event.srcElement)); // 사용자정의 마스크 통화 포맷대상여부 해제
}

//==============================================================================
// 용도     : 고정된 사용자정의 마스크 키다운
// 문법     : gfnKeyDownFixedUserDefineMask(objEvent As Object)
// 파라미터 : objEvent - 이벤트 개체
// 예제     : $("#txtPost").keydown(gfnKeyDownFixedUserDefineMask); // 키다운
// 리턴값   : 없음
// 참고사항 : 1. 키입력시 포맷을 적용한다.
//            2. 숫자 및 몇몇 단축키를 입력할 수 있다.
//               ex.) Ctrl Tab BackSpace Del Ctrl+A Ctrl+X Ctrl+C Ctrl+V Home/End/PageUp/PageDown/좌/우
//                    Ctrl+Q Ctrl+W Ctrl+E Ctrl+R Ctrl+T Ctrl+D Ctrl+H Ctrl+J Ctrl+K Ctrl+L Ctrl+B Ctrl+N
//                    1 2 3 4 5 6 7 8 9 0
// 기타     : 내부 호출용
// 작성일자 : 2011-09-08
//------------------------------------------------------------------------------
function gfnKeyDownFixedUserDefineMask(objEvent)
{
    // 변수 선언 및 설정
    var bOutput = false ; // 출력

    var jobjText = $(event.srcElement);
    //if ( jobjText.attr("readonly") == true ) return ( objEvent["keyCode"] != 8 ); // 읽기전용인 경우.. // 8. BackSpace
    if ( jobjText.prop("readOnly") ) return ( objEvent["keyCode"] != 8 ); // 읽기전용인 경우..

    // 키입력여부
    var arrKeyInputYns = gfnGetKeyInputYnsUserDefineMask(objEvent); // 사용자정의 마스크 키입력여부 가져오기

    var bCtrlKey   = arrKeyInputYns["ctrl"  ];
    var bTabKey    = arrKeyInputYns["tab"   ];
    var bRemoveKey = arrKeyInputYns["remove"];
    var bSelectKey = arrKeyInputYns["select"];
    var bCutKey    = arrKeyInputYns["cut"   ];
    var bCopyKey   = arrKeyInputYns["copy"  ];
    var bPasteKey  = arrKeyInputYns["paste" ];
    var bMoveKey   = arrKeyInputYns["move"  ];

    var bBrowserFunc = arrKeyInputYns["browserfunc"];

    var bNumberKey = arrKeyInputYns["number"];

    // 숫자키값
    var strNumberKeyVal = gfnGetNumberKeyDownValUserDefineMask(objEvent["keyCode"], objEvent["shiftKey"]); // 사용자정의 마스크 키값 가져오기

    var strSelectedText; // 선택된 텍스트

    if ( document.selection )
        strSelectedText = document.selection.createRange().text ;
    else
    if ( window.getSelection )
    {
        strSelectedText = jobjText.val().substring(jobjText[0].selectionStart, jobjText[0].selectionEnd);
    }

    // 선택된 텍스트유무에 따라 처리한다.
    if ( strSelectedText.length > 0 ) // 선택된 텍스트가 있을 경우..
    {
        // 1. 잘라내기/붙여넣기/삭제를 처리한다.
        if ( bCutKey )
            {}//gfnClickCutUserDefineMask(); // 사용자정의 마스크 잘라내기 클릭
        else
        if ( bPasteKey )
            gfnClickPasteUserDefineMask(); // 사용자정의 마스크 붙여넣기 클릭
        else
        if ( bRemoveKey )
            gfnClickDeleteUserDefineMask(); // 사용자정의 마스크 삭제 클릭

        // 2. KeyUp 이벤트에서 포맷을 재적용시킬지 설정한다.
        if ( bNumberKey ) jobjText.attr(g_strUserDefineMaskFormatTargetYnID, "Y");

        // 3. 출력여부를 설정한다.
        if ( bCtrlKey || bTabKey || bSelectKey || bCopyKey || bMoveKey || bBrowserFunc ||
             bNumberKey
           ) bOutput = true ;
    }
    else
    {
        // 1. 잘라내기/붙여넣기/삭제를 처리한다.
        if ( bPasteKey ) gfnClickPasteUserDefineMask(); // 사용자정의 마스크 붙여넣기 클릭

        // 2. KeyUp 이벤트에서 포맷을 재적용시킬지 설정한다.

        // 3. 출력여부를 설정한다.
        if ( bTabKey || bSelectKey || bMoveKey || bBrowserFunc ) bOutput = true ;

        // 4. 값을 설정한다.
        {
            // 변수 선언 및 설정
            var strPrevVal = jobjText.val(); // 이전 값

            var nLength = strPrevVal.length ;

            var strMaskStr = jobjText.attr(g_strUserDefineMaskMaskStrID); // 사용자정의 마스크 마스크문자열

            if ( bRemoveKey == true )
            {
                if ( nLength > 0 ) gfnSetValUserDefineMask(jobjText, gfnFormatFixedUserDefineMask(strPrevVal.substr(0, strPrevVal.length - 1), strMaskStr));
            }
            else
            if ( bNumberKey == true )
            {
                // 최대길이 체크
                if ( nLength < strMaskStr.length ) gfnSetValUserDefineMask(jobjText, gfnFormatFixedUserDefineMask(strPrevVal + strNumberKeyVal, strMaskStr)); // 사용자정의 마스크 값 설정
            }
        }
    }

    return bOutput ; // 리턴 처리 - 출력 변수
}

//==============================================================================
// 용도     : 고정된 사용자정의 마스크 숫자 포맷
// 문법     : gfnFormatFixedUserDefineMask(strInputVal As String, strMaskStr As String)
// 파라미터 : 1. strInputVal - 입력값
//            2. strMaskStr  - 마스크문자열
// 예제     : 1. gfnFormatFixedUserDefineMask(null, "333-333"); // null
//            2. gfnFormatFixedUserDefineMask("", "333-333"); // ""
//            3. gfnFormatFixedUserDefineMask("123123", "333-333"); // 123-123
//            4. gfnFormatFixedUserDefineMask("123456", "333-333"); // 123
//            5. gfnFormatFixedUserDefineMask("123abc123", "333-333"); // 123-123
//            6. gfnFormatFixedUserDefineMask("1-23abc12-3", "333-333"); // 123-123
//            7. gfnFormatFixedUserDefineMask("99999999999999999999999", "991939-4999999"); // 99
// 리턴값   : String
// 참고사항 : 마스크는 숫자 및 그 외 문자들로 구성한다.
// 기타     : 내부 호출용
// 작성일자 : 2011-09-08
//------------------------------------------------------------------------------
function gfnFormatFixedUserDefineMask(strInputVal, strMaskStr)
{
    // 출력 변수 선언 및 설정
    var strOutput = null ;

    if ( strInputVal != null ) // 데이터가 존재하는 경우
    {
        var strUnFormatted = gfnUnFormatFixedUserDefineMask(strInputVal);

        var nLength = strUnFormatted.length ;

        strOutput = "" ;

        if ( nLength > 0 )
        {
            var nMaskStrLength = strMaskStr.length ;

            var nCharCode ;
            var strNonNumber = "" ;

            for ( var i = 0 ; i < nMaskStrLength ; i++ )
            {
                nCharCode = strMaskStr.charCodeAt(i);

                if ( nCharCode >= 48 && nCharCode <= 57 ) // 숫자인 경우..
                {
                    if ( parseInt(strUnFormatted.charAt(0)) <= ( nCharCode - 48 ) )
                        strOutput += strNonNumber + strUnFormatted.charAt(0);
                    else
                        i-- ;

                    strNonNumber   = "" ;
                    strUnFormatted = strUnFormatted.substr(1);
                }
                else
                {
                    strNonNumber += strMaskStr.charAt(i);
                }

                if ( strUnFormatted.length <= 0 ) break ;
            }
        }
    }

    return strOutput ; // 리턴 처리 - 출력 변수
}

//==============================================================================
// 용도     : 고정된 사용자정의 마스크 포맷 해제
// 문법     : gfnUnFormatFixedUserDefineMask(strInputVal As String)
// 파라미터 : strInputVal - 입력값 개체
// 예제     : 1. gfnUnFormatFixedUserDefineMask(null); // ""
//            2. gfnUnFormatFixedUserDefineMask(""); // ""
//            3. gfnUnFormatFixedUserDefineMask("123123"); // 123123
//            4. gfnUnFormatFixedUserDefineMask("123456"); // 123456
//            5. gfnUnFormatFixedUserDefineMask("123abc123"); // 123123
// 리턴값   : String
// 참고사항 : 없음
// 기타     : 내부 호출용
// 작성일자 : 2011-09-08
//------------------------------------------------------------------------------
function gfnUnFormatFixedUserDefineMask(strInputVal)
{
    var strOutput = "" ; // 출력 변수 선언 및 설정

    if ( strInputVal != null && strInputVal.toString().length > 0 ) // 데이터가 존재하는 경우
    {
        var strFormatted = strInputVal.toString().replace(/[^0-9]/g, ""); // 숫자, . 을 제외한 모든 문자 제거

        if ( strFormatted.length > 0 ) strOutput = strFormatted ;
    }

    return strOutput ; // 리턴 처리 - 출력 변수
}

//==============================================================================
// 용도     : 고정된 사용자정의 마스크 포맷대상여부 해제
// 문법     : gfnReleaseFormatTargetYnFixedUserDefineMask(jobjText As Object, bChangeCursor As Boolean)
// 파라미터 : 1. jobjText      - 텍스트 개체 (필수)
//            2. bChangeCursor - 커서변경    (선택) 참고) 미입력시 true 입력과 동일
// 예제     : gfnReleaseFormatTargetYnFixedUserDefineMask($("#Post"));
// 리턴값   : 없음
// 참고사항 : 없음
// 기타     : 내부 호출용
// 작성일자 : 2011-09-08
//------------------------------------------------------------------------------
function gfnReleaseFormatTargetYnFixedUserDefineMask(jobjText, bChangeCursor)
{
    if ( bChangeCursor == null ) bChangeCursor = true ;

    if ( jobjText.attr(g_strUserDefineMaskFormatTargetYnID) == "Y" ) // 사용자정의 마스크 포맷대상여부 체크
    {
        jobjText.attr(g_strUserDefineMaskFormatTargetYnID, "N"); // 속성 설정

        var strMaskStr = jobjText.attr(g_strUserDefineMaskMaskStrID); // 사용자정의 마스크 마스크문자열

        var strVal = gfnFormatFixedUserDefineMask(jobjText.val(), strMaskStr);

        gfnSetValUserDefineMask(jobjText, strVal, bChangeCursor); // 사용자정의 마스크 값 설정
    }
}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 고정되지 않은 사용자정의 마스크 관련
//==============================================================================

//==============================================================================
// 용도     : 고정되지 않은 사용자정의 마스크 키업
// 문법     : gfnKeyUpUnFixedUserDefineMask(objEvent As Object)
// 파라미터 : objEvent - 이벤트 개체
// 예제     : $("#txtTel").keyup(gfnKeyUpUnFixedUserDefineMask); // 키업
// 리턴값   : 없음
// 참고사항 : 사용자정의 마스크 포맷대상여부 값에 따라 포맷을 재적용한다.
// 기타     : 내부 호출용
// 작성일자 : 2011-09-09
//------------------------------------------------------------------------------
function gfnKeyUpUnFixedUserDefineMask(objEvent)
{
    gfnReleaseFormatTargetYnUnFixedUserDefineMask($(event.srcElement)); // 사용자정의 마스크 통화 포맷대상여부 해제
}

//==============================================================================
// 용도     : 고정되지 않은 사용자정의 마스크 키다운
// 문법     : gfnKeyDownUnFixedUserDefineMask(objEvent As Object)
// 파라미터 : objEvent - 이벤트 개체
// 예제     : $("#txtTel").keydown(gfnKeyDownUnFixedUserDefineMask); // 키다운
// 리턴값   : 없음
// 참고사항 : 1. 키입력시 포맷을 적용한다.
//            2. 숫자 및 몇몇 단축키를 입력할 수 있다.
//               ex.) Ctrl Tab BackSpace Del Ctrl+A Ctrl+X Ctrl+C Ctrl+V Home/End/PageUp/PageDown/좌/우
//                    Ctrl+Q Ctrl+W Ctrl+E Ctrl+R Ctrl+T Ctrl+D Ctrl+H Ctrl+J Ctrl+K Ctrl+L Ctrl+B Ctrl+N
//                    1 2 3 4 5 6 7 8 9 0
//            3. 마스크에 특수기호를 정의한 경우 해당 특수기호도 입력할 수 있으며,
//               사용가능한 특수기호는 gfnGetSymbolKeyDownValUserDefineMask() 를 참고한다.
// 기타     : 내부 호출용
// 작성일자 : 2011-09-09
//------------------------------------------------------------------------------
function gfnKeyDownUnFixedUserDefineMask(objEvent)
{
    // 변수 선언 및 설정
    var bOutput = false ; // 출력

    var jobjText = $(event.srcElement);
    //if ( jobjText.attr("readonly") == true ) return ( objEvent["keyCode"] != 8 ); // 읽기전용인 경우.. // 8. BackSpace
    if ( jobjText.prop("readOnly") ) return ( objEvent["keyCode"] != 8 ); // 읽기전용인 경우..

    // 키입력여부
    var arrKeyInputYns = gfnGetKeyInputYnsUserDefineMask(objEvent); // 사용자정의 마스크 키입력여부 가져오기

    var bCtrlKey   = arrKeyInputYns["ctrl"  ];
    var bTabKey    = arrKeyInputYns["tab"   ];
    var bRemoveKey = arrKeyInputYns["remove"];
    var bSelectKey = arrKeyInputYns["select"];
    var bCutKey    = arrKeyInputYns["cut"   ];
    var bCopyKey   = arrKeyInputYns["copy"  ];
    var bPasteKey  = arrKeyInputYns["paste" ];
    var bMoveKey   = arrKeyInputYns["move"  ];

    var bBrowserFunc = arrKeyInputYns["browserfunc"];

    var bNumberKey = arrKeyInputYns["number"];

    var strNumberKeyVal = gfnGetNumberKeyDownValUserDefineMask(objEvent["keyCode"], objEvent["shiftKey"]); // 사용자정의 마스크 숫자키값 가져오기
    var strSymbolKeyVal = gfnGetSymbolKeyDownValUserDefineMask(objEvent["keyCode"], objEvent["shiftKey"]); // 사용자정의 마스크 특수기호키값 가져오기

    var strSelectedText; // 선택된 텍스트

    if ( document.selection )
        strSelectedText = document.selection.createRange().text ;
    else
    if ( window.getSelection )
    {
        strSelectedText = jobjText.val().substring(jobjText[0].selectionStart, jobjText[0].selectionEnd);
    }

    // 선택된 텍스트유무에 따라 처리한다.
    if ( strSelectedText.length > 0 ) // 선택된 텍스트가 있을 경우..
    {
        // 1. 잘라내기/붙여넣기/삭제를 처리한다.
        if ( bCutKey )
            {}//gfnClickCutUserDefineMask(); // 사용자정의 마스크 잘라내기 클릭
        else
        if ( bPasteKey )
            gfnClickPasteUserDefineMask(); // 사용자정의 마스크 붙여넣기 클릭
        else
        if ( bRemoveKey )
            gfnClickDeleteUserDefineMask(); // 사용자정의 마스크 삭제 클릭

        // 2. KeyUp 이벤트에서 포맷을 재적용시킬지 설정한다.
        if ( bNumberKey ) jobjText.attr(g_strUserDefineMaskFormatTargetYnID, "Y");

        // 3. 출력여부를 설정한다.
        if ( bCtrlKey || bTabKey || bSelectKey || bCopyKey || bMoveKey || bBrowserFunc ||
             bNumberKey
           ) bOutput = true ;
    }
    else
    {
        // 1. 잘라내기/붙여넣기/삭제를 처리한다.
        if ( bPasteKey ) gfnClickPasteUserDefineMask(); // 사용자정의 마스크 붙여넣기 클릭

        // 2. KeyUp 이벤트에서 포맷을 재적용시킬지 설정한다.

        // 3. 출력여부를 설정한다.
        if ( bTabKey || bSelectKey || bMoveKey || bBrowserFunc ) bOutput = true ;

        // 4. 값을 설정한다.
        {
            // 변수 선언 및 설정
            var strPrevVal = jobjText.val(); // 이전 값

            var nLength = strPrevVal.length ;

            var strMaskStr = jobjText.attr(g_strUserDefineMaskMaskStrID); // 사용자정의 마스크 마스크문자열

            if ( bRemoveKey == true )
            {
                if ( nLength > 0 ) gfnSetValUserDefineMask(jobjText, gfnFormatUnFixedUserDefineMask(strPrevVal.substr(0, strPrevVal.length - 1), strMaskStr));
            }
            else
            if ( bNumberKey == true )
            {
                // 최대길이 체크
                if ( nLength < strMaskStr.length ) gfnSetValUserDefineMask(jobjText, gfnFormatUnFixedUserDefineMask(strPrevVal + strNumberKeyVal, strMaskStr)); // 사용자정의 마스크 값 설정
            }
            else
            if ( strSymbolKeyVal.length > 0 && strMaskStr.indexOf(strSymbolKeyVal) >= 0 ) // 마스크에 포함된 특수기호인 경우..
            {
                // 최대길이 체크
                if ( nLength < strMaskStr.length ) gfnSetValUserDefineMask(jobjText, gfnFormatUnFixedUserDefineMask(strPrevVal + strSymbolKeyVal, strMaskStr)); // 사용자정의 마스크 값 설정
            }
        }
    }

    return bOutput ; // 리턴 처리 - 출력 변수
}

//==============================================================================
// 용도     : 고정되지 않은 사용자정의 마스크 숫자 포맷
// 문법     : gfnFormatUnFixedUserDefineMask(strInputVal As String, strMaskStr As String)
// 파라미터 : 1. strInputVal - 입력값
//            2. strMaskStr  - 마스크문자열
// 예제     : 1. gfnFormatUnFixedUserDefineMask(null, "333-333"); // null
//            2. gfnFormatUnFixedUserDefineMask("", "333-333"); // ""
//            3. gfnFormatUnFixedUserDefineMask("123123", "333-333"); // 123-123
//            4. gfnFormatUnFixedUserDefineMask("123456", "333-333"); // 123
//            5. gfnFormatUnFixedUserDefineMask("123abc123", "333-333"); // 123-123
//            6. gfnFormatUnFixedUserDefineMask("1-23abc12-3", "333-333"); // 1-231
//            7. gfnFormatUnFixedUserDefineMask(null, ""); // null
//            8. gfnFormatUnFixedUserDefineMask("", ""); // ""
//            9. gfnFormatUnFixedUserDefineMask("1-23abc12-3", ""); // ""
//            10. gfnFormatUnFixedUserDefineMask("3-a123abc456", "333-333"); // 3-123
//            11. gfnFormatUnFixedUserDefineMask("-a123abc456", "333-333"); // 123
//            12. gfnFormatUnFixedUserDefineMask("--a123abc456", "333-333-333"); // 123
//            13. gfnFormatUnFixedUserDefineMask("333--a123abc456", "333-333-333"); // 333-123
//            14. gfnFormatUnFixedUserDefineMask("333--a123abc123", "333-333-333"); // 333-123-123
//            15. gfnFormatUnFixedUserDefineMask("--a123abc123", "333-333-333"); // 123-123
//            16. gfnFormatUnFixedUserDefineMask("123-", "333-333-333"); // 123-
// 리턴값   : String
// 참고사항 : 1. 마스크는 숫자 및 몇몇 특수기호들만으로 구성한다.
//            2. 사용가능한 특수기호는 gfnGetSymbolKeyDownValUserDefineMask() 를 참고한다.
// 기타     : 내부 호출용
// 작성일자 : 2011-09-15
//------------------------------------------------------------------------------
function gfnFormatUnFixedUserDefineMask(strInputVal, strMaskStr)
{
    // 출력 변수 선언 및 설정
    var strOutput = null ;

    if ( strInputVal != null ) // 데이터가 존재하는 경우
    {
        var strUnFormattedVal = gfnUnFormatUnFixedUserDefineMask(strInputVal, strMaskStr);

        var nLengthVal  = strUnFormattedVal.length ;
        var nLengthMask = strMaskStr.length ;

        strOutput = "" ;

        if ( nLengthVal > 0 && nLengthMask > 0 )
        {
            var nMaxLength = nLengthVal * nLengthMask ;

            var nCharCodeMask ;
            var nCharCodeVal  ;

            var strCharMask ;
            var strCharVal  ;

            var strNonNumber  = "" ;
            var nIdx = 0 ;

            for ( var i = 0 ; i < nMaxLength ; i++ )
            {
                nCharCodeMask = strMaskStr.charCodeAt(nIdx);
                nCharCodeVal  = strUnFormattedVal.charCodeAt(0);

                strCharMask = strMaskStr.charAt(nIdx);
                strCharVal  = strUnFormattedVal.charAt(0);

                if ( nCharCodeMask >= 48 && nCharCodeMask <= 57 ) // 마스크가 숫자인 경우..
                {
                    if ( nCharCodeVal >= 48 && nCharCodeVal <= 57 ) // 숫자인 경우..
                    {
                        if ( nCharCodeMask >= nCharCodeVal ) // 마스크보다 작거나 같은 숫자인 경우..
                        {
                            strOutput += strNonNumber + strUnFormattedVal.charAt(0); strUnFormattedVal = strUnFormattedVal.substr(1);
                            strNonNumber = "" ;
                            nIdx++ ;
                        }
                    }
                    else
                    {
                        nIdx++ ;
                    }
                }
                else                                              // 마스크가 숫자가 아닌 경우..
                {
                    if ( strCharMask == strCharVal )
                    {
                        strOutput += strNonNumber + strCharVal ; strUnFormattedVal = strUnFormattedVal.substr(1);
                        strNonNumber = "" ;
                        nIdx++ ;
                    }
                    else
                    if ( nCharCodeVal >= 48 && nCharCodeVal <= 57 ) // 숫자인 경우..
                    {
                        strNonNumber += strCharMask ;
                        nIdx++ ;
                    }
                    else
                    {
                        strUnFormattedVal = strUnFormattedVal.substr(1);
                    }
                }

                if ( nIdx                     >= nLengthMask ) break ;
                if ( strOutput.length         >= nLengthMask ) break ;
                if ( strUnFormattedVal.length <= 0           ) break ;
            }
        }
    }

    return strOutput ; // 리턴 처리 - 출력 변수
}

//==============================================================================
// 용도     : 고정되지 않은 사용자정의 마스크 포맷 해제
// 문법     : gfnUnFormatUnFixedUserDefineMask(strInputVal As String, strMaskStr As String)
// 파라미터 : 1. strInputVal - 입력값 개체
//            2. strMaskStr  - 마스크 문자열
// 예제     : 1. gfnUnFormatUnFixedUserDefineMask(null, "333-333"); // ""
//            2. gfnUnFormatUnFixedUserDefineMask("", "333-333"); // ""
//            3. gfnUnFormatUnFixedUserDefineMask("123123", "333-333"); // 123123
//            4. gfnUnFormatUnFixedUserDefineMask("123456", "333-333"); // 123456
//            5. gfnUnFormatUnFixedUserDefineMask("123abc123", "333-333"); // 123123
//            6. gfnUnFormatUnFixedUserDefineMask(null, ""); // ""
//            7. gfnUnFormatUnFixedUserDefineMask("", ""); // ""
//            8. gfnUnFormatUnFixedUserDefineMask("-a123abc456", "333-333"); // 123456
//            9. gfnUnFormatUnFixedUserDefineMask("--a123abc456", "333-333-333"); // 123456
//            10. gfnUnFormatUnFixedUserDefineMask("333--a123abc456", "333-333-333"); // 333-123456
//            11. gfnUnFormatUnFixedUserDefineMask("333-", "333-333-333"); // 333-
// 리턴값   : String
// 참고사항 : 1. 마스크는 숫자 및 몇몇 특수기호들만으로 구성한다.
//            2. 사용가능한 특수기호는 gfnGetSymbolKeyDownValUserDefineMask() 를 참고한다.
// 기타     : 내부 호출용
// 작성일자 : 2011-09-15
//------------------------------------------------------------------------------
function gfnUnFormatUnFixedUserDefineMask(strInputVal, strMaskStr)
{
    var strOutput = "" ; // 출력 변수 선언 및 설정

    if ( strInputVal != null && strInputVal.toString().length > 0 ) // 데이터가 존재하는 경우
    {
        var strNonNumberMaskStr = strMaskStr.replace(/[0-9]/g, ""); // 숫자를 모두 제거

        var nLengthVal = strInputVal.length ;

        var nCharCode ;
        var strChar ;

        var bFirstNumber = ( strMaskStr.charCodeAt(0) >= 48 && strMaskStr.charCodeAt(0) <= 57 );

        var strNonNumber = "" ;

        for ( var i = 0 ; i < nLengthVal ; i++ )
        {
            nCharCode = strInputVal.charCodeAt(i);
            strChar   = strInputVal.charAt(i);

            if ( nCharCode >= 48 && nCharCode <= 57 )
            {
                strOutput += strNonNumber + strChar ;
                strNonNumber = "" ;
            }
            else
            if ( strMaskStr.indexOf(strChar) >= 0 )
            {
                if ( bFirstNumber != true || strOutput.length > 0 )
                {
                    if ( strMaskStr.indexOf(strNonNumber + strChar) >= 0 )
                        strNonNumber += strChar ;
                }
            }
        }

        if ( strNonNumber.length > 0 ) strOutput += strNonNumber ;
    }

    return strOutput ; // 리턴 처리 - 출력 변수
}

//==============================================================================
// 용도     : 고정되지 않은 사용자정의 마스크 포맷대상여부 해제
// 문법     : gfnReleaseFormatTargetYnUnFixedUserDefineMask(jobjText As Object, bChangeCursor As Boolean)
// 파라미터 : 1. jobjText      - 텍스트 개체 (필수)
//            2. bChangeCursor - 커서변경    (선택) 참고) 미입력시 true 입력과 동일
// 예제     : gfnReleaseFormatTargetYnUnFixedUserDefineMask($("#txtTel"));
// 리턴값   : 없음
// 참고사항 : 없음
// 기타     : 내부 호출용
// 작성일자 : 2011-09-09
//------------------------------------------------------------------------------
function gfnReleaseFormatTargetYnUnFixedUserDefineMask(jobjText, bChangeCursor)
{
    if ( bChangeCursor == null ) bChangeCursor = true ;

    if ( jobjText.attr(g_strUserDefineMaskFormatTargetYnID) == "Y" ) // 사용자정의 마스크 포맷대상여부 체크
    {
        jobjText.attr(g_strUserDefineMaskFormatTargetYnID, "N"); // 속성 설정

        var strMaskStr = jobjText.attr(g_strUserDefineMaskMaskStrID); // 사용자정의 마스크 마스크문자열

        var strVal = gfnFormatUnFixedUserDefineMask(jobjText.val(), strMaskStr);

        gfnSetValUserDefineMask(jobjText, strVal, bChangeCursor); // 사용자정의 마스크 값 설정
    }
}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 제한된 사용자정의 마스크 관련
//==============================================================================

//==============================================================================
// 용도     : 제한된 사용자정의 마스크 키업
// 문법     : gfnKeyUpLimitedUserDefineMask(objEvent As Object)
// 파라미터 : objEvent - 이벤트 개체
// 예제     : $("#txtLimited").keyup(gfnKeyUpLimitedUserDefineMask); // 키업
// 리턴값   : 없음
// 참고사항 : 사용자정의 마스크 포맷대상여부 값에 따라 포맷을 재적용한다.
// 기타     : 내부 호출용
// 작성일자 : 2011-09-20
//------------------------------------------------------------------------------
function gfnKeyUpLimitedUserDefineMask(objEvent)
{
    gfnReleaseFormatTargetYnLimitedUserDefineMask($(event.srcElement)); // 사용자정의 마스크 통화 포맷대상여부 해제
}

//==============================================================================
// 용도     : 제한된 사용자정의 마스크 키다운
// 문법     : gfnKeyDownLimitedUserDefineMask(objEvent As Object)
// 파라미터 : objEvent - 이벤트 개체
// 예제     : $("#txtLimited").keydown(gfnKeyDownLimitedUserDefineMask); // 키다운
// 리턴값   : 없음
// 참고사항 : 붙여넣기시 KeyUp 이벤트 핸들러에서 포맷재적용을 요청한다.
// 기타     : 내부 호출용
// 작성일자 : 2011-09-20
//------------------------------------------------------------------------------
function gfnKeyDownLimitedUserDefineMask(objEvent)
{
    // 키입력여부
    var arrKeyInputYns = gfnGetKeyInputYnsUserDefineMask(objEvent); // 사용자정의 마스크 키입력여부 가져오기

    var bPasteKey  = arrKeyInputYns["paste"];

    var jobjText = $(event.srcElement);

    if ( !jobjText.prop("readOnly") ) // 읽기전용이 아닌 경우..
    {
        // 1. 잘라내기/붙여넣기/삭제를 처리한다.
        if ( bPasteKey ) gfnClickPasteUserDefineMask(); // 사용자정의 마스크 붙여넣기 클릭

        // 2. KeyUp 이벤트에서 포맷을 재적용시킬지 설정한다.

        // 3. 출력여부를 설정한다.
        if ( bPasteKey ) return false ;
    }
}

//==============================================================================
// 용도     : 제한된 사용자정의 마스크 키프레스
// 문법     : gfnKeyPressLimitedUserDefineMask(objEvent As Object)
// 파라미터 : objEvent - 이벤트 개체
// 예제     : $("#txtLimited").keypress(gfnKeyPressLimitedUserDefineMask); // 키프레스
// 리턴값   : 없음
// 참고사항 : 마스크에 정의한 경우 문자만 입력할 수 있다.
// 기타     : 내부 호출용
// 작성일자 : 2011-09-20
//------------------------------------------------------------------------------
function gfnKeyPressLimitedUserDefineMask(objEvent)
{
    var bOutput = false ; // 출력 변수 선언 및 설정

    var jobjText = $(event.srcElement);
    //if ( jobjText.attr("readonly") == true ) return true ; // 읽기전용인 경우.. // 8. BackSpace
    if ( jobjText.prop("readOnly") ) return true; // 읽기전용인 경우..

    var strMaskStr = jobjText.attr(g_strUserDefineMaskMaskStrID); // 사용자정의 마스크 마스크문자열
    var nMaxLength = parseInt(jobjText.attr(g_strUserDefineMaskIntMaxLengthID), 10); // 사용자정의 마스크 최대길이

    var strSelectedText; // 선택된 텍스트

    if ( document.selection )
        strSelectedText = document.selection.createRange().text ;
    else
    if ( window.getSelection )
    {
        strSelectedText = jobjText.val().substring(jobjText[0].selectionStart, jobjText[0].selectionEnd);
    }

    // 선택된 텍스트유무에 따라 처리한다.
    if ( strSelectedText.length > 0 ) // 선택된 텍스트가 있을 경우..
    {
        // 2. KeyUp 이벤트에서 포맷을 재적용시킬지 설정한다.
        jobjText.attr(g_strUserDefineMaskFormatTargetYnID, "Y");

        // 3. 출력여부를 설정한다.
        bOutput = true ;
    }
    else
    {
        // 3. 출력여부를 설정한다.
        if ( strMaskStr.length > 0 && nMaxLength != 0 )
        {
            var strKeyVal = gfnGetKeyPressValUserDefineMask(objEvent["keyCode"]);

            if ( strKeyVal.length > 0 && strMaskStr.indexOf(strKeyVal) >= 0 )
            {
                if ( nMaxLength < 0 )
                    bOutput = true ;
                else
                if ( nMaxLength > 0 && jobjText.val().length < nMaxLength )
                    bOutput = true ;
            }
        }
    }

    return bOutput ; // 리턴 처리 - 출력 변수
}

//==============================================================================
// 용도     : 제한된 사용자정의 마스크 숫자 포맷
// 문법     : gfnFormatLimitedUserDefineMask(strInputVal As String, strMaskStr As String, nMaxLength As Integer)
// 파라미터 : 1. strInputVal - 입력값       (필수)
//            2. strMaskStr  - 마스크문자열 (필수)
//            3. nMaxLength  - 최대길이     (선택) 참고) 미입력시 -1 입력과 동일
// 예제     : 1. gfnFormatLimitedUserDefineMask(null); // null
//            2. gfnFormatLimitedUserDefineMask(""); // ""
//            3. gfnFormatLimitedUserDefineMask("ppurefool@ecosian.com", "abcdefghijklmnopqrstuvwxyz0123456789@.-_"); // ppurefool@ecosian.com
//            4. gfnFormatLimitedUserDefineMask("p!purefoo l@ecosian.com", "abcdefghijklmnopqrstuvwxyz1234567890-_.@"); // ppurefool@ecosian.com
//            5. gfnFormatLimitedUserDefineMask("`~!@#$%^&*()_+-=\\|", "`~!@#$%^&*()_+-=\\|"); // `~!@#$%^&*()_+-=\\|
//            6. gfnFormatLimitedUserDefineMask("[{]};:'\",<.>/?", "[{]};:'\",<.>/?"); // [{]};:'",<.>/?
// 리턴값   : String
// 참고사항 : 마스크는 한글을 제외한 문자들만으로 구성한다.
// 기타     : 내부 호출용
// 작성일자 : 2011-09-19
//------------------------------------------------------------------------------
function gfnFormatLimitedUserDefineMask(strInputVal, strMaskStr, nMaxLength)
{
    if ( nMaxLength == null ) nMaxLength = -1 ;

    // 출력 변수 선언 및 설정
    var strOutput = null ;

    if ( strInputVal != null ) // 데이터가 존재하는 경우
    {
        var strUnFormattedVal = gfnUnFormatLimitedUserDefineMask(strInputVal, strMaskStr, nMaxLength);

        strOutput = strUnFormattedVal ;
    }

    return strOutput ; // 리턴 처리 - 출력 변수
}

//==============================================================================
// 용도     : 제한된 사용자정의 마스크 포맷 해제
// 문법     : gfnUnFormatLimitedUserDefineMask(strInputVal As String, strMaskStr As String, nMaxLength As Integer)
// 파라미터 : 1. strInputVal - 입력값 개체
//            2. strMaskStr  - 마스크문자열
//            3. nMaxLength  - 최대길이
// 예제     : 1. gfnUnFormatLimitedUserDefineMask(null, "abcdefghijklmnopqrstuvwxyz1234567890-_.@", -1); // ""
//            2. gfnUnFormatLimitedUserDefineMask("", "abcdefghijklmnopqrstuvwxyz1234567890-_.@", -1); // ""
//            3. gfnUnFormatLimitedUserDefineMask("ppurefool@ecosian.com", "abcdefghijklmnopqrstuvwxyz1234567890-_.@", -1); // ppurefool@ecosian.com
//            4. gfnUnFormatLimitedUserDefineMask("p!purefoo l@ecosian.com", "abcdefghijklmnopqrstuvwxyz1234567890-_.@", -1); // ppurefool@ecosian.com
//            5. gfnUnFormatLimitedUserDefineMask("`~!@#$%^&*()_+-=\\|", "`~!@#$%^&*()_+-=\\|", -1); // `~!@#$%^&*()_+-=\\|
//            6. gfnUnFormatLimitedUserDefineMask("[{]};:'\",<.>/?", "[{]};:'\",<.>/?", -1); // [{]};:'\",<.>/?
//            7. gfnUnFormatLimitedUserDefineMask("Ppurefool@ecosian.com", "abcdefghijklmnopqrstuvwxyz1234567890-_.@", -1); // purefool@ecosian.com
// 리턴값   : String
// 참고사항 : 없음
// 기타     : 내부 호출용
// 작성일자 : 2011-09-19
//------------------------------------------------------------------------------
function gfnUnFormatLimitedUserDefineMask(strInputVal, strMaskStr, nMaxLength)
{
    var strOutput = "" ; // 출력 변수 선언 및 설정

    if ( strInputVal != null && strInputVal.toString().length > 0 ) // 데이터가 존재하는 경우
    {
        if ( strMaskStr == null ) strMaskStr = "" ;
        strMaskStr = strMaskStr.toString();

        if ( strMaskStr.length > 0 ) strMaskStr = strMaskStr.replace(/\\/, "\\\\").replace(/\[/, "\\[").replace(/\]/, "\\]").replace(/\-/, "\\-");//.replace(/\n/, "\\n").replace(/\t/, "\\t").replace(/\r/, "\\r");

        if ( strMaskStr.length > 0 )
        {
            if ( nMaxLength < 0 )
                strOutput = strInputVal.replace(eval("/[^" + strMaskStr + "]/g"), "");
            else
            if ( nMaxLength > 0 )
                strOutput = strInputVal.replace(eval("/[^" + strMaskStr + "]/g"), "").substr(0, nMaxLength);
        }
    }

    return strOutput ; // 리턴 처리 - 출력 변수
}

//==============================================================================
// 용도     : 제한된 사용자정의 마스크 포맷대상여부 해제
// 문법     : gfnReleaseFormatTargetYnLimitedUserDefineMask(jobjText As Object, bChangeCursor As Boolean)
// 파라미터 : 1. jobjText      - 텍스트 개체 (필수)
//            2. bChangeCursor - 커서변경    (선택) 참고) 미입력시 true 입력과 동일
// 예제     : gfnReleaseFormatTargetYnLimitedUserDefineMask($("#txtEmail"));
// 리턴값   : 없음
// 참고사항 : 없음
// 기타     : 내부 호출용
// 작성일자 : 2011-09-16
//------------------------------------------------------------------------------
function gfnReleaseFormatTargetYnLimitedUserDefineMask(jobjText, bChangeCursor)
{
    if ( bChangeCursor == null ) bChangeCursor = true ;

    if ( jobjText.attr(g_strUserDefineMaskFormatTargetYnID) == "Y" ) // 사용자정의 마스크 포맷대상여부 체크
    {
        jobjText.attr(g_strUserDefineMaskFormatTargetYnID, "N"); // 속성 설정

        var strVal = gfnFormatLimitedUserDefineMask(jobjText.val(), jobjText.attr(g_strUserDefineMaskMaskStrID), parseInt(jobjText.attr(g_strUserDefineMaskIntMaxLengthID), 10));

        gfnSetValUserDefineMask(jobjText, strVal, bChangeCursor); // 사용자정의 마스크 값 설정
    }
}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 컨텍스트 메뉴 관련
//==============================================================================

//==============================================================================
// 용도     : 사용자정의 마스크 컨텍스트 메뉴 보여주기
// 문법     : gfnShowUserDefineMaskContextMenu(objEvent As Object)
// 파라미터 : objEvent - 이벤트 개체
// 예제     : gfnShowUserDefineMaskContextMenu(); // 사용자정의 마스크 컨텍스트 메뉴 보여주기
// 리턴값   : 없음
// 참고사항 : 없음
// 기타     : 내부 호출용
// 작성일자 : 2011-09-27
//------------------------------------------------------------------------------
function gfnShowUserDefineMaskContextMenu(objEvent)
{
    return; // 컨텍스트 메뉴 삭제
// 컨텍스트 메뉴를 추가한다.
    if ($("#" + g_strUserDefineMaskContextMenuObjID).length <= 0 )
    {
        $("body").append
        (
            '<style>' +
                'ul.UserDefineMaskContextMenu li { cursor: hand }' +
                'ul.UserDefineMaskContextMenu li.hover { background-color: lightgray }' +
            '</style>' +
            '<div id="' + g_strUserDefineMaskContextMenuObjID + '" style="display: none; position: absolute; width: 85px; height: 110px; z-index: 10000" onselectstart="javascript: return false ;" oncontextmenu="javascritp: return false ;">' +
                '<iframe name="namNoTabContents" marginwidth="0" marginheight="0" frameborder="0" vspace="0" hspace="0" scrolling="no" style="z-index: 0; position: absolute; top: 0; left: 0; width: 85px; height: 120px"></iframe><!-- IE6 에서 해당 레이어 밑에 있는 콤보박스가 보이는 문제를 해결하기위해 추가함. //-->' +
                '<input type="hidden" id="' + g_strUserDefineMaskTargetObjID + '" value="" />' +
                '' +
                '<div style="background-color: white; border: solid 1px gray; position: absolute; top: 0; left: 0">' +
                    '<ul class="UserDefineMaskContextMenu">' +
                        '<li style="padding: 7px 15px 3px 15px" onmouseover=\'javascript: $(this).attr("class", "Hover");\' onmouseout=\'javascript: $(this).removeAttr("class");\' onmousedown="javascript: gfnClickCutUserDefineMask();">잘라내기</li>' +
                        '<li style="padding: 3px 15px 3px 15px" onmouseover=\'javascript: $(this).attr("class", "Hover");\' onmouseout=\'javascript: $(this).removeAttr("class");\' onmousedown="javascript: gfnClickCopyUserDefineMask();">복사</li>' +
                        '<li style="padding: 3px 15px 3px 15px" onmouseover=\'javascript: $(this).attr("class", "Hover");\' onmouseout=\'javascript: $(this).removeAttr("class");\' onmousedown="javascript: gfnClickPasteUserDefineMask();">붙여넣기</li>' +
                        '<li style="border-bottom: solid 1px gray; padding: 3px 15px 7px 15px" onmouseover=\'javascript: $(this).attr("class", "Hover");\' onmouseout=\'javascript: $(this).removeAttr("class");\' onmousedown="javascript: gfnClickDeleteUserDefineMask();">삭제</li>' +
                        '<li style="padding: 5px 15px 5px 15px" onmouseover=\'javascript: $(this).attr("class", "Hover");\' onmouseout=\'javascript: $(this).removeAttr("class");\' onclick="javascript: gfnClickSelectAllUserDefineMask();">모두 선택</li>' +
                    '</ul>' +
                '</div>' +
            '</div>'
        );
        $(document).click(function() { $("#" + g_strUserDefineMaskContextMenuObjID).each(function() { $(this).css("display", "none"); }); });
    }

// 컨텍스트 메뉴를 보여준다.
    if ($("#" + g_strUserDefineMaskContextMenuObjID).length > 0 )
    {
        $("#" + g_strUserDefineMaskContextMenuObjID).css("top", objEvent.pageY).css("left", objEvent.pageX).fadeIn(100); //.css("display", "inline");
if ( gfnIsEmpty(event["srcElement"].id) ) event["srcElement"].id = event["srcElement"].uniqueID;
        $("#" + g_strUserDefineMaskTargetObjID).val(event["srcElement"].id);
    }
}