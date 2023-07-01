import { Customer } from "../models/customer.model";
import { Discount } from "../models/discount.model";
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