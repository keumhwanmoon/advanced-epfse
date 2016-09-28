//==============================================================================
// 용도     : 테이블 DAO 가져오기
// 파라미터 : strDate - 일자
// 리턴값   : String
// 참고사항 :
// 기타     : 내부 호출용
// 작성일자 : 2014-06-23
//------------------------------------------------------------------------------
function gfnGetTableDao(strDate)
{
    var arrOutpt = new Array(), numIndex = -1;

    arrOutpt[++numIndex] = '/*';
    arrOutpt[++numIndex] = '--------------------------------------------------------------------------------';
    arrOutpt[++numIndex] = '	PROJECT NAME : ' + $("#sltPrjctName>option:selected").text();
    arrOutpt[++numIndex] = '--------------------------------------------------------------------------------';
    arrOutpt[++numIndex] = '	- 단위업무명 : ' + fnGetText(txtTableKrnName.value) + ' DAO Interface';
    arrOutpt[++numIndex] = '	- 최초작성일 : ' + gfnFormt(strDate, "DATE");
    arrOutpt[++numIndex] = '	- 작  성  자 : ' + txtUserName.value;
    arrOutpt[++numIndex] = '	- 비      고 : ';
    arrOutpt[++numIndex] = '--------------------------------------------------------------------------------';
    arrOutpt[++numIndex] = '*/';
    arrOutpt[++numIndex] = 'package ' + txtPackgName.value + txtPackgName2.value + '.dao;';
    arrOutpt[++numIndex] = Base.EMPTYSTR;
    arrOutpt[++numIndex] = 'import java.util.List;';
    arrOutpt[++numIndex] = Base.EMPTYSTR;
    arrOutpt[++numIndex] = 'import ' + txtPackgName.value + txtPackgName2.value + '.dao.vo.' + fnGetTableEngName(1) + 'VO;';
    arrOutpt[++numIndex] = Base.EMPTYSTR;
    arrOutpt[++numIndex] = 'public interface ' + fnGetTableEngName(1) + 'DAO';
    arrOutpt[++numIndex] = '{';
    arrOutpt[++numIndex] = '	public List<' + fnGetTableEngName(1) + 'VO> getList(' + fnGetTableEngName(1) + 'VO vo);';
    arrOutpt[++numIndex] = '	public ' + fnGetTableEngName(1) + 'VO getInfo(' + fnGetTableEngName(1) + 'VO vo);';
    if ( "1" != hidPkCount.value || Base.YES != hidSeqYn.value )
    arrOutpt[++numIndex] = '	public String getDupYn(' + fnGetTableEngName(1) + 'VO vo);';
    arrOutpt[++numIndex] = '	public int rgstInfo(' + fnGetTableEngName(1) + 'VO vo);';
    arrOutpt[++numIndex] = '	public int updtInfo(' + fnGetTableEngName(1) + 'VO vo);';
    arrOutpt[++numIndex] = '	public int deltList(' + fnGetTableEngName(1) + 'VO vo);';
    arrOutpt[++numIndex] = '	public int deltInfo(' + fnGetTableEngName(1) + 'VO vo);';
    arrOutpt[++numIndex] = '}';

    return arrOutpt.join("\r\n");
}