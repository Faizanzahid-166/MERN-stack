
import dotenv from 'dotenv';
import connectDB from './database/dbconnection.js';
import {server} from './server.js'

dotenv.config({
    path: './.env'
});
connectDB()
.then(() => {
  server.listen(process.env.PORT || 4000, () => {
    console.log(`port is running at ${process.env.PORT}`);
    
  })
})
.catch((error) => {
    console.log("connection failed !!!",error)
})