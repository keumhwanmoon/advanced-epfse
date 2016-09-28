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
package com.ecosian.epfse.system.filerm.dao;

import java.util.List;

import com.ecosian.epfse.system.filerm.dao.vo.FilermVO;

public interface FilermDAO
{
    public List<FilermVO> getList(FilermVO vo);
    public FilermVO getInfo(FilermVO vo);
    public String getRowId(FilermVO vo);
    public String getEditPsbleYn(FilermVO vo);
    public String getDupYn(FilermVO vo);
    public int rgstInfo(FilermVO vo);
    public int updtInfo(FilermVO vo);
    public int updtInqrCountInfo(FilermVO vo);
    public int deltInfo(FilermVO vo);
}