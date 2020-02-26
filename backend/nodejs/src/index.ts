import BloggerServer from './server';
import dotenv from 'dotenv';

dotenv.config();


const port: number = parseInt(process.env.PORT) || 3000;
const mode: string = process.env.MODE ? process.env.MODE : "development";
const isProduction: boolean = mode === "production";

const whitelist: string = isProduction ? process.env.WHITELIST_PRODUCTION : process.env.WHITELIST_DEVELOPMENT;

const server: BloggerServer = new BloggerServer(isProduction, whitelist.split(" "));

server.start(port, () => console.log(`http://localhost:${port}`));

