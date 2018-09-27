if(location.hostname !== 'passport.bilibili.com'){ //此行本不需要，但manifest里的过滤不起效果
	let t = document.createElement("script");
	t.type = "text/javascript";
	t.id = "myJS";
	t.text = `
	navigator.__defineGetter__('userAgent', function() {
	    return 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 YaBrowser/18.4.1.513.00 Safari/537.36';
	});
	console.info('useragent set');
	`;
	let head = document.head || document.documentElement;
	head.appendChild(t);
}

// chrome.runtime.sendMessage({stardustvideo: true});