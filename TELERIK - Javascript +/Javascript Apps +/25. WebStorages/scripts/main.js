(function() {

    require.config({
        paths: {
            'jquery': 'libs/jquery-2.1.1.min',
            'storage': 'web-storage-objects',
            'localStorage': 'libs/localStorage-Shims'
        }
    });

    require(['game'], function(Game) {

        // generate number

        // draw  user inpur field

        // read input

        // process input	

        // display result 
        //- if  4 rams
        // a.ask for name
        //b. store result
        //c. dislay results chart

        // else - return to read input
        var game = new Game();
        $('<button>').attr('id', 'start-game').html('Start New Game').on('click', function() {
            game.start();
        }).appendTo($('body'));


    });
})();