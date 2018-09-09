const bofqiWidth = 637, bofqiHeight = 426;
let containerWidth;
let $bofqiContainer, $bofqi, $zoomIn, $zoomOut;
let zoom = {};

function Main() {
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
				}
			}
		});
	});
	observer.observe(document, {
		'childList': true,
		'subtree': true
	});

	zoom.scale = bofqiWidth / window.innerWidth;
	zoom.left = (window.innerWidth - bofqiWidth) / 2;
	zoom.top = (window.innerHeight - bofqiHeight) / 2;

	$(window).resize(function(e){
		zoom.scale = bofqiWidth / window.innerWidth;
		zoom.left = (window.innerWidth - bofqiWidth) / 2;
		zoom.top = (window.innerHeight - bofqiHeight) / 2;
		if( !$bofqiContainer.hasClass('unzoomed')){
			$bofqi.css({
				'left': zoom.left,
				'top': zoom.top
			});
		}
	});
}

function Decorate() {

	$container = $(`
		<div id="BT-videopage">
			<div class="l-con">
				<div id="bofqi_container">
					<div class="zoomin"></div>
					<div class="zoomout"></div>
				</div>
				<div id="reco_list_container"></div>
			</div>
			<div class="r-con">
				<div id="v_tag_container"></div>
				<div id="v_desc_container"></div>
				<div id="comment_container"></div>
				<div id="v_upinfo_container"></div>
				<div id="multi_page_container"></div>
			</div>
		</div>
		`);
	$bofqi = $("#bofqi");
	$(".bilibili-player-video-volumebar-wrp, .bilibili-player-video-btn-widescreen, .bilibili-player-video-web-fullscreen, .icon-player-feedback", $bofqi).remove();
	$("#bofqi").prependTo($('#bofqi_container', $container));
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
		console.info('transitionend');
		if($bofqiContainer.hasClass('unzoomed') && e.originalEvent.propertyName === 'transform'){
			console.info('缩小后');
			$bofqiContainer.css('overflow', 'hidden');
			$bofqi.css({
				'transition': 'none',
				'transform': 'none',
				'zoom': zoom.scale
			});
		}
	});

	PlayerZoomOut();

	$zoomIn.click( PlayerZoomIn);
	$zoomOut.click( PlayerZoomOut);
}

//播放器缩小
function PlayerZoomOut() {
	$bofqiContainer.addClass('unzoomed');
	$bofqi.css({
		'transform': `scale(${zoom.scale})`
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
			'transition': 'all 0.5s ease',
			'transform': `translate(${zoom.left}px, ${zoom.top}px)`,
		});
	}, 1);
}

if(true)
	Main();