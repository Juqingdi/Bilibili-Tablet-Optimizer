function Main() {
	$('<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">').prependTo($("head"));
	RemoveHeader();
	$(".report-wrap-module.elevator-module", $app).remove();
	SetSideMenu(4);
}

if(true)
	Main();