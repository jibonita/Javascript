(function() {
    drawDwarf();
    //  drawBike();
    //  drawHouse();

    function drawDwarf() {
        var canvas = document.getElementById('canvas-dwarf');
        var ctx = canvas.getContext('2d');


        // ctx.moveTo(280, 175);
        // draw hat
        ctx.beginPath();

        // hat base
        drawEllipse(ctx, 130, 25, 150, 175, 0, 2 * Math.PI);
        // hat cylinder
        drawEllipse(ctx, 68, 25, 150, 155, 0, 2 * Math.PI);


        ctx.closePath();
        ctx.stroke();

    }
    // a - long radius, b - short radius, x,y - center coords
    // we will modify the y and b values
    // radius = a
    function drawEllipse(ctx, a, b, x, y, from, to, colorFill, colorStroke) {
        var scale = b / a;
        // console.log('scale=' + scale);
        // console.log('x=' + x + ',y = ' + y / scale + ', r=' + a + ', from=' + from + ', to=' + to);
        ctx.scale(1, scale);
        ctx.moveTo(x + a, y / scale);
        ctx.arc(x, y / scale, a, from, to);
        ctx.scale(1, 1);
    }
})();