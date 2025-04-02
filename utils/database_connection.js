import { Sequelize } from "sequelize";

const sequelize = new Sequelize('incidentes', 'root', '1234',{
    host: 'localhost',
    dialect: 'mysql',
    timezone: '-07:00', // UTC-7
    dialectOptions: {
        dateStrings: true,
        typeCast: true,
    },

    port: 3306,
});

export { sequelize };