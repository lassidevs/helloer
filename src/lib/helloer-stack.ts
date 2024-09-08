import * as cdk from "aws-cdk-lib";
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as nodejs from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";
import * as path from "path";
import { fileURLToPath } from "url";
import * as yaml from "js-yaml";
import * as fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// load OpenAPI schema

const schema = yaml.load(
  fs.readFileSync(
    path.join(__dirname, "..", "..", "openapiSchema.yml"),
    "utf-8",
  ),
);

export class HelloerStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // create API gateway
    const api = new apigateway.SpecRestApi(this, "alma-helloer-api", {
      apiDefinition: apigateway.ApiDefinition.fromInline(schema),
      deployOptions: {
        stageName: "prod",
      },
    });

    // Lambda functions
    const helloGet = new nodejs.NodejsFunction(this, "HelloGetLambda", {
      runtime: lambda.Runtime.NODEJS_20_X,
      entry: path.join(__dirname, "lambda", "hello-get.ts"),
      handler: "handler",
    });

    const helloPost = new nodejs.NodejsFunction(this, "HelloPostLambda", {
      runtime: lambda.Runtime.NODEJS_20_X,
      entry: path.join(__dirname, "lambda", "hello-post.ts"),
      handler: "handler",
    });

    // Add Lambda integrations
    const getIntegration = new apigateway.LambdaIntegration(helloGet);
    const postIntegration = new apigateway.LambdaIntegration(helloPost);

    // Get the resources from the API
    const helloResource = api.root.getResource("hello");
    if (!helloResource) {
      throw new Error("hello resource not found in API definition");
    }
    const helloNameResource = helloResource.getResource("{name}");
    if (!helloNameResource) {
      throw new Error("{name} resource not found in API definition");
    }
  }
}
