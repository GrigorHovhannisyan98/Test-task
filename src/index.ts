import * as dotenv from 'dotenv'
import express from "express"
import router from './router/router';
import {Apierror} from "./middlewares/apierrors";
import bodyParser from "body-parser";
dotenv.config({path: './src/example.env'})
import db from "./dbConfig/db.config";
const app = express();

app.use(bodyParser())
app.use(express.static("client"))
app.use(express.json());
app.use('/api', router)
app.use(Apierror)

const startServer = async () => {
    try {
       await db.sync({alter:false})
        app.listen(process.env.PORT, () => {
            console.log(`server run port ${process.env.PORT}`)
        })
    } catch (e) {
        console.log(e)
    }
}
startServer()