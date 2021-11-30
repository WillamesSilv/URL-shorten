import express, { Response, Request } from 'express';
import { UrlController } from './controllers/UrlController';
import { MongoConnection } from './database/MongoConnection';

const port = 3000

const api = express()
api.use(express.json())

const database = new MongoConnection()
database.connect()

const urlController = new UrlController()
api.post('/shorten', urlController.shorten)
api.get('/:hash', urlController.redirect)

api.listen(port, () => {
    console.log(`Server runing in http://localhost:${port}`)
})