var specialConsole = (function() {

    function writeLine() {
        var message = prepareMessage(arguments);
        console.log(message);
    }

    function writeError() {
        var message = prepareMessage(arguments);
        console.error(message);
    }

    function writeWarn() {
        var message = prepareMessage(arguments);
        console.warn(message);
    }

    function prepareMessage() {
        switch (arguments[0].length) {
            case 0:
                return "";
                break;
            case 1:
                return arguments[0][0];
                break;
            default:
                var message = formatMessage(arguments[0]);
                return message;
        }

        function formatMessage() {
            // the arguments of formatMessage received as argument1 and array
            var text = arguments[0][0];
            for (i = 1; i < arguments[0].length; i++) {
                var regex = new RegExp('\\{' + (i - 1) + '\\}', "g");
                text = text.replace(regex, arguments[0][i]);
            }
            return text;
        }
    }

    return {
        writeLine: writeLine,
        writeError: writeError,
        writeWarning: writeWarn
    };
})();