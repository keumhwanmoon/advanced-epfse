var g_objEditAppRef = [ ];

//==============================================================================
// 용도     : EDIT 값 바인딩
// 파라미터 : 1. strId    - ID  (선택)
//            2. strValue - 값  (선택)
//            3. objFunc  - 함수(선택)
// 리턴값   : 
// 참고사항 : 
// 기타     : 개발자 배포용
// 작성일자 : 2014-05-14
//------------------------------------------------------------------------------
/*
// 조회된 TEXTAREA 값을 EDIT 내용에 반영한다.
gfnBindEditValue("txaCtts", txaCtts.value); // EDIT 값 바인딩
gfnBindEditValue("txaCtts", txaCtts.value, function() { alert("EDIT 내용 적용완료"); }); // EDIT 값 바인딩

// 편집한 EDIT 내용을 TEXTAREA 에 반영한다.
gfnBindEditValue(); // EDIT 값 바인딩
gfnBindEditValue("txaCtts"); // EDIT 값 바인딩
gfnBindEditValue(null, null, function() { alert("EDIT 편집값 바인딩 완료"); }); // EDIT 값 바인딩 //gfnSetEditValue("txaCtts"); // EDIT 값 바인딩

// EDIT 를 초기화한다.
//gfnBindEditValue("txaCtts"); // EDIT 값 바인딩
//gfnBindEditValue("txaCtts", ""); // EDIT 값 바인딩
gfnBindEditValue("txaCtts", "초기값", function() { alert("EDIT 내용 적용완료"); }); // EDIT 값 바인딩
 */
function gfnBindEditValue(strId, strValue, objFunc)
{
	if ( !gfnIsEmpty(strId) && !(strId in window) ) return;

	if ( ( !gfnIsEmpty(strId) ) && 
	     ( null == g_objEditAppRef || null == g_objEditAppRef["getById"] || 
	       null == g_objEditAppRef.getById[strId] ) )
	{
		// 초기값을 설정한다.
		if ( null != strValue ) $("#" + strId).val(strValue);

		/// 높이를 조정한다.
		$("#" + strId).height($("#" + strId).height() - 45);

		nhn.husky.EZCreator.createInIFrame(
		{
			"oAppRef": g_objEditAppRef
		  , "elPlaceHolder": strId
		  , "sSkinURI": "/common/smartEditor/SmartEditor2Skin.html"
		  , "fCreator": "createSEditor2"
		  , "fOnAppLoad": objFunc
		  , "htParams": { fOnBeforeUnload: function() { } } // 다른 페이지로 이동시 내용이 변경에 대한 메시지를 띄우지않도록 추가함.
		});
	} else
	{
		var obj;

		if ( gfnIsEmpty(strId) )
		{
			for ( var strKey in g_objEditAppRef.getById )
			{
				obj = g_objEditAppRef.getById[strKey];
				if ( null != strValue ) obj.setContents(strValue); // EDIT 내용을 설정한다.
				obj.exec("UPDATE_CONTENTS_FIELD", [ ]); // EDIT 내용을 TEXTAREA 에 반영한다.
			}
		} else
		{
			obj = g_objEditAppRef.getById[strId];
			if ( null != strValue ) obj.setContents(strValue); // EDIT 내용을 설정한다.
			obj.exec("UPDATE_CONTENTS_FIELD", [ ]); // EDIT 내용을 TEXTAREA 에 반영한다.
		}

		obj = null;

		if ( null != objFunc ) objFunc();
	}
}

//==============================================================================
// 용도     : EDIT HTML 붙여넣기
// 파라미터 : 1. strId   - ID
//            2. strHtml - HTML
// 리턴값   : 
// 참고사항 : 
// 기타     : 개발자 배포용
// 작성일자 : 2014-05-20
//------------------------------------------------------------------------------
function gfnPasteEditHtml(strId, strHtml)
{
	if ( !gfnIsEmpty(strId) && !(strId in window) ) return;

	if ( null != g_objEditAppRef && null != g_objEditAppRef["getById"] && 
	     null != g_objEditAppRef.getById[strId] && !gfnIsEmpty(strHtml) )
	{
		var obj = g_objEditAppRef.getById[strId];

		obj.exec("PASTE_HTML", [ strHtml ]);

		// ? 가 추가되지 않도록 다음문자를 제거한다.
		obj.setContents(obj.getContents().replace(unescape("%uFEFF"), Base.EMPTYSTR));

		obj = null;
	}
}