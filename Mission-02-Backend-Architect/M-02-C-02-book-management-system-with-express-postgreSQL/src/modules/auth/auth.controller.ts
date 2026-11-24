import { NextFunction, Request, Response } from "express";
import { passHelper } from "../../utils/passwordHelper";
import { pool } from "../../config/db";
const register = async (req : Request, res: Response, next: NextFunction ) => {
  try {
    const { name, email, password, role } = req.body;
    
   
    const hashPassword = passHelper.hashPassword(password)

    const result = await pool.query(`
      INSERT INTO users (name, email, hashPassword, role) VALUES($1 , $2, $3, $4)
      `, [name, email, hashPassword, role])
    res.send({
      message: 'User Registared',
      data: result
})

  } catch (error) {
    
  }
}