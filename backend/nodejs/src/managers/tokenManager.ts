import * as jwt from 'jsonwebtoken';

require('./../config/environment');
export default class TokenManager {

    public static generateToken(email: string): string {
        const token: string = jwt.sign({email}, process.env.JWT_SECRET, {
            expiresIn: '1h'
        })
        return token;
    }
}