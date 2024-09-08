## Why do we have a dist folder?

This folder is simply for catching build errors when developing. AWS cdk does not require `npm run build` command as the CLI does this for us.
<br />
The contents of this folder (build files) are exluded from git and npm. Think of this directory as a dump for build files, it serves no other purpose than to help catch build errors in development by running `npm run build` before deploying.
