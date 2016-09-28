/*
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 첨부 DAO Interface
    - 최초작성일 : 2014-05-15
    - 작  성  자 : 문금환
    - 비      고 :
--------------------------------------------------------------------------------
*/
package com.ecosian.epfse.system.common.dao;

import com.ecosian.epfse.system.common.dao.vo.AttchVO;

public interface AttchDAO
{
    public AttchVO getInfo(AttchVO vo);
    public String getDupYn(AttchVO vo);
    public int rgstInfo(AttchVO vo);
}