export type QueryVectorsInput = {
	/**
	 * @title Index Host
	 * @description The host of the index
	 */
	index_host: string;
	/**
	 * @title Vector
	 * @description The query vector
	 */
	vector: number[] | string;
	/**
	 * @title ID
	 * @description The ID of the item
	 */
	id: string;
	/**
	 * @title Filter
	 * @description The filter object
	 */
	filter: object;
	/**
	 * @title Top K
	 * @description The number of top results to return
	 * @TJS-type integer
	 */
	topK: number;
	/**
	 * @title Include Values
	 * @description Whether to include values in the response
	 */
	includeValues: boolean;
	/**
	 * @title Namespace
	 * @description The namespace to search in
	 */
	namespace?: string;
};