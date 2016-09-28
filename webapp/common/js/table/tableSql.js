//==============================================================================
// 용도     : 테이블 SQL 가져오기
// 파라미터 :
// 리턴값   : String
// 참고사항 :
// 기타     : 내부 호출용
// 작성일자 : 2014-06-23
//------------------------------------------------------------------------------
function gfnGetTableSql()
{
    var VO = txtPackgName.value + txtPackgName2.value + '.dao.vo.' + fnGetTableEngName(1) + 'VO';

    var arrOutpt = new Array(), numIndex = -1;

    var arrQuery5 = txaQuery5.value.split("\r\n"); arrQuery5 = arrQuery5.slice(0, arrQuery5.length - 1);
    var arrQuery1 = txaQuery1.value.split("\r\n"); arrQuery1 = arrQuery1.slice(0, arrQuery1.length - 1);
    var arrQuery2 = txaQuery2.value.split("\r\n"); arrQuery2 = arrQuery2.slice(0, arrQuery2.length - 1);
    var arrQuery3 = txaQuery3.value.split("\r\n"); arrQuery3 = arrQuery3.slice(0, arrQuery3.length - 1);
    var arrQuery4 = txaQuery4.value.split("\r\n"); arrQuery4 = arrQuery4.slice(0, arrQuery4.length - 1);
    var arrQuery4A = txaQuery4.value.split("\r\n"); arrQuery4A = arrQuery4A.slice(0, arrQuery4A.length - 1);
    var arrQuery12 = txaQuery12.value.split("\r\n"); arrQuery12 = arrQuery12.slice(0, arrQuery12.length - 1);

    var PK_COUNT = gfnGetInt(hidPkCount.value);

    arrQuery1[0] = '        ' + arrQuery1[0].substr(8);
    arrQuery2[1] += '       /* sqlMapId(' + fnGetTableEngName(2) +'Ora.insertInfo) */';
    arrQuery3[1] = 'SET     /* sqlMapId(' + fnGetTableEngName(2) +'Ora.updateInfo) */\r\n        ' + arrQuery3[1].substr(8);
    arrQuery4[0] += '  /* sqlMapId(' + fnGetTableEngName(2) +'Ora.deleteList) */';

    var LNGTH1 = arrQuery1.length;
    for ( var num = 0 ; num < LNGTH1 ; num++ )
    {
        if ( null != arrQuery1[num] && 0 == arrQuery1[num].indexOf("FROM    ") )
        {
            var FROM = arrQuery1[num];

            if ( "1" == hidPkCount.value )
            {

                arrQuery1[num] =
                    '      , ' + arrQuery1[0].substr(8, 28) + 'AS ROW_ID                       <!-- 행ID -->\r\n';
            } else
            {
                if ( 0 >= PK_COUNT )
                {
                    arrQuery1[num] =
                        '      , NULL                        AS ROW_ID                       <!-- 행ID --><!-- 수정요망 -->\r\n';
                } else
                {
                    arrQuery1[num]  = '      , \'SELECT \'\'\' || ' + arrQuery1[0].substr(8, 28).replace(/ /g, Base.EMPTYSTR) + ' || \'\'\'';
                    for ( var num2 = 1 ; num2 < PK_COUNT ; num2++ )
                        arrQuery1[num] += ', \'\'\' || ' + arrQuery1[num2].substr(8, 28).replace(/ /g, Base.EMPTYSTR) + ' || \'\'\'';
                    arrQuery1[num] += ' FROM DUAL\'\r\n';
                    arrQuery1[num] += '                                    AS ROW_ID                       <!-- 행ID -->\r\n';
                }
            }

            arrQuery1[num] +=
                '        <!-- 행번호 컬럼을 추가한다. START -->\r\n'
              + '      , ROW_NUMBER() OVER(ORDER BY ';

            for ( var numTmp = 0 ; numTmp < PK_COUNT ; numTmp++ )
            {
                if ( 0 < numTmp ) arrQuery1[num] += ", ";

                arrQuery1[num] += 'A1.' + arrQuery12[numTmp] + " ASC";
            }

            arrQuery1[num] +=
                ')\r\n'
              + '                                    AS ROW_NO                       <!-- 행번호 -->\r\n'
              + '        <!-- 행번호 컬럼을 추가한다. END   -->\r\n'
              + FROM;
        } else
        if ( null != arrQuery1[num] && 0 == arrQuery1[num].indexOf("WHERE   ") )
        {
            arrQuery1[num - 2] += '\r\n<where>';
            arrQuery1[num] = 'AND     ' + arrQuery1[num].substr(8) + '\r\n</where>';

            break;
        }
    }
    if ( "1" != hidPkCount.value || Base.YES != hidSeqYn.value ) { }
    else
    {
        arrQuery1[0] = null;
        arrQuery1[1] = "        " + arrQuery1[1].substr(8);
        arrQuery5[0] = null; arrQuery5 = arrQuery5.slice(1);
    }
    for ( var num = 0 ; num < LNGTH1 ; num++ )
    {
        if ( null == arrQuery1[num] ) continue;
        if ( 0 <= arrQuery1[num].indexOf("      , A1.RGST_DTM                 AS RGST_DTM"    ) ||
             0 <= arrQuery1[num].indexOf("      , A1.RGST_USER_ID             AS RGST_USER_ID") ||
             0 <= arrQuery1[num].indexOf("      , A1.UPDT_DTM                 AS UPDT_DTM"    ) ||
             0 <= arrQuery1[num].indexOf("      , A1.UPDT_USER_ID             AS UPDT_USER_ID"    )
           )
            arrQuery1[num] = null;
        else
            arrQuery1[num] += "\r\n";
    }
    arrQuery1 = arrQuery1.join(Base.EMPTYSTR).split("\r\n");
    arrQuery1 = arrQuery1.slice(0, arrQuery1.length - 1);
    var LNGTH2 = arrQuery2.length;
    for ( var num = 0 ; num < LNGTH2 ; num++ )
    {
        if ( 0 <= arrQuery2[num].indexOf("      , #" + "{rgstDtm}                                                  ") )
            arrQuery2[num] = "      , SYSDATE                                                     " + arrQuery2[num].substr(68);
        else
        if ( 0 <= arrQuery2[num].indexOf("      , #" + "{updtDtm}                                                  ") )
            arrQuery2[num] = "      , NULL                                                        " + arrQuery2[num].substr(68);
        else
        if ( 0 <= arrQuery2[num].indexOf("      , #" + "{updtUserId}                                               ") )
            arrQuery2[num] = "      , NULL                                                        " + arrQuery2[num].substr(68);
    }
    var numLngth3 = arrQuery3.length;
    for ( var num = 0 ; num < numLngth3 ; num++ )
    {
        if ( 0 <= arrQuery3[num].indexOf("      , RGST_DTM                    =  #" + "{rgstDtm}                   ") )
            arrQuery3[num] = null;
        else
        if ( 0 <= arrQuery3[num].indexOf("      , RGST_USER_ID                =  #" + "{rgstUserId}                ") )
            arrQuery3[num] = null;
        else
        if ( 0 <= arrQuery3[num].indexOf("      , UPDT_DTM                    =  #" + "{updtDtm}                   ") )
            arrQuery3[num] = "      , UPDT_DTM                    =  SYSDATE                      " + arrQuery3[num].substr(68);
    }
    for ( var num = 0 ; num < numLngth3 ; num++ )
    {
        if ( null != arrQuery3[num] ) arrQuery3[num] += "\r\n";
    }
    arrQuery3 = arrQuery3.join(Base.EMPTYSTR).split("\r\n");
    arrQuery3 = arrQuery3.slice(0, arrQuery3.length - 1);
    var LNGTH3 = arrQuery3.length, numTmp3 = 0;
    for ( var num = 0 ; num < LNGTH3 ; num++ )
    {
        if ( 0 == arrQuery3[num].indexOf("WHERE   ") )
        {
            numTmp3 = num; break;
        }
    }
    for ( var num = numTmp3 ; num < LNGTH3 ; num++ )
    {
        numStartIndex = arrQuery3[num].indexOf("{");
        numEndIndex = arrQuery3[num].indexOf("}");
        numTmp1A2 = 7 - numEndIndex + numStartIndex - 1;

        arrQuery3[num] =
            arrQuery3[num].substr(0, numStartIndex)
          + "{rowId}" + ( 0 > numTmp1A2 ? "                        ".substr(0, Math.abs(numTmp1A2)) : Base.EMPTYSTR )
          + arrQuery3[num].substr(numEndIndex + 1 + ( 0 < numTmp1A2 ? numTmp1A2 : 0 ));
    }
    var LNGTH4 = arrQuery4.length, numTmp4 = 0;
    for ( var num = 0 ; num < LNGTH4 ; num++ )
    {
        if ( 0 == arrQuery4[num].indexOf("WHERE   ") )
        {
            numTmp4 = num; break;
        }
    }
    for ( var num = numTmp4 ; num < LNGTH4 ; num++ )
    {
        numStartIndex = arrQuery4[num].indexOf("{");
        numEndIndex = arrQuery4[num].indexOf("}");
        numTmp1A2 = 7 - numEndIndex + numStartIndex - 1;

        arrQuery4[num] =
            arrQuery4[num].substr(0, numStartIndex)
          + "{rowId}" + ( 0 > numTmp1A2 ? "                        ".substr(0, Math.abs(numTmp1A2)) : Base.EMPTYSTR )
          + arrQuery4[num].substr(numEndIndex + 1 + ( 0 < numTmp1A2 ? numTmp1A2 : 0 ));
    }

    if ( Base.YES == hidSeqYn.value && "1" == hidPkCount.value )
    {
        var LNGTH2 = arrQuery2.length - 1, numTmp2 = null;
        for ( var num = 0 ; num < LNGTH2 ; num++ )
        {
            if ( 0 == arrQuery2[num].indexOf("VALUES") )
            {
                numTmp2 = num; break;
            }
        }
        var strColTmp = arrQuery2[2].substr(8);
        arrQuery2[numTmp2] = 'SELECT  COALESCE(MAX(' + strColTmp.substr(0, strColTmp.indexOf(Base.SPACE)) + '), 0) + 1' + strColTmp.substr(strColTmp.indexOf(Base.SPACE) + 22);
        for ( var num = numTmp2 + 1; num < LNGTH2 ; num++ )
        {
            arrQuery2[num] = arrQuery2[num + 2];
        }
        arrQuery2 = arrQuery2.slice(0, arrQuery2.length - 2);
        arrQuery2[arrQuery2.length - 1] = arrQuery4[1];
    }

    arrOutpt[++numIndex] = '<?xml version="1.0" encoding="UTF-8"?>';
    arrOutpt[++numIndex] = '<' + '!-- 오류가 발생하고 있으니 이 주석을 제거해주세요. --' + '>';
    arrOutpt[++numIndex] = '<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"';
    arrOutpt[++numIndex] = '                        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">';
    arrOutpt[++numIndex] = Base.EMPTYSTR;
    arrOutpt[++numIndex] = '<mapper namespace="' + fnGetTableEngName(2) + 'Ora">';
    arrOutpt[++numIndex] = '    <resultMap type="' + VO + '" id="result">';
    arrOutpt[++numIndex] = '        ' + arrQuery5.join("\r\n        ");
    arrOutpt[++numIndex] = '        <result property="rowId" column="ROW_ID" />';
    arrOutpt[++numIndex] = Base.EMPTYSTR;
    arrOutpt[++numIndex] = '        <result property="rowNo"   column="ROW_NO"   />';
    arrOutpt[++numIndex] = '        <result property="total"   column="TOTAL"    />';
    arrOutpt[++numIndex] = '        <result property="maxPage" column="MAX_PAGE" />';
    arrOutpt[++numIndex] = '        <result property="page"    column="PAGE"     />';
    arrOutpt[++numIndex] = '    </resultMap>';
    arrOutpt[++numIndex] = Base.EMPTYSTR;
    arrOutpt[++numIndex] = '    <!-- 조회 -->';
    arrOutpt[++numIndex] = '    <!-- 참고) 레코드의 모든 컬럼이 NULL 이면 Runtime 시 NullPointerException -->';
    arrOutpt[++numIndex] = '    <!--       발생하여 NOT NULL 이 되도록 ROW_ID 컬럼을 추가한다.            -->';
    arrOutpt[++numIndex] = '    <select id="' + fnGetTableEngName(2) + 'Ora.selectList" resultMap="result" parameterType="' + VO + '">';
    arrOutpt[++numIndex] = '        WITH    CB_INQR_ORG                                                 <!-- [조회원본] -->';
    arrOutpt[++numIndex] = '                AS';
    arrOutpt[++numIndex] = '                (';
    arrOutpt[++numIndex] = '        <!-- 기존 조회 쿼리를 위치시킨다. START -->';
    arrOutpt[++numIndex] = '        SELECT  <!-- sqlMapId 위치를 변경한다. /* sqlMapId(' + fnGetTableEngName(2) + 'Ora.selectList) */ -->';
    arrOutpt[++numIndex] = '        ' + arrQuery1.join("\r\n        ");
    arrOutpt[++numIndex] = '        <!-- ORDER BY 문은 주석처리한다. START';
    arrOutpt[++numIndex] = '        ORDER BY';
    arrOutpt[++numIndex] = '                1                           ASC';
    arrOutpt[++numIndex] = '             ORDER BY 문은 주석처리한다. END   -->';
    arrOutpt[++numIndex] = '        <!-- 기존 조회 쿼리를 위치시킨다. END   -->';
    arrOutpt[++numIndex] = '                )';
    arrOutpt[++numIndex] = '              , CB_TOTAL                                                    <!-- [총수] -->';
    arrOutpt[++numIndex] = '                AS';
    arrOutpt[++numIndex] = '                (';
    arrOutpt[++numIndex] = '                SELECT  COUNT(1)                    AS TOTAL';
    arrOutpt[++numIndex] = '                      , CAST(#' + '{pageRow} AS NUMBER(10,0))';
    arrOutpt[++numIndex] = '                                                    AS PAGE_ROW';
    arrOutpt[++numIndex] = '                      , CAST(#' + '{page   } AS NUMBER(10,0))';
    arrOutpt[++numIndex] = '                                                    AS PAGE';
    arrOutpt[++numIndex] = '                FROM    CB_INQR_ORG                 A1                              <!-- [조회원본] -->';
    arrOutpt[++numIndex] = '                )';
    arrOutpt[++numIndex] = '              , CB_MAX_PAGE                                                 <!-- [최대페이지] -->';
    arrOutpt[++numIndex] = '                AS';
    arrOutpt[++numIndex] = '                (';
    arrOutpt[++numIndex] = '                SELECT  A1.TOTAL';
    arrOutpt[++numIndex] = '                      , CEIL(A1.TOTAL / A1.PAGE_ROW)';
    arrOutpt[++numIndex] = '                                                    AS MAX_PAGE';
    arrOutpt[++numIndex] = '                      , A1.PAGE';
    arrOutpt[++numIndex] = '                      , ';
    arrOutpt[++numIndex] = '                        A1.PAGE_ROW * ( A1.PAGE - 1 ) + 1';
    arrOutpt[++numIndex] = '                                                    AS START_ROW';
    arrOutpt[++numIndex] = '                      , A1.PAGE_ROW *   A1.PAGE     AS END_ROW';
    arrOutpt[++numIndex] = '                FROM    CB_TOTAL                    A1                              <!-- [총수] -->';
    arrOutpt[++numIndex] = '                )';
    arrOutpt[++numIndex] = '        SELECT  /* sqlMapId(' + fnGetTableEngName(2) + 'Ora.selectList) */';
    arrOutpt[++numIndex] = '                A1.*';
    arrOutpt[++numIndex] = '              , B1.TOTAL';
    arrOutpt[++numIndex] = '              , B1.MAX_PAGE';
    arrOutpt[++numIndex] = '              , B1.PAGE';
    arrOutpt[++numIndex] = '        FROM    CB_INQR_ORG                 A1                              <!-- [조회원본] -->';
    arrOutpt[++numIndex] = '                INNER JOIN CB_MAX_PAGE      B1  ON  1 = 1                   <!-- [최대페이지] -->';
    arrOutpt[++numIndex] = '        WHERE   A1.ROW_NO             BETWEEN  B1.START_ROW';
    arrOutpt[++numIndex] = '                                          AND  B1.END_ROW';
    arrOutpt[++numIndex] = '        ORDER BY';
    arrOutpt[++numIndex] = '                A1.ROW_NO                   ASC';
    arrOutpt[++numIndex] = '    </select>';
    if ( "1" != hidPkCount.value || Base.YES != hidSeqYn.value )
    {
    arrOutpt[++numIndex] = Base.EMPTYSTR;
    arrOutpt[++numIndex] = '    <!-- 중복여부 조회 -->';
    arrOutpt[++numIndex] = '    <select id="' + fnGetTableEngName(2) + 'Ora.selectDupYn" resultType="String" parameterType="' + VO + '">';
    arrOutpt[++numIndex] = '        SELECT  /* sqlMapId(' + fnGetTableEngName(2) + 'Ora.selectDupYn) */';
    arrOutpt[++numIndex] = '                \'Y\'                         AS DUP_YN                       <!-- 중복여부 --><!-- 여 -->';
        for ( var num = 1 ; num < LNGTH4 ; num++ )
        {
    arrOutpt[++numIndex] = '        ' + arrQuery4A[num];
        }
    arrOutpt[++numIndex] = '        <if test=\' null != rowId and "" != rowId \'>';
        if ( "1" != hidPkCount.value && "0" != hidPkCount.value )
        {
    arrOutpt[++numIndex] = '        AND     ( ' + arrQuery1[0].substr(11, 25).replace(/ /g, Base.EMPTYSTR);

            for ( var num2 = 1 ; num2 < PK_COUNT ; num2++ )
    arrOutpt[numIndex]  += ', ' + arrQuery1[num2].substr(11, 25).replace(/ /g, Base.EMPTYSTR);
    arrOutpt[numIndex]  += ' )\r\n                                       NOT IN  ( ${rowId} )                 ';
            for ( var num2 = 0 ; num2 < PK_COUNT ; num2++ )
    arrOutpt[numIndex]  += arrQuery1[num2].substr(68);
        } else
        {
    arrOutpt[++numIndex] = '        AND     ' + arrQuery4[arrQuery4.length - 1].substr(8).replace(/= /, "!=");
        }
    arrOutpt[++numIndex] = '        </if>';
    arrOutpt[++numIndex] = '    </select>';
    }
    arrOutpt[++numIndex] = Base.EMPTYSTR;
    arrOutpt[++numIndex] = '    <!-- 등록 -->';
    arrOutpt[++numIndex] = '    <insert id="' + fnGetTableEngName(2) + 'Ora.insertInfo" parameterType="' + VO + '">';
    arrOutpt[++numIndex] = '        ' + arrQuery2.join("\r\n        ");
    arrOutpt[++numIndex] = '    </insert>';
    arrOutpt[++numIndex] = Base.EMPTYSTR;
    arrOutpt[++numIndex] = '    <!-- 수정 -->';
    arrOutpt[++numIndex] = '    <update id="' + fnGetTableEngName(2) + 'Ora.updateInfo" parameterType="' + VO + '">';
    if ( "1" != hidPkCount.value && "0" != hidPkCount.value )
    {
    arrOutpt[++numIndex] = '        ' + arrQuery3.slice(0, arrQuery3.length - PK_COUNT).join("\r\n        ");
    arrOutpt[numIndex]  += '\r\n        WHERE   ( ' + arrQuery1[0].substr(11, 25).replace(/ /g, Base.EMPTYSTR);
            for ( var num2 = 1 ; num2 < PK_COUNT ; num2++ )
    arrOutpt[numIndex]  += ', ' + arrQuery1[num2].substr(11, 25).replace(/ /g, Base.EMPTYSTR);
    arrOutpt[numIndex]  += ' )\r\n                                           IN  ( ${rowId} )                 ';
            for ( var num2 = 0 ; num2 < PK_COUNT ; num2++ )
    arrOutpt[numIndex]  += arrQuery1[num2].substr(68);
    }
    else
    {
        if ( "1" == hidPkCount.value && Base.YES == hidSeqYn.value )
        {
            var LNGTH3_2 = arrQuery3.length;
            for ( var num = 0 ; num < LNGTH3_2 ; num++ )
            {
                if ( 2 <= num && (PK_COUNT + 2) > num )
                    arrQuery3[num]  = null;
                else
                    arrQuery3[num] += "\r\n";
            }
            arrQuery3 = arrQuery3.join(Base.EMPTYSTR).split("\r\n");
            arrQuery3 = arrQuery3.slice(0, arrQuery3.length - 1);
            if ( 2 < arrQuery3.length )
                arrQuery3[2] = arrQuery3[2].replace(/, /, "  ");
        }
    arrOutpt[++numIndex] = '        ' + arrQuery3.join("\r\n        ");
    }
    arrOutpt[++numIndex] = '    </update>';
    arrOutpt[++numIndex] = Base.EMPTYSTR;
    arrOutpt[++numIndex] = '    <!-- 목록 삭제 -->';
    arrOutpt[++numIndex] = '    <delete id="' + fnGetTableEngName(2) + 'Ora.deleteList" parameterType="' + VO + '">';
    for ( var num = 0 ; num < LNGTH4 ; num++ )
    {
        if ( 0 == arrQuery4[num].indexOf("WHERE   ") )
        {
            numTmp4 = num;
            break;
        }
    }
    for ( var num = 0 ; num < LNGTH4 ; num++ )
        arrQuery4[num] = arrQuery4[num].replace(/ =  #{rowId} /, "IN (${rowId})");
    if ( "1" != hidPkCount.value && "0" != hidPkCount.value )
    {
    arrOutpt[++numIndex] = '        ' + arrQuery4.slice(0, 2).join("\r\n        ");
    arrOutpt[numIndex]  += '\r\n        WHERE   ( ' + arrQuery1[0].substr(11, 25).replace(/ /g, Base.EMPTYSTR);
            for ( var num2 = 1 ; num2 < PK_COUNT ; num2++ )
    arrOutpt[numIndex]  += ', ' + arrQuery1[num2].substr(11, 25).replace(/ /g, Base.EMPTYSTR);
    arrOutpt[numIndex]  += ' )\r\n                                           IN  ( ${rowId} )                 ';
            for ( var num2 = 0 ; num2 < PK_COUNT ; num2++ )
    arrOutpt[numIndex]  += arrQuery1[num2].substr(68);
    }
    else
    {
    arrOutpt[++numIndex] = '        ' + arrQuery4.join("\r\n        ");
    }
    arrOutpt[++numIndex] = '    </delete>';
    arrOutpt[++numIndex] = '</mapper>';

    arrQuery5 = null; arrQuery1 = null; arrQuery2 = null; arrQuery3 = null; arrQuery4 = null; arrQuery4A = null; arrQuery12 = null;

    return arrOutpt.join("\r\n");
}