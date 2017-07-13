var fs = require("fs");

var BasicCards = function(front, back) {
	this.front = front;
	this.back = back;
	this.make = function() {
		fs.appendFile("log.txt", "Question: " + this.front + "\nAnswer: " + this.back  + "\n", function(err) {

		  if (err) {
		    console.log(err);
		  }
		  
		});
	}

};

module.exports = BasicCards;