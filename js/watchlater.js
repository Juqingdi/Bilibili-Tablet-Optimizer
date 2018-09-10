function Main() {
	$('<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">').prependTo($("head"));
	// RemoveHeader();
	SetSideMenu(4);

	let observer = new MutationObserver((records)=>{
		let $links = $(".watch-later-list .list-box .av-item .av-pic, .watch-later-list .list-box .av-item .av-about .t");
		$links.each((index, link)=>{
			if(link.href)
				link.href = $(link).attr('href').replace('/watchlater/#', '');
		});

		observer.disconnect();
	});

	observer.observe( $("#viewlater-app")[0], {
		childList: true,
		subtree: true
	});
}

if(true)
	Main();