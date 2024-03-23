const core = require('@actions/core');
const github = require('@actions/github');
const Slack = require('slack-node');

const USERS = [
  {
    slackID: 'U06QSKJDCF7',
    githubID: 'JUDONGHYEOK',
  },
  { slackID: 'U06QSKJDCF7', githubID: 'KoreanDonkey' },
];

try {
  const url = core.getInput('slack_url');

  const slack = new Slack();
  slack.setWebhook(url);
  const send = async () => {
    slack.webhook(
      {
        attachments: [
          {
            color: '#36a64f',
            pretext: `<@${
              USERS.find((user) => user.githubID === github.context.actor)
                .slackID
            }>님이 MR을 보냈습니다!`,
            author_name: JSON.stringify(
              `${github.context.payload.pull_request.requested_reviewers
                .map((reviewer) => {
                  const slackID = USERS.find(
                    (user) => user.githubID === reviewer
                  ).slackID;
                  return slackID ? `<@${slackID}>` : undefined;
                })
                .filter(Boolean)
                .join(' ')}님 리뷰해주세요!`
            ),
          },
        ],
      },
      function (err, response) {
        console.log(response);
      }
    );
  };

  send();
} catch (error) {
  core.setFailed(error.message);
}
