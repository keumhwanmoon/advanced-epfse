;$(function(){
    setGNB();

    /* lnb 동작 바인딩 */
    var lnb = $('#lnb');
    if(0 < lnb.size()) {
        setLNB(lnb);
    }

    $(window).bind('resize load', function(){
        if(0 < $('#content > iframe:visible').size()){
            setFrameSize();
        }else if(0 < $('#content').size() && 0 < $('#lnb').size()){
            setResize();
        }
    });

    tabControl();

    /* exp button 동작 바인딩 */
    var exp = $('button.exp');
    if(0 < exp.size()) { setExp(exp); }
});

function setContentHeight(){
    setResize();
}

function setResize(){
    var left = $('#lnb');
    var right = $('#content');
    var revision = parseInt($('div.contentTab').outerHeight());

    var wHeight = $(window).height() - $('#header').outerHeight() - $('#footer').outerHeight();
    var mHeight = $('#lnb ul').outerHeight() + $('#lnb h2').outerHeight();
    var cHeight = $('#content > iframe:visible').outerHeight() + revision;

    if(mHeight > cHeight){
        if(mHeight > wHeight){
            left.height(mHeight);
            right.height(mHeight - revision);
        }else{
            left.height(wHeight);
            right.height(wHeight - revision);
        }
    }else{
        if(cHeight > wHeight){
            left.height(cHeight);
            right.height(cHeight - revision);
        }else{
            left.height(wHeight);
            right.height(wHeight - revision);
        }
    }
    $('div.contentTab > ul a.on').focus();
}

function setGNB(){
    var gnb = $('#gnb > li > a');

    gnb.bind('focus mouseenter', function(){
        $(this).addClass('on').next().show().parent().siblings().find('> a').removeClass('on').next().hide();
    });

    gnb.parent().bind('mouseleave', function(){
        gnb.removeClass('on').next().hide();
    });

    $('*').not('#gnb a').bind('focus', function(){
        gnb.removeClass('on').next().hide();
    });
}

function setLNB(obj){
    var lnb = $('> ul > li > a', obj);
    var time = 200;

    lnb.bind('click', function(e){
        if(0 != $(this).next().size()){
            e.preventDefault();
            $(this).addClass('on').next().slideDown(time, function(){
                setContentHeight();
            }).parent().siblings().find('> a').removeClass().next().slideUp(time);
        }
    });
}

function setExp(obj){
    var exp = obj;

    exp.bind('click', function(){
        if(!$(this).hasClass('on')){
            $('#lnb').animate({marginLeft : 0}, 300);
            $('div.contentWrap').animate({marginLeft : '181px'}, 300);
            $(this).addClass('on');
        }else{
            $('#lnb').animate({marginLeft : '-181px'}, 300);
            $('div.contentWrap').animate({marginLeft : 0}, 300);
            $(this).removeClass('on');
        }
    });
}

function tabControl(){
    var tabCount = 0;
    var tabList = $('div.contentTab > ul');
    var btnNext = $('button.nextTab');
    var btnPrev = $('button.prevTab');

    $(document).on('click', '*[data-tabPage]', function(e){
        e.preventDefault();
        var visited = false;
        var title = $(this).attr('data-tabTitle');
        var page = $(this).attr('data-tabPage');

        $('> li > a', tabList).each(function(){
            if(page == $(this).attr('data-page')){
                visited = true;
            }
        });

        if(false == visited){
            tabCount += 1;
            var currentLink = '#tab' + tabCount;

            $('#content').children().hide().end().append('<iframe id="tab' + tabCount + '" title="' + title + '" src="' + page + '" frameborder="0" scrolling="no"></iframe>');
            tabList.find('a').removeClass('on').end().append('<li><a href="' + currentLink + '" id="label' + tabCount + '" class="on" data-page="' + page + '">' + title + '<button type="button" title="탭 닫기"><span></span>이 탭 닫기</button></a></li>');
            tabList.find('a').eq(-1).focus();
        }else{
            // 이미 열려있는 탭 찾아서 열기 // 문금환 변경
            tabList.find('a').each(function()
            {
                if ( page == $(this).attr("data-page")) $(this).click();
            });
        }
    });

    tabList.on('click', 'a', function(e){
        e.preventDefault();
        $($(this).addClass('on').parent().siblings().children().removeClass('on').end().end().end().attr('href')).show().siblings().hide();
        setFrameSize();
    });

    tabList.on('click', 'a > button', function(){
        if($(this).parent().hasClass('on')){
            var index = $('div.contentTab > ul li').index($(this).parents('li:first'));

            if(0 != index){
                $(this).parents('li:first').prev().children('a').trigger('click');
            }else{
                $(this).parents('li:first').next().children('a').trigger('click');
            }
        }
        $($(this).parent().attr('href')).remove();
        $(this).parents('li:first').remove();
    });

    btnNext.bind('click', function(){
        if(0 < $('div.contentTab > ul a.on').parent().next().size()){
            $('div.contentTab > ul a.on').parent().next().children('a').trigger('click').focus();
        }
    });

    btnPrev.bind('click', function(){
        if(0 < $('div.contentTab > ul a.on').parent().prev().size()){
            $('div.contentTab > ul a.on').parent().prev().children('a').trigger('click').focus();
        }
    });
}

function setFrameSize(){
    var iframe = $('#content > iframe:visible');
    var fHeight = iframe.contents().find('body').eq(0).outerHeight();
    var wHeight = $(window).height() - $('#header').outerHeight() - $('#footer').outerHeight() - $('div.contentTab').outerHeight();

    if(wHeight > fHeight){
        iframe.height(wHeight);
    }else{
        iframe.height(fHeight);
    }

    setResize();
}