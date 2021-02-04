function setupAufgabe2(){
	amounts = [2, 1, 3];
	setupInputs();	
}

function submit2(){
	checkInputs();
	if (cheat || correct){
		setupAufgabe3();
		aufgabe++;
	}else{
		wrong = 100;
	}
}