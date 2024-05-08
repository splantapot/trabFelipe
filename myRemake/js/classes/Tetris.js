class Tetris {
	constructor(settings, controls, grid) {
		//{fps,bgColor,widthTiles,heightTiles,sizeTile,ctx,speed{initial,end,upScore}}
		this.settings = settings;
		this.isPlaying = true;
		//{left, right, down, rotL,rotR}
		this.controls = controls;
		this.grid = grid;
		
		this.pieces = [];
		
		this.speedNow = this.settings.speed.initial;
		this.timer = 0;
		this.gain = {x:0,y:0,r:0}
		
		this.rotation = {
			cooldown: 160,
			time: 0
		};
		this.move = {
			cooldown: 120,
			time: 0
		};
	}
	
	generatePiece(x = 0, y = 0, type = 'o', color = 'red') {
		this.pieces.push(new Piece(this.settings, {x:x,y:y}, type, color));
	}
	
	control(inputs, time) {
		this.move.time += time;
		this.rotation.time += time;
		
		if (this.move.time >= this.move.cooldown) {
			this.move.time = 0;
			if (inputs.includes(this.controls.left)) {
				this.gain.x = -1;
			} else if (inputs.includes(this.controls.right)) {
				this.gain.x = 1;
			}
			
			if (inputs.includes(this.controls.down)) {
				this.gain.y = 1;
			}
		} else {
			this.gain.x = 0;
			this.gain.y = 0;
		}
		
		if (this.rotation.time >= this.rotation.cooldown) {
			this.rotation.time = 0;
			
			if (inputs.includes(this.controls.rotL)) {
				this.gain.r = -1;
			} else if (inputs.includes(this.controls.rotR)) {
				this.gain.r = 1;
			}
		} else {
			this.gain.r = 0;
		}
		
		this.pieces.forEach((piece) => {
			if (piece.isControlling) {
				piece.rotate(this.gain.r, this.grid)
				
				piece.update(this.grid, this.gain.x, this.gain.y);				
			}
		})
		
	}
	
	update(time) {
		this.timer += time;
		if (this.timer >= 1000/this.speedNow && this.isPlaying) {
			this.timer = 0;
			this.gain.y = 1;
			this.pieces.forEach((piece) => {
				const initialLand = piece.isLand;
				piece.update(this.grid, 0, this.gain.y, true);
				if (initialLand != piece.isLand) {
					this.generatePiece(rng(10), 0, TETROMINOS_TYPES[rng(7)])
					this.grid.update(piece);
				}
			})
		}
	}
	
	draw() {
		this.pieces.forEach((piece) => {
			piece.draw(this.grid);
		});
	}
}