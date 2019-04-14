//BIG 'OL LIST-A VARIABIBBLES
const skipEle = document.querySelector(".skip");
const submitEle = document.querySelector(".submit");
const scoreEle = document.querySelector(".score");
const guessEle = document.querySelector(".guess");
const questionEle = document.querySelector(".question");
const resetEle = document.querySelector(".reset");
const messageEle = document.querySelector(".message");
const operator = ['+', '-', '/', 'x'];
var currentGame
var score = 0;
var currentOp;
var num1;
var num2;
var question;
var skipsAllowed = 3;

var Equation = function()
{	
	//Check for Local Storage
	if(localStorage.getItem('num1'))
	{
		Equation.prototype.loadLocal();
		Equation.prototype.create();
	}
	else //if not local, populates random numbaz and operator
	{
		Equation.prototype.setup();
	}

	//onclick event to skip
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
			Equation.prototype.setup();
		}
	}

	//onclick event to submit answer
	submitEle.onclick = function()
	{
		let guess = Number(guessEle.value);
		let answer;
		switch(currentOp)
		{
			case "+":
				answer = Equation.prototype.addition(num1,num2);
				break;
			case "-":
				answer = Equation.prototype.subtraction(num1, num2);
				break;
			case "/":
				answer = num1 / num2;
				break;
			case "x":
				answer = Equation.prototype.multiplication(num1, num2);
				break;
		}
		if(answer == guess)
		{
			Equation.prototype.correct(answer);
		}
		else
		{
			Equation.prototype.incorrect(answer);
		}
	}

	//onclick event to confirm w/ the user to reset
	resetEle.onclick = function()
	{
		let conf = confirm("Are you sure you want to reset EVERYTHING?");
		if(conf == true)
		{
			Equation.prototype.reset();
		}
		else
		{
			//dindu nuffin
		}
	}
}

//Create Method (POPULATES QUESTION ELEMENT)
Equation.prototype.create = function()
{
	//tested on my nephew so I made division easier for his small child brain
	if(currentOp == operator[2])
	{
		while(Equation.prototype.division(num1, num2) == false)
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
	if(score >= 1)
	{
		scoreEle.style.color = "green";
	}
	else if(score < 0)
	{
		scoreEle.style.color = "red";
	}
	else
	{
		scoreEle.style.color = "black";
	}
}


//Setup Method (QUESTION VARIABLES + LOCALSTORAGE)
Equation.prototype.setup = function()
{
	num1 = Equation.prototype.ReRoll(13);
	num2 = Equation.prototype.ReRoll(13);
	currentOp = operator[Equation.prototype.ReRoll(4)];
	Equation.prototype.setLocal();
	Equation.prototype.create();
}

//STOLEN! From Assignment #1 (don't sue)
Equation.prototype.ReRoll = function(max){
	return Math.floor(Math.random() * Math.floor(max));
}

//Correct Method (INCREMENT SCORE + ADD A SKIP + CLEAR INPUT)
Equation.prototype.correct = function(answer)
{
	score += 1;
	if(skipsAllowed < 3)
	{
		skipsAllowed += 1;
		skipEle.value = "Skip(" + skipsAllowed + ")";
	}
	else
	{
		//NOT ADDIN' MORE SKIPS THAN 3
	}
	scoreEle.textContent = score;
	messageEle.textContent = "Correct! " + num1 + " " + currentOp + " " + num2 + " = " + answer;
	messageEle.style.color = "green";
	guessEle.value = "";
	Equation.prototype.setup();	
}

//Incorrect Method (DECREMENT SCORE + CLEAR INPUT)
Equation.prototype.incorrect = function(answer)
{
	guessEle.value = "";
	score -= 1;
	scoreEle.textContent = score;
	messageEle.textContent = "Incorrect! " + num1 + " " + currentOp + " " + num2 + " = " + answer;
	messageEle.style.color = "red";
	Equation.prototype.setup();
}

//Addition Method
Equation.prototype.addition = function(num1, num2)
{
	return num1 + num2;
} 

//Subtraction Method
Equation.prototype.subtraction = function(num1, num2)
{
	return num1 - num2;
}

//Division Method
Equation.prototype.division = function(num1, num2)
{
	//If the numbers don't divide evenly
	//Increment the lower until they do
	//Easier to do for kids
	if((num1 / num2) % 1 == 0)
	{
		return true;
	}
	else
	{
		return false;
	}
}

//Multiplication Method
Equation.prototype.multiplication = function(num1, num2)
{
	return num1 * num2;
}

//Set Local Storage
Equation.prototype.setLocal = function()
{
	localStorage.setItem('num1', num1);
	localStorage.setItem('num2', num2);
	localStorage.setItem('currentOp', currentOp);
	localStorage.setItem('Score', score);
	localStorage.setItem('skipsAllowed', skipsAllowed);
}

//Retrieve and populate variables from LS
Equation.prototype.loadLocal = function()
{
	score = Number(localStorage.getItem('Score'));
	num1 = Number(localStorage.getItem('num1'));
	num2 = Number(localStorage.getItem('num2'));
	currentOp = localStorage.getItem('currentOp');
	skipsAllowed = Number(localStorage.getItem('skipsAllowed'));
	skipEle.value = "Skip(" + skipsAllowed + ")";
	scoreEle.textContent = score;
}

//Reset Local storage + score and skips
Equation.prototype.reset = function()
{
	console.clear();
	localStorage.clear();
	score = 0;
	skipsAllowed = 3;
	skipEle.value = "Skip(" + skipsAllowed + ")";
	scoreEle.textContent = score;
	Equation.prototype.setup();
}

//Checks for the enter key to be pushed while focused on the field. (Submits answer instead of pressing button.)
guessEle.addEventListener('keyup', function onEvent(e) {
    if (e.keyCode === 13) {
        submitEle.onclick.call();
    }
});
//Call the app
Equation();