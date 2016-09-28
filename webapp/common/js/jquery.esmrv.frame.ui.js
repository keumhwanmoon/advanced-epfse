;$(function(){
	$('div.head').nextUntil('div.popup').eq(-1).css({marginBottom : 0});

	$(window).bind('load resize', function(){
		setFrameSize();
	});

	/* button 동작 바인딩 */
	var button = $('span.button');
	if(0 < button.size()){ setButton(button); }

	/* layer popup 동작 바인딩 */
	var popup = $('a.openLayer');
	if(0 < popup.size()){ setPopup(popup); }

	/* tab 동작 바인딩 */
	var tabBox = $('div.tab');
	if(tabBox.size() > 0){ setTab(tabBox); }

	/* tooltip box 동작 바인딩 */
	var tipBox = $('a.tooltip');
	if(tipBox.size() > 0){ setTooltip(tipBox); }
	
	/* content slide toggle */
	var toggle = $('a.funcExp');
	if(toggle.size() > 0){ setToggle(toggle); }
	
	/* style */
	var readonly = $('.readonly');
	if(readonly.size() > 0){ setReadonly(readonly); }	
});

function setButton(obj){
	var button = $('> *', obj);
	
	button.bind('focus mouseenter', function(){
		$(this).parent().addClass('on');
	}).bind('blur mouseleave', function(){
		$(this).parent().removeClass('on');
	});
}

function setPopup(popup){	
	popup.bind('click', function(e){
		var	oFocus = $(this);
		var layer = $(oFocus.attr('href'));
		var oHeight = $(document).outerHeight() - 20;
		var oIndex = parseInt(layer.css('z-index'));

		$('#bgOpacity').height($(window).outerHeight());
		
		if(0 == $('div.layer:visible').size()){
			$('#bgOpacity').css({'z-index':oIndex - 1000}).show();
		}else{
			$(this).parents('div.layer:first').css({'z-index' : oIndex});
			$('#bgOpacity').css({'z-index' : oIndex + 100});
			layer.css({'z-index' : oIndex + 200});
		}

		layer.show().css({position : 'fixed', marginTop : -(layer.height() / 2) - 1, marginLeft : -(layer.width() / 2) - 1});

		if(layer.height() > $(window).outerHeight()){
			layer.css({position : 'absolute', top : '40px', marginTop : 0});
			$('body').height(layer.height());
			$('#bgOpacity').height($(document).height());
			setFrameSize();
		}else{
			$('body').css({overflow : 'hidden'});
			e.preventDefault();		
		}
		
		layer.find('.closeLayer').bind('click', function(){
			layer.hide().find('.closeLayer').unbind('click');
			oFocus.focus();
			if(1 > $('div.layer:visible').size()){
				$('body').css({overflow : 'auto', height : oHeight});
				$('#bgOpacity').height(oHeight).css({'z-index' : oIndex - 1000}).hide();
				setFrameSize();
			}else{
				oFocus.parents('div.layer:first').css({'z-index' : oIndex + 200});
				$('#bgOpacity').css({'z-index' : oIndex + 100});
				layer.css({'z-index' : oIndex});
			}
		});
	});
}

function setLayerHeight(){
	var layer = $('div.layer:visible');
	if(layer.height() > $(window).height()){
		$('#bgOpacity').height(layer.height() + 30);
		$('body').css({overflow:'auto'});
		layer.css({position:'absolute'});
	}else{
		layer.css({marginTop:-layer.height() / 2});
		$('body').css({overflow:'hidden'});
		layer.css({position:'fixed'});
	}
}

function setTab(obj){
	var tab = $(':header a', obj);
	
	tab.bind('click', function(e){
		e.preventDefault();
		$(this).addClass('on').parent().nextUntil(':header').addClass('on').end().siblings(':header').children().removeClass('on').end().nextUntil(':header').removeClass('on');
	});
	
	tab.eq(0).trigger('click');
}

function setButton(obj){
	var button = obj;
	
	button.bind('focus mouseenter', function(){
		$(this).addClass('on');
	}).bind('blur mouseleave', function(){
		$(this).removeClass('on');
	});
}

function setTooltip(obj){
	var tooltip = obj;
	var target = $(tooltip.attr('href'));
	
	tooltip.bind('click', function(e){
		e.preventDefault();
		target.css({
			top : $(this).position().top - 1,
			left : $(this).position().left + $(this).width() - 1	
		});
		if(!target.hasClass('on')){
			target.addClass('on');
		}else{
			target.removeClass('on');
		}
	});
}

function setToggle(obj){
	var toggle = obj;
	var oHeight;	
	var style;
	
	toggle.bind('click', function(e){
		e.preventDefault();
		var target = $($(this).attr('href'));
		
		if(!$(this).hasClass('on')){
			oHeight = target.height();
			style = target.css(['margin', 'borderWidth', 'borderColor', 'borderStyle']);
			$(this).addClass('on').children('b').text('펼치기');
			target.animate({
				height:0
			}, function(){
				target.css({
					border:0,
					margin:0
				});
			}).children().hide();
		}else{
			$(this).removeClass('on').children('b').text('접기');
			target.animate({
				height:oHeight
			}).children().show();
			$.each(style, function(prop, value){
				target.css(prop, value);
			});
		}
	});
}

function setReadonly(obj){
	obj.prop('readonly', true);
}

function setFrameSize(bool){
	if(!bool){
		window.parent.setFrameSize(true);
	}
}