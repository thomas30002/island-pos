import { Category } from "../models/category.model";
import { Customer } from "../models/customer.model";
import { Discount } from "../models/discount.model";
import { PaymentType } from "../models/paymentTypes.model";
import { Product } from "../models/product.model";
import { Sale } from "../models/sale.model";
import { Op, fn, col } from "sequelize";
// export const getReportSalesByCategory = async () => {
//     const res = await Sale.findAll({
//         include: [{all: true}],
//     });
// };

export const getReportReciepts = async (fromDate, toDate) => {
    const res = await Sale.findAll({
        include: [{all: true}],
        where: {
            createdAt: {
                [Op.between]: [fromDate, toDate],
            }
        },
        order: [['createdAt', 'DESC']]
    });

    return res;
}

export const getReportDiscounts = async (fromDate, toDate) => {
    const res = await Sale.findAll({
        include: Discount,
        attributes: [
            'DiscountDiscountCode', 
            [fn('COUNT', col('Sale.id')), 'discounts_applied'],
            [fn('SUM', col('Sale.discountValue')), 'discount_total']
        ],
        where: {
            [Op.and] : [
                {
                    createdAt: {
                        [Op.between]: [fromDate, toDate],
                    }
                },
                {
                    DiscountDiscountCode: {
                        [Op.ne]: null
                    }
                }
            ]
        },
        group: 'DiscountDiscountCode'
    });

    return res;
}

export const getReportSalesByCustomers = async (fromDate, toDate) => {
    const res = await Sale.findAll({
        include: Customer,
        attributes: [
            'CustomerId', 
            // 'name'
            [fn('SUM', col('payableTotal')), 'total_sales']
        ],
        where: {
            [Op.and] : [
                {
                    createdAt: {
                        [Op.between]: [fromDate, toDate],
                    }
                },
                {
                    customerType: {
                        [Op.ne]: "WALKIN"
                    }
                }
            ]
        },
        group: 'CustomerId',
        order: [[fn('SUM', col('payableTotal')), 'DESC']]
    });

    return res;
}

export const getReportSalesByPaymentTypes = async (fromDate, toDate) => {
    const res = await Sale.findAll({
        include: PaymentType,
        attributes: [ 
            [fn('COUNT', col('PaymentTypeId')), 'transactions'],
            [fn('SUM', col('payableTotal')), 'amount']
        ],
        where: {
            [Op.and] : [
                {
                    createdAt: {
                        [Op.between]: [fromDate, toDate],
                    }
                },
                {
                    PaymentTypeId: {
                        [Op.ne]: null
                    }
                }
            ]
        },
        group: 'PaymentTypeId',
        order: [[fn('SUM', col('payableTotal')), 'DESC']]
    });

    return res;
}

export const getReportSalesByItem = async (fromDate, toDate) => {
    const res = await Sale.findAll({
        include: Product,
        attributes: [ 
            [col('Products.id'), 'id'],
            // [col('Products.name'), 'item']
            [fn('COUNT', col('Products.id')), 'items_sold'],
        ],
        where: {
            [Op.and] : [
                {
                    createdAt: {
                        [Op.between]: [fromDate, toDate],
                    }
                }
            ]
        },
        group: 'Products.id',
    });

    return res;
}

export const getReportSalesSummary = async (fromDate, toDate, groupby) => {
    let groupFn = "%Y-%m-%d";

    if(groupby == "MONTH") {
        groupFn = "%Y-%m"
    } else if (groupby == "YEAR") {
        groupFn = "%Y"
    } else {
        groupFn = "%Y-%m-%d"
    }

    const res = await Sale.findAll({
        include: [{all: true}],
        attributes: [ 
            [ fn('STRFTIME', groupFn, col('Sale.createdAt')) , 'date'],
            [fn('SUM', col('Sale.payableTotal')), 'gross_sales'],
            [fn('SUM', col('Sale.discountValue')), 'discount'],
            [fn('SUM', col('Sale.taxTotal')), 'tax'],
            [fn('SUM', col('Sale.cartTotal')), 'net_sales'],
        ],
        where: {
            [Op.and] : [
                {
                    createdAt: {
                        [Op.between]: [fromDate, toDate],
                    }
                }
            ]
        },
        group: [ fn('STRFTIME', groupFn, col('Sale.createdAt')) ],
        order: [[fn('DATE', col('Sale.createdAt')), 'DESC']] // groupby: DATE | MONTH | YEAR
    });

    return res;
}