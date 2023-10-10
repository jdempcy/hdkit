var Substructure = {
	get: function(sign, degrees, minutes, seconds) {

		var gateOrder = Gates.order;
		var signDegrees = 0;
		$.each(Signs.all, function(i, iteratingSign) {
			if (iteratingSign == sign) return false; // break
			signDegrees += 30;
		});
		var decimalDegrees = degrees  +  minutes / 60  +  seconds / 3600; // thx wikipedia!
		signDegrees += decimalDegrees;

		// Human Design gates start at Gate 41 at 02º00'00" Aquarius, so we have to adjust from 00º00'00" Aries.
		// The distance is 58º00'00" exactly.
		signDegrees += 58;
		if (signDegrees > 360) {
			signDegrees -= 360;
		}

		var percentageThrough = signDegrees / 360; // e.g. 182.3705 becomes 0.5065				

		// Gate
		var gate = gateOrder[parseInt(percentageThrough * 64)];

		// Line
		var exactLine = 384 * percentageThrough;
		var line = (exactLine % 6) + 1;

		// Color
		var exactColor = 2304 * percentageThrough;
		var color = (exactColor % 6) + 1;

		// Tone
		var exactTone = 13824 * percentageThrough;
		var tone = (exactTone % 6) + 1;

		// Base
		var exactBase = 69120 * percentageThrough; // e.g. 46151
		var base = (exactBase % 5) + 1;
		
		return {
			gate: gate,
			line: parseInt(line),
			exactLine: parseInt(exactLine),
			color: parseInt(color),
			exactColor: parseInt(exactColor),
			tone: parseInt(tone),
			exactTone: parseInt(exactTone),
			base: parseInt(base),
			exactBase: parseInt(exactBase)
		}
	}
}