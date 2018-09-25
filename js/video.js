const bofqiWidth = 638, bofqiHeight = 405;
let $bofqiContainer, $bofqi, $zoomIn, $zoomOut;
let zoom = {};

function Main() {
	$('<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">').prependTo($("head"));

	SetSideMenu();
	window.localStorage.b_miniplayer = '0';

	$bofqi = $("#bofqi");
	let $bilibiliPlayer = $("#bilibiliPlayer", $bofqi);
	// console.log($bofqi.prop('outerHTML'));

	CreateFramework();

	let observer = new MutationObserver((records)=>{
		$("#app .float-nav, #entryOld, #live_recommand_report, #slide_ad").remove();
		RemoveHeader();
		// $("#danmukuBox").remove(); //删掉的话切换分P会没弹幕
		// $("#app").remove();
		Decorate();
		observer.disconnect();
	});
	observer.observe($("#reco_list")[0], {
		'childList': true,
		'subtree': true
	});

	let bilibiliPlayerObserver = new MutationObserver((records)=>{
		let $bilibiliPlayer = $("#bilibiliPlayer", $bofqi);
		if($bilibiliPlayer.hasClass('mode-miniscreen'))
			$bilibiliPlayer.removeClass('mode-miniscreen');
	});
	bilibiliPlayerObserver.observe($bilibiliPlayer[0], {
		attributes: true,
		attributeFilter: ['class']
	});
}

function CreateFramework() {
	console.info($('#v_desc').prop('innerHTML'));

	$container = $(`
	<div id="BT-videopage">
		<div class="l-con">
			<div id="bofqi_container" class="container">
				<div class="pop-panel">
					<div class="popout"></div>
					<div class="popin"></div>
				</div>
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
		<div class="video-page-mask"></div>
	</div>
	`);
	$('body').append($container);

	$bofqiContainer = $('#bofqi_container', $container);

	//计算播放器容器高度，宽度足够时显示完整播放器，否则遮挡住弹幕输入框
	if( $bofqiContainer.width() < bofqiWidth){
		$bofqiContainer.addClass('small-player');
		let bofqiContainerWidth = $bofqiContainer.width();
		$bofqiContainer.height( bofqiContainerWidth * 9 /16 );
		let $bofqiPanel = $(".pop-panel", $bofqiContainer);
		let scale = bofqiContainerWidth / bofqiWidth;
		$bofqiPanel.css('zoom', scale);

		let $popout = $(".popout", $bofqiContainer);
		let $popin = $(".popin", $bofqiContainer);
		$popout.click(()=>{
			$bofqiPanel.addClass('poped');
			$bofqiPanel.css({
				'position': 'fixed',
				'transform': `scale(${scale}) translate(${60 / scale}px, ${$bofqiContainer.offset().top / scale}px)`,
				'zoom': 0
			});
			setTimeout(() => {
				$bofqiPanel.css({
					'transform': `translate( ${(window.innerWidth - bofqiWidth) / 2}px, ${(window.innerHeight - bofqiHeight) / 2}px )`,
				    'transition': 'transform 0.5s'
				});
			}, 0);
		});

		$popin.click(()=>{
			$bofqiPanel.removeClass('poped');
			$bofqiPanel.css('transform', `scale(${scale}) translate(${60 / scale}px, ${$bofqiContainer.offset().top / scale}px)`);
		});
		$bofqiPanel.on('transitionend', (e)=>{
			if(e.currentTarget != e.target)
				return;
			if(!$bofqiPanel.hasClass('poped')){
				$bofqiPanel.css({
					'transform': 'none',
				    'transition': 'none',
				    'position': 'static',
				    'zoom': scale
				});
			}
		})
	}
	else
		$bofqiContainer.height( bofqiHeight);
}

function Decorate() {
	$(".video-page-mask", $container).remove();

	//播放器
	$bofqi = $("#bofqi");
	$recoListContainer = $("#reco_list_container", $container);

	//工具栏
	let $toolbar = $("#arc_toolbar_report");
	$(".more-ops-list li", $toolbar).eq(1).prepend('<div class="van-watchlater van-watchlater-icon"></div>');
	$(".more-ops-list li", $toolbar).eq(2).remove();
	$(".more-ops-list li", $toolbar).eq(0).remove();
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
		// $(".comment-total", $switchTag).text( $("#comment .b-head .results", $container).text());
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

	$("#bofqi").prependTo($('#bofqi_container .pop-panel', $container));
	$viewboxReport.appendTo($("#viewbox_report_container", $container));
	// console.log($("#arc_toolbar_report").prop('outerHTML'));
	$("#arc_toolbar_report_container", $container).append( $toolbar);
	$("#v_tag").appendTo($('#v_tag_container', $container));
	$("#v_desc").appendTo($('#v_desc_container', $container));
	$("#comment").appendTo($('#comment_container', $container));
	$("#v_upinfo").appendTo($('#v_upinfo_container', $container));
	$("#multi_page").appendTo($('#multi_page_container', $container));
	$("#reco_list").appendTo($recoListContainer);

	//切换视频时，评论数清零，相关视频复位，视频信息收起 
	let titleObserver = new MutationObserver((records)=>{
		$(".comment-total", $switchTag).text( $("#comment .b-head .results", $container).text());
		$recoListContainer.scrollTop(0);
		$('.l-con', $container).scrollTop(0);
		$btInfo.removeClass('more-info');
	});
	// titleObserver.observe($("#comment .b-head .results")[0], {
	titleObserver.observe($("#viewbox_report .video-title .tit", $container)[0], {
		characterData: true,
		childList: true
	});
}

if(true)
	Main();