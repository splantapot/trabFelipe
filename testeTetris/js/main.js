const controller = new Controller(window);
const panel = new Panel({id:'tela', width:14, height:24, controls:['a','d','s','w']});
const timer = new Timer();

let speed = 500;

//example block
const b1 = new Block({position:new Position(0,0),color:'rgba(255,0,0,0.7)', panel:panel});

timer.reset();
requestAnimationFrame(gameRun);
function gameRun() {
	timer.update();
	clearScreen();
	
	if (timer.now-timer.defaultTimer>speed) {
		b1.update();
		timer.reset();
	}
	b1.control(controller.inputs, timer.dif);
	b1.draw();
	
	requestAnimationFrame(gameRun);
}

function clearScreen() {
	for (let y = 0; y < panel.height; y++) {
		for (let x = 0; x < panel.height; x++) {
			panel.context.fillStyle=(x+y)%2==0? 'black' : 'rgb(30,30,30)';
			panel.context.fillRect(x*panel.scale, y*panel.scale, panel.scale, panel.scale)
		}
	}
}