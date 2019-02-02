chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.turnedOn === true) {
        chrome.browserAction.setBadgeText({text: ' on ', tabId: sender.tab.id});
    }
});

chrome.cookies.set({
	url: 'https://www.bilibili.com/video/*',
	name: 'stardustvideo',
	value: '1',
	domain: '.bilibili.com',
	path: '/',
	expirationDate: (new Date().getTime()/1000) + 365 * 24 * 60 * 60
});

chrome.webRequest.onBeforeSendHeaders.addListener( (request)=>{
	for (let t = 0,	i = request.requestHeaders.length; t < i; ++t) 
		if ( request.requestHeaders[t].name === "User-Agent") {
			request.requestHeaders[t].value = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 YaBrowser/18.4.1.513.00 Safari/537.36';
			break;
		}
	return {requestHeaders: request.requestHeaders};
}, {urls: [
	"https://www.bilibili.com/*",
	"https://*.acgvideo.com/*"
]}, ["blocking", "requestHeaders"]);

//强制直播PC页跳转到手机页
chrome.webRequest.onBeforeRequest.addListener( (request)=>{
	if(!request.url.includes("live.bilibili.com/h5")){
		return {redirectUrl: request.url.replace("live.bilibili.com", "live.bilibili.com/h5")};	
	}
}, {urls: ["https://live.bilibili.com/*"]}, ["blocking"] );

//强制视频播放页跳转到PC页
chrome.webRequest.onBeforeRequest.addListener( (request)=>{
	if(!request.url.includes("live.bilibili.com/h5")){
		let newUrl = request.url.replace('m.bilibili', 'www.bilibili');
		newUrl = newUrl.replace('.html', '/');
		return {redirectUrl: newUrl};	
	}
}, {urls: ["https://m.bilibili.com/video/*"]}, ["blocking"] );

chrome.runtime.onInstalled.addListener(function(){
	chrome.storage.local.set({enablePc: true, optimize: true});
});