var pipe = function(game) {
	this.game = game;
	this.images = [];
	this.loaded1 = false;
	this.loaded2 = false;
	this.x = 200;
	this.y = 287;

	this.nextX = 400;
	this.nextY = 350;

	var self = this;

	this.init = function() {
 		this.loadImages();
	}

	this.loadImages = function() {
		this.images[0] = new Image();
		this.images[0].onload = function() {
			self.loaded1 = true;
			// console.log("pip loaded");
			//console.log("image loaded");
		}
		this.images[0].src = "images/pipe.png";
		this.images[1] = new Image();
		this.images[1].onload = function() {
			self.loaded2 = true;
			// console.log("pip2 loaded");
			//console.log("image loaded");
		}
		this.images[1].src = "images/pipe2.png";	 	 
	}

	this.update = function() {
		if(this.game.gameOver) return;
		this.x-=2;
		if(this.x == -50) {
			this.x += 200;
			this.y = this.nextY;
			this.nextY = Math.floor(150 + Math.random() * 230);

		}
	}

	this.draw = function() {
		if(self.loaded1 == false || self.loaded2 == false) {
			return;
		}
		// console.log("drawing bg");
		self.game.context.drawImage(this.images[1], this.x, this.y - 437);
		self.game.context.drawImage(this.images[0], this.x, this.y);

		self.game.context.drawImage(this.images[1], this.x + 200, this.nextY - 437);
		self.game.context.drawImage(this.images[0], this.x + 200, this.nextY);

		// self.game.context.drawImage(this.images[1], this.x + 288, this.y - 420);
		// self.game.context.drawImage(this.images[0], this.x + 288, this.y);

	}
}