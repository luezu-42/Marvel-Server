const express = require('express');

const PORT = process.env.PORT || 5000;
const app = express();

app.get('/', (req, res) => res.send({ hello: 'World' }));

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('server on');
});
