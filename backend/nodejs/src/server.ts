import * as bodyParser from 'body-parser';
import * as controllers from './controllers';
import passport from 'passport';
import { Server } from '@overnightjs/core';
import cors from 'cors';

export default class BloggerServer extends Server {
    constructor(mode: boolean, whitelist: Array<string>) {
        super(mode);
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));

        const options: cors.CorsOptions = {
            origin: whitelist,
            credentials: true,
            allowedHeaders: "Authorization, Origin, X-Requested-With, Content-Type, Accept",
            methods: "GET, POST, PUT, DELETE, OPTIONS",
            maxAge: 3600
        };

        this.app.use(cors(options));
        this.app.use(passport.initialize());
        this.setupControllers();
    }


    private setupControllers(): void {
        const controllerInstances = [];
        for (const name of Object.keys(controllers)) {
            const controller = (controllers as any)[name];
            if (typeof controller === 'function') {
                controllerInstances.push(new controller());
            }
        }
        super.addControllers(controllerInstances);
    }


    public start(port: number, callback: any = () => { }): void {
        this.app.listen(port, callback);
    }
}