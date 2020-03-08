import {Sequelize} from 'sequelize-typescript';
import {User} from '../model/User';

require('./../config/environment');
const mysqlHost: string = process.env.MYSQL_HOST;
const mysqlUser: string = process.env.MYSQL_USER;
const mysqlPassword: string = process.env.MYSQL_PASSWORD;
const mysqlUrl: string = process.env.MYSQL_URL;
(async () => {
    const sequelize = new Sequelize(`mysql://${mysqlUser}:${mysqlPassword}@${mysqlHost}/${mysqlUrl}`, {
        define: {
            timestamps: false
        }
    });
    sequelize.addModels([User]);
    await sequelize.sync();
    await sequelize.authenticate();
})();


