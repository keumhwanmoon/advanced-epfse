//==============================================================================
// 용도     : 테이블 Controller 가져오기
// 파라미터 : strDate - 일자
// 리턴값   : String
// 참고사항 :
// 기타     : 내부 호출용
// 작성일자 : 2014-06-23
//------------------------------------------------------------------------------
function gfnGetTableCtrlr(strDate)
{
    var arrOutpt = new Array(), numIndex = -1;

    var arrQuery10 = txaQuery10.value.split("\r\n"); arrQuery10 = arrQuery10.slice(0, arrQuery10.length - 1);
    var LNGTH10 = arrQuery10.length;

    arrOutpt[++numIndex] = '/*';
    arrOutpt[++numIndex] = '--------------------------------------------------------------------------------';
    arrOutpt[++numIndex] = '	PROJECT NAME : ' + $("#sltPrjctName>option:selected").text();
    arrOutpt[++numIndex] = '--------------------------------------------------------------------------------';
    arrOutpt[++numIndex] = '	- 단위업무명 : ' + fnGetText(txtTableKrnName.value) + ' Controller';
    arrOutpt[++numIndex] = '	- 최초작성일 : ' + gfnFormt(strDate, "DATE");
    arrOutpt[++numIndex] = '	- 작  성  자 : ' + txtUserName.value;
    arrOutpt[++numIndex] = '	- 비      고 : Controller 클래스내 모든 함수는 매개변수에 HttpServletRequest 를 추가한다.';
    arrOutpt[++numIndex] = '	               페이지경로 가져오는 함수의 return type 은 ModelAndView 이고, 그 외의 함수는 Channel 이다.';
    arrOutpt[++numIndex] = '--------------------------------------------------------------------------------';
    arrOutpt[++numIndex] = '*/';
    arrOutpt[++numIndex] = 'package ' + txtPackgName.value + txtPackgName2.value + '.ctrl;';
    arrOutpt[++numIndex] = Base.EMPTYSTR;
    arrOutpt[++numIndex] = 'import javax.annotation.Resource;';
    arrOutpt[++numIndex] = 'import javax.servlet.http.HttpServletRequest;';
    arrOutpt[++numIndex] = Base.EMPTYSTR;
    arrOutpt[++numIndex] = 'import org.springframework.http.HttpStatus;';
    arrOutpt[++numIndex] = 'import org.springframework.stereotype.Controller;';
    arrOutpt[++numIndex] = 'import org.springframework.web.bind.annotation.ModelAttribute;';
    arrOutpt[++numIndex] = 'import org.springframework.web.bind.annotation.RequestMapping;';
    arrOutpt[++numIndex] = 'import org.springframework.web.bind.annotation.RequestMethod;';
    arrOutpt[++numIndex] = 'import org.springframework.web.bind.annotation.ResponseBody;';
    arrOutpt[++numIndex] = 'import org.springframework.web.bind.annotation.ResponseStatus;';
    arrOutpt[++numIndex] = 'import org.springframework.web.servlet.ModelAndView;';
    arrOutpt[++numIndex] = Base.EMPTYSTR;
    arrOutpt[++numIndex] = 'import ' + txtPackgName.value + txtPackgName2.value + '.dao.vo.' + fnGetTableEngName(1) + 'VO;';
    arrOutpt[++numIndex] = 'import ' + txtPackgName.value + txtPackgName2.value + '.svc.' + fnGetTableEngName(1) + 'Service;';
    arrOutpt[++numIndex] = 'import com.ecosian.epfse.system.common.Base;';
    arrOutpt[++numIndex] = 'import com.ecosian.epfse.system.common.Channel;';
    arrOutpt[++numIndex] = 'import com.ecosian.epfse.system.common.dao.vo.ComParamVO; // 공통매개변수';
    arrOutpt[++numIndex] = Base.EMPTYSTR;
    arrOutpt[++numIndex] = '@Controller // Presentation Layer 를 구성하는 Controller Class 를 정의';
    arrOutpt[++numIndex] = 'public class ' + fnGetTableEngName(1) + 'Controller';
    arrOutpt[++numIndex] = '{';
    arrOutpt[++numIndex] = '	@Resource(name = "' + fnGetTableEngName(2) + 'Service") // 해당 beanName 과 일치하는 bean 을 가져온다.';
    arrOutpt[++numIndex] = '	private ' + fnGetTableEngName(1) + 'Service svc;';
    arrOutpt[++numIndex] = Base.EMPTYSTR;
    arrOutpt[++numIndex] = '	// 페이지경로 가져오기 // ' + fnGetText(txtTableKrnName.value) + ' 화면 요청시 사용한다.';
    arrOutpt[++numIndex] = '	@RequestMapping(value="' + fnGetScrPath("/") + fnGetTableEngName(2) + '.do")';
    arrOutpt[++numIndex] = '	public ModelAndView getPagePath(HttpServletRequest req, ';
    arrOutpt[++numIndex] = '			@ModelAttribute ComParamVO voComParam)';
    arrOutpt[++numIndex] = '	{';
    arrOutpt[++numIndex] = '		// Page Path = [InternalResourceViewResolver prefix] + [return value] + [InternalResourceViewResolver suffix]';
    arrOutpt[++numIndex] = '		//           = "/WEB-INF/views/" + [return value] + ".jsp"';
    arrOutpt[++numIndex] = '		return new ModelAndView("/' + hidPrjctName.value + '" + Base.getReturnPath(req));';
    arrOutpt[++numIndex] = '	}';
    arrOutpt[++numIndex] = Base.EMPTYSTR;
    arrOutpt[++numIndex] = '	// 목록 가져오기 // ' + fnGetText(txtTableKrnName.value) + ' 그리드 화면 조회 클릭시 사용한다.';
    arrOutpt[++numIndex] = '	@RequestMapping(method=RequestMethod.POST, value="' + fnGetScrPath("/") + 'get' + fnGetTableEngName(1) + 'List.do")';
    arrOutpt[++numIndex] = '	@ResponseStatus(HttpStatus.OK)';
    arrOutpt[++numIndex] = '	public @ResponseBody Channel getList(HttpServletRequest req, ';
    arrOutpt[++numIndex] = '			@ModelAttribute ComParamVO voComParam, @ModelAttribute ' + fnGetTableEngName(1) + 'VO vo)';
    arrOutpt[++numIndex] = '	{';
    arrOutpt[++numIndex] = '		return svc.getList(vo);';
    arrOutpt[++numIndex] = '	}';
    arrOutpt[++numIndex] = Base.EMPTYSTR;
    arrOutpt[++numIndex] = '	// 목록 저장 // ' + fnGetText(txtTableKrnName.value) + ' 그리드 화면 저장 클릭시 사용한다.';
    arrOutpt[++numIndex] = '	@RequestMapping(method=RequestMethod.POST, value="' + fnGetScrPath("/") + 'save' + fnGetTableEngName(1) + 'List.do")';
    arrOutpt[++numIndex] = '	@ResponseStatus(HttpStatus.OK)';
    arrOutpt[++numIndex] = '	public @ResponseBody Channel saveList(HttpServletRequest req, ';
    arrOutpt[++numIndex] = '			@ModelAttribute ComParamVO voComParam, @ModelAttribute ' + fnGetTableEngName(1) + 'VO vo)';
    arrOutpt[++numIndex] = '	{';
    for ( var num = 0 ; num < LNGTH10 ; num++ )
    {
        if ( "rgstDtm" == arrQuery10[num] )
    arrOutpt[++numIndex] = '		vo.setRgstUserId(voComParam.getComParamLoginUserId());';
        else
        if ( "updtDtm" == arrQuery10[num] )
    arrOutpt[++numIndex] = '		vo.setUpdtUserId(voComParam.getComParamLoginUserId());';
    }
    arrOutpt[++numIndex] = '		return svc.saveList(vo);';
    arrOutpt[++numIndex] = '	}';
    arrOutpt[++numIndex] = Base.EMPTYSTR;
    arrOutpt[++numIndex] = '	// 목록 삭제 // ' + fnGetText(txtTableKrnName.value) + ' 그리드 화면 삭제 클릭시 사용한다.';
    arrOutpt[++numIndex] = '	@RequestMapping(method=RequestMethod.POST, value="' + fnGetScrPath("/") + 'delt' + fnGetTableEngName(1) + 'List.do")';
    arrOutpt[++numIndex] = '	@ResponseStatus(HttpStatus.OK)';
    arrOutpt[++numIndex] = '	public @ResponseBody Channel deltList(HttpServletRequest req, ';
    arrOutpt[++numIndex] = '			@ModelAttribute ComParamVO voComParam, @ModelAttribute ' + fnGetTableEngName(1) + 'VO vo)';
    arrOutpt[++numIndex] = '	{';
    arrOutpt[++numIndex] = '		return svc.deltList(vo);';
    arrOutpt[++numIndex] = '	}';
    arrOutpt[++numIndex] = '}';

    arrQuery10 = null;

    return arrOutpt.join("\r\n");
}