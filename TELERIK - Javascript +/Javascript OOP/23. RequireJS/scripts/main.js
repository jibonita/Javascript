(function() {

    require.config({
        paths: {
            'jquery': 'libs/jquery-2.1.1.min',
            'handlebars': 'libs/handlebars-v1.3.0',
            'combo': 'combo-box',
            'data': 'data/data'
        }
    });

    require(['jquery', 'combo', 'data'], function(_jq, controls, people) {

        // putting the function in $() is equal to '$.ready' which is 'document.onload'
        $(function() {
            var comboBox = controls.ComboBox(people);
            var template = $("#person-template").html();
            var comboBoxHtml = comboBox.render(template);

            $('#container').html(comboBoxHtml);
        });


    });
})();