const core = require('@actions/core');
const github = require('@actions/github');

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
  const region = core.getInput('slack_url');

  // const { lang, service } = ENV_REGION_MAP[env][region];

  // console.log(JSON.stringify(github));

  const data = JSON.stringify({
    data: 'hello',
  });

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
    body: {
      payload: JSON.stringify({
        text: 'Hello, World!',
      }),
    },
  };
  const req = http.request(region, options, (res) => {
    console.log(res.body);
  });

  req.end(data);

  console.log(region);
  core.setOutput('service', region);
} catch (error) {
  core.setFailed(error.message);
}
