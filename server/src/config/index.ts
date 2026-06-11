import dotenv from "dotenv"
import path from "path"


dotenv.config({
    path: path.join(process.cwd(), ".env")
})

const config = {
    port: process.env.PORT || 5000,

    secret: process.env.JWT_SECRET,

    dbHost: process.env.DB_HOST,
    dbPort: Number(process.env.DB_PORT) || 5432,
    dbName: process.env.DB_NAME,
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,


    publicKey: process.env.IMAGEKIT_PUBLIC_KEY as string,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT as string,

    apiKey: process.env.GEMINI_API_KEY 
}

export default config;