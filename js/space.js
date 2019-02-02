function Main() {
	$('<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">').prependTo($("head"));

	if(IsThisMySpace())
		SetSideMenu(4);
	else
		SetSideMenu();
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