import BloggerServer from './server';
import {get} from './utils';

const port: number = parseInt(process.env.PORT) || 3000;
const server: BloggerServer = new BloggerServer(get.mode(), get.whitelist());

server.start(port, () => console.log(`http://localhost:${port}`));

