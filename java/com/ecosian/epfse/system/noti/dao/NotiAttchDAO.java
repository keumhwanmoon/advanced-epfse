/*
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 게시물첨부 DAO Interface
    - 최초작성일 : 2014-05-21
    - 작  성  자 : 문금환
    - 비      고 :
--------------------------------------------------------------------------------
*/
package com.ecosian.epfse.system.noti.dao;

import java.util.List;

import com.ecosian.epfse.system.noti.dao.vo.NotiAttchVO;

public interface NotiAttchDAO
{
    public List<NotiAttchVO> getList(NotiAttchVO vo);
    public int rgstList(NotiAttchVO vo);
    public int deltList(NotiAttchVO vo);
}