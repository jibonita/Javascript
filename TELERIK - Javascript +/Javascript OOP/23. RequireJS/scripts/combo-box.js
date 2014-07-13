define(['handlebars'], function() {
    var comboWrapperId = 'combo-wrapper';

    var ComboBox = (function() {

        function ComboBox(data) {
            this.data = data instanceof Array ? data : '';
        }

        function addEvents(element, display) {
            var $element = $(element),
                $displayBox = $(display);

            $element.children().on('click', function() {
                // the element that is selected should not have the same id as the elements from the drop-down
                $displayBox.empty().append($(this).clone().removeClass('hovered').removeAttr('id'));
                //$element.hide();
                $element.slideUp();
            });

            $element.children().on('mouseover', function() {
                console.log('mouseovered');
                $(this).addClass('hovered');
            });

            $element.children().on('mouseout', function() {
                $(this).removeClass('hovered');
            });

            $displayBox.on('click', function() {
                //$element.show();
                $element.slideDown();
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
                    $comboWrapper = $('<div>').attr('id', comboWrapperId).hide();

                    var goTemplate = Handlebars.compile(template);
                    for (var i = 0; i < this.data.length; i++) {
                        var item = goTemplate(this.data[i]);
                        $(item).appendTo($comboWrapper);
                    };

                    addEvents($comboWrapper, $displayBox);

                    $resultHtml.append($displayBox).append($comboWrapper);
                    return $resultHtml;
                };
                return null;

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