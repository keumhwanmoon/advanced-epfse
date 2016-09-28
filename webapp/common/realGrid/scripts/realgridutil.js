var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;

/* div tag를 flash object tag로 대체 */

function setupGrid(tagid, width, height, onload, params) {
    var flashvars = {
        id: tagid,
        hideLoader: true
    };

    if (params) {
        for (var p in params) {
            flashvars[p] = params[p];
        }
    }

    if (onload) {
        flashvars.onload = typeof (onload) === "function" ? onload.name : onload;
        console && console.log(flashvars);
    }

    var pars = {
        quality: "high",
        wmode: "opaque",
        allowscriptaccess: "sameDomain",
        allowfullscreen: "false"
    };

    if (isFirefox)
        pars.wmode = "direct";

    var attrs = {
        id: tagid,
        name: tagid,
        align: "middle"
    };

    /* SWFObject v2.2 <http://code.google.com/p/swfobject/> */
    //var swfUrl = "objects/RealGridWeb.swf";

    var strContextPath = $("#hidComParamContextPatch").val();

    var swfUrl = "/common/realGrid/objects/RealGridWeb.swf";

    var swfUrl2 = "/common/realGrid/objects/expressInstall.swf";

    if (Base.EMPTYSTR != strContextPath) swfUrl = strContextPath + swfUrl;
    if (Base.EMPTYSTR != strContextPath) swfUrl2 = strContextPath + swfUrl2;

    if (location.href.indexOf("http://localhost") == 0) {
        swfUrl = swfUrl + "?" + new Date().getTime();
    }
    //swfobject.embedSWF(swfUrl, tagid, width, height, "11.1.0", "objects/expressInstall.swf", flashvars, pars, attrs);
    swfobject.embedSWF(swfUrl, tagid, width, height, "11.1.0", swfUrl2, flashvars, pars, attrs);
};

function setupTree(tagid, width, height, onload, params) {
    var flashvars = {
        id: tagid
    };

    if (params) {
        for (var p in params) {
            flashvars[p] = params[p];
        }
    }

    if (onload) {
        flashvars.onload = typeof (onload) === "function" ? onload.name : onload;
        console && console.log(flashvars);
    }

    var pars = {
        quality: "high",
        wmode: "opaque",
        allowscriptaccess: "sameDomain",
        allowfullscreen: "true"
    };

    if (isFirefox)
        pars.wmode = "direct";

    var attrs = {
        id: tagid,
        name: tagid,
        align: "middle"
    };

    /* used SWFObject v2.2 <http://code.google.com/p/swfobject/> */
    var strContextPath = $("#hidComParamContextPatch").val();

    var swfUrl = "/common/realGrid/objects/TreeGridWeb.swf";

    var swfUrl2 = "/common/realGrid/objects/expressInstall.swf";

    if (Base.EMPTYSTR != strContextPath) swfUrl = strContextPath + swfUrl;
    if (Base.EMPTYSTR != strContextPath) swfUrl2 = strContextPath + swfUrl2;

    swfobject.embedSWF(swfUrl, tagid, width, height, "11.1.0", swfUrl2, flashvars, pars, attrs);
};

