function Exec(inputMsg, selector, outputmsg, handler, isPrintOrReturn) {
    //input message for the user
    if (inputMsg.length == 0) {
        // default message  
        inputMsg = 'Please enter an integer number: ';
    };
    jsConsole.write(inputMsg);

    jsConsole.addInputField(selector, function(e) {
        if (e.keyCode === 13) {

            var value = jsConsole.readInteger('#' + selector);
            var result = handler(value);

            // remove the focus of the input field
            this.blur();
            this.disabled = true;

            if (typeof isPrintOrReturn === false) {
                return result;
            } else {
                jsConsole.write(outputmsg);
                jsConsole.write(result);
            }
        }
    });
}

function temp() {


    var result = "";
    if (a == b && b == c) {
        result = "A=B=C";
    } else {
        if (a > b) {
            if (a > c) {
                result = "The biggest is A";
            } else {
                if (a == c) {
                    result = "The biggest are A=C";
                } else {
                    result = "The biggest is C";
                }
            }
        } else {
            if (b > c) {
                if (a == b) {
                    result = "The biggest are A=B";
                } else {
                    result = "The biggest is B";
                }
            } else if (c == b) {
                result = "The biggest are B=C";
            } else {
                result = "The biggest is C";
            }
        }
    }
    return result;
}