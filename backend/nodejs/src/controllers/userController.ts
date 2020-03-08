import { Controller, Post, Get, Middleware } from '@overnightjs/core';
import { Request, Response } from 'express';
import {get} from './../utils';
import { User } from './../model/User';
import passport from 'passport';
import TokenManager from './../managers/tokenManager';
import { UserService } from './../service/userService';

require("./../config/passport");
require('./../dao/connectionMysql');
const userService: UserService = new UserService();
@Controller("users")
export class UserController {

    @Post("login")
    @Middleware(passport.authenticate("local"))
    public login(req: Request, res: Response): any {
        const user: any = req.user;
        const token: string = TokenManager.generateToken(user.dataValues.email);
        res.json({token});
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
        await userService.isValidate(user.profile.email, user.profile.given_name, user.profile.family_name);
        const token = TokenManager.generateToken(user.profile.email);
        res.redirect(`${get.clientUrl()}/#/blogger?token=${token}`);
    }
}