const path = require('path');
const moment = require('moment');
const { writeFileSync, readFileSync, mkdirSync } = require('fs');
const { fileBaseURL, templateBaseURL } = require('./base')

const dateTime = moment().format('MMMM Do YYYY, h:mm:ss a');

async function saveToJSON (data, since = 'daily', language = 'all') {
  const filePath = fileBaseURL + since
  await mkdirSync(
    path.resolve(__dirname, filePath),
    { recursive: true },
    err => {
      if (err) throw err;
    }
  );

  let templateContent = readFileSync(path.resolve(__dirname, templateBaseURL, 'template.json'), 'utf8');
  const replacements = {
    '{{language}}': language.replace(/^./, match => match.toUpperCase()),
    '{{since}}': since.replace(/^./, match => match.toUpperCase()),
    '{{updateTime}}': dateTime
  };
  for (const [key, value] of Object.entries(replacements)) {
    templateContent = templateContent.replace(new RegExp(key, 'g'), value);
  }
  let templateJson = JSON.parse(templateContent);
  // console.log(templateJson)

  templateJson.data = data

  await writeFileSync(
    path.resolve(__dirname, filePath, `${language}.json`),
    JSON.stringify(templateJson, null, 2),
    'utf-8'
  );
};

module.exports = {
  saveToJSON
}