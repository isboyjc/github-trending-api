/*
 * @LastEditTime: 2024-08-02 18:04:36
 * @Description: ...
 * @Date: 2024-08-01 22:16:50
 * @Author: isboyjc
 * @LastEditors: isboyjc
 */
const axios = require('axios');
const { parse } = require('./parse')
const { BASE_URL, DATA_BASE_URL } = require('./base')
const { save } = require('./save')

const path = require('path');
const { readFileSync } = require('fs');

const instance = axios.create({
  baseURL: BASE_URL,
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
  let reqPath = `/trending${language == 'all' ? '' : ('/' + language)}`
  if(since !== 'daily') reqPath += `?since=${since}`

  console.log('get', reqPath)
  const { data } = await instance.get(reqPath);
  console.log('done', reqPath)

  await save(parse(data), since, language)
};

function convertToSlug(str) {
  return str
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/^-|-$/g, '');
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

(async () => {
  try {
    await run('daily', 'all')
    await run('weekly', 'all')
    await run('monthly', 'all')
  } catch (error) {
    console.error('Error language all:', error);
  }

  let languages = readFileSync(path.resolve(__dirname, DATA_BASE_URL, 'languages.json'), 'utf8');
  languages = JSON.parse(languages);

  console.log("Number of languages: ", languages.length)

  // for(const langObj of languages){
  //   try {
  //     await delay(5 * 60)
  //     await run('daily', convertToSlug(langObj.name))
  //     await run('weekly', convertToSlug(langObj.name))
  //     await run('monthly', convertToSlug(langObj.name))
  //   } catch (error) {
  //     console.error(`Error language ${convertToSlug(langObj.name)}:`, error);
  //   }
  // }
})();