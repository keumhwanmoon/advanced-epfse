/*
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 사용자 DAO Interface
    - 최초작성일 : 2014-06-25
    - 작  성  자 : 문금환
    - 비      고 :
--------------------------------------------------------------------------------
*/
package com.ecosian.epfse.member.user.dao;

import java.util.List;

import com.ecosian.epfse.member.user.dao.vo.UserVO;

public interface UserDAO
{
    public List<UserVO> getList(UserVO vo);
    public List<UserVO> getAuthRgstTargList(UserVO vo);
    public String getDupYn(UserVO vo);
    public String getAdminExistYn(UserVO vo);
    public int rgstInfo(UserVO vo);
    public int updtInfo(UserVO vo);
    public int deltList(UserVO vo);
}