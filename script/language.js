const axios = require('axios');
const path = require('path');
const { writeFileSync } = require('fs');
const { BASE_API_URL, DATA_BASE_URL } = require("./base.js")

async function generationLanguages() {
  try {
    const response = await axios.get(`${BASE_API_URL}/languages`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json'
      }
    });

    const languages = response.data;
    console.log("Number of languages: ", languages.length)

    const filePath = DATA_BASE_URL
    await writeFileSync(
      path.resolve(__dirname, filePath, `languages.json`),
      JSON.stringify(languages, null, 2),
      'utf-8'
    );
  } catch (error) {
    console.error('Error fetching languages:', error.message);
  }
}

generationLanguages();