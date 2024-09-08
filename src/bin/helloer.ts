#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { HelloerStack } from "../lib/helloer-stack";

const app = new cdk.App();
new HelloerStack(app, "HelloerStack", {
  // Using default account implied from CLI config.
  // If you're aiming to run this code on your own environment, consider changing these (note to whomever reviews this code)
  // more info at: https://docs.aws.amazon.com/cdk/v2/guide/environments.html
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
});
