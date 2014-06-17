(function($) {
    $.fn.dropdown = function() {
        var $this = this;

        var divContainerClass = 'dropdown-list-container',
            ulContainerClass = 'dropdown-list-options',
            liClass = 'dropdown-list-option',
            selectedLiContainerClass = 'selected-li-container';

        // hide the <select> drop-down
        $this.hide();

        var selectContainerWidth = $this.width();

        // add styles file
        $('head').append($('<link>').attr({
            rel: "stylesheet",
            type: "text/css",
            href: './styles/drop-down-styles.css'
        }));

        // Do we need to check if the select has <option>s and if yes - then create the div dropdown??
        // I'm not checking it! 
        var $liContainer = $('<ul />').attr('class', ulContainerClass);

        $this.find('option').each(function() {
            var $li = $('<li />').attr({
                'class': liClass,
                'data-value': $(this).val()
            }).text($(this).text());
            $liContainer.append($li);
        });

        $("<div/>").attr('class', divContainerClass).css('width', selectContainerWidth + 30)
            .append($('<div />').attr('class', selectedLiContainerClass))
            .append($liContainer).appendTo(document.body);

        // add content to the selected element holder - the value of the 1st li
        $('.' + selectedLiContainerClass).text($liContainer.children(':first-child').text());

        // set events
        $liContainer.on('click', 'li', function() {
            $('.' + selectedLiContainerClass).text($(this).text());
            // close the drop-down
            $liContainer.toggle();

            // set the corresponding option in the <select> as 'selected'
            $this.val($(this).attr('data-value')).change();
            // write in the console the value of the selected option of the <select>
            console.log($('#dropdown option:selected').text());
        });

        $liContainer.on('mouseover', 'li', function() {
            $(this).addClass('hovered');
        });

        $liContainer.on('mouseout', 'li', function() {
            $(this).removeClass('hovered');
        });

        $('.' + selectedLiContainerClass).on('click', function() {
            $liContainer.toggle();
        });

    };

})(jQuery);