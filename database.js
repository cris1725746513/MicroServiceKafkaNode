const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DB_SCHEMA || 'blackList',
                                process.env.DB_USER || 'postgres',
                                process.env.DB_PASSWORD || '0bilisam0',
                                {
                                    host: process.env.DB_HOST || 'localhost',
                                    port: process.env.DB_PORT || 5432,
                                    dialect: 'postgres',
                                    dialectOptions: {
                                        ssl: process.env.DB_SSL == "true"
                                    }
                                });
const blackList_Table = sequelize.define('blackList_Table', {
    nombreblacklist: {type: Sequelize.STRING,
        allowNull: false },
    id: {type: Sequelize.STRING,
        allowNull: false },
    status: {type: Sequelize.BOOLEAN,
        allowNull: false },
    duracion: { type: Sequelize.STRING
         },
    descripcion: { type: Sequelize.STRING,
        allowNull: false },
    uid: { allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4}
});
module.exports = {
    sequelize: sequelize,
    blackList_Table: blackList_Table
};