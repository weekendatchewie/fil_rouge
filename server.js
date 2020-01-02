const express = require('express');
const app = express();
const port = 3000;
const connection = require('./conf');

const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

/////

app.get('/examples', (req, res) => {
  connection.query('SELECT * from example', (err, results) => {
    if (err) {
      res.status(500).send('I have spoken');
    } else {
      res.json(results);
    }
  });
});

app.get('/examples/names', (req, res) => {
  connection.query('SELECT name from example', (err, results) => {
    if (err) {
      res.status(500).send('I have spoken');
    } else {
      res.json(results);
    }
  });
});

app.get('/examples/jedis', (req, res) => {
  connection.query(
    'SELECT * from example where jedi = true',
    (err, results) => {
      if (err) {
        res.status(500).send('I have spoken');
      } else {
        res.json(results);
      }
    }
  );
});

app.get('/examples/jediname', (req, res) => {
  connection.query(
    'SELECT name, birthday from example order by birthday asc',
    (err, results) => {
      if (err) {
        res.status(500).send('I have spoken');
      } else {
        res.json(results);
      }
    }
  );
});

app.get('/examples/orders', (req, res) => {
  connection.query(
    'SELECT * from example order by birthday desc',
    (err, results) => {
      if (err) {
        res.status(500).send('I have spoken');
      } else {
        res.json(results);
      }
    }
  );
});

////

app.post('/api/examples', (req, res) => {
  const exampleAdd = req.body;
  connection.query('INSERT INTO example SET ?', exampleAdd, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send('I have spoken');
    } else {
      res.sendStatus(200);
    }
  });
});

////

app.put('/api/examples/:id', (req, res) => {
  const idExample = req.params.id;
  const formData = req.body;

  connection.query(
    'UPDATE example SET ? WHERE id = ?',
    [formData, idExample],
    err => {
      if (err) {
        console.log(err);
        res.status(500).send('I have spoken');
      } else {
        res.sendStatus(200);
      }
    }
  );
});

app.put('/api/examples/jedi/:id', (req, res) => {
  const idExample = req.params.id;

  connection.query(
    'UPDATE example SET jedi = !jedi WHERE id = ?',
    [idExample],
    err => {
      if (err) {
        console.log(err);
        res.status(500).send('I have spoken');
      } else {
        res.sendStatus(200);
      }
    }
  );
});

////

app.delete('/api/examples/jedi/:id', (req, res) => {
  const idExample = req.params.id;

  connection.query('DELETE FROM example WHERE id = ?', [idExample], err => {
    if (err) {
      console.log(err);
      res.status(500).send('I have spoken');
    } else {
      res.sendStatus(200);
    }
  });
});

app.delete('/api/examples/notjedi', (req, res) => {
  const idExample = req.params.id;

  connection.query('DELETE FROM example WHERE jedi = 0', [idExample], err => {
    if (err) {
      console.log(err);
      res.status(500).send('I have spoken');
    } else {
      res.sendStatus(200);
    }
  });
});

app.listen(port, err => {
  if (err) {
    throw new Error('Something bad happened...');
  }

  console.log(`Server is listening on ${port}`);
});
