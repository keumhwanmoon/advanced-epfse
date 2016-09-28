/*
--------------------------------------------------------------------------------
	PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
	- 단위업무명 : 트리 jQuery
	- 최초작성일 : 2014-05-07
	- 작  성  자 : 유광식
	- 비      고 : jstree 를 include 한다.
--------------------------------------------------------------------------------
*/
//==============================================================================
// 용도     : 트리 정리
// 파라미터 : objSet - 설정
// 리턴값   : 
// 참고사항 : 
// 기타     : 개발자 배포용
// 작성일자 : 2014-05-07
//------------------------------------------------------------------------------
function gfnClearTree(objSet)
{
	if ( null == objSet || null == objSet["id"] || !(objSet["id"] in window) ) return;

	$("#" + objSet["id"]).html(Base.EMPTYSTR).jstree("destroy");
}

//==============================================================================
// 용도     : 트리 바인딩
// 파라미터 : 1. objSet  - 설정
//            2. objData - 데이터
// 리턴값   : 
// 참고사항 : [ { "id": "string" // ID(필수)
//              , "parent": "string" // 부모ID(필수)
//              , "text": "string" // node text
//              , "icon": "string" // string for custom
//              , "state": { "opened": boolean // is the node open
//                         , "disabled": boolean // is the node disabled
//                         , "selected": boolean // is the node selected
//                         }
//              , "li_attr": { } // attributes for the generated LI node
//              , "a_attr": { } // attributes for the generated A node
//              }
//            ]
// 기타     : 개발자 배포용
// 작성일자 : 2014-05-07
//------------------------------------------------------------------------------
/* 예제
// 전역변수 설정
var g_objTree =
	{
		"id": "divTree" // DIV 태그 ID (필수)
	  , "output": "jstree" // 바인딩할 조회결과 key (필수)
	// 이벤트 관련
	  , "select_node.jstree": function(objEvent, objInfo)
			{
				//alert(objInfo["node"].id); // 노드 ID 가져오기
				//alert(objInfo["node"].text); // 노드 텍스트 가져오기
				//alert($("#" + this["id"]).jstree("is_leaf", objInfo["node"])); // 마지막 노드 여부
				//alert($("#" + g_objTree["id"] + ":jstree").jstree("get_path", objInfo["node"]).length); // 노드의 LEVEL/DEPTH 가져오기
				//$("#" + g_objTree["id"] + ":jstree").jstree("select_node", "1"); // ID 로 노드 선택
				//$("#" + g_objTree["id"] + ":jstree").jstree("deselect_all"); // 모든 노드 선택 해제
				//$("#" + g_objTree["id"] + ":jstree").jstree("select_node", "101"); // ID 로 노드 선택
			}
	};
// 조회 처리전 실행
gfnClearTree(g_objTree); // 트리 정리

// 조회 성공시 실행
gfnBindTree(g_objTree, objData); // 트리 바인딩
*/
function gfnBindTree(objSet, objData)
{
	if ( null == gfnGetJsonValue(objSet, [ "id" ]) || !(objSet["id"] in window) ) return;

	if ( null == gfnGetJsonValue(objSet, [ "output" ]) || gfnIsEmpty(gfnGetJsonValue(objData, [ Base.RSLT_INFO, objSet["output"] ])) )
	{
		gfnClearTree(objSet);
	} else
	{
		var objTree = $("#" + objSet["id"]);

		// 기본 설정
		var objDflt =
			{
				"core":
					{
						"data" : $.parseJSON(objData[Base.RSLT_INFO][objSet["output"]])
					  , "multiple": false
					}
			};

		$.extend(true, objDflt, objSet);

		objTree.jstree(objDflt);

		// 이벤트를 설정한다.
		for ( var strKey in objSet )
		{
			if ( 0 < strKey.indexOf(".jstree") )
				objTree.bind(strKey, objSet[strKey]);
		}

		objDflt = null; objTree = null;
	}
}