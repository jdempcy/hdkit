var ReportController = (function() { 
	var reports = [];

	function addReport(report) {
		reports.push(report);
	}

	function runReport(report, chart) {
		var output = report.title + '\n';
		output += Util.getHorizontalRule(report.title.length) + '\n';
		output += report.run(chart) + '\n';
		// console.log ('Output from ' + report.title + ': ' + output);
		return output;
	}

	function logAllReports(chart) {
		var output = '';
		reports.forEach(function(report) {
			var reportOutput = runReport(report, chart);
			output += reportOutput;
			// console.log(reportOutput);
			console.log(report.title + ': %O', report.getData());
		});
		return output;
	}

	return {
		addReport: addReport,
		logAllReports: logAllReports
	}
})();