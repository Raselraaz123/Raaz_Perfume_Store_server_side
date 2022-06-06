// add a note
const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const port = process.env.PORT || 5000;


const app = express();

// use Middleware
app.use(cors());
app.use(express.json());





const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.wilqz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});


async function run() {
  try {
    await client.connect();
    const perfumeCollection = client
      .db("raaz-perfume-store")
      .collection("perfume");
    
    await client.connect();
    const reviewCollection = client
      .db("raaz-perfume-store")
      .collection("reviews");
    
    // perfumes api

    app.get('/perfume', async (req, res) => {
      const query = {}
      const cursor = perfumeCollection.find(query);
      const perfumes = await cursor.toArray();
      res.send(perfumes)
    });
    app.get('/perfume/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const perfume = await perfumeCollection.findOne(query);
      res.send(perfume);
    });

    // reviews api

      app.get("/reviews", async (req, res) => {
        const query = {};
        const cursor = reviewCollection.find(query);
        const reviews = await cursor.toArray();
        res.send(reviews);
      });
 
    // post 
    
    app.post('/perfume', async (req, res) => {
      const newService = req.body;
      const result = await perfumeCollection.insertOne(newService);
      res.send(result);
    });
    
    // Delete item

    app.delete('/perfume/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await perfumeCollection.deleteOne(query);
      res.send(result);
    })

  }
  finally {
    
  }
}
run().catch(console.dir);









app.get('/', (req, res) => {
  res.send('perfumes server open in display')
})



app.listen(port, () => {
  console.log('perfumes server is running',port)
})