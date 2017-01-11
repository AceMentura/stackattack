function Player(x,y) {
	'use strict';

	var self = this;
	this.textures = new PlayerTextures();

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

	this.draw = function(canvas) {
		canvas.drawTexture(x, y, self.textures.getTexture());
	}

	this.jump = function() {
		var animationCycles = 8;
		var animationCyclesCount = 0;
		var speed = 50; // milliseconds

		self.textures.setJump();
		self.animation = setInterval(function() {
			y += 1/animationCycles;
			animationCyclesCount ++;
			if(animationCyclesCount == animationCycles) {
				clearInterval(self.animation);
				self.textures.setIdle()
			}
		}, speed);
	}
	this.textures.setIdle();
}

function PlayerTextures() {
	var self = this;
	self.texture = [];
	self.textureInterval = null;
	return {
		getTexture: function() {
			return self.texture;
		},
		setTexture: function(texture) {
			self.texture = texture;
		},
		setIdle: function() {
			clearInterval(self.textureInterval);
			self.texture = window.textures.playerTexturesAnimations.idle[0];
			self.textureInterval = setInterval(function(){
	            // Shifts the first texture and puts it last
	            self.texture = window.textures.playerTexturesAnimations.idle.shift();
	            window.textures.playerTexturesAnimations.idle.push(self.texture);
	        },500);
		},
		setJump: function() {
			clearInterval(self.textureInterval);
			self.texture = window.textures.playerTexturesAnimations.jump[0];
		}
	}
}
