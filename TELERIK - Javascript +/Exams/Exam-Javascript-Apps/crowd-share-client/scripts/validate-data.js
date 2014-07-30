define([], function() {
    var MIN_LENGTH = 6,
        MAX_LENGTH = 40;

    var _errorMessage = '';

    function validateStringData(input) {
        input = input || '';
        if (MIN_LENGTH <= input.length && input.length <= MAX_LENGTH) {
            _errorMessage = '';
            return true;
        }

        _errorMessage = 'Please enter string between ' + MIN_LENGTH + ' and ' + MAX_LENGTH + ' characters';
        return false;
    }

    function isNotEmptyData(input) {
        input = input || '';
        if (input.length > 0) {
            _errorMessage = '';
            return true;
        }
        errorMessage = 'Values should not be an empty string';
        return false;
    }

    function getErrorMessage() {
        return _errorMessage;
    }

    return {
        validateStringData: validateStringData,
        isNotEmptyData: isNotEmptyData,
        errorMessage: getErrorMessage
    };
});