import mongoose from 'mongoose'
const { connect, connection } = mongoose

const uri = process.env.DB_CONNECT

const db = connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

connection.on('connected', () => {
  console.log('Database connection successful')
})

connection.on('err', (err) => {
  console.log(`Connection error: ${err.message}`)
})

connection.on('disconnected', () => {
  console.log('Disconnected from database')
})

process.on('SIGINT', async () => {
  connection.close()
  console.log('Connection db closed')
  process.exit(1)
})

export default db
