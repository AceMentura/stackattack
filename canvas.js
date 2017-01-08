(function(){
    'use strict';
    function Canvas(canvasWidth, canvasHeight) {
        var canvas = document.getElementById("stack-attack");
        var ctx = canvas.getContext("2d");
        var maxX = 100; // 0 to 99 including 0
        var maxY = 64; // 0 to 64 including 0
        var cubeWidth = (canvasWidth / maxX);
        var cubeHeight = (canvasHeight / maxY);

        resizeCanvasToRatio(maxX, maxY);

        this.makeRect = function(x, y) {
            if(x < 0 || x > maxX || y < 0 || y > maxY) { return; }
            var xReal = x * cubeWidth;
            var yReal = y * cubeHeight;

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

    window.requestAnimFrame = (function(){
        return  window.requestAnimationFrame       ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame    ||
                function( callback ){
                    window.setTimeout(callback, 1000 / 60);
                };
    })();

    var cubes = [
        [0, 0],
        [0, 63],
        [99, 0],
        [99, 63],
        [1, 1]
    ];

    var c = new Canvas(1920, 1080);

    function render() { 
        c.clear();

        cubes.map(function(x) {
            c.makeRect(x[0], x[1]);
        });

        addFloor();
        addWall();
        addRailing();
        addBackground();

        addBox(4,52);
    }

    function addFloor() {
        for(var i=4; i < 99; i+=4) {
            drawTexture(i, 60, window.textures.floorTexture);
        }
    }

    function addWall() {
        for(var i=0; i < 63; i+=4) {
            drawTexture(0, i, window.textures.wallTexture);
        }
    }

    function addBackground() {
        for(var i=0; i < 99; i+=8) {
            drawTexture(i, 4, window.textures.backgroundTexture);
        }
    }

    function addRailing() {
        for(var i=0; i < 99; i+=4) {
            drawTexture(i, 0, window.textures.railingTexture);
        }
    }

    function addBox(x,y) {
        for(var i=0;i<6;i++) {
            drawTexture(x + i*8, y, window.textures.boxTextures[i]);
        }
    }

    function drawTexture(x,y,texture) {
        for(var i=0;i<texture.length;i++) {
            for(var j=0;j<texture[i].length;j++) {
                if(texture[i][j] == 1) {
                    c.makeRect(j + x, i + y);
                }
            }
        }
    }

    // (function animloop() {
    //     requestAnimFrame(animloop);
    //     render();
    // })();

    render();
})();