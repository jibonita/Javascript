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

        //TODO: Eys, nose, mouth

    }
    // a - long radius, b - short radius, x,y - center coords
    // we will modify the y and b values
    // radius = a
    function drawEllipse(ctx, a, b, x, y, from, to, colorFill, colorStroke) {
        var scale = b / a;
        // console.log('scale=' + scale);
        // console.log('x=' + x + ',y = ' + y / scale + ', r=' + a + ', from=' + from + ', to=' + to);
        ctx.save();
        ctx.scale(1, scale);
        ctx.moveTo(x + a, y / scale);
        ctx.arc(x, y / scale, a, from, to);
        ctx.restore();
    }

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
})();