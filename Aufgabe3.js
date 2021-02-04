function setupAufgabe3(){
	setupInputs3();
	setupButtons3();
	draw3 = true;
	buttonNext.hide();
}

function setupButtons3(){
	let x = 100;
	let y = 50;
	
	buttonTipp1 = createButton('Tipp');
	buttonTipp1.mousePressed(tipp1);
	buttonTipp1.position(width, 150-y/2);
	buttonTipp1.size(x, y);
	
	buttonTipp2 = createButton('Tipp');
	buttonTipp2.mousePressed(tipp2);
	buttonTipp2.position(width, 200-y/2);
	buttonTipp2.size(x, y);
	
	buttonTipp2 = createButton('Tipp');
	buttonTipp2.mousePressed(tipp3);
	buttonTipp2.position(width, 250-y/2);
	buttonTipp2.size(x, y);
}

function tipp1(){
	clearColor();
	let n = amounts.length;
	let m = n*(n+1);
	for (let i = 0; i < n; i++){
		inputs[m+i*(n+1)].input.style('background-color', cHighlight);
	}	
}

function tipp2(){
	clearColor();
	let n = amounts.length;
	let m = n*(n+1);
	for (let i = 0; i < n; i++){
		for (let j = 0; j < n; j++){
			let a = i;
			let b = n*(i+1) + j;
			if (a % n != 0 && b % n != 0){
				let c = b + n*n;
				inputs[c].input.style('background-color', cHighlight);
			}
		}	
	}
}

function tipp3(){
	clearColor();
	let n = amounts.length;
	let m = n*(n+1);
	for (let i = 0; i < n; i++){
		inputs[m+i*n+1].input.style('background-color', cHighlight);
	}
}

function setupInputs3(){
	let result;
	let sum = sumAmount();
	let n = amounts.length;
	
	// 2x gleiche Farbe	
	result = 0;
	for (let i = 0; i < n*n; i++){
		let p = int(i/n);
		let y = t + p*h/n+h*(n+1+(i%n)*2)/(4*n*n) + yc;		
		if (i % n == p){
			result += inputs[p].result*inputs[i+n].result;
		}
	}
	inputs.push(new Input(width - 100, 150, result));
	
	// kein rot
	result = 0;
	for (let i = 0; i < n*n; i++){
		let p = int(i/n);
		let y = t + p*h/n+h*(n+1+(i%n)*2)/(4*n*n) + yc;		
		if ((i % n)*p > 0){
			result += inputs[p].result*inputs[i+n].result;
		}
	}
	inputs.push(new Input(width - 100, 200, result));	
	
	// zweite Kugel ist blau
	result = 0;
	for (let i = 0; i < n*n; i++){
		let p = int(i/n);
		let y = t + p*h/n+h*(n+1+(i%n)*2)/(4*n*n) + yc;		
		if ((i % n) == 1){
			result += inputs[p].result*inputs[i+n].result;
		}
	}
	inputs.push(new Input(width - 100, 250, result));	
}