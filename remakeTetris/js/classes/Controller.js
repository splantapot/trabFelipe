class Controller {
    constructor(single = false, reference = window) {
		this.reference = reference
        this.inputs = [];
	
		reference.addEventListener('keydown', (e) => {
			if (!this.inputs.includes(e.key.toLowerCase())) {
				this.inputs.push(e.key.toLowerCase());
			}
		});

		reference.addEventListener('keyup', (e) => {
			this.inputs.splice(this.inputs.indexOf(e.key.toLowerCase()), 1);
		});
    }
}