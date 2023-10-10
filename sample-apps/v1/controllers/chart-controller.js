var ChartController = (function() { 
	var charts = [];

	function addChart(chart) {
		charts.push(chart);
	}

	function runChart(chart) {
		var output = '';		
		// console.log ('Output from ' + chart.name + ': ' + output);
	}

	function logAllCharts() {
		charts.forEach(function(chart) {
			console.log(runChart(chart));
		});
	}

	function getAllCharts() {
		return charts;
	}

	return {
		addChart: addChart,
		logAllCharts: logAllCharts,
		getAllCharts: getAllCharts
	}
})();