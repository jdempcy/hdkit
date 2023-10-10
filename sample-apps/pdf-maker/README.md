# Human Design PDF Maker Sample App

This app began its life in December 2021 using Node 14.16.0, TypeScript 4.5.4, and ReactJS 16.12 on macOS Big Sur.

The project uses the [node-geo-tz](https://github.com/evansiroky/node-geo-tz) (at that time 7.0.1) and [node-geocoder](https://www.npmjs.com/package/node-geocoder) (at that time 3.28.0) libraries. It also employs Google Cloud Platform (GCP). The Google Cloud API key can be found can be found in the .env file in a variable named `GOOGLE_CLOUD_API_KEY`. GCP is used for getting Latitude and Longitude of a location via the node-geocoder library. We use the Luxon NPM package DateTime class for working with dates. You can do snazzy things like `DateTime.now().setZone("America/New_York").minus({ weeks: 1 }).endOf("day").toISO();`.

We use JPL NASA ephemeris, "the state of the art ephemeris, DE431 covers 13000 BC - 17000 AD, maximum possible precision" 2.9GB file, *de431.eph*. Download from [ftp://www.astro.com/pub/jplfiles](ftp://www.astro.com/pub/jplfiles). (Rate limited at 50k/s.)

This is an excellent resource for timezones:
[https://stackoverflow.com/questions/16086962/how-to-get-a-time-zone-from-a-location-using-latitude-and-longitude-coordinates](https://stackoverflow.com/questions/16086962/how-to-get-a-time-zone-from-a-location-using-latitude-and-longitude-coordinates)

We then use the pdfmake 0.2.4 ([link](https://openbase.com/js/pdfmake)) which allows the following features:

* line-wrapping,
* text-alignments (left, right, centered, justified),
* numbered and bulleted lists,
* tables and columns
* auto/fixed/star-sized widths,
* col-spans and row-spans,
* headers automatically repeated in case of a page-break,
* images and vector graphics,
* convenient styling and style inheritance,
* page headers and footers:
* static or dynamic content,
* access to current page number and page count,
* background-layer,
* page dimensions and orientations,
* margins,
* custom page breaks,
* font embedding,
* support for complex, multi-level (nested) structures,
* table of contents,
* helper methods for opening/printing/downloading the generated PDF,
* setting of PDF metadata (e.g. author, subject).
* See more at the pdfmake Documentation: [https://pdfmake.github.io/docs/](https://pdfmake.github.io/docs/)

For UI and theming, the client uses the old version of [@mui/material](https://mui.com/getting-started/usage/) which is actually impoted as @material-ui/core. It is version 4 which is why we use @material-ui/core instead of @mui/material. For form validation, the client uses [react-hook-form](https://react-hook-form.com/get-started). We also use the date picker library date-fns. We follow the react-hook-form-material-ui tutorial [here](https://github.com/Mohammad-Faisal/react-hook-form-material-ui).

## Prereqs

Make sure you have python installed with `brew install python`. The `swisseph` module needs it. If you install python after installing swisseph be sure to reinstall swisseph (`npm i swisseph`).

## Initial setup

1. Clone repository: `git clone --recursive git@github.com:jdempcy/hdkit.git`
2. `cd hdkit/sample-apps/pdf-maker` and `npm i --legacy-peer-deps`
3. `cd client` and `npm i --legacy-peer-deps`
4. [Download 2.9 GB DE431 ephemeris](ftp://www.astro.com/pub/jplfiles) and place in ./server/src/ephemeris folder. It is set in the code with `swisseph.swe_set_ephe_path ('./ephemeris');` since it is relative to ./server/src where the files are located.
5. Back in the root, make sure your `.env` file has the `GOOGLE_CLOUD_API_KEY`
6. That's it! All ready to go.

## Quickstart and overview    
1. Run `npm run start:server` and `npm run start:client`
2. Navigate to `localhost:3000` and enter birth time, date, and location
3. The location is passed into node-geocoder as a string, e.g. _"29 champs elysée paris"_
4. node-geocoder returns a latitude and longitude which are then passed into node-geo-tz
5. The timezone is then used to determine the absolute time in millis this epoch. (UTC, of course.)
6. Once we have the absolute UTC time that the person was born, we are ready to look up the location of the planets in node-swisseph! Woo-hoo! We're almost at the promised land...
7. We make a node-swisseph request and get back planetary locations which can then be used to generate a JSON representation of the bodygraph.
8. This JSON format is then passed into the PDF generator function, which now has instructions for all strings to include. It references various JSON string libraries (gate-activations.json, channel-activations.json etc) for text. These are all in the ./strings subfolder of ./server/src.


Location being passed into node-geocoder and getting lat/long back:


	// Using callback
	const res = await geocoder.geocode('29 champs elysée paris');

	// output :
	[
	  {
	    latitude: 48.8698679,
	    longitude: 2.3072976,
	    country: 'France',
	    countryCode: 'FR',
	    city: 'Paris',
	    zipcode: '75008',
	    streetName: 'Champs-Élysées',
	    streetNumber: '29',
	    administrativeLevels: {
	      level1long: 'Île-de-France',
	      level1short: 'IDF',
	      level2long: 'Paris',
	      level2short: '75'
	    },
	    provider: 'google'
	  }
	];


Lat/long being passed into node-geo-tz and getting timezones back:
node-geo-tz is used to get time zone from lat/long, e.g.:

    const { find } = require('geo-tz')

    find(47.650499, -122.350070)  // ['America/Los_Angeles']
    find(43.839319, 87.526148)  // ['Asia/Shanghai', 'Asia/Urumqi']

Absolute time in millis this epoch (UTC) being passed into node-swisseph and getting back planetary locations:

	var swisseph = require ('swisseph');

	// Test date
	var date = {year: 2012, month: 1, day: 1, hour: 0};
	console.log ('Test date:', date);

	var flag = swisseph.SEFLG_SPEED;

	// path to ephemeris data
	swisseph.swe_set_ephe_path (__dirname + '/../ephe');

	// Julian day
	swisseph.swe_julday (date.year, date.month, date.day, date.hour, swisseph.SE_GREG_CAL, function (julday_ut) {
		assert.equal (julday_ut, 2455927.5);
		console.log ('Julian UT day for date:', julday_ut);

		// Sun position
		swisseph.swe_calc_ut (julday_ut, swisseph.SE_SUN, flag, function (body) {
			assert (!body.error, body.error);
			console.log ('Sun position:', body);
		});

		// Moon position
		swisseph.swe_calc_ut (julday_ut, swisseph.SE_MOON, flag, function (body) {
			assert (!body.error, body.error);
			console.log ('Moon position:', body);
		});
	});


## SVG Rendering of Bodygraphs

The client renders SVG bodygraphs with the use of react-svgmt. It did not have TypeScript support at the time of this writing so we created a new TS definition and set the compiler options in `./client/tsconfig.json` thusly: `"typeRoots": [ "./types", "./node_modules/@types"]` — this is to make sure it checks our types first.

