(function() {

    require.config({
        paths: {
            'jquery': 'libs/jquery-2.1.1.min',
            'kinetic': 'libs/kinetic.min'
        }
    });

    require(['jquery'], function(_jq) {

        // putting the function in $() is equal to '$.ready' which is 'document.onload'
        $(function() {


        });
    });
})();