(function() {
    'use strict';
    require.config({
        paths: {
            'jquery': 'libs/jquery-2.1.1.min',
            'raphael': 'libs/raphael-min',
            'kinetic': 'libs/kinetic.min',
            'settings': 'settings',
            'common': 'common-methods'
        }
    });

    require(['room-widgets', 'background', 'google-guys'], function(roomWidgets, background, googles) {
        //require(['room-widgets'], function(roomWidgets) {
        //require([ 'background'], function( background) {
        //require(['background','room-widgets'], function(background, roomWidgets) {

        // background stuff
        // background.drawBases();

        // background.drawOutsideOfficeChart(22, 90);

        // // background.drawInsideOfficeChart(x,y);

        // background.drawRoomWalls(135, 27);

        // background.drawCabinet(135, 27);

        background.drawChairs(135, 27);

        // google letters
        googles.drawGuys(135, 27);

        background.drawWorkTable(135, 27);

        // // room widgets
        // //roomWidgets.drawChairs(135, 27); --> rafael chairs are more clear

        // roomWidgets.drawRoomChart(135, 27);

        // roomWidgets.drawClock(618, 72);

        // roomWidgets.drawTVScreen(135, 27);

        // roomWidgets.drawWaterMachine(810, 170);

        
    });
})();