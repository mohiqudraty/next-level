import { app } from "./app";
import config from "./config";
import { pool } from "./config/db";

const PORT = process.env.PORT || 8000;


const startServer = async() => {
  try {
   
    const time = await pool.query(`SELECT NOW()`)
    console.log(time.rows[0].now);
    

  app.listen(config.port, () => {
    console.log("Server is running....on PORT: ",config.port);
  });
 } catch (error) {
  console.log("Server connection Failed!!!", error);
 }
}
startServer()