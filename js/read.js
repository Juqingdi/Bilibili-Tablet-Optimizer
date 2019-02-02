function Main() {
	$('<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">').prependTo($("head"));
	$(".report-wrap-module.elevator-module", $app).remove();
	SetSideMenu();

	$("body").attr('id', 'BT-read');

	if(location.pathname.includes('read/cv')){
		//专栏文章页
		SetSchemeUrl(`article/${location.pathname.split('/')[2].substr(2)}`);
		let $upInfo = $(".up-info-holder:not('.BT-new')");
		let $newUpInfo = $('<div class="up-info-holder BT-new"><div class="fixed-box"></div></div>');
		$(".fixed-box", $newUpInfo).append( $(".up-info-block", $upInfo).clone()).append( $(".follow-btn-holder", $upInfo).clone());
		$(".head-container").after( $newUpInfo);
		$(".article-action").after( $upInfo);
	}
	else{
		// 专栏目录页
		if(location.pathname === '/read/home')
			SetSchemeUrl('category/65541');
		$(".page-content .right-side .more").remove();
		let $articleList = $(".page-content .left-side .article-list .article-list-holder");
		let listObserver = new MutationObserver((records)=>{
			let $coverImage;
			let imageSize = $articleList.width() + 'w_120h_1e_1c';
			records.forEach((record, i)=>{
				if(record.addedNodes.length === 0)
					return;
				$coverImage = $(".item-holder .article-content .cover-img .cover-image", $(record.addedNodes[0]));
				$coverImage.after(`<div class="cover-image" style="${ $coverImage.attr('pre-style').replace('234w_176h', imageSize) }"></div>`);
				$coverImage.remove();
			});
		});
		listObserver.observe( $articleList[0], {'childList': true});

		let $leftSide = $(".page-content .left-side");
		let $rightSide = $(".page-content .right-side");
		if($(".categories-bar").length > 0){
			$leftSide.css('margin-top', '50px');
			$rightSide.css('margin-top', '42px');
		}

		let $rightSideFixed = $('<div class="right-side-fixed"></div>');
		$rightSide.children().appendTo( $rightSideFixed);
		$rightSideFixed.appendTo( $rightSide);

		$("body").css('background-color', '#eaeaea');
	}

}

chrome.storage.local.get(null, function(data){
	if(data.enablePc && data.optimize)
		Main();
	else
		$("body").addClass('origin');
});