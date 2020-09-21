const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// health checker
app.all('/', (req, res, next) => {
  res.json({
    status: 200,
    msg: 'OK',
  });
});

app.listen(port, () => {
  console.log('server started');
});
