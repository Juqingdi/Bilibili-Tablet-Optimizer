function Main() {
	// $('<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=yes">').prependTo($("head"));
	// RemoveHeader();
	SetSideMenu(0);
	// alert('test');

	let paths = location.pathname.split('/');
	if(paths.length >= 3 && (/^\+?[1-9][0-9]*$/).test(paths[2]) ){
		// console.log('content');
		$('body').addClass('live-content');
	}
	else{
		// console.log('index');
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

if(true)
	Main();