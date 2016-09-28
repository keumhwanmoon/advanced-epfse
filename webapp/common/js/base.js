//==============================================================================
// 전역변수 관련
//==============================================================================

var Base = {
    "EMPTYSTR": "", "YES": "Y", "NO": "N", "DELI1": "|" // 빈문자열 // 여 // 부 // 구분자

    // 출력 결과변수
  , "RSLT_NO": "rsltNo", "RSLT_LIST": "rsltList", "RSLT_INFO": "rsltInfo" // 결과번호 // 결과목록 // 결과정보
  , "OK": 1, "NO_ADDR": -1010, "NO_MENU": -1030, "NO_AUTH": -1050, "NO_DATA": -1100, "NOT_EXIST": -1110 // 결과번호
  , "DATA_DUP": -1200

  // 기호
  , "EQUAL": "=", "AND": "&", "ZERO": "0", "DOT": "."
  , "MINUS": "-", "SPACE": " ", "COLON": ":", "PLUS": "+"

    // 포맷/포맷해제 유형
  , "NUM": "NUM", "STR_NUM": "STR_NUM", "DTM": "DTM", "TIME": "TIME"
  , "DATE": "DATE", "BZNO": "BZNO", "CORPNO": "CORPNO"
  , "POST": "POST", "YN": "YN"

    // cf.) index.jsp, menuJquery.js 등 에서 설정한다.
  , "msgReqError" : null // 오류가 발생했습니다. 관리자에게 문의하십시오.
  , "msgRsltError": null // 요청결과 오류가 발생했습니다. 관리자에게 문의하십시오.
  , "msgNoAddr"   : null // [개발오류] 화면주소명이 누락되었습니다.
  , "msgNoMenu"   : null // [개발오류] 메뉴정보가 존재하지 않습니다.
  , "msgLoginNeed": null // 로그인이 필요합니다.
  , "msgDiff"     : null // 아이디 또는 비밀번호가 일치하지 않습니다. 다시 확인하십시오.
  , "msgNoUse"    : null // 사용할 수 없는 사용자입니다. 관리자에게 문의하십시오.
  , "msgSaveOk"   : null // 저장이 완료되었습니다.

  , "WRITE_AUTH": 7, "READ_AUTH": 5

  , "comboTextYes": null, "comboTextNo": null // menu.jsp 에서 설정한다.
};

//==============================================================================
// 초기화 관련
//==============================================================================

//==============================================================================
// 용도     : 초기화
// 파라미터 :
// 리턴값   :
// 참고사항 : 업무화면 ready 이벤트핸들러 함수에서 호출한다.
//            baseJquery 를 include 한다.
// 기타     : 개발자 배포용
// 작성일자 : 2014-04-10
//------------------------------------------------------------------------------
function gfnInit()
{
    gfnInitPgbar(); // PROGRESSBAR 초기화
    gfnInitJquery(); // jQuery 초기화
}

//==============================================================================
// 메시지/팝업화면/대화창 관련
//==============================================================================

//==============================================================================
// 용도     : 메시지 확인
// 파라미터 : 1. strMsg  - 메시지
//            2. strSffx - 접미사
// 리턴값   : Boolean
// 참고사항 :
// 기타     : 개발자 배포용
// 작성일자 : 2014-04-10
//------------------------------------------------------------------------------
function gfnCnfmMsg(strMsg, strSffx)
{
    return window.confirm(( gfnIsEmpty(strMsg) ? Base.EMPTYSTR :
        strMsg + ( !gfnIsEmpty(strSffx) ? Base.SPACE + Base.COLON + Base.SPACE + strSffx : Base.EMPTYSTR ) ));
}

//==============================================================================
// 용도     : 메시지 표시
// 파라미터 : 1. strMsg  - 메시지
//            2. strSffx - 접미사
//            3. objTarg - 대상
// 리턴값   :
// 참고사항 :
// 기타     : 개발자 배포용
// 작성일자 : 2014-04-18
//------------------------------------------------------------------------------
function gfnDispMsg(strMsg, strSffx, objTarg)
{
    window.alert(( gfnIsEmpty(strMsg) ? Base.EMPTYSTR :
        strMsg + ( !gfnIsEmpty(strSffx) ? Base.SPACE + Base.COLON + Base.SPACE + strSffx : Base.EMPTYSTR ) ));

    if ( null != objTarg ) gfnFocus(objTarg);
}

//==============================================================================
// 검증 관련
//==============================================================================

//==============================================================================
// 용도     : 입력여부 검증
// 파라미터 : 1. strTargName - 대상명
//            2. objTarg     - 대상
//            3. strMsg      - 메시지 ex.) 해당 항목을 입력하십시오., 해당 항목을 변경하십시오.
// 리턴값   : Boolean
// 참고사항 : 대상 객체가 로드된 후 사용할 수 있다.
//            메시지를 표시한다.
// 기타     : 개발자 배포용
// 작성일자 : 2014-04-18
//------------------------------------------------------------------------------
function gfnVerifInputYn(strTargName, objTarg, strMsg)
{
    var obj = ( "string" == typeof objTarg ? eval(objTarg) : objTarg );

    var OUTPT = !gfnIsEmpty(obj.value);
    if ( !OUTPT ) gfnDispMsg(strMsg, strTargName, objTarg);

    obj = null;
    return OUTPT;
}

//==============================================================================
// 용도     : 길이 검증
// 파라미터 : 1. strTargName - 대상명
//            2. objTarg     - 대상
//            3. numMaxLngth - 최대길이(선택) cf.) 미입력시 maxlength 속성값에 2 를 곱해 사용한다.
//            4. strMsg      - 메시지         ex.) 해당 항목값의 길이가 최대값을 초과하였습니다.
// 리턴값   : Boolean
// 참고사항 : 대상 객체가 로드된 후 사용할 수 있다.
//            메시지를 표시한다.
// 기타     : 개발자 배포용
// 작성일자 : 2014-04-18
//------------------------------------------------------------------------------
function gfnVerifLngth(strTargName, objTarg, numMaxLngth, strMsg)
{
    var obj = ( "string" == typeof objTarg ? eval(objTarg) : objTarg );

    var blnOutpt = false;

    var MAX_LNGTH = ( null != numMaxLngth ? numMaxLngth : gfnGetInt(obj.maxLength) * 2 );
    var VALUE = obj.value;

    if ( !gfnIsEmpty(VALUE) && MAX_LNGTH < gfnGetByteSize(VALUE) ) // NULL여부 체크 // BYTE 크기 체크
        gfnDispMsg(strMsg, strTargName + ", Max. = " + numMaxLngth.toString(), objTarg);
    else
        blnOutpt = true;

    obj = null;
    return blnOutpt;
}

//==============================================================================
// 용도     : 숫자 길이 검증
// 파라미터 : 1. strTargName    - 대상명
//            2. objTarg        - 대상
//            3. numIntMaxLngth - 정수최대길이
//            4. numDecMaxLngth - 소수최대길이
//            5. strMsg         - 메시지 ex.) 해당 항목값이 잘못되었습니다.
// 리턴값   : Boolean
// 참고사항 : 대상 객체가 로드된 후 사용할 수 있다.
//            메시지를 표시한다.
// 기타     : 개발자 배포용
// 작성일자 : 2014-04-10
//------------------------------------------------------------------------------
function gfnVerifNumLngth(strTargName, objTarg, numIntMaxLngth, numDecMaxLngth, strMsg)
{
    var obj = ( "string" == typeof objTarg ? eval(objTarg) : objTarg );

    var blnOutpt = false;

    var strValue = gfnUnformt(obj.value, Base.NUM);

    if ( gfnIsNum(strValue) )
    {
        // 음수인 경우 부호를 제외한 다음 그 길이를 체크한다.
        if ( 0 <= strValue.indexOf(Base.MINUS) ) strValue = strValue.substr(1);

        if ( 0 > strValue.indexOf(Base.DOT) )
        {
            if ( numIntMaxLngth >= strValue.length ) blnOutpt = true;
        } else
        {
            var arrValue = strValue.split(Base.DOT);

            // #.## 형태가 아닌 경우
            if ( 2 == arrValue.length )
            {
                if ( !gfnIsEmpty(arrValue[0]) && !gfnIsEmpty(arrValue[1]) &&
                     numIntMaxLngth >= arrValue[0].length &&
                     numDecMaxLngth >= arrValue[1].length ) blnOutpt = true;
            }

            arrValue = null;
        }
    }

    if ( !blnOutpt )
        gfnDispMsg(strMsg, strTargName + ", NUMBER(" + ( numIntMaxLngth + numDecMaxLngth ).toString() +
                "," + numDecMaxLngth.toString() + ")", objTarg);

    obj = null;
    return blnOutpt;
}

//==============================================================================
// 용도     : 숫자 최소 최대 검증
// 파라미터 : 1. strTargName - 대상명
//            2. objTarg     - 대상
//            3. numMinValue - 최소값(선택)
//            4. numMaxValue - 최대값(선택)
//            5. strMsg    - 메시지 ex.) 해당 항목값이 잘못되었습니다.
// 리턴값   : Boolean
// 참고사항 : 대상 객체가 로드된 후 사용할 수 있다.
//            메시지를 표시한다.
// 기타     : 개발자 배포용
// 작성일자 : 2014-04-18
//------------------------------------------------------------------------------
function gfnVerifNumMinMax(strTargName, objTarg, numMinValue, numMaxValue, strMsg)
{
    var obj = ( "string" == typeof objTarg ? eval(objTarg) : objTarg );

    var blnOutpt = false;

    var VALUE = gfnGetNum(gfnUnformt(obj.value, Base.NUM));

    if ( gfnIsNum(numMinValue) && gfnIsNum(numMaxValue) )
    {
        if ( numMinValue <= VALUE && numMaxValue >= VALUE ) blnOutpt = true;
    } else
    if ( gfnIsNum(numMinValue) )
    {
        if ( numMinValue <= VALUE ) blnOutpt = true;
    } else
    if ( gfnIsNum(numMaxValue) )
    {
        if ( numMaxValue >= VALUE ) blnOutpt = true;
    } else
    {
        blnOutpt = true;
    }

    if ( !blnOutpt )
    {
        if ( gfnIsNum(numMinValue) && gfnIsNum(numMaxValue) )
            gfnDispMsg(strMsg, strTargName + ", " + numMinValue.toString() +
                " ~ " + numMaxValue.toString(), objTarg);
        else
        if ( gfnIsNum(numMinValue) )
            gfnDispMsg(strMsg, strTargName + ", Min. = " + numMinValue.toString(), objTarg);
        else
        if ( gfnIsNum(numMaxValue) )
            gfnDispMsg(strMsg, strTargName + ", Max. = " + numMaxValue.toString(), objTarg);
    }

    obj = null;
    return blnOutpt;
}

//==============================================================================
// 용도     : 일자 검증
// 파라미터 : 1. strTargName - 대상명
//            2. objTarg     - 대상
//            3. strMsg      - 메시지 ex.) 해당 항목값이 잘못되었습니다.
// 리턴값   : Boolean
// 참고사항 : 대상 객체가 로드된 후 사용할 수 있다.
//            메시지를 표시한다.
//            값이 빈 경우 true 를 리턴한다.
// 기타     : 개발자 배포용
// 작성일자 : 2014-04-18
//------------------------------------------------------------------------------
function gfnVerifDate(strTargName, objTarg, strMsg)
{
    var obj = ( "string" == typeof objTarg ? eval(objTarg) : objTarg );

    var OUTPT = ( gfnIsEmpty(obj.value) || gfnCheckDate(obj.value) );

    if ( !OUTPT ) gfnDispMsg(strMsg, strTargName, objTarg);

    obj = null;
    return OUTPT;
}

//==============================================================================
// 용도     : 년도 검증
// 파라미터 : 1. strTargName - 대상명
//            2. objTarg     - 대상
//            3. strMsg      - 메시지 ex.) 해당 항목값이 잘못되었습니다.
// 리턴값   : Boolean
// 참고사항 : 대상 객체가 로드된 후 사용할 수 있다.
//            메시지를 표시한다.
//            값이 빈 경우 true 를 리턴한다.
// 기타     : 개발자 배포용
// 작성일자 : 2014-05-09
//------------------------------------------------------------------------------
function gfnVerifYear(strTargName, objTarg, strMsg)
{
    var obj = ( "string" == typeof objTarg ? eval(objTarg) : objTarg );

    var OUTPT = ( gfnIsEmpty(obj.value) || ( 4 == obj.value.length && 1900 <= gfnGetInt(obj.value) ) );

    if ( !OUTPT ) gfnDispMsg(strMsg, strTargName, objTarg);

    obj = null;
    return OUTPT;
}

//==============================================================================
// 용도     : 기간 검증
// 파라미터 : 1. strTermName  - 기간명
//            2. objStartTarg - 시작대상
//            3. objEndTarg   - 종료대상
//            4. strMsg       - 메시지 ex.) 해당 항목값이 잘못되었습니다.
// 리턴값   : Boolean
// 참고사항 : 대상 객체가 로드된 후 사용할 수 있다.
//            메시지를 표시한다.
// 기타     : 개발자 배포용
// 작성일자 : 2014-04-18
//------------------------------------------------------------------------------
function gfnVerifTerm(strTermName, objStartTarg, objEndTarg, strMsg)
{
    var objStart = ( "string" == typeof objStartTarg ? eval(objStartTarg) : objStartTarg );
    var objEnd   = ( "string" == typeof objEndTarg   ? eval(objEndTarg  ) : objEndTarg   );

    var blnOutpt = false;

    if ( gfnCheckDate(objStart.value) && gfnCheckDate(objEnd.value) )
    {
        if ( objStart.value <= objEnd.value ) blnOutpt = true;
    }

    if ( !blnOutpt ) gfnDispMsg(strMsg, strTermName, objStartTarg);

    objEnd = null; objStart = null;
    return blnOutpt;
}

//==============================================================================
// 용도     : 법인등록번호 검증
// 파라미터 : 1. strTargName - 대상명
//            2. objTarg     - 대상
//            3. strMsg      - 메시지 ex.) 해당 항목값이 잘못되었습니다.
// 리턴값   : Boolean
// 참고사항 : 대상 객체가 로드된 후 사용할 수 있다.
//            메시지를 표시한다.
// 기타     : 개발자 배포용
// 작성일자 : 2014-04-18
//------------------------------------------------------------------------------
function gfnVerifCorpno(strTargName, objTarg, strMsg)
{
    var obj = ( "string" == typeof objTarg ? eval(objTarg) : objTarg );

    var blnOutpt = false;

    var VALUE = obj.value;

    if ( !gfnIsEmpty(VALUE) && 14 == VALUE.length ) blnOutpt = true;

    if ( !blnOutpt ) gfnDispMsg(strMsg, strTargName, objTarg);

    obj = null;
    return blnOutpt;
}

//==============================================================================
// 용도     : 사업자등록번호 검증
// 파라미터 : 1. strTargName - 대상명
//            2. objTarg     - 대상
//            3. strMsg      - 메시지 ex.) 해당 항목값이 잘못되었습니다.
// 리턴값   : Boolean
// 참고사항 : 대상 객체가 로드된 후 사용할 수 있다.
//            메시지를 표시한다.
// 기타     : 개발자 배포용
// 작성일자 : 2014-04-18
//------------------------------------------------------------------------------
function gfnVerifBzno(strTargName, objTarg, strMsg)
{
    var obj = ( "string" == typeof objTarg ? eval(objTarg) : objTarg );

    var blnOutpt = false;

    var VALUE = obj.value;

    if ( !gfnIsEmpty(VALUE) && 12 == VALUE.length ) blnOutpt = true;

    if ( !blnOutpt ) gfnDispMsg(strMsg, strTargName, objTarg);

    obj = null;
    return blnOutpt;
}

//==============================================================================
// HTML 객체 관련
//==============================================================================

//==============================================================================
// 용도     : 포커스
// 파라미터 : objTarg - 대상
// 리턴값   :
// 참고사항 : 대상 객체가 로드된 후 사용할 수 있다.
//            비활성된 객체는 제외한다.
//            텍스트를 직접 입력하는 항목의 경우 select 한다.
// 기타     : 개발자 배포용
// 작성일자 : 2014-04-18
//------------------------------------------------------------------------------
function gfnFocus(objTarg)
{
    var obj = ( "string" == typeof objTarg ? eval(objTarg) : objTarg );

    if ( !obj.disabled )
    {
        var TAG_NAME = obj.tagName.toLowerCase();

        if ( "input" == TAG_NAME )
        {
            if ( 0 <= "text,password".indexOf(obj.type.toLowerCase()) )
                obj.select(); // 선택
        } else
        if ( "textarea" == TAG_NAME )
        {
            obj.select(); // 선택
        } else
        {
            obj.focus(); // 포커스
        }
    }

    obj = null;
}

//==============================================================================
// 용도     : 활성여부 설정
// 파라미터 : 1. blnEnablYn - 활성
//            2. objTarg    - 대상
// 리턴값   :
// 참고사항 : 관련 항목들에 대하여 readonly 를 설정하거나 disabled 를 설정한다.
// 기타     : 개발자 배포용
// 작성일자 : 2014-04-10
//------------------------------------------------------------------------------
function gfnSetEnablYn(blnEnabl, objTarg)
{
    var obj = ( "string" == typeof objTarg ? eval(objTarg) : objTarg );

    var TAG_NAME = obj.tagName.toLowerCase();
    var TYPE     = obj.type.toLowerCase();

    if ( ( "input" == TAG_NAME && "text" == TYPE ) || "textarea" == TAG_NAME )
    {
        obj.readOnly = !blnEnabl;
        obj.style.backgroundColor = ( blnEnabl ? "#ffffff" : "#efefef" );
        obj.style.color = ( blnEnabl ? "#000000" : "#999" );
    } else
    if ( ( "input" == TAG_NAME && ( "radio" == TYPE || "checkbox" == TYPE ) ) || "select" == TAG_NAME )
    {
        obj.disabled = !blnEnabl;
    }

    obj = null;
}

//==============================================================================
// 변수 관련
//==============================================================================

//==============================================================================
// 용도     : 빈 문자열
// 파라미터 : objData - 데이터
// 리턴값   : Boolean
// 참고사항 :
// 기타     : 개발자 배포용
// 작성일자 : 2014-04-10
//------------------------------------------------------------------------------
function gfnIsEmpty(objData)
{
    return ( null == objData || 0 >= objData.toString().length );
}

//==============================================================================
// 용도     : ZERO
// 파라미터 : objData - 데이터
// 리턴값   : Boolean
// 참고사항 :
// 기타     : 개발자 배포용
// 작성일자 : 2014-04-10
//------------------------------------------------------------------------------
function gfnIsZero(objData)
{
    return ( gfnIsNum(objData) && parseFloat(objData) == 0.0 );
}

//==============================================================================
// 용도     : 빈 공백
// 파라미터 : objData - 데이터
// 리턴값   : Boolean
// 참고사항 :
// 기타     : 개발자 배포용
// 작성일자 : 2014-06-16
//------------------------------------------------------------------------------
function gfnIsEmptySpace(objData)
{
    return ( null == objData || 0 >= objData.toString().replace(/ /g, Base.EMPTYSTR).length );
}

//==============================================================================
// 용도     : 숫자 여부
// 파라미터 : objData - 데이터
// 리턴값   : Boolean
// 참고사항 :
// 기타     : 개발자 배포용
// 작성일자 : 2014-04-10
//------------------------------------------------------------------------------
function gfnIsNum(objData)
{
    return ( !gfnIsEmpty(objData) && isFinite(objData) && !isNaN(objData) );
}

//==============================================================================
// 용도     : 일자 체크
// 파라미터 : strData - 데이터
// 리턴값   : Boolean
// 참고사항 :
// 기타     : 개발자 배포용
// 작성일자 : 2014-04-10
//------------------------------------------------------------------------------
function gfnCheckDate(strData)
{
    var VALUE = gfnUnformt(strData, Base.STR_NUM);
    var blnOutpt = ( !gfnIsEmpty(VALUE) && 8 == VALUE.length && gfnCheckMonth(VALUE.substr(4, 2)) &&
            gfnCheckDay(VALUE.substr(0, 4), VALUE.substr(4, 2), VALUE.substr(6, 2)) );
    if ( !blnOutpt )
        blnOutpt = ( !gfnIsEmpty(VALUE) && 6 == VALUE.length && gfnCheckMonth(VALUE.substr(4, 2)) );

    return blnOutpt;
}

//==============================================================================
// 용도     : 년월 체크
// 파라미터 : strData - 데이터
// 리턴값   : Boolean
// 참고사항 :
// 기타     : 개발자 배포용
// 작성일자 : 2014-04-10
//------------------------------------------------------------------------------
function gfnCheckYm(strData)
{
    var VALUE = gfnUnformt(strData, Base.STR_NUM);

    return ( !gfnIsEmpty(VALUE) && 8 == VALUE.length && gfnCheckMonth(VALUE.substr(4, 2)) );
}

//==============================================================================
// 용도     : 년도 체크
// 파라미터 : objData - 데이터
// 리턴값   : Boolean
// 참고사항 :
// 기타     : 내부 호출용
// 작성일자 : 2014-06-19
//------------------------------------------------------------------------------
function gfnCheckYear(objData)
{
    var YEAR = gfnGetInt(objData);

    return ( 1900 <= YEAR );
}

//==============================================================================
// 용도     : 월 체크
// 파라미터 : objData - 데이터
// 리턴값   : Boolean
// 참고사항 :
// 기타     : 내부 호출용
// 작성일자 : 2014-04-10
//------------------------------------------------------------------------------
function gfnCheckMonth(objData)
{
    var MONTH = gfnGetInt(objData);

    return ( MONTH >= 1 && MONTH <= 12 );
}

//==============================================================================
// 용도     : 일 체크
// 파라미터 : 1. objYear  - 년도
//            2. objMonth - 월
//            3. objDay    - 일
// 리턴값   : Boolean
// 참고사항 :
// 기타     : 내부 호출용
// 작성일자 : 2014-06-18
//------------------------------------------------------------------------------
function gfnCheckDay(objYear, objMonth, objDay)
{
    var DAY   = gfnGetInt(objDay  );
    return ( DAY >= 1 && DAY <= gfnGetLastDay(objYear, objMonth) );
}

//==============================================================================
// 용도     : 마지막 일 가져오기
// 파라미터 : 1. objYear  - 년도
//            2. objMonth - 월
//            3. objDay    - 일
// 리턴값   : Integer
// 참고사항 :
// 기타     : 개발자 호출용
// 작성일자 : 2014-06-18
//------------------------------------------------------------------------------
function gfnGetLastDay(objYear, objMonth)
{
    var YEAR  = gfnGetInt(objYear ), MONTH = gfnGetInt(objMonth);
    var arr = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
    if ( ( 0 == YEAR % 4 && 0 != YEAR % 100 ) || 0 == YEAR % 400 ) arr[1] = 29;
    var OUTPT = arr[MONTH - 1]; arr= null;
    return OUTPT;
}

//==============================================================================
// 용도     : 숫자 가져오기
// 파라미터 : objData - 데이터
// 리턴값   : Float
// 참고사항 :
// 기타     : 개발자 배포용
// 작성일자 : 2014-04-10
//------------------------------------------------------------------------------
function gfnGetNum(objData)
{
    return ( gfnIsNum(objData) ? parseFloat(objData) : 0.0 );
}

//==============================================================================
// 용도     : 정수 가져오기
// 파라미터 : objData - 데이터
// 리턴값   : Integer
// 참고사항 :
// 기타     : 개발자 배포용
// 작성일자 : 2014-04-10
//------------------------------------------------------------------------------
function gfnGetInt(objData)
{
    return ( gfnIsNum(objData) ? parseInt(objData, 10) : 0 );
}

//==============================================================================
// 용도     : 비교
// 파라미터 : 1. objVal - 값1
//            2. objVal2 - 값2
// 리턴값   : Integer - 0. =, 1. <, -1. >
// 참고사항 :
// 기타     : 개발자 배포용
// 작성일자 : 2014-04-10
//------------------------------------------------------------------------------
function gfnCompr(objVal, objVal2)
{
    var VALUE  = gfnGetNum(objVal);
    var VALUE2 = gfnGetNum(objVal2);

    if ( VALUE == VALUE2 )
        return 0;
    else
    if ( VALUE <  VALUE2 )
        return 1;
    else
        return -1;
}

//==============================================================================
// 용도     : BYTE 크기 가져오기
// 파라미터 : strData - 데이터
// 리턴값   : Integer
// 참고사항 :
// 기타     : 개발자 배포용
// 작성일자 : 2014-04-10
//------------------------------------------------------------------------------
function gfnGetByteSize(strData)
{
    var numOutpt = 0;

    if ( !gfnIsEmpty(strData) )
    {
        var LNGTH = strData.length;

        for ( var numIndex = 0; numIndex < LNGTH; numIndex++ )
        {
            if ( 3 < escape(strData.charAt(numIndex)).length )
                numOutpt += 2;
            else
                numOutpt++;
        }
    }

    return numOutpt;
}

//==============================================================================
// 용도     : 요일 코드 가져오기
// 파라미터 : strData - 데이터
// 리턴값   : String - "1". 일, "2". 월, ..., "7". 토
// 참고사항 :
// 기타     : 개발자 배포용
// 작성일자 : 2014-04-10
//------------------------------------------------------------------------------
function gfnGetDaywkCode(strData)
{
    var strOutpt = Base.EMPTYSTR; // 출력

    if ( gfnCheckDate(strData) )
    {
        var DATA = gfnUnformt(strData, Base.STR_NUM);

        var objDate = new Date(gfnGetInt(DATA.substr(0, 4)),
                gfnGetInt(DATA.substr(4, 2)) - 1, gfnGetInt(DATA.substr(6, 2)));

            strOutpt = ( objDate.getDay() + 1 ).toString();

        objDate = null;
    }

    return strOutpt;
}

//==============================================================================
// 용도     : 일 수 추가
// 파라미터 : 1. strData  - 데이터
//            2. numCount - 수
// 리턴값   : String
// 참고사항 : strData 가 YYYYMMDD 형태의 문자열이 아닌 경우 그대로 리턴된다.
// 기타     : 개발자 배포용
// 작성일자 : 2014-04-10
//------------------------------------------------------------------------------
function gfnAddDayCount(strData, numCount)
{
    var strOutpt = gfnUnformt(strData, Base.STR_NUM);

    if ( gfnCheckDate(strOutpt) )
    {
        var objOutpt = new Date(strOutpt.substr(0, 4),
                gfnGetInt(strOutpt.substr(4, 2)) - 1, gfnGetInt(strOutpt.substr(6, 2)) + numCount);

        strOutpt =
            objOutpt.getFullYear().toString()
          + (Base.ZERO + (objOutpt.getMonth() + 1)).substr((objOutpt.getMonth() + 1).toString().length - 1, 2)
          + (Base.ZERO + objOutpt.getDate()).substr(objOutpt.getDate().toString().length - 1, 2)
        ;
    }

    return strOutpt;
}

//==============================================================================
// 용도     : 줄임표 가져오기
// 파라미터 : 1. objData     - 데이터(선택)
//            2. numMaxLngth - 최대길이(선택)
// 리턴값   : String
// 참고사항 :
// 기타     : 개발자 배포용
// 작성일자 : 2014-04-10
//------------------------------------------------------------------------------
function gfnGetEllps(objData, numMaxLngth)
{
    var strOutpt = objData;

    if ( !gfnIsEmpty(strOutpt) && null != numMaxLngth && 0 < numMaxLngth )
    {
        strOutpt = strOutpt.toString();

        if ( numMaxLngth < strOutpt.length )
            strOutpt = strOutpt.substr(0, numMaxLngth) + "…";
    }

    return strOutpt;
}

//==============================================================================
// 용도     : 포맷
// 파라미터 : 1. objData - 데이터
//            2. strType - 유형
//            3. numDecLngth - 소수길이(선택) cf.) 미입력시 -1 입력과 동일
// 리턴값   : String
// 참고사항 : strType 이 "NUMBER" 이고 numDecLngth 이 입력된 경우
//            numDecLngth + 1 자리에서 반올림한다.
// 기타     : 개발자 배포용
// 작성일자 : 2014-04-28
//------------------------------------------------------------------------------
// alert(gfnFormt("1000", Base.NUM)); // 1,000
// alert(gfnFormt("-1,000.22", Base.NUM)); // -1,000.22
// alert(gfnFormt("-1,000.227", Base.NUM, 2)); // -1,000.23
// alert(gfnFormt("-1,000.2", Base.NUM, 2)); // -1,000.20
// alert(gfnFormt("1231212345", Base.BZNO)); // 123-12-12345
// alert(gfnFormt("123-12-12345", Base.BZNO)); // 123-12-12345
// alert(gfnFormt("20100101", Base.DATE)); // 2010-01-01
// alert(gfnFormt("2010-01-01", Base.DATE)); // 2010-01-01
// alert(gfnFormt("-", Base.NUM, null, true)); // -
// alert(gfnFormt("-", Base.NUM, null, false)); // ""
// alert(gfnFormt("-", Base.NUM, 0, false)); // 0
// alert(gfnFormt("-", Base.NUM, 2, false)); // 0.00
// alert(gfnFormt("-0", Base.NUM, null, true)); // -0
// alert(gfnFormt("-0", Base.NUM, null, false)); // 0
// alert(gfnFormt("-0", Base.NUM, 0, false)); // 0
// alert(gfnFormt("-0", Base.NUM, 2, false)); // 0.00
// alert(gfnFormt("-.", Base.NUM, null, true)); // -0.
// alert(gfnFormt("-.", Base.NUM, null, false)); // ""
// alert(gfnFormt("-.", Base.NUM, 0, false)); // 0
// alert(gfnFormt("-.", Base.NUM, 2, false)); // 0.00
// alert(gfnFormt("-0.", Base.NUM, null, false)); // 0
// alert(gfnFormt("-0.", Base.NUM, 0, false)); // 0
// alert(gfnFormt("-0.", Base.NUM, 2, false)); // 0.00
// alert(gfnFormt("-0.0", Base.NUM, null, true)); // -0.0
// alert(gfnFormt("-0.0", Base.NUM, null, false)); // 0.0
// alert(gfnFormt("-0.0", Base.NUM, 0, false)); // 0
// alert(gfnFormt("-0.0", Base.NUM, 2, false)); // 0.00
// alert(gfnFormt("-1,,234.62.36", Base.NUM, null, true)); // -1,234.6236
// alert(gfnFormt("-1,,234.62.36", Base.NUM, null, false)); // -1,234.6236
// alert(gfnFormt("-1,,234.62.36", Base.NUM, 0, false)); // -1,235
// alert(gfnFormt("-1,,234.62.36", Base.NUM, 3, false)); // -1,234.624
// alert(gfnFormt("123.999", Base.NUM, 2)); // 124.00
// alert(gfnFormt("-0.89", Base.NUM));
// alert("gfnFormt(1234.0000, NUMBER) => " + gfnFormt("1234.0000", Base.NUM) + "\n" + // 1,234
//       "gfnFormt(1234.0001, NUMBER) => " + gfnFormt("1234.0001", Base.NUM) + "\n" + // 1,234.0001
//       "gfnFormt(1234.000100, NUMBER) => " + gfnFormt("1234.000100", Base.NUM) + "\n" + // 1,234.0001
//       "gfnFormt(1234.0001001, NUMBER) => " + gfnFormt("1234.0001001", Base.NUM) + "\n" + // 1,234.0001001
//       "gfnFormt(1234.0000, NUMBER, 0) => " + gfnFormt("1234.0000", Base.NUM, 0) + "\n" + // 1,234
//       "gfnFormt(1234.0000, NUMBER, 1) => " + gfnFormt("1234.0000", Base.NUM, 1) + "\n" + // 1,234.0
//       "gfnFormt(1234.0000, NUMBER, 2) => " + gfnFormt("1234.0000", Base.NUM, 2) + "\n" // 1,234.00
//       );
//alert(gfnFormt("20120101112233", Base.DTM)); // 2012-01-01 11:22:33
//alert(gfnFormt("112233", Base.TIME)); // 11:22:33
function gfnFormt(objData, strType, numDecLngth)
{
    if ( null == numDecLngth ) numDecLngth = -1;

    var strOutpt = ( null != objData ? objData.toString() : null );

    if ( !gfnIsEmpty(strOutpt) )
    {
        var strUnFormt = gfnUnformt(strOutpt, strType);
        var strDeli;

        strOutpt = strUnFormt;

        if ( Base.YN == strType ) // 여부
        {
            if ( Base.YES == strOutpt ) strOutpt = Base.comboTextYes;
            else
            if ( Base.NO  == strOutpt ) strOutpt = Base.comboTextNo;
        } else
        if ( Base.DTM == strType ) // 일시
        {
            if ( !gfnIsEmpty(strUnFormt) ) // 적용된 포맷을 제거한 데이터가 존재하는 경우
            {
                var LNGTH = strUnFormt.length;

                strDeli = Base.SPACE;

                if ( 14 == LNGTH ) // ##:##:## 형태인 경우
                    strOutpt =
                        gfnFormt(strUnFormt.substr(0, 8), Base.DATE) + strDeli
                      + gfnFormt(strUnFormt.substr(8, 6), Base.TIME)
                    ;
                else
                if ( 12 == LNGTH ) // ##:## 형태인 경우
                    strOutpt =
                        gfnFormt(strUnFormt.substr(0, 8), Base.DATE) + strDeli
                      + gfnFormt(strUnFormt.substr(8, 4), Base.TIME)
                    ;
            }
        } else
        if ( Base.TIME == strType ) // 시각
        {
            if ( !gfnIsEmpty(strUnFormt) ) // 적용된 포맷을 제거한 데이터가 존재하는 경우
            {
                strDeli = Base.COLON;

                if ( 6 == strUnFormt.length ) // ##:##:## 형태인 경우
                {
                    strOutpt =
                        strUnFormt.substr(0, 2) + strDeli
                      + strUnFormt.substr(2, 2) + strDeli
                      + strUnFormt.substr(4, 2)
                    ;
                } else
                if ( 4 == strUnFormt.length ) // ##:## 형태인 경우
                {
                    strOutpt =
                        strUnFormt.substr(0, 2) + strDeli
                      + strUnFormt.substr(2, 2)
                    ;
                }
            }
        } else
        if ( Base.DATE == strType ) // 날짜
        {
            if ( !gfnIsEmpty(strUnFormt) ) // 적용된 포맷을 제거한 데이터가 존재하는 경우
            {
                strDeli = Base.MINUS; // 구분자 변수 설정

                if ( 6 < strUnFormt.length ) // YYYYMMDD 형태인 경우
                {
                    strOutpt =
                        strUnFormt.substr(0, 4) + strDeli
                      + strUnFormt.substr(4, 2) + strDeli
                      + strUnFormt.substr(6, 2)
                    ;
                } else
                if ( 4 < strUnFormt.length ) // YYYYMM 형태인 경우
                {
                    strOutpt =
                        strUnFormt.substr(0, 4) + strDeli
                      + strUnFormt.substr(4, 2)
                    ;
                }
            }
        } else
        if ( Base.NUM == strType ) // 숫자
        {
            if ( 0 > numDecLngth )
            {
                if ( !gfnIsEmpty(strUnFormt) ) // 적용된 포맷을 제거한 데이터가 존재하는 경우
                {
                    // cf.) 데이터가 숫자가 아니면 "" 로 리턴한다.

                    // 음수인지 체크한다.
                    var blnMinus = ( strUnFormt.substr(0, 1) == Base.MINUS );
                    // 음수이면 우선 부호를 떼어낸다.
                    if ( blnMinus ) strUnFormt = strUnFormt.substr(1);

                    // 정수부와 소수부를 배열에 나누어 저장한다.
                    var arrData = strUnFormt.split(Base.DOT);
                    // 소숫점 위치를 가져온다.
                    var numDecimalPos = strUnFormt.indexOf(Base.DOT);

                    if ( !gfnIsEmpty(arrData[1]) )
                    {
                        for ( var i = arrData[1].length - 1; i >= 0; i-- )
                        {
                            if ( arrData[1].charAt(i) == Base.ZERO )
                                arrData[1] = arrData[1].substr(0, i);
                            else
                                break;
                        }
                    }

                    // 출력될 값을 조립한다.
                    strOutpt =
                        ( 0 < arrData[0].length ? Number(arrData[0]).toLocaleString().split(Base.DOT)[0] : Base.EMPTYSTR )
                      + ( 0 <= numDecimalPos && !gfnIsEmpty(arrData[1]) ? Base.DOT + arrData[1] : Base.EMPTYSTR )
                    ;

                    strOutpt  = ( blnMinus && 0 < arrData[0].length ? Base.MINUS : Base.EMPTYSTR ) + strOutpt;

                    if ( blnMinus )
                    {
                        var strTmp = strOutpt.replace(/\./g, Base.EMPTYSTR).replace(/0/g, Base.EMPTYSTR).replace(/-/g, Base.EMPTYSTR);
                        if ( gfnIsEmpty(strTmp) ) strOutpt = strOutpt.substring(1);
                    }
                }
            }
            else
            {
                // cf.) 데이터가 숫자가 아니면 0 또는 0.0... 으로 리턴한다.

                // 적용된 포맷을 제거한 데이터가 존재하지 않는 경우 0 으로 설정한다.
                if ( gfnIsEmpty(strUnFormt) ) strUnFormt = Base.ZERO;

                // 음수인지 체크한다.
                var blnMinus = ( Base.MINUS == strUnFormt.substr(0, 1) );
                // 음수이면 우선 부호를 떼어낸다.
                if ( blnMinus ) strUnFormt = strUnFormt.substr(1);

                var numUnFormatData = parseFloat(strUnFormt);
                numUnFormatData = Math.round(numUnFormatData * Math.pow(10, numDecLngth)) / Math.pow(10, numDecLngth);
                strUnFormt = numUnFormatData.toString();

                // 정수부와 소수부를 배열에 나누어 저장한다.
                var arrData = strUnFormt.split(Base.DOT);
                if ( 1 < arrData.length )
                    arrData[1] += "000000000000000000000000000000";
                else
                    arrData[1]  = "000000000000000000000000000000";

                // 출력될 값을 조립한다.
                strOutpt =
                    ( blnMinus ? Base.MINUS : Base.EMPTYSTR )
                  + Number(String(arrData[0])).toLocaleString().slice(0, -3)
                ;
                if ( 0 < numDecLngth )
                    strOutpt += (Base.DOT + arrData[1]).substr(0, numDecLngth + 1);
            }
        } else
        if ( Base.BZNO == strType ) // 사업자등록번호
        {
            if ( !gfnIsEmpty(strUnFormt) ) // 적용된 포맷을 제거한 데이터가 존재하는 경우
            {
                strDeli = Base.MINUS; // 구분자 변수 설정

                if ( 5 < strUnFormt.length ) // ###-##-##### 형태인 경우
                {
                    strOutpt =
                        strUnFormt.substr(0, 3) + strDeli
                      + strUnFormt.substr(3, 2) + strDeli
                      + strUnFormt.substr(5, 5)
                    ;
                } else
                if ( 3 < strUnFormt.length ) // ###-## 형태인 경우
                {
                    strOutpt =
                        strUnFormt.substr(0, 3) + strDeli
                      + strUnFormt.substr(3, 2)
                    ;
                }
            }
        } else
        if ( Base.CORPNO == strType ) // 법인등록번호
        {
            if ( !gfnIsEmpty(strUnFormt) ) // 적용된 포맷을 제거한 데이터가 존재하는 경우
            {
                strDeli = Base.MINUS; // 구분자 변수 설정

                if ( 6 < strUnFormt.length ) // ######-####### 형태인 경우
                {
                    strOutpt =
                        strUnFormt.substr(0, 6) + strDeli
                      + strUnFormt.substr(6, 7)
                    ;
                }
            }
        } else
        if ( Base.POST == strType ) // 우편번호
        {
            if ( !gfnIsEmpty(strUnFormt) ) // 적용된 포맷을 제거한 데이터가 존재하는 경우
            {
                strDeli = Base.MINUS; // 구분자 변수 설정

                if ( 6 == strUnFormt.length ) // ###-### 형태인 경우
                {
                    strOutpt =
                        strUnFormt.substr(0, 3) + strDeli
                      + strUnFormt.substr(3)
                    ;
                }
                else
                {
                    strOutpt = strUnFormt;
                }
            }
        } else
        if ( "TXTAREA" == strType )
        {
            if ( !gfnIsEmpty(strUnFormt) ) // 적용된 포맷을 제거한 데이터가 존재하는 경우
            {
                strOutpt =
                    strUnFormt.replace(/\\t/g, "\t").replace(/\\r\\n/g, "\r\n").replace(/\\n/g, "\n");
            }
        }
    }

    return strOutpt;
}

//==============================================================================
// 용도     : 포맷해제
// 파라미터 : 1. objData - 데이터
//            2. strType - 유형 cf.) gfnFormt() 함수를 참조한다.
// 리턴값   : String
// 참고사항 : 주어진 데이터에 대하여 적용된 포맷을 제거한 데이터를 가져온다.
// 기타     : 개발자 배포용
// 작성일자 : 2014-04-10
//------------------------------------------------------------------------------
// alert(gfnUnformt("-1,000.26", Base.NUM)); // -1000.26
// alert(gfnUnformt("-", Base.NUM, true)); // -
// alert(gfnUnformt("-", Base.NUM, false)); // ""
// alert(gfnUnformt("-0", Base.NUM, true)); // -0
// alert(gfnUnformt("-0", Base.NUM, false)); // 0
// alert(gfnUnformt("-.", Base.NUM, true)); // -0.
// alert(gfnUnformt("-.", Base.NUM, false)); // ""
// alert(gfnUnformt("-0.", Base.NUM, true)); // -0.
// alert(gfnUnformt("-0.", Base.NUM, false)); // 0
// alert(gfnUnformt("-0.0", Base.NUM, true)); // -0.0
// alert(gfnUnformt("-0.0", Base.NUM, false)); // 0.0
// alert(gfnUnformt("-1,,234.12.34", Base.NUM, true)); // -1234.1234
// alert(gfnUnformt("-1,,234.12.34", Base.NUM, false)); // -1234.1234
// alert(gfnUnformt("123-12-12345", Base.STR_NUM)); // 1231212345
// alert(gfnUnformt("2010-01-01", Base.STR_NUM)); // 20100101
// alert(gfnUnformt("1,000.26-+", Base.NUM), true); // 1000.26
// alert(gfnUnformt("1,000.26-+", Base.NUM), false); // 1000.26
// alert(gfnUnformt("-0.89", Base.NUM)); // -0.89
function gfnUnformt(objData, strType)
{
    var strOutpt = objData; // 출력 변수 선언 및 설정

    if ( !gfnIsEmpty(objData) ) // 데이터가 존재하는 경우
    {
        strOutpt = objData.toString();

        if ( Base.STR_NUM == strType || Base.DTM == strType || Base.TIME == strType || Base.DATE == strType || Base.BZNO == strType || Base.CORPNO == strType || Base.POST == strType )
        {
            strOutpt = strOutpt.replace(/\D/g, Base.EMPTYSTR);
        } else
        if ( Base.NUM == strType )
        {
            // 음수인지 체크
            var blnMinus = false;
            if ( 0 <= strOutpt.lastIndexOf(Base.MINUS) ) blnMinus = true;
            if ( blnMinus )
            {
                if ( strOutpt.lastIndexOf(Base.MINUS) < strOutpt.lastIndexOf(Base.PLUS) ) blnMinus = false;
            }

            strOutpt = strOutpt.replace(/\-\+/g, Base.EMPTYSTR);

            var numDecimalPos = strOutpt.indexOf(Base.DOT);

            //var strInt = ( 0 < numDecimalPos ? strOutpt.substr(0, numDecimalPos) : ( 0 == numDecimalPos ? Base.EMPTYSTR : strOutpt ) );
            var strInt = ( 0 < numDecimalPos ? strOutpt.substr(0, numDecimalPos) : ( 0 == numDecimalPos ? Base.ZERO : strOutpt ) );
            strInt = strInt.replace(/\D/g, Base.EMPTYSTR);

            var strDec = ( 0 <= numDecimalPos ? strOutpt.substr(numDecimalPos + 1) : Base.EMPTYSTR );
            strDec = strDec.replace(/\D/g, Base.EMPTYSTR);

            strOutpt = ( blnMinus && 0 < strInt.length ? Base.MINUS : Base.EMPTYSTR ) + strInt + ( 0 < strDec.length ? Base.DOT + strDec : Base.EMPTYSTR );
            if ( blnMinus )
            {
                var strTmp = strOutpt.replace(/\./g, Base.EMPTYSTR).replace(/0/g, Base.EMPTYSTR).replace(/-/g, Base.EMPTYSTR);
                if ( gfnIsEmpty(strTmp) ) strOutpt = strOutpt.substring(1);
            }
        }
    }

    return strOutpt;
}

//==============================================================================
// 용도     : COALESCE
// 파라미터 : 1. strData - 데이터
//            2. strDflt - 기본 cf.) 미입력시 "" 입력과 동일
// 리턴값   : String
// 참고사항 :
// 기타     : 개발자 배포용
// 작성일자 : 2014-04-16
//------------------------------------------------------------------------------
function gfnCoalesce(strData, strDflt)
{
    if ( null == strDflt ) strDflt = Base.EMPTYSTR;

    return ( null != strData ? strData : strDflt );
}

//==============================================================================
// 용도     : 페이지 이동
// 파라미터 : strUrl   - URL
// 리턴값   :
// 참고사항 :
// 기타     : 개발자 배포용
// 작성일자 : 2014-04-24
//------------------------------------------------------------------------------
function gfnMovePage(strUrl, blnPostReq)
{
    var strContextPath = $("#hidComParamContextPatch").val();

    if (Base.EMPTYSTR != strContextPath) strUrl = strContextPath + strUrl;

    if (null == blnPostReq) blnPostReq = true;

    gfnDispPgbar(); // PROGRESSBAR 표시

    if (blnPostReq)
    {
        frmComPageReq.action = strUrl;
        frmComPageReq.submit();
    }
    else
    {
        window.location(strUrl);
    }
}

//==============================================================================
// 용도     : 오류 윈도우 설정
// 파라미터 : 1. strTitle - 제목
//            2. strUri   - URI
//            3. objData  - 데이터
//            4. objJson  - JSON
// 리턴값   : Object
// 참고사항 :
// 기타     : 내부 호출용
// 작성일자 : 2014-04-18
//------------------------------------------------------------------------------
function gfnOpenErrorWin(strTitle, strUri, objData, objJson)
{
    var objOutpt = window.open("/common/jsp/error.jsp", "_blank");

    var arrWrite = new Array(), numIndex = -1;

    arrWrite[++numIndex] = '<div style="fonts-family: dotumche; fonts-size: 30px">';
        arrWrite[++numIndex] = Base.msgReqError;
    arrWrite[++numIndex] = '</div>';

    arrWrite[++numIndex] = '<div style="fonts-family: dotumche; fonts-size: 15px">';
        arrWrite[++numIndex] = '<ul>';
            arrWrite[++numIndex] = '<li>Request URI : ';
                arrWrite[++numIndex] = strUri;
            arrWrite[++numIndex] = '</li>';
            arrWrite[++numIndex] = '<li>Commom Paramenters';
            arrWrite[++numIndex] = '<br /><textarea style="width: 100%">';

            if ( "string" == typeof objData )
                arrWrite[++numIndex] = gfnConvtQueryStrJsonStr(gfnGetFormData("divComParamContnr"));
            else
                arrWrite[++numIndex] = gfnConvtJsonObjJsonStr(gfnGetJsonFormData("divComParamContnr"));

            arrWrite[++numIndex] = '</textarea></li>';
            arrWrite[++numIndex] = '<li>Paramenters';
            arrWrite[++numIndex] = '<br /><textarea style="width: 100%">';

            if ( "string" == typeof objData )
                arrWrite[++numIndex] = gfnConvtQueryStrJsonStr(objData);
            else
                arrWrite[++numIndex] = gfnConvtJsonObjJsonStr(objData);

            arrWrite[++numIndex] = '</textarea></li>';
        arrWrite[++numIndex] = '</ul>';
    arrWrite[++numIndex] = '</div>';

    arrWrite[++numIndex] = '<html><head><title>';
        arrWrite[++numIndex] = document.title;
        arrWrite[++numIndex] = ' - Message Window';
    arrWrite[++numIndex] = '</title></head></html>';

    arrWrite[++numIndex] = '<div style="border: solid 1px gray">';
        if ( !gfnIsEmpty(objJson["responseText"]) )
        {
            arrWrite[++numIndex] = objJson["responseText"];
        } else
        if ( "404" == objJson["status"] )
        {
            arrWrite[++numIndex] = '<iframe src="/404.do" style="height: 600px; width: 100%"></iframe>';
        }
        else
        if ( "405" == objJson["status"] )
        {
            arrWrite[++numIndex] = '<iframe src="/405.do" style="height: 600px; width: 100%"></iframe>';
        } else
        {
            for ( var strKey in objJson )
            {
                arrWrite[++numIndex] = strKey + ": <br />";
                arrWrite[++numIndex] = objJson[strKey] + "<br /><br />";
            }
        }
    arrWrite[++numIndex] = '</div>';

    objOutpt.document.write(arrWrite.join(""));

    arrWrite = null;
    return objOutpt;
}

//==============================================================================
// 용도     : 쿼리문자열 JSON 문자열 변환
// 파라미터 : strQueryStr - 쿼리문자열
// 리턴값   : String
// 참고사항 :
// 기타     : 개발자 배포용
// 작성일자 : 2014-04-23
//------------------------------------------------------------------------------
function gfnConvtQueryStrJsonStr(strQueryStr)
{
    var arrOutpt = new Array(), numIndex = -1;

    var arrParamList = strQueryStr.split(Base.AND), LNGTH = arrParamList.length;
    var arrParam;
    var COMMA = ', ', QUOTE = '"', STR = "string";

    for ( var num = 0 ; num < LNGTH ; num++ )
    {
        if ( 0 < num ) arrOutpt[++numIndex] = COMMA;
        arrParam = arrParamList[num].split(Base.EQUAL);

        arrOutpt[++numIndex] = QUOTE;
        arrOutpt[++numIndex] = arrParam[0];
        arrOutpt[++numIndex] = QUOTE;

        arrOutpt[++numIndex] = Base.COLON;
        arrOutpt[++numIndex] = Base.SPACE;

        if ( STR == typeof arrParam[1] )
            arrOutpt[++numIndex] = QUOTE;

            arrOutpt[++numIndex] = decodeURIComponent(arrParam[1]);

        if ( STR == typeof arrParam[1] )
            arrOutpt[++numIndex] = QUOTE;
    }

    arrParam = null;
    return "{ " + arrOutpt.join(Base.EMPTYSTR) + " }";
}

//==============================================================================
// 용도     : Json 객체 JSON 문자열 변환
// 파라미터 : objJson - JSON
// 리턴값   : String
// 참고사항 :
// 기타     : 개발자 배포용
// 작성일자 : 2014-04-29
//------------------------------------------------------------------------------
function gfnConvtJsonObjJsonStr(objJson, arrKey)
{
    var arrOutpt = new Array(), numIndex = -1;

    var COMMA = ', ', QUOTE = '"', STR = "string";
    var objValue;

    if ( null == arrKey )
    {
        for ( var strKey in objJson )
        {
            if ( 0 <= numIndex ) arrOutpt[++numIndex] = COMMA;

            arrOutpt[++numIndex] = QUOTE;
            arrOutpt[++numIndex] = strKey;
            arrOutpt[++numIndex] = QUOTE;

            arrOutpt[++numIndex] = Base.COLON;
            arrOutpt[++numIndex] = Base.SPACE;

            objValue = objJson[strKey];

            if ( STR == typeof objValue )
            {
                arrOutpt[++numIndex] = QUOTE;
                arrOutpt[++numIndex] = objValue.replace(/\"/g, '\\"');
                arrOutpt[++numIndex] = QUOTE;
            } else
            {
                arrOutpt[++numIndex] = objValue;
            }
        }
    } else
    {
        var LNGTH = ( null != objJson && null != arrKey ? arrKey.length : 0 );
        var strKey;

        for ( var num = 0 ; num < LNGTH ; num++ )
        {
            if ( 0 < num ) arrOutpt[++numIndex] = COMMA;

            strKey = arrKey[num];

            arrOutpt[++numIndex] = QUOTE;
                arrOutpt[++numIndex] = strKey;
                arrOutpt[++numIndex] = QUOTE;

            arrOutpt[++numIndex] = Base.COLON;
            arrOutpt[++numIndex] = Base.SPACE;

            objValue = objJson[strKey];

            if ( STR == typeof objValue )
            {
                arrOutpt[++numIndex] = QUOTE;
                arrOutpt[++numIndex] = objValue.replace(/\"/g, '\\"');
                arrOutpt[++numIndex] = QUOTE;
            } else
            {
                arrOutpt[++numIndex] = objValue;
            }
        }
    }

    return "{ " + arrOutpt.join(Base.EMPTYSTR) + " }";
}

//==============================================================================
// 용도     : JSON 객체 쿼리문자열 변환
// 파라미터 : objJson - JSON
// 리턴값   : String
// 참고사항 : 모든 값들에 encodeURIComponent() 를 사용한다.
// 기타     : 개발자 배포용
// 작성일자 : 2014-05-09
//------------------------------------------------------------------------------
function gfnConvtJsonObjQueryStr(objJson)
{
    var arrOutpt = new Array(), numIndex = -1;

    var objValue, STR = "string";

    for ( var strKey in objJson )
    {
        objValue = objJson[strKey];
        if ( STR != typeof objValue ) objValue = objValue.toString();

        arrOutpt[++numIndex] = strKey + Base.EQUAL + encodeURIComponent(objValue);
    }

    return arrOutpt.join(Base.AND);
}

//==============================================================================
// 용도     : BYTE 부분열 가져오기
// 파라미터 : 1. objData       - 데이터
//            2. numStartIndex - 시작인덱스
//            3. numByteSize   - BYTE 크기
// 리턴값   : String
// 참고사항 :
// 기타     : 개발자 배포용
// 작성일자 : 2014-05-27
//------------------------------------------------------------------------------
function gfnGetByteSubstr(objData, numStartIndex, numByteSize)
{
    var arrOutpt = new Array();

    if ( null != objData )
    {
        var strData = objData.toString(), LNGTH = strData.length;
        var strChar, numCrrnt = 0;

        for ( var num = numStartIndex; num < LNGTH; num++ )
        {
            strChar = strData.charAt(num);

            if ( 3 < escape(strChar).length ) numCrrnt += 2;
            else                              numCrrnt++;

            if ( numByteSize >= numCrrnt )
            {
                arrOutpt[arrOutpt.length] = strChar;
            } else
            {
                strOutpt = strData.substr(0, num - 1); break;
            }
        }
    }

    return arrOutpt.join(Base.EMPTYSTR);
}

//==============================================================================
// 용도     : 줄임표 가져오기 - BYTE
// 파라미터 : 1. objData        - 데이터(선택)
//            2. numMaxByteSize - 최대Byte크기(선택)
// 리턴값   : String
// 참고사항 :
// 기타     : 개발자 배포용
// 작성일자 : 2014-05-27
//------------------------------------------------------------------------------
function gfnGetEllpsByte(objData, numMaxByteSize)
{
    var strOutpt = objData;

    if ( null != objData )
    {
        var strData = objData.toString();

        if ( 2 > numMaxByteSize )
        {
            strOutpt = Base.EMPTYSTR;
        } else
        if ( numMaxByteSize - 2 < gfnGetByteSize(strData) )
        {
            strOutpt = gfnGetByteSubstr(strData, 0, numMaxByteSize - 2) + "…";
        }
    }

    return strOutpt;
}

//==============================================================================
// 용도     : Left Padding
// 파라미터 : 1. objInput  - 입력
//            2. numLngth  - 길이
//            3. objPrefix - 접두어 (선택)
// 리턴값   : String
// 참고사항 :
// 기타     : 개발자 배포용
// 작성일자 : 2012-06-21
//------------------------------------------------------------------------------
function gfnLpad(objInput, numLngth, objPrefix)
{
    var strPrefix = "0" ;
    if ( !gfnIsEmpty(objPrefix) ) strPrefix = objPrefix.toString();

    var strOutput = "" ;

    if ( 0 < numLngth )
    {
        for ( var i = 0 ; i < numLngth ; i++ )
            strOutput += strPrefix ;

        strOutput = strOutput.substr(0, numLngth);

        if ( null != objInput )
            strOutput = gfnRight(strOutput + objInput.toString(), numLngth);
    }
    else
    {
        if ( null != objInput )
            strOutput = objInput.toString() ;
    }

    return strOutput ; // 리턴 처리 - 출력 변수
}

//==============================================================================
// 용도     : Right
// 파라미터 : 1. objInput  - 입력
//            2. numLngth  - 길이
// 리턴값   : String
// 참고사항 :
// 기타     : 개발자 배포용
// 작성일자 : 2012-06-21
//------------------------------------------------------------------------------
function gfnRight(objInput, numLngth)
{
    if ( null == numLngth ) numLngth = 0 ;

    var strOutput = null ; // 출력 변수 선언 및 설정

    if ( null != objInput )
    {
        strOutput = objInput.toString();

        var nInputLngth = strOutput.length ;

        if ( nInputLngth > numLngth && 0 < numLngth )
            strOutput = strOutput.substr(nInputLngth - numLngth, nInputLngth);
    }

    return strOutput ; // 리턴 처리 - 출력 변수
}

// JSON 값 가져오기
function gfnGetJsonValue(objJson, arrKey, objDflt)
{
    var LNGTH = arrKey.length;

    var objOutpt = null;

    if ( null != objJson )
    {
        objOutpt = objJson;

        for ( var num = 0 ; num < LNGTH ; num++ )
        {
            objOutpt = objOutpt[arrKey[num]];
            if ( null == objOutpt ) { objOutpt = objDflt; break; }
        }
    }

    return objOutpt;
}

//==============================================================================
// jQuery 사용 구간 시작
//==============================================================================

//==============================================================================
// 용도     : jQuery 초기화
// 파라미터 :
// 리턴값   :
// 참고사항 : 업무화면 ready 이벤트핸들러 함수에서 호출한다.
// 기타     : 개발자 배포용
// 작성일자 : 2014-04-10
//------------------------------------------------------------------------------
var g_strColgroupMarginLeft; // cf.) menu.jsp 에서 사용
function gfnInitJquery()
{
    gfnInitDivHeight(); // Div 높이 초기화

    $(window).resize(function ()
    {
        gfnResetDivHeight(); // Div 높이 재설정
    });

    // 상단메뉴를 표시한다.
    $(".SubMenu").each(function(numIndex)
    {
        if ( 4 > numIndex ) $(this).css("display", "block");
    });
    if ( 0 < $(".SubMenu:visible:last").next().length )
    {
        $(".MenuNext>span").css("display", "none");
        $(".MenuNext>a").css("display", "block");
    }

    gfnMaskFormt();
}

//==============================================================================
// 용도     : DIV 높이 초기화
// 기타     : 개발자 배포용
// 작성일자 : 2014-12-12
//------------------------------------------------------------------------------
function gfnInitDivHeight()
{
    gfnResetDivHeight();
}
//==============================================================================
// 용도     : DIV 높이 재설정
// 기타     : 개발자 배포용
// 작성일자 : 2014-12-12
//------------------------------------------------------------------------------
var g_numMinusHeight;
var g_strDivIdDtl;
function gfnResetDivHeight()
{
    if ( null == g_numMinusHeight) g_numMinusHeight = 448;

    var numBrowserHeight = document.documentElement.clientHeight;
    var numDivHeight     = numBrowserHeight - g_numMinusHeight; // 설정될 Div높이
    if ( numDivHeight < 500 )  numDivHeight = 500; // 기본 높이 500px

    if ( null == g_strDivIdDtl ) return;

    var arrDivIdDtl      = g_strDivIdDtl.split(Base.DELI1);

    var LNGTH = g_strDivIdDtl.length;

    for (var intIndex = 0; intIndex < LNGTH; intIndex++)
    {
        $("#" + arrDivIdDtl[intIndex]).css("height", numDivHeight);
    }
}

//==============================================================================
// 용도     : 요청
// 파라미터 : 1. strUri        - URI
//            2. objData       - 데이터(선택)
//            3. objSccssCallb - 성공콜백(선택)
//            4. objErrorCallb - 오류콜백(선택)
// 리턴값   :
// 참고사항 :
// 기타     : 개발자 배포용
// 작성일자 : 2014-04-21
//------------------------------------------------------------------------------
function gfnReq(strUri, objData, objSccssCallb, objErrorCallb, blnErrorMsg)
{
    var strContextPath = $("#hidComParamContextPatch").val();

    if (Base.EMPTYSTR != strContextPath) strUri = strContextPath + strUri;

    var objTempData = objData;

    gfnDispPgbar();

    if ( null == objTempData )
    {
        objTempData = gfnGetFormData("divComParamContnr");
    } else
    {
        if ( "string" == typeof objTempData )
        {
            if ( gfnIsEmpty(objTempData) )
                objTempData = gfnGetFormData("divComParamContnr");
            else
                objTempData += Base.AND + gfnGetFormData("divComParamContnr");
        } else
        {
            $.extend(true, objTempData, gfnGetJsonFormData("divComParamContnr"));
        }
    }

    $.ajax(
    {
        "data": objTempData
      , "dataType": "json"
      , "type": "post"
      , "url": strUri
        // 이벤트 관련
      , "success": function(obj) { // 성공시..
            gfnHidePgbar();

            var RSLT_VALUE = gfnGetJsonValue(obj, [ Base.RSLT_NO ]);

            if ( null == blnErrorMsg || blnErrorMsg ) // 로그아웃에서 사용중..
            {
                if ( gfnIsBaseError(RSLT_VALUE) )
                {
                    if ( Base.NO_ADDR == RSLT_VALUE ) gfnDispMsg(Base.msgNoAddr);
                    else
                    if ( Base.NO_MENU == RSLT_VALUE ) gfnDispMsg(Base.msgNoMenu);
                    else
                    if ( Base.NO_AUTH == RSLT_VALUE ) { gfnDispMsg(Base.msgLoginNeed); gfnMovePage("/", false); };
                }
            }

            if ( null == RSLT_VALUE && null == obj[Base.RSLT_LIST] &&
                 null == obj[Base.RSLT_INFO] )
            {
                if ( null != objErrorCallb ) objErrorCallb.call(this);
            } else
            {
                if ( !gfnIsBaseError(RSLT_VALUE) )
                {
                    if ( null != objSccssCallb ) objSccssCallb.call(this, obj);
                }
            }
        }
      , "error": function(obj)
        {
            gfnHidePgbar();

            if ( null == objErrorCallb )
            {
                // 오류 윈도우 열기
                gfnOpenErrorWin(document.title + ' - Message Window', strUri, objData, obj);
            } else
            {
                objErrorCallb(Base.msgReqError);
            }
        }
    });
}
function gfnIsBaseError(numRsltNo)
{
    return ( Base.NO_ADDR == numRsltNo || Base.NO_MENU == numRsltNo || Base.NO_AUTH == numRsltNo );
}

//==============================================================================
// 용도     : 대화창 설정
// 파라미터 : objSet - 설정
// 리턴값   :
// 참고사항 : jQuery UI 를 include 해야한다.
// 기타     : 개발자 배포용
// 작성일자 : 2014-05-08
//------------------------------------------------------------------------------
function gfnSetDlg(objDlg, objSet)
{
    if ( null == objDlg ) return;

    var objDflt = {
        "autoOpen": false
      , "closeOnEscape": false
      , "modal": true
      , "resizable": false
      , "z-index": 9999
    };

    if ( null != objSet ) $.extend(true, objDflt, objSet);

    objDlg.dialog(objDlg, objDflt); // 대화창 설정
    objDlg.parent().find("div").eq(0).css("display", "none"); // 제목영역 숨김
    objDlg.parent().find("div").eq(1).css("border", "none"); // 테두리 없앰

    objDflt = null;
}

//==============================================================================
// 용도     : PROGRESSBAR 초기화
// 파라미터 :
// 리턴값   :
// 참고사항 : jQuery UI 를 include 해야한다.
// 기타     : 개발자 배포용
// 작성일자 : 2014-04-17
//------------------------------------------------------------------------------
function gfnInitPgbar()
{
    if ( "divCommonJspPgbar" in window )
    {
        gfnSetDlg($("#divCommonJspPgbar"), { "width": 100 }); // 대화창 설정

        $("#divCommonJspPgbar").parent().find("div").eq(0).css("display", "none"); // 제목영역 숨김
        $("#divCommonJspPgbar").parent().find("div").eq(2).css("display", "none"); // 버튼영역 숨김
    }
}

//==============================================================================
// 용도     : PROGRESSBAR 표시
// 파라미터 :
// 리턴값   :
// 참고사항 : jQuery UI 를 include 해야한다.
// 기타     : 개발자 배포용
// 작성일자 : 2014-04-17
//------------------------------------------------------------------------------
function gfnDispPgbar()
{
    if ( "divCommonJspPgbar" in window )
    {
        if ( !$("#divCommonJspPgbar").dialog("isOpen") )
            $("#divCommonJspPgbar").dialog("open"); // 대화창 열기
    }
}

//==============================================================================
// 용도     : PROGRESSBAR 숨김
// 파라미터 :
// 리턴값   :
// 참고사항 : jQuery UI 를 include 해야한다.
// 기타     : 개발자 배포용
// 작성일자 : 2014-04-17
//------------------------------------------------------------------------------
function gfnHidePgbar()
{
    if ( "divCommonJspPgbar" in window )
    {
        if ( $("#divCommonJspPgbar").dialog("isOpen") )
            $("#divCommonJspPgbar").dialog("close"); // 대화창 닫기
    }
}

//==============================================================================
// 용도     : HTML 설정
// 파라미터 : 1. objTarg - 대상
//            2. strHtml - HTML
// 리턴값   :
// 참고사항 :
// 기타     : 개발자 배포용
// 작성일자 : 2014-04-18
//------------------------------------------------------------------------------
function gfnSetHtml(objTarg, strHtml)
{
    var TAG_NAME = objTarg.tagName;

    if ( 0 <= "SELECT|TBODY".indexOf(TAG_NAME) )
        $(objTarg).html(strHtml);
    else
        objTarg.innerHTML = strHtml;
}

//==============================================================================
// 용도     : 화면 정리
// 파라미터 : objTarg - 대상(선택)
// 리턴값   :
// 참고사항 : 대상 객체가 로드된 후 사용할 수 있다.
//            입력된 객체의 모든 자식 객체들에 대하여 값을 지우거나,
//            첫번째 항목을 선택하거나, 선택을 해제한다.
//            objTarg 입력시 objTarg 는 제외하고 클리어한다.
// 기타     : 개발자 배포용
// 작성일자 : 2014-04-29
//------------------------------------------------------------------------------
function gfnClearScr(objTarg)
{
    var objContnr = ( null != objTarg ? ( "string" == typeof objTarg ?
            eval(objTarg) : objTarg ) : document.body );

    $(objContnr).find('input[type="password"],input[type="text"],textarea').each(function() {
        $(this).val("");
    }); // 값 설정
    $(objContnr).find('select').each(function() {
        $(this).find("option:first").each(function() {
            $(this).prop("selected", true); // 속성 설정 : selected. 선택여부
        });
    });
    $(objContnr).find('input[type="checkbox"]').each(function() {
        $(this).attr("checked", false); // 속성 설정 : checked. 체크여부
    });
    $(objContnr).find('input[type="radio"]').each(function() {
        // 속성 설정 : checked. 체크여부
        $('input[name="' + $(this).attr("name") + '"]').eq(0).attr("checked", true);
    });
/*	var objTagList = ( null != objContnr ? objContnr.all : null );

    var INPUT = "input", SELECT = "select", TEXTAREA = "textarea";
    var TEXT = "text", PASSWORD = "password", CHECKBOX = "checkbox", RADIO = "radio";

    var LNGTH = objTagList.length;
    var objTag, strTagName, strType, strName;

    for ( var num = 0 ; num < LNGTH ; num++ )
    {
        objTag = objTagList[num];
        if ( null == objTag.tagName ) continue;
        strTagName = objTag.tagName.toLowerCase();

        if ( INPUT == strTagName )
        {
            strType = objTag.type;

            if ( TEXT == strType || PASSWORD == strType )
            {
                objTag.value = Base.EMPTYSTR;
            } else
            if ( CHECKBOX == strType )
            {
                objTag.checked = false;
            } else
            if ( RADIO == strType && objTag.checked )
            {
                strName = objTag.name;

                if ( !gfnIsEmpty(strName) ) eval(strName + "[0].checked = true");
            }
        } else
        if ( SELECT == strTagName )
        {
            if ( 0 < objTag.all.length ) objTag.all.tags("option")[0].selected = true;
        } else
        if ( TEXTAREA == strTagName )
        {
            objTag.value = Base.EMPTYSTR;
        }
    }

    objTagList = null; */objContnr = null;
}

//==============================================================================
// 용도     : 폼 데이터 가져오기
// 파라미터 : objTarg - 대상
// 리턴값   :
// 참고사항 :
// 기타     : 개발자 배포용
// 작성일자 : 2014-05-09
//------------------------------------------------------------------------------
function gfnGetFormData(objTarg)
{
    return gfnConvtJsonObjQueryStr(gfnGetJsonFormData(objTarg));
}

//==============================================================================
// 용도     : JSON 폼 데이터 가져오기
// 파라미터 : objTarg - 대상
// 리턴값   :
// 참고사항 : 대상 태그내 name 속성이 있는 항목에 대하여 JSON 객체로 가져온다.
//            name 속성이 중복된 경우 기존에 추가된 값에 구분자(|) 와 함께 연결한다.
//            항목의 class 에 따라 gfnUnformt() 처리한다.
//            체크박스의 경우 선택여부에 따라 Y 또는 N 으로 추가한다.
//            선택된 라디오버튼의 경우 value 를 추가한다.
// 기타     : 개발자 배포용
// 작성일자 : 2014-05-09
//------------------------------------------------------------------------------
function gfnGetJsonFormData(objTarg)
{
    var objOutpt = { };

    var objPrnts = ( "string" == typeof objTarg ? eval(objTarg) : objTarg );

    $(objPrnts).find("[name]").each(function() {
        var NAME = $(this).attr("name");
        var strValue = gfnCoalesce($(this).val(), Base.EMPTYSTR).replace(/\|/g, Base.EMPTYSTR);
        // jQuery UI datepicker 설정시 class 가 덧붙여진다.
//		var strClass = Base.DELI1 + gfnCoalesce($(this).attr("class"), Base.EMPTYSTR) + Base.DELI1;
//		strClass = strClass.split(" ")[0];
        var TYPE = $(this).attr("type");

        //if ( 0 <= "|TxtCurr|TxtCurrMan|".indexOf(strClass) )
        if ( $(this).hasClass("TxtCurr") || $(this).hasClass("TxtCurrMan") )
            strValue = gfnUnformt(strValue, Base.NUM);
        else
        //if ( 0 <= "|TxtDate|TxtDateMan|TxtPost|TxtPostMan|TxtBzno|TxtBznoMan|TxtCorpno|TxtCorpnoMan|".indexOf(strClass) )
        if ( $(this).hasClass("TxtDate") || $(this).hasClass("TxtDateMan")
          || $(this).hasClass("TxtPost") || $(this).hasClass("TxtPostMan")
          || $(this).hasClass("TxtBzno") || $(this).hasClass("TxtBznoMan")
          || $(this).hasClass("TxtCorpno") || $(this).hasClass("TxtCorpnoMan") )
            strValue = gfnUnformt(strValue, Base.STR_NUM);

        if ( "checkbox" == TYPE ) strValue = ( $(this).get(0).checked ? Base.YES : Base.NO );
        else
        if ( "radio" == TYPE && !$(this).get(0).checked ) return;

        if ( null == objOutpt[NAME] )
            objOutpt[NAME]  = strValue;
        else
            objOutpt[NAME] += Base.DELI1 + strValue;
    });

    objPrnts = null;

    return objOutpt;
}


//==============================================================================
// 용도     : 포맷 마스크
// 파라미터 : objTarg - 대상 (선택)
// 리턴값   :
// 참고사항 : mask 를 include 해야 한다.
//            화면이 로드된 후 사용해야 한다.
// 기타     : 개발자 배포용
// 작성일자 : 2014-05-09
//------------------------------------------------------------------------------
function gfnMaskFormt(objTarg)
{
    var objPrnts = null;
    if ( null != objTarg ) objPrnts = ( "string" == typeof objTarg ? eval(objTarg) : objTarg );

    var objContnr = ( null != objPrnts ? $(objPrnts).find('input[type="text"][class]') :
            $('body input[type="text"][class]') );

    objContnr.each(function() {
        if ( $(this).hasClass("TxtCurr") || $(this).hasClass("TxtCurrMan") )
            gfnSetCurrUserDefineMask($(this)); // 통화 사용자정의 마스크 설정
        else
        if ( $(this).hasClass("TxtDate") || $(this).hasClass("TxtDateMan") )
            gfnSetDateUserDefineMask($(this)); // 날짜 사용자정의 마스크 설정
        else
        if ( $(this).hasClass("TxtNum") || $(this).hasClass("TxtNumMan") )
            gfnSetLimitedUserDefineMask($(this), "0123456789"); // 제한된 사용자정의 마스크 설정
        else
        if ( $(this).hasClass("TxtTel") || $(this).hasClass("TxtTelMan") )
            gfnSetUnFixedUserDefineMask($(this), "9999-9999-9999"); // 고정되지 않은 사용자정의 마스크 설정
        else
        if ( $(this).hasClass("TxtEmail") || $(this).hasClass("TxtEmailMan") )
            gfnSetLimitedUserDefineMask($(this), "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@.-_"); // 제한된 사용자정의 마스크 설정
        else
        if ( $(this).hasClass("TxtPost") || $(this).hasClass("TxtPostMan") )
            gfnSetFixedUserDefineMask($(this), "999-999"); // 고정된 사용자정의 마스크 설정
        else
        if ( $(this).hasClass("TxtId") || $(this).hasClass("TxtIdMan") )
            gfnSetLimitedUserDefineMask($(this), "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_"); // 제한된 사용자정의 마스크 설정
        else
        if ( $(this).hasClass("TxtBzno") || $(this).hasClass("TxtBznoMan") )
            gfnSetFixedUserDefineMask($(this), "999-99-99999"); // 고정된 사용자정의 마스크 설정
        else
        if ( $(this).hasClass("TxtCorpno") || $(this).hasClass("TxtCorpnoMan") )
            gfnSetFixedUserDefineMask($(this), "999999-9999999"); // 고정된 사용자정의 마스크 설정

        if ( ( $(this).hasClass("TxtDate") || $(this).hasClass("TxtDateMan") ) && ( "Y" != $(this).attr(g_strUserDefineMaskDateYmYnID) ) )
        { // 달력
            $(this).datepicker({
                                buttonImage : '../common/images/common/btnCalendar.png'
                              , buttonText : "날짜 선택"
                              , buttonImageOnly: true
                              , changeMonth : true
                              , changeYear: true
                              , dateFormat: "yy-mm-dd"
                              , showOn: "button"
                              , showOtherMonths: true
                              }
                            , $.datepicker.regional['ko']
            );
        }
    });

    objContnr = null; objPrnts = null;
}

//==============================================================================
// 용도     : 화면 매개변수 JSON 가져오기
// 파라미터 : blnSet - 설정여부
// 리턴값   : Object
// 참고사항 :
// 기타     : 개발자 배포용
// 작성일자 : 2014-05-01
//------------------------------------------------------------------------------
function gfnGetScrParamJson(blnSet)
{
    var objOutpt = { };

    var strComParamScrDataJsonStr = ( blnSet ? $('[name="comParamScrDataJsonStrSet"]').val() :
        $('[name="comParamScrDataJsonStrGet"]').val() );

    if ( !gfnIsEmpty(strComParamScrDataJsonStr) )
    {
        strComParamScrDataJsonStr = strComParamScrDataJsonStr.replace(/\r\n/g, "");
        strComParamScrDataJsonStr = strComParamScrDataJsonStr.replace(/\r/g, "");
        strComParamScrDataJsonStr = strComParamScrDataJsonStr.replace(/\n/g, "");

        eval('objOutpt = ' + strComParamScrDataJsonStr);
    }

    return objOutpt;
}

//==============================================================================
// 용도     : 화면 매개변수 설정
// 파라미터 : 1. strKey   - 키
//            2. objValue - 값
// 리턴값   :
// 참고사항 :
// 기타     : 개발자 배포용
// 작성일자 : 2014-05-01
//------------------------------------------------------------------------------
function gfnSetScrParam(strKey, objValue)
{
    var obj = gfnGetScrParamJson(true), str;

    obj[strKey] = objValue;
    str = gfnConvtJsonObjJsonStr(obj).replace(/\'/g, "&#39;");

    $('[name="comParamScrDataJsonStrSet"]').val(str);

    obj = null;
}

//==============================================================================
// 용도     : 화면 매개변수 가져오기
// 파라미터 : 1. strKey       - 키
//            2. objDfltValue - 기본값
// 리턴값   : Object
// 참고사항 :
// 기타     : 개발자 배포용
// 작성일자 : 2014-05-01
//------------------------------------------------------------------------------
function gfnGetScrParam(strKey, objDfltValue)
{
    var objOutpt = objDfltValue;

    var obj = gfnGetScrParamJson(false), VALUE = obj[strKey]; obj = null;

    if ( !gfnIsEmpty(VALUE) ) objOutpt = VALUE;

    return objOutpt;
}

//==============================================================================
// 용도     : JSON 객체 텍스트 속성 바인딩
// 파라미터 : 1. objJson - JSON
//            2. objTarg - 대상
//            3. strPrfx - 접두사
//            4. objFunc - 함수
// 리턴값   : Object
// 참고사항 : 접두어 매개변수를 이용하여 id 속성값과 비교해 바인딩한다.
// 기타     : 개발자 배포용
// 작성일자 : 2014-05-09
//------------------------------------------------------------------------------
function gfnBindJsonObjTextAttr(objJson, objTarg, strPrfx, objFunc)
{
    if ( null == objJson ) return;

    var objPrnts = ( "string" == typeof objTarg ? eval(objTarg) : objTarg );

    $(objPrnts).find('[id^="' + strPrfx + '"]').each(function()
        {
            $(this).text(gfnCoalesce(objJson[$(this).attr("id").substr(strPrfx.length)], Base.EMPTYSTR));
        });

    objPrnts = null;

    if ( null != objFunc ) objFunc(objJson, strPrfx);
}

//==============================================================================
// 용도     : JSON 객체 항목 바인딩
// 파라미터 : 1. objJson - JSON
//            2. objTarg - 대상
//            3. objFunc - 함수
// 리턴값   : Object
// 참고사항 : name 속성값과 비교해 바인딩한다.
//            class 속성값에 따라 gfnFormt() 를 처리한다.
//            체크박스의 경우 값이 Y 이면 선택해준다.
//            라디오버튼의 경우 값이 일치하면 선택해준다.
// 기타     : 개발자 배포용
// 작성일자 : 2014-05-09
// 수정일자 : 2014-08-14
// 수정내용 : INPUT 태그가 아닌 다른 태그일 경우 처리 추가
//------------------------------------------------------------------------------
function gfnBindJsonObjItem(objJson, objTarg, objFunc)
{
    if ( null == objJson ) return;

    var objPrnts = ( "string" == typeof objTarg ? eval(objTarg) : objTarg );

    $(objPrnts).find('[name]').each(function()
        {
            var strValue = gfnCoalesce(objJson[$(this).attr("name")], Base.EMPTYSTR);

            var TAG_NAME = $(this).get(0).tagName;

            if ( TAG_NAME == 'INPUT' )
            {
                var TYPE = $(this).attr("type");

                if ( $(this).hasClass("TxtCurr") || $(this).hasClass("TxtCurrMan") )
                    strValue = gfnFormt(strValue, Base.NUM);
                else
                if ( $(this).hasClass("TxtDate") || $(this).hasClass("TxtDateMan") )
                    strValue = gfnFormt(strValue, Base.DATE);
                else
                if ( $(this).hasClass("TxtBzno") || $(this).hasClass("TxtBznoMan") )
                    strValue = gfnFormt(strValue, Base.BZNO);
                else
                if ( $(this).hasClass("TxtPost") || $(this).hasClass("TxtPostMan") )
                    strValue = gfnFormt(strValue, Base.POST);
                else
                if ( $(this).hasClass("TxtCorpno") || $(this).hasClass("TxtCorpnoMan") )
                    strValue = gfnFormt(strValue, Base.CORPNO);

                if ( "checkbox" == TYPE )
                    $(this).get(0).checked = ( Base.YES == strValue );
                else
                if ( "radio" == TYPE )
                    $(this).get(0).checked = ( strValue == $(this).val() );
                else
                    $(this).val(strValue);
            }
            else
            if ( TAG_NAME == 'SPAN' )
            {
                // 숫자인지 확인, 숫자면 포맷 변경한다.
                if ( !isNaN(Number(strValue) ))
                {
                    strValue = gfnFormt(strValue, Base.NUM);
                }
                $(this).append(strValue);
            }
            else
            if ( TAG_NAME == 'TEXTAREA' )
            {
                $(this).append(strValue);
            }
            else
            if ( TAG_NAME == 'SELECT' )
            {
                $(this).val(strValue);
            }
        });

    objPrnts = null;

    if ( null != objFunc ) objFunc(objJson);
}

//==============================================================================
// 용도     : 비동기 메시지박스 초기화
// 파라미터 :
// 리턴값   :
// 참고사항 : jQuery UI 를 include 해야한다.
// 기타     : 개발자 배포용
// 작성일자 : 2014-05-26
//------------------------------------------------------------------------------
function gfnInitAsyncMsgBox()
{
    if ( "divCommonJspMsgBox" in window )
    {
        $("#divCommonJspMsgBox>#LayerPop").css("top", 0).css("left", 0).css("position", "static");

        gfnSetDlg($("#divCommonJspMsgBox"), { "width": 393 }); // 대화창 설정

        $("#divCommonJspMsgBox").parent().find("div").eq(0).css("display", "none"); // 제목영역 숨김
        $("#divCommonJspMsgBox .PopClose").click(function() { gfnHideAsyncMsgBox(Base.NO); });
        $("#divCommonJspMsgBox .Cnfm").click(function() { gfnHideAsyncMsgBox(Base.YES); });
        $("#divCommonJspMsgBox .Cncl").click(function() { gfnHideAsyncMsgBox(Base.NO); });
    }
}

//==============================================================================
// 용도     : 비동기 메시지박스 표시
// 파라미터 : 1. numClsfy - 구분 ex.) 1. Information, 2. Warning, 3. Confirm
//            2. strMsg   - 메시지 ex.) 신청이 완료되었습니다. 상세신청현황은 <a href="#" class="Pagelink">마이페이지</a>에서<br/>확인 가능합니다.|세미나 신청|Y
//            3. strSffx  - 접미사(선택)
//            4. objFunc  - 함수(선택)
// 리턴값   :
// 참고사항 : jQuery UI 를 include 해야한다.
// 기타     : 개발자 배포용
// 작성일자 : 2014-05-27
//------------------------------------------------------------------------------
//gfnDispAsyncMsgBox(1, "조회가 완료되었습니다.");
//gfnDispAsyncMsgBox(1, "조회가 완료되었습니다. 레코드를 선택하십시오.");
//gfnDispAsyncMsgBox(1, "조회가 완료되었습니다.", "공지사항");
//gfnDispAsyncMsgBox(1, "조회가 완료되었습니다. 레코드를 선택하십시오.", "공지사항");
//gfnDispAsyncMsgBox(1, "조회가 완료되었습니다. 레코드를 선택하십시오.", "공지사항", "sltClsfy");
//gfnDispAsyncMsgBox(1, "조회가 완료되었습니다. 레코드를 선택하십시오.", "공지사항", null, function() { alert("OK"); });
//gfnDispAsyncMsgBox(2, "오류가 발생했습니다.");
//gfnDispAsyncMsgBox(3, "삭제하시겠습니까?", null, null, function() { alert("삭제 처리"); });
function gfnDispAsyncMsgBox(numClsfy, strMsg, strSffx, objTarg, objFunc)
{
    if ( "divCommonJspMsgBox" in window )
    {
        if ( !$("#divCommonJspMsgBox").dialog("isOpen") )
        {
            var TITLE = ( 2 == numClsfy ? "Warning" : ( 3 == numClsfy ? "Confirm" : "Information" ) );

            var arrMsg = strMsg.split(". "), LNGTH = arrMsg.length;
            var MSG   = arrMsg[0];
            var MSG2  = ( 1 < LNGTH && 0 < arrMsg[1].length ? arrMsg[1] : Base.EMPTYSTR );
            var MSG21 = MSG2 + ( !gfnIsEmpty(strSffx) ? ( 0 < MSG2.length ? Base.SPACE + Base.COLON + Base.SPACE + strSffx : strSffx ) : Base.EMPTYSTR );
            var MSG22 = ( 0 < MSG21.length ? MSG21 : "&nbsp;" );

            $("#divCommonJspMsgBox>#LayerPop>.PopupTitle>span:nth-child(1)").text(TITLE);

            if ( 1 == numClsfy )
            {
                $("#divCommonJspMsgBox>#LayerPop>.PopupContainer>.ResultPop>dl>dt").html(MSG);
                $("#divCommonJspMsgBox>#LayerPop>.PopupContainer>.ResultPop>dl>dd").html(MSG22);

                $("#divCommonJspMsgBox>#LayerPop>.PopupContainer>.ResultPop").css("display", "block");
                $("#divCommonJspMsgBox>#LayerPop>.PopupContainer>.WarningPop").css("display", "none");
                $("#divCommonJspMsgBox>#LayerPop>.PopupContainer>.QuestionPop").css("display", "none");
            } else
            if ( 2 == numClsfy )
            {
                $("#divCommonJspMsgBox>#LayerPop>.PopupContainer>.WarningPop>dl>dt").html(MSG);
                $("#divCommonJspMsgBox>#LayerPop>.PopupContainer>.WarningPop>dl>dd").html(MSG22);

                $("#divCommonJspMsgBox>#LayerPop>.PopupContainer>.ResultPop").css("display", "none");
                $("#divCommonJspMsgBox>#LayerPop>.PopupContainer>.WarningPop").css("display", "block");
                $("#divCommonJspMsgBox>#LayerPop>.PopupContainer>.QuestionPop").css("display", "none");
            } else
            if ( 3 == numClsfy )
            {
                $("#divCommonJspMsgBox>#LayerPop>.PopupContainer>.QuestionPop>dl>dt").html(MSG);
                $("#divCommonJspMsgBox>#LayerPop>.PopupContainer>.QuestionPop>dl>dd").html(MSG22);

                $("#divCommonJspMsgBox>#LayerPop>.PopupContainer>.ResultPop").css("display", "none");
                $("#divCommonJspMsgBox>#LayerPop>.PopupContainer>.WarningPop").css("display", "none");
                $("#divCommonJspMsgBox>#LayerPop>.PopupContainer>.QuestionPop").css("display", "block");
            }

            $("#divCommonJspMsgBox>#LayerPop>.PopupContainer>.BoardBtn .Cncl").parent().parent().css("display", ( 3 == numClsfy ? "inline" : "none" ));

            arrMsg = null;

            if ( null != objTarg || null != objFunc )
            {
                $("#divCommonJspMsgBox").on("dialogclose", function(objEvent, objUi)
                    {
                        if ( null != objFunc )
                        {
                            if ( 3 != numClsfy || Base.YES == $("#divCommonJspMsgBox>.ReturnValue").val() ) objFunc();
                        } else
                        {
                            gfnFocus(objTarg);
                        }
                    });
            }
            $("#divCommonJspMsgBox").dialog("open"); // 대화창 열기
        }
    }
}

//==============================================================================
// 용도     : 비동기 메시지박스 숨김
// 파라미터 : strYn - 여부
// 리턴값   :
// 참고사항 : jQuery UI 를 include 해야한다.
// 기타     : 내부 호출용
// 작성일자 : 2014-05-26
//------------------------------------------------------------------------------
function gfnHideAsyncMsgBox(strYn)
{
    if ( "divCommonJspMsgBox" in window )
    {
        if ( $("#divCommonJspMsgBox").dialog("isOpen") )
        {
            $("#divCommonJspMsgBox>.ReturnValue").val(strYn);

            $("#divCommonJspMsgBox").dialog("close"); // 대화창 닫기
        }
    }
}

//==============================================================================
// 용도     : 콤보 정리
// 파라미터 : strIdList - ID 목록
// 리턴값   : 없음
// 참고사항 :
// 기타     : 개발자 배포용
// 작성일자 : 2014-07-01
//------------------------------------------------------------------------------
function gfnClearCombo(strIdList)
{
    var arr = strIdList.split(Base.DELI1), LNGTH = arr.length ;
    var objCombo, objTopOption, strHtml;

    for ( var i = 0 ; i < LNGTH ; i++ )
    {
        objCombo = $("#" + arr[i]); if ( 1 != objCombo.length ) continue ;
        objTopOption = $('#' + arr[i] + '>option[value=""]');

        if ( 0 >= objTopOption.length )
            strHtml = Base.EMPTYSTR;
        else
            strHtml = gfnGetComboChildTag(Base.EMPTYSTR, objTopOption.text());

        objCombo.html(strHtml); // HTML 설정
    }

    arr = null;
}

//==============================================================================
// 용도     : 로그인 체크
// 파라미터 : 없음
// 리턴값   :
// 참고사항 :
// 기타     : 개발자 배포용
// 작성일자 : 2015-05-19
//------------------------------------------------------------------------------
function gfnCheckLogin()
{
    var strUri = "/system/checkLogin.do";
    var strContextPath = $("#hidComParamContextPatch").val();

    if (Base.EMPTYSTR != strContextPath) strUri = strContextPath + strUri;

    objTempData = gfnGetFormData("divComParamContnr");

    $.ajax(
    {
        "data" : objTempData
      , "dataType": "json"
      , "type": "post"
      , "url": strUri
        // 이벤트 관련
      , "success": function(obj) { // 성공시..

            var RSLT_VALUE = gfnGetJsonValue(obj, [ Base.RSLT_NO ]);

            if ( Base.NO_AUTH == RSLT_VALUE )
            {
                return Base.NO;
            } else
            {
                return Base.YES;
            }
        }
      , "error": function(obj)
        {
            gfnHidePgbar();

            if ( null == objErrorCallb )
            {
                // 오류 윈도우 열기
                gfnOpenErrorWin(document.title + ' - Message Window', strUri, objData, obj);
            } else
            {
                objErrorCallb(Base.msgReqError);
            }
        }
    });
}