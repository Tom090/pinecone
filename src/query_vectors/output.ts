export type QueryVectorsOutput = {
	matches: {
		id: string;
		score: number;
		values: number[];
	}[];
};