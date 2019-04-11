var Equation = function()
{
	console.log("contructor");
}

Equation.create = function(num1, num2, currentOp)
{
	console.log("create");
	while(true)
	{
		if(currentOp == "/")
		{
			if(Equation.division(num1, num2)){break;}
			else
			{
				this.currentOp = "x";
				break;
			}
		}
		else {break;}
	}
	let question = num1 + " " + currentOp + " " + num2 + " = [?]";
	questionEle.textContent = question;
}

const submitEle = document.querySelector(".submit");
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
		case "*":
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
	Equation.create(num1,num2,currentOp);
}

Equation.ReRoll = function(max){
	return Math.floor(Math.random() * Math.floor(max));
}

//var answer;
//var num1 = Equation.ReRoll(13);
//var num2 = Equation.ReRoll(13);
//var operator = ["+", "-", "÷", "×"];



Equation.correct = function()
{
	console.log("correct");
	guessEle.value = "";
	Equation.call();
	Equation.setup();	
}
Equation.incorrect = function()
{
	console.log("incorrect");
	guessEle.value = "";
	Equation.call();
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
const scoreEle = document.querySelector(".score");
const guessEle = document.querySelector(".guess");
const questionEle = document.querySelector(".question");
const operator = ["+", "-", "/", "x"];
var currentOp;
var num1;
var num2;
Equation.call();
Equation.setup();
