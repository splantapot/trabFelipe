//Game --------------------
const tetris = new Tetris(settings, 10, 1);
const fpsTimer = new Timer();
const controller = new Controller({left:'a', right:'d', down:'s'});

function gameRun() {
	requestAnimationFrame(gameRun);
	fpsTimer.update();
	
	if (fpsTimer.mainPoint > 1000/settings.fps) {
		fpsTimer.reset();
		
		tetris.update(fpsTimer.dif);
		tetris.drawGrid();
		tetris.drawPieces();
	}
	//console.log(tetris.pieces[0].position.y)
	
	matrizRun();
};
requestAnimationFrame(gameRun);

//Matriz Viewer
const matrizCanvas = document.getElementById('matriz');
const matrizCtx = matrizCanvas.getContext('2d');
matrizCanvas.width = canvas.width;
matrizCanvas.height = canvas.height;
function matrizRun() {
	matrizCtx.fillStyle = 'rgb(0,0,0)';
	matrizCtx.fillRect(0,0,settings.widthTiles*settings.sizeTile, settings.heightTiles*settings.sizeTile);
	for (let y = 0; y < settings.heightTiles; y++) {
		for (let x = 0; x < settings.widthTiles; x++) {
			matrizCtx.fillStyle = settings.bgColors[(x+y)%2];
			matrizCtx.fillRect(x*settings.sizeTile,y*settings.sizeTile,settings.sizeTile,settings.sizeTile)
			
			const matrizValue =tetris.matriz[y][x];
			matrizCtx.fillStyle = matrizValue==0? 'white' : 'red';
			matrizCtx.font = `${tetris.settings.sizeTile*0.7}px Arial`;
			matrizCtx.fillText(tetris.matriz[y][x],(x*settings.sizeTile)+(settings.sizeTile/4),((y+1)*settings.sizeTile)-(settings.sizeTile/4));
		}
	}
};