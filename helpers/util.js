var Util = {
	// Formatting utils
	getHorizontalRule(length) {
		var hr = '';
		while (hr.length < length) {
			hr += '=';
		}
		return hr;
	}
};

function getFormattedPoint(sign, degree, minutes, seconds) {
	return sign + ' ' + degree + 'deg' + minutes + '\'' + seconds + '"';
}