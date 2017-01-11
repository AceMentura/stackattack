(function(){
    window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            function( callback ){
                window.setTimeout(callback, 1000 / 60);
            };
    })();

    function keyDownTextField (e) {
        var keyCode = e.keyCode;
        console.log(keyCode);

        // up
        if(keyCode == 38) {
            p1.jump();
        }

    }


    document.addEventListener("keydown", keyDownTextField, false);


    var canvas = new Canvas(1920, 1080);
    var scene = new Scene();
    var p1 = new Player(10, 0);

    canvas.add(scene);

    for(var i=0; i<7; i++) {
        scene.add(new Box(i, 1));
    }

    scene.add(p1);


    (function animloop() {
        requestAnimFrame(animloop);
        canvas.clear();
        canvas.render();
    })();
})();
