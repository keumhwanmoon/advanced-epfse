<%--
--------------------------------------------------------------------------------
    PROJECT NAME : ES-MRV3
--------------------------------------------------------------------------------
    - 단위업무명 : 헤더
    - 최초작성일 : 2014-07-29
    - 작  성  자 : 유광식
    - 비      고 :
--------------------------------------------------------------------------------
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="ko" lang="ko">

<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge, chrome=1" />

<meta http-equiv="Expires" content="-1" />
<meta http-equiv="Pragma" content="no-cache" />
<meta http-equiv="Cache-Control" content="No-Cache" />
<meta content="initial-scale=1.0" name="viewport" />

<title>${requestScope["ITEM.browserTitle"]}<%-- 브라우저제목 --%></title>

<!-- header CSS 및 JavaScript 관련 START //-->
<link href="${pageContext.request.contextPath}/common/jquery/css/jquery-ui.min.css" rel="stylesheet" type="text/css" /><!-- jQuery UI //-->
<link href="${pageContext.request.contextPath}/common/css/layout.css" rel="stylesheet" type="text/css" />

<script src="${pageContext.request.contextPath}/common/jquery/js/jquery.min.js"   ></script><!-- jQuery    //-->
<script src="${pageContext.request.contextPath}/common/jquery/js/jquery-ui.min.js"></script><!-- jQuery UI //-->
<script src="${pageContext.request.contextPath}/common/js/jquery.esmrv.ui.js" type="text/javascript"></script>

<script src="${pageContext.request.contextPath}/common/js/base.js"  charset="utf-8"></script><!-- 기본 //-->
<script src="${pageContext.request.contextPath}/common/js/combo.js" charset="utf-8"></script><!-- 콤보 //-->
<script src="${pageContext.request.contextPath}/common/js/mask.js"  charset="utf-8"></script><!-- 마스크 //-->

