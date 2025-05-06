import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  accesToken_secret: process.env.ACCESTOKEN_SECRET,
  accesToken_secret_exparein: process.env.ACCESTOKEN_SECRET_EXPAREIN,
  refreshToken_secret: process.env.REFRESHTOKEN_SECRET,
  refreshToken_secret_exparein: process.env.REFRESHTOKEN_SECRET_EXPAREIN,
  node_prosses: process.env.NODE_PROSSES,
  port: process.env.PORT,
  cloud_name: process.env.COLUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  cors_url: process.env.CORS_URL,
};
