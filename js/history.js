function Main() {
	$('<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">').prependTo($("head"));
	// RemoveHeader();
	SetSideMenu(5);
}

chrome.storage.local.get(null, function(data){
	if(data.enablePc && data.optimize){
		Main();
	}
});