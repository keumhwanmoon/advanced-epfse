//==============================================================================
// 용도     : 테이블 화면 가져오기
// 파라미터 : strDate - 일자
// 리턴값   : String
// 참고사항 : 
// 기타     : 내부 호출용
// 작성일자 : 2014-06-23
//------------------------------------------------------------------------------
function gfnGetTableScr(strDate)
{
	var arrOutpt = new Array(), numIndex = -1;

	var arrQuery10 = txaQuery10.value.split("\r\n"); arrQuery10 = arrQuery10.slice(0, arrQuery10.length - 1);
	var arrQuery11 = txaQuery11.value.split("\r\n"); arrQuery11 = arrQuery11.slice(0, arrQuery11.length - 1);
	var arrQuery12 = txaQuery12.value.split("\r\n"); arrQuery12 = arrQuery12.slice(0, arrQuery12.length - 1);
	var arrQuery13 = txaQuery13.value.split("\r\n"); arrQuery13 = arrQuery13.slice(0, arrQuery13.length - 1);

	// 등록정보를 제거한다.
	var RGST_INFO = "|rgstDtm|rgstUserId|updtDtm|updtUserId|";
	for ( var num = 0 ; num < arrQuery10.length ; num++ )
	{
		if ( 0 <= RGST_INFO.indexOf(arrQuery10[num]) )
		{
			arrQuery10[num] = null; arrQuery11[num] = null; arrQuery12[num] = null;
		} else
		{
			arrQuery10[num] += "\r\n"; arrQuery11[num] += "\r\n"; arrQuery12[num] += "\r\n";
		}
	}
	arrQuery10 = arrQuery10.join(Base.EMPTYSTR).split("\r\n");
	arrQuery11 = arrQuery11.join(Base.EMPTYSTR).split("\r\n");
	arrQuery12 = arrQuery12.join(Base.EMPTYSTR).split("\r\n");
	arrQuery10 = arrQuery10.slice(0, arrQuery10.length - 1);
	arrQuery11 = arrQuery11.slice(0, arrQuery11.length - 1);
	arrQuery12 = arrQuery12.slice(0, arrQuery12.length - 1);

	var LNGTH10 = arrQuery10.length;
	var LNGTH10_2 = ( "1" != hidPkCount.value || Base.YES != hidSeqYn.value ? LNGTH10 : LNGTH10 - 1 );

	var numCode = 0, numMaxByteSize10 = 0, numMaxByteSize11 = 0, numByteSize10, numByteSize11;
	for ( var num = 0 ; num < LNGTH10 ; num++ )
	{
		numByteSize10 = gfnGetByteSize(arrQuery10[num]); numByteSize11 = gfnGetByteSize(arrQuery11[num]);
		if ( numByteSize10 > numMaxByteSize10 ) numMaxByteSize10 = numByteSize10;
		if ( numByteSize11 > numMaxByteSize11 ) numMaxByteSize11 = numByteSize11;
		if ( fnExist(arrQuery10[num], "code") ) numCode++;
	}

	arrOutpt[++numIndex] = '<' + '!-- 오류가 발생하고 있으니 이 주석을 제거해주세요. --' + '>';
	arrOutpt[++numIndex] = '<' + '%--';
	arrOutpt[++numIndex] = '--------------------------------------------------------------------------------';
	arrOutpt[++numIndex] = '	PROJECT NAME : ' + $("#sltPrjctName>option:selected").text();
	arrOutpt[++numIndex] = '--------------------------------------------------------------------------------';
	arrOutpt[++numIndex] = '	- 단위업무명 : ' + fnGetText(txtTableKrnName.value) + ' 그리드';
	arrOutpt[++numIndex] = '	- 최초작성일 : ' + gfnFormt(strDate, "DATE");
	arrOutpt[++numIndex] = '	- 작  성  자 : ' + txtUserName.value;
	arrOutpt[++numIndex] = '	- 비      고 : ';
	arrOutpt[++numIndex] = '--------------------------------------------------------------------------------';
	arrOutpt[++numIndex] = '--%' + '>';
	arrOutpt[++numIndex] = '<' + '%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %' + '>';
	arrOutpt[++numIndex] = '<' + '%@ include file="../../../epfse/system/hdr.jsp" %' + '><' + '%-- 헤더 관련 --%' + '>';
	arrOutpt[++numIndex] = '<' + '!-- CSS 및 JavaScript 관련 START //--' + '>';
	arrOutpt[++numIndex] = '<' + 'script type="text/javascript" src="/common/realGrid/scripts/browserCheck.js"' + '><' + '/script' + '><' + '!-- 그리드 관련 //--' + '>';
	arrOutpt[++numIndex] = '<' + 'script type="text/javascript" src="/common/realGrid/scripts/realgridlic.js" ' + '><' + '/script' + '>';
	arrOutpt[++numIndex] = '<' + 'script type="text/javascript" src="/common/realGrid/scripts/realgridplus.js"' + '><' + '/script' + '>';
	arrOutpt[++numIndex] = '<' + 'script type="text/javascript" src="/common/realGrid/scripts/realgridutil.js"' + '><' + '/script' + '>';
	arrOutpt[++numIndex] = '<' + 'script type="text/javascript" src="/common/realGrid/scripts/swfobject.js"   ' + '><' + '/script' + '>';
	arrOutpt[++numIndex] = Base.EMPTYSTR;
	arrOutpt[++numIndex] = '<' + 'script src="/common/js/grid.js" charset="utf-8"' + '><' + '/script' + '><' + '!-- 그리드 jQuery //--' + '>';
	arrOutpt[++numIndex] = '<' + 'script type="text/javascript"' + '>';
	arrOutpt[++numIndex] = '<!--';
	arrOutpt[++numIndex] = '//< Sub Procedure and Function - GLOBAL 영역 >';
	arrOutpt[++numIndex] = 'var g_strGridId = "divGrid", g_arrFieldName = null; // 그리드ID // 그리드 FIELD 명';
	if ( 0 < numCode )
	arrOutpt[++numIndex] = 'var g_arrGridComboCode = new Array(); // 그리드 콤보 배열';
	arrOutpt[++numIndex] = Base.EMPTYSTR;
	arrOutpt[++numIndex] = '//< Sub Procedure and Function - MAIN 영역 >';
	arrOutpt[++numIndex] = '//==============================================================================';
	arrOutpt[++numIndex] = '// DOM 준비시..';
	arrOutpt[++numIndex] = '//------------------------------------------------------------------------------';
	arrOutpt[++numIndex] = '$(document).ready(function()';
	arrOutpt[++numIndex] = '{';
	arrOutpt[++numIndex] = '	gfnInit(); // 초기화';
	arrOutpt[++numIndex] = '	fnCtrlScr("READY"); // 화면 제어 : DOM준비';
	arrOutpt[++numIndex] = '	fnBindCombo(); // 콤보 바인딩';
	arrOutpt[++numIndex] = Base.EMPTYSTR;
	arrOutpt[++numIndex] = '	if ( \'$' + '{requestScope["MENU.authCode"]}\' == Base.WRITE_AUTH ) // 쓰기 권한이 있는 경우..';
	arrOutpt[++numIndex] = '	{';
	arrOutpt[++numIndex] = '		btnAdd.parentElement.style.visibility = "visible";';
	arrOutpt[++numIndex] = '		btnImport.parentElement.style.visibility = "visible";';
	arrOutpt[++numIndex] = '		btnSave.parentElement.style.visibility = "visible";';
	arrOutpt[++numIndex] = '		btnDelt.parentElement.style.visibility = "visible";';
	arrOutpt[++numIndex] = '	}';
	arrOutpt[++numIndex] = '});';
	arrOutpt[++numIndex] = Base.EMPTYSTR;
	arrOutpt[++numIndex] = '// < Sub Procedure and Function - 주요 이벤트 영역 >';
	arrOutpt[++numIndex] = '//==============================================================================';
	arrOutpt[++numIndex] = '// 조회 클릭시..';
	arrOutpt[++numIndex] = '//------------------------------------------------------------------------------';
	arrOutpt[++numIndex] = 'function fnClickInqr()';
	arrOutpt[++numIndex] = '{';
	arrOutpt[++numIndex] = '	if ( !fnVerif("INQR") ) return; // 검증 : 조회';
	arrOutpt[++numIndex] = Base.EMPTYSTR;
	arrOutpt[++numIndex] = '	fnCtrlScr("BFOREINQR"); // 화면 제어 : 조회전';
	arrOutpt[++numIndex] = Base.EMPTYSTR;
	arrOutpt[++numIndex] = '	fnInqr(); // 조회';
	arrOutpt[++numIndex] = '}';
	arrOutpt[++numIndex] = Base.EMPTYSTR;
	arrOutpt[++numIndex] = '//==============================================================================';
	arrOutpt[++numIndex] = '// 추가 클릭시..';
	arrOutpt[++numIndex] = '//------------------------------------------------------------------------------';
	arrOutpt[++numIndex] = 'function fnClickAdd()';
	arrOutpt[++numIndex] = '{';
	arrOutpt[++numIndex] = '	if ( !fnVerif("ADD") ) return; // 검증 : 추가';
	arrOutpt[++numIndex] = Base.EMPTYSTR;
	arrOutpt[++numIndex] = '	fnAdd(); // 추가';
	arrOutpt[++numIndex] = '}';
	arrOutpt[++numIndex] = Base.EMPTYSTR;
	arrOutpt[++numIndex] = '//==============================================================================';
	arrOutpt[++numIndex] = '// Import 클릭시..';
	arrOutpt[++numIndex] = '//------------------------------------------------------------------------------';
	arrOutpt[++numIndex] = 'function fnClickImport()';
	arrOutpt[++numIndex] = '{';
	arrOutpt[++numIndex] = '	frmImport.filImport.click();';
	arrOutpt[++numIndex] = '}';
	arrOutpt[++numIndex] = Base.EMPTYSTR;
	arrOutpt[++numIndex] = '//==============================================================================';
	arrOutpt[++numIndex] = '// Import 변경시..';
	arrOutpt[++numIndex] = '//------------------------------------------------------------------------------';
	arrOutpt[++numIndex] = 'function fnChangeImport()';
	arrOutpt[++numIndex] = '{';
	arrOutpt[++numIndex] = '	if ( !fnVerif("IMPORT") ) return; // 검증 : IMPORT';
	arrOutpt[++numIndex] = Base.EMPTYSTR;
	arrOutpt[++numIndex] = '	var arrFieldName = g_arrFieldName.slice(0, ' + (LNGTH10_2 + 1).toString() + '); arrFieldName[0] = null;';
	arrOutpt[++numIndex] = Base.EMPTYSTR;
	arrOutpt[++numIndex] = '	// 그리드 EXCEL 데이터 IMPORT';
	arrOutpt[++numIndex] = '	gfnImportGridExcelData(g_strGridId, frmImport.filImport.value, arrFieldName, ';
	var blnNum = false, blnDate = false;
	for ( var num = 0 ; num < LNGTH10 ; num++ )
	{
		if ( ( fnExistList(arrQuery10[num], [ "amtm", "caval", "uamt", "amt", "ecffcnt", "ocffcnt", "cffcnt", "count", "rate" ]) ) || 
		     ( fnExist(arrQuery10[num], "no") && !fnExist(arrQuery10[num], "postNo") && !fnExist(arrQuery10[num], "telNo") ) )
		{
			blnNum = true;
		} else
		if ( fnExist(arrQuery10[num], "date") )
		{
			blnDate = true;
		}
	}
	if ( !blnNum && !blnDate )
	{
	arrOutpt[++numIndex] = '		function(objGv) { gfnDispMsg(\'$' + '{requestScope["ITEM.msgInqrOk"]}<' + '%-- 조회가 완료되었습니다. --%' + '>\'); });';
	} else
	{
	arrOutpt[++numIndex] = '		function(objGv) { gfnDispMsg(\'$' + '{requestScope["ITEM.msgInqrOk"]}<' + '%-- 조회가 완료되었습니다. --%' + '>\'); }, ';
	arrOutpt[++numIndex] = '		function(arrRows, objFieldType) // cf.) 레코드가 적은 경우 사용한다.';
	arrOutpt[++numIndex] = '			{';
	arrOutpt[++numIndex] = '				var LNGTH = arrRows.length, objValue;';
	arrOutpt[++numIndex] = Base.EMPTYSTR;
	arrOutpt[++numIndex] = '				for ( var strFieldName in objFieldType )';
	arrOutpt[++numIndex] = '				{';
		if ( blnNum )
		{
	arrOutpt[++numIndex] = '					// dataType 이 numeric 인 FIELD 에 대하여 유효하지 않는 값을 처리한다.';
	arrOutpt[++numIndex] = '					if ( "';
			var numAdd = false;
			for ( var num = 0 ; num < LNGTH10 ; num++ )
			{
				if ( ( fnExistList(arrQuery10[num], [ "amtm", "caval", "uamt", "amt", "ecffcnt", "ocffcnt", "cffcnt", "count", "rate" ]) ) || 
				     ( fnExist(arrQuery10[num], "no") && !fnExist(arrQuery10[num], "postNo") && !fnExist(arrQuery10[num], "telNo") ) )
				{
					if ( numAdd )
	arrOutpt[numIndex] += ' || "';
	arrOutpt[numIndex] += arrQuery10[num] + '" == strFieldName';
					numAdd = true;
				}
			}
	arrOutpt[numIndex] += ' )';
	arrOutpt[++numIndex] = '					{';
	arrOutpt[++numIndex] = '						for ( var num = 0 ; num < LNGTH ; num++ )';
	arrOutpt[++numIndex] = '						{';
	arrOutpt[++numIndex] = '							objValue = arrRows[num][strFieldName];';
	arrOutpt[++numIndex] = '							if ( !gfnIsNum(objValue) ) arrRows[num][strFieldName] = null;';
	arrOutpt[++numIndex] = '						}';
		}
		if ( blnNum && blnDate )
	arrOutpt[++numIndex] = '					} else';
		if ( blnDate )
		{
	arrOutpt[++numIndex] = '					// dataType 이 datetime 인 FIELD 에 대하여 유효하지 않는 값을 처리한다.';
	arrOutpt[++numIndex] = '					if ( "';
			var numAdd = false;
			for ( var num = 0 ; num < LNGTH10 ; num++ )
			{
				if ( fnExist(arrQuery10[num], "date") )
				{
					if ( numAdd )
	arrOutpt[numIndex] += ' || "';
	arrOutpt[numIndex] += arrQuery10[num] + '" == strFieldName';
					numAdd = true;
				}
			}
	arrOutpt[numIndex] += ' )';
	arrOutpt[++numIndex] = '					{';
	arrOutpt[++numIndex] = '						var DATE = "date";';
	arrOutpt[++numIndex] = '						for ( num = 0 ; num < LNGTH ; num++ )';
	arrOutpt[++numIndex] = '						{';
	arrOutpt[++numIndex] = '							objValue = arrRows[num][strFieldName]; if ( null == objValue ) continue;';
	arrOutpt[++numIndex] = Base.EMPTYSTR;
	arrOutpt[++numIndex] = '							if ( DATE == typeof objValue ) { arrRows[num][strFieldName] = gfnGetGriDateStr(new Date(objValue)); }';
	arrOutpt[++numIndex] = '							else                           { if ( !gfnCheckDate(objValue) ) arrRows[num][strFieldName] = null; }';
	arrOutpt[++numIndex] = '						}';
		}
	arrOutpt[++numIndex] = '					}';
	arrOutpt[++numIndex] = '				}';
	arrOutpt[++numIndex] = Base.EMPTYSTR;
	arrOutpt[++numIndex] = '				return arrRows;';
	arrOutpt[++numIndex] = '			}';
	arrOutpt[++numIndex] = '	);';
	}
	arrOutpt[++numIndex] = Base.EMPTYSTR;
	arrOutpt[++numIndex] = '	arrFieldName = null;';
	arrOutpt[++numIndex] = Base.EMPTYSTR;
	arrOutpt[++numIndex] = '	frmImport.reset();';
	arrOutpt[++numIndex] = '}';
	arrOutpt[++numIndex] = Base.EMPTYSTR;
	arrOutpt[++numIndex] = '//==============================================================================';
	arrOutpt[++numIndex] = '// 저장 클릭시..';
	arrOutpt[++numIndex] = '//------------------------------------------------------------------------------';
	arrOutpt[++numIndex] = 'function fnClickSave()';
	arrOutpt[++numIndex] = '{';
	arrOutpt[++numIndex] = '	// 그리드 셀을 편집 중 저장 버튼 클릭시 COMMIT 이 필요하다.';
	arrOutpt[++numIndex] = '	gfnCallGridFunc(g_strGridId, "commit()"); // 편집내용 COMMIT';
	arrOutpt[++numIndex] = Base.EMPTYSTR;
	arrOutpt[++numIndex] = '	if ( !fnVerif("SAVE") ) return; // 검증 : 저장';
	arrOutpt[++numIndex] = Base.EMPTYSTR;
	arrOutpt[++numIndex] = '	fnSave(); // 저장';
	arrOutpt[++numIndex] = '}';
	arrOutpt[++numIndex] = Base.EMPTYSTR;
	arrOutpt[++numIndex] = '//==============================================================================';
	arrOutpt[++numIndex] = '// 삭제 클릭시..';
	arrOutpt[++numIndex] = '//------------------------------------------------------------------------------';
	arrOutpt[++numIndex] = 'function fnClickDelt()';
	arrOutpt[++numIndex] = '{';
	arrOutpt[++numIndex] = '	if ( !gfnCnfmMsg(\'$' + '{requestScope["ITEM.msgDeltCnfm"]}\') ) return; // 삭제하시겠습니까?';
	arrOutpt[++numIndex] = Base.EMPTYSTR;
	arrOutpt[++numIndex] = '	if ( !fnVerif("DELT") ) return; // 검증 : 삭제';
	arrOutpt[++numIndex] = Base.EMPTYSTR;
	arrOutpt[++numIndex] = '	fnDelt(); // 삭제';
	arrOutpt[++numIndex] = '}';
	arrOutpt[++numIndex] = Base.EMPTYSTR;
	arrOutpt[++numIndex] = '// < Sub Procedure and Function - 비지니스 로직 호출 영역 >';
	arrOutpt[++numIndex] = '//==============================================================================';
	arrOutpt[++numIndex] = '// 조회';
	arrOutpt[++numIndex] = '//------------------------------------------------------------------------------';
	arrOutpt[++numIndex] = 'function fnInqr()';
	arrOutpt[++numIndex] = '{';
	arrOutpt[++numIndex] = '	gfnReqGrid( // 그리드 요청';
	arrOutpt[++numIndex] = '		// 그리드 ID';
	arrOutpt[++numIndex] = '		g_strGridId';
	arrOutpt[++numIndex] = '		// URI';
	arrOutpt[++numIndex] = '	  , "' + fnGetScrPath("/") + 'getList' + fnGetTableEngName(1) + '.do" // 목록 가져오기';
	arrOutpt[++numIndex] = '		// 데이터(JSON Object Only)';
	arrOutpt[++numIndex] = '	  , gfnGetJsonFormData("divInqrCond")';
	arrOutpt[++numIndex] = '	);';
	arrOutpt[++numIndex] = '}';
	arrOutpt[++numIndex] = Base.EMPTYSTR;
	arrOutpt[++numIndex] = '//==============================================================================';
	arrOutpt[++numIndex] = '// 저장';
	arrOutpt[++numIndex] = '//------------------------------------------------------------------------------';
	arrOutpt[++numIndex] = 'function fnSave()';
	arrOutpt[++numIndex] = '{';
	arrOutpt[++numIndex] = '	gfnReq( // 요청';
	arrOutpt[++numIndex] = '		// URL';
	arrOutpt[++numIndex] = '		"' + fnGetScrPath("/") + 'saveList' + fnGetTableEngName(1) + '.do" // 목록 저장';
	arrOutpt[++numIndex] = '		// 데이터';
	arrOutpt[++numIndex] = '	  , gfnGetGridFormData(g_strGridId, g_arrFieldName) + Base.AND';
	arrOutpt[++numIndex] = '	  + "gridRowId=" + encodeURIComponent(gfnCallGridFunc(g_strGridId, "getCheckedItems()").join(Base.DELI1)) // 그리드행ID목록';
	arrOutpt[++numIndex] = '		// 성공콜백함수';
	arrOutpt[++numIndex] = '	  , function(objData)';
	arrOutpt[++numIndex] = '		{';
	arrOutpt[++numIndex] = '			var RSLT_VALUE = gfnGetJsonValue(objData, [ Base.RSLT_NO ]);';
	arrOutpt[++numIndex] = Base.EMPTYSTR;
	arrOutpt[++numIndex] = '			if ( Base.OK != RSLT_VALUE )';
	arrOutpt[++numIndex] = '			{';
	arrOutpt[++numIndex] = '				var DATA_ROW = gfnGetJsonValue(objData, [ Base.RSLT_INFO, "gridRowId" ], 0);';
	arrOutpt[++numIndex] = '				var strSffx = gfnGetJsonValue(objData, [ Base.RSLT_INFO, "' + arrQuery10[0] + '" ]);';
	arrOutpt[++numIndex] = '				if ( !gfnIsEmpty(strSffx) ) strSffx = \'${requestScope["ITEM.' + arrQuery10[0] + '"]}<%-- ' + arrQuery11[0] + ' --%> = \' + strSffx;';
	arrOutpt[++numIndex] = Base.EMPTYSTR;
	if ( "1" != hidPkCount.value || Base.YES != hidSeqYn.value )
	{
	arrOutpt[++numIndex] = '				if ( Base.DATA_DUP == RSLT_VALUE )';
	arrOutpt[++numIndex] = '					gfnSetGridCellFocus(g_strGridId, DATA_ROW, "' + arrQuery10[0] + '", function() // 그리드 셀 포커스를 설정한다.';
		 if ( "1" != hidPkCount.value )
	arrOutpt[++numIndex] = '						{ gfnDispMsg(\'$' + '{requestScope["ITEM.msgRgstData"]}<' + '%-- 이미 등록된 데이터입니다. 다시 확인하십시오. --%' + '>\'); });';
		 else
	arrOutpt[++numIndex] = '						{ gfnDispMsg(\'$' + '{requestScope["ITEM.msgRgstData"]}<' + '%-- 이미 등록된 데이터입니다. 다시 확인하십시오. --%' + '>\', strSffx); });';
	arrOutpt[++numIndex] = '				else';
	arrOutpt[++numIndex] = '				if ( !gfnIsBaseError(RSLT_VALUE) )';
	arrOutpt[++numIndex] = '					gfnSetGridCellFocus(g_strGridId, DATA_ROW, null, function() // 그리드 셀 포커스를 설정한다.';
	arrOutpt[++numIndex] = '						{ gfnDispMsg(Base.msgRsltError, strSffx); }); // 요청결과 오류가 발생했습니다. 관리자에게 문의하십시오.';
	} else
	{
	arrOutpt[++numIndex] = '				gfnSetGridCellFocus(g_strGridId, DATA_ROW, null, function() // 그리드 셀 포커스를 설정한다.';
	arrOutpt[++numIndex] = '					{ gfnDispMsg(Base.msgRsltError, strSffx); }); // 요청결과 오류가 발생했습니다. 관리자에게 문의하십시오.';
	}
	arrOutpt[++numIndex] = '			} else';
	arrOutpt[++numIndex] = '			{';
	arrOutpt[++numIndex] = '				gfnDispMsg(\'$' + '{requestScope["ITEM.msgSaveOk"]}<' + '%-- 저장이 완료되었습니다. --%' + '>\');';
	arrOutpt[++numIndex] = Base.EMPTYSTR;
	arrOutpt[++numIndex] = '				btnInqr.click(); // 재조회한다.';
	arrOutpt[++numIndex] = '			}';
	arrOutpt[++numIndex] = '		}';
	arrOutpt[++numIndex] = '	);';
	arrOutpt[++numIndex] = '}';
	arrOutpt[++numIndex] = Base.EMPTYSTR;
	arrOutpt[++numIndex] = '//==============================================================================';
	arrOutpt[++numIndex] = '// 삭제';
	arrOutpt[++numIndex] = '//------------------------------------------------------------------------------';
	arrOutpt[++numIndex] = 'function fnDelt()';
	arrOutpt[++numIndex] = '{';
	arrOutpt[++numIndex] = '	gfnReq( // 요청';
	arrOutpt[++numIndex] = '		// URL';
	arrOutpt[++numIndex] = '		"' + fnGetScrPath("/") + 'deltList' + fnGetTableEngName(1) + '.do" // 목록 삭제';
	arrOutpt[++numIndex] = '		// 데이터';
	if ( "1" != hidPkCount.value )
	arrOutpt[++numIndex] = '	  , "rowId=" + encodeURIComponent(gfnGetGridChcColValue(g_strGridId, "rowId", false).join(" UNION ALL ")) // 행ID목록';
	else
	arrOutpt[++numIndex] = '	  , "rowId=" + encodeURIComponent("\'" + gfnGetGridChcColValue(g_strGridId, "rowId", false).join("\', \'") + "\'") // 행ID목록';
	arrOutpt[++numIndex] = '		// 성공콜백함수';
	arrOutpt[++numIndex] = '	  , function(objData)';
	arrOutpt[++numIndex] = '		{';
	arrOutpt[++numIndex] = '			var RSLT_VALUE = gfnGetJsonValue(objData, [ Base.RSLT_NO ]);';
	arrOutpt[++numIndex] = Base.EMPTYSTR;
	arrOutpt[++numIndex] = '			if ( Base.OK != RSLT_VALUE )';
	arrOutpt[++numIndex] = '			{';
	arrOutpt[++numIndex] = '				if ( !gfnIsBaseError(RSLT_VALUE) ) gfnDispMsg(Base.msgRsltError); // 요청결과 오류가 발생했습니다. 관리자에게 문의하십시오.';
	arrOutpt[++numIndex] = '			} else';
	arrOutpt[++numIndex] = '			{';
	arrOutpt[++numIndex] = '				gfnDispMsg(\'$' + '{requestScope["ITEM.msgDeltOk"]}<' + '%-- 삭제가 완료되었습니다. --%' + '>\');';
	arrOutpt[++numIndex] = Base.EMPTYSTR;
	arrOutpt[++numIndex] = '				btnInqr.click(); // 재조회한다.';
	arrOutpt[++numIndex] = '			}';
	arrOutpt[++numIndex] = '		}';
	arrOutpt[++numIndex] = '	);';
	arrOutpt[++numIndex] = '}';
	arrOutpt[++numIndex] = Base.EMPTYSTR;
	arrOutpt[++numIndex] = '// < Sub Procedure and Function - 그리드 영역 >';
	arrOutpt[++numIndex] = '//==============================================================================';
	arrOutpt[++numIndex] = '// 그리드 초기화';
	arrOutpt[++numIndex] = '//------------------------------------------------------------------------------';
	arrOutpt[++numIndex] = 'function fnInitGrid()';
	arrOutpt[++numIndex] = '{';
	arrOutpt[++numIndex] = '	// FIELD 정보를 설정한다.';
	var blnType = false, PK_COUNT = gfnGetInt(hidPkCount.value);
	for ( var num = 0 ; num < LNGTH10 ; num++ )
	{
		if ( num < PK_COUNT ) continue;

		if ( ( fnExistList(arrQuery10[num], [ "amtm", "caval", "uamt", "amt", "ecffcnt", "ocffcnt", "cffcnt", "count", "rate", "date", "year" ]) ) || 
		     ( fnExist(arrQuery10[num], "no") && ( !fnExist(arrQuery10[num], "postNo") && !fnExist(arrQuery10[num], "telNo") ) ) )
		{
			blnType = true; break;
		}
	}
	var TAB = "	", COMMA = "  , ";
	if ( blnType )
	{
	arrOutpt[++numIndex] = ' 	var objFieldType = '; 
	arrOutpt[++numIndex] = '		{';
		var strComma = TAB;
		for ( var num = 0 ; num < LNGTH10 ; num++ )
		{
			if ( ( fnExistList(arrQuery10[num], [ "amtm", "caval", "uamt", "amt", "ecffcnt", "ocffcnt", "cffcnt", "count", "rate", "year" ]) ) || 
			     ( fnExist(arrQuery10[num], "no") && ( !fnExist(arrQuery10[num], "postNo") && !fnExist(arrQuery10[num], "telNo") ) ) )
			{
				arrOutpt[++numIndex] = '		' + strComma + '"' + arrQuery10[num] + '": { "dataType": "numeric" }';
				strComma = COMMA;
			} else
			if ( fnExist(arrQuery10[num], "date") )
			{
				arrOutpt[++numIndex] = '		' + strComma + '"' + arrQuery10[num] + '": { "dataType": "datetime", "datetimeFormat": "yyyyMMdd" }';
				strComma = COMMA;
			}
		}
	arrOutpt[++numIndex] = '		};';
	}
	if ( "1" != hidPkCount.value || Base.YES != hidSeqYn.value )
	arrOutpt[++numIndex] = '	g_arrFieldName = "rowId|' + arrQuery10.join(Base.DELI1);
	else
	arrOutpt[++numIndex] = '	g_arrFieldName = "rowId|' + arrQuery10.slice(1).join(Base.DELI1);
	var blnLabel = false;
	for ( var num = 0 ; num < LNGTH10 ; num++ )
	{
		if ( fnExistList(arrQuery10[num], [ "ym", "corpno", "bzno", "postNo" ]) )
		{
	arrOutpt[numIndex] += Base.DELI1 + arrQuery10[num] + "Label"; blnLabel = true;
		}
	}
	arrOutpt[numIndex] += '".split(Base.DELI1);';
	arrOutpt[++numIndex] = Base.EMPTYSTR;
	if ( blnType )
	arrOutpt[++numIndex] = '	gfnInitGrid(g_strGridId, g_arrFieldName, objFieldType, ';
	else
	arrOutpt[++numIndex] = '	gfnInitGrid(g_strGridId, g_arrFieldName, null, Base.GRID, ';
	arrOutpt[++numIndex] = '		{';
	arrOutpt[++numIndex] = '			"pageId": "divPage" // 페이지 태그 ID';
	arrOutpt[++numIndex] = '		  , "columns": [';
	arrOutpt[++numIndex] = '				{ "width": 0, "fieldName": g_arrFieldName[0], "editable": false } // 행ID';
	var SPACE = "                                                  ", numByteSize10, numByteSize11, numCodeIndex = -1;
	var strNotNulLVar = arrQuery13.join(Base.DELI1);
	if ( gfnIsEmpty(strNotNulLVar) ) strNotNulLVar = null;
	else                           strNotNulLVar = Base.DELI1 + strNotNulLVar + Base.DELI1;
	var numTmp = 0;
	for ( var num = 0 ; num < LNGTH10 ; num++ )
	{
		if ( 0 == num )
		{
			if ( "1" != hidPkCount.value || Base.YES != hidSeqYn.value ) { }
			else
				continue;
		}

		numByteSize10 = gfnGetByteSize(arrQuery10[num]); numByteSize11 = gfnGetByteSize(arrQuery11[num]);

	arrOutpt[++numIndex] = '			  , { "header": { "text": \'$' + '{requestScope["ITEM.' + arrQuery10[num] + '"' + SPACE.substr(0, numMaxByteSize10 - numByteSize10) + ']}<' + '%-- ' + arrQuery11[num] + SPACE.substr(0, numMaxByteSize11 - numByteSize11) + ' --%' + '>\' }, "width": 100, "fieldName": g_arrFieldName[' + (++numTmp).toString() + ']';

		if ( fnExist(arrQuery10[num], "yn") )
		{
			if ( null == strNotNulLVar || 0 > strNotNulLVar.indexOf(Base.DELI1 + arrQuery10[num] + Base.DELI1) )
	arrOutpt[numIndex] += ', "styles": { "textAlignment": "center" }, "editor": { "type": "dropdown", "domainOnly": true, "textReadOnly": true }, "lookupDisplay": true, "values": [ "", "Y", "N" ], "labels": [ \'\', Base.comboTextYes, Base.comboTextNo ]';
			else // NOT NULL
	arrOutpt[numIndex] += ', "styles": { "textAlignment": "center", "figureBackground": Grid.FIGURE_BACKGROUND, "figureInactiveBackground": Grid.FIGURE_INACTIVE_BACKGROUND }, "editable": false, "renderer": { "type": "check", "editable": true, "startEditOnClick": true, "trueValues": "Y", "falseValues": "N" }';
		} else
		if ( fnExist(arrQuery10[num], "code") )
		{
	arrOutpt[numIndex] += ', "editor": { "type": "dropdown", "domainOnly": true, "textReadOnly": true }, "lookupDisplay": true, "values": g_arrGridComboCode[' + (++numCodeIndex).toString() + '][0], "labels": g_arrGridComboCode[' + numCodeIndex.toString() + '][1]';
		} else
		if ( fnExist(arrQuery10[num], "year") )
		{
	arrOutpt[numIndex] += ', "styles": { "textAlignment": "far" }, "editor": { "type": "number", "integerOnly": true, "maxLength": 4, "positiveOnly": true }';
		} else
		if ( fnExistList(arrQuery10[num], [ "ym", "postNo" ]) )
		{
	arrOutpt[numIndex] += ', "styles": { "textAlignment": "center" }, "editor": { "maxLength": 6 }, "lookupDisplay": true, "labelField": "' + arrQuery10[num] + 'Label"';
		} else
		if ( fnExist(arrQuery10[num], "corpno") )
		{
	arrOutpt[numIndex] += ', "styles": { "textAlignment": "center" }, "editor": { "maxLength": 13 }, "lookupDisplay": true, "labelField": "' + arrQuery10[num] + 'Label"';
		} else
		if ( fnExist(arrQuery10[num], "bzno") )
		{
	arrOutpt[numIndex] += ', "styles": { "textAlignment": "center" }, "editor": { "maxLength": 10 }, "lookupDisplay": true, "labelField": "' + arrQuery10[num] + 'Label"';
		} else
		if ( fnExist(arrQuery10[num], "amtm") )
		{
			if ( null == strNotNulLVar || 0 > strNotNulLVar.indexOf(Base.DELI1 + arrQuery10[num] + Base.DELI1) )
	arrOutpt[numIndex] += ', "styles": { "textAlignment": "far", "numberFormat": "#,##0" }, "editor": { "type": "number", "integerOnly": true, "maxLength": 15, "positiveOnly": true }';
			else // NOT NULL
	arrOutpt[numIndex] += ', "styles": { "textAlignment": "far", "numberFormat": "#,##0", "prefix": "\\\\ " }, "editor": { "type": "number", "integerOnly": true, "maxLength": 15, "positiveOnly": true }';
		} else
		if ( fnExistList(arrQuery10[num], [ "caval", "uamt", "amt", "ecffcnt", "ocffcnt", "cffcnt" ]) )
		{
			if ( null == strNotNulLVar || 0 > strNotNulLVar.indexOf(Base.DELI1 + arrQuery10[num] + Base.DELI1) )
	arrOutpt[numIndex] += ', "styles": { "textAlignment": "far", "numberFormat": "#,##0.000000" }, "editor": { "type": "number", "maxLength": 23 }';
			else // NOT NULL
	arrOutpt[numIndex] += ', "styles": { "textAlignment": "far", "numberFormat": "#,##0.000000", "postfix": " (Unit)" }, "editor": { "type": "number", "maxLength": 23 }';
		} else
		if ( fnExist(arrQuery10[num], "telNo") )
		{
	arrOutpt[numIndex] += ', "styles": { "textAlignment": "center" }, "editor": { "maxLength": 14 }';
		} else
		if ( fnExist(arrQuery10[num], "no") )
		{
	arrOutpt[numIndex] += ', "styles": { "textAlignment": "far" }, "editor": { "type": "number", "integerOnly": true, "maxLength": 10, "positiveOnly": true }';
		} else
		if ( fnExist(arrQuery10[num], "count") )
		{
			if ( null == strNotNulLVar || 0 > strNotNulLVar.indexOf(Base.DELI1 + arrQuery10[num] + Base.DELI1) )
	arrOutpt[numIndex] += ', "styles": { "textAlignment": "far", "numberFormat": "#,##0" }, "editor": { "type": "number", "integerOnly": true, "maxLength": 11 }';
			else // NOT NULL
	arrOutpt[numIndex] += ', "styles": { "textAlignment": "far", "numberFormat": "#,##0", "postfix": " (EA)" }, "editor": { "type": "number", "integerOnly": true, "maxLength": 11 }';
		} else
		if ( fnExist(arrQuery10[num], "rate") )
		{
			if ( null == strNotNulLVar || 0 > strNotNulLVar.indexOf(Base.DELI1 + arrQuery10[num] + Base.DELI1) )
	arrOutpt[numIndex] += ', "styles": { "textAlignment": "far", "numberFormat": "#,##0.00", "figureBackground": "linear" }, "editor": { "type": "number", "maxLength": 6 }, "renderer": { "type": "bar", "minimum": 0, "maximum": 100, "showLabel": true }';
			else // NOT NULL
	arrOutpt[numIndex] += ', "styles": { "textAlignment": "far", "numberFormat": "#,##0.00", "postfix": " %", "figureBackground": "linear" }, "editor": { "type": "number", "maxLength": 6 }, "renderer": { "type": "bar", "minimum": 0, "maximum": 100, "showLabel": true }';
		} else
		if ( fnExist(arrQuery10[num], "date") )
		{
	arrOutpt[numIndex] += ', "styles": { "textAlignment": "center", "datetimeFormat": "yyyy-MM-dd" }, "editor": { "type": "date", "editFormat": "yyyy-MM-dd", "yearNavigation": true }';
		} else
		if ( fnExist(arrQuery10[num], "emailName") )
		{
	arrOutpt[numIndex] += ', "editor": { "textCase": "lower", "maxLength": 200 }';
		} else
		if ( fnExist(arrQuery10[num], "id") )
		{
	arrOutpt[numIndex] += ', "editor": { "maxLength": 20 }';
		} else
		if ( fnExist(arrQuery10[num], "name") )
		{
	arrOutpt[numIndex] += ', "editor": { "maxLength": 100 }';
		}

	arrOutpt[numIndex] += ' }';
	}
	arrOutpt[++numIndex] = '			]';
	arrOutpt[++numIndex] = '		  , "options": { "fixed": { "colCount": 2 } } // 틀고정 cf.) 틀고정될 열의 너비는 px 단위로 입력한다.';
	arrOutpt[++numIndex] = '		// 이벤트관련';
	arrOutpt[++numIndex] = '		  , "onload": function(strId) // 그리드 초기화 완료시..';
	arrOutpt[++numIndex] = '				{';
	arrOutpt[++numIndex] = '					btnInqr.click(); // 화면 로드시 조회한다.';
	arrOutpt[++numIndex] = '				}';
	arrOutpt[++numIndex] = '		  , "onloaddatacompleted": function(objDp) // 그리드 데이터 요청시 성공시..';
	arrOutpt[++numIndex] = '				{';
	arrOutpt[++numIndex] = '					var arrRows = objDp.getJsonRows(0, -1);';
	if ( blnLabel )
	{
	arrOutpt[++numIndex] = Base.EMPTYSTR;
	arrOutpt[++numIndex] = '					// 사용자정의 포맷적용을 위한 LABEL FIELD 를 추가한다. cf.) 레코드가 적은 경우 사용한다.';
	arrOutpt[++numIndex] = '					gfnCallGridAllRowFunc(g_strGridId, arrRows.length, fnFormtGridCellValue);';
	}
	arrOutpt[++numIndex] = Base.EMPTYSTR;
	arrOutpt[++numIndex] = '					// 열 FILTER 를 설정한다. cf.) 레코드가 적은 경우 사용한다.';
	arrOutpt[++numIndex] = '					gfnSetGridColList(g_strGridId, true, [ // 그리드 열 목록 설정';
	arrOutpt[++numIndex] = '						{ } // 행ID';
	arrOutpt[++numIndex] = '					  , { } // { "filters": gfnGetGridColFilter(arrRows, g_arrFieldName[1]) } // cf.) 틀고정된 열인 경우 FILTER 아이콘 클릭시 오류발생';
	for ( var num = 2 ; num <= LNGTH10_2 ; num++ )
	arrOutpt[++numIndex] = '					  , { "filters": gfnGetGridColFilter(arrRows, g_arrFieldName[' + num.toString() + ']) }';
	arrOutpt[++numIndex] = '					]); // 그리드 열 목록 설정';
	arrOutpt[++numIndex] = Base.EMPTYSTR;
	arrOutpt[++numIndex] = '					arrRows = null;';
	arrOutpt[++numIndex] = '				}';
	arrOutpt[++numIndex] = '		  , "onclickpage": fnInqr // 페이지 클릭시..';
	if ( blnLabel )
	{
	arrOutpt[++numIndex] = '		  , "onCellEdited": function(objGv, numItemIndex, numDataRow, numFieldIndex) // 셀 편집 완료시..';
	arrOutpt[++numIndex] = '				{';
	arrOutpt[++numIndex] = '					// 사용자정의 포맷적용을 위한 LABEL FIELD 를 설정한다. cf.) 레코드가 적은 경우 사용한다.';
	arrOutpt[++numIndex] = '					fnFormtGridCellValue(objGv, numItemIndex, numFieldIndex);';
	arrOutpt[++numIndex] = '				}';
	}
	arrOutpt[++numIndex] = '		});';
	if ( blnType )
	{
	arrOutpt[++numIndex] = Base.EMPTYSTR;
	arrOutpt[++numIndex] = '	objFieldType = null;';
	}
	arrOutpt[++numIndex] = '}';
	if ( blnLabel )
	{
	arrOutpt[++numIndex] = Base.EMPTYSTR;
	arrOutpt[++numIndex] = '//==============================================================================';
	arrOutpt[++numIndex] = '// 그리드 셀 값 포맷';
	arrOutpt[++numIndex] = '//------------------------------------------------------------------------------';
	arrOutpt[++numIndex] = 'function fnFormtGridCellValue(objGv, numItemIndex, numFieldIndex)';
	arrOutpt[++numIndex] = '{';
		var numFieldIndex = LNGTH10;
		for ( var num = 0 ; num < LNGTH10 ; num++ )
		{
			if ( fnExist(arrQuery10[num], "ym") )
			{
	arrOutpt[++numIndex] = '	if ( null == numFieldIndex || ' + (num + 1).toString() + ' == numFieldIndex )';
	arrOutpt[++numIndex] = '		objGv.setValue(numItemIndex, ' + (++numFieldIndex).toString() + ', gfnFormt(objGv.getValue(numItemIndex, ' + (num + 1).toString() + '), Base.DATE)); // 년월';
			} else
			if ( fnExist(arrQuery10[num], "corpno") )
			{
	arrOutpt[++numIndex] = '	if ( null == numFieldIndex || ' + (num + 1).toString() + ' == numFieldIndex )';
	arrOutpt[++numIndex] = '		objGv.setValue(numItemIndex, ' + (++numFieldIndex).toString() + ', gfnFormt(objGv.getValue(numItemIndex, ' + (num + 1).toString() + '), Base.CORPNO)); // 법인등록번호';
			} else
			if ( fnExist(arrQuery10[num], "bzno") )
			{
	arrOutpt[++numIndex] = '	if ( null == numFieldIndex || ' + (num + 1).toString() + ' == numFieldIndex )';
	arrOutpt[++numIndex] = '		objGv.setValue(numItemIndex, ' + (++numFieldIndex).toString() + ', gfnFormt(objGv.getValue(numItemIndex, ' + (num + 1).toString() + '), Base.BZNO)); // 사업자등록번호';
			} else
			if ( fnExist(arrQuery10[num], "postNo") )
			{
	arrOutpt[++numIndex] = '	if ( null == numFieldIndex || ' + (num + 1).toString() + ' == numFieldIndex )';
	arrOutpt[++numIndex] = '		objGv.setValue(numItemIndex, ' + (++numFieldIndex).toString() + ', gfnFormt(objGv.getValue(numItemIndex, ' + (num + 1).toString() + '), Base.POST)); // 우편번호';
			}
		}
	arrOutpt[++numIndex] = '}';
	}
	arrOutpt[++numIndex] = Base.EMPTYSTR;
	arrOutpt[++numIndex] = '//==============================================================================';
	arrOutpt[++numIndex] = '// 추가';
	arrOutpt[++numIndex] = '//------------------------------------------------------------------------------';
	arrOutpt[++numIndex] = 'function fnAdd()';
	arrOutpt[++numIndex] = '{';
	var blnAddValue = false;
	for ( var num = 0 ; num < LNGTH10 ; num++ )
	{
		if ( fnExist(arrQuery10[num], "yn") && 
		     null != strNotNulLVar && 0 <= strNotNulLVar.indexOf(Base.DELI1 + arrQuery10[num] + Base.DELI1) )
		{
			blnAddValue = true; break;
		} else
		if ( fnExist(arrQuery10[num], "code") && 
		     null != strNotNulLVar && 0 <= strNotNulLVar.indexOf(Base.DELI1 + arrQuery10[num] + Base.DELI1) )
		{
			blnAddValue = true; break;
		} else
		if ( ( fnExistList(arrQuery10[num], [ "amtm", "caval", "uamt", "amt", "ecffcnt", "ocffcnt", "cffcnt", "count", "rate" ]) ) && 
			 null != strNotNulLVar && 0 <= strNotNulLVar.indexOf(Base.DELI1 + arrQuery10[num] + Base.DELI1) )
		{
			blnAddValue = true; break;
		} else
		if ( fnExist(arrQuery10[num], "date") )
		{
			blnAddValue = true; break;
		}
	}
	if ( null == strNotNulLVar || !blnAddValue )
	{
	arrOutpt[++numIndex] = '	gfnAddGridRow(g_strGridId); // 그리드 행 추가';
	} else
	{
	arrOutpt[++numIndex] = '	gfnAddGridRow(g_strGridId, // 그리드 행 추가';
	arrOutpt[++numIndex] = '		{ // 행 추가시 기본값을 설정한다.';
	arrOutpt[++numIndex] = '			';
		var blnAdd = false;
		for ( var num = 0 ; num < LNGTH10 ; num++ )
		{
			if ( fnExist(arrQuery10[num], "yn") && 
			     null != strNotNulLVar && 0 <= strNotNulLVar.indexOf(Base.DELI1 + arrQuery10[num] + Base.DELI1) )
			{
	arrOutpt[numIndex] += ( blnAdd ? ', "' : '"' ) + arrQuery10[num] + '": "Y"'; blnAdd = true;
			} else
			if ( fnExist(arrQuery10[num], "code") && 
			     null != strNotNulLVar && 0 <= strNotNulLVar.indexOf(Base.DELI1 + arrQuery10[num] + Base.DELI1) )
			{
	arrOutpt[numIndex] += ( blnAdd ? ', "' : '"' ) + arrQuery10[num] + '": ""/* 수정요망 : 행추가시 기본코드값 */'; blnAdd = true;
			} else
			if ( ( fnExistList(arrQuery10[num], [ "amtm", "caval", "uamt", "amt", "ecffcnt", "ocffcnt", "cffcnt", "count", "rate" ]) ) && 
				 null != strNotNulLVar && 0 <= strNotNulLVar.indexOf(Base.DELI1 + arrQuery10[num] + Base.DELI1) )
			{
	arrOutpt[numIndex] += ( blnAdd ? ', "' : '"' ) + arrQuery10[num] + '": 0'; blnAdd = true;
			} else
			if ( fnExist(arrQuery10[num], "date") )
			{
	arrOutpt[numIndex] += ( blnAdd ? ', "' : '"' ) + arrQuery10[num] + '": \'$' + '{requestScope["CRRNT.date"]}\''; blnAdd = true;
			}
		}
	arrOutpt[++numIndex] = '		});';
	}
	arrOutpt[++numIndex] = '}';
	arrOutpt[++numIndex] = Base.EMPTYSTR;
	arrOutpt[++numIndex] = '//==============================================================================';
	arrOutpt[++numIndex] = '// 그리드 검증';
	arrOutpt[++numIndex] = '//------------------------------------------------------------------------------';
	arrOutpt[++numIndex] = 'function fnVerifGrid(strClsfy)';
	arrOutpt[++numIndex] = '{';
	arrOutpt[++numIndex] = '	if ( "SAVE" == strClsfy )';
	arrOutpt[++numIndex] = '	{';
	arrOutpt[++numIndex] = '		if ( !gfnCallGridChcRowFunc(g_strGridId, function(objGv, objRow, numItemIndex) // 그리드 선택 열별 셀 값을 검증한다.';
	arrOutpt[++numIndex] = '			{';
	arrOutpt[++numIndex] = '				return gfnVerifGridRow(objGv, objRow, numItemIndex, [ // 그리드 행 검증';
	var blnFirst = false;
	for ( var num = 0 ; num < LNGTH10 ; num++ )
	{
		if ( 0 == num )
		{
			if ( "1" != hidPkCount.value || Base.YES != hidSeqYn.value ) { }
			else
				continue;
		}
		if ( fnExist(arrQuery10[num], "yn") && null != strNotNulLVar && 0 <= strNotNulLVar.indexOf(Base.DELI1 + arrQuery10[num] + Base.DELI1) ) continue;

		if ( blnFirst )
	arrOutpt[++numIndex] = '				  , {';
		else
	arrOutpt[++numIndex] = '					{';
		blnFirst = true;
	arrOutpt[++numIndex] = '						"text": \'$' + '{requestScope["ITEM.' + arrQuery10[num] + '"]}<' + '%-- ' + arrQuery11[num] + ' --%' + '>\', "fieldName": "' + arrQuery10[num] + '"';

		if ( fnExist(arrQuery10[num], "yn") )
		{
			if ( null == strNotNulLVar || 0 > strNotNulLVar.indexOf(Base.DELI1 + arrQuery10[num] + Base.DELI1) )
	arrOutpt[++numIndex] = '					  , "msgChcValue": \'$' + '{requestScope["ITEM.msgItemWrong"]}<' + '%-- 해당 항목값이 잘못되었습니다. --%' + '>\'';
		} else
		if ( fnExist(arrQuery10[num], "code") )
		{
			if ( null == strNotNulLVar || 0 > strNotNulLVar.indexOf(Base.DELI1 + arrQuery10[num] + Base.DELI1) )
				;
			else // NOT NULL
	arrOutpt[++numIndex] = '					  , "msgChcYn": \'$' + '{requestScope["ITEM.msgChcItem"]}<' + '%-- 해당 항목을 선택하십시오. --%' + '>\'';
	arrOutpt[++numIndex] = '					  , "msgChcValue": \'$' + '{requestScope["ITEM.msgItemWrong"]}<' + '%-- 해당 항목값이 잘못되었습니다. --%' + '>\'';
		} else
		if ( fnExist(arrQuery10[num], "year") )
		{
			if ( null == strNotNulLVar || 0 > strNotNulLVar.indexOf(Base.DELI1 + arrQuery10[num] + Base.DELI1) )
				;
			else // NOT NULL
	arrOutpt[++numIndex] = '					  , "msgInputYn": \'$' + '{requestScope["ITEM.msgInputItem"]}<' + '%-- 해당 항목을 입력하십시오. --%' + '>\'';
	arrOutpt[++numIndex] = '					  , "msgYear": \'$' + '{requestScope["ITEM.msgItemWrong"]}<' + '%-- 해당 항목값이 잘못되었습니다. --%' + '>\'';
		} else
		if ( fnExist(arrQuery10[num], "ym") )
		{
			if ( null == strNotNulLVar || 0 > strNotNulLVar.indexOf(Base.DELI1 + arrQuery10[num] + Base.DELI1) )
				;
			else // NOT NULL
	arrOutpt[++numIndex] = '					  , "msgInputYn": \'$' + '{requestScope["ITEM.msgInputItem"]}<' + '%-- 해당 항목을 입력하십시오. --%' + '>\'';
	arrOutpt[++numIndex] = '					  , "msgYm": \'$' + '{requestScope["ITEM.msgItemWrong"]}<' + '%-- 해당 항목값이 잘못되었습니다. --%' + '>\'';
		} else
		if ( fnExist(arrQuery10[num], "postNo") )
		{
			if ( null == strNotNulLVar || 0 > strNotNulLVar.indexOf(Base.DELI1 + arrQuery10[num] + Base.DELI1) )
				;
			else // NOT NULL
	arrOutpt[++numIndex] = '					  , "msgInputYn": \'$' + '{requestScope["ITEM.msgInputItem"]}<' + '%-- 해당 항목을 입력하십시오. --%' + '>\'';
	arrOutpt[++numIndex] = '					  , "msgPostNo": \'$' + '{requestScope["ITEM.msgItemWrong"]}<' + '%-- 해당 항목값이 잘못되었습니다. --%' + '>\'';
		} else
		if ( fnExist(arrQuery10[num], "corpno") )
		{
			if ( null == strNotNulLVar || 0 > strNotNulLVar.indexOf(Base.DELI1 + arrQuery10[num] + Base.DELI1) )
				;
			else // NOT NULL
	arrOutpt[++numIndex] = '					  , "msgInputYn": \'$' + '{requestScope["ITEM.msgInputItem"]}<' + '%-- 해당 항목을 입력하십시오. --%' + '>\'';
	arrOutpt[++numIndex] = '					  , "msgCorpno": \'$' + '{requestScope["ITEM.msgItemWrong"]}<' + '%-- 해당 항목값이 잘못되었습니다. --%' + '>\'';
		} else
		if ( fnExist(arrQuery10[num], "bzno") )
		{
			if ( null == strNotNulLVar || 0 > strNotNulLVar.indexOf(Base.DELI1 + arrQuery10[num] + Base.DELI1) )
				;
			else // NOT NULL
	arrOutpt[++numIndex] = '					  , "msgInputYn": \'$' + '{requestScope["ITEM.msgInputItem"]}<' + '%-- 해당 항목을 입력하십시오. --%' + '>\'';
	arrOutpt[++numIndex] = '					  , "msgBzno": \'$' + '{requestScope["ITEM.msgItemWrong"]}<' + '%-- 해당 항목값이 잘못되었습니다. --%' + '>\'';
		} else
		if ( fnExist(arrQuery10[num], "amtm") )
		{
			if ( null == strNotNulLVar || 0 > strNotNulLVar.indexOf(Base.DELI1 + arrQuery10[num] + Base.DELI1) )
				;
			else // NOT NULL
	arrOutpt[++numIndex] = '					  , "msgInputYn": \'$' + '{requestScope["ITEM.msgInputItem"]}<' + '%-- 해당 항목을 입력하십시오. --%' + '>\'';
	arrOutpt[++numIndex] = '					  , "msgNumYn": \'$' + '{requestScope["ITEM.msgItemWrong"]}<' + '%-- 해당 항목값이 잘못되었습니다. --%' + '>\'';
	arrOutpt[++numIndex] = '					  , "msgNumRange": \'$' + '{requestScope["ITEM.msgItemWrong"]}<' + '%-- 해당 항목값이 잘못되었습니다. --%' + '>\', "minNum": 0//, "maxNum": 999999999999999';
		} else
		if ( fnExistList(arrQuery10[num], [ "caval", "uamt", "amt", "ecffcnt", "ocffcnt", "cffcnt" ]) )
		{
			if ( null == strNotNulLVar || 0 > strNotNulLVar.indexOf(Base.DELI1 + arrQuery10[num] + Base.DELI1) )
				;
			else // NOT NULL
	arrOutpt[++numIndex] = '					  , "msgInputYn": \'$' + '{requestScope["ITEM.msgInputItem"]}<' + '%-- 해당 항목을 입력하십시오. --%' + '>\'';
	arrOutpt[++numIndex] = '					  , "msgNumYn": \'$' + '{requestScope["ITEM.msgItemWrong"]}<' + '%-- 해당 항목값이 잘못되었습니다. --%' + '>\'';
	arrOutpt[++numIndex] = '					  , "msgNumRange": \'$' + '{requestScope["ITEM.msgItemWrong"]}<' + '%-- 해당 항목값이 잘못되었습니다. --%' + '>\'//, "minNum": -999999999999999, "maxNum": 999999999999999';
		} else
		if ( fnExist(arrQuery10[num], "telNo") )
		{
			if ( null == strNotNulLVar || 0 > strNotNulLVar.indexOf(Base.DELI1 + arrQuery10[num] + Base.DELI1) )
				;
			else // NOT NULL
	arrOutpt[++numIndex] = '					  , "msgInputYn": \'$' + '{requestScope["ITEM.msgInputItem"]}<' + '%-- 해당 항목을 입력하십시오. --%' + '>\'';
	arrOutpt[++numIndex] = '					  , "msgByteLngth": \'$' + '{requestScope["ITEM.msgItemLngthMax"]}<' + '%-- 해당 항목값의 길이가 최대값을 초과하였습니다. --%' + '>\', "maxByteSize": 14';
	arrOutpt[++numIndex] = '					  , "msgMask": \'$' + '{requestScope["ITEM.msgItemWrong"]}<' + '%-- 해당 항목값이 잘못되었습니다. --%' + '>\', "maskChar": "1234567890-", "textSuffix": ", FORMAT = ####-####-####"';
		} else
		if ( fnExist(arrQuery10[num], "no") )
		{
			if ( null == strNotNulLVar || 0 > strNotNulLVar.indexOf(Base.DELI1 + arrQuery10[num] + Base.DELI1) )
				;
			else // NOT NULL
	arrOutpt[++numIndex] = '					  , "msgInputYn": \'$' + '{requestScope["ITEM.msgInputItem"]}<' + '%-- 해당 항목을 입력하십시오. --%' + '>\'';
	arrOutpt[++numIndex] = '					  , "msgNumYn": \'$' + '{requestScope["ITEM.msgItemWrong"]}<' + '%-- 해당 항목값이 잘못되었습니다. --%' + '>\'';
	arrOutpt[++numIndex] = '					  , "msgNumRange": \'$' + '{requestScope["ITEM.msgItemWrong"]}<' + '%-- 해당 항목값이 잘못되었습니다. --%' + '>\', "minNum": 0, "maxNum": 9999999999';
		} else
		if ( fnExist(arrQuery10[num], "count") )
		{
			if ( null == strNotNulLVar || 0 > strNotNulLVar.indexOf(Base.DELI1 + arrQuery10[num] + Base.DELI1) )
				;
			else // NOT NULL
	arrOutpt[++numIndex] = '					  , "msgInputYn": \'$' + '{requestScope["ITEM.msgInputItem"]}<' + '%-- 해당 항목을 입력하십시오. --%' + '>\'';
	arrOutpt[++numIndex] = '					  , "msgNumYn": \'$' + '{requestScope["ITEM.msgItemWrong"]}<' + '%-- 해당 항목값이 잘못되었습니다. --%' + '>\'';
	arrOutpt[++numIndex] = '					  , "msgNumRange": \'$' + '{requestScope["ITEM.msgItemWrong"]}<' + '%-- 해당 항목값이 잘못되었습니다. --%' + '>\', "minNum": -9999999999, "maxNum": 9999999999';
		} else
		if ( fnExist(arrQuery10[num], "rate") )
		{
			if ( null == strNotNulLVar || 0 > strNotNulLVar.indexOf(Base.DELI1 + arrQuery10[num] + Base.DELI1) )
				;
			else // NOT NULL
	arrOutpt[++numIndex] = '					  , "msgInputYn": \'$' + '{requestScope["ITEM.msgInputItem"]}<' + '%-- 해당 항목을 입력하십시오. --%' + '>\'';
	arrOutpt[++numIndex] = '					  , "msgNumYn": \'$' + '{requestScope["ITEM.msgItemWrong"]}<' + '%-- 해당 항목값이 잘못되었습니다. --%' + '>\'';
	arrOutpt[++numIndex] = '					  , "msgNumRange": \'$' + '{requestScope["ITEM.msgItemWrong"]}<' + '%-- 해당 항목값이 잘못되었습니다. --%' + '>\', "minNum": 0, "maxNum": 100';
		} else
		if ( fnExist(arrQuery10[num], "date") )
		{
			if ( null == strNotNulLVar || 0 > strNotNulLVar.indexOf(Base.DELI1 + arrQuery10[num] + Base.DELI1) )
				;
			else // NOT NULL
	arrOutpt[++numIndex] = '					  , "msgInputYn": \'$' + '{requestScope["ITEM.msgInputItem"]}<' + '%-- 해당 항목을 입력하십시오. --%' + '>\'';
	arrOutpt[++numIndex] = '					  , "msgDate": \'$' + '{requestScope["ITEM.msgItemWrong"]}<' + '%-- 해당 항목값이 잘못되었습니다. --%' + '>\'';
		} else
		if ( fnExist(arrQuery10[num], "emailName") )
		{
			if ( null == strNotNulLVar || 0 > strNotNulLVar.indexOf(Base.DELI1 + arrQuery10[num] + Base.DELI1) )
				;
			else // NOT NULL
	arrOutpt[++numIndex] = '					  , "msgInputYn": \'$' + '{requestScope["ITEM.msgInputItem"]}<' + '%-- 해당 항목을 입력하십시오. --%' + '>\'';
	arrOutpt[++numIndex] = '					  , "msgByteLngth": \'$' + '{requestScope["ITEM.msgItemLngthMax"]}<' + '%-- 해당 항목값의 길이가 최대값을 초과하였습니다. --%' + '>\', "maxByteSize": 200';
	arrOutpt[++numIndex] = '					  , "msgMask": \'$' + '{requestScope["ITEM.msgItemWrong"]}<' + '%-- 해당 항목값이 잘못되었습니다. --%' + '>\', "maskChar": "abcdefghijklmnopqrstuvwxyz0123456789@.-_", "textSuffix": ", ex.) sample@company.com"';
		} else
		if ( fnExist(arrQuery10[num], "id") )
		{
			if ( null == strNotNulLVar || 0 > strNotNulLVar.indexOf(Base.DELI1 + arrQuery10[num] + Base.DELI1) )
				;
			else // NOT NULL
	arrOutpt[++numIndex] = '					  , "msgInputYn": \'$' + '{requestScope["ITEM.msgInputItem"]}<' + '%-- 해당 항목을 입력하십시오. --%' + '>\'';
	arrOutpt[++numIndex] = '					  , "msgByteLngth": \'$' + '{requestScope["ITEM.msgItemLngthMax"]}<' + '%-- 해당 항목값의 길이가 최대값을 초과하였습니다. --%' + '>\', "maxByteSize": 20';
	arrOutpt[++numIndex] = '					  , "msgMask": \'$' + '{requestScope["ITEM.msgItemWrong"]}<' + '%-- 해당 항목값이 잘못되었습니다. --%' + '>\', "maskChar": "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_", "textSuffix": ", Alphabet/Number/_ Only"';
		} else
		if ( fnExist(arrQuery10[num], "name") )
		{
			if ( null == strNotNulLVar || 0 > strNotNulLVar.indexOf(Base.DELI1 + arrQuery10[num] + Base.DELI1) )
				;
			else // NOT NULL
	arrOutpt[++numIndex] = '					  , "msgInputYn": \'$' + '{requestScope["ITEM.msgInputItem"]}<' + '%-- 해당 항목을 입력하십시오. --%' + '>\'';
	arrOutpt[++numIndex] = '					  , "msgByteLngth": \'$' + '{requestScope["ITEM.msgItemLngthMax"]}<' + '%-- 해당 항목값의 길이가 최대값을 초과하였습니다. --%' + '>\', "maxByteSize": 200';
		}

	arrOutpt[++numIndex] = '					}';
	}
	arrOutpt[++numIndex] = '				]); }) ) return false;';
	arrOutpt[++numIndex] = '	}';
	arrOutpt[++numIndex] = Base.EMPTYSTR;
	arrOutpt[++numIndex] = '	return true;';
	arrOutpt[++numIndex] = '}';
	arrOutpt[++numIndex] = Base.EMPTYSTR;
	arrOutpt[++numIndex] = '// < Sub Procedure and Function - 화면 링크 및 이동 >';
	arrOutpt[++numIndex] = Base.EMPTYSTR;
	arrOutpt[++numIndex] = '// < Sub Procedure and Function - 툴바 영역 >';
	arrOutpt[++numIndex] = Base.EMPTYSTR;
	arrOutpt[++numIndex] = '// < Sub Procedure and Function - 기타 영역 >';
	arrOutpt[++numIndex] = '//==============================================================================';
	arrOutpt[++numIndex] = '// 화면 제어';
	arrOutpt[++numIndex] = '//------------------------------------------------------------------------------';
	arrOutpt[++numIndex] = 'function fnCtrlScr(strClsfy)';
	arrOutpt[++numIndex] = '{';
	arrOutpt[++numIndex] = '	if ( "READY" == strClsfy ) // DOM준비';
	arrOutpt[++numIndex] = '	{';
	arrOutpt[++numIndex] = '		$(btnInqr).click(fnClickInqr); // 클릭';
	arrOutpt[++numIndex] = '		$(btnAdd).click(fnClickAdd);';
	arrOutpt[++numIndex] = '		$(btnImport).click(fnClickImport);';
	arrOutpt[++numIndex] = '		$(btnSave).click(fnClickSave);';
	arrOutpt[++numIndex] = '		$(btnDelt).click(fnClickDelt);';
	arrOutpt[++numIndex] = Base.EMPTYSTR;
	arrOutpt[++numIndex] = '		$(frmImport.filImport).change(fnChangeImport);';
	if ( 0 >= numCode )
	{
	arrOutpt[++numIndex] = Base.EMPTYSTR;
	arrOutpt[++numIndex] = '		fnInitGrid(); // 그리드 초기화';
	}
	arrOutpt[++numIndex] = '	} else';
	arrOutpt[++numIndex] = '	if ( "BFOREINQR" == strClsfy ) // 조회전';
	arrOutpt[++numIndex] = '	{';
	arrOutpt[++numIndex] = '		gfnClearGrid(g_strGridId); // 그리드 정리';
	arrOutpt[++numIndex] = '	}';
	arrOutpt[++numIndex] = '}';
	arrOutpt[++numIndex] = Base.EMPTYSTR;
	arrOutpt[++numIndex] = '//==============================================================================';
	arrOutpt[++numIndex] = '// 콤보 바인딩';
	arrOutpt[++numIndex] = '//------------------------------------------------------------------------------';
	arrOutpt[++numIndex] = 'function fnBindCombo()';
	arrOutpt[++numIndex] = '{';
	if ( 0 < numCode )
	{
	arrOutpt[++numIndex] = '	gfnBindCombo("';
		var blnAdd = false;
		for ( var num = 0 ; num < LNGTH10 ; num++ )
		{
			if ( fnExist(arrQuery10[num], "code") )
			{
				if ( blnAdd )
	arrOutpt[numIndex] += Base.DELI1;
	arrOutpt[numIndex] += "slt" + arrQuery10[num].substr(0, 1).toUpperCase() + arrQuery10[num].substr(1);
				blnAdd = true;
			}
		}
	arrOutpt[numIndex] += '", "';
		blnAdd = false;
		for ( var num = 0 ; num < LNGTH10 ; num++ )
		{
			if ( fnExist(arrQuery10[num], "code") )
			{
				if ( blnAdd )
	arrOutpt[numIndex] += Base.DELI1;
	arrOutpt[numIndex] += fnGetCodeHdr(arrQuery12[num]);
				blnAdd = true;
			}
		}
	arrOutpt[numIndex] += '", null, null, function() ';
	arrOutpt[++numIndex] = '		{';
	arrOutpt[++numIndex] = '			// 그리드 콤보 배열을 설정한다.';
		var numCombo = -1;
		for ( var num = 0 ; num < LNGTH10 ; num++ )
		{
			if ( fnExist(arrQuery10[num], "code") )
			{
	arrOutpt[++numIndex] = '			g_arrGridComboCode[' + (++numCombo).toString() + '] = new Array(2), g_arrGridComboCode[' + numCombo.toString() + '][0] = new Array(), g_arrGridComboCode[' + numCombo.toString() + '][1] = new Array();';

				if ( null == strNotNulLVar || 0 > strNotNulLVar.indexOf(Base.DELI1 + arrQuery10[num] + Base.DELI1) )
	arrOutpt[numIndex] += ' g_arrGridComboCode[' + numCombo.toString() + '][0][0] = Base.EMPTYSTR, g_arrGridComboCode[' + numCombo.toString() + '][1][0] = Base.EMPTYSTR;';
			}
		}
	arrOutpt[++numIndex] = Base.EMPTYSTR;
		numCombo = -1;
		for ( var num = 0 ; num < LNGTH10 ; num++ )
		{
			if ( fnExist(arrQuery10[num], "code") )
	arrOutpt[++numIndex] = '			$("#' + "slt" + arrQuery10[num].substr(0, 1).toUpperCase() + arrQuery10[num].substr(1) + '>option").each(function() { g_arrGridComboCode[' + (++numCombo).toString() + '][0][g_arrGridComboCode[' + numCombo.toString() + '][0].length] = $(this).val(); g_arrGridComboCode[' + numCombo.toString() + '][1][g_arrGridComboCode[' + numCombo.toString() + '][1].length] = $(this).text(); });';
		}
	arrOutpt[++numIndex] = Base.EMPTYSTR;
	arrOutpt[++numIndex] = '			fnInitGrid(); // 그리드 초기화';
	arrOutpt[++numIndex] = '		});';
	}
	arrOutpt[++numIndex] = '}';
	arrOutpt[++numIndex] = Base.EMPTYSTR;
	arrOutpt[++numIndex] = '//==============================================================================';
	arrOutpt[++numIndex] = '// 검증';
	arrOutpt[++numIndex] = '//------------------------------------------------------------------------------';
	arrOutpt[++numIndex] = 'function fnVerif(strClsfy)';
	arrOutpt[++numIndex] = '{';
	arrOutpt[++numIndex] = '	if ( null == gfnGetGridView(g_strGridId) ) return false; // 그리드 로드되었는지 검증한다.';
	arrOutpt[++numIndex] = Base.EMPTYSTR;
	arrOutpt[++numIndex] = '	if ( "INQR" == strClsfy ) // 조회';
	arrOutpt[++numIndex] = '	{';
	arrOutpt[++numIndex] = '	} else';
	arrOutpt[++numIndex] = '	if ( "ADD" == strClsfy ) // 추가';
	arrOutpt[++numIndex] = '	{';
	arrOutpt[++numIndex] = '		if ( \'$' + '{requestScope["MENU.authCode"]}\' != Base.WRITE_AUTH ) // 쓰기 권한 검증';
	arrOutpt[++numIndex] = '		{';
	arrOutpt[++numIndex] = '			gfnDispMsg(\'$' + '{requestScope["ITEM.msgNoAuth"]}<' + '%-- 권한이 없습니다. 관리자에게 문의하십시오. --%' + '>\');';
	arrOutpt[++numIndex] = '			return false;';
	arrOutpt[++numIndex] = '		}';
	arrOutpt[++numIndex] = '	} else';
	arrOutpt[++numIndex] = '	if ( "SAVE" == strClsfy ) // 저장';
	arrOutpt[++numIndex] = '	{';
	arrOutpt[++numIndex] = '		if ( !fnVerif("DELT") ) return false; // 검증 : 삭제';
	arrOutpt[++numIndex] = Base.EMPTYSTR;
	arrOutpt[++numIndex] = '		if ( !fnVerifGrid(strClsfy) ) return false; // 그리드를 검증한다.';
	arrOutpt[++numIndex] = '	} else';
	arrOutpt[++numIndex] = '	if ( "DELT" == strClsfy ) // 삭제';
	arrOutpt[++numIndex] = '	{';
	arrOutpt[++numIndex] = '		if ( \'${' + 'requestScope["MENU.authCode"]}\' != Base.WRITE_AUTH ) // 쓰기 권한 검증';
	arrOutpt[++numIndex] = '		{';
	arrOutpt[++numIndex] = '			gfnDispMsg(\'$' + '{requestScope["ITEM.msgNoAuth"]}<' + '%-- 권한이 없습니다. 관리자에게 문의하십시오. --%' + '>\');';
	arrOutpt[++numIndex] = '			return false;';
	arrOutpt[++numIndex] = '		}';
	arrOutpt[++numIndex] = Base.EMPTYSTR;
	arrOutpt[++numIndex] = '		if ( 0 >= gfnGetInt(gfnCallGridFunc(g_strGridId, "getItemCount()")) ) // 그리드 데이터가 존재하지 않는 경우..';
	arrOutpt[++numIndex] = '		{';
	arrOutpt[++numIndex] = '			gfnDispMsg(\'$' + '{requestScope["ITEM.msgNoData"]}<' + '%-- 데이터가 존재하지 않습니다. --%' + '>\');';
	arrOutpt[++numIndex] = '			return false;';
	arrOutpt[++numIndex] = '		} else';
	arrOutpt[++numIndex] = '		if ( 0 >= gfnGetInt(gfnCallGridFunc(g_strGridId, "getCheckedItems().length")) ) // 그리드 데이터를 선택하지 않은 경우..';
	arrOutpt[++numIndex] = '		{';
	arrOutpt[++numIndex] = '			gfnDispMsg(\'$' + '{requestScope["ITEM.msgListChc"]}<' + '%-- 조회된 목록에서 데이터를 선택하십시오. --%' + '>\');';
	arrOutpt[++numIndex] = '			return false;';
	arrOutpt[++numIndex] = '		}';
	arrOutpt[++numIndex] = '	} else';
	arrOutpt[++numIndex] = '	if ( "IMPORT" == strClsfy ) // IMPORT';
	arrOutpt[++numIndex] = '	{';
	arrOutpt[++numIndex] = '		if ( \'$' + '{requestScope["MENU.authCode"]}\' != Base.WRITE_AUTH ) // 쓰기 권한 검증';
	arrOutpt[++numIndex] = '		{';
	arrOutpt[++numIndex] = '			gfnDispMsg(\'$' + '{requestScope["ITEM.msgNoAuth"]}<' + '%-- 권한이 없습니다. 관리자에게 문의하십시오. --%' + '>\');';
	arrOutpt[++numIndex] = '			return false;';
	arrOutpt[++numIndex] = '		}';
	arrOutpt[++numIndex] = Base.EMPTYSTR;
	arrOutpt[++numIndex] = '		if ( gfnIsEmpty(frmImport.filImport.value) )';
	arrOutpt[++numIndex] = '		{';
	arrOutpt[++numIndex] = '			gfnDispMsg(\'$' + '{requestScope["ITEM.msgChcItem"]}<' + '%-- 해당 항목을 선택하십시오. --%' + '>\', $(btnImport).text());';
	arrOutpt[++numIndex] = '			frmImport.reset(); return false;';
	arrOutpt[++numIndex] = '		} else';
	arrOutpt[++numIndex] = '		if ( 0 > frmImport.filImport.value.toLowerCase().indexOf(".xls") && 0 > frmImport.filImport.value.toLowerCase().indexOf(".xlsx") )';
	arrOutpt[++numIndex] = '		{';
	arrOutpt[++numIndex] = '			gfnDispMsg(\'$' + '{requestScope["ITEM.msgFileWrong"]}<' + '%-- 파일 확장자가 잘못되었습니다. 다음 파일을 선택하십시오. --%' + '>\', "*.xls or *.xlsx");';
	arrOutpt[++numIndex] = '			frmImport.reset(); return false;';
	arrOutpt[++numIndex] = '		}';
	arrOutpt[++numIndex] = '	}';
	arrOutpt[++numIndex] = Base.EMPTYSTR;
	arrOutpt[++numIndex] = '	return true;';
	arrOutpt[++numIndex] = '}';
	arrOutpt[++numIndex] = '--' + '>';
	arrOutpt[++numIndex] = '<' + '/script' + '>';
	arrOutpt[++numIndex] = '<' + '!-- CSS 및 JavaScript 관련 END   //--' + '>';
	arrOutpt[++numIndex] = '<' + '%@ include file="../../../epfse/system/menu.jsp" %' + '><' + '%-- 메뉴 관련 --%' + '>';
	arrOutpt[++numIndex] = Base.EMPTYSTR;
	arrOutpt[++numIndex] = '<' + '!-- contents START //--' + '>';
	arrOutpt[++numIndex] = '<' + '!-- 조회조건 //--' + '>';
	arrOutpt[++numIndex] = '<' + 'div class="headSearch" id="divInqrCond"' + '>';
	arrOutpt[++numIndex] = '	<' + 'fieldset' + '>';
	arrOutpt[++numIndex] = '		<' + 'span class="button smallGray"' + '><' + 'button type="button" id="btnInqr"' + '>$' + '{requestScope["ITEM.inqr"]}<' + '%-- 조회 --%' + '><' + '/button></span' + '>';
	arrOutpt[++numIndex] = '	</fieldset>';
	arrOutpt[++numIndex] = '<' + '/div' + '>';
	arrOutpt[++numIndex] = Base.EMPTYSTR;
	arrOutpt[++numIndex] = '<' + '!-- 그리드 //--' + '>';
	arrOutpt[++numIndex] = '<' + 'div style="margin-right: 20px"' + '><' + 'div id="divGrid" style="height: 432px"' + '><' + '/div' + '><' + '/div' + '>';
	arrOutpt[++numIndex] = '<' + 'div id="divPage"' + '>';
	arrOutpt[++numIndex] = '	<' + 'div class="Paginate" style="height: 26px"' + '><' + '/div' + '>';
	arrOutpt[++numIndex] = Base.EMPTYSTR;
	arrOutpt[++numIndex] = '	<' + 'input type="hidden" name="page"    value="1"  /' + '><' + '!-- 페이지   //--' + '>';
	arrOutpt[++numIndex] = '	<' + 'input type="hidden" name="pageRow" value="18" /' + '><' + '!-- 페이지행 //--' + '>';
	arrOutpt[++numIndex] = '<' + '/div' + '>';
	arrOutpt[++numIndex] = Base.EMPTYSTR;
	arrOutpt[++numIndex] = '<' + '!-- 버튼 //--' + '>';
	arrOutpt[++numIndex] = '<' + 'div class="buttonBox" style="margin-right: 20px"' + '>';
	arrOutpt[++numIndex] = '	<' + 'span class="button lime" style="visibility: hidden"' + '><' + 'button type="button" id="btnAdd"' + '>$' + '{requestScope["ITEM.add"]}<' + '%-- 추가 --%' + '><' + '/button' + '><' + '/span' + '>';
	arrOutpt[++numIndex] = '	<' + 'span class="button gray" style="visibility: hidden"' + '><' + 'button type="button" id="btnImport"' + '>Import<' + '/button' + '><' + '/span' + '>';
	arrOutpt[++numIndex] = '	<' + 'div style="float: right"' + '>';
	arrOutpt[++numIndex] = '		<' + 'span class="button gray" style="visibility: hidden"' + '><' + 'button type="button" id="btnDelt"' + '>$' + '{requestScope["ITEM.delt"]}<' + '%-- 삭제 --%' + '><' + '/button' + '></span' + '>';
	arrOutpt[++numIndex] = '		<' + 'span class="button green" style="visibility: hidden"' + '><' + 'button type="button" id="btnSave"' + '>$' + '{requestScope["ITEM.save"]}<' + '%-- 저장 --%' + '><' + '/button' + '></span' + '>';
	arrOutpt[++numIndex] = '	<' + '/div' + '>';
	arrOutpt[++numIndex] = '<' + '/div' + '>';
	arrOutpt[++numIndex] = Base.EMPTYSTR;
	arrOutpt[++numIndex] = '<' + 'div style="display: none">';
	arrOutpt[++numIndex] = '	<' + 'form name="frmImport">';
	arrOutpt[++numIndex] = '		<' + 'input type="file" id="filImport" />';
	arrOutpt[++numIndex] = '	<' + '/form>';
	for ( var num = 0 ; num < LNGTH10 ; num++ )
	{
		if ( fnExist(arrQuery10[num], "code") )
	arrOutpt[++numIndex] = '	<' + 'select id="slt' + arrQuery10[num].substr(0, 1).toUpperCase() + arrQuery10[num].substr(1) + '"><' + '/select>';
	}
	arrOutpt[++numIndex] = '<' + '/div>';
	arrOutpt[++numIndex] = '<' + '!-- contents END   //--' + '>';
	arrOutpt[++numIndex] = Base.EMPTYSTR;
	arrOutpt[++numIndex] = '<' + '%@ include file="../../../epfse/system/ftr.jsp" %' + '><' + '%-- 푸터 관련 --%' + '>';

	arrQuery10 = null; arrQuery11 = null; arrQuery12 = null; arrQuery13 = null;

	return arrOutpt.join("\r\n");
}