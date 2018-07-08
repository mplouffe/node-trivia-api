'use strict';

var bodyParser = require('body-parser');
const request = require('request');
const options = {
  url: 'https://opentdb.com/api.php?amount=1&category=18',
  method: 'GET',
  headers: {
    'Accept': 'application/json',
    'Accept-Charset': 'utf-8' 
  }
}
module.exports = function(app) {

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.get('/question', function(req, res){
    var response = res;
    request(options, function(err, res, body) {
      let json = JSON.parse(body).results[0];
      let opener = json.difficulty === "easy" ? "This is an" : "This is a";
      if(json.type === "boolean") {
        let difficulty = `${opener} ${json.difficulty} true/false question...`;
        let answers = [];
        if(Math.random() > 0.5) {
          answers[0] = json.correct_answer;
          answers[1] = json.incorrect_answers[0];
        } else {
          answers[0] = json.incorrect_answers[0];
          answers[1] = json.correct_answer;
        }
        let reply = {
                      "messages": [
                        { "text": difficulty },
                        { "text": json.question,
                          "quick_replies": [
                            { "title": answers[0] },
                            { "title": answers[1] }
                          ]
                        }
                      ]
                    };
        response.send(reply);
      }
      else {
        let difficulty = `${opener} ${json.difficulty} multiple choice question...`;
        let answers = shuffleArray(json.incorrect_answers);
        let correct = Math.floor(Math.random()*4);
        answers.splice(correct,0,json.correct_answer);
        let reply = {
                      "messages": [
                        { "text": difficulty },
                        { "text": json.question,
                          "quick_replies": [
                            { "title": answers[0] },
                            { "title": answers[1] },
                            { "title": answers[2] },
                            { "title": answers[3] }
                          ]
                        }
                      ]
                    };
        response.send(reply);
      }
    });
  });

}

function shuffleArray(d) {
  for (var c = d.length - 1; c > 0; c--) {
    var b = Math.floor(Math.random() * (c + 1));
    var a = d[c];
    d[c] = d[b];
    d[b] = a;
  }
  return d
};