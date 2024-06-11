import { OperationHandlerTestSetup } from '@trayio/cdk-dsl/connector/operation/OperationHandlerTest';
import { OperationHandlerResult } from '@trayio/cdk-dsl/connector/operation/OperationHandler';
import { queryVectorsHandler } from './handler';
import '@trayio/cdk-runtime/connector/operation/OperationHandlerTestRunner';

OperationHandlerTestSetup.configureHandlerTest(queryVectorsHandler, (handlerTest) =>
	handlerTest
		.usingHandlerContext('test')
		.nothingBeforeAll()
		.testCase('should query vectors successfully', (testCase) =>
			testCase
				.givenNothing()
				.when(() => ({
					index_host: 'example-index-host',
					vector: [0.81, 0.12],
					topK: 5
				}))
				.then(({ output }) => {
					const outputValue = OperationHandlerResult.getSuccessfulValueOrFail(output);
					expect(outputValue.matches).toBeDefined();
				})
				.finallyDoNothing()
		)
		.nothingAfterAll()
);
