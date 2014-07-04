define(['handlebars'], function() {
    jQuery.fn.outerHTML = function() {
        return jQuery('<div />').append(this.eq(0).clone()).html();
    };
    var ComboBox = (function() {
        var selectedOptionClass = 'selected-option';

        function ComboBox(data) {
            console.log("in constructo:" + data.length);

            this.data = data;

        }

        function addEvents(element, display) {
            var $element = $(element),
                $displayBox = $(display);

            // TODO the element that is selected should not have the same id as the elements from the drop-down
            $element.children().on('click', function() {
                $displayBox.html($(this).removeClass('hovered').outerHTML());
                $element.hide();
            });

            $element.children().on('mouseover', function() {
                console.log('mouseovered');
                $(this).addClass('hovered');
            });

            $element.children().on('mouseout', function() {
                $(this).removeClass('hovered');
            });

            $displayBox.on('click', function() {
                $element.show();
            });

        }

        ComboBox.prototype = {
            render: function(template) {
                var dataCount = this.data.length,
                    $displayBox,
                    $comboWrapper,
                    $resultHtml = $('<div>');

                if (dataCount > 0) {
                    // create the display info box
                    $displayBox = $('<div>').attr('id', 'display').html("Select option...");

                    // create drop-down
                    $comboWrapper = $('<div>').attr('id', 'combo-wrapper').hide();

                    var goTemplate = Handlebars.compile(template);
                    // $comboWrapper.html(goTemplate({
                    //     options: this.data
                    // }));
                    for (var i = 0; i < this.data.length; i++) {
                        var item = goTemplate(this.data[i]);
                        $(item).appendTo($comboWrapper);
                        //$comboWrapper.append($(goTemplate(this.data[i])));
                    };

                    //$comboWrapper.children().first().addClass('selected');

                    addEvents($comboWrapper, $displayBox);


                    // $('#container').html($displayBox.outerHTML() + $comboWrapper.outerHTML());
                    // $('#container').append($displayBox);
                    // $('#container').append($comboWrapper);
                    //return $displayBox.outerHTML() + $comboWrapper.outerHTML();
                    $resultHtml.append($displayBox).append($comboWrapper);
                    return $resultHtml;
                };
                return '';

            }
        };
        return ComboBox;
    })();

    return {
        ComboBox: function(data) {
            return new ComboBox(data);
        }
    };
});