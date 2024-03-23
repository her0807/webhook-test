const core = require('@actions/core');
const github = require('@actions/github');
const Slack = require('slack-node');

const ENV_REGION_MAP = {
  dev: {
    kor: {
      lang: '한국어(dev)',
      service: '카카오웹툰(dev)',
    },
    tha: {
      lang: 'ภาษาไทย(dev)',
      service: 'KAKAO WEBTOON(dev)',
    },
  },
  prod: {
    kor: {
      lang: '한국어(prod)',
      service: '카카오웹툰(prod)',
    },
    tha: {
      lang: 'ภาษาไทย(prod)',
      service: 'KAKAO WEBTOON(prod)',
    },
  },
};

try {
  const url = core.getInput('slack_url');

  const slack = new Slack();
  slack.setWebhook(url);
  const send = async (message) => {
    slack.webhook(
      {
        text: message,
      },
      function (err, response) {
        console.log(response);
      }
    );
  };
  send();
  core.setOutput('service', url);
} catch (error) {
  core.setFailed(error.message);
}
