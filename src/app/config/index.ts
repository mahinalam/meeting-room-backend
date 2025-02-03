import dotenv from 'dotenv'
import path from 'path'
dotenv.config({ path: path.join(process.cwd(), '.env') })

export default {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DB_URL,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
  admin_email: 'admin@gmail.com',
  admin_pass: 'admin123456',
}
