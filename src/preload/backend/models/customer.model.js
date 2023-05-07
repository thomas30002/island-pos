import {sequelize} from "../database";
import { DataTypes } from 'sequelize'

export const Customer = sequelize.define('Customer', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING,
    },
    phone: {
        type: DataTypes.STRING,
        validate: {
            min: 6,
            max: 15,
        },
        allowNull: true,
    },
    address: {
        type: DataTypes.STRING,
    },
},{timestamps: true})