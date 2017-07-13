var fs = require("fs");

var ClozeCard = function(text, cloze) {
	this.cloze = cloze;
	this.fullText = text;
	this.partial = text.replace(cloze, '...');
	this.make = function() {
		fs.appendFile("log.txt", "Question: " + this.partial + "\nAnswer: " + this.cloze + "\n", function(err) {

		  if (err) {
		    console.log(err);
		  }

		});
	}

};

module.exports = ClozeCard;