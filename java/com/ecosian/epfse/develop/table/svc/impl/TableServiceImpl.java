/*
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 테이블 Service Implements
    - 최초작성일 : 2014-04-22
    - 작  성  자 : 문금환
    - 비      고 :
--------------------------------------------------------------------------------
*/
package com.ecosian.epfse.develop.table.svc.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ecosian.epfse.develop.table.dao.TableDAO;
import com.ecosian.epfse.develop.table.dao.vo.TableVO;
import com.ecosian.epfse.develop.table.svc.TableService;
import com.ecosian.epfse.system.common.Base;
import com.ecosian.epfse.system.common.Channel;

@Service("tableService")
public class TableServiceImpl implements TableService
{
    @Resource(name = "tableOra") // 해당 beanName 과 일치하는 bean 을 가져온다.
    private TableDAO dao;

    public Channel getList(TableVO vo)
    {
        Channel chn = new Channel(); chn.setRsltList(dao.getList(vo));
        return chn;
    }

    public Channel getOwnerList(TableVO vo)
    {
        Channel chn = new Channel(); chn.setRsltList(dao.getOwnerList(vo));
        return chn;
    }

    public Channel getColList(TableVO vo)
    {
        Channel chn = new Channel(); chn.setRsltList(dao.getColList(vo));
        return chn;
    }

    public Channel getQueryList(TableVO vo)
    {
        Channel chn = new Channel(); chn.setRsltList(dao.getQueryList(vo));
        return chn;
    }

    public Channel rgstItemList(TableVO vo)
    {
        Channel chn = new Channel();

        dao.rgstItemList(vo);

        chn.setRsltNo(Base.OK); // OK
        return chn;
    }

    @Transactional // cf.) Exception 이 throw 면 Rollback 된다.
    public Channel rgstMenuList(TableVO vo)
    {
        Channel chn = new Channel();

        dao.rgstMenuList(vo);
        dao.rgstMenuNameList(vo);

        chn.setRsltNo(Base.OK); // OK

        return chn;
    }
}