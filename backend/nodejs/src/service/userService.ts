import { User } from '../model/User';

require('./../dao/userDao');

export class userService {
    public isValidate(profile): boolean {
        console.log(profile);
        return true;
    }
}



