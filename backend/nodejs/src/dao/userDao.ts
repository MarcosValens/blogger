import { User } from "../model/User"

export async function validate(email: string, password: string){
    const user = await User.findOne({
        where: {
            email
        },
        attributes: ["username", "email", "password"]
    });
    if (!user) {
        throw new Error("User doesn't exist");
    }
    if (!user.password) {
        return true;
    }
    if (user.password !== password) {
        throw new Error("Wrong credentials")
    }
}
