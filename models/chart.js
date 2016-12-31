function Chart(options) {
	for (var key in options) {
		this[key] = options[key];
	}
	this.name = options.name;
	
};
