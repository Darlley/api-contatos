import express from 'express'
import env from './env'
import ContactRoutes from './routes/contact.route'

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/contatos', ContactRoutes);

app.listen(env.APP_PORT, () => {
  console.log(`Server is running on ${env.APP_URL}:${env.APP_PORT}`)
})