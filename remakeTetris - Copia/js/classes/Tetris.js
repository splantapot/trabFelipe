class Tetris {
	//const tetris = new Tetris(settings, 5, 1, {left:'a', right:'d', down:'s'});
	constructor(settings, initialSpeed, finalSpeed, controls) {
		this.settings = settings;
		this.isPlaying = true;
		
		this.speedInitial = initialSpeed;
		this.speedFinal = finalSpeed;
		this.speedNow = initialSpeed;
		this.timer = 0;
		
		this.horizontalCooldown = 160;
		this.horizontalTime = 0;
		this.rotateCooldown = 200;
		this.rotateTime = 0;
		
		this.controls = controls;
		this.gain = {x:0, y:0};
		this.makeRotation = 0;
		
		this.pieces = [];
		
		this.matriz = [];
		this.emptyLine = [];
		for (let x = 0; x < this.settings.widthTiles; x++) {
			this.emptyLine.push(0);
		}
		for (let y = 0; y < this.settings.heightTiles; y++) {
			let nX = [];
			for (let x = 0; x < this.settings.widthTiles; x++) {
				nX.push(0);
			}
			this.matriz.push(nX);
		}
		
		this.updateMatriz();
	}
	
	generatePiece() {
		const nPiece = new Piece(this.settings, pieceColors[rng(pieceColors.length)], {x:5, y:-1}, pieceTypes[rng(pieceTypes.length)]);
		if (rng(2)) {
			nPiece.rotate(rng(3)-1, this.matriz);
		}
		nPiece.isCollided(this.matriz);
		nPiece.update(0,0,true);
		if (nPiece.land) {
			this.isPlaying = false;
		}
		this.pieces.push(nPiece);
	}
	
	destroy(lines){		
		console.log(`fazer o destrui na linha ${lines}`);
		lines.forEach((line) => {
			this.pieces.forEach((piece) => {
				piece.blocks.forEach((b, ix, obj) => {
					if (b.y+piece.position.y == line) {
						obj.splice(ix, 1);
						piece.land = false;
					}
				});
			});
			this.matriz[line] = this.emptyLine;
		});
		
		
	}
	
	updateMatriz() {
		for (let piece of this.pieces) {
			for (let b of piece.blocks) {
				if (piece.land && this.matriz[piece.position.y+b.y]) {
					this.matriz[piece.position.y+b.y][piece.position.x+b.x] = 1;					
				}
			}
		}
		
		let destroyLines = [];
		this.matriz.forEach((line, index) => {
			if (!line.includes(0)) {
				destroyLines.push(index);
			}
		});
		
		if (destroyLines.length) {
			this.destroy(destroyLines);
		}
	}
	
	control(inputs, time) {
		//Player's control
		this.horizontalTime = this.isPlaying? this.horizontalTime+time : 0;
		this.rotateTime = this.isPlaying? this.rotateTime+time : 0;
		
		if (this.horizontalTime >= this.horizontalCooldown) {
			this.horizontalTime = 0;
			
			//L and R
			if (inputs.includes(this.controls.left)) {
				this.gain.x = -1;
			} else if (inputs.includes(this.controls.right)) {
				this.gain.x = 1;
			}
			
			//Down
			if (inputs.includes(this.controls.down)) {
				this.gain.y = 1;
			}
		} else {
			this.gain.x = 0;
			this.gain.y = 0;
		}
		
		if (this.rotateTime >= this.rotateCooldown) {
			this.rotateTime = 0;
			//Rotation
			if (inputs.includes(this.controls.rotR)) {
				this.makeRotation = 1;
			} else if (inputs.includes(this.controls.rotL)) {
				this.makeRotation = -1;
			}
		} else {
			this.makeRotation = 0;
		}

		for (let piece of this.pieces) {
			if (!piece.land) {
				piece.isCollided(this.matriz);
				piece.update(this.gain.x,this.gain.y);	
				piece.rotate(this.makeRotation, this.matriz);
			}
		}
	}
	
	update(time) {
		//Default gravity
		this.timer += time;
		if (this.timer >= 1000/this.speedNow && this.isPlaying) {
			let hasPiece = false;
			this.pieces.forEach((piece) => {
				if (!piece.land) {
					hasPiece = true;
					const initialLand = piece.land; //if initial state of piece is land
					this.settings.ctx.fillStyle = piece.color; // set color
					piece.isCollided(this.matriz);
					piece.update(this.gain.x,1,true);
					piece.isLanded(this.matriz)
					//piece.update(0,0,true);
					if (piece.land != initialLand) {
						this.updateMatriz();
						this.generatePiece();
					}
				}
			});
			if (!hasPiece) {
				this.isPlaying = false;
			}
			this.timer = 0;
		}
		
		if (!this.isPlaying) {
			console.log('game over')
		}
	}
	
	drawPieces() {
		this.pieces.forEach((piece) => {
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
		
		this.settings.ctx.fillStyle = 'blue';
		this.settings.ctx.fillRect(0, ((this.settings.heightTiles-1)*this.settings.sizeTile), this.settings.widthTiles*this.settings.sizeTile, 3);
		this.settings.ctx.fillStyle = 'lime';
		this.settings.ctx.fillRect(((this.settings.widthTiles-1)*this.settings.sizeTile), 0, 3, this.settings.heightTiles*this.settings.sizeTile);
	}
}