(function(){
    var c = new Canvas(1920, 1080);

    window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            function( callback ){
                window.setTimeout(callback, 1000 / 60);
            };
    })();

    function render() {
        c.clear();

        c.addStaticTextures();

        c.addBox(4,52);
    }

    // (function animloop() {
    //     requestAnimFrame(animloop);
    //     render();
    // })();

    render();

    c.animateTexture(56, 44, window.textures.playerTexturesAnimations.idle);

})();