import app from '../app.js'
import db from '../lib/db.js'
import fs from 'fs/promises'

const PORT = process.env.PORT || 3000

db.then(() => {
  app.listen(PORT, async () => {
    await fs.mkdir(process.env.TMP_DIR, { recursive: true })
    console.log(`Server running. Use our API on port: ${PORT}`)
  })
}).catch((err) => {
  console.log(`Server not running. Error: ${err.message}`)
})
