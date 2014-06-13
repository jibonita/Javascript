(function() {
    var container = 'mario-pal';

    var stage = new Kinetic.Stage({
        container: container,
        width: width,
        height: height
    });

    var layer = new Kinetic.Layer();

    var imageObj = new Image();
    imageObj.onload = function() {
        var mario = new Kinetic.Sprite({
            x: 435,
            y: 312,
            image: imageObj,
            animation: 'idle',
            animations: {
                idle: [
                    // x, y, width, height (4 frames)
                    0, 0, 148, 218,
                    187, 0, 161, 218,
                    560, 0, 213, 218,
                    187, 0, 161, 218
                ]
            },
            frameRate: 4,
            frameIndex: 0
        });

        // add the shape to the layer
        layer.add(mario);

        // add the layer to the stage
        stage.add(layer);

        // start sprite animation
        mario.start();
    };

    imageObj.src = "images/marios.png";

})();