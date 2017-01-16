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
        if(keyCode == LEFT_KEY) {
            if(p1.canMoveLeft(scene)){
                p1.moveLeft();
            }
            if(p1.canPushLeft(scene)){
                p1.pushLeft();
            }
        }
        if(keyCode == RIGHT_KEY) {
            if(p1.canMoveRight(scene)) {
                p1.moveRight();
            }
            if(p1.canPushRight(scene)) {
                p1.pushRight();
            }
        }
    }

    document.addEventListener("keydown", keyDownTextField, false);


    var canvas = new Canvas(1920, 1080);
    var scene = new Scene();
    var p1 = new Player(7, 1);

    canvas.add(scene);

    // for(var i=0; i<7; i++) {
    //     scene.add(new Box(i, 3));
    // }

    scene.add(new Box(2,0));
    scene.add(new Box(4,1));
    scene.add(new Box(4,0));
    scene.add(new Box(1,4));
    scene.add(new Box(6,0));

    scene.add(p1);

    window.log = [];
    var log = document.getElementById("log");
    function printLog() {
        log.innerHTML = objToTable(window.log);
    }
    function objToTable(obj) {
        var res = "";
        for(var i in obj) {
            if(typeof obj[i] == "object") {
                res += "<tr><td colspan=2 align='center' ><b>" + i + "</b></td></tr>";
                res += objToTable(obj[i]);
            } else {
                res += "<tr><td>" + i + "</td><td>" + obj[i] + "</td></tr>";
            }
        }
        return res;
    }

    (function animloop() {
        requestAnimFrame(animloop);
        canvas.clear();
        canvas.render();
        printLog();
    })();
})();
