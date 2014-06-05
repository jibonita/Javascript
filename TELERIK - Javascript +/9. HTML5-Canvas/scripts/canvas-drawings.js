(function() {
    var ctx;

    drawDwarf();
    //  drawBike();
    //  drawHouse();

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
    /* drawEllipse function created from .arc()
     * a - long radius, b - short radius, x,y - center coords
     * we will modify the y and b values
     * radius = a
     */
    function drawEllipse(ctx, a, b, x, y, from, to) {
        // scale index
        var scale = b / a;

        ctx.save();
        ctx.scale(1, scale);
        // initial point to start the arc drawing
        ctx.moveTo(x + a, y / scale);
        //** radius = a
        ctx.arc(x, y / scale, a, from, to);
        ctx.restore();
    }


})();