(function() {

	function generateSubstructureInformationForPlanets(chart, key) { // 'Personality' | 'Design'
		// Get Gate locations on Zodiac
		// Iterate through all gates and generate substructure information for each planet
		// given its sign, degrees, minutes, seconds
		var gateOrder = Gates.order;

		var output = '';
		var signDegrees, decimalDegrees, chartPlanet, percentageThrough;
		Planets.all.forEach(function(planet) {
			chartPlanet = chart[key][planet];
			var substructureData = 	Substructure.get(chartPlanet.sign, chartPlanet.degree, chartPlanet.minutes, chartPlanet.seconds);	
			
			var gate = substructureData.gate, line = substructureData.line, color = substructureData.color, 
				tone = substructureData.tone, base = substructureData.base;

			output += '<tr><td>' + planet + '</td><td>' + gate + '</td><td>' + line + '</td><td>' + color + 
					  '</td><td>' + tone + '</td><td>' + base + '</td></tr>';
		});
		return output;
	}

	var report = new Report({
		title: 'Full Substructure Report',
		run: function(chart) {
			// Personality
			var output = '\n<table><thead><tr><td colspan="6">Personality<hr></td></tr></thead><tbody>' +
					     '<tr><td>Planet</td><td>Gate</td><td>Line</td><td>Color</td><td>Tone</td><td>Base</td><tr>';
			output += generateSubstructureInformationForPlanets(chart, 'Personality');
			output += '</tbody></table>';

			// Design
			output += '\n\n<table><thead><tr><td colspan="6">Design<hr></td></tr></thead><tbody>' +
					     '<tr><td>Planet</td><td>Gate</td><td>Line</td><td>Color</td><td>Tone</td><td>Base</td><tr>';
			output += generateSubstructureInformationForPlanets(chart, 'Design');
			output += '</tbody></table>';
			output += '\n';

			// Populate data object
			this.data = {
				output: output
			};

			return output;
		}
	});
	
	ReportController.addReport(report);
})();