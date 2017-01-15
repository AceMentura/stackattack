(function(){
    window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            function( callback ){
                window.setTimeout(callback, 1000 / 60);
            };
    })();

    var LEFT_KEY = 37;
    var UP_KEY = 38;
    var RIGHT_KEY = 39;

    function keyDownTextField (e) {
        var keyCode = e.keyCode;
        // console.log(keyCode);

        if(keyCode == UP_KEY) {
            p1.jump();
        }
        if(keyCode == LEFT_KEY && p1.canMoveLeft(scene)) {
            p1.moveLeft();
        }
        if(keyCode == RIGHT_KEY && p1.canMoveRight(scene)) {
            p1.moveRight();
        }
    }

    document.addEventListener("keydown", keyDownTextField, false);


    var canvas = new Canvas(1920, 1080);
    var scene = new Scene();
    var p1 = new Player(10, 1);

    canvas.add(scene);

    for(var i=0; i<7; i++) {
        scene.add(new Box(i, 3));
    }

    scene.add(new Box(2,0));
    scene.add(new Box(4,1));
    scene.add(new Box(4,0));
    scene.add(new Box(1,4));

    scene.add(p1);

    window.log = [];

    var log = document.getElementById("log");
    function printLog() {
        log.innerHTML = "";
        for(var i in window.log) {
            if(typeof window.log[i] == "object") {
                log.innerHTML += "<tr colspan=2>" + i + "</tr>";
                for(var j in window.log[i]) {
                    log.innerHTML += "<tr><td>" + j + "</td><td>" + window.log[i][j] + "</td></tr>";    
                }
            } else {
                log.innerHTML += "<tr><td>" + i + "</td><td>" + window.log[i] + "</td></tr>";
            }
        }
    }

    (function animloop() {
        requestAnimFrame(animloop);
        canvas.clear();
        canvas.render();
        printLog();
    })();
})();
