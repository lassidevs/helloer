import {
  APIGatewayProxyEventV2,
  APIGatewayProxyStructuredResultV2,
} from "aws-lambda";
export interface HelloResponse {
  message: string;
}
export interface HelloPostRequest {
  name: string;
}
export interface ErrorResponse {
  message: string;
}
export type HelloGetEvent = APIGatewayProxyEventV2 & {
  pathParameters?: {
    name?: string;
  };
};
export type HelloPostEvent = APIGatewayProxyEventV2 & {
  body: string; // JSON string
};

export type LambdaHandler<TEvent = APIGatewayProxyEventV2> = (
  event: TEvent,
) => Promise<APIGatewayProxyStructuredResultV2>;
