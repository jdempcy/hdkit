function Report(options) {
	this.data 	= {}, // (optionally) Populated by run() method
	this.title 	= options.title;
	this.run 	= options.run;
	this.getData = function() {
		if (Object.keys(this.data).length == 0) {
			return;
		}
		return this.data;
	}
}