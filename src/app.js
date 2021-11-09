import express from 'express';
import Handlebars from 'express-handlebars';
import { logger } from './util/logger.js';
import { defaultRouter } from './routes/default.js';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const staticFiles = resolve(__dirname, '../', 'public')


const PORT = process.env.PORT || 3000
const app = express()

app.engine('handlebars', Handlebars({extended: false}))
app.set('view engine', 'handlebars')

app.use(express.static(staticFiles))

app.use('/', defaultRouter)

app.listen(PORT, () => {
    logger.info(`App running at http://localhost:${PORT}`)
})