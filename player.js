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

	this.isJumping = false;

	this.jump = function() {
		if(self.isJumping || Math.floor(y) != y) return;

		var animationCycles = 8;
		var animationCyclesCount = 0;
		var speed = 50; // milliseconds
		self.isJumping = true;
		self.textures.setJump();
		self.animation = setInterval(function() {
			y += 1/animationCycles;
			animationCyclesCount ++;
			if(animationCyclesCount == animationCycles) {
				clearInterval(self.animation);
				self.textures.setIdle()
				self.isJumping = false;
			}
		}, speed);
	}

	this.moveLeft = function() {
		if(!(!(self.interval))) return;
		
		var speed = 1/8;
		this.textures.setMoveLeft();
		self.interval = setInterval(function() {
			x -= speed;
			if(Math.floor(x) == x) {
				clearInterval(self.interval);
				self.interval = null;
				self.textures.setIdle();
			}
		}, 100);
	}

	this.moveRight = function() {
		if(!(!(self.interval))) return;
		
		var speed = 1/8;
		this.textures.setMoveRight();
		self.interval = setInterval(function() {
			x += speed;
			if(Math.floor(x) == x) {
				clearInterval(self.interval);
				self.interval = null;
				self.textures.setIdle();
			}
		}, 100);
	}

	this.canMoveLeft = function(scene) {
		return x > 0 && !scene.isItemAt(x-1,y);
	}

	this.canMoveRight = function(scene) {
		return x < 11 && !scene.isItemAt(x+1,y); // 11 is max X
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
		},
		setMoveLeft: function() {
			clearInterval(self.textureInterval);
			self.texture = window.textures.playerTexturesAnimations.walkLeft[0];
			self.textureInterval = setInterval(function(){
	            // Shifts the first texture and puts it last
	            self.texture = window.textures.playerTexturesAnimations.walkLeft.shift();
	            window.textures.playerTexturesAnimations.walkLeft.push(self.texture);
	        },200);
		},
		setMoveRight: function() {
			clearInterval(self.textureInterval);
			self.texture = window.textures.playerTexturesAnimations.walkRight[0];
			self.textureInterval = setInterval(function(){
	            // Shifts the first texture and puts it last
	            self.texture = window.textures.playerTexturesAnimations.walkRight.shift();
	            window.textures.playerTexturesAnimations.walkRight.push(self.texture);
	        },200);
		}
	}
}
