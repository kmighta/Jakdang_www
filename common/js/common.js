var Application = {
	realScroll:null,
	slideInstances: {
		mainSlide: null,
		noticeSlide: null
	},
	commonTabSwiper:null,
	lectureCount :0,

	init : function() {
		this.commonHeaderCampus();
		this.removeHrefNull();
		//this.commonTabSlideMenu();
		this.initSelectLinkMove();
		this.initVideoPopup();
		this.initCommonPopup();
		this.initTab();
		this.initCheckboxAll();
		this.scrollAnimateMove();
		this.selectBoxCheckbox();
		this.commonCounseling();
		this.comCounselLectureSelect();
		this.layerContents();
		this.layerContentsClose();
		this.commonAccordion();
		this.initFullHeightContents();
	},
	
	MenuToggle(state, depth1, depth2) {
		// Application.MenuToggle(true);
		// Application.MenuToggle(true, 1);
		// Application.MenuToggle(true, 2 , 0);

		depth1 = typeof depth1 !== 'undefined' && depth1 ? depth1: -1;
		depth2 = typeof depth2 !== 'undefined' && depth2 ? depth2: -1;

		// 기존에 열려있던 메뉴 닫기
		$('.depth').removeClass('open');

		if( state ) {
			$('#menu').addClass('open');
			$("body").addClass("hidden mask-black");

			if(depth1 >= 0) {

				$('#menu .depth'+ depth1).addClass('open');

				$("#menu .menu-header, #menu .menu-footer").slideUp();

				if(depth2 >= 0) {
					$('#menu .depth'+ depth1 +'-'+ depth2).addClass('open');
				} else {
					$('#menu .depth'+ depth1 +'-'+ depth2).removeClass('open');
				}
			} else {
				$("#menu .menu-header, #menu .menu-footer").show();
			}
		}
		else {
			$('#menu').removeClass('open');
			$("body").removeClass("hidden mask-black");
		}
	},

	initFullHeightContents: function() {

	   // 윈도우 사이즈 변경될때마다 실행한다.
		$(window).on('resize touchend touchmove touchstart', function() {
			var windowHeight = window.innerHeight ? window.innerHeight : $(window).height();

			$('[data-full-height]').css({height: windowHeight + 'px'})
			$('[data-full-min-height]').css({minHeight: windowHeight + 'px'})
			$('html').css('--vh', windowHeight + 'px');

		}).resize();

	},

	commonHeaderCampus : function(){
		$('[data-toggle="campus-select"]').click(function(){
			$("#header .campus-select-detail").addClass("show");
		});
		/*
		$(document).on("click","#header .campus-select-detail .list li",function() {
			var dataTel = $(this).attr("data-tel");
			var dataName = $(this).attr("data-name");
			console.log(dataTel);
			$("#header .campus-select-detail .list li").removeClass("current");
			$(this).addClass("current");



			$('[data-change="current"]').html(dataName+' <a href="tel:'+dataTel+'">'+dataTel+'</a>');
			if( dataName == "공식"){
				$('.campus-select .select-label').html("이젠아카데미교육그룹");
			} else {
				$('.campus-select .select-label').html(dataName + "캠퍼스");
			}

		});
		*/
		$(document).on("click","#header .campus-select-detail .btn-close",function() {
			$("#header .campus-select-detail").removeClass("show");
		});
	},

	layerContents : function(){
		$('[data-toggle="btn-layer-contents"]').on("click", function(e) {

			e.preventDefault();

			var target = $(this).attr("data-target");
			//console.log(target)
			var targetParent = $(this).attr("data-target-parents");
			var notTarget = $(this).attr("data-not-target");

			if(target === '.layer-detail-box.all-class'){
				$.ajax({
					context : this,
					type : "GET", 
					async : false ,
					dataType : "html" ,
					cache : false ,
					url : "/m/_include/json/getAllCalss.asp"
				}).done(function(data) {
					$(".layer-detail-inner").html("");
					$(".layer-detail-inner").html(data);
				});
			}
			//console.log(target);
			//console.log(targetParent);
			//console.log(notTarget);
		
			//$("body").css({"overflow":"hidden", "height":"100%;"});
			
			$("body").addClass("hidden mask-white");

			document.addEventListener('scroll touchmove mousewheel', function(e) {
				e.preventDefault();
				e.stopPropagation();
				return false;
			}, {
				passive:true
			});

			$('.layer-contents').not(notTarget).removeClass('open');
			$('.layer-contents .layer-detail-box').not(notTarget).removeClass('open');

			$(target).addClass('open');
			$(targetParent).addClass('open');

			$('.layer-contents .layer-detail-box'+target).scrollTop(0);
		});
	},
	layerContentsClose : function(){

		$('[data-button="btn-close-layer"]').on("click", function(e) {

			e.preventDefault();

			var targetParents = $(this).attr("data-target-parents");
			var notTarget = $(this).attr("data-not-target");

			/*
			$("body").css({"overflow-x":"hidden", "overflow-y":"auto", "height":"auto"});

			$('body').off('scroll touchmove mousewheel');
			
			$("body").removeClass("layer-opened");

			$(targetParents).removeClass('open');
			$('.layer-contents .layer-detail-box').not(notTarget).removeClass('open');
			*/

			if($("#menu").hasClass("open")){
                $("body").removeClass("mask-white");
            } else {
                $("body").removeClass("hidden mask-white");
            }

            $(targetParents).removeClass('open');
            $('.layer-contents .layer-detail-box').not(notTarget).removeClass('open');

		});
	},

	removeHrefNull : function() {
		$('a[href="#"]').on('click', function(e){
			e.preventDefault();
		});
	},
	
	/**
	 * 셀렉트 변경시 링크이동
	 */
	initSelectLinkMove: function() {
		$('[data-select="select-link-move"]').change( function() {
			window.open($(this).val(),'_blank');
		});

		$('[data-select="select-link-move-self"]').change( function() {
			window.open($(this).val(),'_self');
		});
	},

	/**
	 * 마우스 클릭시 비디오 팝업
	 */
	initVideoPopup: function() {
		$('[data-button="play-video"]').magnificPopup({
			type : 'iframe',
			iframe: {
				markup: '<div class="mfp-iframe-scaler">'+
					'<div class="mfp-close"></div>'+
					'<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>'+
					'</div>',
				patterns: {
					youtube: {
						index: 'youtu.be/',
						id:'youtu.be/',
						src: '//www.youtube.com/embed/%id%?autoplay=1' // URL that will be set as a source for iframe.
					}
				}
			}
		});
	},

	/**
	 * 공용 팝업
	 */
	initCommonPopup: function() {
		$('[data-button="common-layer-pop"]').magnificPopup({
			type:'inline',
			midClick: true // Allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source in href.
		});
	},

	/**
	 * 공용 탭 init
	 */
	initTab: function() {
		$('[data-toggle="tab"]').each(function(){
			var $el = $(this);
			var $elList = $('[data-toggle="tab-list"]', $el);
			var $elContainer = $('[data-toggle="tab-content-wrap"]', $el);

			//$elList.children().eq(0).addClass('active');
			//$('[data-toggle="tab-content"]', $elContainer).eq(0).addClass('active');

			$('li a', $elList).click(function(e){
				e.preventDefault();

				$(this).parent('li').addClass('active').siblings().removeClass('active');
				var selected = $(this).attr('href');

				$('[data-toggle="tab-content"]', $elContainer).removeClass('active');
				$(selected).addClass('active');
			});
		});
	},

	/**
	 * 숫자앞에 자리수만큼 0을붙임
	 * @param n
	 * @param digits
	 * @returns {string}
	 */

	leadingZeros: function(n, digits) {
		var zero = '';
		n = n.toString();

		if (n.length < digits) {
			for (var i = 0; i < digits - n.length; i++)
				zero += '0';
		}
		return zero + n;
	},
	/**
	 * 체크박스 전체 체크
	 */
	initCheckboxAll : function(){
		$('[data-checkbox]').click(function(){
			var $check = $(this);
			var is_all = ($check.data('checkbox-all') && $check.data('checkbox-all').toString() == 'true');
			var name = $check.data('checkbox');
			var checked = $check.prop('checked');
			var $allCheck = is_all ? $check : $('[data-checkbox="'+name+'"][data-checkbox-all="true"]');

			if( is_all ) {
				$('[data-checkbox="'+name+'"]').prop('checked', checked );
			}
			else {
				$allCheck.prop('checked', $('[data-checkbox="'+name+'"]').not('[data-checkbox-all="true"]').length ==  $('[data-checkbox="'+name+'"]:checked').not('[data-checkbox-all="true"]').length);
			}
		});
	},

	initWbInput : function(){
		$('.wb-input').each(function(){
			var $el = $(this);
			$('.form-control', $el).on('focus', function(){
				$el.addClass('focus hover');
				var placeholder = $(this).attr('data-placeholder');
				$(this).attr('placeholder', placeholder);
			}).on('focusout', function(){
				if( $(this).val().trim().length <= 0 ) $el.removeClass('focus');
				$el.removeClass('hover');
				$(this).removeAttr('placeholder');
			});
		});
	},

	/**
	 * 버튼 클릭시 target 위치로 이동
	 */
	scrollAnimateMove : function(){
		$('[data-button="btn-animate-move"]').on('click', function(e){
			e.preventDefault();
			var target =  $(this).attr("data-target");
			var position = $(target).offset();
			var targetOffset = $(this).attr("data-offset");

			console.log(position);
			console.log(targetOffset);

			if( targetOffset == null ){
				//console.log(null);

				$('html,body').animate({ scrollTop : position.top }, 500);

			} else {

				if($("#nav").hasClass("fixed")){
					$('html,body').animate({ scrollTop : position.top - targetOffset + (5 + "rem" ) }, 500);
				}else{
					$('html,body').animate({ scrollTop : position.top - targetOffset  }, 500);
				}

			}
		});

		return false;
	},

	/**
	 * 셀렉트 박스 모양의 checkbox list
	 */
	selectBoxCheckbox : function(){
		$('[data-toggle="select-checkbox"]').click(function(e) {
			e.preventDefault();
			e.stopPropagation();
			$(this).toggleClass('expanded');
		});


		$('[data-toggle="select-checkbox"] label').click(function(e) {
			e.preventDefault();
			e.stopPropagation();
			$('#'+$(e.target).attr('for')).prop('checked',true);

			var radioVal  = $("input[name='campusList']:checked").val( );
			console.log(radioVal);

			var link = '.ezenac.co.kr/';
			window.location.href = 'https://'+radioVal + link;

		});

		$(document).click(function() {
			$('[data-toggle="select-checkbox"]').removeClass('expanded');

		});
	},

	/**
	/**
	 *  공통 상담 신청 폼 탭
	 */
	commonCounseling : function(){
		$(".lecture-list .item .link").click(function(e){
			e.preventDefault();

			var target = $(this).attr("href");

			if($(this).hasClass("active")){
				//console.log("액티브 있음");
				$(this).removeClass("active");
				$(this).next(".lecture-list-detail").removeClass("active");
			} else {
				//console.log("액티브 없음");
				$(".tab-content .lecture-list-detail, .lecture-list .item .link").removeClass("active");
				$(target).toggleClass("active");
				$(this).toggleClass("active");
			}

			scrollStyle("#common-consulting-box .lecture-list");
		});

		$('#common-consulting-box [data-toggle="counseling-type-select"]').on("change",function(){
			var selectOption = $('#common-consulting-box [data-toggle="counseling-type-select"] option:selected').val();

			if(selectOption =="etc"){
				$("#common-consulting-box .counseling-type-wrap").addClass("show");
				$("#direct-input").focus();
			} else {
				$("#common-consulting-box .counseling-type-wrap").removeClass("show");
			}
		});
	},

	comCounselLectureSelect : function(){
		$('input[name="lecture_name"]').change(function(){
			if(($('input[name="lecture_name"]:checked').length) >= 1 ){ //체크박스 체크 갯수 1이상일때
				$('#lecture-result').show(); //선택된 리스트 보여줌
				if($('#lecture-result').find('.select-lecture-list').length <= 0 ){ //선택된 리스트 안에 ul없을때
					$('#lecture-result').append("<ul class='select-lecture-list'></ul>"); //ul 추가
				}
			} else { //체크박스 체크 갯수 1이상 아닐때
				$('#lecture-result').empty().hide(); //선택된 리스트 비움
			}

			if($(this).is(":checked")){ // checkbox가 체크인 경우

				var value = $(this).val(); //체크박스 value 가져옴
				var valuebeforeStr = value;
				//var valueafterStr = valuebeforeStr.split('|'); //체크박스 value | 문자열 기준으로 나눔

				var li = $("<li>")  //체크가 된 강좌를 추가 li 태그로 추가
					.addClass('select-item')
					.attr('data-value',value) // data-value에 value 값 동일하게 넣어줌
					.append( $('<span>').html(value) )  // span에 나눈 문자열 첫번째꺼만 넣어줌
					.append( $('<a>').attr('href','#').text('닫기').addClass('delete-btn').on('click',function(e){ //삭제버튼 추가
						e.preventDefault();
						Application.comCounselLectureSelectDelete( $(this).parent().attr('data-value') );
					}) ) ;

				$("#lecture-result > ul").append(li);

				Application.lectureCount++;

			} else { //checkbox가 체크해제인 경우
				var value = $(this).val(); //체크 해제된 value
				$('#lecture-result > ul').find('li.select-item[data-value="'+value+'"]').remove(); //선택된 리스트 중에 data-value 값이 value인것을 찾아 지워준다
				Application.lectureCount--;

			}

			//console.log(Application.lectureCount);
		});
	},

	comCounselLectureSelectDelete : function(value){
		$('#lecture-result > ul').find('li.select-item[data-value="'+value+'"]').remove();
		$('input[name="lecture_name"][value="'+value+'"]').removeAttr('checked').next('label').removeClass('on');

		Application.lectureCount--;

		// $(".totalP span.total-select").html(lecture_count+"개 과목"); //선택한 과목 텍스트로 보여줌.

		if(Application.lectureCount == 0){ //선택된 강좌가 0일때 선택된 강좌 리스트 지운다
			$('#lecture-result').empty().hide();
			$('#lecture-result ul.select-lecture-list').remove();
		}

		return false;
	},

	textAreaAutoHeight : function(){
		var textEle = $('textarea');
		textEle[0].style.height = 'auto';
		var textEleHeight = textEle.prop('scrollHeight');
		textEle.css('height', textEleHeight);
	},
	
	commonAccordion : function(){

		$('[data-toggle="btn-common-accordion"]').click(function(e) {
			e.preventDefault();

			var element = $(this).attr("data-parents");

			var target = $(this).attr("data-target");

			//console.log("element -" + element);

			//console.log("target -" + target);

			if ($(target).is(':visible')) {
				$(target).slideUp(350);
				$(this).removeClass("open");
				$(target).removeClass("open");
			} else {
				$(element+' [data-toggle="contents-common-accordion"]').slideUp(350);
				$(element+' [data-toggle="btn-common-accordion"]').removeClass("open");
				$(element+' [data-toggle="contents-common-accordion"]').removeClass("open");
				$(this).addClass("open");
				$(target).slideDown(350);
				$(target).addClass("open");
			}

			var position = $(e.target).offset();
			var targetOffset = $(this).attr("data-offset");

			//console.log(targetOffset);
			if( targetOffset != null){
				//console.log("null 아닐때");
				$('html,body').animate({ scrollTop : position.top - targetOffset  }, 500);
			}

		});
	},

};

// swiper slider 랜덤
function returnIndex(slidElement){
	//console.log("random");
	var randomIndex = Math.floor(Math.random()*($(slidElement+' .swiper-slide:not(.swiper-slide-duplicate)').length));
	return parseInt(randomIndex);
}

function swiperAutoplayStop(el){
	el.autoplay.stop();
	//console.log("오토플레이 정지");
}

function swiperAutoplayStart(el) {
	el.autoplay.start();
	//console.log("오토플레이 시작");
}

function closePopup() {
	$.magnificPopup.close();
}

function scrollStyle(target){
	$(target).mCustomScrollbar({
		theme:"minimal-dark",
		scrollbarPosition:"inside",
		scrollButtons:{
			enable:false,
		},
		autoExpandScrollbar:false,
		autoDraggerLength:true,
		autoHideScrollbar:false,
		alwaysShowScrollbar: 0,
		mouseWheel:{
			preventDefault:true,
		},
		advanced:{
			autoExpandHorizontalScroll:false,
			updateOnContentResize: true,
			updateOnImageLoad:true,
			releaseDraggableSelectors:target
		}
	});

	$(target).removeClass("mCustomScrollbar");
	$(target).css("-webkit-overflow-scrolling", "touch");

}

function getParameterByName(name) {
	name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
		results = regex.exec(location.search);
	return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}


$(function(){
	Application.init();
});

var validation = {
	init: function() {
		this.initSubmit();
	},
	initSubmit : function (){

		$('[data-form="validation"]').on("submit", function(e) {
			var $form = $(this);
			var returnState = true;

			return validateForm(f);
		});
	},

	initClearForm : function(target) {
		$(target).each(function (i) {
			var type = this.type,
				tag = this.tagName.toLowerCase();
			if (tag === 'form') {
				return validation.initClearForm($(':input', this));
			}
			/* type === 'hidden' || */
			if ( type === 'text' || type === 'password' || tag === 'textarea') {
				this.value = '';
			} else if (type === 'checkbox' || type === 'radio') {
				this.checked = false;
			} else if (tag === 'select') {
				this.selectedIndex = 0;
			}
		});
	}
};




var tag = document.createElement('script');
tag.src = "https://www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;

function onYouTubeIframeAPIReady(num) {
    var vod_code = $("#video" + num).attr('data-code');
    var vod_width = $("#video" + num).attr('data-video-width');
    var vod_height = $("#video" + num).attr('data-video-height');

    player = new YT.Player("video" + num , {
        height: vod_height,
        width:  vod_width,
        videoId: vod_code,
        playerVars: { 'origin':'http://ezenac.co.kr/', 'autoplay': 1, 'controls': 1, 'php5': 1, 'wmode':'opaque', 'rel' : 0,'showinfo' : 0},
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
    event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var playDone = false;
function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !playDone) {
        //setTimeout(stopVideo, 6000);
        playDone = true;
        //console.log("재생");
    }else {
        playDone = false;
    }
}
function stopVideo() {
    player.stopVideo();
}


//# sourceMappingURL=common.js.map
