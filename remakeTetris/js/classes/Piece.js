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
		this.side = 0;
	}
	
	rotate() {
		//Program rotation
	}
	
	isSide() {
		//Program side collision
	}
	
	isLand(matriz) {
		for (let b of this.blocks) {
			const x = this.position.x+b.x;
			const y = this.position.y+b.y;
			
			if ((y >= matriz.length-1) ||
				(matriz[y] && (matriz[y+1][x]==undefined || matriz[y+1][x]==1))
				) {
				this.land = true;				
			}
		}
	}
	
	update(x, y) {
		//up y
		this.position.y += !this.land? y : 0;
	}
	
	draw() {
		//const colors = ['red', 'blue', 'lime', 'gold']
		this.blocks.forEach((b, ix) => {
			this.ctx.fillStyle = this.color;//colors[ix]
			this.ctx.fillRect((this.position.x+b.x)*this.sizeTile, (this.position.y+b.y)*this.sizeTile, this.sizeTile, this.sizeTile);
		})
	}
}