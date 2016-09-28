/*
--------------------------------------------------------------------------------
	PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
	- 단위업무명 : 기준
	- 최초작성일 : 2014-07-23
	- 작  성  자 : 문금환
	- 비      고 : 
--------------------------------------------------------------------------------
*/
package com.ecosian.epfse.system.common;

import java.util.List;

import com.ecosian.epfse.system.common.dao.vo.TreeVO;

public class Tree
{
	// JSTREE 데이터 가져오기
	public String getJstreeData(List lst)
	{
		final int SIZE = ( null != lst && !lst.isEmpty() ? lst.size() : 0 );
		final String COMMA = ", ";

		StringBuffer sbf = new StringBuffer();

		if ( 0 < SIZE )
		{
			sbf.append("[ ");
			for ( int intIndex = 0 ; intIndex < SIZE ; intIndex++ )
			{
				if ( 0 < intIndex ) sbf.append(COMMA);
				sbf.append(((TreeVO) (lst.get(intIndex))).toJstreeJsonStr());
			}
			sbf.append(" ]");
		}
		final String OUTPT = sbf.toString();

		sbf = null;

		return OUTPT.replace("&", "&amp;");
	}
}