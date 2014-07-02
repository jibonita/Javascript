(function() {
    var stage = new Kinetic.Stage({
        container: containerID,
        width: containerWidth,
        height: containerHeight
    });
    var layer = new Kinetic.Layer();
    $('#' + containerID).find('.kineticjs-content').css('position', 'absolute');
    $('#' + containerID).find('.kineticjs-content').addClass('the-canvas');

    function drawRoomChart(x, y) {}

    function drawClock(x, y) {

        var arc = new Kinetic.Arc({
            innerRadius: 40,
            outerRadius: 80,
            fill: 'red',
            stroke: 'black',
            strokeWidth: 5,
            angle: 60,
            rotationDeg: -120
        });

        return arc;
    }

    function drawTVScreen(x, y) {}

    function drawWaterMachine(x, y) {}

    drawRoomChart(135, 27);

    layer.add(drawClock(135, 27));
    stage.add(layer);

    drawTVScreen(135, 27);

    drawWaterMachine(135, 27);


})();