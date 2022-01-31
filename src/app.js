import 'dotenv/config';
import express from 'express';
import Handlebars from 'express-handlebars';
import { logger } from './util/logger.js';
import { defaultRouter } from './routes/default.js';
import { adminRouter } from './routes/admin.js';
import { spotRouter } from './routes/spotify.js';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import mongoose from 'mongoose';
import fs from 'fs';
import https from 'https';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const __dirname = dirname(fileURLToPath(import.meta.url));
const staticFiles = resolve(__dirname, '../', 'public')

const privateKey = fs.readFileSync('/etc/letsencrypt/live/sanchezzjf.tk/privkey.pem', 'utf-8')
const ca = fs.readFileSync('/etc/letsencrypt/live/sanchezzjf.tk/chain.pem', 'utf-8')
const cert = fs.readFileSync('/etc/letsencrypt/live/sanchezzjf.tk/cert.pem', 'utf-8')

const cred = {
    key: privateKey,
    cert: cert,
    ca: ca
}

const PORT = process.env.PORT || 443
const app = express()

const DB = 'Site'

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cors())
app.use(cookieParser())

app.engine('handlebars', Handlebars({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

app.use(express.static(staticFiles))

app.use('/', defaultRouter)
app.use('/admin', adminRouter)
app.use('/spotify', spotRouter)

const server = https.createServer(cred, app)

const startServer = () => {
    const { address, port } = server.address()
    const protocol = 'https'
    logger.info(`App started at ${protocol}://${address}:${port}`)
    connectDB(DB)
}

const connectDB = (db) => {
    mongoose.Promise = global.Promise
    mongoose.connect(`mongodb://localhost:27017/${db}`)
    .then(logger.info(`Connected to DB(${db}) with success`)).catch((err) => logger.error(`Couldn't connect: ${err}`))
}

server.listen(PORT, startServer)
