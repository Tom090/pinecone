import { OperationHandlerTestSetup } from '@trayio/cdk-dsl/connector/operation/OperationHandlerTest';
import { OperationHandlerResult } from '@trayio/cdk-dsl/connector/operation/OperationHandler';
import { upsertVectorsHandler } from './handler';
import '@trayio/cdk-runtime/connector/operation/OperationHandlerTestRunner';

OperationHandlerTestSetup.configureHandlerTest(upsertVectorsHandler, (handlerTest) =>
	handlerTest
		.usingHandlerContext('test')
		.nothingBeforeAll()
		.testCase('should upsert vectors successfully', (testCase) =>
			testCase
				.givenNothing()
				.when(() => ({
					index_host: 'test-tssv4y0.svc.aped-4627-b74a.pinecone.io',
					vectors: [
						{
							id: 'vector1',
							values: [0.81, 0.12],
						},
					],
				}))
				.then(({ output }) => {
					const outputValue = OperationHandlerResult.getSuccessfulValueOrFail(output);
					expect(outputValue.upsertedCount).toBeGreaterThan(0);
				})
				.finallyDoNothing()
		)
		.nothingAfterAll()
);