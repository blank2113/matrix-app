// const remote = require('electron').remote;
// const wnd = remote.getCurrentWindow();

// window.wnd.send("minimize");
document.addEventListener('DOMContentLoaded', () => {
	let btnMin = document.querySelector('.min');
	let btnMax = document.querySelector('.size');
	let btnClose = document.querySelector('.close');


	btnMin.addEventListener('click', () => {
		window.wnd.send("minimize");
	});

	btnMax.addEventListener('click', () => {
		window.wnd.send("maximize");
	});
	btnClose.addEventListener('click', () => {
		window.wnd.send("close");
	});

	const getDataJson = async () => {
		try {
			const req = await fetch('./exmple.json');
			// console.log(req);
			const res = await req.json();
			// console.log(res);
			return res;
			// globalVAr = res;
		} catch (error) {
			console.log(error);
			alert("Сори все хуйня");
			return null;
		}
	}
});

