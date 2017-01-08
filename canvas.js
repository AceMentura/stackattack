function Canvas(canvasWidth, canvasHeight) {
    var canvas = document.getElementById("stack-attack");
    canvas.style.position = "absolute";
    var ctx = canvas.getContext("2d");
    var maxX = 100; // 0 to 99 including 0
    var maxY = 64; // 0 to 64 including 0
    var cubeWidth = (canvasWidth / maxX);
    var cubeHeight = (canvasHeight / maxY);

    resizeCanvasToRatio(maxX, maxY);

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

    // x, y are the top left corner
    this.drawTexture = function(x,y,texture) {
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

    this.addStaticTextures = function() {
        self = this;
        function addFloor() {
            for(var i=4; i < 99; i+=4) {
                self.drawTexture(i, 60, window.textures.floorTexture);
            }
        }

        function addWall() {
            for(var i=0; i < 63; i+=4) {
                self.drawTexture(0, i, window.textures.wallTexture);
            }
        }

        function addBackground() {
            for(var i=4; i < 99; i+=8) {
                self.drawTexture(i, 4, window.textures.backgroundTexture);
            }
        }

        function addRailing() {
            for(var i=0; i < 99; i+=4) {
                self.drawTexture(i, 0, window.textures.railingTexture);
            }
        }

        addFloor();
        addWall();
        addRailing();
        addBackground();
    }

    this.addBox = function(x,y) {
        for(var i=0;i<6;i++) {
            this.drawTexture(x + i*8, y, window.textures.boxTextures[i]);
        }
    }

    this.animateTexture = function(x,y,texture) {
        self = this;
        setInterval(function(){
            var t = texture.shift();
            self.drawTexture(x,y,t);
            texture.push(t);
        },500);
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