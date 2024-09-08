import { describe, it, expect } from "vitest";
import { handler } from "./hello-get";
import { HelloGetEvent } from "../../types/api-types";

describe("hello-get Lambda function", () => {
  it("should return a 200 response with a greeting message", async () => {
    const event: HelloGetEvent = {
      pathParameters: { name: "Alice" },
    } as HelloGetEvent;

    const result = await handler(event);

    expect(result.statusCode).toBe(200);
    expect(JSON.parse(result.body as string)).toEqual({
      message: "Hello Alice",
    });
    expect(result.headers).toEqual({ "Content-Type": "application/json" });
  });

  it("should return a 400 response when name is missing", async () => {
    const event: HelloGetEvent = {} as HelloGetEvent;

    const result = await handler(event);

    expect(result.statusCode).toBe(400);
    expect(JSON.parse(result.body as string)).toEqual({
      message: "Bad Request",
    });
    expect(result.headers).toEqual({ "Content-Type": "application/json" });
  });
});
