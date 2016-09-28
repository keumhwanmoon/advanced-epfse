/*
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 사용자권한 DAO Interface
    - 최초작성일 : 2014-06-26
    - 작  성  자 : 문금환
    - 비      고 :
--------------------------------------------------------------------------------
*/
package com.ecosian.epfse.member.auth.dao;

import java.util.List;

import com.ecosian.epfse.member.auth.dao.vo.UserAuthVO;

public interface UserAuthDAO
{
    public List<UserAuthVO> getList(UserAuthVO vo);
    public int rgstList(UserAuthVO vo);
    public int updtAuthInfo(UserAuthVO vo);
    public int updtUserInfo(UserAuthVO vo);
    public int deltList(UserAuthVO vo);
    public int deltAuthList(UserAuthVO vo);
    public int deltUserList(UserAuthVO vo);
}