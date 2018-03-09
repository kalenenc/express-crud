const express = require('express');
const bodyParser= require('body-parser') //allows us to parse our post request body content
const app = express();
const MongoClient = require('mongodb').MongoClient;

app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.set('view engine', 'ejs');

var db;

MongoClient.connect('mongodb-link-here', (err, client) => {
  if (err) return console.log(err)
  db = client.db('some-good-quotes'); //name of your database
  app.listen(3000, () => {
    console.log('listening on 3000');
  })
})


app.get('/', (req, res) => {

  db.collection('quotes').find().toArray((err, result) => {
    if (err) return console.log(err)
    // renders index.ejs
    res.render('index.ejs', {quotes: result});
    console.log(result);
  })

})


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

app.put('/quotes', (req, res) => {

  db.collection('quotes')
  .findOneAndUpdate({name: 'kalene'}, {
    $set: {
      name: req.body.name,
      quote: req.body.quote
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })

})

app.delete('/quotes', (req, res) => {
  db.collection('quotes').findOneAndDelete({name: req.body.name},
  (err, result) => {
    if (err) return res.send(500, err)
    console.log('-------- Message deleted -------')
    res.send(result)
  })
})
