class Panel {
	constructor(obj = {id:'tela', width:12, height:24, controls:['a','d','s','w']}) {
		this.canva = document.getElementById(obj.id);
		this.context = this.canva.getContext("2d");
		
		this.height = obj.height;
		this.width = obj.width;
		
		this.scale = (this.canva.parentElement.clientHeight-(this.canva.parentElement.clientHeight%obj.height))/this.height;
		
		this.minScale();
		this.canva.height = this.height*this.scale;
		this.canva.width = this.width*this.scale;
		
		this.controls = obj.controls;
	}
	
	minScale() {
		if (this.width > this.canva.parentElement.clientWidth) {
			this.scale-=1;
			this.minScale();
		}
	}
}