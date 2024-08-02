const fs = require('fs-extra');
const path = require('path');

const src = path.join(__dirname, '../data');
const dest = path.join(__dirname, '../docs/.vitepress/dist', 'data');

fs.copy(src, dest)
  .then(() => console.log('Data folder copied successfully!'))
  .catch(err => console.error('Error copying data folder:', err));