/*
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 권한 DAO Interface
    - 최초작성일 : 2014-06-26
    - 작  성  자 : 문금환
    - 비      고 :
--------------------------------------------------------------------------------
*/
package com.ecosian.epfse.menuauth.auth.dao;

import java.util.List;

import com.ecosian.epfse.menuauth.auth.dao.vo.AuthVO;

public interface AuthDAO
{
    public List<AuthVO> getList(AuthVO vo);
    public List<AuthVO> getComboList(AuthVO vo);
    public String getDupYn(AuthVO vo);
    public int rgstInfo(AuthVO vo);
    public int updtInfo(AuthVO vo);
    public int deltList(AuthVO vo);
}