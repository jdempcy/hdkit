import * as express from "express";
import * as util from "./util";
import * as bodygraph from "./models/bodygraph";
import { Bodygraph } from "./types";
import pageText from './strings/page-text.json';
import profiles from './strings/profiles.json';
import energyTypes from './strings/energy-types.json';
import authorities from './strings/authorities.json';
import channels from './strings/channels.json';
import strategies from './strings/strategies.json';
import definitions from './strings/definitions.json';
import signatures from './strings/signatures.json';
import notSelfThemes from './strings/not-self-themes.json';
import incarnationCrosses from './strings/incarnation-crosses.json';
import determinations from './strings/determinations.json';
import environments from './strings/environments.json';
import motivations from './strings/motivations.json';
import views from './strings/views.json';
import cognitiveTones from './strings/cognitive-tones.json';
import environmentalTones from './strings/environmental-tones.json';
import transferences from './strings/transferences.json';
import distractions from './strings/distractions.json';
import circuitries from './strings/circuitries.json';
import variables from './strings/variables.json';

const NodeGeocoder = require('node-geocoder');
const { find } = require('geo-tz')
const { DateTime } = require("luxon");
var path = require('path');
var fs = require('fs');

// PDF config
var PdfPrinter = require('pdfmake');
var printer = new PdfPrinter({
	Carena: {
		normal: path.join(__dirname, '..', '/fonts/Carena/Carena-Regular.ttf'),
		bold: path.join(__dirname, '..', '/fonts/Carena/Carena-Regular.ttf'),
		italics: path.join(__dirname, '..', '/fonts/Carena/Carena-Regular.ttf'),
		bolditalics: path.join(__dirname, '..', '/fonts/Carena/Carena-Regular.ttf')
	},
	NunitoSans: {
		normal: path.join(__dirname, '..', '/fonts/NunitoSans/NunitoSans-Regular.ttf'),
		bold: path.join(__dirname, '..', '/fonts/NunitoSans/NunitoSans-Bold.ttf'),
		italics: path.join(__dirname, '..', '/fonts/NunitoSans/NunitoSans-Italic.ttf'),
		bolditalics: path.join(__dirname, '..', '/fonts/NunitoSans/NunitoSans-BoldItalic.ttf')
	},
	CommutersSans: {
		normal: path.join(__dirname, '..', '/fonts/CommutersSans/CommutersSans-Regular.ttf'),
		bold: path.join(__dirname, '..', '/fonts/CommutersSans/CommutersSans-Bold.ttf'),
		italics: path.join(__dirname, '..', '/fonts/CommutersSans/CommutersSans-Italic.ttf'),
		bolditalics: path.join(__dirname, '..', '/fonts/CommutersSans/CommutersSans-BoldItalic.ttf')
	}
});


// POST API expecting req.name, req.birthdate. req.birthtime, and optional req.location
const router = express.Router();
router.post("/", async function (req: express.Request, res: express.Response) {
	try {
		let startTime: number = new Date().getTime(); // Profiling
		var apiKey: string | undefined = process.env.GOOGLE_CLOUD_API_KEY;
		const geocoder = NodeGeocoder({
			provider: 'google',
			apiKey: apiKey
		});

		// Set the correct date by combining birthdate and birthtime
		var timezone: string;
		// if (req.body.location == "") {
		// 	timezone = 'utc';
		// } else {
		// 	console.log(req.body.location);
		// 	const res = await geocoder.geocode(req.body.location);
		// 	console.log(res);
		//
		// 	// Perform timezone lookup
		// 	timezone = find(res.latitude, res.longitude)[0]; // e.g. 'America/Chicago'
		// 	console.log('Time zone found: ', timezone);
		// }

		// Hard coded to UTC
		timezone = 'utc';


		var date = new Date(req.body.birthdate);
		var dateTimeLocal = DateTime.local(date.getUTCFullYear(),
			date.getUTCMonth() + 1,
			date.getUTCDate(),
			parseInt(req.body.birthtime.split(':')[0]),
			parseInt(req.body.birthtime.split(':')[1]),
			{ zone: timezone });

		date = new Date(dateTimeLocal.ts);
		var bg: Bodygraph = bodygraph.createBodygraph(req.body.name, date, req.body.location || "London, United Kingdom");

		// Print the bodygraph to the console
		console.log(bg);


		function getFormattedEnergyType(bg: Bodygraph) {
			if (bg.type == 'Generator') {
				switch (bg.authority) {
					case 'Sacral':
						return 'Pure Generator';
					case 'Emotional':
						return 'Emotional Generator';
				}
			} else if (bg.type == 'Manifesting Generator') {
				switch (bg.authority) {
					case 'Sacral':
						if (bg.channels.includes('20-34')) {
							return 'Pure Manifesting Generator';
						} else {
							return 'Manifesting Generator';
						}
					case 'Emotional':
						return 'Emotional Manifesting Generator';
				}
			} else if (bg.type == 'Projector') {
				switch (bg.authority) {
					case 'Emotional':
						return 'Emotional Projector';
					case 'Splenic':
						return 'Splenic Projector';
					case 'Self Projected':
						return 'Self Projected Projector';
					case 'Ego Projected':
						return 'Ego Projector';
					case 'Sounding Board':
						return 'Mental Projector';
				}
			} else if (bg.type == 'Manifestor') {
				if (bg.authority == 'Splenic') {
					return 'Splenic Manifestor';
				} else if (bg.authority == 'Emotional') {
					return 'Emotional Manifestor';
				}
			} else return 'Reflector';
		}
		function getDetermination(bg: Bodygraph) {
			let type: string = (bg.activations.Design.Sun.Tone < 4) ?
				determinations.leftVariableVariants[bg.activations.Design.Sun.Color] :
				determinations.rightVariableVariants[bg.activations.Design.Sun.Color];
			return `${type} ${determinations[bg.activations.Design.Sun.Color]}`;
		}

		function getEnvironment(bg: Bodygraph) {
			let type: string = (bg.activations.Design.Sun.Tone < 4) ?
				environments.leftVariableVariants[bg.activations.Design.SouthNode.Color] :
				environments.rightVariableVariants[bg.activations.Design.SouthNode.Color];
			return `${type} ${environments[bg.activations.Design.SouthNode.Color]}`;
		}

		function getFormattedCircuitries(bg: Bodygraph) {
			let circuitry: string = "";
			if (bg.circuitries.length == 0) {
				circuitry = "None";
			} else {
				circuitry += bg.circuitries[0];
				for (let i = 1; i < bg.circuitries.length; i++) {
					circuitry += `, ${bg.circuitries[i]}`;
				}
			}
			return circuitry;
		}

		function getFormattedName(name: string) {
			return name;
			// If there is a space, replace the last space with a new line
			// if (name.indexOf(" ") != -1) {
			//   return name.split('').reverse().join().replace(" ", "\n").split('').reverse().join();
			// }
			// else { return name; }
		}

		function getFormattedChannels(bg: Bodygraph) {
			let formattedChannels: string = "";
			for (let i = 0; i < bg.channels.length; i++) {
				formattedChannels += `${channels.names[bg.channels[i]]} (${bg.channels[i]})`;
				if (i < bg.channels.length - 1) {
					formattedChannels += '\n';
				}
			}
		}

		// Perform all actions for generating PDF here
		var docDefinition = {
			content: [

				// Page 1
				{ image: './images/page-1-bodygraph.png', width: 516 },
				{
					margin: [0, 15, 0, 0],
					columns: [
						{ text: req.body.name.replace(" ", "\n"), style: 'header' },
						{ text: `${bg.birthDateAndTime}\n${bg.location}\n${bg.profile} ${bg.authority} ${bg.type}`, pageBreak: 'after' }
					]
				},

				// Page 2
				{ text: 'Sample\nReport', style: 'header', margin: [0, 0, 0, 10] },
				{ image: './images/page-2-field-guide.png', width: 255, margin: [0, 0, 0, 42] },
				{ text: pageText.page_2_about_this_hd_differentiation_guide, style: 'subheader', margin: [0, 0, 0, 13] },
				{
					columns: [
						{ text: pageText.page_2_left_column },
						{ text: pageText.page_2_right_column, style: 'rightColumn', pageBreak: 'after' }
					]
				},

				// Page 3 (Flammarion engraving)
				{ image: './images/page-3.png', width: 516, margin: [0, 0, 0, 42] },
				{
					columns: [
						{
							text: [
								{ text: pageText.page_3_quick_breakdown, style: 'subheader', margin: [0, 0, 0, 13], lineHeight: .5 },
								{ text: ' \n', fontSize: 21 },
								{ text: pageText.page_3_left_column, margin: [0, 0, 19, 0] }
							]
						}, // Ennd textArray
						{ text: pageText.page_3_right_column, style: 'rightColumn', pageBreak: 'after' }
					]
				}, // End columns

				// Page 4 --- Profile, Energy Type, Authority, Strategy, Definition, Signature etc
				{
					style: 'greyTable',
					table: {
						widths: [208, '*'],
						headerRows: 0,
						body: [
							[{ text: 'PROFILE:', style: 'greyTableLabel' }, bg.profile],
							[{ text: 'ENERGY TYPE:', style: 'greyTableLabel' }, getFormattedEnergyType(bg)],
							[{ text: 'AUTHORITY:', style: 'greyTableLabel' }, bg.authority],
							[{ text: 'STRATEGY', style: 'greyTableLabel' }, strategies[bg.type]],
							[{ text: 'DEFINITION:', style: 'greyTableLabel' }, bg.definition],
							[{ text: 'SIGNATURE:', style: 'greyTableLabel' }, signatures[bg.type]],
							[{ text: 'NOT SELF THEME:', style: 'greyTableLabel' }, notSelfThemes.types[bg.type]],
							[{ text: 'INCARNATION CROSS:', style: 'greyTableLabel' }, 'Right Angle Cross of Eden\nPersonality Sun (12) Personality Earth (11)\nDesign Sun (36) Design Earth (6)'],
							[{ text: 'DETERMINATION:', style: 'greyTableLabel' }, getDetermination(bg)],
							[{ text: 'ENVIRONMENT:', style: 'greyTableLabel' }, getEnvironment(bg)],
							[{ text: 'MOTIVATION:', style: 'greyTableLabel' }, motivations[bg.activations.Personality.Sun.Color]],
							[{ text: 'VIEW:', style: 'greyTableLabel' }, views[bg.activations.Personality.NorthNode.Color]],
							[{ text: 'COGNITIVE TONE:', style: 'greyTableLabel' }, cognitiveTones[bg.activations.Design.Sun.Tone]],
							[{ text: 'ENVIRONMENTAL TONE:', style: 'greyTableLabel' }, environmentalTones[bg.activations.Design.SouthNode.Tone]],
							[{ text: 'TRANSFERENCE:', style: 'greyTableLabel' }, transferences[bg.activations.Personality.Sun.Color]],
							[{ text: 'DISTRACTION:', style: 'greyTableLabel' }, distractions[bg.activations.Personality.NorthNode.Color]],
							[{ text: 'CIRCUITRY:', style: 'greyTableLabel' }, getFormattedCircuitries(bg)],
							[{ text: 'VARIABLE:', style: 'greyTableLabel' }, bg.variable],
						]
					}, // End table object
					layout: {
						hLineWidth: function (i: number, node: any) {
							return 2;
						},
						vLineWidth: function (i: number, node: any) {
							return 2;
						},
						hLineColor: function (i: number, node: any) {
							return 'white';
						},
						vLineColor: function (i: number, node: any) {
							return 'white';
						},
						paddingLeft: function (i: any, node: any) {
							return 27;
						},
						paddingTop: function (i: any, node: any) {
							return (i === 0) ? 25 : 13;
						},
						paddingRight: function (i: any, node: any) { return 4; },
						paddingBottom: function (i: any, node: any) {
							return (i === node.table.body.length - 1) ? 11 : 4;
						},
						fillColor: function (i: number, node: any) { return '#ededed'; }
					}// End layout

				}, // End block wrapping table


				// Page 5 - Bodygraph Image and overview
				{
					image: './images/page-5-bodygraph.png',
					width: 516,
					margin: [0, 0, 0, 34]
				},

				{
					columns: [
						{ text: getFormattedName(bg.name), style: 'header', margin: [0, 0, 0, 24], lineHeight: .8 },
						{ text: `${bg.birthDateAndTime}\n${bg.location}\n${bg.profile} ${bg.authority} ${bg.type}`, style: 'rightColumn' }
					]
				}, // End columns

				{
					image: './images/page-5-horizontal-rule.png',
					width: 516,
					margin: [0, 0, 0, 30]
				},


				{
					pageBreak: 'after',
					columns: [
						{
							text: [
								{
									text: `${bg.profile} ${bg.authority.toUpperCase()} ${bg.type.toUpperCase()}\n\nPERSONALITY SUN GATE:\n`,
									style: 'columnLabel',
								},

								{
									text: `${bg.activations.Personality.Sun.Gate}.${bg.activations.Personality.Sun.Line}`
								},

								{
									text: '\n\nCHANNELS:\n',
									style: 'columnLabel',
								},

								{
									text: getFormattedChannels(bg)
								}

							] // End text array
						},
						{
							text: 'Praetermittenda divinum. Collegisti, deteriora malint loquuntur officii cotidie finitas referri doleamus ambigua acute. Adhaesiones ratione beate arbitraretur detractis perdiscere, constituant hostis polyaeno. Diu concederetur. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit, officiis viveremus aeternum.',
							margin: [19, 0, 0, 0],
							style: 'bodyTextSmall'
						}
					]
				}, // End columns


				// Page 6 - Energy Type
				{
					image: './images/page-6-energy-type.png',
					width: 516,
					margin: [0, 0, 0, 32]
				},

				{
					text: 'ENERGY TYPE\n',
					style: 'supheader'
				},

				{
					text: 'Pure Generator\n',
					style: 'header'
				},
				{
					image: './images/page-5-horizontal-rule.png',
					width: 516,
					margin: [0, 0, 0, 30]
				},

				{
					text: 'THE GREAT BUILDERS\n',
					style: 'subheader'
				},

				{
					pageBreak: 'after',
					style: 'bodyTextSmall',
					columns: [
						{
							text: 'Lorem ipsum dolor sit amet, consectetuer adipisc- ing elit, sed diam nonummy nibh euismod tincid- unt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, cons ectetuer adipi-'
						},
						{
							text: 'Lorem ipsum dolor sit amet, consectetuer adipisc- ing elit, sed diam nonummy nibh euismod tincid- unt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, cons ectetuer adipi-',
							style: 'rightColumn'

						}
					]
				},



				// Page 7 - Strategy


				{
					text: 'THE STRATEGY\n',
					style: 'supheader'
				},

				{
					text: 'Wait to Respond\n',
					style: 'header'
				},



				{
					style: 'bodyTextSmall',
					columns: [
						{
							text: '\norem ipsum dolor sit amet, consectetuer adipisc- ing elit, sed diam nonummy nibh euismod tincid- unt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto',
							style: 'bodyTextSmall,'
						},
						{
							text: '\norem ipsum dolor sit amet, consectetuer adipisc- ing elit, sed diam nonummy nibh euismod tincid- unt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto\n\n',
							style: 'bodyTextSmall rightColumn'

						}
					]
				},



				{
					image: './images/page-5-horizontal-rule.png',
					width: 516,
					margin: [0, 0, 0, 30]
				},

				{
					style: 'bodyTextSmall',
					columns: [
						{
							width: 242,
							text: [
								{ style: 'smallSubheader', text: 'SOUNDS OF THE SACRAL' },
								'\nLorem ipsum dolor sit amet, consectetuer adipisc- ing elit, sed diam nonummy nibh euismod tincid- unt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu.\n\n'
							] // End text array
						},
						{
							image: './images/page-7-strategy.png',
							style: 'rightColumn',
							width: 247
						}
					]
				},



				{
					image: './images/page-5-horizontal-rule.png',
					width: 516,
					margin: [0, 0, 0, 30]
				},

				{
					pageBreak: 'after',
					style: 'bodyTextSmall',
					columns: [
						{

							text: [
								{ style: 'smallSubheader', text: 'SIGNATURE: SATISFACTION' },
								'\nLorem ipsum dolor sit amet, consectetuer adipisc- ing elit, sed diam nonummy nibh euismod tincid- unt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto'
							] // End text array

						},
						{

							text: [
								{ style: 'smallSubheader', text: 'NOT SELF THEME: FRUSTRATION' },
								'\nLorem ipsum dolor sit amet, consectetuer adipisc- ing elit, sed diam nonummy nibh euismod tincid- unt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto'
							], // End text array
							style: 'rightColumn'
						}
					]
				},




				// Page 8 - Authority

				{
					image: './images/page-8-authority.png',
					width: 516,
					margin: [0, 0, 0, 30]
				},

				{
					text: 'YOUR AUTHORITY\n',
					style: 'supheader'
				},

				{
					text: 'Sacral Center\n',
					style: 'header'
				},

				{
					image: './images/page-5-horizontal-rule.png',
					width: 516,
					margin: [0, 10, 0, 30]
				},


				{
					text: 'WHAT DOES THAT MEAN?\n',
					style: 'subheaderQuestion'
				},

				{
					pageBreak: 'after',
					style: 'bodyTextSmall',
					columns: [
						{
							text: 'Lorem ipsum dolor sit amet, consectetuer adipisc- ing elit, sed diam nonummy nibh euismod tincid- unt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, cons ectetuer adipi-'
						},
						{
							text: 'Lorem ipsum dolor sit amet, consectetuer adipisc- ing elit, sed diam nonummy nibh euismod tincid- unt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, cons ectetuer adipi-',
							style: 'rightColumn'

						}
					]
				},



				// Page 9 - A Visual Metaphor


				{
					text: 'A VISUAL METAPHOR\n',
					style: 'subheader'
				},
				{
					image: './images/page-9-visual-metaphor.png',
					width: 516,
					margin: [0, 0, 0, 30]
				},

				{
					text: 'HONORING YOUR AUTHORITY\n',
					style: 'subheader'
				},

				{
					style: 'bodyTextSmall',
					columns: [
						{
							text: 'Lorem ipsum dolor sit amet, consectetuer adipisc- ing elit, sed diam nonummy nibh euismod tincid- unt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, cons ectetuer adipi-'
						},
						{
							text: 'Lorem ipsum dolor sit amet, consectetuer adipisc- ing elit, sed diam nonummy nibh euismod tincid- unt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, cons ectetuer adipi-\n\n',
							style: 'rightColumn'

						}
					]
				},

				{
					image: './images/page-5-horizontal-rule.png',
					width: 516,
					margin: [0, 0, 0, 30]
				},
				{
					text: 'FOLLOWING STRATEGY & AUTHORITY\n',
					style: 'subheader'
				},

				{
					pageBreak: 'after',
					style: 'bodyTextSmall',
					columns: [
						{
							text: 'Lorem ipsum dolor sit amet, consectetuer adipisc- ing elit, sed diam nonummy nibh euismod tincid- unt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio'
						},
						{
							text: 'Lorem ipsum dolor sit amet, consectetuer adipisc- ing elit, sed diam nonummy nibh euismod tincid- unt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan.',
							style: 'rightColumn'

						}
					]
				},


				// Page 10 - Profile

				{
					image: './images/page-10-profile.png',
					width: 516,
					margin: [0, 0, 0, 30]
				},

				{
					columns: [
						{
							image: './images/page-10-hexagram-2-4.png',
							width: 84,
							margin: [0, 0, 24, 0]
						},
						{
							margin: [24, 0, 0, 0],
							text: [
								{
									style: 'supheader',
									text: '\nYOUR PROFILE\n'
								},
								{
									style: 'largeHeader',
									text: '2/4 Hermit Opportunist'
								}
							] // End textArray
						}
					]
				},

				{
					image: './images/page-5-horizontal-rule.png',
					width: 516,
					margin: [0, 22, 0, 38]
				},

				{
					text: 'WHAT DOES THAT MEAN?\n',
					style: 'subheader'
				},

				{
					pageBreak: 'after',
					style: 'bodyTextSmall',
					columns: [
						{
							text: 'Lorem ipsum dolor sit amet, consectetuer adipisc- ing elit, sed diam nonummy nibh euismod tincid- unt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros'
						},
						{
							text: 'Lorem ipsum dolor sit amet, consectetuer adipisc- ing elit, sed diam nonummy nibh euismod tincid- unt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros',
							style: 'rightColumn'

						}
					]
				},




				// Page 11 Profile Lines

				{
					columns: [
						{
							image: './images/page-11-hexagram-line-2.png',
							width: 84,
							margin: [0, 0, 24, 0]
						},
						{
							margin: [24, 0, 0, 0],
							text: [
								{
									style: 'supheader',
									text: '\nCONSCIOUS PERSONALITY\n'
								},
								{
									style: 'largeHeader',
									text: '2nd Line'
								}
							] // End textArray
						}
					]
				},



				{
					margin: [0, 25, 0, 0],
					style: 'bodyTextSmall',
					columns: [
						{
							text: 'Lorem ipsum dolor sit amet, consectetuer adipisc- ing elit, sed diam nonummy nibh euismod tincid- unt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros'
						},
						{
							text: 'Lorem ipsum dolor sit amet, consectetuer adipisc- ing elit, sed diam nonummy nibh euismod tincid- unt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros',
							style: 'rightColumn'

						}
					]
				},


				{
					image: './images/page-5-horizontal-rule.png',
					width: 516,
					margin: [0, 28, 0, 30]
				},

				{
					columns: [
						{
							image: './images/page-11-hexagram-line-4.png',
							width: 84,
							margin: [0, 0, 24, 0]
						},
						{
							margin: [24, 0, 0, 0],
							text: [
								{
									style: 'supheader',
									text: '\nUNCONSCIOUS DESIGN\n'
								},
								{
									style: 'largeHeader',
									text: '4th Line'
								}
							] // End textArray
						}
					]
				},


				{
					margin: [0, 25, 0, 0],
					style: 'bodyTextSmall',
					pageBreak: 'after',
					columns: [
						{
							text: 'Lorem ipsum dolor sit amet, consectetuer adipisc- ing elit, sed diam nonummy nibh euismod tincid- unt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros'
						},
						{
							text: 'Lorem ipsum dolor sit amet, consectetuer adipisc- ing elit, sed diam nonummy nibh euismod tincid- unt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros',
							style: 'rightColumn'

						}
					]
				},


				// Page 12 - Circuitry

				{
					image: './images/page-12-circuitry.png',
					width: 516,
					margin: [0, 0, 0, 27]
				},


				{
					text: 'HOW YOU ARE WIRED\n',
					style: 'supheader'
				},

				{
					text: 'Circuitry\n',
					style: 'largeHeader'
				},
				{
					pageBreak: 'after',
					margin: [0, 20, 0, 0],
					style: 'bodyTextSmall',
					columns: [
						{
							text: 'Lorem ipsum dolor sit amet, consectetuer adipisc- ing elit, sed diam nonummy nibh euismod tincid- unt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros'
						},
						{
							text: 'Lorem ipsum dolor sit amet, consectetuer adipisc- ing elit, sed diam nonummy nibh euismod tincid- unt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros',
							style: 'rightColumn'

						}
					]
				},


				// Page 13 - Your Circuitry

				{
					text: 'YOUR CIRCUITRY\n\n',
					style: 'listSubheader'
				},

				{
					text: 'Collective Abstract\n',
					style: 'listHeader'
				},
				{
					text: 'MATURATION (42-53)\n',
					style: 'listSubheader'
				},
				{
					text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan.',
					style: 'listBody'
				},

				{
					text: 'Collective Logical\n',
					style: 'listHeader'
				},
				{
					text: 'JUDGMENT (18-58)\n',
					style: 'listSubheader'
				},
				{
					text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan.',
					style: 'listBody'
				},

				{
					text: 'Tribal\n',
					style: 'listHeader'
				},
				{
					text: 'SURRENDER (26-44)\n',
					style: 'listSubheader'
				},
				{
					pageBreak: 'after',
					text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan.',
					style: 'listBody'
				},

				// Page 14 - Definition

				{
					image: './images/page-14-definition.png',
					width: 516,
					margin: [0, 0, 0, 27]
				},

				{
					text: 'HOW YOU ARE WIRED\n',
					style: 'supheader'
				},

				{
					text: 'Single Definition\n',
					style: 'largeHeader'
				},
				{
					pageBreak: 'after',
					margin: [0, 20, 0, 0],
					style: 'bodyTextSmall',
					columns: [
						{
							text: 'Lorem ipsum dolor sit amet, consectetuer adipisc- ing elit, sed diam nonummy nibh euismod tincid- unt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros'
						},
						{
							text: 'Lorem ipsum dolor sit amet, consectetuer adipisc- ing elit, sed diam nonummy nibh euismod tincid- unt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros',
							style: 'rightColumn'

						}
					]
				},



				// Page 15 - Defined Centers

				{
					text: 'DEFINED CENTERS\n\n',
					style: 'subheader'
				},

				{
					text: 'Sacral\n',
					style: 'listHeader'
				},
				{
					text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan.',
					style: 'listBody',
					margin: [0, 0, 0, 44]
				},

				{
					text: 'Root\n',
					style: 'listHeader'
				},
				{
					text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan.',
					style: 'listBody',
					margin: [0, 0, 0, 44]
				},

				{
					text: 'Spleen\n',
					style: 'listHeader'
				},
				{
					text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan.',
					style: 'listBody',
					margin: [0, 0, 0, 44]
				},

				{
					text: 'Ego\n',
					style: 'listHeader'
				},
				{
					text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan.',
					style: 'listBody',
					margin: [0, 0, 0, 44],
					pageBreak: 'after'
				},

				// Page 16 - Deconditioning


				{
					image: './images/page-16-deconditioning.png',
					width: 516,
					margin: [0, 0, 0, 33]
				},

				{
					text: 'LEARNING WHAT YOU ARE NOT\n',
					style: 'supheader'
				},

				{
					text: 'Deconditioning\n',
					style: 'largeHeader'
				},
				{
					pageBreak: 'after',
					margin: [0, 20, 0, 0],
					style: 'bodyTextSmall',
					columns: [
						{
							text: 'Lorem ipsum dolor sit amet, consectetuer adipisc- ing elit, sed diam nonummy nibh euismod tincid- unt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros'
						},
						{
							text: 'Lorem ipsum dolor sit amet, consectetuer adipisc- ing elit, sed diam nonummy nibh euismod tincid- unt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros',
							style: 'rightColumn'

						}
					]
				},


				// Page 17 - Open Centers

				{
					text: 'OPEN CENTERS | NOT SELF THEMES\n\n',
					style: 'subheader'
				},
				{
					text: 'Solar Plexus\n',
					style: 'listHeader'
				},
				{
					text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan.',
					style: 'listBody',
					margin: [0, 0, 0, 39]
				},
				{
					text: 'G Center\n',
					style: 'listHeader'
				},
				{
					text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan.',
					style: 'listBody',
					margin: [0, 0, 0, 39]
				},
				{
					text: 'Ajna\n',
					style: 'listHeader'
				},
				{
					text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan.',
					style: 'listBody',
					margin: [0, 0, 0, 39]
				},
				{
					text: 'Head\n',
					style: 'listHeader'
				},
				{
					text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan.',
					style: 'listBody',
					margin: [0, 0, 0, 39]
				},

				{
					text: 'Throat\n',
					style: 'listHeader'
				},
				{
					text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan.',
					style: 'listBody',
					margin: [0, 0, 0, 39],
					pageBreak: 'after'
				},



				// Page 18 - Incarnation Cross
				{
					image: './images/page-16-deconditioning.png',
					width: 516,
					margin: [0, 0, 0, 40]
				},


				{
					text: 'YOUR INCARNATION CROSS\n',
					style: 'supheader'
				},

				{
					text: 'Right Angle\nCross Of Eden',
					style: 'largeHeader',
					margin: [0, 0, 0, 21]
				},

				{
					text: 'Personality Sun (12) | Personality Earth (11) | Design Sun (36) | Design Earth (6)',
				},

				{
					image: './images/page-5-horizontal-rule.png',
					width: 516,
					margin: [0, 11, 0, 11]
				},

				{
					text: 'WHAT DOES THAT MEAN?\n',
					style: 'subheaderQuestion'
				},

				{
					pageBreak: 'after',
					margin: [0, 20, 0, 0],
					style: 'bodyTextSmall',
					columns: [
						{
							text: 'Lorem ipsum dolor sit amet, consectetuer adipisc- ing elit, sed diam nonummy nibh euismod tincid- unt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea.'
						},
						{
							text: 'Lorem ipsum dolor sit amet, consectetuer adipisc- ing elit, sed diam nonummy nibh euismod tincid- unt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation.',
							style: 'rightColumn'

						}
					]
				},


				// Page 19 - Synthesis
				{
					text: 'UNIQUE HUMAN DESIGN SYNTHESIS FOR:\n',
					style: 'supheader'
				},

				{
					text: 'Jonah Dempcy\n',
					style: 'largeHeader'
				},

				{
					pageBreak: 'after',
					margin: [0, 42, 0, 0],
					style: 'bodyTextSmall',
					columns: [
						{
							text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, cons ectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation\n\n.Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit'
						},
						[{
							text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, cons ectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.\n\n',
							style: 'rightColumn'

						},
						{
							image: './images/page-19-synthesis.png',
							width: 225,
							style: 'rightColumn'
						}

						]
					]
				},






				// Page 20 - Learn More
				{
					text: 'LEARN MORE',
					style: 'learnMoreSubheader'
				},
				{
					text: 'ADVANCED HUMAN DESIGN\nDIFFERENTIATION GUIDE',
					style: 'learnMoreHeader'
				},

				{
					image: './images/page-5-horizontal-rule.png',
					width: 516,
					margin: [0, 49, 0, 30]
				},

				{
					text: 'LEARN MORE ABOUT YOUR HUMAN DESIGN:\n\n',
					style: 'learnMoreSubheader'
				},

				{
					text: 'VARIABLE\n\n',
					style: 'learnMoreTopicHeader'
				},
				{
					text: 'DETERMINATION\n\n',
					style: 'learnMoreTopicHeader'
				},
				{
					text: 'ENVIRONMENT\n\n',
					style: 'learnMoreTopicHeader'
				},
				{
					text: 'MOTIVATION\n\n',
					style: 'learnMoreTopicHeader'
				},
				{
					text: 'VIEW\n\n',
					style: 'learnMoreTopicHeader'
				},
				{
					text: 'COGNITIVE TONE\n\n',
					style: 'learnMoreTopicHeader'
				},
				{
					text: 'ENVIRONMENTAL TONE\n\n',
					style: 'learnMoreTopicHeader'
				},
				{
					text: 'TRANSFERENCE\n\n',
					style: 'learnMoreTopicHeader'
				},
				{
					pageBreak: 'after',
					text: 'DISTRACTION\n\n',
					style: 'learnMoreTopicHeader'
				},


				// Page 21 - Notes
				{
					pageBreak: 'after',
					text: 'NOTES:',
					style: 'learnMoreSubheader'
				},


				// Page 22 - Curated Ra Quotes
				{
					margin: [0, 42, 0, 0],
					style: 'bodyTextSmall',
					columns: [
						[
							{
								text: 'CURATED RA QUOTES\n\n',
								style: 'subheader'
							},
							{
								text: '“Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, cons ectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.”\nRa Uru Hu\n\n'
							},
							{
								image: './images/page-22-ra-quote-1.png',
								width: 272,
								margin: [0, 0, 0, 15]
							}

						],
						[
							{
								image: './images/page-22-ra-quote-2.png',
								width: 254,
								style: 'rightColumn'
							},

							{
								text: '\n\n“Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, cons ectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.”\nRa Uru Hu',
								style: 'rightColumn'

							}

						]
					]
				},

				{
					image: './images/page-5-horizontal-rule.png',
					width: 516,
					margin: [0, 11, 0, 11]
				},


				{
					margin: [0, 0, 0, 0],
					style: 'bodyTextSmall',
					columns: [
						[
							{
								text: 'Sample REport',
								style: 'smallHeader'
							},
							{
								text: 'Learn more at centerforhumandesign.org',
								italics: true
							}
						],
						{
							text: 'Human Design Differentiation Field Guide',
							margin: [18, 13, 0, 0],
							fontSize: 10,
							characterSpacing: .8

						}

					]
				},


			], // End content

			defaultStyle: {
				font: 'NunitoSans',
				fontSize: 12,
				lineHeight: 1.3,
				characterSpacing: 1
			},
			styles: {
				bodyTextSmall: {
					fontSize: 10
				},

				header: {
					fontSize: 28,
					lineHeight: .8,
					font: 'Carena'
				},
				smallHeader: {
					fontSize: 20,
					lineHeight: .8,
					font: 'Carena',
					margin: [0, 0, 0, 10]
				},
				largeHeader: { // Used on e.g. Page 10, Profile
					fontSize: 35,
					lineHeight: .8,
					font: 'Carena'
				},

				supheader: { // For headers *above* the main header
					fontSize: 11,
					characterSpacing: 1.2,
					lineHeight: 1.3,
					bold: true,
					font: 'CommutersSans'
				},
				subheader: { // General use subheader
					fontSize: 11,
					characterSpacing: 1.2,
					lineHeight: 1.3,
					bold: true,
					font: 'CommutersSans'
				},
				subheaderQuestion: { // e.g. "WHAT DOES THAT MEAN?"
					fontSize: 12,
					characterSpacing: 1.2,
					lineHeight: 1.3,
					bold: true,
					color: '#383838',
					font: 'NunitoSans'
				},
				smallSubheader: { // Smaller version
					fontSize: 11,
					characterSpacing: 1.2,
					lineHeight: 1.3,
					bold: true,
					font: 'CommutersSans'
				},
				// List headers, subheaders and body text (Use for e.g. page 13)
				listHeader: {
					fontSize: 24,
					lineHeight: .8,
					font: 'Carena',
					margin: [0, 0, 0, 24]
				},
				listSubheader: {
					margin: [0, 0, 0, 19],
					fontSize: 10,
					characterSpacing: 1.2,
					lineHeight: 1.3,
					bold: true,
					font: 'CommutersSans'
				},
				listBody: {
					margin: [0, 0, 0, 50],
					fontSize: 11,
					lineHeight: 1.3,
					characterSpacing: .9,
					color: '#303030'
				},
				greyTable: {
					fontSize: 10,
					characterSpacing: .7,
					color: '#383838'
				},
				greyTableLabel: {
					font: 'CommutersSans',
					characterSpacing: 1.5,
					color: '#707070',
					bold: true
				},
				columnLabel: {
					font: 'CommutersSans',
					characterSpacing: 1.5,
					color: '#707070',
					bold: true
				},
				rightColumn: {
					margin: [19, 0, 0, 0]
				},
				learnMoreHeader: {
					fontSize: 24,
					characterSpacing: 1.2,
					lineHeight: .9,
					bold: true,
					color: '#383838',
					font: 'NunitoSans'
				},
				learnMoreSubheader: {
					fontSize: 12,
					characterSpacing: 1.2,
					lineHeight: 1.1,
					bold: true,
					color: '#707070',
					font: 'NunitoSans'

				},
				learnMoreTopicHeader: {
					fontSize: 16,
					characterSpacing: 1.2,
					lineHeight: .8,
					bold: true,
					color: '#383838',
					font: 'NunitoSans'
				}
			}
		} // End docDefinition

		var options = {
			// ...
		}

		var pdfDoc = printer.createPdfKitDocument(docDefinition, options);
		pdfDoc.pipe(fs.createWriteStream(`bodygraph-${bg.id}-${bg.name.split(" ").join("_")}.pdf`));
		pdfDoc.end();

		bg.totalProcessingTime = new Date().getTime() - startTime;
		res.status(200).json(bg);
	}
	catch (ex: any) {
		util.respondWithError500(ex, res);
	}
});

module.exports = router;
