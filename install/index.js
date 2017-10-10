const config = require('../config.json');
const github = require('octonode');

config.github.accounts.forEach((org) => {
  config.github.events.forEach((eventType) => {
    let url = `https://api.keen.io/3.0/projects/${config.keen.projectId}`;
        url += `/events/${eventType}?api_key=${config.keen.writeKey}`;

    github
      .client(config.github.token)
      .org(org)
      .hook({
        name: 'web',
        active: true,
        events: [ eventType ],
        config: {
          url: url,
          content_type: 'json'
        }
      }, console.log);
  });
});
