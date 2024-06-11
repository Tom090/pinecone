import { OperationHandlerSetup } from '@trayio/cdk-dsl/connector/operation/OperationHandlerSetup';
import { PineconeAuth } from '../PineconeAuth';
import { QueryVectorsInput } from './input';
import { QueryVectorsOutput } from './output';
import { globalConfigHttp } from '../GlobalConfig';
import { OperationHandlerResult, OperationHandlerError } from '@trayio/cdk-dsl/connector/operation/OperationHandler';

export const queryVectorsHandler = OperationHandlerSetup.configureHandler<
	PineconeAuth,
	QueryVectorsInput,
	QueryVectorsOutput
>((handler) =>
	handler
		.withGlobalConfiguration(globalConfigHttp)
		.addInputValidation((validation) =>
			validation
				.condition((ctx, input) => !(input.vector && input.id))
				.errorMessage((ctx, input) => 'Cannot provide both vector and id')
		)
		.usingHttp((http) =>
			http
				.post('https://{index_host}/query')
				.handleRequest((ctx, input, request) => {
					let body = { ...input };
					if (typeof input.vector === 'string') {
						body.vector = JSON.parse(input.vector);
					}
					delete body.index_host;
					return request
						.addPathParameter('index_host', input.index_host)
						.withBodyAsJson(body);
				})
				.handleResponse((ctx, input, response) =>
					response
						.withErrorHandling(() => {
							if (response.getStatusCode() === 400) {
								return OperationHandlerResult.failure(
									OperationHandlerError.userInputError('Bad request')
								);
							}
							return OperationHandlerResult.failure(
								OperationHandlerError.apiError(`API error: ${response.getStatusCode()}`)
							);
						})
						.parseWithBodyAsJson()
				)
		)
	);
