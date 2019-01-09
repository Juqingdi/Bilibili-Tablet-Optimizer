function Main() {
	$('<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">').prependTo($("head"));
	// RemoveHeader();
	SetSideMenu(2);

	let $userPanel, $lTagPanel, $noticePanel, $livePanel, $rTagPanel;

	let $homeContent = $(".home-page .home-container .home-content", $app);
	let $leftPanel = $(".left-panel", $homeContent);
	let $centerPanel = $(".center-panel", $homeContent);
	let $rightPanel = $(".right-panel", $homeContent);

	let $rightPanelWrapper = $('<div class="right-panel-wrapper"></div>');

	const observerOption = {'childList': true, 'subtree': true};

	// console.log($("#app ").prop('outerHTML'));
	let panelsObserver = new MutationObserver((records)=>{
		if(!$userPanel || $userPanel.length === 0)
			$userPanel = $(".user-panel", $leftPanel);
		if(!$lTagPanel || $lTagPanel.length === 0)
			$lTagPanel = $(".tag-panel", $leftPanel);
		if(!$noticePanel || $noticePanel.length === 0)
			$noticePanel = $(".notice-panel", $rightPanel);
		if(!$livePanel || $livePanel.length === 0)
			$livePanel = $(".live-panel", $rightPanel);
		if(!$rTagPanel || $rTagPanel.length === 0)
			$rTagPanel = $(".tag-panel", $rightPanel);
		if($userPanel.length > 0 && $lTagPanel.length > 0/* && $noticePanel.length > 0*/ && $livePanel.length > 0 && $rTagPanel.length > 0){ //公告栏有时没有
			panelsObserver.disconnect();
			$rightPanelWrapper.append( $("> div", $rightPanel)).append($userPanel).append($lTagPanel);
			$rightPanelWrapper.appendTo( $rightPanel);
			// console.log($rightPanel.width());
			$rightPanelWrapper.width( $rightPanel.width() - 8);

			/*let rightPanelHeight = 0;
			$(window).scroll(()=>{
				if( !rightPanelHeight){
					rightPanelHeight = $rightPanelWrapper.height();
					console.log('height:', rightPanelHeight);
					$rightPanelWrapper.css('top', -rightPanelHeight);
				}
				if(window.scrollY > rightPanelHeight){
					$rightPanelWrapper.addClass('sticky');
					$rightPanelWrapper.css('transform', `translateY(${ rightPanelHeight - 196 }px)`);
				}
				else{
					$rightPanelWrapper.removeClass('sticky');
					$rightPanelWrapper.css('transform', 'none');
				}
			});*/
		}
	});
	panelsObserver.observe($homeContent[0], observerOption);

	let videosObserver = new MutationObserver((records)=>{
		console.log('records.length:',records.length);
		let selectedTab = $(".tab-bar .tab .tab-text.selected", $centerPanel).text();
		if( selectedTab === '热门' || selectedTab === '全部' || selectedTab === '小视频' ){
			let $biliPlayers = $(".vc-video", $centerPanel);
			console.log('$biliPlayers.length:', $biliPlayers.length);
			videosObserver.disconnect();
			$biliPlayers.each((index, vcPlayer)=>{
				let $vcPlayer =  $(vcPlayer);
				let $vcCover = $vcPlayer.prev('.vc-cover');
				let $video = $("video", $vcPlayer);
				$video.prop({
					'controls': true,
					'poster': $vcCover.attr('style').match( /(https?|http|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/g )[0],
					'volume': 1,
					'muted': true,
					'preload': 'none'
				});
				// $vcPlayer.html( $video);
				// $vcCover.remove();
				$video.appendTo( $vcPlayer.parent());
				$vcPlayer.remove();
				$vcCover.remove();
			});
			videosObserver.observe($centerPanel[0], observerOption);
		}
	});
	videosObserver.observe($centerPanel[0], observerOption);
}

chrome.storage.local.get(null, function(data){
	if(data.enablePc && data.optimize)
		Main();
	else
		$("body").addClass('origin');
});