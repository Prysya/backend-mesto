const express = require('express');
const { PORT = 3000, BASE_PATH } = process.env;
const path = require('path');

const app = express();

app.listen(PORT, () => {
  console.log(`Слушаю порт ${PORT}`);
})

app.use(express.static(path.join(__dirname, 'public')));