const express = require('express');
const app = express();

app.use(express.static('public'));


const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;



//APIS:
// GET all quotes:
app.get('/api/quotes', (req, res) => {
  res.send({ quotes: quotes });
});


//POST quotes:
//POST for adding new quotes.
app.post('/api/quotes', (req, res) => {
  const newQuote = req.query.quote;
  const newPerson = req.query.person;
  if (newQuote != '' && newPerson != '') {
    quotes.push({ quote: newQuote, person: newPerson });
    res.send({ quote: { quote: newQuote, person: newPerson } });
  } else {
    res.sendStatus(400);
  }
});

//GET all quotes or all quotes from an author:
app.get('/api/quotes', (req, res) => {
  const filterQuotes = quotes.filter(author => {
    return author.person === req.query.person;
  });
  if (req.query.person) {
    res.send({ quotes: filterQuotes });
  } else {
    res.send({ quotes: quotes });
  }
});

// GET a random Quote.
app.get('/api/quotes/random', (req, res) => {
  const randomQuote = getRandomElement(quotes);
  res.send({ quote: randomQuote });
});




app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
  console.log(`http://localhost:${PORT} para acceder a la app.`);
});
