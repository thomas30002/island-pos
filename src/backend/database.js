import { Sequelize } from 'sequelize'

export const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./ipos.db"
})
sequelize.sync().then(e=>console.log(e)).catch(e=>console.log(e));
