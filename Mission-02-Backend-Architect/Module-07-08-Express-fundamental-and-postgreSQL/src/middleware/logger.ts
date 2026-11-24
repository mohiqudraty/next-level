import type { NextFunction, Request, Response } from "express";
import fs from 'fs';


//logger  middleware ------
const logger = async(req:Request, res: Response, next: NextFunction) => {
  // console.log("Method -> URL -> Time:", req.method, req.url, Date.now());
  const log = `Method: ${req.method} , URL: ${req.url} , ${Date.now()}\n\n`
  fs.appendFile("logger.txt", log, (err) => {
    console.error(err);
  }
  )
  next()
}


export default logger;