import BloggerServer from './src/server';

const port: number = parseInt(process.env.PORT) || 3000;
const mode: string = process.env.MODE ? process.env.MODE : "development"  
const isProduction: boolean = mode === "production";

const server: BloggerServer = new BloggerServer(isProduction);

server.start(port, () => console.log(`http://localhost:${port}`))

