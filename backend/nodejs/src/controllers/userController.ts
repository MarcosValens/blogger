import { Controller, Post, Get, Middleware } from '@overnightjs/core';
import { Request, Response } from 'express';
import {get} from './../utils';
import { User } from './../model/User';
import passport from 'passport';
import TokenManager from './../managers/tokenManager';
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
        const user: any = req.user;
        const token: string = TokenManager.generateToken(user.dataValues.email);
        res.redirect(`sendToken?token=${token}`);
    }

    @Get("sendToken")
    public sendToken(req: Request, res: Response): any {
        const token: string = req.query.token;
        res.json({token})
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
        console.log(user);
        const token = TokenManager.generateToken(user.profile.email);
        res.redirect(`${get.clientUrl()}/#/blogger?token=${token}`);
    }
}