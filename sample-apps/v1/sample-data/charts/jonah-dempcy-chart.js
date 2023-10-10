(function() {
	var chart = new Chart({
		name: 'Jonah Dempcy',
		birthdate: 'Sun Sep 25 1983 20:48:00 GMT-0700 (EDT)',
		birthdateInMilliseconds: 433396080000,
		location: 'Malden, MA (US)',
		latitude: '71w04',
		longitude: '42n26',

		designDate: 'Sun Jun 26 1983 13:08:00 GMT',
		designDateInMilliseconds: 425480880000,

		Personality: {
			Sun: {
					sign: Libra,
					degree: 2,
					minutes: 22,
					seconds: 14
			},
			Earth: {
					sign: Aries,
					degree: 2,
					minutes: 22,
					seconds: 14
			},

			'North Node': {
					sign: Gemini,
					degree: 18,
					minutes: 55,
					seconds: 22
			},
			'South Node': {
					sign: Sagittarius,
					degree: 18,
					minutes: 55,
					seconds: 22
			},
			Moon: {
					sign: Taurus,
					degree: 15,
					minutes: 39,
					seconds: 58
			},
			Mercury: {
					sign: Virgo,
					degree: 16,
					minutes: 29,
					seconds: 40
			},
			Venus: {
					sign: Leo,
					degree: 25,
					minutes: 8,
					seconds: 48
			},
			Mars: {
					sign: Leo,
					degree: 27,
					minutes: 31,
					seconds: 26
			},
			Jupiter: {
					sign: Sagittarius,
					degree: 5,
					minutes: 53,
					seconds: 37
			},
			Saturn: {
					sign: Scorpio,
					degree: 3,
					minutes: 7,
					seconds: 19
			},
			Uranus: {
					sign: Sagittarius,
					degree: 5,
					minutes: 50,
					seconds: 26
			},
			Neptune: {
					sign: Sagittarius,
					degree: 26,
					minutes: 32,
					seconds: 53
			},
			Pluto: {
					sign: Libra,
					degree: 28,
					minutes: 23,
					seconds: 11
			},
			Chiron: {
					sign: Gemini,
					degree: 2,
					minutes: 46,
					seconds: 13
			}
		},
		Design: {
			Sun: {
					sign: Cancer,
					degree: 4,
					minutes: 19,
					seconds: 50
			},
			Earth: {
					sign: Capricorn,
					degree: 4,
					minutes: 19,
					seconds: 50
			},

			'North Node': {
					sign: Gemini,
					degree: 25,
					minutes: 6,
					seconds: 43
			},
			'South Node': {
					sign: Sagittarius,
					degree: 25,
					minutes: 6,
					seconds: 43
			},
			Moon: {
					sign: Capricorn,
					degree: 17,
					minutes: 5,
					seconds: 22
			},
			Mercury: {
					sign: Gemini,
					degree: 19,
					minutes: 25,
					seconds: 35
			},
			Venus: {
					sign: Leo,
					degree: 19,
					minutes: 16,
					seconds: 50
			},
			Mars: {
					sign: Gemini,
					degree: 28,
					minutes: 7,
					seconds: 9
			},
			Jupiter: {
					sign: Sagittarius,
					degree: 2,
					minutes: 59,
					seconds: 41
			},
			Saturn: {
					sign: Libra,
					degree: 27,
					minutes: 40,
					seconds: 30
			},
			Uranus: {
					sign: Sagittarius,
					degree: 5,
					minutes: 59,
					seconds: 41
			},
			Neptune: {
					sign: Sagittarius,
					degree: 27,
					minutes: 40,
					seconds: 30
			},
			Pluto: {
					sign: Libra,
					degree: 26,
					minutes: 44,
					seconds: 40
			},
			Chiron: {
					sign: Gemini,
					degree: 0,
					minutes: 18,
					seconds: 56
			}
		}
	});
	
	ChartController.addChart(chart);
})();