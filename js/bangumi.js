function Main() {
	// $('<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">').prependTo($("head"));

	if(location.pathname.includes('/play/ep'))
		SetSideMenu(`bangumi/season/${GetId()}`); //新番播放页
	else if(location.pathname.includes('media/md'))
		SetSideMenu(`pgc/review/${GetId()}`); //新番信息页

	$(".BT-iconfont", $sideMenu).css('cssText', 'font-family:"BT-iconfont" !important;');
}

//可同时用于ssid与mdid
function GetId() {
	let metaUrl = $('meta[property="og:url"]').attr('content');
	metaUrl = metaUrl.split('/');
	return metaUrl[5].substr(2);
}

chrome.storage.local.get(null, function(data){
	if(data.enablePc && data.optimize)
		Main();
	else
		$("body").addClass('origin');
});