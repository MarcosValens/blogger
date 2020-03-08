import { User } from '../model/User';

export class UserService {
    public async isValidate(email:string, given_name:string, family_name:string) {
        if (!family_name) {
            family_name = null;
        }
        const user = await User.findOrCreate({
            where: {
                email: email,
                name: given_name,
                surname: family_name
            }
        });
        return user;
    }
}



