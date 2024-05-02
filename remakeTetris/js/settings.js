//Game Settings, const
const settings = {
	fps: 60,
	bgColors: {
		0:'rgb(15,15,15)',
		1:'rgb(55,55,55)'
	},
	widthTiles: 10, //even
	heightTiles: 20, //even
	sizeTile: -1,
	ctx: undefined,
};

//Create canvas and context (to draw) + setting canvas
const canvasBox = document.getElementById('canvasBox');
const canvas = document.getElementById('tela');
settings.ctx = canvas.getContext('2d');

canvas.style.backgroundColor = settings.bgColors[0];
settings.sizeTile = (canvasBox.clientHeight-canvasBox.clientHeight%settings.heightTiles);
settings.sizeTile = (settings.sizeTile-settings.heightTiles)/settings.heightTiles;
canvas.width = settings.widthTiles * settings.sizeTile;
canvas.height = settings.heightTiles * settings.sizeTile;

//Default functions
function rng(interval) {
	interval *= Math.random();
	interval = Math.floor(interval);
	return interval;
}