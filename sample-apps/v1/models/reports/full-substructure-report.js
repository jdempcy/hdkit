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
			signDegrees = 0;
			$.each(Signs.all, function(i, sign) {
				if (sign == chartPlanet.sign) return false; // break
				signDegrees += 30;
			});
			decimalDegrees = chartPlanet.degree  +  chartPlanet.minutes / 60  +  chartPlanet.seconds / 3600; // thx wikipedia!
			signDegrees += decimalDegrees;
			var title = key + ' ' + planet;
			output += title + '\n'
			output += Util.getHorizontalRule(title.length) + '\n';


			// Human Design gates start at Gate 41 at 02º00'00" Aquarius, so we have to adjust from 00º00'00" Aries.
			// The distance is 58º00'00" exactly.
			signDegrees += 58;
			if (signDegrees >= 360) {
				signDegrees -= 360;
			}

			percentageThrough = signDegrees / 360; // e.g. 182.3705 becomes 0.5065				

			// Gate
			var gate = gateOrder[parseInt(percentageThrough * 64)];
			output += 'Gate: ' + parseInt(gate) + '\n';

			// Line
			var exactLine = 384 * percentageThrough;
			var line = (exactLine % 6) + 1;
			output += 'Line: ' + parseInt(line) + '\n';

			// Color
			var exactColor = 2304 * percentageThrough;
			var color = (exactColor % 6) + 1;
			output += 'Color: ' + parseInt(color) + '\n';

			// Tone
			var exactTone = 13824 * percentageThrough;
			var tone = (exactTone % 6) + 1;
			output += 'Tone: ' + parseInt(tone) + '\n';

			// Base
			var exactBase = 69120 * percentageThrough; // e.g. 46151
			var base = (exactBase % 5) + 1;
			output += 'Base: ' + parseInt(base) + '\n\n\n';
		});
		return output;
	}

	var report = new Report({
		title: 'Full Substructure Report',
		run: function(chart) {
			var output = '\n\n';
			output += generateSubstructureInformationForPlanets(chart, 'Personality');
			output += generateSubstructureInformationForPlanets(chart, 'Design');
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