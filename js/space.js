function Main() {
	$('<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">').prependTo($("head"));
	// RemoveHeader();

	if(IsThisMySpace())
		SetSideMenu(4);
	else
		SetSideMenu();

	// console.log( $("#navigator-fixed") );
	// space.bilibili.com/286616858/#/dynamic  没有user框 
}

function IsThisMySpace() {
	let currentUserId = location.pathname.slice(1,-1);
	return currentUserId === userid;
}

chrome.storage.local.get(null, function(data){
	if(data.enablePc && data.optimize)
		Main();
	else
		$("body").addClass('origin');
});