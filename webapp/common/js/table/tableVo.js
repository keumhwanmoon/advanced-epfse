//==============================================================================
// 용도     : 테이블 VO 가져오기
// 파라미터 : strDate - 일자
// 리턴값   : String
// 참고사항 :
// 기타     : 내부 호출용
// 작성일자 : 2014-06-23
//------------------------------------------------------------------------------
function gfnGetTableValueObj(strDate)
{
    var arrOutpt = new Array(), numIndex = -1;

    var arrQuery6 = txaQuery6.value.split("\r\n"); arrQuery6 = arrQuery6.slice(0, arrQuery6.length - 1);
    var arrQuery7 = txaQuery7.value.split("\r\n"); arrQuery7 = arrQuery7.slice(0, arrQuery7.length - 1);
    var arrQuery8 = txaQuery8.value.split("\r\n"); arrQuery8 = arrQuery8.slice(0, arrQuery8.length - 1);
    var arrQuery9 = txaQuery9.value.split("\r\n"); arrQuery9 = arrQuery9.slice(0, arrQuery9.length - 1);

    arrQuery9[0] = arrQuery9[0].replace(/\", /, '  "');

    arrOutpt[++numIndex] = '/*';
    arrOutpt[++numIndex] = '--------------------------------------------------------------------------------';
    arrOutpt[++numIndex] = '	PROJECT NAME : ' + $("#sltPrjctName>option:selected").text();
    arrOutpt[++numIndex] = '--------------------------------------------------------------------------------';
    arrOutpt[++numIndex] = '	- 단위업무명 : ' + fnGetText(txtTableKrnName.value) + ' VO';
    arrOutpt[++numIndex] = '	- 최초작성일 : ' + gfnFormt(strDate, "DATE");
    arrOutpt[++numIndex] = '	- 작  성  자 : ' + txtUserName.value;
    arrOutpt[++numIndex] = '	- 비      고 : ';
    arrOutpt[++numIndex] = '--------------------------------------------------------------------------------';
    arrOutpt[++numIndex] = '*/';
    arrOutpt[++numIndex] = 'package ' + txtPackgName.value + txtPackgName2.value + '.dao.vo;';
    arrOutpt[++numIndex] = Base.EMPTYSTR;
    arrOutpt[++numIndex] = 'import com.ecosian.epfse.system.common.dao.vo.ComParamVO;';
    arrOutpt[++numIndex] = Base.EMPTYSTR;
    arrOutpt[++numIndex] = 'public class ' + fnGetTableEngName(1) + 'VO extends ComParamVO';
    arrOutpt[++numIndex] = '{';
    arrOutpt[++numIndex] = '	' + arrQuery6.join("\r\n	");
    arrOutpt[++numIndex] = Base.EMPTYSTR;
    arrOutpt[++numIndex] = '	// getter';
    arrOutpt[++numIndex] = '	' + arrQuery7.join("\r\n	");
    arrOutpt[++numIndex] = Base.EMPTYSTR;
    arrOutpt[++numIndex] = '	// setter';
    arrOutpt[++numIndex] = '	' + arrQuery8.join("\r\n	");
    arrOutpt[++numIndex] = Base.EMPTYSTR;
    arrOutpt[++numIndex] = '	@Override';
    arrOutpt[++numIndex] = '	public String toString() {';
    arrOutpt[++numIndex] = '		return';
    arrOutpt[++numIndex] = '			"' + fnGetTableEngName(1) + 'VO ["';
    arrOutpt[++numIndex] = '		' + arrQuery9.join("\r\n		");
    arrOutpt[++numIndex] = '		  + "]";';
    arrOutpt[++numIndex] = '	}';
    arrOutpt[++numIndex] = '}';

    arrQuery6 = null; arrQuery7 = null; arrQuery8 = null; arrQuery9 = null;

    return arrOutpt.join("\r\n");
}