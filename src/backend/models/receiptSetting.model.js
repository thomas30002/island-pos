import {sequelize} from "../database";
import { DataTypes } from 'sequelize'

export const ReceiptSetting = sequelize.define('ReceiptSetting', {
    header: {
        type: DataTypes.TEXT,
    },
    footer: {
        type: DataTypes.TEXT,
    },
    logo: {
        type: DataTypes.BLOB
    },
    showCustomerInfo: {
        type: DataTypes.BOOLEAN
    },
    showComments: {
        type: DataTypes.BOOLEAN
    }
})