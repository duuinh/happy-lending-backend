import express, { Application } from 'express'
import dotenv from "dotenv"
import { itemRouter } from './routes/items.route'
import { locationRouter } from './routes/locations.route'
import { contractRouter } from './routes/contracts.routes'
import { userRouter } from './routes/users.route'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import cors from 'cors'
import http from "http"

const app: Application = express()
const PORT = process.env.SERVER_PORT || 8000
const server = http.createServer(app);

// initialize configuration
dotenv.config();

mongoose.connect(`${process.env.MONGODB_SRV}`, {
    useCreateIndex: true,
    useNewUrlParser: true, 
    useUnifiedTopology: true
}).then( () => {
      console.log("[success] connected to the database ");
    },
    error => {
      console.log("[failed] " + error);
      process.exit();
    }
)

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())

// add routes
app.use('/api', itemRouter)
app.use('/api', locationRouter)
app.use('/api', contractRouter)
app.use('/api', userRouter)

server.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
  });

