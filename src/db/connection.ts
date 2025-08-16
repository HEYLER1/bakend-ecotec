import { Sequelize } from "sequelize";


const sequelize = new Sequelize('login', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',   
});

export default sequelize;