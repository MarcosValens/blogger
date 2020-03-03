import { Controller, Post, Get, Middleware } from '@overnightjs/core';
import { Request, Response } from 'express';
import { OK, UNAUTHORIZED } from 'http-status-codes';
import passport from 'passport';
import * as userDao from './../dao/userDao';
import * as jwt from 'jsonwebtoken';

require("./../config/passport");
require('./../dao/connectionMysql');

@Controller("users")
export class UserController {

    @Post("login")
    @Middleware(passport.authenticate("local"))
    public login(req: Request, res: Response): any {
        /*
        const email: string = req.body.email;
        const password: string = req.body.password;
        userDao.validate(email, password).then(() => {
            return res.status(OK).send("Token should go here");
        }).catch ((err) => {
            res.status(UNAUTHORIZED).json({ message: err.message })
        })
        */
       res.end();

    }

    @Get('loginGoogle')
    @Middleware(passport.authenticate('google', {
        scope: ['email', 'profile']
    }))
    private async loginGoogle(req: Request, res: Response): Promise<any> {
        res.end();
    }

    @Get("loginGoogle/callback")
    @Middleware(passport.authenticate("google"))
    private async loginGoogleCallback(req: Request, res: Response): Promise<any> {
        const user: any = req.user;
        const token = user.accessToken;
        res.redirect('http://localhost:8080/#/blogger?token=' + token);
    }
}