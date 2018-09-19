const bofqiWidth = 638, bofqiHeight = 396;
let $bofqiContainer, $bofqi, $zoomIn, $zoomOut;
let zoom = {};

function Main() {
	$('<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">').prependTo($("head"));

	SetSideMenu();
	window.localStorage.b_miniplayer = '0';

	$bofqi = $("#bofqi");
	let $bilibiliPlayer = $("#bilibiliPlayer", $bofqi);
	console.log($bofqi.prop('outerHTML'));

	let observer = new MutationObserver((records)=>{
		$("#app .float-nav, #entryOld").remove();
		RemoveHeader();
		// $("#danmukuBox").remove(); //删掉的话切换分P会没弹幕
		$("#live_recommand_report").remove();
		$("#slide_ad").remove();
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

function Decorate() {

	$container = $(`
		<div id="BT-videopage">
			<div class="l-con">
				<div id="bofqi_container" class="container">
					<div class="popout"></div>
					<div class="popin"></div>
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

	//播放器
	$bofqi = $("#bofqi");

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

	$('body').append($container);

	//计算播放器容器高度，宽度足够时显示完整播放器，否则遮挡住弹幕输入框
	if( $bofqiContainer.width() < 638){
		$bofqiContainer.addClass('small-player');
		let bofqiContainerWidth = $bofqiContainer.width();
		$bofqiContainer.height( bofqiContainerWidth * 9 /16 );
		let scale = bofqiContainerWidth / bofqiWidth;
		$bofqi.css('zoom', scale);

		let $popout = $(".popout", $bofqiContainer);
		$popout.click(()=>{
			$bofqi.css({
				'zoom': 1,
				'position': 'fixed',
				'transform': `scale(${scale})`
			});
			setTimeout(() => {
				$bofqi.css({
					'transition': 'transform 0.5s',
					'transform': 'none'
				});
			}, 0);
		});
	}
	else
		$bofqiContainer.height( 405);
}

if(true)
	Main();