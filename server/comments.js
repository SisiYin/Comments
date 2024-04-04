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

app.post("/newcomment",(req,res) => {
  const pool = openDb()
  //const { articleId } = req.params;
  const { article_id,reply_id, comment } = req.body; 
  pool.query('INSERT INTO comments (article_id, reply_id, comment) VALUES ($1,$2,$3) returning *', [article_id, reply_id, comment],
  (error,result) => {
    if (error) {
      res.status(500).json({error: error.message})
    }else{
      res.status(200).json({id: result.rows[0].id})
    }
    
  })
})

// todoRouter.post("/new", async (req,res) => {
//   try {
//     const result = await query('insert into task (description) values ($1) returning *',[req.body.description])
//     res.status(200).json({id:result.rows[0].id})
//   } catch (error) {
//     console.log(error)
//     res.statusMessage = error
//     res.status(500).json({error: error}) 
//   }
// })
// // 创建新评论
// app.post('/newcomment', async (req, res) => {
//   const pool = openDb()
//   //const { article_id } = req.params; // 修正这里的变量名
//   const { article_id, user_id, comment } = req.body;
//   try {
//       await pool.query('INSERT INTO comments (article_id, user_id, comment) VALUES ($1, $2, $3) returning *', [articleI, userId, comment]); 
//       res.status(200).json({ message: 'Comment created successfully' });
//   } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Internal Server Error' });
//   }
// });


app.listen(port);

