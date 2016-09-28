/*
--------------------------------------------------------------------------------
    PROJECT NAME : ES-MRV3
--------------------------------------------------------------------------------
    - 단위업무명 : 공지사항 DAO Interface
    - 최초작성일 : 2014-09-18
    - 작  성  자 : 이승윤
    - 비      고 :
--------------------------------------------------------------------------------
*/
package com.ecosian.epfse.system.noti.dao;

import java.util.List;

import com.ecosian.epfse.system.noti.dao.vo.NotiVO;

public interface NotiDAO
{
    public List<NotiVO> getList(NotiVO vo);
    public NotiVO getInfo(NotiVO vo);
    public String getRowId(NotiVO vo);
    public String getEditPsbleYn(NotiVO vo);
    public String getDupYn(NotiVO vo);
    public int rgstInfo(NotiVO vo);
    public int updtInfo(NotiVO vo);
    public int updtInqrCount(NotiVO vo);
    public int deltInfo(NotiVO vo);
}