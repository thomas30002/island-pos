import {sequelize} from "../database";
import { DataTypes } from 'sequelize'

export const ReceiptSetting = sequelize.define('ReceiptSetting', {
    settingid: {
        type: DataTypes.INTEGER
    },
    header: {
        type: DataTypes.TEXT,
    },
    footer: {
        type: DataTypes.TEXT,
    },
    logo: {
        type: DataTypes.TEXT,
    },
    showCustomerInfo: {
        type: DataTypes.BOOLEAN
    },
    showComments: {
        type: DataTypes.BOOLEAN
    },
    currency: {
        type: DataTypes.STRING
    }
})