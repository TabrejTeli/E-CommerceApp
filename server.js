import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectdb from './config/db.js';
import authRoute from './routes/authRoute.js'
import cors from 'cors'

dotenv.config();

// database config
connectdb();

const app = express()



// middlewares
app.use(cors());
app.use(express.json())
app.use(morgan('dev'))

//routes
app.use('/api/v1/auth', authRoute)


//rest api 
app.get('/', (req, res) => {
    res.send("<h1>Wellcome To E-commere app</h1>")
})


//PORT
const PORT = process.env.PORT || 8080;

// run listen
app.listen(PORT, () => {
    console.log(`server running on mode ${process.env.DEV_MODE} on port ${PORT}`);
})