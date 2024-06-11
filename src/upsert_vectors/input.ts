export type UpsertVectorsInput = {
	/**
	 * @title Index Host
	 * @description The host of the index
	 */
	index_host: string;
	/**
	 * @title Vectors
	 * @description The vectors to upsert
	 */
	vectors: {
		id: string;
		values: number[];
		sparseValues?: {
			indices: number[];
			values: number[];
		};
		metadata?: object;
	}[];
	/**
	 * @title Namespace
	 * @description The namespace to upsert the vectors into
	 */
	namespace?: string;
};