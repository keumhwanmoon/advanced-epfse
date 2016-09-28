/*
--------------------------------------------------------------------------------
    PROJECT NAME : ES-MRV3
--------------------------------------------------------------------------------
    - 단위업무명 : FAQ DAO Interface
    - 최초작성일 : 2014-09-18
    - 작  성  자 : 이승윤
    - 비      고 :
--------------------------------------------------------------------------------
*/
package com.ecosian.epfse.system.faq.dao;

import java.util.List;

import com.ecosian.epfse.system.faq.dao.vo.FaqVO;

public interface FaqDAO
{
    public List<FaqVO> getList(FaqVO vo);
    public List<FaqVO> getBestList(FaqVO vo);
    public String getEditPsbleYn(FaqVO vo);
    public String getDupYn(FaqVO vo);
    public int rgstInfo(FaqVO vo);
    public int updtInfo(FaqVO vo);
    public int updtInqrCountInfo(FaqVO vo);
    public int deltInfo(FaqVO vo);
}