<%--
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 첨부 결과
    - 최초작성일 : 2014-05-15
    - 작  성  자 : 유광식
    - 비      고 :
--------------------------------------------------------------------------------
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">

<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>${requestScope["ITEM.browserTitle"]}<%-- 브라우저제목 --%></title>

<!-- CSS 및 JavaScript 관련 -->
<script src="/common/jquery/js/jquery.min.js"   ></script><!-- jQuery    //-->

<script src="/common/js/base.js"   charset="utf-8"></script><!-- 기본 //-->
<script type="text/javascript">
<!--
// < Sub Procedure and Function - GLOBAL 영역 >

// < Sub Procedure and Function - MAIN 영역 >
//==============================================================================
// DOM 로드시..
//------------------------------------------------------------------------------
$(document).ready(function()
{
    var RSLT_VALUE =  ${requestScope["CHANNEL.rsltNo"  ]};
    var RSLT_INFO  = '${requestScope["CHANNEL.rsltInfo"]}';

    var obj = null; if ( 0 < RSLT_INFO.length ) eval('obj = ' + RSLT_INFO);

    if ( null != obj )
    {
        if ( Base.OK == RSLT_VALUE )
        {
            if ( !gfnIsEmpty(obj["sccssFuncName"]) ) eval("parent." + obj["sccssFuncName"] + "(obj);");
        } else
        {
            if ( !gfnIsEmpty(obj["errorFuncName"]) ) eval("parent." + obj["errorFuncName"] + "(RSLT_VALUE)");
        }

        obj = null;
    }
});

// < Sub Procedure and Function - 주요 이벤트 영역 >

// < Sub Procedure and Function - 비지니스 로직 호출 영역 >

// < Sub Procedure and Function - 그리드 영역 >

// < Sub Procedure and Function - 차트 영역 >

// < Sub Procedure and Function - 화면 링크 및 이동 >

// < Sub Procedure and Function - 기타 영역 >
-->
</script>
<!-- // CSS 및 JavaScript 관련 -->
</head>

<body>

</body>

</html>