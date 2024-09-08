import { describe, it, expect } from "vitest";
import { handler } from "./hello-post";
import { HelloPostEvent } from "../../types/api-types";

describe("hello-post Lambda function", () => {
  it("should return a 200 response with a greeting message", async () => {
    const event: HelloPostEvent = {
      body: JSON.stringify({ name: "Bob" }),
    } as HelloPostEvent;

    const result = await handler(event);

    expect(result.statusCode).toBe(200);
    expect(JSON.parse(result.body as string)).toEqual({ message: "Hello Bob" });
    expect(result.headers).toEqual({ "Content-Type": "application/json" });
  });

  it("should return a 400 response when name is missing", async () => {
    const event: HelloPostEvent = {
      body: JSON.stringify({}),
    } as HelloPostEvent;

    const result = await handler(event);

    expect(result.statusCode).toBe(400);
    expect(JSON.parse(result.body as string)).toEqual({
      message: "Bad Request",
    });
    expect(result.headers).toEqual({ "Content-Type": "application/json" });
  });

  it("should return a 400 response when body is missing", async () => {
    const event: HelloPostEvent = {} as HelloPostEvent;

    const result = await handler(event);

    expect(result.statusCode).toBe(400);
    expect(JSON.parse(result.body as string)).toEqual({
      message: "Bad Request",
    });
    expect(result.headers).toEqual({ "Content-Type": "application/json" });
  });
});
