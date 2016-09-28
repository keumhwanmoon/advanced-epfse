<%--
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 탭 푸터
    - 최초작성일 : 2015-06-09
    - 작  성  자 : 문금환
    - 비      고 :
--------------------------------------------------------------------------------
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!-- footer -->
            <form name="frmComPageReq" method="post"><!-- 페이지 요청 //-->
                <div id="divComParamContnr"><!-- 공통매개변수컨테이너 //-->
                    <input type="hidden" name="comParamUserLangCode"  value='${requestScope["COM_PARAM.langCode"]}' /><!-- 사용자언어코드 //-->
                    <input type="hidden" name="comParamLangCodeHdrId" value='<%=com.ecosian.epfse.system.common.Base.LANG_CODE_HDR_ID%>' /><!-- 언어코드헤더ID //-->
                    <input type="hidden" name="comParamScrAddrName"   value='${requestScope["COM_PARAM.scrAddrName"]}' /><!-- 화면주소명 //-->

                    <input type="hidden" name="comParamLoginUserId"   value='${sessionScope["loginUserId"]}' /><!-- 로그인사용자ID //-->
                    <input type="hidden" name="comParamSubMenuDispYn" value='${requestScope["USER.subMenuDispYn"]}' /><!-- 서브메뉴표시여부 //-->

                    <input type="hidden" name="comParamScrDataJsonStrSet" value="" /><!-- 화면데이터JSON문자열설정     //-->
                    <input type="hidden" name="comParamScrDataJsonStrGet" value='${param["comParamScrDataJsonStrSet"]}' /><!-- 화면데이터JSON문자열가져오기 //-->

                    <input type="hidden" id="hidComParamContextPatch" name="comParamContextPath" value='${pageContext.request.contextPath}' /><!-- Context Path -->
                </div>
            </form>

            <!-- Progress Bar 영역 //-->
            <div id="divCommonJspPgbar" style="display: none; text-align: center; padding-top: 32px">
                <img src="${pageContext.request.contextPath}/common/images/common/loading.gif" />
            </div>

            <div id="bgOpacity" style="display: none;"><iframe frameborder="0" title="팝업 레이어 배경" style="display: none;"></iframe></div>
        </div>
    </body>
</html>
<!-- // footer -->