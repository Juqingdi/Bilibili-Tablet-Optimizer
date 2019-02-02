function Main() {
	SetSideMenu(0);

	let paths = location.pathname.split('/');
	if(paths.length >= 3 && (/^\+?[1-9][0-9]*$/).test(paths[2]) ){
		//直播内容页
		SetSchemeUrl(`live/${location.pathname.split('/')[2]}`);
		$('body').addClass('live-content');
	}
	else{
		//直播主页
		SetSchemeUrl('livearea');
		let $tag = $(`
		<div class="header-tag">
			<a href="//live.bilibili.com/h5" class="active">直播</a>
			<a href="//www.bilibili.com">推荐</a>
			<a href="//www.bilibili.com/read/home">专栏</a>
		</div>
		`);
		$(".app-ctnr").prepend($tag);
	}

}

chrome.storage.local.get(null, function(data){
	if(data.enablePc && data.optimize)
		Main();
	else
		$("body").addClass('origin');
});