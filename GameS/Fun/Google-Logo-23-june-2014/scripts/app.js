(function() {
    'use strict';
    require.config({
        paths: {
            'jquery': 'libs/jquery-2.1.1.min',
            'raphael': 'libs/raphael-min',
            'kinetic': 'libs/kinetic.min',
            'settings': 'settings'
        }
    });

    require(['room-widgets', 'background'], function(roomWidgets, background) {

        // background stuff
        // background.drawBases();

        // background.drawOutOfficeChart(22, 90);

        // background.drawRoomWalls(135, 27);

        // background.drawCabinet(135, 27);

        // background.drawWorkTable(135, 27);

        background.drawChairs(135, 27);

        // room widgets
        roomWidgets.drawRoomChart(135, 27);

        roomWidgets.drawClock(618, 72);

        roomWidgets.drawTVScreen(135, 27);

        roomWidgets.drawWaterMachine(810, 170);
    });
})();