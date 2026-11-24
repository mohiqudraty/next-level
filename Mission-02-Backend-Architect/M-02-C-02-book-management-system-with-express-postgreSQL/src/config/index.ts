import dotenv from "dotenv"
import path from "path"

dotenv.config({path: path.join(process.cwd(),".env")})

  const config = {
    port: process.env.PORT,
    nodeENV: process.env.NODE_ENV,
    connection_string: process.env.DATABASE_URL,
    jwt_secret: process.env.JWT_SECRET
}
  
export default config;