class Block {
	constructor(obj = {position:new Position(0,0), color:'red', panel:panel}) {
		this.position = obj.position;
		this.color = obj.color;
		this.size = obj.panel.scale;
		
		// controls:['a','d','s','w']
		this.controls = obj.panel.controls;
		this.cooldown = this.cooldownR = 0;
		
		this.ctx = obj.panel.context;
		this.maxHeight = obj.panel.height;
		this.maxWidth = obj.panel.width;
		
		this.formats = {
			0: [new Position(0,0),new Position(1,0),new Position(2,0),new Position(3,0)],
			1: [new Position(1,0),new Position(1,1),new Position(1,2),new Position(1,3)]
		};
		this.nowFormat = 0;
		this.formatLimits = {
			x: 0,
			y: 0
		}
		this.updateLimits();
		
	}
	
	updateLimits() {
		let nX = 0, nY = 0;
		if (this.formats[this.nowFormat]) {
			this.formats[this.nowFormat].forEach((pos) => {
				nX = nX < pos.x? pos.x : nX;
				nY = nY < pos.y? pos.y : nY;
			});
			this.formatLimits = {
				x: nX, y: nY
			};
		}
	}
	
	rotate() {
		this.nowFormat += 1;
		if (!this.formats[this.nowFormat]) {
			this.nowFormat = 0;
		}
		this.updateLimits();
	}
	
	control(pressedList, time) {
		this.cooldown += time;
		if (this.cooldown > 100) {
			if (pressedList.includes(this.controls[0])) {
				//left
				this.position.x -= this.position.x > 0? 1 : 0;
			} else if (pressedList.includes(this.controls[1])) {
				//right
				this.position.x += (this.position.x+1 < this.maxWidth) && (this.position.x+1 < this.maxWidth-this.formatLimits.x)? 1 : 0;
			} else if (pressedList.includes(this.controls[2])) {
				//down
				this.update();
			}
			this.cooldown = 0;
		}
		
		this.cooldownR += time;
		if (pressedList.includes(this.controls[3]) && this.cooldownR>200) {
			//rotate
			this.rotate();
			this.cooldownR = 0;
		}
	}
	
	update() {
		this.position.y += (this.position.y+this.formatLimits.y < this.maxHeight) && (this.position.y+1 < this.maxHeight-this.formatLimits.y)? 1 : 0;
	}
	
	draw() {
		if (this.formats[this.nowFormat]) {
			for (let piece of this.formats[this.nowFormat]) {
				this.ctx.fillStyle = this.color;
				this.ctx.fillRect((this.position.x*this.size)+(piece.x*this.size), (this.position.y*this.size)+(piece.y*this.size), this.size, this.size);	
			}
		}
	}
}

/*	Block models

1 - **** (I)
2 - [] (Box)
3 - + (Plus)
4 - ~ (Z left)
5 -  ~ (Z right)
6 - L (L left)
7 - J (L right)
	
*/

