var Attch =
    {
        "NOIMAGE": "/common/images/common/noimage.gif"

      , "ATTCH_CONTNR": "AttchContnr"
      , "THMNL_IMG": '[class="Thmnl"] img'
      , "ATTCH_FILE": '[class="AttchList"] [class="AttchFile"]'
      , "ATTCH_HREF": '[class="AttchList"] [class="AttchHref"]'
      , "ORG_FILE_NAME": '[class="AttchList"] [class="OrgFileName"]'
      , "TXT_ORG_FILE_NAME": '[name="orgFileName"]'
      , "CRRNT_COUNT": '[class="AttchBtn"] [class="AttchCount"] [class="CrrntCount"]'
      , "MAX_COUNT": '[class="AttchBtn"] [class="AttchCount"] [class="MaxCount"]'
      , "MAX_SIZE": '[class="AttchBtn"] [class="AttchSize"] [class="MaxSize"]'
      , "VAR_ID": '[class="AttchSetValue"] [class="VarId"]'
      , "VAR_NAME": '[class="AttchSetValue"] [class="VarName"]'
      , "ADDR_NAME_PRFX": '[class="AttchSetValue"] [class="AddrNamePrfx"]'
      , "TARG_ID": '[class="AttchSetValue"] [class="TargId"]'
    };

//==============================================================================
// 용도     : 첨부 원본파일명 변경시..
// 파라미터 :
// 리턴값   :
// 참고사항 :
// 기타     : 개발자 배포용
// 작성일자 : 2014-05-16
//------------------------------------------------------------------------------
function gfnChgAttchOrgFileName(objContnr, strValue)
{
    var VALUE = ( null == objContnr ? event.srcElement.value : strValue );
    var obj = ( null == objContnr ? $(event.srcElement).parent().parent() : objContnr );
    if ( Attch.ATTCH_CONTNR != obj.attr("class") ) return;

    obj.find(Attch.ORG_FILE_NAME).val(VALUE);
    obj.find(Attch.ATTCH_HREF).val(VALUE);

    var SRC = obj.find(Attch.ATTCH_HREF + '>option:selected').text();

    obj.find(Attch.THMNL_IMG).attr("src", ( !gfnGetAttchImageYn(SRC) ? Attch.NOIMAGE : SRC ));

    obj = null;
}

//==============================================================================
// 용도     : 팝업 열기 클릭시..
// 파라미터 :
// 리턴값   :
// 참고사항 :
// 기타     : 개발자 배포용
// 작성일자 : 2014-05-16
//------------------------------------------------------------------------------
function gfnClickAttchPopupOpen()
{
    var obj = $(event.srcElement).parent().parent().parent();
    if ( Attch.ATTCH_CONTNR != obj.attr("class") ) return;

    var MAX_COUNT   = gfnGetInt(obj.find(Attch.MAX_COUNT).text());
    var CRRNT_COUNT = gfnGetInt(obj.find(Attch.CRRNT_COUNT).text());
    if ( MAX_COUNT <= CRRNT_COUNT ) return;

    var objOutpt = gfnOpenAttchFileDlg(obj); // 파일 대화창 열기

    if ( null != objOutpt )
    {
        var ROW_ID = objOutpt["rowId"];

        obj.find(Attch.ORG_FILE_NAME).html
        (
            obj.find(Attch.ORG_FILE_NAME).html()
          + '<option value="' + ROW_ID + '">' + objOutpt["orgFileName" ] + '</option>'
        ).val(ROW_ID);

        obj.find(Attch.ATTCH_HREF).html
        (
            obj.find(Attch.ATTCH_HREF).html()
          + '<option value="' + ROW_ID + '">' + objOutpt["attchHref"] + '</option>'
        ).val(ROW_ID);

        obj.find(Attch.ATTCH_FILE).html
        (
            obj.find(Attch.ATTCH_FILE).html()
          + '<option value="' + ROW_ID + '">' + objOutpt["orgFileName"]
          + " (" + gfnFormt(objOutpt["fileSizeAmt"], Base.NUM) + " " + objOutpt["sizeUnitCode"] + ')</option>'
        ).val(ROW_ID);

        obj.find(Attch.TXT_ORG_FILE_NAME).val(objOutpt["orgFileName"]);

        gfnChgAttchOrgFileName(obj, ROW_ID);

        obj.find(Attch.CRRNT_COUNT)
            .text(obj.find(Attch.ATTCH_FILE + '>option[value]').length);

        objOutpt = null;
    }
}

//==============================================================================
// 용도     : 선택 삭제 클릭시..
// 파라미터 :
// 리턴값   :
// 참고사항 :
// 기타     : 개발자 배포용
// 작성일자 : 2014-05-16
//------------------------------------------------------------------------------
function gfnClickAttchChcDelt(strContnr)
{
    if ( strContnr == undefined ) obj = $(event.srcElement).parent().parent().parent();
    else obj = $(strContnr);
    if ( Attch.ATTCH_CONTNR != obj.attr("class") ) return;

    var VALUE = obj.find(Attch.ATTCH_FILE).val();

    if ( !gfnIsEmpty(VALUE) )
    {
        // 제거
        obj.find(Attch.ATTCH_FILE + '>option[value="' + VALUE + '"]').remove();
        obj.find(Attch.ATTCH_HREF + '>option[value="' + VALUE + '"]').remove();
        obj.find(Attch.ORG_FILE_NAME + '>option[value="' + VALUE + '"]').remove();
        obj.find(Attch.ORG_FILE_NAME + '>option[value="' + VALUE + '"]').remove();
        obj.find(Attch.TXT_ORG_FILE_NAME).val(Base.EMPTYSTR);

        obj.find(Attch.THMNL_IMG).attr("src", Attch.NOIMAGE);

        obj.find(Attch.CRRNT_COUNT)
            .text(obj.find(Attch.ATTCH_FILE + '>option[value]').length);
    }

    obj = null;
}

//==============================================================================
// 용도     : HTML 추가 클릭시..
// 파라미터 :
// 리턴값   :
// 참고사항 : edit를 include 한다.
// 기타     : 개발자 배포용
// 작성일자 : 2014-05-16
//------------------------------------------------------------------------------
function gfnClickAttchHtmlAdd()
{
    var obj = $(event.srcElement).parent().parent().parent();
    if ( Attch.ATTCH_CONTNR != obj.attr("class") ) return;

    var VALUE = obj.find(Attch.ATTCH_FILE).val();
    if ( gfnIsEmpty(VALUE) ) return;

    var ID = obj.find(Attch.TARG_ID).val();

    var ORG_FILE_NAME = obj.find(Attch.ORG_FILE_NAME + '>option:selected').text();
    var ADDR_NAME_PRFX = obj.find(Attch.ADDR_NAME_PRFX).val();

    var strHtml = ( !gfnGetAttchImageYn(ORG_FILE_NAME) ?
        '<A href="' + ADDR_NAME_PRFX + obj.find(Attch.ATTCH_HFRE + '>option:selected').text() + '" target=_self>'
      +     ORG_FILE_NAME
      + '</A>'
      + '<SPAN style="TEXT-DECORATION: none">&nbsp;</SPAN>' :
        '<IMG title="' + ORG_FILE_NAME + '" src="' + ADDR_NAME_PRFX + obj.find(Attch.ATTCH_HREF + '>option:selected').text() + '">'
      + '<BR style="CLEAR: both">' );

    gfnPasteEditHtml(ID, strHtml); // EDIT HTML 붙여넣기

    strHtml = null; obj = null;
}

//==============================================================================
// 용도     : 다운로드 클릭시..
// 파라미터 :
// 리턴값   :
// 참고사항 :
// 기타     : 개발자 배포용
// 작성일자 : 2014-05-19
//------------------------------------------------------------------------------
function gfnClickAttchDownload()
{
    var obj = $(event.srcElement).parent().parent().parent();
    if ( Attch.ATTCH_CONTNR != obj.attr("class") ) return;

    var ATTCH_ID  = obj.find(Attch.ATTCH_FILE + '>option:selected').val();
    if ( gfnIsEmpty(ATTCH_ID) ) return;

    var objParam =
        {
            "fileInfo": obj.find(Attch.ATTCH_FILE + '>option:selected').text()
          , "comParamScrAddrName": $('[name="comParamScrAddrName"]').val()
          , "attchId": ATTCH_ID
        };

    return window.showModelessDialog("/system/getAttchPopup.do", objParam,
            "dialogHeight: 200px; dialogWidth: 430px; help: no; scroll: no; status: no");
}

//==============================================================================
// 용도     : 파일 대화창 열기
// 파라미터 : objContnr - 컨테이너
// 리턴값   :
// 참고사항 :
// 기타     : 내부 호출용
// 작성일자 : 2014-05-16
//------------------------------------------------------------------------------
function gfnOpenAttchFileDlg(objContnr)
{
    if ( Attch.ATTCH_CONTNR != objContnr.attr("class") ) return;

    var obj = { };

    obj["comParamScrAddrName"] = $('[name="comParamScrAddrName"]').val();

    obj["varId"  ] = objContnr.find(Attch.VAR_ID).val();
    obj["varName"] = objContnr.find(Attch.VAR_NAME).val();

    obj["fileMaxSize"] = $(Attch.MAX_SIZE).text();

    return window.showModalDialog("/system/attchPopup.do", obj,
            "dialogHeight: 200px; dialogWidth: 410px; help: no; scroll: no; status: no");
}

//==============================================================================
// 용도     : 이미지 여부 가져오기
// 파라미터 : strData - 데이터
// 리턴값   :
// 참고사항 :
// 기타     : 내부 호출용
// 작성일자 : 2014-05-16
//------------------------------------------------------------------------------
function gfnGetAttchImageYn(strData)
{
    var DATA = ( 4 < strData.length ? strData.substr(strData.length - 4).toLowerCase() : null );

    return ( null != DATA && 0 <= ".jpg|.bmp|.png|.gif".indexOf(DATA) );
}

//==============================================================================
// 용도     : 파일 목록 바인딩
// 파라미터 : 1. objContnr - 컨테이너
//            2. arrData   - 데이터
// 리턴값   :
// 참고사항 :
// 기타     : 개발자 배포용
// 작성일자 : 2014-05-16
//------------------------------------------------------------------------------
/*
var arrData = [
        { "attchId": "2_1001", "orgFileName": "base.css", "fileSizeAmt": 1370, "sizeUnitCode": "Bytes", "attchHref": "/attchFile/com/develop/edit/2_1001/base.css" }
      , { "attchId": "2_1001", "orgFileName": "logo.gif", "fileSizeAmt": 2.76, "sizeUnitCode": "KB"   , "attchHref": "/attchFile/com/develop/edit/2_1001/logo.gif" }
    ];
*/
function gfnBindAttchFileList(objContnr, arrData)
{
    if ( Attch.ATTCH_CONTNR != objContnr.attr("class") ) return;

    var LNGTH = ( null != arrData ? arrData.length : 0 );
    var OPTION = '<option value="', OPTION2 = '">', OPTION9 = '</option>';
    var ATTCH_ID = 'attchId', ORG_FILE_NAME = "orgFileName", FILE_SIZE_AMT = "fileSizeAmt";
    var SIZE_UNIT_CODE = "sizeUnitCode", ATTCH_HREF = "attchHref";

    var arr = new Array(), arr2 = new Array(), arr3 = new Array();
    var objRow;

    for ( var num = 0 ; num < LNGTH ; num++ )
    {
        objRow = arrData[num];

        arr [ arr.length] = OPTION + objRow[ATTCH_ID] + OPTION2 + objRow[ORG_FILE_NAME] + " (" + gfnFormt(objRow[FILE_SIZE_AMT], Base.NUM) + " " + objRow[SIZE_UNIT_CODE] + ')' + OPTION9;
        arr2[arr2.length] = OPTION + objRow[ATTCH_ID] + OPTION2 + objRow[ATTCH_HREF   ] + OPTION9;
        arr3[arr3.length] = OPTION + objRow[ATTCH_ID] + OPTION2 + objRow[ORG_FILE_NAME] + OPTION9;
    }

    gfnSetHtml(objContnr.find(Attch.ATTCH_FILE).get(0),  arr.join(Base.EMPTYSTR));
    gfnSetHtml(objContnr.find(Attch.ATTCH_HREF).get(0), arr2.join(Base.EMPTYSTR));
    gfnSetHtml(objContnr.find(Attch.ORG_FILE_NAME).get(0), arr3.join(Base.EMPTYSTR));

    objContnr.find(Attch.CRRNT_COUNT).text(LNGTH);

    if ( 0 < LNGTH )
    {
        var FIRST_ATTCH_ID = arrData[0][ATTCH_ID];

        objContnr.find(Attch.ATTCH_FILE).val(FIRST_ATTCH_ID);
        gfnChgAttchOrgFileName(objContnr, arrData[0][ATTCH_ID]);
    }

    objRow = null; arr = null; arr2 = null; arr3 = null; arrData = null;
}

//==============================================================================
// 용도     : ID 목록 가져오기
// 파라미터 : objContnr - 컨테이너
// 리턴값   :
// 참고사항 :
// 기타     : 개발자 배포용
// 작성일자 : 2014-05-19
//------------------------------------------------------------------------------
function gfnGetAttchIdList(objContnr)
{
    var arrOutpt = new Array();

    objContnr.find(Attch.ATTCH_FILE + ">option[value]").each(function()
        {
            arrOutpt[arrOutpt.length] = $(this).val();
        });

    return arrOutpt;
}

//==============================================================================
// 용도     : 첨부영역 초기화
// 파라미터 :
// 리턴값   :
// 참고사항 :
// 기타     : 개발자 배포용
// 작성일자 : 2014-09-03
//------------------------------------------------------------------------------
function gfnClearAttch(objContnr)
{
    if ( Attch.ATTCH_CONTNR != objContnr.attr("class") ) return;

    // 제거
    objContnr.find(Attch.ATTCH_FILE + '>option').remove();
    objContnr.find(Attch.ATTCH_HREF + '>option').remove();
    objContnr.find(Attch.ORG_FILE_NAME + '>option').remove();

    objContnr.find(Attch.THMNL_IMG).attr("src", Attch.NOIMAGE);

    objContnr.find(Attch.CRRNT_COUNT)
        .text(objContnr.find(Attch.ATTCH_FILE + '>option[value]').length);
}
