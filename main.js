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


    (function animloop() {
        requestAnimFrame(animloop);
        canvas.clear();
        canvas.render();
    })();
})();
