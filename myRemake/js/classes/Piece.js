//class Piece
class Piece {
	constructor(settings, position = {x:0, y:0}, shape, color = 'red') {
		this.settings = settings;
		
		this.color = color;
		this.shape = TETROMINOS[shape];
		this.blocks = this.buildBlocks();
		this.pivot = this.calculatePivot();
		
		this.position = position;
		
		this.isControlling = true;
		this.isLand = false;
		this.movements = [true, true, true];
	}
	
	buildBlocks() {
		const blocks = [];
        for (let y = 0; y < this.shape.length; y++) {
            for (let x = 0; x < this.shape[y].length; x++) {
                if (this.shape[y][x]) {
                    blocks.push(new Block(x, y));
                }
            }
        }
		console.log(blocks)
        return blocks;
	}
	
	//Center
	calculatePivot() {
		let centerX, centerY;
		if (this.shape.length%2==0) {
			centerX = 1;
			centerY = Math.floor(this.shape.length / 2);
		} else {
			centerX = Math.floor(this.shape[0].length / 2);
			centerY = Math.floor(this.shape.length / 2);
		}
		
        return { x: centerX, y: centerY };
    }
	
	rotate(dir = 1, grid) {
		let relativeX, relativeY, newX, newY;
		let newPos = [];
		let canSpin = dir!=0? true : false;
		
		if (this.shape.length%2==0) {
			if (this.shape[0].length/2>1) {
				for (const block of this.blocks) {
					relativeX = block.x - this.pivot.x;
					relativeY = block.y - this.pivot.y;
					// Search with pivot
					newX = this.pivot.x + relativeY +1;
					newY = this.pivot.y + relativeX -1;
					// Update
					newPos.push({x:newX, y:newY})
					if (this.position.x + newX < 0 || 
						this.position.x + newX > this.settings.widthTiles-1 ||
						this.position.y + newY > this.settings.heightTiles-1 ||
						grid.matriz[this.position.y+newY][this.position.x+newX] != 0
						) {
						canSpin = false;
						break;
					}
					//block.x = newX;
					//block.y = newY;
				}
			} else {
				for (const block of this.blocks) {
					newPos.push({x:block.x, y:block.y})
				}
			}
		} else {
			for (const block of this.blocks) {
				relativeX = block.x - this.pivot.x;
				relativeY = block.y - this.pivot.y;
				// Pivot
				newX = this.pivot.x + (relativeY * -dir);
				newY = this.pivot.y - (relativeX * -dir);
				// Update
				newPos.push({x:newX, y:newY})
				if (this.position.x + newX < 0 || 
					this.position.x + newX > this.settings.widthTiles-1 ||
					this.position.y + newY > this.settings.heightTiles-1 ||
					grid.matriz[this.position.y+newY][this.position.x+newX] != 0
					) {
					canSpin = false;
					break;
				}
				//block.x = newX;
				//block.y = newY;
			}
		}
		if (canSpin) {
			this.blocks.forEach((b, ix) => {
				b.x = newPos[ix].x;
				b.y = newPos[ix].y;
			})
		}
    }
	
	isCollided(grid, needLand) {
		const matriz = grid.matriz;
		this.movements = [true, true, true];
		for (let b of this.blocks) {
			const x = this.position.x + b.x;
			const y = this.position.y + b.y;
			if (x <= 0 || (matriz[y] && matriz[y][x-1] && matriz[y][x-1]!=0)) {
				this.movements[0] = false;
			}
			if (x >= this.settings.widthTiles-1 || (matriz[y] && matriz[y][x+1] && matriz[y][x+1]!=0)) {
				this.movements[1] = false;
			}
			if (y >= this.settings.heightTiles-1 || (matriz[y] && matriz[y+1][x] && matriz[y+1][x]!=0)) {
				this.movements[2] = false;
				if (needLand) {
					this.isLand = true;
					this.isControlling = false;
				}
			}
		}
		
	}
	
	update(grid,x=0, y=0, needLand = false) {
		this.isCollided(grid, needLand);
		
		if (x<0 && this.movements[0]) {
			this.position.x += x;
		}
		if (x>0 && this.movements[1]) {
			this.position.x += x;
		}
		
		if (y>0 && this.movements[2]) {
			this.position.y += y;
		}
	}
	
	draw(grid) { 
		this.blocks.forEach((b) => {
			this.settings.ctx.fillStyle = this.color;
			this.settings.ctx.fillRect(
				(this.position.x+b.x)*this.settings.sizeTile,
				(this.position.y+b.y)*this.settings.sizeTile,
				this.settings.sizeTile,
				this.settings.sizeTile,
			);
		})
	}
}