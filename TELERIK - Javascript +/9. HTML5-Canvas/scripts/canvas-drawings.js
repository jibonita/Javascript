(function() {
    var ctx;

    drawDwarf();
    drawBike();
    drawHouse();

    // draw Dwarf function
    function drawDwarf() {
        var canvas = document.getElementById('canvas-dwarf');
        ctx = canvas.getContext('2d');

        drawHead();

        drawHat();

        drawEyes();

        drawNose();

        drawMouth();


        function drawHat() {
            ctx.beginPath();
            ctx.lineWidth = 3;
            ctx.strokeStyle = "#1f1913";
            ctx.fillStyle = "#396693";

            // hat base
            drawEllipse(ctx, 130, 25, 150, 175, 0, 2 * Math.PI);

            ctx.stroke();
            ctx.fill();
            ctx.beginPath();

            // hat cylinder
            ctx.fillRect(82, 32, 136, 123);
            drawEllipse(ctx, 68, 25, 150, 155, 0, Math.PI);
            drawEllipse(ctx, 68, 25, 150, 32, 0, 2 * Math.PI);

            //vertical part of the cylinder
            ctx.lineWidth = 2;
            ctx.lineTo(218, 155);
            ctx.moveTo(82, 155);
            ctx.lineTo(82, 32);

            ctx.closePath();
            ctx.stroke();
            ctx.fill();
        }

        function drawHead() {
            ctx.beginPath();
            ctx.lineWidth = 3;
            ctx.strokeStyle = "#1e4e5c";
            ctx.fillStyle = "#92ccda";

            drawEllipse(ctx, 116, 101, 156, 269, 0, 2 * Math.PI);

            ctx.closePath();
            ctx.stroke();
            ctx.fill();
        }

        function drawEyes() {
            ctx.lineWidth = 2;

            drawEye(65, 215);
            drawEye(155, 215);
        }

        function drawEye(x, y) {
            ctx.translate(x, y);

            ctx.beginPath();
            ctx.strokeStyle = "#1e4e5c";
            drawEllipse(ctx, 21, 15, 21, 15, 0, 2 * Math.PI);
            ctx.stroke();
            // pupil
            ctx.beginPath();
            ctx.fillStyle = "#1e4e5c";
            drawEllipse(ctx, 5, 12, 12, 15, 0, 2 * Math.PI);

            ctx.stroke();
            ctx.fill();
            ctx.closePath();

            ctx.translate(-x, -y);
        }

        function drawNose() {
            ctx.beginPath();
            ctx.strokeStyle = "#1e4e5c";

            ctx.moveTo(130, 230);
            ctx.lineTo(105, 280);
            ctx.lineTo(130, 280);

            ctx.stroke();
            ctx.closePath();
        }

        function drawMouth() {
            ctx.save();
            ctx.translate(85, 300);
            ctx.rotate(10 * Math.PI / 180);

            ctx.beginPath();
            ctx.strokeStyle = "#1e4e5c";

            drawEllipse(ctx, 45, 16, 45, 16, 0, 2 * Math.PI);

            ctx.stroke();
            ctx.closePath();
            ctx.restore();
        }
    }

    // draw the House
    function drawHouse() {
        var canvas = document.getElementById('canvas-house');
        ctx = canvas.getContext('2d');

        ctx.translate(20, 10);

        outlineHouse();

        drawChimney();

        drawWindows();

        drawDoor();


        function outlineHouse() {
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = "#000";
            ctx.fillStyle = "#975b5b";

            ctx.moveTo(0, 165);
            ctx.lineTo(150, 0);
            ctx.lineTo(300, 165);
            ctx.stroke();
            ctx.fill();

            ctx.fillRect(0, 165, 300, 225);
            ctx.strokeRect(0, 165, 300, 225);
        }

        function drawChimney() {
            ctx.strokeStyle = "#000";
            ctx.fillStyle = "#975b5b";

            ctx.clearRect(207, 42, 36, 85);
            ctx.beginPath();
            ctx.fillRect(207, 42, 36, 85);

            ctx.moveTo(207, 42);
            ctx.lineTo(207, 127);
            ctx.moveTo(243, 42);
            ctx.lineTo(243, 127);

            drawEllipse(ctx, 18, 6, 225, 42, 0, 2 * Math.PI);

            ctx.stroke();
            ctx.fill();
        }

        function outlineWindow() {

            ctx.fillStyle = "#000";
            ctx.fillRect(22, 192, 106, 70);
            ctx.strokeStyle = "#975b5b";
            ctx.moveTo(75, 192);
            ctx.lineTo(75, 262);
            ctx.moveTo(22, 227);
            ctx.lineTo(128, 227);
        }

        function drawWindows() {
            ctx.beginPath();

            outlineWindow();
            ctx.translate(140, 0);
            outlineWindow();
            ctx.translate(0, 100);
            outlineWindow();
            ctx.translate(-140, -100);

            ctx.stroke();
            ctx.fill();
            ctx.closePath();
        }

        function outlineDoorknob() {
            ctx.moveTo(69, 359);
            ctx.arc(63, 359, 6, 0, 2 * Math.PI);
            ctx.translate(24, 0);
            ctx.moveTo(69, 359);
            ctx.arc(63, 359, 6, 0, 2 * Math.PI);
            ctx.translate(-24, 0);
        }

        function drawDoor() {
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = "#000";
            ctx.fillStyle = "#975b5b";
            ctx.moveTo(118, 390);
            ctx.lineTo(118, 310);

            drawEllipse(ctx, 43, 22, 75, 310, 0, -Math.PI, true);

            ctx.moveTo(32, 310);
            ctx.lineTo(32, 390);
            ctx.moveTo(75, 288);
            ctx.lineTo(75, 390);
            outlineDoorknob();

            ctx.stroke();
        }
    }

    // draw the Bike
    function drawBike() {
        var canvas = document.getElementById("canvas-bike");
        var ctx = canvas.getContext("2d");

        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = "#20788e";

        //sedalka
        ctx.moveTo(175, 110);
        ctx.lineTo(275, 110);
        ctx.moveTo(225, 110);
        ctx.lineTo(330, 310);

        ctx.moveTo(365, 310);
        ctx.arc(330, 310, 35, 0, 2 * Math.PI, false);
        //pedali
        ctx.moveTo(280, 260);
        ctx.lineTo(304, 286);
        ctx.moveTo(350, 339);
        ctx.lineTo(368, 360);

        ctx.stroke();
        ctx.beginPath();

        //gumi
        ctx.fillStyle = "#90cad7";
        ctx.moveTo(692, 310);
        ctx.arc(577, 310, 115, 0, 2 * Math.PI, false);
        ctx.moveTo(233, 310);
        ctx.arc(118, 310, 115, 0, 2 * Math.PI, false);
        ctx.fill();

        //kormilo
        ctx.moveTo(440, 110);
        ctx.lineTo(535, 75);
        ctx.lineTo(600, 3);
        ctx.moveTo(535, 75);
        ctx.lineTo(577, 310);

        //ramka
        ctx.moveTo(118, 310);
        ctx.lineTo(257, 168);
        ctx.lineTo(550, 164);
        ctx.lineTo(330, 310);
        ctx.lineTo(118, 310);

        ctx.stroke();
    }


    /* drawEllipse function created from .arc()
     * a - long radius, b - short radius, x,y - center coords
     * we will modify the y and b values
     * radius = a
     */
    function drawEllipse(ctx, a, b, x, y, from, to, counterclockwise) {
        // scale index
        var scale = b / a;

        ctx.save();
        ctx.scale(1, scale);
        // initial point to start the arc drawing
        ctx.moveTo(x + a, y / scale);
        //** radius = a
        counterclockwise = counterclockwise || false;
        ctx.arc(x, y / scale, a, from, to, counterclockwise);
        ctx.restore();
    }


})();