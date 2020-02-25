import * as bodyParser from 'body-parser';
import { Server } from '@overnightjs/core';
import cors from 'cors';

export default class BloggerServer extends Server {
    constructor(mode?: boolean) {
        super(mode);
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: true}));
        
        const whitelist: Array<string> = ["http://localhost:8080"];
        const options: cors.CorsOptions = {
            origin: whitelist,
            credentials: true,
            allowedHeaders: "Authorization, Origin, X-Requested-With, Content-Type, Accept",
            methods: "GET, POST, PUT, DELETE, OPTIONS",
            maxAge: 3600
        };

        this.app.use(cors(options));
        this.setupControllers();
    }


    private setupControllers(): void {
        // TODO: Implement me
    }


    public start(port: number, callback: any = () => {}): void {
        this.app.listen(port, callback);
    }
}