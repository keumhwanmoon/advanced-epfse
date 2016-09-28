var Fso =
{
	"FOLDR_DELI": "\\", "ERROR_FILE": -3, "ERROR": -1
};

//==============================================================================
// 용도     : FSO 가져오기
// 파라미터 : strErrorMsg - 오류메시지
// 리턴값   : Object
// 참고사항 : 
// 기타     : 개발자 배포용
// 작성일자 : 2014-04-23
//------------------------------------------------------------------------------
function gfnGetFso(strErrorMsg)
{
	var objOutpt = null ;

	try { objOutpt = new ActiveXObject("Scripting.FileSystemObject"); }
	catch ( objEct ) { }

	if ( null == objOutpt && !gfnIsEmpty(strErrorMsg) ) gfnDispMsg(strErrorMsg);

	return objOutpt;
}

//==============================================================================
// 용도     : 폴더 추가
// 파라미터 : 1. objFso  - File System Object
//            2. strPath - 경로
// 리턴값   : String
// 참고사항 : 마지막에 폴더구분자를 붙여준다.
// 기타     : 개발자 배포용
// 작성일자 : 2014-04-13
//------------------------------------------------------------------------------
function gfnAddFoldr(objFso, strPath)
{
	var arrOutpt = new Array(), numIndex = -1;

	if ( !objFso.FolderExists(strPath) )
	{
		var arrPath = strPath.split(Fso.FOLDR_DELI), LNGTH = arrPath.length;
		var str;

		for ( var num = 0 ; num < LNGTH ; num++ )
		{
			arrOutpt[++numIndex] = arrPath[num]; str = arrOutpt.join(Fso.FOLDR_DELI);
			if ( !objFso.FolderExists(str) ) objFso.CreateFolder(str);
		}

		arrPath = null;
	} else
	{
		arrOutpt[++numIndex] = strPath;
	}

	var OUTPT = arrOutpt.join(Fso.FOLDR_DELI), LAST_INDEX = OUTPT.length - 1;
	if ( Fso.FOLDR_DELI != OUTPT.substr(LAST_INDEX) ) arrOutpt[++numIndex] = Base.EMPTYSTR;

	return arrOutpt.join(Fso.FOLDR_DELI);
}

//==============================================================================
// 용도     : 텍스트 파일 저장
// 파라미터 : 1. objFso   - File System Object
//            2. strPath  - 경로
//            3. strCtts  - 내용\
//            4. blnUnicd - UNICODE
// 리턴값   : Integer
// 참고사항 : 
// 기타     : 개발자 배포용
// 작성일자 : 2014-04-23
//------------------------------------------------------------------------------
function gfnSaveTextFile(objFso, strPath, strCtts, blnUnicd) {
	var numOutpt = Base.OK;

	var objFile = null ;

	try {
		objFile = objFso.CreateTextFile(strPath, true, blnUnicd);
		objFile.Write(strCtts);
		objFile.Close();
	} catch ( objEct ) {
		if ( null == objFile ) numOutpt = Fso.ERROR_FILE; // 파일저장오류
		else                   numOutpt = Fso.ERROR; // 저장요청오류
	} finally {
		if ( null != objFile ) objFile.Close();

		objFile = null ;
	}

	return numOutpt;
}