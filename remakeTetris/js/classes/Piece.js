class Piece {
	constructor(settings, color, position = {x:0, y:0}, type) {
		//settings
		this.widthTiles = settings.widthTiles;
		this.heightTiles = settings.heightTiles;
		this.sizeTile = settings.sizeTile;
		this.ctx = settings.ctx;
		
		//block
		this.color = color;
		this.position = position;
		this.type = type;
		this.blocks = buildPiece(type);
		
		this.land = false;
		
	}
	
	isCollided(matriz) {
		let maxX = 0;
		let maxY = 0;
		this.blocks.forEach((b) => {
			if (maxX < b.x) {
				maxX = b.x;
			}
			if (maxY < b.y) {
				maxY = b.y;
			}
		});
		maxX++;
		maxY++;
		if (this.position.y+maxY >= this.heightTiles){
			this.land = true;
		}
		if (!this.land) {
			for (let b of this.blocks) {
				const v = matriz[this.position.y+b.y+1][this.position.x+b.x]
				if (v == 1) {
					this.land = true;
				}
			}	
		}
	}
	
	update(x, y) {
		this.position.y += !this.land? y : 0;
	}
	
	draw() {
		this.blocks.forEach((b) => {
			this.ctx.fillStyle = this.color;
			this.ctx.fillRect((this.position.x+b.x)*this.sizeTile, (this.position.y+b.y)*this.sizeTile, this.sizeTile, this.sizeTile);
		})
	}
}