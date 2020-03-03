//import { connect } from './connectionMysql'
import { User } from "../model/User"

export async function validate(email: string, password: string)/*: Promise<Response>*/ {
    //TODO ELEGIR DE QUE MANERA QUEREMOS TRABAJAR, CON ORM (PRIMER EJEMPLO) O CON SIN EL (COMENTADO)
    const user = await User.findOne({
        where: {
            email,
            password
        }
    });
    console.log(user);
    return user;
    
    //SIN ORM


    /*const conn = await connect();
    const query = 'SELECT * FROM user WHERE email = ?';
    const userFound: any = await conn.query(query, [email]);
    if (!userFound) {
        return null;
    }

    if (!userFound.password) {
        return userFound;
    }
    return userFound.password === password ? userFound : null;*/

}
