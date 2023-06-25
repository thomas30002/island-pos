import { Sale } from "../models/sale.model";
import { Op } from "sequelize";
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