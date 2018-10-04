function Main() {
	$('<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">').prependTo($("head"));
	// RemoveHeader();
	$(".report-wrap-module.elevator-module", $app).remove();
	SetSideMenu(0, 'home');

	let $tag = $(`
		<div class="header-tag">
			<a href="//live.bilibili.com/h5">直播</a>
			<a href="javascript:;" class="active">推荐</a>
			<a href="//www.bilibili.com/read/home">专栏</a>
		</div>
		`);
	$app.prepend($tag);

	$(".bili-wrapper .r-con, .zone-module .zone-rank, .sec-rank, .sec-rank-gc").remove();

	// let $carouselBox = $(".carousel-box", $app);
	let $recomment = $(".chief-recommend-module .recommend-module", $app);
	$(".carousel-box", $app).insertAfter( $(".groom-module", $recomment).eq(0));
}

if(true)
	Main();