let p1 = document.querySelector('.point-1');
let p2 = document.querySelector('.point-2');
let p3 = document.querySelector('.point-3');
let p4 = document.querySelector('.point-4');
let p5 = document.querySelector('.point-5');

const points = document.querySelectorAll("[class*=point]");
const pnts = document.querySelectorAll('[class*=pnt]');



const DATA = {
	22: [2, 4], 23: [1, 3], 25: [6, 8], 26: [7, 9],
	24: [22, 23], 27: [25, 26], 28: [24, 27],
	// 1: [4, 5], 2: [4, 10], 3: [2, 5], 4: [2, 12], 5: [2, 12], 
	6: [1, 2], 7: [2, 3], 8: [3, 4], 9: [1, 4],
	10: [4, 5], 11: [4, 10], 12: [2, 5], 13: [2, 12],
	14: [3, 5], 15: [10, 14], 16: [10, 15], 17: [14, 15], 18: [1, 5], 19: [1, 18], 20: [5, 18], 21: [5, 12]
}

// Create arrays

let days = [];
let month = [];
let years = [];

// get elements from inputs 

document.querySelector('.day').addEventListener('input', (e) => {
	days = e.target.value.split('').map(String);
});
document.querySelector('.month').addEventListener('input', (e) => {
	month = e.target.value.split('').map(Number);
});
document.querySelector('.years').addEventListener('input', (e) => {
	years = e.target.value.split('').map(Number);
});

// function for 3 main points

function cheacking(a) {
	let currentArr = a.reduce((x, y) => x + y);
	if (currentArr > 22) {
		return currentArr.toString().split("").map(Number).reduce((x, y) => x + y);
	};
	return currentArr;

};
// function for bottom main point
function sum() {
	let sumArr = [p1.innerHTML, p2.innerHTML, p3.innerHTML].reduce((x, y) => x + y);
	if (sumArr > 22) {
		return sumArr.toString().split("").map(Number).reduce((x, y) => x + y);
	}
	return sumArr;
};
// function for middle
function sumOfFourPoint() {
	let newArraa = [p1.innerHTML, p2.innerHTML, p3.innerHTML, p4.innerHTML].reduce((x, y) => +x + +y);
	if (newArraa > 22) {
		return newArraa.toString().split("").map(Number).reduce((x, y) => x + y);
	}
	return newArraa;
};
// for additional outside points
function additionalPoint(a, b) {
	let outsidePointsArr = [a.innerHTML, b.innerHTML].reduce((x, y) => +x + +y);
	if (outsidePointsArr > 22) {
		return outsidePointsArr.toString().split("").map(Number).reduce((x, y) => x + y);
	}
	return outsidePointsArr;
};

// main function
function calc() {
	let leftPoint = cheacking(days);
	p1.textContent = leftPoint;

	let topPoint = month.join('');
	p2.textContent = topPoint;

	let rightPoint = cheacking(years);
	p3.textContent = rightPoint;

	let bottomPoint = sum();
	p4.textContent = bottomPoint;

	let midPoint = sumOfFourPoint();
	p5.textContent = midPoint;

};

// function for destination
function destCalc() {
	pnts.forEach((point) => {
		let id = point.getAttribute('id');
		let first = document.getElementById(DATA[id][0]);
		let second = document.getElementById(DATA[id][1]);
		const sum = additionalPoint(first, second);
		point.textContent = sum
	});
};


// function for inside points 
function insideCalc() {
	points.forEach(point => {
		let id = point.getAttribute("id");
		if (DATA[id]) {
			let firstPointContent = document.getElementById(DATA[id][0]);
			let secondPointContent = document.getElementById(DATA[id][1]);
			let sum = additionalPoint(firstPointContent, secondPointContent)
			point.textContent = sum
		}
	})
};
// add listener for submit

document.querySelector('.sub').addEventListener('click', () => {
	document.querySelector('.down-title').classList.toggle('active');
	setDatasInPosition()
	calc();
	insideCalc();
	destCalc();
});



document.querySelector('.right-side').addEventListener("click", function (e) {
	e.target.classList.toggle('active');
	e.target.nextElementSibling.classList.toggle('active');

});


async function setDatasInPosition() {
	const req = await fetch('./exmple.json');
	console.log(req);
	const res = await req.json();

	const nodes = document.querySelectorAll("[data-related-number]");
	nodes.forEach(node => {
		const nodeRelatedNumber = node.dataset.relatedNumber;
		const relatedNumberElement = document.getElementById(nodeRelatedNumber)
		const mainContent = node.querySelector(".about-span");
		const plusContent = node.querySelector(".plus-span");
		const minusContent = node.querySelector(".minus-span");
		const reworkContent = node.querySelector(".rework-span");
		const ritualContent = node.querySelector(".retual-span");
		const numberAsr = node.querySelector(".numb");

		mainContent.textContent = res[mainContent.dataset.text][+relatedNumberElement.textContent];
		plusContent.textContent = res[plusContent.dataset.text][+relatedNumberElement.textContent];
		minusContent.textContent = res[minusContent.dataset.text][+relatedNumberElement.textContent];
		reworkContent.textContent = res[reworkContent.dataset.text][+relatedNumberElement.textContent];
		ritualContent.textContent = res[ritualContent.dataset.text][+relatedNumberElement.textContent];
		numberAsr.textContent = res[numberAsr.dataset.text][+relatedNumberElement.textContent];
	})
};

