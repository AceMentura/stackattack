function Canvas(canvasWidth, canvasHeight) {
    'use strict';
    var canvas = document.getElementById("stack-attack");
    canvas.style.position = "absolute";
    var ctx = canvas.getContext("2d");
    var maxX = 100; // 0 to 99 including 0
    var maxY = 64; // 0 to 64 including 0
    var cubeWidth = (canvasWidth / maxX);
    var cubeHeight = (canvasHeight / maxY);

    resizeCanvasToRatio(maxX, maxY);

    var elements = [];

    var self = this;

    this.add = function(element) {
        elements.push(element);
    }

    this.render = function() {
        for(var el in elements) {
            elements[el].draw(self);
        }
    }

    this.getElement = function() {
        return canvas;
    }

    // Used for background textures not attached to the grid for playing
    this.drawTextureRealXY = function(x,y,texture) {
        for(var i=0;i<texture.length;i++) {
            for(var j=0;j<texture[i].length;j++) {
                if(texture[i][j] == 1) {
                    this.makeRect(j + x, i + y);
                } else {
                    this.makeRect(j + x, i + y, true);
                }
            }
        }
    }

    // gridX, gridY are the bottom left corner
    // x,y are the top left corner
    this.drawTexture = function(gridX,gridY,texture) {
        var x = gridX*8 + 4;
        var y = maxY - (gridY*8 + 4) - texture.length;
        this.drawTextureRealXY(x,y,texture);
    }

    this.makeRect = function(x, y, white) {
        if(x < 0 || x > maxX || y < 0 || y > maxY) { return; }
        var xReal = x * cubeWidth;
        var yReal = y * cubeHeight;

        if (white) {
            ctx.fillStyle = "#ffffff";
        } else {
            ctx.fillStyle = "#000000";
        }
        ctx.fillRect(xReal, yReal, cubeWidth, cubeHeight);
    }

    this.clear = function() {
        ctx.clearRect(0,0,canvasWidth, canvasHeight);
    }

    function resizeCanvasToRatio(width, height) {
        if(window.innerHeight / window.innerWidth < height / width) {
            canvas.style.width = (window.innerHeight * (width/height)) + "px";
            canvas.style.height = window.innerHeight + "px";
            canvas.style.marginLeft = ((window.innerWidth - parseInt(canvas.style.width)) / 2) + "px";
        } else {
            canvas.style.width = window.innerWidth + "px";
            canvas.style.height = (window.innerWidth * (height/width)) + "px";
            canvas.style.marginTop = ((window.innerHeight - parseInt(canvas.style.height)) / 2) + "px";
        }
    }
}
