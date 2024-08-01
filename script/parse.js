const cheerio = require('cheerio');
const { BASE_URL } = require('./base')

function parse(data){
  const $ = cheerio.load(data);

  const arr = [];

  $('.Box-row').each((i, elm) => {
    const title = $(elm).find('h2').text().replace(/\s/g, '')
    const url = $(elm).find('h2 a').attr('href')
    const description = $(elm).find('p').text().replace(/\n/g, '').trim()
    const languageColor = $(elm).find('.repo-language-color').css('background-color') || ''
    const language = $(elm).find('[itemprop="programmingLanguage"]').text() || ''
    const stars = $(elm).find(`a[href=${url + '/stargazers'}]`).text().replace(/\n/g, '').trim()
    const forks = $(elm).find(`a[href=${url + '/forks'}]`).text().replace(/\n/g, '').trim()
    const addStars = $(elm).find('span').last().text().match(/\d+/g)[0]
    const contributors = $(elm).find(`a[data-hovercard-type="user"] .avatar.avatar-user`).map((_ ,user) => {
      const name = $(user).attr('alt').replace(/^@/, '')
      // const url = BASE_URL + $(user).attr('href')
      const url = `${BASE_URL}/${name}`
      // console.log(url)
      return {
        avatar: $(user).attr('src'),
        name,
        url
      }
    }).get();
    const item = {
      title,
      url: BASE_URL + url,
      description,
      language,
      languageColor,
      stars,
      forks,
      addStars,
      contributors
    };
    arr.push(item);
  });

  return arr;
}

module.exports = {
  parse
}