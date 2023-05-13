import {sequelize} from "../database";
import { DataTypes } from 'sequelize'
import { Category } from "./category.model";

export const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING
    },
    price: {
        type: DataTypes.NUMBER,
    },
    cost: {
        type: DataTypes.NUMBER,
    },
    sku: {
        type: DataTypes.STRING,
    },
    barcode: {
        type: DataTypes.STRING,
    },
    soldBy: {
        type: DataTypes.ENUM,
        values: ["each", "weight"],
        defaultValue: 'each'
    },
    image: {
        type: DataTypes.TEXT
    }
}, {timestamps: true})

Category.hasMany(Product);
Product.belongsTo(Category);