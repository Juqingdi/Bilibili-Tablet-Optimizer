if(true)
	Main();

function Main() {
	let currentNode;
	let observer = new MutationObserver((records)=>{
		records.forEach((record, index)=>{
			// console.log(record);
			// 删header
			/*if(record.addedNodes.length > 0 && record.addedNodes[0].tagName === 'DIV'){
				currentNode = record.addedNodes[0];
				if(currentNode.className.indexOf('bili-header-m') >= 0){
					console.info(currentNode);
					currentNode.parentNode.removeChild(currentNode);
					// currentNode.style = "display:none";
				}
			}*/
			//删脚本
			if(record.addedNodes.length > 0 && record.addedNodes[0].tagName === 'SCRIPT'){
				currentNode = record.addedNodes[0];
				if(
					// currentNode.src === 'https://s1.hdslb.com/bfs/cm/st/bundle.js' || //部分链接正常加载所需
					// currentNode.innerText.indexOf('window.spmReportData') >= 0 || //图片加载后会执行这里的函数
					currentNode.innerText.indexOf('isPC = false') >= 0 ||
					// currentNode.innerText.indexOf('window.__INITIAL_STATE__=') >= 0 || //八个首页推荐 以及header信息?
					// currentNode.src.indexOf('https://s1.hdslb.com/bfs/static/jinkela/home/manifest.') >= 0 ||//不能没有
					// currentNode.src.indexOf('https://s1.hdslb.com/bfs/static/jinkela/home/vendor.') >= 0 || //不能没有
					// currentNode.src.indexOf('https://s1.hdslb.com/bfs/static/jinkela/home/home.') >= 0 || //应该是首页信息，删除后首页一片内容空白
					currentNode.src === 'https://static.hdslb.com/common/js/footer.js' || //生成页脚
					false
				){
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