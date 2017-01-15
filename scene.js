function Scene() {
	'use strict';

	var items = [];
	var self = this;

	this.add = function(item) {
		items.push(item);
	}

	this.isItemAt = function(x,y) {
		for(var item in items) {
			if(items[item].getX() == x && items[item].getY() == y) {
				return true;
			}
		}
		return false;
	}

	this.draw = function(canvas) {
		addStaticTextures(canvas);
		applyGravity();
		for(var item in items) {
			items[item].draw(canvas, self);
		}
	}

	function setAnimateDropDown(item) {
		if(!(!(item.interval))) return;
		

		// This executes the animations of falling in all items IF it is implemented
		if(typeof item.fall == "function") {
			item.fall();
		}
		var speed = 1/8; // means a blok per 50 milliseconds
		item.interval = setInterval(function(){
			item.setY(item.getY() - speed);
			if(Math.floor(item.getY()) == item.getY()) {
				clearInterval(item.interval);
				item.interval = null;
				if(typeof item.land == "function") {
					item.land();
				}
			}
		},50);
	}

	function applyGravity() {
		for(var item in items) {
			var x = items[item].getX();
			var y = items[item].getY();
			if(y > 0 && !self.isItemAt(x,y-1) && Math.floor(y) == y) {
				setAnimateDropDown(items[item]);
			}
		}
	}

    function addStaticTextures(canvas) {
        function addFloor() {
            for(var i=4; i < 99; i+=4) {
                canvas.drawTextureRealXY(i, 60, window.textures.floorTexture);
            }
        }

        function addWall() {
            for(var i=0; i < 63; i+=4) {
                canvas.drawTextureRealXY(0, i, window.textures.wallTexture);
            }
        }

        function addBackground() {
            for(var i=4; i < 99; i+=8) {
                canvas.drawTextureRealXY(i, 4, window.textures.backgroundTexture);
            }
        }

        function addRailing() {
            for(var i=0; i < 99; i+=4) {
                canvas.drawTextureRealXY(i, 0, window.textures.railingTexture);
            }
        }

        addFloor();
        addWall();
        addRailing();
        addBackground();
    }
}
