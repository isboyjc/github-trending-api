const axios = require('axios');
const { parse } = require('./parse')
const { baseURL } = require('./base')
const { save } = require('./save')

const instance = axios.create({
  baseURL: baseURL,
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

(async () => {
  await run('daily', 'all')
  await run('weekly', 'all')
  await run('monthly', 'all')
})();