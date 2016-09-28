//==============================================================================
// 용도     : 테이블 Service 가져오기
// 파라미터 : strDate - 일자
// 리턴값   : String
// 참고사항 :
// 기타     : 내부 호출용
// 작성일자 : 2014-04-30
//------------------------------------------------------------------------------
function gfnGetTableSvc(strDate)
{
    var arrOutpt = new Array(), numIndex = -1;

    arrOutpt[++numIndex] = '/*';
    arrOutpt[++numIndex] = '--------------------------------------------------------------------------------';
    arrOutpt[++numIndex] = '	PROJECT NAME : ' + $("#sltPrjctName>option:selected").text();
    arrOutpt[++numIndex] = '--------------------------------------------------------------------------------';
    arrOutpt[++numIndex] = '	- 단위업무명 : ' + fnGetText(txtTableKrnName.value) + ' Service Interface';
    arrOutpt[++numIndex] = '	- 최초작성일 : ' + gfnFormt(strDate, "DATE");
    arrOutpt[++numIndex] = '	- 작  성  자 : ' + txtUserName.value;
    arrOutpt[++numIndex] = '	- 비      고 : ';
    arrOutpt[++numIndex] = '--------------------------------------------------------------------------------';
    arrOutpt[++numIndex] = '*/';
    arrOutpt[++numIndex] = 'package ' + txtPackgName.value + txtPackgName2.value + '.svc;';
    arrOutpt[++numIndex] = Base.EMPTYSTR;
    arrOutpt[++numIndex] = 'import ' + txtPackgName.value + txtPackgName2.value + '.dao.vo.' + fnGetTableEngName(1) + 'VO;';
    arrOutpt[++numIndex] = 'import com.ecosian.epfse.system.common.Channel;';
    arrOutpt[++numIndex] = Base.EMPTYSTR;
    arrOutpt[++numIndex] = 'public interface ' + fnGetTableEngName(1) + 'Service';
    arrOutpt[++numIndex] = '{';
    arrOutpt[++numIndex] = '	public Channel getList(' + fnGetTableEngName(1) + 'VO vo);';
    arrOutpt[++numIndex] = '	public Channel saveList(' + fnGetTableEngName(1) + 'VO vo);';
    arrOutpt[++numIndex] = '	public Channel deltList(' + fnGetTableEngName(1) + 'VO vo);';
    arrOutpt[++numIndex] = '}';

    return arrOutpt.join("\r\n");
}