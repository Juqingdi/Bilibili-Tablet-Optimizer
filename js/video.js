const bofqiWidth = 637, bofqiHeight = 396;
let $bofqiContainer, $bofqi, $zoomIn, $zoomOut;
let zoom = {};

function Main() {
	$('<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">').prependTo($("head"));

	SetSideMenu();
	window.localStorage.b_miniplayer = '0';

	let currentNode;
	let observer = new MutationObserver((records)=>{
		records.forEach((record, index)=>{
			if(record.addedNodes.length > 0 && record.addedNodes[0].tagName === 'SCRIPT'){
				currentNode = record.addedNodes[0];
				if(currentNode.src.indexOf('//api.bilibili.com/x/web-show/res/locs') > 0){
				// if(currentNode.src.indexOf('//api.vc.bilibili.com/dynamic_svr/v1/dynamic_svr/dynamic_num') > 0){
					$("#app .float-nav, #entryOld").remove();
					RemoveHeader();
					// $("#danmukuBox").remove(); //删掉的话切换分P会没弹幕
					$("#live_recommand_report").remove();
					$("#slide_ad").remove();
					// $("#app").remove();
					Decorate();
					observer.disconnect();
				}
			}
		});
	});
	observer.observe(document, {
		'childList': true,
		'subtree': true
	});

	$(window).resize(function(e){
		if($bofqiContainer == null)
			return;
		SetZoom();
		if( !$bofqiContainer.hasClass('unzoomed')){
			$bofqi.css({
				'transform': `translate(${zoom.left}px, ${zoom.top}px)`
			});
		}
	});
}

function SetZoom(){
	console.info(`${$bofqiContainer.width()},${window.innerWidth},${window.innerHeight}`);
	zoom.scale = $bofqiContainer.width() / bofqiWidth;
	zoom.left = (window.innerWidth - bofqiWidth) / 2 - 60;
	zoom.top = (window.innerHeight - bofqiHeight) / 2;
	console.info(zoom);
}

function ResetPlayer(){
	let $bilibiliControls = $(".bilibili-player-video-control", $bofqi);
	$("video", $bofqi).attr('controls', true).on('play', ()=>{
		$bilibiliControls.hide();
	}).on('pause', ()=>{
		$bilibiliControls.show();
	});
	// $(".bilibili-player-video-quality-menu", $bofqi).off('mouseover mouseenter click');
}

function Decorate() {

	$container = $(`
		<div id="BT-videopage">
			<div class="l-con">
				<div id="bofqi_container" class="container">
					<div class="zoomin"></div>
				</div>
				<div id="arc_toolbar_report_container" class="container"></div>
				<div id="BT-info" class="container">
					<div id="viewbox_report_container"></div>
					<div id="v_desc_container"></div>
					<button class="BT-more"></button>
				</div>
				<div id="multi_page_container" class="container"></div>
				<div id="v_tag_container" class="container"></div>
			</div>
			<div class="r-con">
				<div id="v_upinfo_container" class="container"></div>
				<div id="BT-switch_tag" class="comment-active container"">
					<span class="BT-comment"><span class="comment-total"></span> 评论</span>
					<span class="BT-reco">相关视频推荐</span>
				</div>
				<div id="comment_reco">
					<div class="scroll">
						<div id="comment_container" class="container"></div>
						<div id="reco_list_container" class="container"></div>
					</div>
				</div>
			</div>
		</div>
		`);
	$bofqi = $("#bofqi");
	$bofqi.append($(`
		<div class="player-functions">
			<div class="zoomout"></div>
			<a class="open-in-app" href="bilibili://video/${location.pathname.substring( location.pathname.indexOf('/av') + 3, location.pathname.lastIndexOf('/'))}">app中打开<span>推荐</span></a>
		</div>
		`));
	// console.info($bofqi.prop('outerHTML'));
	$(".bilibili-player-video-btn-start, .bilibili-player-video-progress, .bilibili-player-video-time, .bilibili-player-video-btn-volume, .bilibili-player-video-btn-widescreen, .bilibili-player-video-web-fullscreen, .icon-player-feedback, .bilibili-player-video-state", $bofqi).remove();
	ResetPlayer();
	let videoObserver = new MutationObserver((records)=>{
		console.info(records);
		if(records.length > 0 && records[0].addedNodes.length > 0)
			ResetPlayer();
	});
	videoObserver.observe($(".bilibili-player-video", $bofqi)[0], {'childList': true});

	/*let controlObserver = new MutationObserver((records)=>{
		console.info(records);
	});
	controlObserver.observe($(".bilibili-player-video-control", $bofqi)[0], {
		'childList': true,
		'subtree': true
	})*/
	// bilibili-player-video-control






	// 不知为何进不了全屏模式






	/*$(".bilibili-player-video-btn-fullscreen", $bofqi).click((e)=>{
		if(!$(e.currentTarget).hasClass('video-state-fullscreen-off')){
		// if(!document.webkitIsFullScreen){
		// if( !$('#bilibiliPlayer', $bofqi).hasClass('mode-fullscreen') ){
			console.log('进入全屏');
			document.documentElement.webkitRequestFullScreen();
		}
		else{
			console.log('退出全屏');
			document.webkitCancelFullScreen();
		}
	});*/

	//工具栏
	let $toolbar = $("#arc_toolbar_report");
	$(".more-ops-list li", $toolbar).eq(1).remove();
	$(".more-ops-list li", $toolbar).eq(0).prepend('<div class="van-watchlater van-watchlater-icon"></div>');
	$(".more-ops-list", $toolbar).appendTo($(".ops", $toolbar));
	$(".van-icon-general_moreactions, .app, .share", $toolbar).remove();

	//标题与播放量，简介
	let $btInfo = $("#BT-info", $container);
	let $viewboxReport = $("#viewbox_report");
	let $desc = $("#v_desc");
	$(".crumbs .time", $viewboxReport).appendTo( $(".video-data", $viewboxReport));
	$(".crumbs, .rank, .online", $viewboxReport).remove();
	$(".copyright", $desc).remove();
	$btInfo.click(()=>{
		$btInfo.toggleClass('more-info');
	});

	//

	//用户信息
	/*let $upinfo = $("#v_upinfo");
	console.info($(".btn.followed .b-gz .gz", $upinfo).prop('outerHTML'));
	$(".btn.followed .b-gz .gz", $upinfo).prependTo( $(".u-info", $upinfo));*/

	//评论与推荐
	let $commentRecoScroll = $("#comment_reco .scroll", $container);

	//评论
	let $comment = $("#comment");
	let $switchTag = $("#BT-switch_tag", $container);
	let ShowComment = function(){
		$commentRecoScroll.css('transform', 'translateX(0%)');
		$switchTag.addClass('comment-active').removeClass('reco-active');
		$(".comment-total", $switchTag).text( $("#comment .b-head .results", $container).text());
	}
	let ShowRecoList = function(){
		$commentRecoScroll.css('transform', 'translateX(-50%)');
		$switchTag.addClass('reco-active').removeClass('comment-active');
	}
	$(".BT-comment", $switchTag).click( ShowComment);
	$(".BT-reco", $switchTag).click( ShowRecoList);
	// $commentRecoScroll.onSwipe('left', ShowRecoList).onSwipe('right', ShowComment);
	$commentRecoScroll.onSwipe((direction)=>{
		if(direction === 'left')
			ShowRecoList();
		else if(direction === 'right')
			ShowComment();
	});

	$("#bofqi").prependTo($('#bofqi_container', $container));
	$viewboxReport.appendTo($("#viewbox_report_container", $container));
	// console.log($("#arc_toolbar_report").prop('outerHTML'));
	$toolbar.appendTo($('#arc_toolbar_report_container', $container));
	$("#v_tag").appendTo($('#v_tag_container', $container));
	$("#v_desc").appendTo($('#v_desc_container', $container));
	$("#comment").appendTo($('#comment_container', $container));
	$("#v_upinfo").appendTo($('#v_upinfo_container', $container));
	$("#multi_page").appendTo($('#multi_page_container', $container));
	$("#reco_list").appendTo($('#reco_list_container', $container));

	$bofqiContainer = $('#bofqi_container', $container);
	$zoomIn = $(".zoomin", $bofqiContainer);
	$zoomOut = $(".zoomout", $bofqiContainer);

	$('body').append($container);
	$bofqiContainer.height( $bofqiContainer.width() * 9 /16 );

	$bofqi.on('transitionend', (e)=>{
		if(e.currentTarget != e.target)
			return;
		if($bofqiContainer.hasClass('unzoomed')){
			console.info('缩小后');
			$bofqiContainer.css('overflow', 'hidden');
			$bofqi.css({
				'transition': 'none',
				'transform': 'none',
				'zoom': zoom.scale
			});
		}
		else{
			console.log('放大后');
			// $('body').css('overflow','hidden');
			$bofqi.css({
				'position': 'fixed',
				'left': 60
			})
		}
	});

	SetZoom();

	PlayerZoomOut();

	$zoomIn.click( PlayerZoomIn);
	$zoomOut.click( PlayerZoomOut);
}

//播放器缩小
function PlayerZoomOut() {
	$bofqiContainer.addClass('unzoomed');
	$bofqi.css({
		'transform': `scale(${zoom.scale})`,
		'position': 'absolute',
		'left': 0
	});
}
//播放器放大
function PlayerZoomIn() {
	$bofqiContainer.removeClass('unzoomed').css('overflow', 'unset');
	$bofqi.css({
		'zoom': 1,
		'transform': `scale(${zoom.scale})`
	});
	setTimeout(()=>{
		$bofqi.css({
			'transition': 'transform 0.5s ease',
			'transform': `translate(${zoom.left}px, ${zoom.top}px)`,
		});
	}, 1);
}

if(true)
	Main();