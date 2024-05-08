//Game --------------------
const grid = new Grid(settings);
const tetris = new Tetris(settings, {left:'arrowleft', right:'arrowright', down:'arrowdown', rotL:'z', rotR:'x'}, grid);
const fpsTimer = new Timer();
const controller = new Controller();

function gameRun() {
	requestAnimationFrame(gameRun);
	fpsTimer.update();
	
	if (fpsTimer.now-fpsTimer.mainPoint > 1000/settings.fps) {
		fpsTimer.reset();
		//60 fps
		grid.drawGrid();
		
		tetris.control(controller.inputs, fpsTimer.dif);
		tetris.update(fpsTimer.dif);
		tetris.draw();
		
		//Test grid
		grid.drawGrid('matriz');
	}
};

tetris.generatePiece(3,3, 'i');
requestAnimationFrame(gameRun);