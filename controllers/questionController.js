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
    request(options, function(err, res, body) {
      let json = JSON.parse(body).results[0];
      console.log(json);
      if(json.type === "boolean") {
        let difficulty = `This is a ${json.difficulty} true/false question...`;
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
        console.log(reply);
      }
      else {
        let difficulty = `This is a ${json.difficulty} multiple choice question...`;
        let answers = [];
        let correct = Math.floor(Math.random()*4);
        for(let i = 0; i < 4; i++) {
          if(i === correct) {
            answers[i] = json.correct_answer;
          } else {
            if(i === 3) {
              answers[i] = json.incorrect_answers[2];
            }
            else {
              answers[i] = json.incorrect_answers[i];
            }
          }
        }
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
        console.log(reply);
      }
    });
    res.send("anything");
  });

}