import { APIGatewayProxyStructuredResultV2 } from "aws-lambda";
import {
  HelloPostEvent,
  HelloResponse,
  LambdaHandler,
  ErrorResponse,
} from "../../types/api-types";

export const handler: LambdaHandler<HelloPostEvent> = async (
  event: HelloPostEvent,
): Promise<APIGatewayProxyStructuredResultV2> => {
  const body = JSON.parse(event.body || "{}");
  const name = body.name;

  if (!name) {
    const errorResponse: ErrorResponse = { message: "Bad Request" };
    return {
      statusCode: 400,
      body: JSON.stringify(errorResponse),
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  // Say hello to a name given in the request body
  const response: HelloResponse = { message: `Hello ${name}` };
  return {
    statusCode: 200,
    body: JSON.stringify(response),
    headers: {
      "Content-Type": "application/json",
    },
  };
};
