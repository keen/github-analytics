const env = require('dotenv').config();
const github = require('octonode');
const options = {
  keen: {
    projectId: process.env.KEEN_PROJECT_ID,
    writeKey: process.env.KEEN_WRITE_KEY
  },
  github: {
    accessToken: process.env.GITHUB_ACCESS_TOKEN,
    orgs: process.env.GITHUB_ORG.split(','),
    events: [
      'commit_comment',
      'create',
      'delete',
      'deployment',
      'deployment_status',
      'fork',
      'gollum',
      'installation',
      'installation_repositories',
      'issue_comment',
      'issues',
      'label',
      'marketplace_purchase',
      'member',
      'membership',
      'milestone',
      'organization',
      'org_block',
      'page_build',
      'project_card',
      'project_column',
      'project',
      'public',
      'pull_request_review_comment',
      'pull_request_review',
      'pull_request',
      'push',
      'repository',
      'release',
      'status',
      'team',
      'team_add',
      'watch'
    ]
  }
};

options.github.orgs.forEach((org) => {
  options.github.events.forEach((eventType) => {
    let url = `https://api.keen.io/3.0/projects/${options.keen.projectId}`;
        url += `/events/${eventType}?api_key=${options.keen.writeKey}`;
    github
      .client(options.github.accessToken)
      .org(org)
      .hook({
        name: 'web',
        active: true,
        events: [ eventType ],
        config: {
          url: url,
          content_type: 'json'
        }
      }, (err, res) => {
        if (err) {
          console.log(err.statusCode + ' ' + err.message);
        }
        else {
          console.log('Webhook created: ' + res.events[0]  + ' (' + res.active + ')');
        }
      });
  });
});
