import {Discount} from "../models/discount.model.js"

export const addDiscount = async (discountCode,discountValue,discountType) => {
    const res = await Discount.create({discountCode,discountValue,discountType});
    return res;
}

export const getDiscounts = async () => {
    const res = await Discount.findAll({});
    return res;
}

export const removeDiscount = async (discountCode) => {
    const res = await Discount.destroy({
        where: {
            discountCode
        }
    });
    return res;
}