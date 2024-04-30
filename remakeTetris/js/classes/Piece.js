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
		/*
		if (this.position.y+1 >= this.heightTiles){
			this.land = true;
		}
		if (!this.land) {
			for (let b of this.blocks) {
				const updatePosY = matriz[this.position.y+b.y]? this.position.y+b.y : this.heightTiles-1;
				const updatePosX = matriz[updatePosY][this.position.x+b.x]? this.position.x+b.x : this.widthTiles-1;
				const v = matriz[updatePosY][updatePosX];
				if (v == 1) {
					this.land = true;
				}
			}	
		}
		*/
	}
	
	update(x, y) {
		this.position.y += !this.land? y : 0;
	}
	
	draw() {
		this.blocks.forEach((b) => {
			this.ctx.fillStyle = this.color;
			this.ctx.fillRect((this.position.x+b.x)*this.sizeTile, (this.position.y-b.y)*this.sizeTile, this.sizeTile, this.sizeTile);
		})
	}
}