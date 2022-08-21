const express = require('express')
const app = express();
const port = 8081

app.get('/api/test', (req, res) => {
  res.send(JSON.stringify({text: 'Hello world'}))
})

app.post('/api/test', (req, res) => {
  console.log(req)
  res.send('Hello World!')
})

app.use(express.static('src'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})