function Main() {
	$('<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">').prependTo($("head"));
	// RemoveHeader();
	SetSideMenu(3, `search/${GetKeyword()}`);

	window.addEventListener('hashchange', function(event) {
		console.log(event);
	});

	/*CreateFilterMenu();

	chrome.runtime.onMessage.addListener((message, sender, sendResponse)=>{
		// console.log(message);
		if(message.tabChanged === true)
			CreateFilterMenu();
	});*/
	
	let previousLocation = '';
	let observer = new MutationObserver((records)=>{
		// console.log(records);
		if(location.href !== previousLocation){
			console.log('url changed');
			previousLocation = location.href;
			SetSchemeUrl(`search/${GetKeyword()}`);
			CreateFilterMenu();
		}
	});
	observer.observe($("#server-search-app")[0], {
		'subtree': true,
		'childList': true
	});
}

function GetKeyword() {
	if(location.search){
		let parameters = location.search.substr(1).split('&');
		for (let i = parameters.length - 1; i >= 0; i--) {
			if( parameters[i].includes('keyword='))
				return parameters[i].split('=')[1];
		}
		return '';
	}
	else
		return '';
}

/*function CreateFilterMenu(){
	let $filterWrap = $(".filter-wrap");
	let $currentLi;
	if( $filterWrap.length === 0 || $(".filter-menu", $filterWrap).length > 0 )
		return;

	let $filterTypes = $(".filter-type", $filterWrap);
	$(".filter-item:first-child a", $filterTypes).addClass('default');

	let $filterMenu = $(`<ul class="filter-menu clearfix">
		<li data-menu="order">
			<span class="${ $(".filter-type.order li.active a", $filterWrap).hasClass('default') ? '' : 'default' }">${ $(".filter-type.order li.active a", $filterWrap).text() }</span>
			<i class="arrow-down"></i>
			<i class="arrow-up"></i>
		</li>
		<li data-menu="duration">
			<span class="${ $(".filter-type.duration li.active a", $filterWrap).hasClass('default') ? '' : 'default' }">${ $(".filter-type.duration li.active a", $filterWrap).text() }</span>
			<i class="arrow-down"></i>
			<i class="arrow-up"></i>
		</li>
		<li data-menu="tids_1">
			<span class="${ $(".filter-type.tids_1 li.active a", $filterWrap).hasClass('default') ? '' : 'default' }">${ $(".filter-type.tids_1 li.active a", $filterWrap).text() }</span>
			<i class="arrow-down"></i>
			<i class="arrow-up"></i>
		</li>
	</ul>`);
	$filterWrap.prepend( $filterMenu);

	$("li", $filterMenu).click((e)=>{
		$currentLi = $(e.currentTarget);
		// console.log($filterWrap.data('menu'), $currentLi.data('menu'));
		if($currentLi.data('menu') === $filterWrap.attr('data-menu')){
			$filterWrap.attr('data-menu', '');
		}
		else
			$filterWrap.attr('data-menu', $currentLi.data('menu'));
	});
	$filterTypes.click((e)=>{
		let $currentLiSpan = $(`li[data-menu="${$(e.currentTarget).parent().attr('data-menu')}"] span`);
		let $currentA = $(e.target);
		// console.log($currentA);
		$currentLiSpan.text( $currentA.text());
		if( $currentA.hasClass('default') )
			$currentLiSpan.removeClass('default');
		else
			$currentLiSpan.addClass('default');
		$filterWrap.attr('data-menu', '');
	});



	// todo: 点任意地方菜单收起

	
}*/

function CreateFilterMenu(){
	let $filterWrap = $("#server-search-app .filter-wrap");
	if( $filterWrap.hasClass('observed'))
		return;

	let $filterTypes = $(".filter-type", $filterWrap);
	// console.log($filterTypes.prop('outerHTML'));

	let $filterMenuSpan, $filterTypeA;
	let filterMenuHtml = '<ul class="filter-menu">';
	for (let i = 0; i < $filterTypes.length; i++) {
		if($filterTypes.eq(i).css('display') === 'none')
			continue;
		$("li:first-child a", $filterTypes.eq(i)).addClass('default');
		$filterTypeA = $("li.active a", $filterTypes.eq(i));
		if($filterTypeA.length > 0){
			filterMenuHtml += `<li data-menu="${$filterTypes.eq(i).attr('class').substr(21)}">
				<span${ $filterTypeA.hasClass('default') ? ' class="default"' : '' }>${ $filterTypeA.text() }</span>
				<i class="arrow-down"></i>
				<i class="arrow-up"></i>
			</li>`;			
		}
		else{ //专栏标签时可能会出现
			filterMenuHtml += `<li data-menu="category_id">
				<span class="default">全部分区</span>
				<i class="arrow-down"></i>
				<i class="arrow-up"></i>
			</li>`;			
		}
	}
	filterMenuHtml += '</ul>';
	let $filterMenu = $(filterMenuHtml);
	$filterWrap.prepend( $filterMenu);

	$("li", $filterMenu).click((e)=>{
		$currentLi = $(e.currentTarget);
		if($currentLi.data('menu') === $filterWrap.attr('data-menu')){
			$filterWrap.attr('data-menu', '');
		}
		else
			$filterWrap.attr('data-menu', $currentLi.data('menu'));
	});

	let observer = new MutationObserver((records)=>{
		for (let i = $filterTypes.length - 1; i >= 0; i--) {
			$filterMenuSpan = $("li span", $filterMenu).eq(i);
			$filterTypeA = $("li.active a", $filterTypes.eq(i));
			$filterMenuSpan.text( $filterTypeA.text() );
			if($filterTypeA.hasClass('default'))
				$filterMenuSpan.addClass('default');
			else
				$filterMenuSpan.removeClass('default');
			$filterWrap.attr('data-menu', '');
		}
	});
	$filterTypes.each((index, filterType)=>{
		observer.observe( filterType, {
			'subtree': true,
			'attributes': true,
			'attributeFilter': ['class']
		});
	});
	$filterWrap.addClass('observed');
}

if(true)
	Main();