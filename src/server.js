import express from 'express';
import dotenv from 'dotenv'
import {dbConnection} from "./db/connection.js";
import userRoutes from "./routes/user.routes.js";
import courseRoutes from "./routes/course.routes.js";

dotenv.config()

const app = express();
const {PORT} = process.env

app.use(express.json())
app.use((req, res, next) => {
    // logger
    const {method, url, body, params, query} = req;
    console.log('-----------------------------------------')
    console.log({method, url, body, params, query});
    next();
})
app.use('/api/user', userRoutes)
app.use('/api/course', courseRoutes)


dbConnection().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on ${PORT}`);
    })
})
