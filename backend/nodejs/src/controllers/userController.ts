import { Controller, Post, Get, Middleware } from '@overnightjs/core';
import {Request, Response} from 'express';
import {OK, UNAUTHORIZED} from 'http-status-codes';
import passport from 'passport';
import * as jwt from 'jsonwebtoken'
require("./../config/passport")
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

    @Get('loginGoogle')
    @Middleware(passport.authenticate('google', {
        scope: ['email']
    }))
    private async loginGoogle(req: Request, res: Response): Promise<any> {

    }

    @Get("loginGoogle/callback")
    @Middleware(passport.authenticate('google'))
    private async loginGoogleCallback(req: Request, res: Response): Promise<any> {
        const user = req.user;

        const token = jwt.sign(user, "secret", {
            expiresIn: '1d',
            subject: user + ""
        });
        res.redirect("url/callback?token="+token);
    }
}