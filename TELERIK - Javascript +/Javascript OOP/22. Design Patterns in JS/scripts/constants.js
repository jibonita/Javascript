define(function() {

    var Settings = (function() {

        function Settings() {
            this.directions = {
                right: {
                    dx: 1,
                    dy: 0
                },
                left: {
                    dx: -1,
                    dy: 0
                },
                top: {
                    dx: 0,
                    dy: -1
                },
                bottom: {
                    dx: 0,
                    dy: 1
                }
            };

            this.CELL_SIZE = 24;
            this.INITIAL_SNAKE_LENGTH = 5;
            this.WALLS_COUNT = 2;
        }

        return Settings;

    })();

    return {
        Settings: function() {
            return new Settings();
        }
    };
});