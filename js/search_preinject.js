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
				if(
					currentNode.innerText.includes('isPC = false') ||
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