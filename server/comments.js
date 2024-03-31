// const express = require('express')
// const cors = require('cors')
// const {Pool} = require('pg')

// const app = express()
// app.use(cors())
// const port = 3001





// app.listen(port)

// index.js

const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(express.json())

const port = 3001;

const openDb = () => {
  const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'comments',
    password: '251423',
    port: 5432
  })
  return pool
}

app.get("/",(req,res) => {
  const pool = openDb()

  pool.query('select * from comments',(error,result) => {
    if (error) {
      res.status(500).json({error:error.message})
    }
    res.status(200).json(result.rows)
  })
})

app.post("/new",(req,res) => {
  const pool = openDb()
  const { star, comment } = req.body; 
  pool.query('INSERT INTO comments (star,comment) VALUES ($1,$2) returning *', [star,comment],
  (error,result) => {
    if (error) {
      res.status(500).json({error: error.message})
    }else{
      res.status(200).json({id: result.rows[0].id})
    }
    
  })
})
// const pool = new Pool({
//     user: 'postgres',
//     host: 'localhost',
//     database: 'comments',
//     password: '251423',
//     port: 5432
//   });


// get comments
// app.get('/', async (req, res) => {
//   try {
//     const { rows } = await pool.query('SELECT * FROM comments');
//     res.json(rows);
//   } catch (error) {
//     console.error('Error fetching comments:', error);
//     res.status(500).json('Error fetching comments');
//   }
// });

// // send comments
// app.post('/new', async (req, res) => {
//   // const { username, comment } = req.body;
//   try {
//     const result = await pool.query('INSERT INTO comments (username, comment) VALUES ($1, $2) returning *', [req.body.username, req.body.comment]);
//     res.status(200).json({ id: result.rows[0].id });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: error.message });
//   }
// });



app.listen(port);

