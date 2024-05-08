class Grid {
	constructor(settings) {
		this.settings = settings;
		this.width = settings.widthTiles;
		this.height = settings.heightTiles;
		
		this.emptyLine = [];
		this.matriz = [];
		for (let x = 0; x < this.width; x++) {
			this.emptyLine.push(0);
		}
		for (let y = 0; y < this.height; y++) {
			this.matriz.push(this.emptyLine);
		}
	}
	
	update(piece) {
		piece.blocks.forEach((b) => {
			const x = piece.position.x+b.x;
			const y = piece.position.y+b.y;
			
			console.log(this.matriz[y][x])
		})
	}
	
	drawGrid(id) {
		let myCtx = this.settings.ctx;
		//CustomID
		if (id) {
			const canva2 = document.getElementById(id);
			const ctx = canva2.getContext('2d');
			myCtx = ctx;
		}
		
		//Backscreen
		myCtx.fillStyle = 'rgb(200,10,10)';
		myCtx.fillRect(0,0,this.width*this.settings.sizeTile, this.height*this.settings.sizeTile);
		
		for (let y = 0; y < this.height; y++) {
			for (let x = 0; x < this.width; x++) {
				myCtx.fillStyle = settings.bgColors[(x+y)%2];
				myCtx.fillRect(x*this.settings.sizeTile,y*this.settings.sizeTile,this.settings.sizeTile,this.settings.sizeTile);
				
				//If custom ID
				if (id) {
					const matrizValue = this.matriz[y][x];
					myCtx.fillStyle = matrizValue!=0? 'red' : 'white';
					myCtx.font = `${this.settings.sizeTile*0.7}px Nunito`;
					myCtx.fillText(matrizValue,
						(x*this.settings.sizeTile)+(this.settings.sizeTile/4),
						((y+1)*this.settings.sizeTile)-(this.settings.sizeTile/4)
					);
				}
			}
		}
	}
}