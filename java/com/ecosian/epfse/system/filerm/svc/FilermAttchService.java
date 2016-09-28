/*
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 게시물첨부 Service Interface
    - 최초작성일 : 2014-05-21
    - 작  성  자 : 문금환
    - 비      고 :
--------------------------------------------------------------------------------
*/
package com.ecosian.epfse.system.filerm.svc;

import com.ecosian.epfse.system.common.Channel;
import com.ecosian.epfse.system.filerm.dao.vo.FilermAttchVO;

public interface FilermAttchService
{
    public Channel getList(FilermAttchVO vo);
}