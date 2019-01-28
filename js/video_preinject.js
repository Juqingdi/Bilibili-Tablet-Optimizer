chrome.storage.local.get(null, function(data){
	if(data.enablePc && data.optimize)
		Main();
	else
		document.body.className += 'origin';
});

function Main() {
	let currentNode;
	let observer = new MutationObserver((records)=>{
		records.forEach((record, index)=>{
			// console.log(record);
			// 删header
			/*if(record.addedNodes.length > 0 && record.addedNodes[0].tagName === 'DIV'){
				currentNode = record.addedNodes[0];
				if(currentNode.className.includes('bili-header-m')){
					console.info(currentNode);
					currentNode.parentNode.removeChild(currentNode);
					// currentNode.style = "display:none";
				}
			}*/
			//删脚本
			if(record.addedNodes.length > 0 && record.addedNodes[0].tagName === 'SCRIPT'){
				currentNode = record.addedNodes[0];
				console.log(currentNode);
				// alert('pause');
				if(
					// currentNode.innerText.includes('isPC=true') ||
					currentNode.src.includes('player.js') ||
					// currentNode.src.includes('web-show') ||
					// currentNode.src === 'https://s1.hdslb.com/bfs/cm/st/bundle.js' || 
					// currentNode.innerText.includes('window.spmReportData') || //图片加载后会执行这里的函数
					// currentNode.innerText.includes('window.__INITIAL_STATE__=') || //八个首页推荐 以及header信息?
					// currentNode.src.includes('https://s1.hdslb.com/bfs/static/jinkela/home/manifest.') ||//不能没有
					// currentNode.src.includes('https://s1.hdslb.com/bfs/static/jinkela/home/vendor.') || //不能没有
					// currentNode.src.includes('https://s1.hdslb.com/bfs/static/jinkela/home/home.') || //应该是首页信息，删除后首页一片内容空白
					false
				){
					console.info('script deleted');
					currentNode.parentNode.removeChild(currentNode);
				}
			}
		});
	});
	observer.observe(document, {
		'childList': true,
		'subtree': true
	})
	// alert('before head');
}

function Main2() {
	let currentNode;
	let observer = new MutationObserver((records)=>{
		records.forEach((record, index)=>{
			// console.log(record);
			// 删header
			/*if(record.addedNodes.length > 0 && record.addedNodes[0].tagName === 'DIV'){
				currentNode = record.addedNodes[0];
				if(currentNode.className.includes('bili-header-m')){
					console.info(currentNode);
					currentNode.parentNode.removeChild(currentNode);
					// currentNode.style = "display:none";
				}
			}*/
			//删脚本
			if(record.addedNodes.length > 0 && record.addedNodes[0].tagName === 'SCRIPT'){
				currentNode = record.addedNodes[0];
				if(!currentNode.src.includes('chrome-extension://')){
					console.info(currentNode);
					currentNode.parentNode.removeChild(currentNode);
				}
			}
		});
	});
	observer.observe(document, {
		'childList': true,
		'subtree': true
	})
	// alert('before head');
}