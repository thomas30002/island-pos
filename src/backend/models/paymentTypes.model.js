import {sequelize} from "../database";
import { DataTypes } from 'sequelize'
export const PaymentType = sequelize.define('PaymentType', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false,
    }
})
