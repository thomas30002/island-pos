import {sequelize} from "../database";
import { DataTypes } from 'sequelize'

export const DiningOption = sequelize.define('DiningOption', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
})