//==============================================================================
// 용도     : 콤보 바인딩
// 파라미터 : 1. strIdList        - ID         목록       cf.) 구분자 = "|"
//            2. strCodeHdrIdList - 코드헤더ID 목록       cf.) 구분자 = "|"
//            3. strTopTextList   - 상단텍스트 목록(선택) cf.) 구분자 = "|"
//            4. strChcValueList  - 선택값     목록(선택) cf.) 구분자 = "|"
//            5. objFunc          - 함수           (선택)
// 리턴값   :
// 참고사항 : [코드] 테이블을 조회하여 바인딩한다.
//            상단에 추가된 OPTION 태그의 value 속성값은 "" 이다.
// 기타     : 개발자 배포용
// 작성일자 : 2014-04-17
//------------------------------------------------------------------------------
function gfnBindCombo(strIdList, strCodeHdrIdList, strTopTextList, strChcValueList, objFunc)
{
    if ( null == strTopTextList  ) strTopTextList  = Base.EMPTYSTR;
    if ( null == strChcValueList ) strChcValueList = Base.EMPTYSTR;

    gfnReq( // 요청
        // URL
        "/system/getComboCodeNameList.do" // 목록 가져오기
        // 데이터
      , "codeHdrIdList" + Base.EQUAL
      + 	encodeURIComponent("IN ('" + strCodeHdrIdList.replace(/\|/g, "', '") + "')")
        // 성공콜백함수
      , function(objData)
        {
            var arrIdList        =        strIdList.split(Base.DELI1);
            var arrCodeHdrIdList = strCodeHdrIdList.split(Base.DELI1);
            var arrTopTextList   =   strTopTextList.split(Base.DELI1);
            var arrChcValueList  =  strChcValueList.split(Base.DELI1);

            var LNGTH = arrIdList.length ;

            // 콤보를 초기화한다.
            for ( var num = 0 ; num < LNGTH ; num++ )
                gfnSetHtml(eval(arrIdList[num]), ( !gfnIsEmpty(arrTopTextList[num]) ?
                        gfnGetComboChildTag(null, arrTopTextList[num], arrChcValueList[num]) :
                        Base.EMPTYSTR ));

            var arrRsltList = gfnGetJsonValue(objData, [ Base.RSLT_LIST ]);
            var LNGTH2 = ( null != arrRsltList ? arrRsltList.length : 0 );
            var strBforeCodeHdrId = Base.EMPTYSTR, strCrrntCodeHdrId = Base.EMPTYSTR;
            var objJsonRow, CODE_HDR_ID = "codeHdrId", USERDEF_CODE = "userdefCode", CODE_NAME = "codeName";

            // HTML 문자열을 조립한다.
            for ( var num = 0 ; num < LNGTH2 ; num++ )
            {
                objJsonRow = arrRsltList[num];

                strCrrntCodeHdrId = objJsonRow[CODE_HDR_ID];

                eval(gfnGetComboChildListStr(strBforeCodeHdrId != strCrrntCodeHdrId,
                        strCrrntCodeHdrId, objJsonRow[USERDEF_CODE], objJsonRow[CODE_NAME]));

                strBforeCodeHdrId = strCrrntCodeHdrId;
            }

            arrRsltList = null;

            var strHtml, STR_HTML = "strHtml", objCombo;

            // HTML을 설정한다.
            for ( var num = 0 ; num < LNGTH ; num++ )
            {
                strHtml = Base.EMPTYSTR;
                try { strHtml = eval(STR_HTML + arrCodeHdrIdList[num]); } catch ( ect ) { }

                if ( 0 < strHtml.length )
                {
                    objCombo = eval(arrIdList[num]);
                    gfnSetHtml(objCombo, objCombo.innerHTML + strHtml);
                    objCombo.value = arrChcValueList[num]; // 기본값을 설정한다.
                    if ( 0 > objCombo.selectedIndex ) objCombo.selectedIndex = 0;
                }
            }

            arrChcValueList = null; arrTopTextList = null; arrCodeHdrIdList = null; arrIdList = null;

            if ( objFunc != null ) objFunc();
        }
    );
}

//==============================================================================
// 용도     : URI 콤보 바인딩
// 파라미터 : 1. strId       - ID
//            2. strUri      - URI
//            3. objData     - 데이터
//            4. strTopText  - 상단텍스트 (선택)
//            5. strChcValue - 선택값     (선택)
//            6. objFunc     - 함수       (선택)
// 리턴값   :
// 참고사항 : 해당 URI 를 요청하여 바인딩한다.
//            상단에 추가된 OPTION 태그의 value 속성값은 "" 이다.
// 기타     : 개발자 배포용
// 작성일자 : 2014-04-17
//------------------------------------------------------------------------------
function gfnBindComboUri(objId, strUri, objData, objTopText, strChcValue, objFunc)
{
    gfnReq( // 요청
        // URL
        strUri
        // 데이터
      , objData
        // 성공콜백함수
      , function(objData)
        {
            if ( typeof objId == "string" )
            {
                gfnSetComboObj(objId, gfnGetJsonValue(objData, [ Base.RSLT_LIST ]), objTopText, strChcValue);
            } else
            if ( typeof objId == "object" )
            {
                var LNGTH = objId.length;

                for (var numIndex = 0; numIndex < LNGTH; numIndex++)
                {
                    gfnSetComboObj(objId[numIndex], gfnGetJsonValue(objData, [ Base.RSLT_LIST ]), objTopText[numIndex], strChcValue);
                }
            }
            if ( null != objFunc ) objFunc();
        }
    );
}

//==============================================================================
// 용도     : 콤보 객체 설정
// 파라미터 : 1. strId       - ID
//            2. arrList     - 목록
//            3. strTopText  - 상단텍스트 (선택)
//            4. strChcValue - 선택값     (선택)
// 리턴값   :
// 참고사항 : 상단에 추가된 OPTION 태그의 value 속성값은 "" 이다.
//            arrList 내 레코드의 사용자정의코드 값이 OPTION 태그 value 속성에 설정되고,
//            코드명 값이 text 속성에 설정된다.
// 기타     : 개발자 배포용
// 작성일자 : 2014-04-17
//------------------------------------------------------------------------------
function gfnSetComboObj(strId, arrList, strTopText, strChcValue)
{
    if ( null == strChcValue ) strChcValue = Base.EMPTYSTR;

    var arrHtml = new Array(), numIndex = -1;

    // 상단 OPTION 을 추가한다.
    if ( !gfnIsEmpty(strTopText) )
        arrHtml[++numIndex] = gfnGetComboChildTag(null, strTopText, strChcValue);

    if ( null != arrList )
    {
        var LNGTH = arrList.length;
        var USERDEF_CODE = "userdefCode", CODE_NAME = "codeName", CHC_VALUE = "chcValue";
        if ( 0 < LNGTH && 0 >= strChcValue.length ) strChcValue = arrList[0][CHC_VALUE];

        for ( var num = 0 ; num < LNGTH ; num++ )
            arrHtml[++numIndex] = gfnGetComboChildTag(arrList[num][USERDEF_CODE],
                    arrList[num][CODE_NAME], strChcValue);
    }

    gfnSetHtml(eval(strId), arrHtml.join(Base.EMPTYSTR));

    arrHtml = null;
}

//==============================================================================
// 용도     : 콤보 자식 태그 가져오기
// 파라미터 : 1. strValue    - 값
//            2. strText     - 텍스트
//            3. strChcValue - 선택값(선택)
// 리턴값   : String
// 참고사항 :
// 기타     : 내부 호출용
// 작성일자 : 2014-04-17
//------------------------------------------------------------------------------
function gfnGetComboChildTag(strValue, strText, strChcValue)
{
    var arrOutpt = new Array(), numIndex = -1;

    arrOutpt[++numIndex] = '<option value="'; arrOutpt[++numIndex] = strValue;
        arrOutpt[++numIndex] = '"';
        if ( strValue == strChcValue ) arrOutpt[++numIndex] = ' selected';
        arrOutpt[++numIndex] = '>';

        arrOutpt[++numIndex] = strText;

    arrOutpt[++numIndex] = '</option>';

    return arrOutpt.join(Base.EMPTYSTR);
}

//==============================================================================
// 용도     : 콤보 자식 목록 문자열 가져오기
// 파라미터 : 1. blnInit      - 초기화
//            2. strCodeHdrId - 코드 헤더 ID
//            3. strValue     - 값
//            4. strText      - 텍스트
// 리턴값   : String
// 참고사항 :
// 기타     : 내부 호출용
// 작성일자 : 2014-04-17
//------------------------------------------------------------------------------
function gfnGetComboChildListStr(blnInit, strCodeHdrId, strValue, strText)
{
    var arrOutpt = new Array(), numIndex = -1;

    arrOutpt[++numIndex] = ( blnInit ? 'var strHtml' : 'strHtml' );
        arrOutpt[++numIndex] = strCodeHdrId;
        arrOutpt[++numIndex] = ( blnInit ? Base.SPACE : ' +' );
        arrOutpt[++numIndex] = Base.EQUAL;
        arrOutpt[++numIndex] = ' \'<option value="';
        arrOutpt[++numIndex] = strValue;
        arrOutpt[++numIndex] = '">';
        arrOutpt[++numIndex] = strText;
    arrOutpt[++numIndex] = '</option>\';';

    return arrOutpt.join(Base.EMPTYSTR);
}

//==============================================================================
// 용도     : 년도 콤보 바인딩
// 파라미터 : 1. objId        - ID
//            2. numStartYear - 시작년도
//            3. numEndYear   - 종료년도
//            4. strTopText   - 상단텍스트 (선택)
//            5. strChcValue  - 선택값     (선택)
//            6. objCallbackFunc - 콜백함수   (선택)
// 리턴값   :
// 참고사항 : 상단에 추가된 OPTION 태그의 value 속성값은 "" 이다.
// 기타     : 개발자 배포용
// 작성일자 : 2014-07-15
//------------------------------------------------------------------------------
function gfnBindYearCombo(objId, numStartYear, numEndYear, strTopText, strChcValue, objCallbackFunc)
{
    if ( typeof objId == "string" )
    {
        // 숫자 콤보 바인딩
        gfnBindNumCombo(objId, numStartYear, numEndYear, null, "년", strTopText, strChcValue, 4, objCallbackFunc);
    } else
    if ( typeof objId == "object" )
    {
        var LNGTH = objId.length;

        for (var numIndex = 0; numIndex < LNGTH; numIndex++ )
        {
            gfnBindNumCombo(objId[numIndex], numStartYear, numEndYear, null, "년", strTopText, strChcValue, 4, objCallbackFunc);
        }
    }
}

//==============================================================================
// 용도     : 월 콤보 바인딩
// 파라미터 : 1. strId   - ID
//            2. strTopText      - 상단텍스트 (선택)
//            3. strChcValue       - 선택값     (선택)
//            4. objCallbackFunc - 콜백함수   (선택)
// 리턴값   :
// 참고사항 : 상단에 추가된 OPTION 태그의 value 속성값은 "" 이다.
// 기타     : 개발자 배포용
// 작성일자 : 2014-07-15
//------------------------------------------------------------------------------
function gfnBindMonthCombo(strId, strTopText, strChcValue, objCallbackFunc)
{
    // 숫자 콤보 바인딩
    gfnBindNumCombo(strId, 1, 12, null, "월", strTopText, strChcValue, 2, objCallbackFunc);
}

//==============================================================================
// 용도     : 숫자 콤보 바인딩
// 파라미터 : 1. strId         - ID
//            2. numStartValue - 시작값
//            3. numEndValue   - 종료값
//            4. numStepValue  - 단계값       (선택) 참고) 양수로 입력
//            5. strTextSffx   - 텍스트접미사 (선택)
//            6. strTopText    - 상단텍스트   (선택)
//            7. strChcValue   - 선택값       (선택)
//            8. numValueZeroPadLngth - 값 0 Padding 길이 (선택)
//            9. objCallbackFunc      - 콜백함수     (선택)
// 리턴값   :
// 참고사항 : 바인딩 후 change 이벤트 핸들러 함수를 호출한다.
//            상단에 추가된 OPTION 태그의 value 속성값은 "" 이다.
// 기타     : 개발자 배포용
// 작성일자 : 2014-07-15
//------------------------------------------------------------------------------
function gfnBindNumCombo(strId, numStartValue, numEndValue, numStepValue, strTextSffx, strTopText, strChcValue, numValueZeroPadLngth, objCallbackFunc)
{
    if ( null == numStepValue ) numStepValue = 1;
    if ( null == strTextSffx  ) strTextSffx  = Base.EMPTYSTR;
    if ( null == strChcValue  ) strChcValue  = Base.EMPTYSTR;
    if ( null == numValueZeroPadLngth ) numValueZeroPadLngth = 0;

    var arrHtml = new Array(), numIndex = -1;

    if ( null != strTopText )
        arrHtml[++numIndex] = gfnGetComboChildTag(null, strTopText, strChcValue);

    if ( numStartValue <= numEndValue )
    {
        for ( var num = numStartValue ; num <= numEndValue ; num += numStepValue )
            arrHtml[++numIndex] = gfnGetComboChildTag(gfnLpad(num, numValueZeroPadLngth), gfnLpad(num, numValueZeroPadLngth) + strTextSffx, strChcValue);
    }
    else
    {
        for ( var num = numStartValue ; num >= numEndValue ; num -= numStepValue )
            arrHtml[++numIndex] = gfnGetComboChildTag(gfnLpad(num, numValueZeroPadLngth), gfnLpad(num, numValueZeroPadLngth) + strTextSffx, strChcValue);
    }

    gfnSetHtml(eval(strId), arrHtml.join(Base.EMPTYSTR)); // HTML 설정
    $("#" + strId).change(); // 변경

    arrHtml = null;

    if ( null != objCallbackFunc ) objCallbackFunc();
}