function Main() {
	$('<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=yes">').prependTo($("head"));
	// RemoveHeader();
	SetSideMenu(1);
	// alert('test');

	if(location.pathname.indexOf('165.html') > 0){
		//广告栏目
		$(".index__partition__src-partition- .index__specialLine__src-partition-").remove();
	}
	else if(location.pathname.indexOf('23.html') > 0)
		AddTag(23);
	else if(location.pathname.indexOf('177.html') > 0)
		AddTag(177);
	else if(location.pathname.indexOf('11.html') > 0)
		AddTag(11);
}

function AddTag( channelId = 23){
	$("#page .index__partBox__src-partition-zone-").css({
		'padding-top': '1px',
		'border-top': '1px solid #fff'
	});
	let tagHtml = '<div class="header-tag">';
	if(channelId === 23)
		tagHtml += '<a href="javascript:;" class="active">电影</a>';
	else
		tagHtml += '<a href="//m.bilibili.com/channel/23.html">电影</a>';
	if(channelId === 177)
		tagHtml += '<a href="javascript:;" class="active">记录片</a>';
	else
		tagHtml += '<a href="https://m.bilibili.com/channel/177.html">记录片</a>';
	if(channelId === 11)
		tagHtml += '<a href="javascript:;" class="active">电视剧</a>';
	else
		tagHtml += '<a href="//m.bilibili.com/channel/11.html">电视剧</a>';
	tagHtml += '</div>';
	$("#page .index__partition__src-partition-").prepend(tagHtml);
}

if(true)
	Main();