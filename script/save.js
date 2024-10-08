const moment = require('moment');
require('moment-timezone')
const path = require('path');
const { writeFileSync, readFileSync, mkdirSync } = require('fs');
const { Builder } = require('xml2js');
const { DATA_BASE_URL, TEMPLATE_BASE_URL } = require('./base')

const dateTime = moment().tz('GMT').format('ddd, DD MMM YYYY HH:mm:ss [GMT]');

async function save (data, since = 'daily', language = 'all') {
  const filePath = DATA_BASE_URL + since
  await mkdirSync(
    path.resolve(__dirname, filePath),
    { recursive: true },
    err => {
      if (err) throw err;
    }
  );

  const json = generationJson(data, since, language)
  const rss = JsonToRss(json)

  await writeFileSync(
    path.resolve(__dirname, filePath, `${language}.json`),
    JSON.stringify(json, null, 2),
    'utf-8'
  );
  await writeFileSync(
    path.resolve(__dirname, filePath, `${language}.xml`),
    rss,
    'utf-8'
  );
};

function generationJson(data, since = 'daily', language = 'all'){
  let templateContent = readFileSync(path.resolve(__dirname, TEMPLATE_BASE_URL, 'template.json'), 'utf8');
  const replacements = {
    '{{language}}': language.replace(/^./, match => match.toUpperCase()),
    '{{since}}': since.replace(/^./, match => match.toUpperCase()),
    '{{pubDate}}': dateTime
  };
  for (const [key, value] of Object.entries(replacements)) {
    templateContent = templateContent.replace(new RegExp(key, 'g'), value);
  }
  let templateJson = JSON.parse(templateContent);

  templateJson.items = data

  return templateJson
}

function JsonToRss(json){
  const rssFeed = {
    rss: {
      $: { version: "2.0" },
      channel: {
        title: json.title,
        link: json.link,
        description: json.description,
        pubDate: json.pubDate,
        item: json.items.map(item => ({
          title: item.title,
          link: item.url,
          description: item.description,
          // pubDate: json.pubDate,
          guid: item.url,
          language: item.language,
          languageColor: item.languageColor,
          stars: item.stars,
          forks: item.forks,
          addStars: item.addStars,
          contributors: {
            contributor: item.contributors.map(contributor => ({
              avatar: contributor.avatar,
              name: contributor.name,
              url: contributor.url
            }))
          }
        }))
      }
    }
  };

  const builder = new Builder({ headless: true });
  return builder.buildObject(rssFeed);
}

module.exports = {
  save
}