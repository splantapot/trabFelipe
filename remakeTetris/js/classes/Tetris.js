class Tetris {
	//const tetris = new Tetris(settings, 5, 1, {left:'a', right:'d', down:'s'});
	constructor(settings, initialSpeed, finalSpeed, controls) {
		this.settings = settings;
		
		this.speedInitial = initialSpeed;
		this.speedFinal = finalSpeed;
		this.speedNow = initialSpeed;
		this.timer = 0;
		
		this.horizontalCooldown = 100;
		this.horizontalTime = 0;
		
		this.controls = controls;
		this.gain = {x:0, y:0};
		this.hasPiece = true;
		
		this.pieces = [
			new Piece(this.settings, 'rgba(255,0,0,0.7)', {x:1, y:3}, pieceTypes[1]),
			//new Piece(this.settings, 'rgba(255,0,0,0.7)', {x:1, y:10}, pieceTypes[4]),
			//new Piece(this.settings, 'rgba(255,0,0,0.7)', {x:2, y:15}, pieceTypes[5]),
		];
		this.matriz = [];
		for (let y = 0; y < this.settings.heightTiles; y++) {
			let nX = [];
			for (let x = 0; x < this.settings.widthTiles; x++) {
				nX.push(0);
			}
			this.matriz.push(nX);
		}
	}
	
	updateMatriz() {
		for (let piece of this.pieces) {
			for (let b of piece.blocks) {
				if (piece.land && this.matriz[piece.position.y+b.y]) {
					this.matriz[piece.position.y+b.y][piece.position.x+b.x] = '1';					
				}
			}
		}
		
		//this.hasPiece = true;
	}
	
	control(inputs, time) {
		this.horizontalTime += time;
		
		if (this.horizontalTime >= this.horizontalCooldown) {
			this.horizontalTime = 0;
			if (inputs.includes(this.controls.left)) {
				this.gain.x = -1;
			} else if (inputs.includes(this.controls.right)) {
				this.gain.x = 1;
			} else {
				this.gain.x = 0;
			}
		} else {
			this.gain.x = 0;
		}
		
		this.pieces.forEach((piece) => {
			piece.isSide(this.matriz) //collide with side
			if (!piece.land) {
				piece.update(this.gain.x,0);				
			}
		});
	}
	
	update(time) {
		this.timer += time;
		
		if (this.timer >= 1000/this.speedNow) {
			this.pieces.forEach((piece) => {
				const initialLand = piece.land;
				this.settings.ctx.fillStyle = piece.color;
				piece.isLand(this.matriz) //landed
				
				piece.update(this.gain.x,1);
				if (initialLand != piece.land) {
					this.updateMatriz();					
				}
			});
			this.timer = 0;
		}
	}
	
	drawPieces() {
		this.pieces.forEach((piece) => {
			this.settings.ctx.fillStyle = piece.color;
			piece.draw();
		})
	}
	
	drawGrid() {
		for (let y = 0; y < this.settings.heightTiles; y++) {
			for (let x = 0; x < this.settings.widthTiles; x++) {
				this.settings.ctx.fillStyle = this.settings.bgColors[(x+y)%2];
				this.settings.ctx.fillRect(x*this.settings.sizeTile,y*this.settings.sizeTile,this.settings.sizeTile,this.settings.sizeTile)
			}
		}
		
		this.settings.ctx.fillStyle = 'cyan';
		this.settings.ctx.fillRect(0, ((this.settings.heightTiles-1)*this.settings.sizeTile), this.settings.widthTiles*this.settings.sizeTile, 3);
	}
}