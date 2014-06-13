(function() {
    var bgrSpeed = 10,
        container = 'mario-container';
    var paper = Raphael(container, width, height);

    drawBricks();
    drawHill();
    drawBush();

    function drawBricks() {
        var brickW = 53,
            brickH = 43,
            brickImageMargin = 3,
            startX = width - brickW,
            startY = height - brickH;

        // draw two rows of bricks. Because of the brick image that I use, I start the drawing from the right to the left
        do {
            paper.image("images/brick.png", startX, startY, brickW, brickH);
            paper.image("images/brick.png", startX, startY - brickH + brickImageMargin, brickW, brickH);
            startX -= brickW - brickImageMargin;

        } while (startX + brickW > 0);
    }

    function drawHill() {
        drawMovingObjects(112, 433, 246, 90, "images/hill.png");
    }

    function drawBush() {
        drawMovingObjects(792, 480, 194, 46, "images/bush.png");
    }

    function drawMovingObjects(x, y, w, h, src) {
        var startX = x,
            startY = y,
            objWidth = w,
            objHeight = h,
            mobject = paper.image(src, startX, startY, objWidth, objHeight);

        move();

        function move() {
            if (mobject.attrs.x > -objWidth) {
                mobject.attr({
                    x: mobject.attrs.x - bgrSpeed
                });
            } else {
                mobject.attr({
                    x: width
                });
            }
            setTimeout(move, 100);
        }
    }
})();