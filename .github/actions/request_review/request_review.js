const core = require("@actions/core");
const github = require("@actions/github");
const { IncomingWebhook } = require("@slack/webhook");

const USERS = [
  {
    slackID: "U06QSKJDCF7",
    githubID: 5674167
  },
  { slackID: "U06QSKJDCF7", githubID: 164613004 }
];

try {
  const url = core.getInput("slack_url");
  const webhook = new IncomingWebhook(url);

  const send = async () => {
    webhook.send(
      {
        text: "PR이 도착했습니다.🫡",
        blocks: [
          {
            type: "header",
            text: {
              type: "plain_text",
              text: "PR이 도착했습니다.🫡",
              emoji: true
            }
          },
          {
            type: "section",
            fields: [
              {
                type: "mrkdwn",
                text: `<@${
                  USERS.find(user => user.githubID === github.context.payload.sender.id)
                    ?.slackID
                }>님이 MR을 보냈습니다!`
              },
              {
                type: "mrkdwn",
                text: `${github.context.payload.pull_request.requested_reviewers
                  .map(reviewer => {
                    const slackID = USERS.find(
                      user => user.githubID === reviewer.id
                    )?.slackID;
                      console.log(reviewer.id)  
                    return slackID ? `<@${slackID}>` : undefined;
                  })
                  .filter(Boolean)
                  .join(" ")}님 리뷰해주세요!`
              }
            ]
          },
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: `### PR 정보 \n - 제목: ${github.context.payload.pull_request.title} \n - URL: ${github.context.payload.pull_request.html_url}`
            }
          },
          {
            type: "actions",
            elements: [
              {
                type: "button",
                url: `${github.context.payload.pull_request.html_url}`,
                text: {
                  type: "plain_text",
                  text: "PR 확인하기"
                }
              }
            ]
          }
        ]
      },
      function (err, response) {
        console.log(response);
      }
    );
  };
  console.log(github.context.payload.sender.id)
  console.log(github.context.payload.pull_request.requested_reviewers)
  console.log('=-------------------')
  console.log(github.context);
  send();
} catch (error) {
  core.setFailed(error.message);
}
