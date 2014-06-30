var Shape = function(container) {

    var canvas = document.querySelector(container);
    this.ctx = canvas.getContext('2d');

    return this;
};

Shape.prototype = {
    rect: function(parameters) {
        // if some of the parameters is not passed, it will be set as false
        var x = parameters.x || false,
            y = parameters.y || false,
            width = parameters.width || false,
            height = parameters.height || false,
            lineWidth = parameters["line-width"] || false,
            stroke = parameters["stroke-style"] || false,
            fill = parameters["fill-style"] || false;

        // check if we have passes all the 4 required parameters for the rectangle to be drawn
        if (x && y && width && height) {
            if (lineWidth) {
                this.ctx.lineWidth = lineWidth;
            }

            if (stroke) {
                this.ctx.strokeStyle = stroke;
            }
            this.ctx.strokeRect(x, y, width, height);

            if (fill) {
                this.ctx.fillStyle = fill;
                this.ctx.fillRect(x, y, width, height);
            }

            this.setContextToDefault();
        } else {
            throw new TypeError("Failed to execute 'rect' on 'CanvasRenderingContext2D': 4 arguments required");
        }

        return this;
    },
    circle: function(parameters) {
        var x = parameters.x || false,
            y = parameters.y || false,
            radius = parameters.r || false,
            lineWidth = parameters["line-width"] || false,
            stroke = parameters["stroke-style"] || false,
            fill = parameters["fill-style"] || false;

        // check if we have passes all the 4 required parameters for the circle to be drawn
        if (x && y && radius) {
            if (lineWidth) {
                this.ctx.lineWidth = lineWidth;
            }

            this.ctx.beginPath();
            this.ctx.arc(x, y, radius, 0, 2 * Math.PI);

            if (stroke) {
                this.ctx.strokeStyle = stroke;
                this.ctx.stroke();
            }

            if (fill) {
                this.ctx.fillStyle = fill;
                this.ctx.fill();
            }

            this.setContextToDefault();
        } else {
            throw new TypeError("Failed to execute 'circle' on 'CanvasRenderingContext2D': 3 arguments required");
        }

        return this;
    },
    line: function(parameters) {
        var fromX = parameters.x1 || false,
            fromY = parameters.y1 || false,
            toX = parameters.x2 || false,
            toY = parameters.y2 || false,
            lineWidth = parameters["line-width"] || false,
            stroke = parameters["stroke-style"] || false;

        // check if we have passes all the 4 required parameters for the line to be drawn
        if (fromX && fromY && toX && toY) {
            if (lineWidth) {
                this.ctx.lineWidth = lineWidth;
            }
            if (stroke) {
                this.ctx.strokeStyle = stroke;
            }

            this.ctx.beginPath();
            this.ctx.moveTo(fromX, fromY);
            this.ctx.lineTo(toX, toY);
            this.ctx.stroke();
            this.ctx.closePath();

            this.setContextToDefault();
        } else {
            throw new TypeError("Failed to execute 'line' on 'CanvasRenderingContext2D': 4 arguments required");
        }

        return this;
    },
    setContextToDefault: function() {
        this.ctx.fillStyle = "#000";
        this.ctx.strokeStyle = "#000";
        this.ctx.lineWidth = 1;
    }
};