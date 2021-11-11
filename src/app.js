import express from 'express';
import Handlebars from 'express-handlebars';
import { logger } from './util/logger.js';
import { defaultRouter } from './routes/default.js';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import fs from 'fs';
import https from 'https';

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

app.engine('handlebars', Handlebars({extended: false}))
app.set('view engine', 'handlebars')

app.use(express.static(staticFiles))

app.use('/', defaultRouter)

const server = https.createServer(cred, app)

const startServer = () => {
    const { address, port } = server.address()
    const protocol = 'https'
    logger.info(`App started at ${protocol}://${address}:${port}`)
}

server.listen(PORT, startServer)
