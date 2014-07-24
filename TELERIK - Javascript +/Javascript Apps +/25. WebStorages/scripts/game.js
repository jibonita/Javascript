define(['jquery', 'storage'], function($, Storage) {
    var userInputId = 'user-guess',
        NUMBER_LENGTH = 4,
        resultBoardId = 'result-board';

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    function validateInput(value) {
        if (isNaN(value)) {
            return false;
        }
        if (value.length != NUMBER_LENGTH) {
            return false;
        }
        return value;
    }

    function generateNumber() {
        var digitsArray = '123456789'.split(''),

            pos,
            number;
        // generate left most digit
        pos = getRandomInt(0, digitsArray.length - 1);
        number = digitsArray[pos];
        // add the 0 digit, because it can be included in the following positions 
        digitsArray.push('0');

        // generate the rest of the digits of the number
        for (var i = 1; i < NUMBER_LENGTH; i++) {
            // exclude the digit that already has been used
            digitsArray.splice(pos, 1);
            pos = getRandomInt(0, digitsArray.length - 1);
            number += digitsArray[pos];
        }

        return number;
    }

    // draw user inpur field
    function drawInputFields() {
        var self = this;

        $('#container').length || $('<div>').attr('id', 'container').appendTo($('body'));
        var $container = $('#container');

        if (!$('#submit-guess').length) {
            $('<input>').attr({
                'id': userInputId,
                'maxlength': NUMBER_LENGTH
            }).appendTo($container);
            var $submitBtn = $('<button>').attr('id', "submit-guess").html("Check Number");

            $submitBtn.appendTo($container);
            $submitBtn.on('click', function() {
                readUserInput.call(self);
            });

            // add the result board which will display also sheep/rams info
            $('#' + resultBoardId).length || $('<div>').attr('id', resultBoardId).appendTo($container);
        } else {
            // clear fields from alder values
            $('#submit-guess').val('');
            $('#' + resultBoardId).html(' ');

            $('#' + userInputId).show();
            $('#submit-guess').show();

        }
    }

    // read input
    function readUserInput() {
        var userInput = validateInput($('#' + userInputId).val());
        if (!userInput) {
            alert('Wrong iput data.Please enter a 4-digit number!');

        } else {
            this.steps++;
            compareInput.call(this, userInput);
        }
    }

    function compareInput(input) {
        // 'this' will be the Game object
        var sheep = 0,
            rams = 0;
        for (var i = 0; i < NUMBER_LENGTH; i++) {
            if (input[i] === this.numberToGuess()[i]) {
                rams++;
            } else {
                if (this.numberToGuess().indexOf(input[i]) > -1) {
                    sheep++;
                }
            }
        }

        processResult.call(this, sheep, rams);
    }

    function processResult(sheep, rams) {
        if (rams === NUMBER_LENGTH) {
            // The input field and the Submint button have to be hidden at this point
            $('#' + userInputId).hide();
            $('#submit-guess').hide();

            saveToLocalStorage.call(this);
        } else {
            var input = $('#' + userInputId).val();
            var resultHTML = '<span class="r-number">' + input + '</span> has <span class="r-number">' + rams + '</span> rams and <span class="r-number">' + sheep + '</span> sheep';
            $('#' + resultBoardId).html(resultHTML);

        }

        // clear input field
        $('#' + userInputId).val('');
    }

    function saveToLocalStorage() {
        var totalTime = (new Date()).getTime() - this.startTime;

        //save to local storage
        var name = prompt("Good Job! You got it. Please enter your name:");
        while (localStorage.getItem(name)) {
            if (confirm("This name already exists. Do you want to override the result?"))
                break;
            else
                name = prompt("Please enter your name");
        }

        localStorage.setObject(name, {
            time: totalTime,
            steps: this.steps
        });

        loadHighScores();
    }

    function loadHighScores() {
        if (!localStorage.length || localStorage.length != 0) {
            var topScores = getAllScores();
            sortJsonArrayByProp(topScores, "scores");
            printTopScores(topScores);
        }
    }

    function getAllScores() {
        var key, topScores = []

        for (var i = 0; i < localStorage.length; i++) {
            key = localStorage.key(i);
            topScores.push({
                name: key,
                scores: localStorage.getObject(key).time,
                steps: localStorage.getObject(key).steps
            });
        }
        return topScores;
    }

    function printTopScores(topScores) {
        var resultHTML = "";
        var topNResults = 5;
        var count = Math.min(topScores.length, topNResults);
        if (count > 0) {
            resultHTML = "<table><tr><th>Pos</th><th>Name</th><th>Time to Solve</th><th>Steps</th></tr>";
            for (var i = 0; i < count; i++) {
                resultHTML +=
                    '<tr><td>' + (i + 1) +
                    '</td><td>' + topScores[i].name +
                    '</td><td>' + topScores[i].scores +
                    '</td><td>' + topScores[i].steps +
                    '</td></tr>';
            }
            resultHTML += '<tr><td colspan="4"><button id="clear-result">Clear Table</button></td></tr>'
            resultHTML += "</table>";
        }

        $('#' + resultBoardId).length || $('<div>').attr('id', resultBoardId).appendTo($('#container'));
        $('#' + resultBoardId).html(resultHTML);
        $('#clear-result').on('click', clearResults);
    }

    function clearResults() {
        localStorage.clear();
        //document.getElementById('result-board').innerHTML = "";
        if ($('#' + resultBoardId).length) {
            $('#' + resultBoardId).html(' ');
        }
    }

    function sortJsonArrayByProp(objArray, prop) {
        if (arguments.length < 2) {
            throw new Error("sortJsonArrayByProp requires 2 arguments");
        }

        if (objArray && objArray.constructor === Array) {
            objArray.sort(function(a, b) {
                if (a[prop] && b[prop]) {
                    a = a[prop];
                    b = b[prop];
                }
                // convert numeric strings to integers
                a = a | 0;
                b = b | 0;
                return ((a < b) ? -1 : ((a > b) ? 1 : 0));
            });
        }
    }

    function Game() {
        this.steps = 0;
    }
    Game.prototype = {
        start: function() {
            drawInputFields.call(this);
            // generate number  
            this._numberToGuess = generateNumber();
            this.startTime = (new Date()).getTime();

            // I'm leaving this line so that you cn test easier :)
            console.log('NUMBER: ' + this._numberToGuess)

        },
        numberToGuess: function() {
            return this._numberToGuess;
        }
    };


    return Game;
});