define(['gameObject'], function(gameObject) {

    var Renderer = (function() {
        var ctx;

        function draw(obj) {
            if (obj instanceof gameObject.SnakePart) {
                drawSnakePart(obj);
            }
            if (obj instanceof gameObject.Snake) {
                drawSnake(obj);
            }
            if (obj instanceof gameObject.Wall) {
                drawWall(obj);
            }
            if (obj instanceof gameObject.Food) {
                drawFood(obj);
            }
        }

        function drawSnakePart(obj) {
            var base_image = new Image();
            base_image.src = 'images/snake-part.png';
            base_image.onload = function() {
                ctx.drawImage(base_image, obj.getPosition().x, obj.getPosition().y);
            };
        }

        function drawSnakeHead(obj) {
            var base_image = new Image();
            base_image.src = 'images/snake-head.png';
            base_image.onload = function() {
                ctx.drawImage(base_image, obj.getPosition().x, obj.getPosition().y);
            };
        }

        function drawSnake(obj) {
            drawSnakeHead(obj.snakeBody[0])
            for (var i = 1; i < obj.size; i++) {
                drawSnakePart(obj.snakeBody[i]);
            }
        }

        function drawWall(obj) {
            var base_image = new Image();
            base_image.src = 'images/wall.png';
            base_image.onload = function() {
                ctx.drawImage(base_image, obj.getPosition().x, obj.getPosition().y);
            };
        }

        function drawFood(obj) {
            var base_image = new Image();
            base_image.src = 'images/food.png';
            base_image.onload = function() {
                ctx.drawImage(base_image, obj.getPosition().x, obj.getPosition().y);
            };
        }

        function clearCanvas() {
            ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }

        var Renderer = (function() {

            function Renderer(selector) {
                this.canvas = document.querySelector(selector);
                ctx = this.canvas.getContext('2d');
            }

            Renderer.prototype = {
                draw: draw,
                clear: clearCanvas
            };

            return Renderer;
        })();

        return {
            Renderer: Renderer
        };
    })();

    return Renderer;
});