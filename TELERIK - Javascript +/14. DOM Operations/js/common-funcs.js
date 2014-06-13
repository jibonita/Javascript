// get browser width and height. I copied these functions from Internet
function getWidth() {
    var x = 0;
    if (self.innerHeight) {
        x = self.innerWidth;
    } else if (document.documentElement && document.documentElement.clientHeight) {
        x = document.documentElement.clientWidth;
    } else if (document.body) {
        x = document.body.clientWidth;
    }
    return x;
}

function getHeight() {
    var y = 0;
    if (self.innerHeight) {
        y = self.innerHeight;
    } else if (document.documentElement && document.documentElement.clientHeight) {
        y = document.documentElement.clientHeight;
    } else if (document.body) {
        y = document.body.clientHeight;
    }
    return y;
}


$(document).ready(function() {
    var infoMenuOpen = false;
    if ($('#asset').length) {
        infoMenuOpen = true;
    }

    $("#infoLnk").click(function() {

        if (infoMenuOpen) {
            $('#ExtLMenu').css('margin-top', -77);
            $('#GbHolder').css('margin-top', 45);
        } else {
            $('#ExtLMenu').css('margin-top', -117);
            $('#GbHolder').css('margin-top', 88);
        }
        infoMenuOpen = !infoMenuOpen;
    });

});