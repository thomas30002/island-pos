import { sequelize } from "../database";
import { DataTypes } from 'sequelize'

import { Customer } from "./customer.model"
import { PaymentType } from "./paymentTypes.model";
import { Product } from "./product.model";
import { Discount } from "./discount.model";

// fields: id, customerType, customerId, paymentTypeId, datetime, items, cartTotal, taxTotal, payableTotal, isDiscountApplied, discountCode, discountValue, 

export const Sale = sequelize.define('Sale', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    customerType: {
        type: DataTypes.ENUM,
        values: ['WALKIN', 'CUSTOMER'],
        defaultValue: 'WALKIN'
    },
    cartTotal: {
        type: DataTypes.NUMBER
    },
    taxTotal: {
        type: DataTypes.NUMBER
    },
    discountValue: {
        type: DataTypes.NUMBER
    },
    payableTotal: {
        type: DataTypes.NUMBER
    },
    isDiscountApplied: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
}, {timestamps: true});

Customer.hasMany(Sale);
Sale.belongsTo(Customer);

PaymentType.hasMany(Sale);
Sale.belongsTo(PaymentType);

Discount.hasMany(Sale);
Sale.belongsTo(Discount);



export const ProductSales = sequelize.define('ProductSales', {
    ProductId: {
        type: DataTypes.INTEGER,
        references: {
            model: Product,
            key: "id"
        }
    },
    SaleId: {
        type: DataTypes.INTEGER,
        references: {
            model: Sale,
            key: "id"
        }
    },
    quantity: {
        type: DataTypes.INTEGER,
    },
    price: {
        type: DataTypes.NUMBER
    },
})

Product.belongsToMany(Sale, { through: ProductSales });
Sale.belongsToMany(Product, { through: ProductSales });