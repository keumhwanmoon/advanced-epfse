/*
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 테이블 jQuery
    - 최초작성일 : 2014-04-15
    - 작  성  자 : 유광식
    - 비      고 :
--------------------------------------------------------------------------------
*/

//==============================================================================
// 용도     : 테이블 초기화
// 파라미터 : objTable - 테이블
// 리턴값   :
// 참고사항 :
// 기타     : 개발자 배포용
// 작성일자 : 2014-04-15
//------------------------------------------------------------------------------
/*
var g_objTable = // 테이블
    {
        "tableId": "divList" // 테이블 DIV 태그 ID
      , "pageId": "divPage" // 페이지 DIV 태그 ID
      , "colId": // 바인딩 레코드 VO변수명
            [ "krnName", "engNfrmltName", "engName", "rowId" ]
      , "colStyle": // 열스타일
            [ null, null, null, "display: none" ]
      , "alignLeft":
            [ true, true, true ] // 좌측정렬여부
        // 이벤트관련
      , "onClickPage": fnInqr // 페이지 클릭시..
      , "onClickRow": function(objJsonRow, numRowIndex) // 행 클릭시..
            {
                fnDtl(objJsonRow["rowId"]); // 상세
            }
//	  , "onClickCell": function(objJsonRow, numColIndex, strCellHtml, numRowIndex) // 셀 클릭시..
//			{
//alert(objJsonRow["rowId"] + ", " + numColIndex + ", " + strCellHtml + ", " + numRowIndex);
//			}
// cf.) onClickRow 와 onClickCell 이벤트를 모두 설정하지 않는다.
    };
 */
function gfnInitTable(objTable)
{
    var LNGTH = objTable["colId"].length;

    if ( null == objTable["alignLeft"] ) objTable["alignLeft"] = new Array(LNGTH);
    if ( null == objTable["colStyle" ] ) objTable["colStyle" ] = new Array(LNGTH);
    if ( null == objTable["colFormt" ] ) objTable["colFormt" ] = new Array(LNGTH);
    if ( null == objTable["colHtml"  ] ) objTable["colHtml"  ] = new Array(LNGTH);
    if ( null == objTable["tdAnchor" ] ) objTable["tdAnchor" ] = new Array(LNGTH);

    var arr, numLngth;

    arr = objTable["tdAnchor"], numLngth = arr.length;
    for ( var num = 0 ; num < LNGTH ; num++ )
    {
        if ( num >= numLngth || null == arr[num] ) arr[num] = false;
    }

    arr = objTable["colHtml"], numLngth = arr.length;
    for ( var num = 0 ; num < LNGTH ; num++ )
    {
        if ( num >= numLngth || null == arr[num] ) arr[num] = true;
    }

    arr = null;
}

//==============================================================================
// 용도     : 테이블 정리
// 파라미터 : objTable - 테이블
// 리턴값   :
// 참고사항 :
// 기타     : 개발자 배포용
// 작성일자 : 2014-04-18
//------------------------------------------------------------------------------
function gfnClearTable(objTable)
{
    gfnSetHtml($("#" + objTable["tableId"] + " tbody").get(0), Base.EMPTYSTR);

    if ( null != objTable["pageId" ] )
    {
        gfnSetHtml($("#" + objTable["pageId"] + ">div:first-child").get(0), Base.EMPTYSTR);
        $('#' + objTable["pageId"] + ' [name="page"]').val(1);
    }
}

//==============================================================================
// 용도     : 테이블 바인딩
// 파라미터 : 1. objTable - 테이블
//            2. arrList  - 목록
// 리턴값   :
// 참고사항 : jQuery 를 include 한다.
// 기타     : 개발자 배포용
// 작성일자 : 2014-04-18
//------------------------------------------------------------------------------
function gfnBindTableData(objTable, arrList)
{
    if ( null == arrList || 0 >= arrList.length ) return;

    var LNGTH = arrList.length;

    var arrOutput = new Array(), numIndex = -1;

    for ( var num = 0 ; num < LNGTH ; num++ )
        arrOutput[++numIndex] = gfnGetRowHtml(objTable, arrList[num]);

    gfnSetHtml($("#" + objTable["tableId"] + " tbody").get(0), arrOutput.join(Base.EMPTYSTR));

    arrOutput = null;

    gfnSetTableRowClick(objTable);
    gfnSetTableCellClick(objTable);

    if ( null != objTable["pageId"] ) gfnBindTablePage(objTable, arrList);

    $(window).resize();
}

//==============================================================================
// 용도     : 행 HTML 가져오기
// 파라미터 : 1. objTable   - 테이블
//            2. objJsonRow - JSON 행
// 리턴값   :
// 참고사항 :
// 기타     : 개발자 배포용
// 작성일자 : 2014-04-15
//------------------------------------------------------------------------------
function gfnGetRowHtml(objTable, objJsonRow)
{
    var arrColId = objTable["colId"], LNGTH = arrColId.length;
    var arrAlignLeft = objTable["alignLeft"];
    var arrColStyle = objTable["colStyle"];
    var arrColFormt = objTable["colFormt" ];
    var arrColHtml = objTable["colHtml"];
    var arrTdAnchor = objTable["tdAnchor"];
    var TD = "<td", TD2 = '<td class="left"', TD6 = ' style="', TD7 = '"', TD8 = '>', TD9 = "</td>";
    var ANC = '<a href="#">', ANC9 = '</a>';
    var LT = "&lt;";

    var arrOutput = new Array(), numIndex = -1;

    arrOutput[++numIndex] = "<tr>";

    for ( var num = 0 ; num < LNGTH ; num++ )
    {
        arrOutput[++numIndex] = ( arrAlignLeft[num] ? TD2 : TD );
        if ( !gfnIsEmpty(arrColStyle[num]) )
        {
            arrOutput[++numIndex] = TD6;
            arrOutput[++numIndex] = arrColStyle[num];
            arrOutput[++numIndex] = TD7;
        }
        arrOutput[++numIndex] = TD8;
        if ( arrTdAnchor[num] ) arrOutput[++numIndex] = ANC;
            arrOutput[++numIndex] = ( null != arrColFormt[num] ?
                    arrColFormt[num](objJsonRow[arrColId[num]], objJsonRow) :
                        objJsonRow[arrColId[num]] );
            if ( !arrColHtml[num] ) arrOutput[numIndex] = arrOutput[numIndex].replace(/</g, LT);
            if ( arrTdAnchor[num] ) arrOutput[++numIndex] = ANC9;
        arrOutput[++numIndex] = TD9;
    }

    arrOutput[++numIndex] = "</tr>";

    arrTdAnchor = null; arrColHtml = null; arrColFormt = null; arrColStyle = null; arrAlignLeft = null; arrColId = null;

    return arrOutput.join(Base.EMPTYSTR);
}

//==============================================================================
// 용도     : 테이블 페이지 바인딩
// 파라미터 : 1. objTable - 테이블
//            2. arrList  - 목록
// 리턴값   :
// 참고사항 :
// 기타     : 개발자 배포용
// 작성일자 : 2014-04-15
//------------------------------------------------------------------------------
function gfnBindTablePage(objTable, arrList)
{
    var arrOutput = new Array(), numIndex = -1;

    var MAX_PAGE = ( null != arrList && 0 < arrList.length ? gfnGetInt(arrList[0]["maxPage"]) : 0 );
    var PAGE = ( 0 < MAX_PAGE ? gfnGetInt(arrList[0]["page"]) : 0 );

    if ( 0 < MAX_PAGE )
    {
        var ANC = '<a>', ANC9 = '</a>';
        var STRONG = '<a class="on">', STRONG9 = '</a>';

        var numEndPage   = ( gfnGetInt(( PAGE - 1 ) / 10) + 1 ) * 10;
        var numStartPage = numEndPage - 9;
        if ( MAX_PAGE < numEndPage ) numEndPage = MAX_PAGE;

        arrOutput[++numIndex] = '<a class="first"><span class="ir"></span></a>';
        arrOutput[++numIndex] = '<a class="prev"><span class="ir"></span></a>';

        for ( var num = numStartPage ; num <= numEndPage ; num++ )
        {
            arrOutput[++numIndex] = ( PAGE == num ? STRONG  : ANC  );
                arrOutput[++numIndex] = num.toString();
            arrOutput[++numIndex] = ( PAGE == num ? STRONG9 : ANC9 );
        }

        arrOutput[++numIndex] = '<a class="next"><span class="ir"></span></a>';
        arrOutput[++numIndex] = '<a class="last"><span class="ir"></span></a>';
    }

    gfnSetHtml($("#" + objTable["pageId"] + ">div:first-child").get(0), arrOutput.join(Base.EMPTYSTR));

    arrOutput = null;

    gfnSetTablePageClick(objTable, PAGE, MAX_PAGE);
}

//==============================================================================
// 용도     : 테이블 행 클릭 설정
// 파라미터 : objTable - 테이블
// 리턴값   :
// 참고사항 :
// 기타     : 개발자 배포용
// 작성일자 : 2014-05-02
//------------------------------------------------------------------------------
function gfnSetTableRowClick(objTable)
{
    if ( null == objTable["onClickRow"] ) return;

    var HEADER = $("#" + objTable["tableId"] + " thead tr").length;

    $("#" + objTable["tableId"] + " tbody tr").each(function()
        {
            $(this).click(function()
                {
                    var objTr = event.srcElement;
                    for ( var num = 0 ; num < 5 ; num++ )
                    {
                        if ( "TR" != objTr.tagName ) objTr = objTr.parentNode;
                        else                         break;
                    }

                    gfnClickTableRow(objTr, objTable["colId"], HEADER, objTable["onClickRow"]);

                    objTr = null;
                });
        });
}

//==============================================================================
// 용도     : 테이블 셀 클릭 설정
// 파라미터 : objTable - 테이블
// 리턴값   :
// 참고사항 :
// 기타     : 개발자 배포용
// 작성일자 : 2014-05-02
//------------------------------------------------------------------------------
function gfnSetTableCellClick(objTable)
{
    if ( null == objTable["onClickCell"] ) return;

    $("#" + objTable["tableId"] + " tbody td").each(function()
        {
            $(this).click(function()
                {
                    var objTr = event.srcElement;
                    var objTd = event.srcElement;

                    for ( var num = 0 ; num < 5 ; num++ )
                    {
                        if ( "TR" != objTr.tagName ) objTr = objTr.parentNode;
                        else                         break;
                    }
                    for ( var num = 0 ; num < 5 ; num++ )
                    {
                        if ( "TD" != objTd.tagName ) objTd = objTd.parentNode;
                        else                         break;
                    }

                    gfnClickTableCell(objTd, objTr, objTable["colId"], objTable["onClickCell"]);

                    objTd = null; objTr = null;
                });
        });
}

//==============================================================================
// 용도     : 테이블 페이지 클릭 설정
// 파라미터 : 1. objTable   - 테이블
//            2. numPage    - 페이지
//            3. numMaxPage - 최대페이지
// 리턴값   :
// 참고사항 :
// 기타     : 개발자 배포용
// 작성일자 : 2014-05-02
//------------------------------------------------------------------------------
function gfnSetTablePageClick(objTable, numPage, numMaxPage)
{
    if ( 0 >= numMaxPage ) return;

    var objTagList = $('#' + objTable["pageId"] + ' [class="pageNav"]>a');
    var LNGTH = objTagList.length - 2;

    if ( 0 < LNGTH )
    {
        if ( 1 < numPage )
        {
            $(objTagList.get(0)).click(function() { gfnClickTablePage(objTable["pageId"], 1, objTable["onClickPage"]); });
            $(objTagList.get(1)).click(function() { gfnClickTablePage(objTable["pageId"], numPage - 1, objTable["onClickPage"]); });

            objTagList.get(0).className = "first"; objTagList.get(0).style.cursor = "hand";
            objTagList.get(1).className = "prev" ; objTagList.get(1).style.cursor = "hand";
        } else
        {
            objTagList.get(0).className = "first dis"; objTagList.get(0).style.cursor = "default";
            objTagList.get(1).className = "prev dis"; objTagList.get(1).style.cursor = "default";
        }

        for ( var num = 2 ; num < LNGTH ; num++ )
            $(objTagList.get(num)).click(function() { gfnClickTablePage(objTable["pageId"], event.srcElement.innerText, objTable["onClickPage"]); });

        if ( numMaxPage > numPage )
        {
            $(objTagList.get(num    )).click(function() { gfnClickTablePage(objTable["pageId"], numPage + 1, objTable["onClickPage"]); });
            $(objTagList.get(num + 1)).click(function() { gfnClickTablePage(objTable["pageId"], numMaxPage , objTable["onClickPage"]); });

            objTagList.get(num    ).className = "next"; objTagList.get(num    ).style.cursor = "hand";
            objTagList.get(num + 1).className = "last" ; objTagList.get(num + 1).style.cursor = "hand";
        } else
        {
            objTagList.get(num    ).className = "next dis"; objTagList.get(num    ).style.cursor = "default";
            objTagList.get(num + 1).className = "last dis" ; objTagList.get(num + 1).style.cursor = "default";
        }
    }

    objTagList = null;
}

//==============================================================================
// 용도     : 테이블 페이지 가져오기
// 파라미터 : objTable - 테이블
// 리턴값   : String
// 참고사항 :
// 기타     : 개발자 배포용
// 작성일자 : 2014-04-15
//------------------------------------------------------------------------------
function gfnGetTablePage(objTable)
{
    return gfnGetFormData(objTable["pageId"]);
}

//==============================================================================
// 용도     : 테이블 행 클릭시..
// 파라미터 : 1. objTr     - TR
//            2. arrColId  - 열ID
//            3. numHeader - 헤더
//            4. objFunc   - 함수(선택)
// 리턴값   :
// 참고사항 :
// 기타     : 내부 호출용
// 작성일자 : 2014-04-15
//------------------------------------------------------------------------------
function gfnClickTableRow(objTr, arrColId, numHeader, objFunc)
{
    var objJsonRow = { };

    $(objTr).find("td").each(function(num)
        {
            objJsonRow[arrColId[num]] = $(this).text();
        });

    if ( null != objFunc ) objFunc(objJsonRow, objTr.rowIndex - numHeader);

    objJsonRow = null;
}

//==============================================================================
// 용도     : 테이블 셀 클릭시..
// 파라미터 : 1. objTd    - TD
//            2. objTr    - TR
//            3. arrColId - 열ID
//            4. objFunc  - 함수(선택)
// 리턴값   :
// 참고사항 :
// 기타     : 내부 호출용
// 작성일자 : 2014-04-16
//------------------------------------------------------------------------------
function gfnClickTableCell(objTd, objTr, arrColId, objFunc)
{
    var objJsonRow = { };

    $(objTr).find("td").each(function(num)
        {
            objJsonRow[arrColId[num]] = $(this).text();
        });

    if ( null != objFunc ) objFunc(objJsonRow, objTd.cellIndex, objTd.innerText, objTr.rowIndex);

    objJsonRow = null;
}

//==============================================================================
// 용도     : 테이블 페이지 클릭시..
// 파라미터 : 1. strPageId - 페이지ID
//            2. numPage   - 페이지
//            3. objFunc   - 함수(선택)
// 리턴값   :
// 참고사항 :
// 기타     : 내부 호출용
// 작성일자 : 2014-04-15
//------------------------------------------------------------------------------
function gfnClickTablePage(strPageId, numPage, objFunc)
{
    $('#' + strPageId + ' [name="page"]').val(numPage);

    if ( null != objFunc ) objFunc();
}

//==============================================================================
// 용도     : 테이블 TR 객체 가져오기
// 파라미터 : 1. objTable - 테이블
//            2. numIndex - 인덱스
// 리턴값   : Object
// 참고사항 :
// 기타     : 개발자 배포용
// 작성일자 : 2014-04-17
//------------------------------------------------------------------------------
function gfnGetTableTrObj(objTable, numIndex)
{
    var LNGTH = $("#" + objTable["tableId"] + " tbody tr").length;

    return ( 0 < LNGTH && LNGTH > numIndex ? $("#" + objTable["tableId"] + " tbody tr").get(numIndex) : null );
}

//==============================================================================
// 용도     : 테이블 일시 포맷
// 파라미터 : objData - 데이터
// 리턴값   : String
// 참고사항 :
// 기타     : 개발자 배포용
// 작성일자 : 2014-04-28
//------------------------------------------------------------------------------
function gfnFormtTableDtm(objData)
{
    var arrOutpt = new Array(), numIndex = -1;

    if ( null != objData )
    {
        var DATA = objData.toString(), LNGTH = DATA.length;

        if ( 14 == LNGTH || 12 == LNGTH ) // YYYYMMDDHHMISS // YYYYMMDDHHMI
            arrOutpt[++numIndex] = gfnFormt(DATA, Base.DTM);
        else
        if ( 8 == LNGTH || 6 == LNGTH ) // YYYYMMDD // YYYYMM
            arrOutpt[++numIndex] = gfnFormt(DATA, Base.DATE);
        else
            arrOutpt[++numIndex] = DATA;
    }

    return arrOutpt.join(Base.EMPTYSTR);
}

//==============================================================================
// 용도     : 테이블 여부 포맷
// 파라미터 : 1. objData    - 데이터
//            2. objJsonRow - JSON 행
// 리턴값   : String
// 참고사항 :
// 기타     : 개발자 배포용
// 작성일자 : 2014-04-28
//------------------------------------------------------------------------------
function gfnFormtTableYn(objData)
{
    return gfnFormt(objData, Base.YN);
}

//==============================================================================
// 용도     : 테이블 숫자 포맷
// 파라미터 : 1. objData    - 데이터
//            2. objJsonRow - JSON 행
// 리턴값   : String
// 참고사항 :
// 기타     : 개발자 배포용
// 작성일자 : 2014-05-09
//------------------------------------------------------------------------------
function gfnFormtTableNum(objData)
{
    return gfnFormt(objData, Base.NUM);
}

//==============================================================================
// 용도     : 테이블 법인등록번호 포맷
// 파라미터 : 1. objData    - 데이터
//            2. objJsonRow - JSON 행
// 리턴값   : String
// 참고사항 :
// 기타     : 개발자 배포용
// 작성일자 : 2014-05-09
//------------------------------------------------------------------------------
function gfnFormtTableCorpno(objData)
{
    return gfnFormt(objData, Base.CORPNO);
}

//==============================================================================
// 용도     : 테이블 사업자등록번호 포맷
// 파라미터 : 1. objData    - 데이터
//            2. objJsonRow - JSON 행
// 리턴값   : String
// 참고사항 :
// 기타     : 개발자 배포용
// 작성일자 : 2014-05-09
//------------------------------------------------------------------------------
function gfnFormtTableBzno(objData)
{
    return gfnFormt(objData, Base.BZNO);
}

//==============================================================================
// 용도     : 테이블 우편 포맷
// 파라미터 : 1. objData    - 데이터
//            2. objJsonRow - JSON 행
// 리턴값   : String
// 참고사항 :
// 기타     : 개발자 배포용
// 작성일자 : 2014-05-09
//------------------------------------------------------------------------------
function gfnFormtTablePost(objData)
{
    return gfnFormt(objData, Base.POST);
}