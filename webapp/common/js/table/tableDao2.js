/*
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 테이블 DAO Impl
    - 최초작성일 : 2014-06-23
    - 작  성  자 : 유광식
    - 비      고 : tableDtl.jsp 에서 사용한다.
--------------------------------------------------------------------------------
*/
//==============================================================================
// 용도     : 테이블 DAO Impl 가져오기
// 파라미터 : strDate - 일자
// 리턴값   : String
// 참고사항 :
// 기타     : 내부 호출용
// 작성일자 : 2014-06-23
//------------------------------------------------------------------------------
function gfnGetTableDao2(strDate)
{
    var arrOutpt = new Array(), numIndex = -1;

    arrOutpt[++numIndex] = '/*';
    arrOutpt[++numIndex] = '--------------------------------------------------------------------------------';
    arrOutpt[++numIndex] = '	PROJECT NAME : ' + $("#sltPrjctName>option:selected").text();
    arrOutpt[++numIndex] = '--------------------------------------------------------------------------------';
    arrOutpt[++numIndex] = '	- 단위업무명 : ' + fnGetText(txtTableKrnName.value) + ' DAO Implements';
    arrOutpt[++numIndex] = '	- 최초작성일 : ' + gfnFormt(strDate, "DATE");
    arrOutpt[++numIndex] = '	- 작  성  자 : ' + txtUserName.value;
    arrOutpt[++numIndex] = '	- 비      고 : ';
    arrOutpt[++numIndex] = '--------------------------------------------------------------------------------';
    arrOutpt[++numIndex] = '*/';
    arrOutpt[++numIndex] = 'package ' + txtPackgName.value + txtPackgName2.value + '.dao.impl;';
    arrOutpt[++numIndex] = Base.EMPTYSTR;
    arrOutpt[++numIndex] = 'import java.util.List;';
    arrOutpt[++numIndex] = Base.EMPTYSTR;
    arrOutpt[++numIndex] = 'import org.apache.ibatis.session.SqlSession;';
    arrOutpt[++numIndex] = 'import org.springframework.beans.factory.annotation.Autowired;';
    arrOutpt[++numIndex] = 'import org.springframework.stereotype.Repository;';
    arrOutpt[++numIndex] = Base.EMPTYSTR;
    arrOutpt[++numIndex] = 'import ' + txtPackgName.value + txtPackgName2.value + '.dao.' + fnGetTableEngName(1) + 'DAO;';
    arrOutpt[++numIndex] = 'import ' + txtPackgName.value + txtPackgName2.value + '.dao.vo.' + fnGetTableEngName(1) + 'VO;';
    arrOutpt[++numIndex] = Base.EMPTYSTR;
    arrOutpt[++numIndex] = '@Repository("' + fnGetTableEngName(2) + 'DAO")';
    arrOutpt[++numIndex] = 'public class ' + fnGetTableEngName(1) + 'DAOImpl implements ' + fnGetTableEngName(1) + 'DAO';
    arrOutpt[++numIndex] = '{';
    arrOutpt[++numIndex] = '	@Autowired // 해당 변수 type 과 일치하는 bean 을 가져온다.';
    arrOutpt[++numIndex] = '	private SqlSession sql;';
    arrOutpt[++numIndex] = Base.EMPTYSTR;
    arrOutpt[++numIndex] = '	public List<' + fnGetTableEngName(1) + 'VO> getList(' + fnGetTableEngName(1) + 'VO vo)';
    arrOutpt[++numIndex] = '	{';
    arrOutpt[++numIndex] = '		return sql.selectList("' + fnGetTableEngName(2) + 'Ora.selectList", vo);';
    arrOutpt[++numIndex] = '	}';
    arrOutpt[++numIndex] = Base.EMPTYSTR;
    arrOutpt[++numIndex] = '	public ' + fnGetTableEngName(1) + 'VO getInfo(' + fnGetTableEngName(1) + 'VO vo)';
    arrOutpt[++numIndex] = '	{';
    arrOutpt[++numIndex] = '		return sql.selectOne("' + fnGetTableEngName(2) + 'Ora.selectInfo", vo);';
    arrOutpt[++numIndex] = '	}';
    if ( "1" != hidPkCount.value || Base.YES != hidSeqYn.value )
    {
    arrOutpt[++numIndex] = Base.EMPTYSTR;
    arrOutpt[++numIndex] = '	public String getDupYn(' + fnGetTableEngName(1) + 'VO vo)';
    arrOutpt[++numIndex] = '	{';
    arrOutpt[++numIndex] = '		return sql.selectOne("' + fnGetTableEngName(2) + 'Ora.selectDupYn", vo);';
    arrOutpt[++numIndex] = '	}';
    }
    arrOutpt[++numIndex] = Base.EMPTYSTR;
    arrOutpt[++numIndex] = '	public int rgstInfo(' + fnGetTableEngName(1) + 'VO vo)';
    arrOutpt[++numIndex] = '	{';
    arrOutpt[++numIndex] = '		return sql.update("' + fnGetTableEngName(2) + 'Ora.insertInfo", vo);';
    arrOutpt[++numIndex] = '	}';
    arrOutpt[++numIndex] = Base.EMPTYSTR;
    arrOutpt[++numIndex] = '	public int updtInfo(' + fnGetTableEngName(1) + 'VO vo)';
    arrOutpt[++numIndex] = '	{';
    arrOutpt[++numIndex] = '		return sql.update("' + fnGetTableEngName(2) + 'Ora.updateInfo", vo);';
    arrOutpt[++numIndex] = '	}';
    arrOutpt[++numIndex] = Base.EMPTYSTR;
    arrOutpt[++numIndex] = '	public int deltList(' + fnGetTableEngName(1) + 'VO vo)';
    arrOutpt[++numIndex] = '	{';
    arrOutpt[++numIndex] = '		return sql.delete("' + fnGetTableEngName(2) + 'Ora.deleteList", vo);';
    arrOutpt[++numIndex] = '	}';
    arrOutpt[++numIndex] = Base.EMPTYSTR;
    arrOutpt[++numIndex] = '	public int deltInfo(' + fnGetTableEngName(1) + 'VO vo)';
    arrOutpt[++numIndex] = '	{';
    arrOutpt[++numIndex] = '		return sql.delete("' + fnGetTableEngName(2) + 'Ora.deleteInfo", vo);';
    arrOutpt[++numIndex] = '	}';
    arrOutpt[++numIndex] = '}';

    return arrOutpt.join("\r\n");
}