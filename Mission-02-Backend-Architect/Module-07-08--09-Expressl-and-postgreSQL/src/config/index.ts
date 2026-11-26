import dotenv from "dotenv"
import path from "path"
dotenv.config({
  path: path.join(process.cwd(),".env")
})

const config = {
  port: process.env.PORT,
  connection_string: process.env.DB_URL as string,
  jwtToken: process.env.jwtToken as string,
  jwt_Refresh_Token: process.env.jwt_Refresh_Token as string,
};

export default config;