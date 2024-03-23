const core = require('@actions/core');
const github = require('@actions/github');
const Slack = require('slack-node');

const USERS = [
  {
    slackID: 'U06QSKJDCF7',
    githubID: 'JUDONGHYEOK',
  },
];

try {
  const url = core.getInput('slack_url');

  const slack = new Slack();
  slack.setWebhook(url);
  const send = async (message) => {
    slack.webhook(
      {
        text: message,
        attachments: [
          {
            color: '#36a64f',
            pretext: 'MR을 보냈습니다!',
            author_name: JSON.stringify(github.context),
          },
        ],
      },
      function (err, response) {
        console.log(response);
      }
    );
  };
  console.log(github.context);
  send(
    `@${
      USERS.find((user) => user.githubID === github.context.actor).slackID
    }님이 MR을 보냈습니다!`
  );
  core.setOutput('service', url);
} catch (error) {
  core.setFailed(error.message);
}
