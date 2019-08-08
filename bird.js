var bird = function(game) {
    this.game = game;
    this.image = null;
    this.y = 0;
    this.x = 75;
    this.speedY = 0;
    this.acceleration = 0.6;
    this.inPipe = 0;
    this.score = 0;

    var obj = document.createElement("audio");
    obj.src = "images/score2.wav";
    obj.speed = 2;
    obj.volume = 1;
    obj.autoPlay = false;
    obj.preLoad = true;

    var obj2 = document.createElement("audio");
    obj2.src = "images/hit.wav";
    obj2.volume=1;
    obj2.autoPlay=false;
    obj2.preLoad=true;

    var self = this;

    this.init = function() {
    	this.loadImages();
    }

    this.loadImages = function() {
    	this.image = new Image();
    	this.image.onload = function() {
    		self.loaded = true;
    	}
    	this.image.src = "images/bird.png";
    }

    this.flap = function() {
    	this.speedY = -9;
    }

    this.update = function() {
        if(this.game.gameOver) return;
        // forget all stuff above
        if(this.y <= 400) {
        	this.y += this.speedY;
       		this.speedY += this.acceleration;
        }
        //check game over
        let c1 = (this.x + 35 >= this.game.pipe.x && this.x <= this.game.pipe.x + 50);
        let c2 = (this.y + 26 < this.game.pipe.y && this.y > this.game.pipe.y - 150);
        if((c1&&!c2)) {
        	console.log(this.x, this.y, this.game.pipe.x, this.game.pipe.y, c1, c2);
        	obj2.play();
        	this.game.gameOver = true;
        	return;
        }

        if(c1&&c2) this.inPipe = 1;

        if(!c1 && this.inPipe == 1) {
        	this.inPipe = 0;
        	this.score++;
	        obj.play();
        	document.getElementById('score').innerHTML = "Score: " + this.score;
        }

        if(this.y >= 400) {
        	obj2.play();
        	this.game.gameOver = true;
        }
    }

    this.draw = function() {
        if(self.loaded == false) {
        	return;
        }
        self.game.context.drawImage(this.image, 75, this.y);
    }
}