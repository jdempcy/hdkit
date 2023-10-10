export interface DefinedCentersByChannel {
	[key: string] : Array<string>;
}

export interface Activation {
	Gate: number;
	Line: number;
	Color: number;
	Tone: number;
	Base: number;
}
export interface AllActivatedGates {
    [key: string] : string;
}
export interface AuthorityMap {
    [key: string] : string;
}

export interface HarmonicGates {
		[key: number]: Array<number>
}

export interface Bodygraph {
	name: string; // e.g. "Jonah Dempcy"
	id: string; // e.g. "de909686e7dbfd7f"
	birthDateAndTime: string; // e.g. "9/25/1983 00:48"
	location: string; // e.g. "Menomonee Falls, Wisconsin"
	definition: string; // e.g. "Single"
	profile: string; // e.g. "5/1"
	channels: Array<string>; // e.g. ["9-52", "29-46"]
	type: string;
	authority: string;
	definedCenters: Array<string>; // e.g. ["Root", "Sacral", "G"]
	totalProcessingTime: number;
	activatedGates: Array<string>; // e.g. ["2", "4", "9", "11", "12", "25", "26", "28", "29" etc... ]
	activatedPersonalityGates: Array<number>;
	activatedDesignGates: Array<number>;
	allActivations: Array<Activation>;
	circuitries: Array<string>; // e.g. ["Collective Logic", "Collective Abstract" etc...]
	variable: string;
	activations: {
		Personality: {
			Sun: Activation,
			Earth: Activation,
			NorthNode: Activation,
			SouthNode: Activation,
			Moon: Activation,
			Mercury: Activation,
			Venus: Activation,
			Mars: Activation,
			Jupiter: Activation,
			Saturn: Activation,
			Uranus: Activation,
			Neptune: Activation,
			Pluto: Activation
		},
		Design: {
			Sun: Activation,
			Earth: Activation,
			NorthNode: Activation,
			SouthNode: Activation,
			Moon: Activation,
			Mercury: Activation,
			Venus: Activation,
			Mars: Activation,
			Jupiter: Activation,
			Saturn: Activation,
			Uranus: Activation,
			Neptune: Activation,
			Pluto: Activation
		} // End Design activations
	} // End activations
} // End Bodygraph interface
