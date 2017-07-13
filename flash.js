var BasicCard = require("./BasicCard.js");
var ClozeCard = require("./CloseCard.js");
var inquirer = require("inquirer");
var fs = require("fs");

var initialize = function() {
	inquirer.prompt([{
	    name: 'initial',
	    message: 'What would you like to do?',
	    type: 'list',
	    choices: [
	    {
	        name: 'Add Flashcard'
	    }, {
	        name: 'Practice Flashcards'
	    }, {
	        name: 'Show Flashcards'
	    }]
	}]).then(function(answer) {
	    if (answer.initial === "Add Flashcard") {
	        addCard();

	    } else if (answer.initial === "Practice Flashcards") {
	        practiceCard();

	    } else if (answer.initial === "Show Flashcards") {
	        showCards();

	    }
	});
};

initialize();

var addCard = function() {
inquirer.prompt([{
    name: 'addCard',
    message: 'Select the flashcard you want to make.',
    type: 'list',
    choices: [{
        name: 'Basic Flashcard'
    }, {
        name: 'Cloze Flashcard'
    }]
}]).then(function(answer) {
    if (answer.addCard === "Basic Flashcard") {
        inquirer.prompt([

        {	
		    name: 'question',
		    message: 'What is your question?',
		    type: 'input',
		}, {
		    name: 'answer',
		    message: 'What is the answer?',
		    type: 'input',
		}

		]).then(function(answer) {
		    if (answer.question && answer.answer) {
		        var BasicCardConstruct = new BasicCard(answer.question, answer.answer);
		        	BasicCardConstruct.make();
		        	initialize();
		    } else {
		    	console.log("Error. Please provide a valid question and answer.")
		    	addCard();
		    }
		});

    } else if (answer.addCard === "Cloze Flashcard") {
        inquirer.prompt([

        {	
		    name: 'question',
		    message: 'What is your full text?',
		    type: 'input',
		}, {
		    name: 'answer',
		    message: 'What is your cloze answer',
		    type: 'input',
		}
		    
		]).then(function(answer) {
		    if (answer.question && answer.answer) {
		        var ClozeCardConstruct = new ClozeCard(answer.question, answer.answer);
		        	ClozeCardConstruct.make();
		        	initialize();
		    } else {
		    	console.log("Error. Please provide a valid full question and cloze answer.")
		    	addCard();
		    }
		});

    }
});

};

var practiceCard = function() {
	fs.readFile("log.txt", "utf8", function(err, data) {

		    if (err) {
		      return console.log(err);
		    }

		    else {
		    	data = data.split("\n");
		    	for (var i = 0; i < data.length; i+=2) {
		    		inquirer.prompt([

			        {	
					    name: 'question',
					    message: data[i],
					    type: 'input',
					}
					    
					]).then(function(answer) {
						if (data[i + 1].includes(answer.question)) {
							console.log("correct")
						}

						else {
							console.log("wrong")
						}

					});	
				}	
			}
	});
};


var showCards = function() {
	fs.readFile("log.txt", "utf8", function(err, data) {

		    if (err) {
		      return console.log(err);
		    }

		    else {

		    	console.log(data);
		    	initialize();
		    	
			}

	});

};