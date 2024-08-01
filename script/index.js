const axios = require('axios');
const { parse } = require('./parse')
const { BASE_URL, DATA_BASE_URL } = require('./base')
const { save } = require('./save')

const path = require('path');
const { readFileSync } = require('fs');

const instance = axios.create({
  BASE_URL: BASE_URL,
  headers: {
    'Host': 'github.com',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36',
    'Accept': '*/*',
    'Accept-Encoding': 'gzip, deflate, br',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  }
});

async function run (since = 'daily', language = 'all') {
  let path = `/trending${language == 'all' ? '' : '/' + language}`
  if(since !== 'daily') path += `?since=${since}`

  console.log('get', path)
  const { data } = await instance.get(path);
  console.log('done', path)

  await save(parse(data), since, language)
};

function convertToSlug(str) {
  return str
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/^-|-$/g, '');
}

(async () => {
  await run('daily', 'all')
  await run('weekly', 'all')
  await run('monthly', 'all')

  let languages = readFileSync(path.resolve(__dirname, DATA_BASE_URL, 'languages.json'), 'utf8');
  languages = JSON.parse(languages);

  languages.forEach(async langObj => {
    await run('daily', convertToSlug(langObj.name))
  })
})();