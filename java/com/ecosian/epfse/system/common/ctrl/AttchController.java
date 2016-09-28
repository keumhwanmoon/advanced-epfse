/*
--------------------------------------------------------------------------------
    PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
    - 단위업무명 : 첨부 Controller
    - 최초작성일 : 2014-05-14
    - 작  성  자 : 문금환
    - 비      고 : Controller 클래스내 모든 함수는 매개변수에 HttpServletRequest 를 추가한다.
                   페이지경로 가져오는 함수의 return type 은 String 이고, 그 외의 함수는 Channel 이다.
--------------------------------------------------------------------------------
*/
package com.ecosian.epfse.system.common.ctrl;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.net.URLEncoder;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;

import com.ecosian.epfse.system.common.Base;
import com.ecosian.epfse.system.common.Channel;
import com.ecosian.epfse.system.common.dao.vo.AttchVO;
import com.ecosian.epfse.system.common.svc.AttchService;

@Controller // Presentation Layer 를 구성하는 Controller Class 를 정의
public class AttchController
{
    @Resource(name = "attchService") // 해당 beanName 과 일치하는 bean 을 가져온다.
    private AttchService svc;

    // 페이지경로 가져오기 // 첨부 팝업 화면 요청시 사용한다. // 첨부 가져오기 팝업 화면 요청시 사용한다.
    @RequestMapping(value={ "/system/attchPopup.do", "/system/getAttchPopup.do" })
    public ModelAndView getPagePath(HttpServletRequest req)
    {
        // Page Path = [InternalResourceViewResolver prefix] + [return value] + [InternalResourceViewResolver suffix]
        //           = "/WEB-INF/views/" + [return value] + ".jsp"
        return new ModelAndView("/epfse" + req.getRequestURI().replace(".do", ""));
    }

    // 파일 가져오기 // 첨부 가져오기 팝업 화면 로드시 사용한다.
    @RequestMapping(method=RequestMethod.POST, value="/system/getFileAttch.do")
    public ModelAndView getFile(HttpServletRequest req, HttpServletResponse hsr,
            @ModelAttribute AttchVO vo)
    {
        // 1. 첨부정보를 조회한다.
        AttchVO voInfo = (AttchVO) svc.getInfo(vo).getRsltInfo();

        if ( null == voInfo )
        {
            // Page Path = [InternalResourceViewResolver prefix] + [return value] + [InternalResourceViewResolver suffix]
            //           = "/WEB-INF/views/" + [return value] + ".jsp"
            ModelAndView mavOutpt = new ModelAndView("/epfse/system/attchRslt");
            mavOutpt.addObject("CHANNEL.rsltInfo", vo.toJsonStr());
            mavOutpt.addObject("CHANNEL.rsltNo", -1); // 첨부정보없음
            return mavOutpt;
        }

        // 2. 첨부파일을 가져온다.
        final String ATTCH_HREF = voInfo.getAttchHref();
        final String FILE_PATH = ( 1 != ATTCH_HREF.indexOf(":") ? getRealPath(req, "/") + ATTCH_HREF : ATTCH_HREF );

        File org = new File(FILE_PATH); final int LNGTH = (int) org.length();

        if ( 0 >= LNGTH )
        {
            org = null;

            // Page Path = [InternalResourceViewResolver prefix] + [return value] + [InternalResourceViewResolver suffix]
            //           = "/WEB-INF/views/" + [return value] + ".jsp"
            ModelAndView mavOutpt = new ModelAndView("/epfse/system/attchRslt");
            mavOutpt.addObject("CHANNEL.rsltInfo", voInfo.toJsonStr());
            mavOutpt.addObject("CHANNEL.rsltNo", -3); // 파일명오류
            return mavOutpt;
        }

        // 3. 원본파일명을 가져온다.
        String strOrgFileName = voInfo.getOrgFileName();
        try { strOrgFileName = URLEncoder.encode(strOrgFileName, "UTF-8").replaceAll("\\+", "%20"); } catch ( Exception ect ) { ect.printStackTrace(); }

        // 8. 파일을 복사한다.
        BufferedInputStream  bis = null;
        BufferedOutputStream bos = null;
        boolean blnError = false, blnUserCncl = false;

        hsr.setContentType("application/doc");
        hsr.setHeader("Content-Disposition", "attachment; filename=" + strOrgFileName);
        hsr.setContentLength(LNGTH);

        try
        {
            bis = new BufferedInputStream(new FileInputStream(org));
            bos = new BufferedOutputStream(hsr.getOutputStream());

            FileCopyUtils.copy(bis, bos);
            bos.flush();
        } catch ( Exception ect )
        {
            blnError = true; blnUserCncl = "org.apache.catalina.connector.ClientAbortException".equals(ect.getClass().getName());
        } finally
        {
            if ( null != bis ) { try { bis.close(); } catch ( Exception ect ) { ect.printStackTrace(); } }
            if ( null != bos ) { try { bos.close(); } catch ( Exception ect ) { ect.printStackTrace(); } }

            bis = null; bos = null;
        }

        // 9. 파일복사 오류를 처리한다.
        if ( blnError && !blnUserCncl ) // 파일저장 오류 발생시..
        {
            hsr.setContentType("text/html");

            // Page Path = [InternalResourceViewResolver prefix] + [return value] + [InternalResourceViewResolver suffix]
            //           = "/WEB-INF/views/" + [return value] + ".jsp"
            ModelAndView mavOutpt = new ModelAndView("/epfse/system/attchRslt");
            mavOutpt.addObject("CHANNEL.rsltInfo", voInfo.toJsonStr());
            mavOutpt.addObject("CHANNEL.rsltNo", -9); // 파일저장오류
            return mavOutpt;
        }

        strOrgFileName = null; org = null; voInfo = null;

        return null;
    }

    // 저장 // 첨부 팝업 화면 파일 선택시 사용한다.
    @RequestMapping(method=RequestMethod.POST, value="/system/saveInfoAttch.do")
    public ModelAndView save(HttpServletRequest req,
            @ModelAttribute AttchVO vo)
    {
        // Page Path = [InternalResourceViewResolver prefix] + [return value] + [InternalResourceViewResolver suffix]
        //           = "/WEB-INF/views/" + [return value] + ".jsp"
        ModelAndView mavOutpt = new ModelAndView("/epfse/system/attchRslt");

            final String URI_DELI = "/"; // URI구분자

            MultipartFile mpf = ((MultipartHttpServletRequest) req).getFile("attchFile");

                // 1. 파일최대크기를 검증한다.
                long SIZE = mpf.getSize();

                long lngFileMaxSize = 0;
                try { lngFileMaxSize = Long.parseLong(vo.getFileMaxSize()); lngFileMaxSize *= 1000000; }
                catch ( Exception ect ) { ect.printStackTrace(); }
                if ( SIZE > lngFileMaxSize )
                {
                    mavOutpt.addObject("CHANNEL.rsltNo", -1); // 파일크기오류
                    mavOutpt.addObject("CHANNEL.rsltInfo", vo.toJsonStr());
                    return mavOutpt;
                }

            final String ATTCH_ID    = Base.getId(); // 첨부ID
            final String ATTCH_PATH  = getAttchPath(vo.getComParamScrAddrName(), URI_DELI); // 첨부경로
            final String FOLDR_PATH = getFolderPath(URI_DELI, req, vo.getVarName(), ATTCH_PATH, ATTCH_ID); // 폴더경로

                // 2. 디스크공간크기를 검증한다.
                final long FREE_SPACE = (new File(FOLDR_PATH.substring(0, 3))).getFreeSpace();
                if ( SIZE > FREE_SPACE )
                {
                    mavOutpt.addObject("CHANNEL.rsltNo", -3); // 디스크공간오류
                    mavOutpt.addObject("CHANNEL.rsltInfo", vo.toJsonStr());
                    return mavOutpt;
                }

                // 3. 파일을 저장한다.
                if ( !createFolder(FOLDR_PATH) ) // 폴더를 생성한다.
                {
                    mavOutpt.addObject("CHANNEL.rsltNo", -7); // 폴더저장오류
                    mavOutpt.addObject("CHANNEL.rsltInfo", vo.toJsonStr());
                    return mavOutpt;
                } else
                if ( !createFile(mpf, FOLDR_PATH) ) // 파일을 생성한다.
                {
                    mavOutpt.addObject("CHANNEL.rsltNo", -9); // 파일저장오류
                    mavOutpt.addObject("CHANNEL.rsltInfo", vo.toJsonStr());
                    return mavOutpt;
                }

                // 9. 첨부정보를 등록한다.
                vo.setAttchId(ATTCH_ID); // 첨부ID
                vo.setAttchPathName(ATTCH_PATH); // 첨부경로명
                vo.setOrgFileName(mpf.getOriginalFilename()); // 원본파일명
                setFiileSize(vo, SIZE); // 파일 크기 설정

                Channel chn = svc.rgstInfo(vo);
                mavOutpt.addObject("CHANNEL.rsltInfo", ((AttchVO) chn.getRsltInfo()).toJsonStr());
                mavOutpt.addObject("CHANNEL.rsltNo", chn.getRsltNo());
                chn = null;

            mpf = null;

        return mavOutpt;
    }

    // 파일 크기 설정
    private void setFiileSize(AttchVO vo, long lngSize)
    {
        long lng = lngSize;
        String str = null;

        if ( 1000000000 < lng )
        {
            str = "GB";
            lng = Math.round(lng / 1000000000);
        } else
        if ( 1000000 < lng )
        {
            str = "MB";
            lng = Math.round(lng / 1000000);
        } else
        if ( 1000 < lng )
        {
            str = "KB";
            lng = Math.round(lng / 1000);
        } else
        {
            str = "Bytes";
        }

        vo.setFileSizeAmt(String.valueOf(lng)); // 파일크기량
        vo.setSizeUnitCode(str); // 단위코드
    }

    // 파일을 생성한다.
    private boolean createFile(MultipartFile mpf, String strPath)
    {
        final String FILE_PATH = strPath + mpf.getOriginalFilename();

        byte[] arr = null;
        FileOutputStream fos = null;

        try
        {
            arr = mpf.getBytes();
            fos = new FileOutputStream(FILE_PATH);
            fos.write(arr);
            fos.close();
        }
        catch ( Exception ect )
        {
            if ( null != arr ) arr = null;

            ect.printStackTrace();
        }

        try { if ( null != fos ) { fos.close(); fos = null; } } catch ( Exception ect ) { ect.printStackTrace(); }

        File file = new File(FILE_PATH);
        return ( null != file && file.exists() );
    }

    // 폴더를 생성한다.
    private boolean createFolder(String strPath)
    {
        File file = new File(strPath);
        try { if ( !file.exists() ) file.mkdirs(); } catch ( Exception ect ) { ect.printStackTrace(); }
        return ( null != file && file.exists() );
    }

    // 실제 경로 가져오기
    private String getRealPath(HttpServletRequest req, String strDeli)
    {
        return req.getSession().getServletContext().getRealPath(Base.EMPTYSTR).replaceAll("\\\\", strDeli);
    }

    // 폴더를 조합한다.
    private String getFolderPath(String strDeli, HttpServletRequest req,
                String strVarName, String strAttchPathName, String strAttchId)
    {
        // "C:/PROJECTS/EPFSE-USER/webapp" + "/attchFile" + "/develop/edit/" + "1400134394503_9999" + "/"
        // "C:/EPF-SE/attch" + "/develop/edit/" + "1400134394503_9999" + "/"
        return ( 0 > strVarName.indexOf(":") ? getRealPath(req, strDeli) : Base.EMPTYSTR ) + strVarName + strAttchPathName + strAttchId + strDeli;
    }

    // 첨부경로 가져오기
    private String getAttchPath(String strScrAddr, String strDeli)
    {
        return strScrAddr.substring(0, strScrAddr.lastIndexOf(".do")) + strDeli;
    }
}