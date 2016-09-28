//==============================================================================
// 용도     : 테이블 SVC Impl 가져오기
// 파라미터 : strDate - 일자
// 리턴값   : String
// 참고사항 :
// 기타     : 내부 호출용
// 작성일자 : 2014-06-23
//------------------------------------------------------------------------------
function gfnGetTableSvc2(strDate)
{
    var arrOutpt = new Array(), numIndex = -1;

    var arrQuery18 = txaQuery18.value.split("\r\n"); arrQuery18 = arrQuery18.slice(0, arrQuery18.length - 1);
    var arrQuery19 = txaQuery19.value.split("\r\n"); arrQuery19 = arrQuery19.slice(0, arrQuery19.length - 1);
    var arrQuery20 = txaQuery20.value.split("\r\n"); arrQuery20 = arrQuery20.slice(0, arrQuery20.length - 1);

    arrOutpt[++numIndex] = '/*';
    arrOutpt[++numIndex] = '--------------------------------------------------------------------------------';
    arrOutpt[++numIndex] = '	PROJECT NAME : ' + $("#sltPrjctName>option:selected").text();
    arrOutpt[++numIndex] = '--------------------------------------------------------------------------------';
    arrOutpt[++numIndex] = '	- 단위업무명 : ' + fnGetText(txtTableKrnName.value) + ' Service Implements';
    arrOutpt[++numIndex] = '	- 최초작성일 : ' + gfnFormt(strDate, "DATE");
    arrOutpt[++numIndex] = '	- 작  성  자 : ' + txtUserName.value;
    arrOutpt[++numIndex] = '	- 비      고 : ';
    arrOutpt[++numIndex] = '--------------------------------------------------------------------------------';
    arrOutpt[++numIndex] = '*/';
    arrOutpt[++numIndex] = 'package ' + txtPackgName.value + txtPackgName2.value + '.svc.impl;';
    arrOutpt[++numIndex] = Base.EMPTYSTR;
    arrOutpt[++numIndex] = 'import javax.annotation.Resource;';
    arrOutpt[++numIndex] = Base.EMPTYSTR;
    arrOutpt[++numIndex] = 'import org.springframework.stereotype.Service;';
    arrOutpt[++numIndex] = 'import org.springframework.transaction.annotation.Transactional;';
    arrOutpt[++numIndex] = 'import org.springframework.transaction.interceptor.TransactionAspectSupport;';
    arrOutpt[++numIndex] = Base.EMPTYSTR;
    arrOutpt[++numIndex] = 'import ' + txtPackgName.value + txtPackgName2.value + '.dao.' + fnGetTableEngName(1) + 'DAO;';
    arrOutpt[++numIndex] = 'import ' + txtPackgName.value + txtPackgName2.value + '.dao.vo.' + fnGetTableEngName(1) + 'VO;';
    arrOutpt[++numIndex] = 'import ' + txtPackgName.value + txtPackgName2.value + '.svc.' + fnGetTableEngName(1) + 'Service;';
    arrOutpt[++numIndex] = 'import com.ecosian.epfse.system.common.Base;';
    arrOutpt[++numIndex] = 'import com.ecosian.epfse.system.common.Channel;';
    arrOutpt[++numIndex] = Base.EMPTYSTR;
    arrOutpt[++numIndex] = '@Service("' + fnGetTableEngName(2) + 'Service")';
    arrOutpt[++numIndex] = 'public class ' + fnGetTableEngName(1) + 'ServiceImpl implements ' + fnGetTableEngName(1) + 'Service';
    arrOutpt[++numIndex] = '{';
    arrOutpt[++numIndex] = '	@Resource(name = "' + fnGetTableEngName(2) + 'DAO") // 해당 beanName 과 일치하는 bean 을 가져온다.';
    arrOutpt[++numIndex] = '	private ' + fnGetTableEngName(1) + 'DAO dao;';
    arrOutpt[++numIndex] = Base.EMPTYSTR;
    arrOutpt[++numIndex] = '	public Channel getList(' + fnGetTableEngName(1) + 'VO vo)';
    arrOutpt[++numIndex] = '	{';
    arrOutpt[++numIndex] = '		Channel chn = new Channel(); chn.setRsltList(dao.getList(vo));';
    arrOutpt[++numIndex] = '		return chn;';
    arrOutpt[++numIndex] = '	}';
    arrOutpt[++numIndex] = Base.EMPTYSTR;
    arrOutpt[++numIndex] = '	@Transactional // cf.) Exception 이 throw 면 Rollback 된다.';
    arrOutpt[++numIndex] = '	public Channel saveList(' + fnGetTableEngName(1) + 'VO vo)';
    arrOutpt[++numIndex] = '	{';
    arrOutpt[++numIndex] = '		Channel chn = new Channel();';
    arrOutpt[++numIndex] = Base.EMPTYSTR;
    if ( "1" != hidPkCount.value || Base.YES != hidSeqYn.value )
    arrOutpt[++numIndex] = '		' + arrQuery18.join("\r\n		");
    else
    arrOutpt[++numIndex] = '		' + arrQuery18.slice(1).join("\r\n		");
    arrOutpt[++numIndex] = '		String[] arrRowIdList     =     vo.getRowId().split(Base.DELI12, -1);';
    arrOutpt[++numIndex] = '		String[] arrGridRowIdList = vo.getGridRowId().split(Base.DELI12, -1);';
    arrOutpt[++numIndex] = Base.EMPTYSTR;
    arrOutpt[++numIndex] = '		final int LNGTH = arrRowIdList.length;';
    arrOutpt[++numIndex] = Base.EMPTYSTR;
    arrOutpt[++numIndex] = '		for ( int intIndex = 0 ; intIndex < LNGTH ; intIndex++ )';
    arrOutpt[++numIndex] = '		{';
    if ( "1" != hidPkCount.value || Base.YES != hidSeqYn.value )
    arrOutpt[++numIndex] = '			' + arrQuery19.join("\r\n			");
    else
    arrOutpt[++numIndex] = '			' + arrQuery19.slice(1).join("\r\n			");
    arrOutpt[++numIndex] = '			vo.setRowId(arrRowIdList[intIndex]);';
    arrOutpt[++numIndex] = Base.EMPTYSTR;
    if ( "1" != hidPkCount.value || Base.YES != hidSeqYn.value )
    {
    arrOutpt[++numIndex] = '			if ( Base.YES.equals(dao.getDupYn(vo)) ) // 중복여부 검증';
    arrOutpt[++numIndex] = '			{';
    arrOutpt[++numIndex] = '				chn.setRsltNo(Base.DATA_DUP); // 데이터 중복';
    arrOutpt[++numIndex] = '			} else';
    }
    arrOutpt[++numIndex] = '			{';
    arrOutpt[++numIndex] = '				int intRow = 0;';
    arrOutpt[++numIndex] = Base.EMPTYSTR;
    arrOutpt[++numIndex] = '				if ( Base.isEmpty(vo.getRowId()) )';
    arrOutpt[++numIndex] = '					intRow = dao.rgstInfo(vo);';
    arrOutpt[++numIndex] = '				else';
    arrOutpt[++numIndex] = '					intRow = dao.updtInfo(vo);';
    arrOutpt[++numIndex] = Base.EMPTYSTR;
    arrOutpt[++numIndex] = '				chn.setRsltNo( 0 >= intRow ? Base.NO_DATA : Base.OK ); // 데이터없음 // OK';
    arrOutpt[++numIndex] = '			}';
    arrOutpt[++numIndex] = Base.EMPTYSTR;
    arrOutpt[++numIndex] = '			// OK 가 아닌 경우 Transaction 이 COMMIT 되지 않도록 설정한다.';
    arrOutpt[++numIndex] = '			if ( Base.OK != chn.getRsltNo() )';
    arrOutpt[++numIndex] = '			{';
    arrOutpt[++numIndex] = '				TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();';
    arrOutpt[++numIndex] = '				vo.setGridRowId(arrGridRowIdList[intIndex]); chn.setRsltInfo(vo); break;';
    arrOutpt[++numIndex] = '			}';
    arrOutpt[++numIndex] = '		}';
    arrOutpt[++numIndex] = Base.EMPTYSTR;
    if ( "1" != hidPkCount.value || Base.YES != hidSeqYn.value )
    arrOutpt[++numIndex] = '		arrGridRowIdList = arrRowIdList = ' + arrQuery20.join(Base.EMPTYSTR) + 'null;';
    else
    arrOutpt[++numIndex] = '		arrGridRowIdList = arrRowIdList = ' + arrQuery20.slice(0, arrQuery20.length - 1).join(Base.EMPTYSTR) + 'null;';
    arrOutpt[++numIndex] = Base.EMPTYSTR;
    arrOutpt[++numIndex] = '		return chn;';
    arrOutpt[++numIndex] = '	}';
    arrOutpt[++numIndex] = Base.EMPTYSTR;
    arrOutpt[++numIndex] = '	public Channel deltList(' + fnGetTableEngName(1) + 'VO vo)';
    arrOutpt[++numIndex] = '	{';
    arrOutpt[++numIndex] = '		Channel chn = new Channel();';
    arrOutpt[++numIndex] = '		if ( !Base.isEmpty(vo.getRowId()) ) dao.deltList(vo); chn.setRsltNo(Base.OK); // OK';
    arrOutpt[++numIndex] = '		return chn;';
    arrOutpt[++numIndex] = '	}';
    arrOutpt[++numIndex] = '}';

    arrQuery19 = null, arrQuery18 = null;

    return arrOutpt.join("\r\n");
}