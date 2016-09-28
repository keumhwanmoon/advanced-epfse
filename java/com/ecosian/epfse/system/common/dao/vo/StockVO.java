/*
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : HIGHSTOCK VO
    - 최초작성일 : 2014-11-11
    - 작  성  자 : 장경국
    - 비      고 :
--------------------------------------------------------------------------------
*/
package com.ecosian.epfse.system.common.dao.vo;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StockVO
{
    private String inqrStyear;
    private String inqrEdyear;
    private String x         ;
    private double y         ;

    @Override
    public String toString() {
        return
            "StockVO ["
          + 	  "inqrStyear=" + inqrStyear
          + 	", inqrEdyear=" + inqrEdyear
          + 	", x=" + x
          + 	", y=" + y
          + "]";
    }
}