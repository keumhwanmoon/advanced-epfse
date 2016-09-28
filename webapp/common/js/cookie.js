//==============================================================================
// 용도     : 쿠키 설정
// 파라미터 : 1. strName  - 이름
//            2. strValue - 값 참고) 미입력시 "" 입력과 동일
//            3. nDayCnt  - 쿠키를 저장할 일수
// 리턴값   : 
// 참고사항 : 쿠키 사용이 가능한 브라우저에서 이용가능하다.
// 기타     : 개발자 배포용
// 작성일자 : 2014-04-15
//------------------------------------------------------------------------------
function gfnSetCooki(strName, strValue, numDay)
{
	if ( strValue == null ) strValue = "";
	if ( numDay  == null ) numDay  = 30;

	var objExpiresDate = new Date();
	objExpiresDate.setTime(objExpiresDate.getTime() + 1000 * 3600 * 24 * numDay);

	document.cookie = strName + "=" + escape(strValue) + "; path=/; expires=" + objExpiresDate.toGMTString();

	objExpiresDate = null;
}

//==============================================================================
// 용도     : 쿠키 제거
// 파라미터 : strName  - 이름
// 리턴값   : 
// 참고사항 : 쿠키 사용이 가능한 브라우저에서 이용가능하다.
// 기타     : 개발자 배포용
// 작성일자 : 2014-04-15
//------------------------------------------------------------------------------
function gfnRemovCooki(strName)
{
	var objExpiresDate = new Date();
	objExpiresDate.setTime(objExpiresDate.getTime() - 1);

	gfnSetCookie(strName, "", objExpiresDate);

	objExpiresDate = null;
}

//==============================================================================
// 용도     : 쿠키 가져오기
// 파라미터 : strName  - 이름
// 리턴값   : 
// 참고사항 : 쿠키 사용이 가능한 브라우저에서 이용가능하다.
// 기타     : 개발자 배포용
// 작성일자 : 2014-04-15
//------------------------------------------------------------------------------
function gfnGetCooki(strName)
{
	var strOutpt = "";

	var COOKI = document.cookie;

	if ( 0 < COOKI.length )
	{
		var numStartIndex = COOKI.indexOf(strName + "=");

		if ( 0 <= numStartIndex )
		{
			numStartIndex += (strName + "=").length;

			var numEndIndex = COOKI.indexOf(";", numStartIndex);
			if ( 0 > numEndIndex ) numEndIndex = COOKI.length;

			strOutpt = unescape(COOKI.substring(numStartIndex, numEndIndex));
		}
	}

	return strOutpt;
}