//create Piece's models
const pieceTypes = ['o','t','i','j','l','s','z'];
const pieceTable = {
	o: [[-1,-1], [0,-1], [-1,0], [0,0]   ,[-1,0]],
	t: [[0,-1], [-1,0], [0,0], [0,1]     ,[0,0]],
	i: [[-2,-1], [-1,-1], [0,-1], [1,-1] ,[-1,-1]],
	j: [[0,-2], [0,-1], [-1,0], [0,0]    ,[-1,-1]],
	l: [[-1,-2], [-1,-1], [-1,0], [0,0]  ,[-2,0]],
	s: [[0,-1], [1,-1], [-1,0], [0,0]    ,[0,0]],
	z: [[-2,-1], [-1,-1], [-1,0],[0,0]   ,[-2,0]],
};
const pieceColors = [
	'rgb(255,113,206)',
	'rgb(5,255,161)',
	'rgb(1,205,254)',
	'rgb(255,251,150)',
	'rgb(185,103,255)',
	'rgb(238,64,53)',
];

function buildPiece(type) {
	const newPieceBlocks = []
	pieceTable[type].forEach((coord, ix) => {
		if (ix < pieceTable[type].length-1) {
			newPieceBlocks.push(new Block(coord[0], coord[1]));			
		}
	})
	const rotation = pieceTable[type][4];
	return {blocks:newPieceBlocks, rotation:rotation};
}


//class Piece
class Piece {
	constructor(settings, color, position = {x:0, y:0}, type, isLanded = false) {
		//settings
		this.widthTiles = settings.widthTiles;
		this.heightTiles = settings.heightTiles;
		this.sizeTile = settings.sizeTile;
		this.ctx = settings.ctx;
		
		//block
		this.color = color;
		this.position = position;
		this.type = type;
		const buildedPiece = buildPiece(type);
		this.blocks = buildedPiece.blocks;
		this.rotation = {x:buildedPiece.rotation[0], y:buildedPiece.rotation[1]};
		
		//land setup
		this.land = isLanded;
		this.landing = false;
		this.cantLeft = false;
		this.cantRight = false;
	}
	
	rotate(r, matriz) {
		if (Math.abs(r)) {
			const p = {x: 2, y: 2}
			let doRotate = true;
			for (const b of this.blocks) {
				const xIn = b.x + p.x;
				const yIn = b.y - p.y;
				
				let xNew = -yIn - p.x + this.rotation.x;
				let yNew = xIn - p.y + this.rotation.y;
				
				if (
					this.position.x+xNew<0 || 
					this.position.x+xNew>=this.widthTiles-1 ||
					this.position.y+yNew<0 ||
					this.position.y+yNew>=this.heightTiles-1 ||
					(matriz[this.position.y+yNew][this.position.x+xNew] != 0)
					) {
					doRotate = false;
					break;
				}
			} 
			if (doRotate) {
				for (const b of this.blocks) {
					const xIn = b.x + p.x;
					const yIn = b.y - p.y;
					
					let xNew = -yIn - p.x + this.rotation.x;
					let yNew = xIn - p.y + this.rotation.y;
					
					if (this.position.x+xNew < 0) {
						console.log('out')
					} else {
						b.x = xNew;
						b.y = yNew;
					}
				}
			}
		}
	}
	
	drawRotate(v) {
		let x0 = v.x;
		let y0 = v.y;
		
		let xF = y0 - 1;
		let yF = -x0 - 1;
		
		return {x: x0+1, y:y0+1}
	}
	
	isCollided(matriz) {
		this.cantLeft = false;
		this.cantRight = false;
		this.landing = this.land? true : false;
		for (let b of this.blocks) {
			const x = this.position.x+b.x;
			const y = this.position.y+b.y;
			
			this.cantLeft = this.cantLeft? this.cantLeft : !!((x <= 0) || (y>0 && matriz[y][x-1] && matriz[y][x-1]==1));
			this.cantRight = this.cantRight? this.cantRight : !!((x >= this.widthTiles-1) || (y>0 && matriz[y][x+1] && matriz[y][x+1]==1));
			
			this.landing = this.landing || ((y >= matriz.length-1) || (y>0 && matriz[y] && matriz[y+1][x]==1));
		}
	}
	
	update(x, y, needLand) {
		//up y
		if (y) {
			this.position.y += !this.landing? y : 0;
			this.land = this.landing && needLand;			
		}
		//up x
		if (!((this.cantLeft && this.cantRight) || (x<0 && this.cantLeft) || (x>0 && this.cantRight))) {
			this.position.x += x;
		}
	}
	
	draw() {
		//const colors = ['red', 'blue', 'lime', 'gold']
		this.blocks.forEach((b, ix) => {	
			this.ctx.fillStyle = this.color; //colors[ix]
			
			this.ctx.fillRect((this.position.x+b.x)*this.sizeTile, (this.position.y+b.y)*this.sizeTile, this.sizeTile, this.sizeTile);
			
			/*
			this.ctx.fillStyle = 'gold';
			this.ctx.beginPath();
			this.ctx.arc((this.position.x+b.x)*this.sizeTile, (this.position.y+b.y)*this.sizeTile, 2, 0, Math.PI*2);
			this.ctx.fill();
			this.ctx.closePath();
			
			if (this.land) {
				this.ctx.fillStyle = 'rgba(255,255,255, 1)';				
			} else if (this.landing) {
				this.ctx.fillStyle = 'rgba(255,255,255, 0.5)';
			} else {
			}
			*/
		})
	}
}