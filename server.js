const express = require('express');
const bodyParser= require('body-parser') //allows us to parse our post request body content
const app = express();
const MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb://kalene:password@ds123752.mlab.com:23752/some-good-quotes', (err, database) => {
  //.. start the server
})


var db

// this is so that we are only listening to requests if the connection to the databas is open (when we're connected to the database)
MongoClient.connect('mongodb://kalene:password@ds123752.mlab.com:23752/some-good-quotes', (err, client) => {
  if (err) return console.log(err)
  db = client.db('some-good-quotes') //name of your database
  app.listen(3000, () => {
    console.log('listening on 3000');
  })
})

// app.get('/', (req, res) => {
//   res.send('Hello world');
// })
// Note: request and response are usually written as req and res respectively.


app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
  console.log(__dirname);
  // Note: __dirname is directory that contains the JavaScript source code. Try logging it and see what you get!
  // Mine was '/Users/zellwk/Projects/demo-repos/crud-express-mongo' for this app.
})

// app.post('/quotes', (req, res) => {
//   console.log(req.body);
// })

// Mongodb is different from relational databases. Instead of storing data in tables that have relationships, it stores them in collections made out of individual documents.

//Documents are analogues to JSON objects, but are stored in a more type-rich format known as BSON (combination of binary and JSON)

// We use the collection function to create a collection called quotes, and then we save it to the db and then redirected back to the home page '/'
app.post('/quotes', (req, res) => {
  db.collection('quotes').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to the database!')
    res.redirect('/')
  })
})
