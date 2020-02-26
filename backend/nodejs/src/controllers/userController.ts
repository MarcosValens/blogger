import { Controller, Post } from '@overnightjs/core';
import {Request, Response} from 'express';
import {OK, UNAUTHORIZED} from 'http-status-codes';
@Controller("users")
export class UserController {

    @Post("login")
    public login(req: Request, res: Response): any {
        const email: string = req.body.email;
        const password: string = req.body.password;
        if (email === "test@gmail.com" && password === "123") {
            return res.status(OK).send("Token should go here");
        } 
        return res.status(UNAUTHORIZED).json({message: "You're not allowed here!"})
    }
}