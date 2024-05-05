class Timer {
	constructor() {
		this.last = this.now = this.dif = this.mainPoint = 0;
		this.reset();
		this.update();
	}
	
	update() {
		this.now = new Date().getTime();
		this.dif = this.now - this.last;
		this.last = this.now;
	}
	
	reset() {
		this.mainPoint = new Date().getTime();
	}
}