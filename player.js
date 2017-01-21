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

	this.draw = function(canvas, scene) {
		window.log["player"] = {x: x, y: y, canMoveLeft: self.canMoveLeft(scene), canPushLeft: self.canPushLeft(scene), canMoveRight: self.canMoveRight(scene)};
		canvas.drawTexture(x, y, self.textures.getTexture());
	}

	this.isJumping = false;


	// These methods are here only because the gravity is made in the Scene instead of in the items
	this.fall = function() {
		this.textures.setJump();
	}
	this.land = function() {
		this.textures.setIdle();
	}


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
		var noWall = x > 0; // No wall on the left
		var noBoxLeftDown = !scene.isItemAt(x-1,Math.round(y)); // No box on my left
		var floor = (Math.ceil(y) == 0 || scene.isItemAt(x, Math.ceil(y)-1)); // There is either floor or a box beneath me
		var boxToClimbOn = scene.isItemAt(x-1, Math.floor(y));
		window.log["moveLeft"] = {noWall: noWall, noBoxLeftDown: noBoxLeftDown, floor: floor || boxToClimbOn}
		return noWall && noBoxLeftDown && (floor || boxToClimbOn);
	}

	this.canMoveRight = function(scene) {
		var noWall = x < 11;
		var noBoxRightDown = !scene.isItemAt(x+1,Math.round(y));
		var floor = (Math.floor(y) == 0 || scene.isItemAt(x, Math.floor(y)-1));
		var boxToClimbOn = scene.isItemAt(x+1, Math.floor(y));
		return noWall && noBoxRightDown && (floor || boxToClimbOn);
	}

	// TODO: DRY after testing is completed
	this.canPushLeft = function(scene) {
		var hasBoxLeft = scene.isItemAt(x-1, Math.round(y));
		var noBoxByTheBoxOnTheLeft = !scene.isItemAt(x-2, y) && x > 1;
		var noBoxOnTop = !scene.isItemAt(x-1,y+1);
		var floor = (Math.floor(y) == 0 || scene.isItemAt(x, Math.floor(y)-1));
		window.log["pushLeft"] = {
			hasBoxLeft: hasBoxLeft,
			noBoxLeftLeft: noBoxByTheBoxOnTheLeft,
			noBoxOnTop: noBoxOnTop,
			floor: floor
		};
		return hasBoxLeft && noBoxByTheBoxOnTheLeft && noBoxOnTop && floor;
	}

	this.canPushRight = function(scene) {
		var hasBoxRight = scene.isItemAt(x+1, Math.round(y));
		var noBoxByTheBoxOnTheRight = !scene.isItemAt(x+2, y) && x < 10;
		var noBoxOnTop = !scene.isItemAt(x+1,y+1);
		var floor = (Math.floor(y) == 0 || scene.isItemAt(x, Math.floor(y)-1));
		window.log["pushRight"] = {
			hasBoxRight: hasBoxRight,
			noBoxRightRight: noBoxByTheBoxOnTheRight,
			noBoxOnTop: noBoxOnTop,
			floor: floor
		};
		return hasBoxRight && noBoxByTheBoxOnTheRight && noBoxOnTop && floor;
	}

	this.pushLeft = function(scene) {
		if(!(!(self.interval))) return;
		
		var speed = 1/8;

		var box = scene.getItemAt(x-1, Math.round(y));

		this.textures.setPushLeft();
		self.interval = setInterval(function() {
			x -= speed;
			box.setX(box.getX() - speed);
			if(Math.floor(x) == x) {
				clearInterval(self.interval);
				self.interval = null;
				self.textures.setIdle();
			}
		}, 100);
	}

	this.pushRight = function(scene) {
		if(!(!(self.interval))) return;
		
		var speed = 1/8;
		var box = scene.getItemAt(x+1, Math.round(y));
		this.textures.setPushRight();
		self.interval = setInterval(function() {
			x += speed;
			box.setX(box.getX() + speed);
			if(Math.floor(x) == x) {
				clearInterval(self.interval);
				self.interval = null;
				self.textures.setIdle();
			}
		}, 100);
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
		},
		setPushLeft: function() {
			clearInterval(self.textureInterval);
			self.texture = window.textures.playerTexturesAnimations.pushLeft[0];
			self.textureInterval = setInterval(function(){
	            // Shifts the first texture and puts it last
	            self.texture = window.textures.playerTexturesAnimations.pushLeft.shift();
	            window.textures.playerTexturesAnimations.pushLeft.push(self.texture);
	        },200);
		},
		setPushRight: function() {
			clearInterval(self.textureInterval);
			self.texture = window.textures.playerTexturesAnimations.pushRight[0];
			self.textureInterval = setInterval(function(){
	            // Shifts the first texture and puts it last
	            self.texture = window.textures.playerTexturesAnimations.pushRight.shift();
	            window.textures.playerTexturesAnimations.pushRight.push(self.texture);
	        },200);
		}
	}
}
