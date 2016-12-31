(function() {

	function generateSubstructureInformationForPlanets(chart, key) { // 'Personality' | 'Design'
		// Get Gate locations on Zodiac
		// Iterate through all gates and generate substructure information for each planet
		// given its sign, degrees, minutes, seconds

		var gateOrder = [41, 19, 13, 49, 30, 55, 37, 63, 22, 36, 25, 17, 21, 51, 42, 3, 27, 24, 2, 23, 8, 20, 16, 35, 45, 12, 15, 52, 39, 53, 62, 56, 31, 33, 7, 4, 29, 59, 40, 64, 47, 6, 46, 18, 48, 57, 32, 50, 28, 44, 1, 43, 14, 34, 9, 5, 26, 11, 10, 58, 38, 54, 61, 60];


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
			// The distance is 58º00'00" exacty.
			signDegrees += 58;
			if (signDegrees > 360) {
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