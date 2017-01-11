function Scene() {
	'use strict';

	var items = [];


	this.add = function(item) {
		items.push(item);
	}

	this.getItemAt = function(x,y) {
		for(var item in items) {
			if(items[item].getX() == x && items[item].getY() == y) {
				return items[item];
			}
		}
		return null;
	}

	this.draw = function(canvas) {
		addStaticTextures(canvas);
		for(var item in items) {
			items[item].draw(canvas);
		}
	}

	function applyGravity() {
		// TODO
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