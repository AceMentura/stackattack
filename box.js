function Box(x,y) {
	var self = this;
	this.getX = function() {
		return x;
	}

	this.getY = function() {
		return y;
	}

	this.setX = function(_x) {
		x = _x;
	}

	this.setY = function(_y) {
		y = _y;
	}

	var texture = window.textures.boxTextures[Math.ceil(Math.random()*6)];

	this.draw = function(canvas) {
		canvas.drawTexture(x,y, texture);
	}
}
