(function() {

	var chart = ChartController.getAllCharts()[0]; // 'Chart for Jonah Dempcy'

	var output = '';

	// Add timestamp
	output += 'Report generated ' + new Date() + '.\n\n';

	// Add reports
	output += ReportController.logAllReports(chart);
	
	// Replace newlines with br tags
	output = output.replace(/\n/g, "<br />");

	// Draw the report
	$(function() {
		$('#frame').html(output);
	});

})();