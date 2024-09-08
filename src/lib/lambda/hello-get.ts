import { APIGatewayProxyStructuredResultV2 } from "aws-lambda";
import {
  ErrorResponse,
  HelloGetEvent,
  HelloResponse,
  LambdaHandler,
} from "../../types/api-types";

export const handler: LambdaHandler = async (
  event: HelloGetEvent,
): Promise<APIGatewayProxyStructuredResultV2> => {
  const name = event.pathParameters?.name;
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

  // Say hello to a name given in the path
  const response: HelloResponse = { message: `Hello ${name}` };
  return {
    statusCode: 200,
    body: JSON.stringify(response),
    headers: {
      "Content-Type": "application/json",
    },
  };
};
