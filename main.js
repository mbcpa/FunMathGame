var Equation = function()
{
	//BIG 'OL LIST-A VARIABIBBLES
	const skipEle = document.querySelector(".skip");
	const submitEle = document.querySelector(".submit");
	const scoreEle = document.querySelector(".score");
	const guessEle = document.querySelector(".guess");
	const questionEle = document.querySelector(".question");
	const operator = ['+', '-', '/', 'x'];
	var currentGame
	var score = 0;
	var currentOp;
	var num1;
	var num2;
	var question;
	var skipsAllowed = 3;
	
	//Check for Local Storage
	if(localStorage.getItem('num1'))
	{
		Equation.loadLocal();
		Equation.create();
	}
	else
	{
		Equation.setup();
	}
}

Equation.create = function()
{
	console.log("create");
	//tested on my nephew so I made division easier for his small child brain
	if(currentOp == operator[2])
	{
		while(Equation.division(num1, num2) == false)
		{
			if(num1 > num2)
			{
				num2 += 1;
			}
			else
			{
				num1 += 1;
			}
		}
	}
	question = num1 + " " + currentOp + " " + num2 + " = [?]";
	questionEle.textContent = question;
}

skipEle.onclick = function()
{
	if(skipsAllowed === 0)
	{
		//NO MOAR SKIPPIN'
	}
	else
	{
		skipsAllowed -= 1;
		skipEle.value = "Skip(" + skipsAllowed + ")";
		Equation.setup();
	}
}

submitEle.onclick = function()
{
	let guess = Number(guessEle.value);
	let answer;
	switch(currentOp)
	{
		case "+":
			answer = Equation.addition(num1,num2);
			break;
		case "-":
			answer = Equation.subtraction(num1, num2);
			break;
		case "/":
			answer = num1 / num2;
			break;
		case "x":
			answer = Equation.multiplication(num1, num2);
			break;
	}
	if(answer == guess)
	{
		console.log(guess + "   " + answer);
		Equation.correct();
	}
	else
	{
		console.log(guess + "   " + answer);
		Equation.incorrect();
	}
}


Equation.setup = function()
{
	console.log("setup");
	num1 = Equation.ReRoll(13);
	num2 = Equation.ReRoll(13);
	currentOp = operator[Equation.ReRoll(4)];
	Equation.setLocal();
	Equation.create();
}

//STOLEN! From Assignment #1 (don't sue)
Equation.ReRoll = function(max){
	return Math.floor(Math.random() * Math.floor(max));
}

Equation.correct = function()
{
	console.log("correct");
	guessEle.value = "";
	score += 1;
	if(skipsAllowed < 3)
	{
		skipsAllowed += 1;
		skipEle.value = "Skip(" + skipsAllowed + ")";
	}
	else
	{
		//NOT ADDIN' MORE SKIPS
	}
	scoreEle.textContent = score;
	Equation.setup();	
}
Equation.incorrect = function()
{
	console.log("incorrect");
	guessEle.value = "";
	score -= 1;
	scoreEle.textContent = score;
	Equation.setup();
}
Equation.addition = function(num1, num2)
{
	return num1 + num2;
} 
Equation.subtraction = function(num1, num2)
{
	return num1 - num2;
}
Equation.division = function(num1, num2)
{
	console.log(num1 + "    " + num2);
	if((num1 / num2) % 1 == 0)
	{
		return true;
	}
	else
	{
		return false;
	}
}
Equation.multiplication = function(num1, num2)
{
	return num1 * num2;
}
Equation.setLocal = function()
{
	localStorage.setItem('num1', num1);
	localStorage.setItem('num2', num2);
	localStorage.setItem('currentOp', currentOp);
	localStorage.setItem('Score', score);
	localStorage.setItem('skipsAllowed', skipsAllowed);
}
Equation.loadLocal = function()
{
	console.log("local loaded");
	score = Number(localStorage.getItem('Score'));
	num1 = Number(localStorage.getItem('num1'));
	num2 = Number(localStorage.getItem('num2'));
	currentOp = localStorage.getItem('currentOp');
	skipsAllowed = Number(localStorage.getItem('skipsAllowed'));
	skipEle.value = "Skip(" + skipsAllowed + ")";
	scoreEle.textContent = score;
}

Equation.call();