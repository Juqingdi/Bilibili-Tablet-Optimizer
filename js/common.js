const $app = $("#app");
let $sideMenu;
let status = {active: 'none', current: 0};
let $menus, $popups;

$.fn.onSwipeRight = function( callback){
	$(this).on("touchstart", function(e) {
		startX = e.originalEvent.changedTouches[0].pageX,
		startY = e.originalEvent.changedTouches[0].pageY;
	});
	$(this).on("touchend", function(e) {
		moveEndX = e.originalEvent.changedTouches[0].pageX,
		moveEndY = e.originalEvent.changedTouches[0].pageY,
		X = moveEndX - startX,
		Y = moveEndY - startY;

		if ( X >= 30 && Math.abs(X) > Math.abs(Y) && X > 0 ){
			console.log(startX, moveEndX, X);
			callback();
		}
	});
}

/*$.fn.onSwipe = function( direction = '', callback = null){
	if( direction === '' || callback === null)
		return;
	$(this).on("touchstart", function(e) {
		startX = e.originalEvent.changedTouches[0].pageX,
		startY = e.originalEvent.changedTouches[0].pageY;
	});
	$(this).on("touchend", function(e) {
		moveEndX = e.originalEvent.changedTouches[0].pageX,
		moveEndY = e.originalEvent.changedTouches[0].pageY,
		X = moveEndX - startX,
		Y = moveEndY - startY;

		if( direction === 'right'){
			if ( X >= 30 && Math.abs(X) > Math.abs(Y) )
				callback();
		}
		else if( direction === 'left'){
			if ( -X >= 30 && Math.abs(X) > Math.abs(Y) )
				callback();
		}
	});
	return this;
}*/

$.fn.onSwipe = function( callback){
	if( !(callback && typeof(callback)==="function"))
		return;
	$(this).on("touchstart", function(e) {
		startX = e.originalEvent.changedTouches[0].pageX,
		startY = e.originalEvent.changedTouches[0].pageY;
	});
	$(this).on("touchend", function(e) {
		moveEndX = e.originalEvent.changedTouches[0].pageX,
		moveEndY = e.originalEvent.changedTouches[0].pageY,
		X = moveEndX - startX,
		Y = moveEndY - startY;

		if ( X >= 30 && Math.abs(X) > Math.abs(Y) )
			callback('right');
		else if ( -X >= 30 && Math.abs(X) > Math.abs(Y) )
			callback('left');
	});
	return this;
}

function RemoveHeader() {
	// console.log($(".bili-header-m").prop('outerHTML'));
	$(".bili-header-m").remove();
	// $(".bili-header-m").hide();
}

function getCookie(name){ 
	let strCookie=document.cookie; 
	let arrCookie=strCookie.split("; "); 
	for(let i=0;i<arrCookie.length;i++){ 
		let arr=arrCookie[i].split("="); 
		if(arr[0]==name)
			return arr[1]; 
	} 
	return ""; 
}

function If_Html(statement, html1, html2 = '') {
	return statement ? html1: html2;
}

// function SetSideMenu( current = -1, schemeUrl = '') {
function SetSideMenu( ...option) {
	$("body").addClass('BT-optimized');
	
	let current = -1;
	let schemeUrl = '';
	for (var i = option.length - 1; i >= 0; i--) {
		if($.type(option[i]) === 'number')
			current = option[i];
		else if($.type(option[i]) === 'string')
			schemeUrl = option[i];
	}
	let userid = '';
	// if(localStorage.time_tracker)
		// userid = localStorage.time_tracker.substr( localStorage.time_tracker.indexOf('{') + 2, localStorage.time_tracker.indexOf(':') - 3 );
	userid = getCookie('DedeUserID');		
	// console.warn(userid);
	$sideMenu = $((`
		<div id="BT-sidemenu">
			<ul class="submenu submenu1">
				<li>
					<i class="BT-iconfont icon-home"></i>
					<p>首页</p>
					<a href="//www.bilibili.com/"></a>
				</li>
				<li class="channels">
					<i class="BT-iconfont icon-category"></i>
					<p>分区</p>
				</li>
				<li class="updatings">
					<i class="BT-iconfont icon-updatings"></i>
					<p>动态</p>
					<a href="//t.bilibili.com/?tab=8"></a>
				</li>
				<li>
					<i class="BT-iconfont icon-discovery"></i>
					<p>搜索</p>
					<a href="//search.bilibili.com"></a>
				</li>
			</ul>
			${If_Html(userid, `
			<ul class="submenu submenu2">
				<li class="my">
					<i class="BT-iconfont icon-my"></i>
					<p>我的</p>
				</li>
				<li>
					<i class="BT-iconfont icon-history"></i>
					<p>历史</p>
					<a href="//www.bilibili.com/account/history"></a>
				</li>`, `
			<ul class="submenu submenu2">
				<li class="my">
					<i class="BT-iconfont icon-my"></i>
					<p>我的</p>
					<a href="//passport.bilibili.com/login"></a>
				</li>
				<li>
					<i class="BT-iconfont icon-history"></i>
					<p>插件说明</p>
				</li>`)}
				<li class="open-in-app" ${If_Html( schemeUrl === '', 'style=display:none')}>
					<i class="BT-iconfont icon-app"></i>
					<p>App内打开</p>
					<a href="bilibili://${schemeUrl}"></a>
				</li>
			</ul>
			<ul class="popup popup-channels">
				<li>
					<i class="douga"></i>
					<p>动画</p>
					<a href="//m.bilibili.com/channel/1.html"></a>
				</li>
				<li>
					<i class="anime"></i>
					<p>番剧</p>
					<a href="//m.bilibili.com/channel/13.html"></a>
				</li>
				<li>
					<i class="guochuang"></i>
					<p>国创</p>
					<a href="//m.bilibili.com/channel/167.html"></a>
				</li>
				<li>
					<i class="music"></i>
					<p>音乐</p>
					<a href="//m.bilibili.com/channel/3.html"></a>
				</li>
				<li>
					<i class="dance"></i>
					<p>舞蹈</p>
					<a href="//m.bilibili.com/channel/129.html"></a>
				</li>
				<li>
					<i class="game"></i>
					<p>游戏</p>
					<a href="//m.bilibili.com/channel/4.html"></a>
				</li>
				<li>
					<i class="technology"></i>
					<p>科技</p>
					<a href="//m.bilibili.com/channel/36.html"></a>
				</li>
				<li>
					<i class="life"></i>
					<p>生活</p>
					<a href="//m.bilibili.com/channel/160.html"></a>
				</li>
				<li>
					<i class="kichiku"></i>
					<p>鬼畜</p>
					<a href="//m.bilibili.com/channel/119.html"></a>
				</li>
				<li>
					<i class="fashion"></i>
					<p>时尚</p>
					<a href="//m.bilibili.com/channel/155.html"></a>
				</li>
				<li>
					<i class="ad"></i>
					<p>广告</p>
					<a href="//m.bilibili.com/channel/165.html"></a>
				</li>
				<li>
					<i class="ent"></i>
					<p>娱乐</p>
					<a href="//m.bilibili.com/channel/5.html"></a>
				</li>
				<li>
					<i class="cinephile"></i>
					<p>影视</p>
					<a href="//m.bilibili.com/channel/181.html"></a>
				</li>
				<li>
					<i class="cinema"></i>
					<p>放映厅</p>
					<a href="//m.bilibili.com/channel/23.html"></a>
				</li>
			</ul>
			${If_Html(userid, `
			<ul class="popup popup-my">
				<li>
					<a target="_blank" href="//account.bilibili.com/account/home">个人中心</a>
				</li>
				<li>
					<a target="_blank" href="//account.bilibili.com/account/big">大会员</a>
				</li>
				<li>
					<a target="_blank" href="//account.bilibili.com/account/points">会员积分</a>
				</li>
				<li>
					<a target="_blank" href="//link.bilibili.com/p/center/index">我的直播</a>
				</li>
				<li>
					<a href="//space.bilibili.com/${userid}/#/fans/follow">我的关注</a>
				</li>
				<li>
					<a href="//space.bilibili.com/${userid}/#/favlist">我的收藏</a>
				</li>
				<li>
					<a href="//www.bilibili.com/watchlater/#/list">稍后再看</a>
				</li>
				<li>
					<a href="//message.bilibili.com">消息中心</a>
					<span class="message-num"></span>
				</li>
				<li>
					<a target="_blank" href="//pay.bilibili.com/paywallet-fe/bb_balance.html">我的钱包</a>
				</li>
				<li class="option">
					<a href="javascript:;">插件说明</a>
				</li>
			</ul>`)}
		</div>
		`).trim());
	$menus = $("ul.submenu1 li, ul.submenu2 li", $sideMenu);
	// console.log($menus);
	$popups = $("ul.popup", $sideMenu);

	status.current = current;
	SyncStatus();
	$("ul.submenu1 li.channels", $sideMenu).on('touchstart', (e)=>{
		e.stopPropagation();
		status.active = (status.active !== 'channels') ? 'channels' : 'none';
		SyncStatus();
	});
	if(userid){
		$("ul.submenu2 li.my", $sideMenu).on('touchstart', (e)=>{
			e.stopPropagation();
			status.active = (status.active !== 'my') ? 'my' : 'none';
			SyncStatus();
		});
	}
	$popups.on('touchstart', (e)=>{
		e.stopPropagation();
	});
	$('body').on('touchstart', (e)=>{
		status.active = 'none';
		SyncStatus();
	});

	let $option = $("ul.popup-my li.option a", $sideMenu);
	let $iframe = null;
	$option.click(()=>{
		if($iframe === null){
			$iframe = $(`<iframe id="BT-option-iframe" scrolling="no"></iframe>`);
			$("body").append($iframe);
		}

		// chrome.runtime.sendMessage({option:true});
		$iframe.attr('src', chrome.extension.getURL('popup.html')).show();
	});

	// $app.after( $sideMenu);
	$('body').append( $sideMenu);
}

function SetSchemeUrl(url) {
	let $openInApp = $("ul.submenu2 li.open-in-app", $sideMenu);
	$openInApp.show();
	$("a", $openInApp).attr('href', `bilibili://${url}`);
}

function SyncStatus() {
	// console.log(status);
	// console.log($("ul.submenu1 li"), $sideMenu);
	$menus.each((index, ele)=>{
		if(index === status.current)
			$(ele).addClass('current');
		else
			$(ele).removeClass('current');
		if($(ele).hasClass( status.active))
			$(ele).addClass('active');
		else
			$(ele).removeClass('active');
	});
	$popups.each((index, ele)=>{
		if($(ele).hasClass( 'popup-' + status.active))
			$(ele).addClass('active');
		else
			$(ele).removeClass('active');
	});

	GetDynamic();
	GetMessage();
}

//从原header中把动态按钮挪过来，然后删了header
function GetDynamic(){
	if($(".bili-header-m").length === 0)
		return;

	let $nav = $(".bili-header-m .nav-con.fr");
	let $playpageDynamic;
	let observer = new MutationObserver((records)=>{
		$playpageDynamic = $('.nav-item[report-id="playpage_dynamic"]', $nav);
		if($playpageDynamic.length > 0){
			$(".submenu1 .updatings", $sideMenu).after( $playpageDynamic);
			$(".bili-header-m").remove();
			observer.disconnect();
		}
	});
	observer.observe($nav[0], {
		subtree: true,
		childList: true
	});
}

//获取消息数目
function GetMessage(){
	$.getJSON('https://message.bilibili.com/api/notify/query.notify.count.do').then((result)=>{
		// console.log(result.data);
		if(result.data){
			let messageNum = 0;
			messageNum += result.data.at_me;
			messageNum += result.data.notify_me;
			messageNum += result.data.praise_me;
			messageNum += result.data.reply_me;
			messageNum += result.data.up;

			if(messageNum > 0){
				$(".popup-my .message-num", $sideMenu).text(messageNum).addClass('active');
				$(".submenu2 .my").addClass('red-dot');
			}
			// $(".popup-my .message-num", $sideMenu).text(12).addClass('active'); //test
			// $(".submenu2 .my").addClass('red-dot'); //test
		}
	});
}

/*function GetDynamic(){
	if($(".bili-header-m").length === 0)
		return;

	let $nav = $(".bili-header-m .nav-con.fr");
	let $playpageDynamic, $playpageMessage;
	let observer = new MutationObserver((records)=>{
		$playpageDynamic = $('.nav-item[report-id="playpage_dynamic"]', $nav);
		$playpageMessage = $('.nav-item[report-id="playpage_message"]', $nav);
		if($playpageDynamic.length > 0 && $playpageMessage.length > 0){
			$(".submenu1 .updatings", $sideMenu).after( $playpageDynamic);
			$(".submenu2 .my", $sideMenu).after( $playpageMessage);
			$(".bili-header-m").remove();
			observer.disconnect();
		}
	});
	observer.observe($nav[0], {
		subtree: true,
		childList: true
	});
}*/

chrome.runtime.sendMessage({turnedOn:true});