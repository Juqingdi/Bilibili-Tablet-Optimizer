/*chrome.runtime.onMessage.addListener((message, sender)=>{
	chrome.downloads.download({
		url: message.url,
		filename: message.filename,
		saveAs: true
	});	
});

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.turnedOn === true) {
        chrome.browserAction.setBadgeText({text: ' on ', tabId: sender.tab.id});
    }
});*/

chrome.cookies.set({
	url: 'https://www.bilibili.com/video/*',
	name: 'stardustvideo',
	value: '1',
	domain: '.bilibili.com',
	path: '/',
	expirationDate: (new Date().getTime()/1000) + 365 * 24 * 60 * 60
});
// console.log('cookie set');

chrome.webRequest.onBeforeSendHeaders.addListener( function(request){
	console.log(request.url);
	for (let t = 0,	i = request.requestHeaders.length; t < i; ++t) 
		if ( request.requestHeaders[t].name === "User-Agent") {
			console.log('User-Agent set');
			request.requestHeaders[t].value = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 YaBrowser/18.4.1.513.00 Safari/537.36';
			break;
		}
	return {requestHeaders: request.requestHeaders};
}, {urls: [
	"https://www.bilibili.com/*",
	"https://*.acgvideo.com/*"
]}, ["blocking", "requestHeaders"]);

/*chrome.webRequest.onBeforeRequest.addListener( (request)=>{
	// 请求链接中包含from_extension=1的话，说明是插件发送的，无需拦截
	if( request.url.indexOf('from_extension=1') >= 0 ){
		return {cancel: false};
	}
	else if( request.url.indexOf('dynamic_num') >= 0){
		// console.log(request);
		chrome.tabs.sendMessage(request.tabId, {
			request: 'update',
			url: request.url
		});
		return {cancel: true};
	}
	else
		return {cancel: true};
},{urls: [
	"https://api.vc.bilibili.com/dynamic_svr/v1/dynamic_svr/dynamic_num*",
	"https://message.bilibili.com/api/notify/query.notify.count.do"
]}, ["blocking"] );*/

chrome.webRequest.onBeforeRequest.addListener( (request)=>{
	// 请求链接中包含from_extension=1的话，说明是插件发送的，无需处理
	if( request.url.indexOf('from_extension=1') < 0 ){
		// console.log(request);
		chrome.tabs.sendMessage(request.tabId, {
			request: 'update',
			url: request.url
		});
		return {cancel: true};
	}
},{urls: [
	"https://api.vc.bilibili.com/dynamic_svr/v1/dynamic_svr/dynamic_num*",
]});

/*chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    console.log(details);
    //拦截到执行资源后，为资源进行重定向
    //也就是是只要请求的资源匹配拦截规则，就转而执行returnjs.js
    return {redirectUrl: chrome.extension.getURL("returnjs.js")};
  },
  {
    //配置拦截匹配的url，数组里域名下的资源都将被拦截
    urls: [
        "*://*.jquery.top/*",
        "*://*.elongstatic.com/*"
    ],
    //拦截的资源类型，在这里只拦截script脚本，也可以拦截image等其他静态资源
    types: ["script"]
  },
  //要执行的操作，这里配置为阻断
  ["blocking"]
);*/

/*chrome.webRequest.onBeforeRequest.addListener( function(details){
	console.log(details);
	return {cancel: true};
}, {
	urls: [ 
		// "*://static.hdslb.com/player/js/player.js*",
		"*://api.bilibili.com/x/web-show/res/*"
	],
	types: ["script"]
}, ["blocking"]);*/

/*chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab)=>{
	if(changeInfo.url && changeInfo.url.indexOf('search.bilibili.com') >= 0){
		chrome.tabs.sendMessage(tabId, {tabChanged: true});
	}
});*/