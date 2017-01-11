function Box(x,y) {

	this.getX = function() {
		return x;
	}

	this.getY = function() {
		return y;
	}

	var texture = window.textures.boxTextures[Math.ceil(Math.random()*6)];

	this.draw = function(canvas) {
		canvas.drawTexture(x,y, texture);
	}
}