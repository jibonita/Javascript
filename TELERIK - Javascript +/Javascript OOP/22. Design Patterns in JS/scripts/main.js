(function() {

    require.config({
        paths: {
            'jquery': 'libs/jquery-2.1.1.min',
            'kinetic': 'libs/kinetic.min',
            'renderer': 'renderer'
        }
    });

    require(['jquery'], function(_jq) {

        // putting the function in $() is equal to '$.ready' which is 'document.onload'
        $(function() {
            var gameRenderer = new renderer.Renderer('#snake-canvas');
            var game = new engine.Game(gameRenderer);
            game.run();
        });
    });
})();