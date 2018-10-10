/*const pc_box = document.getElementById('pc');
const optimize_box = document.getElementById('optimize');
const tip2 = document.getElementById('tip2');

function checkState(enablePc){
	if(!enablePc){
		optimize_box.disabled = true;
		optimize_box.previousElementSibling.style.color = '#aaa';
		tip2.style.display = 'block';
	}
	else{
		optimize_box.disabled = false;
		optimize_box.previousElementSibling.style.color = '#fff';
		tip2.style.display = 'none';
	}	
}

chrome.storage.local.get(['enablePc', 'optimize'], function(data){
	pc_box.checked = data.enablePc;
	optimize_box.checked = data.optimize;
	checkState( data.enablePc);
});

pc_box.onclick = function(element) {
	let enablePc = element.target.checked;
	chrome.storage.local.set({enablePc: enablePc});
	checkState( enablePc);
}

optimize_box.onclick = function(element) {
	let optimize = element.target.checked;
	chrome.storage.local.set({optimize: optimize});
}*/

const optimize_box = document.getElementById('optimize');
optimize_box.onclick = element => {
	// alert(element.target.checked);
	alert(test);
}