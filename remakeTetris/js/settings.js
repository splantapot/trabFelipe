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

//create Piece's models
const pieceTypes = ['o','s','z','j','l','i','t'];
const pieceTable = {
	o: [[-1,-1], [0,-1], [-1,0], [0,0]],
	t: [[0,-1], [-1,0], [0,0], [0,1]],
	z: [[-2,-1], [-1,-1], [-1,0], [0,0]],
	s: [[0,-1], [1,-1], [-1,0], [0,0]],
	l: [[-1,-2], [-1,-1], [-1,0], [0,0]],
	j: [[0,-2], [0,-1], [-1,0], [0,0]],
	i: [[-2,-1], [-1,-1], [0,-1], [1,-1]],
}
function buildPiece(type) {
	const newPieceBlocks = []
	pieceTable[type].forEach((coord) => {
		newPieceBlocks.push(new Block(coord[0], coord[1]));
	})
	return newPieceBlocks;
}

//Create canvas and context (to draw) + setting canvas
const canvasBox = document.getElementById('canvasBox');
const canvas = document.getElementById('tela');
settings.ctx = canvas.getContext('2d');

canvas.style.backgroundColor = settings.bgColors[0];
settings.sizeTile = (canvasBox.clientHeight-canvasBox.clientHeight%settings.heightTiles);
settings.sizeTile = (settings.sizeTile-settings.heightTiles)/settings.heightTiles;
canvas.width = settings.widthTiles * settings.sizeTile;
canvas.height = settings.heightTiles * settings.sizeTile;