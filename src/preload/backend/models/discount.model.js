import {sequelize} from "../database";
import { DataTypes } from 'sequelize'

export const Discount = sequelize.define('Discount', {
    discountCode: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
    },
    discountValue: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
    discountType: {
        type: DataTypes.ENUM,
        values: ["FIXED", "PERCENTAGE"]
    }
})