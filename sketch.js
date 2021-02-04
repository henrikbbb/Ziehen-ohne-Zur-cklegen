let cNeutral;
let cTrue;
let cFalse;
let cHighlight;
let inputs = [];
let colors = [];
let amounts = [];
let aufgabe = 1;
let correct;
let wrong = 0;

let draw3 = false;

let buttonNext;

let cheat = false;

let t;
let h;
let yc = 10;

function setup() {
	createCanvas(1200, 700);
	
	t = height/30;
	h = height - t;
	
	cNeutral = color(255, 255, 255, 150);
	cTrue = color(0, 255, 0, 150);
	cFalse = color(255, 0, 0, 150);
	cHighlight = color(255, 220, 190);
	
	let red = color(255, 0, 0);
	let blue = color(0, 0, 255);
	let yellow = color(255, 255, 0);
	let green = color(0, 255, 0);
	let orange = color(255, 150, 0);
	let purple = color(140, 0, 200);
	colors.push(red);
	colors.push(blue);
	colors.push(yellow);
	colors.push(green);
	colors.push(orange);
	colors.push(purple);
	
	setupButtons();	
	setupAufgabe1();
}

function drawUrne(x, y, w, h){
	noFill();
	stroke(0);
	strokeWeight(10);
	beginShape();
	curveVertex(x+w/2, y);
	curveVertex(x, y);
	curveVertex(x, y+h);
	curveVertex(x+w, y+h);
	curveVertex(x+w, y);
	curveVertex(x+w/2, y);
	endShape();
	noStroke();
	fill(0);
	textSize(25);
	textAlign(CENTER, CENTER);
	text('Urne', x+w/2, y+h+35);
}

function draw() {
	background(200);
	drawLines();
	
	// Anmerkung Bruchschreibweise
	textAlign(LEFT, BOTTOM);
	textSize(25);
	fill(0);
	noStroke();
	text('Wahrscheinlichkeiten als Bruch (z.B. 1/3) angeben.', 0, height);
	
	// Urne
	drawUrne(width - 200, height - 170, 150, 120);
	
	// Anzahl Kugeln
	let r = 30;
	let gap = 5;
	for (let i = 0; i < amounts.length; i++){
		let h = i + 3 - amounts.length;
		fill(colors[i]);
		let amount = amounts[i];
		for (let j = 0; j < amount; j++){
			circle(j*(r+gap) + width - 160, h*(r+gap) + height - 140, r);
		}
	}
	
	// Aufgabe
	fill(0);
	textAlign(RIGHT, TOP);
	textSize(40);
	text('Aufgabe ' + aufgabe, width, 0);
	
	// Error Box
	if (wrong > 0){
		wrong--;
		noStroke();
		fill(0);
		rect(width/4, height*2/5, width/2, height/5);
		fill(255);
		textAlign(CENTER, CENTER);
		text('Es gibt noch Fehler.', width/2, height/2);
	}
	
	// Text
	fill(0);
	noStroke();
	textAlign(CENTER, CENTER);
	textSize(20);
	let y = 40;
	text('1. Ziehung', 100, y);
	text('2. Ziehung', 400, y);	
	text('Pfadwahrscheinlichkeit', 740, y);	
	
	// 3
	if (draw3){
		fill(0);
		textAlign(LEFT, CENTER);
		textSize(20);	
		text('P(gleiche Farbe)=', width - 300, 150);
		text('P(kein rot)=', width - 300, 200);
		text('P(2. Kugel blau)=', width - 300, 250);
	}
}

function drawLines(){
	stroke(0);
	strokeWeight(5);
	let n = amounts.length;
	
	for (let i = 0; i < n; i++){
		let y = t + i*h/n + h/n/2 + yc;
		stroke(colors[i]);
		line(100, t+h/2, 400, y);
	}	
	
	for (let i = 0; i < n*n; i++){
		let p = int(i/n);
		let y1 = t + p*h/n + h/n/2 + yc;
		let y2 = t + i*h/(n*n) + h/(n*n)/2 + yc;
		stroke(colors[i%n]);
		line(400, y1, 700, y2);
	}
	
	fill(0);
	noStroke();
	let r = 20;
	circle(100, t + h/2, r);
	for (let i = 0; i < n; i++){
		let y = t + i*h/n + h/n/2 + yc;
		circle(400, y, r);
	}
}

function checkInputs(){
	correct = true;
	for (let i = 0; i < inputs.length; i++){
		let input = inputs[i];		
		let value = input.input.value();
		let numbers = split(str(value), '/');
		let result = int(numbers[0])/int(numbers[1]);
		if (abs(result - input.result) < 1/1000){
			input.input.style('background-color', cTrue);
		}else{
			input.input.style('background-color', cFalse);
			correct = false;
		}
	}
}

function setupButtons(){
	let x = 100;
	let y = 50;
	
	let buttonCheck = createButton('überprüfen');
	buttonCheck.mousePressed(checkInputs);
	buttonCheck.position(width, 0);
	buttonCheck.size(x, y);
	
	let buttonClear = createButton('alles löschen');
	buttonClear.mousePressed(clearInputs);
	buttonClear.position(width, y);
	buttonClear.size(x, y);
	
	buttonNext = createButton('nächste Aufgabe');
	buttonNext.mousePressed(submit);
	buttonNext.position(width, 2*y);
	buttonNext.size(x, y);	
}

function setupInputs(){	
	let sum = sumAmount();	
	let n = amounts.length;
	
	// 1. Ziehung
	for (let i = 0; i < n; i++){
		let y = t + h*(n+1+i*2)/(4*n) + yc;
		let result = amounts[i]/sum;
		inputs.push(new Input(250, y, result));
	}	
	
	// 2. Ziehung
	for (let i = 0; i < n*n; i++){
		let p = int(i/n);
		let y = t + p*h/n+h*(n+1+(i%n)*2)/(4*n*n) + yc;
		let result;
		if (i % n == p){
			result = (amounts[i % n]-1)/(sum-1);
		}else{
			result = amounts[i % n]/(sum-1);
		}
		inputs.push(new Input(550, y, result));
	}
	
	// Pfad-WS
	for (let i = 0; i < n*n; i++){
		let y = t + i*h/(n*n) + h/(n*n)/2 + yc;
		let p = int(i/n);
		let result = inputs[p].result*inputs[i+n].result;
		inputs.push(new Input(740, y, result));
	}
}

function clearInputs(){
	for (let i = 0; i < inputs.length; i++){
		let input = inputs[i];
		input.input.value('');
	}
	clearColor();
}

function sumAmount(){
	let sum = 0;
	for (let i = 0; i < amounts.length; i++){
		sum += amounts[i];
	}
	return sum;
}

function clearColor(){
	for (let i = 0; i < inputs.length; i++){
		let input = inputs[i];
		input.input.style('background-color', cNeutral);
	}
}

function submit(){
	if (aufgabe == 1){
		submit1();
	} else if (aufgabe == 2){
		submit2();
	}
}

class Input{
	constructor(x, y, result){
		let inputW = 80;
		let inputH = 30;
		this.input = createInput('');
		this.input.size(inputW, inputH);
		this.input.position(x-inputW/2, y-inputH/2);
		this.input.style('background-color', cNeutral);
		this.input.style('font-size', '30px');
		this.result = result;
	}
}