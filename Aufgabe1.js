function setupAufgabe1(){
	amounts = [3, 2];
	setupInputs();
}

function submit1(){
	checkInputs();
	if (cheat || correct){
		for (let i = 0; i < inputs.length; i++){
			let input = inputs[i];
			input.input.hide();
		}
		inputs = [];
		aufgabe++;
		setupAufgabe2();
	}else{
		wrong = 100;
	}
}