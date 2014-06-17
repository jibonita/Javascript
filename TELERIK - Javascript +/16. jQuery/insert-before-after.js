(function($) {
    var colors = ['red', 'blue', 'orange', 'green'];

    generateColorBoxes(colors);

    // creating the page that you see using insertBefore and insertAfter methods of jQuery. 
    // button "Insert" is not working because I haven;t finished the task

    var insertLabel = $('<span />').text('Insert '),
        selectFrom = generateSelect(colors).attr('id', 'select-from'), //.appendTo($('#from'));
        selectTo = generateSelect(colors).attr('id', 'select-to'); //.appendTo($('#to'));

    insertLabel.insertBefore($('#insert-btn'));
    selectTo.insertAfter(selectFrom.insertAfter(insertLabel));

    $('<div />').attr('id', 'radios').append(generateInput('before')).insertBefore(selectTo);
    $('<label />').html(' before').appendTo($('#radios'));
    $('<br />').appendTo($('#radios'));
    generateInput('after').appendTo($('#radios'));
    $('<label />').html(' after').appendTo($('#radios'));



    function generateColorBoxes(colors) {
        for (var i = 0; i < colors.length; i++) {
            $('<div />').addClass(colors[i] + '-div').html(colors[i]).appendTo($('#color-boxes'));
        }
    }

    function generateSelect(colors) {
        var selectTag = $('<select />');
        for (var i = 0; i < colors.length; i++) {
            $('<option />').attr('value', colors[i]).html(colors[i]).appendTo(selectTag);
        }
        return selectTag;
    }

    function generateInput(value) {
        return $('<input>').attr({
            type: 'radio',
            value: value,
            id: 'input-' + value
        })
    }

})(jQuery);