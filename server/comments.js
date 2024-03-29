const express = require('express')
const cors = require('cors')
const {Pool} = require('pg')

const app = express()
app.use(cors())
const port = 3001

app.get("/",(req,res) => {
  const pool = openDb()

  pool.query('select * from comments',(error,result) => {
    if (error) {
      res.status(500).json({error:error.message})
    }
    res.status(200).json(result.rows)
  })
})

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

app.listen(port)