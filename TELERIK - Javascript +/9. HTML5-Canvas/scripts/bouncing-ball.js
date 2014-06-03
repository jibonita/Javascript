(function() {

    var canvas = document.getElementById('ball-canvas');
    var ctx = canvas.getContext('2d'),
        cnvWidth = canvas.width,
        cnvHeight = canvas.height;

    //Ball features:
    // - it will start from the center of the canvas 
    // - radius = 2% of the canvas width
    // - speed - 2
    // - initial position of movement: right-bottom
    var ballRadius = 0.02 * cnvWidth,
        ballDir = {
            x: 1,
            y: 1
        },
        ballPos = {
            x: cnvWidth / 2,
            y: cnvHeight / 2
        },
        ballColor = 'green',
        ballSpeed = 2;

    moveBall();

    function drawBall() {
        ctx.beginPath();
        ctx.arc(ballPos.x, ballPos.y, ballRadius, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fillStyle = ballColor;
        ctx.fill();
    }
    var flag = 0;

    function moveBall() {

        // clear the canvas so that it is ready for the new animation frame drawing
        ctx.clearRect(0, 0, cnvWidth, cnvHeight);

        drawBall();

        // next ball position
        ballPos.x += ballDir.x * ballSpeed;
        ballPos.y += ballDir.y * ballSpeed;

        // check if the ball has reached some of the canvas borders and change its direction
        if (ballPos.x + ballRadius > cnvWidth) {
            ballDir.x = -1;
        } else {
            if (ballPos.x - ballRadius < 0) {
                ballDir.x = 1;
            } else {
                if (ballPos.y + ballRadius > cnvHeight) {
                    ballDir.y = -1;
                } else {
                    if (ballPos.y - ballRadius < 0) {
                        ballDir.y = 1;
                    }
                }
            }
        }

        requestAnimationFrame(moveBall);
    }

})();