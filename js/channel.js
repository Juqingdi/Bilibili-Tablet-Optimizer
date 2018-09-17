function Main() {
	$('<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=yes">').prependTo($("head"));
	// RemoveHeader();
	SetSideMenu(1);
	// alert('test');

	if(CheckChannelId(165)){
		//广告栏目
		$(".index__partition__src-partition- .index__specialLine__src-partition-").remove();
	}
	else if(CheckChannelId(23))
		AddCinemaTag(23);
	else if(CheckChannelId(177))
		AddCinemaTag(177);
	else if(CheckChannelId(11))
		AddCinemaTag(11);
	else if(CheckChannelId([13,33,32,51,152]))
		AddAnimeTag();
	else if(CheckChannelId([167,153,168,169,170]))
		AddGuochuangTag();
}

function CheckChannelId(channelId) {
	if(typeof(channelId) === 'number')
		return location.pathname.indexOf( channelId + '.html') >= 0;
	else{
		for (let i = channelId.length - 1; i >= 0; i--) {
			if( location.pathname.indexOf( channelId[i] + '.html') >= 0)
				return true;
		}
		return false;
	}
}

function AddCinemaTag( channelId = 23){
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

function AddAnimeTag() {
	$(".index__scrollContainer__src-partition-secondZone-").append(`
		<a target="_blank" class="index__tab__src-partition-secondZone-tab-" href="//www.bilibili.com/anime/timeline/"><p>新番时间表</p></a>
		<a target="_blank" class="index__tab__src-partition-secondZone-tab-" href="//www.bilibili.com/anime/index/"><p>番剧索引</p></a>
		`);
}

function AddGuochuangTag() {
	$(".index__scrollContainer__src-partition-secondZone-").append(`
		<a target="_blank" class="index__tab__src-partition-secondZone-tab-" href="//www.bilibili.com/guochuang/timeline/"><p>新番时间表</p></a>
		<a target="_blank" class="index__tab__src-partition-secondZone-tab-" href="//www.bilibili.com/guochuang/index/"><p>国产动画索引</p></a>
		`);
}

if(true)
	Main();