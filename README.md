# Github Analytics with Keen IO

This script will create a series of webhooks to stream event data from your Github organization(s) to a Keen project.

### Project ID & API Key

[Login to Keen IO to create a project](https://keen.io/login?s=gh_gist) and grab the **Project ID** and **Write Key** from your project's **Access** page. Copy these into the `keen.projectId` and `keen.writeKey` fields of the `config.json` file included with this gist.

### Github Access Token

[Create a new Github access token](https://github.com/settings/tokens/new) with the `admin:org_hook` option selected. Copy this token into the `github.token` field of the `config.json` file included with this gist.

Next, add the organization names you want to configure to `github.accounts` field. This script will create all of the necessary webhooks for each organization listed there. All event data will be recorded to the same Keen project from the previous step, but can be segmented or filterd by an `organization.login` property, which exists for all event types.

**Important: you must be an admin** for all of the Github organizations listed for your access token to work properly.

### Installation

Clone this gist and run the following command:

```ssh
npm install octonode
```

### Run the Script

Run the following command to execute the script:

```ssh
node index.js
```
