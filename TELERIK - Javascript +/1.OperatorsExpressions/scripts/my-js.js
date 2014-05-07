function Exec(inputMsg, selector, handler){
	//input message for the user
	if (inputMsg.length == 0) {
		// default message  
		inputMsg = 'Please enter an integer number: ';
	};
	jsConsole.write(inputMsg);

	jsConsole.addInputField(selector, function(e){
		if(e.keyCode === 13){

            var value = jsConsole.read('#'+selector);
			var result = handler(value);
			jsConsole.writeLine(result);
			// remove the focus of the input field
			this.blur();
			this.disabled = true;
        } 

	});
}