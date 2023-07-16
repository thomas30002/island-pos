import { Category } from "../models/category.model";
import { Customer } from "../models/customer.model";
import { Discount } from "../models/discount.model";
import { PaymentType } from "../models/paymentTypes.model";
import { Product } from "../models/product.model";
import { Sale } from "../models/sale.model";
import { Op, fn, col, where } from "sequelize";
// export const getReportSalesByCategory = async () => {
//     const res = await Sale.findAll({
//         include: [{all: true}],
//     });
// };

export const getReportRecieptById = async (recieptId) => {
    const res = await Sale.findAll({
        include: [{all: true}],
        where: {
            id: recieptId
        },
        limit: 1,
    });

    return res;
}

export const getReportReciepts = async (fromDate, toDate, searchValue) => {
   if (new String(searchValue).startsWith("#")) {
        const recieptId = new String(searchValue).split("#")[1];
        const res = await Sale.findAll({
            include: [{all: true}],
            where: {
                createdAt: {
                    [Op.between]: [fromDate, toDate],
                },
                id: recieptId
            },
            order: [['createdAt', 'DESC']]
        });
    
        return res;
    } 
    
    if (searchValue != "") {
        const res = await Sale.findAll({
            include: [{all: true}],
            where: {
                createdAt: {
                    [Op.between]: [fromDate, toDate],
                },
                '$Customer.name$': {
                    [Op.like]: `%${searchValue}%`
                }
            },
            order: [['createdAt', 'DESC']]
        });
    
        return res;
    }

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
            [col('Products.ProductSales.ProductId'), 'id'],
            [fn('SUM', col('Products.ProductSales.quantity')), 'items_sold']
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
        group: 'Products.ProductSales.ProductId',
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
        // include: [{all: true}],
        attributes: [ 
            [ fn('STRFTIME', groupFn, col('Sale.createdAt')) , 'date' ],
            [ fn('SUM', col('Sale.payableTotal')), 'gross_sales' ],
            [ fn('SUM', col('Sale.discountValue')), 'discount' ],
            [ fn('SUM', col('Sale.taxTotal')), 'tax' ],
            [ fn('SUM', col('Sale.cartTotal')), 'net_sales' ],
        ],
        where: {
            createdAt: {
                [Op.between]: [fromDate, toDate],
            }
        },
        group: [ fn('STRFTIME', groupFn, col('Sale.createdAt')) ],
        order: [[fn('DATE', col('Sale.createdAt')), 'DESC']] // groupby: DATE | MONTH | YEAR
    });

    return res;
}

export const getDashboardStats = async () => {

    const today = new Date()

    const todayDate = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, 0)}-${today.getDate().toString().padStart(2, 0)}`;
    const yesterdayDate = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, 0)}-${(today.getDate() - 1).toString().padStart(2, 0)}`;

    const monthDate = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, 0)}`;
    const lastMonthDate = `${today.getFullYear()}-${(today.getMonth()).toString().padStart(2, 0)}`;

    const yearDate = `${today.getFullYear()}`;
    const lastYearDate = `${today.getFullYear()-1}`;

    const todaySaleData = await Sale.findAll({
        attributes: [ 
            [fn('SUM', col('Sale.payableTotal')), 'gross_sales'],
        ],
        where: where( fn('STRFTIME', "%Y-%m-%d", col('Sale.createdAt')) , Op.eq, todayDate ),
        group: [ fn('STRFTIME', "%Y-%m-%d", col('Sale.createdAt')) ],
        limit: 1
    });

    const yesterdaySaleData = await Sale.findAll({
        attributes: [ 
            [fn('SUM', col('Sale.payableTotal')), 'gross_sales'],
        ],
        where: where( fn('STRFTIME', "%Y-%m-%d", col('Sale.createdAt')) , Op.eq, yesterdayDate ),
        group: [ fn('STRFTIME', "%Y-%m-%d", col('Sale.createdAt')) ],
        limit: 1
    });

    const monthSaleData = await Sale.findAll({
        attributes: [ 
            [fn('SUM', col('Sale.payableTotal')), 'gross_sales'],
        ],
        where: where( fn('STRFTIME', "%Y-%m", col('Sale.createdAt')) , Op.eq, monthDate ),
        group: [ fn('STRFTIME', "%Y-%m", col('Sale.createdAt')) ],
        limit: 1
    });

    const lastMonthSaleData = await Sale.findAll({
        attributes: [ 
            [fn('SUM', col('Sale.payableTotal')), 'gross_sales'],
        ],
        where: where( fn('STRFTIME', "%Y-%m", col('Sale.createdAt')) , Op.eq, lastMonthDate ),
        group: [ fn('STRFTIME', "%Y-%m", col('Sale.createdAt')) ],
        limit: 1
    });

    const yearSaleData = await Sale.findAll({
        attributes: [ 
            [fn('SUM', col('Sale.payableTotal')), 'gross_sales'],
        ],
        where: where( fn('STRFTIME', "%Y", col('Sale.createdAt')) , Op.eq, yearDate ),
        group: [ fn('STRFTIME', "%Y", col('Sale.createdAt')) ],
        limit: 1
    });

    const lastYearSaleData = await Sale.findAll({
        attributes: [ 
            [fn('SUM', col('Sale.payableTotal')), 'gross_sales'],
        ],
        where: where( fn('STRFTIME', "%Y", col('Sale.createdAt')) , Op.eq, lastYearDate ),
        group: [ fn('STRFTIME', "%Y", col('Sale.createdAt')) ],
        limit: 1
    });


    const data = {
        today: todaySaleData[0]?.dataValues?.gross_sales || 0,
        yesterday: yesterdaySaleData[0]?.dataValues?.gross_sales || 0,

        month: monthSaleData[0]?.dataValues?.gross_sales || 0,
        lastMonth: lastMonthSaleData[0]?.dataValues?.gross_sales || 0,

        year: yearSaleData[0]?.dataValues?.gross_sales || 0,
        lastYear: lastYearSaleData[0]?.dataValues?.gross_sales || 0,
    };

    return data;
}