import {connect} from './connectionMysql'
import {Request, Response} from 'express'
import {OK, BAD_REQUEST} from 'http-status-codes'

export async function validate(req: Request, res: Response): Promise<Response> {
    const userMail = req.params.email;
    const userPassword = req.params.password;
    const conn = await connect();
    const users = await conn.query('SELECT * FROM user WHERE email = ? AND password = ?', [userMail, userPassword]);
    if (users[0] !== null) {
        return res.status(OK).json({
            message: "User Validated"
        })
    } else {
        return res.status(BAD_REQUEST).json({
            message: "User mail or password incorrect"
        })
    }
}
