const express = require('express');
const cors = require('cors');
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

// use Middleware
app.use(cors());
app.use(express.json());

const users = [
   {id:1 ,name:'Rasel',roll:33,Phone:555555555},
   {id:2 ,name:'Roman',roll:337,Phone:55555554524355}
 ]


app.get('/', (req, res) => {
  res.send('perfumes server open in display')
})

app.get('/users', (req, res) => {
  res.send(users)
  
})


app.listen(port, () => {
  console.log('perfumes server is running',port)
})