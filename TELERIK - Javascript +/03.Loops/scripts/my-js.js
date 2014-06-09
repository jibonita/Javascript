function execute(inputMsg, selector, outputmsg, handler, isPrintOrReturn) {
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