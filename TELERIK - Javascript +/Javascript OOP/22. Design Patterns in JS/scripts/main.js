(function() {

    require.config({
        paths: {
            'jquery': 'libs/jquery-2.1.1.min',
            'kinetic': 'libs/kinetic.min',
            'renderer': 'renderer',
            'gameObject': 'game-objects',
            'engine': 'engine'
        }
    });

    require(['jquery', 'renderer', 'engine'], function(_jq, renderer, engine) {

        // putting the function in $() is equal to '$.ready' which is 'document.onload'
        $(function() {
            var gameRenderer = new renderer.Renderer('#snake-canvas');
            var game = new engine.Game(gameRenderer);
            game.run();
        });
    });
})();