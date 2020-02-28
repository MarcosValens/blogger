//TODO ELEGIR DE QUE MANERA QUEREMOS TRABAJAR, SIN ORM (COMENTADO), CON ORM(SIN COMENTAR)

/*import {createPool} from 'mysql2/promise';

require('../.env');
const mysqlHost: string = process.env.MYSQL_HOST;
const mysqlUser: string = process.env.MYSQL_USER;
const mysqlPassword: string = process.env.MYSQL_PASSWORD;
const mysqlUrl: string = process.env.MYSQL_URL;

export async function connect() {
    const connection = await createPool({
        host: mysqlHost,
        user: mysqlUser,
        password: mysqlPassword,
        database: mysqlUrl
    });
    return connection;
}*/

import {Sequelize} from 'sequelize-typescript';

require('../.env');
const mysqlHost: string = process.env.MYSQL_HOST;
const mysqlUser: string = process.env.MYSQL_USER;
const mysqlPassword: string = process.env.MYSQL_PASSWORD;
const mysqlUrl: string = process.env.MYSQL_URL;

const sequelize = new Sequelize({
    database: mysqlUrl,
    dialect: 'mysql',
    username: mysqlUser,
    password: mysqlPassword,
    storage: ':memory:',
    modelPaths: [__dirname + '/model']
});
