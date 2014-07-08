define(function() {

    var Settings = (function() {

        function Settings() {
            var directions = {
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
            this.WALLS_COUNT = 10;
        }

        return Settings;

    })();

    return Settings;
});