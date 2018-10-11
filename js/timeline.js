//应用于 新番时间表 与 番剧 页面

function Main() {
	// alert('pause');
	// $('<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=yes">').prependTo($("head"));
	// RemoveHeader();
	// SetSideMenu(0);
	// alert('test');

	$(".bili-footer").remove();

	let $tags = $("#app .bread-crumb ul li a, #app .bangumi-index-crumb ul li a");
	if(location.pathname.indexOf('/anime/') >= 0){
		$tags[0].href = '//m.bilibili.com/channel/13.html';
		$tags[1].href = '//m.bilibili.com/channel/33.html';
		$tags[2].href = '//m.bilibili.com/channel/32.html';
		$tags[3].href = '//m.bilibili.com/channel/51.html';
		$tags[4].href = '//m.bilibili.com/channel/152.html';
	}
	else if(location.pathname.indexOf('/guochuang/') >= 0){
		$tags[0].href = '//m.bilibili.com/channel/167.html';
		$tags[1].href = '//m.bilibili.com/channel/153.html';
		$tags[2].href = '//m.bilibili.com/channel/168.html';
		$tags[3].href = '//m.bilibili.com/channel/169.html';
		$tags[4].href = '//m.bilibili.com/channel/170.html';
	}

	//添加左右滑动事件
	if(location.pathname.indexOf('/timeline') >= 0){
		let $timelineHeader = $('.timeline-container .timeline-header');
		if($(".arrow-left, .arrow-right", $timelineHeader).length === 2){
			$(".timeline-container").onSwipe((direction)=>{
				if(direction === 'left')
					$(".arrow-right", $timelineHeader).click();
				else if(direction === 'right')
					$(".arrow-left", $timelineHeader).click();
			});
		}
		else{
			let observer = new MutationObserver((records)=>{
				if($(".arrow-left, .arrow-right", $timelineHeader).length === 2){
					observer.disconnect();
					$(".timeline-container").onSwipe((direction)=>{
						if(direction === 'left')
							$(".arrow-right", $timelineHeader).click();
						else if(direction === 'right')
							$(".arrow-left", $timelineHeader).click();
					});
				}
			});
			observer.observe( $timelineHeader[0], {
				childList: true
			});
		}
	}
}

chrome.storage.local.get(null, function(data){
	if(data.enablePc && data.optimize)
		Main();
	else
		$("body").addClass('origin');
});