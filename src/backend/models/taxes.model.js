import {sequelize} from "../database";
import { DataTypes } from 'sequelize'

export const Taxes = sequelize.define('Taxes', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    taxRate: {
        type: DataTypes.NUMBER,
        allowNull: false
    }
}, {freezeTableName: true})