import * as cdk from "aws-cdk-lib";
import * as apigateway from "aws-cdk-lib/aws-apigateway";
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
  }
}
