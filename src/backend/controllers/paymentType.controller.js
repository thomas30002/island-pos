import {PaymentType} from "../models/paymentTypes.model.js"

export const addPaymentType = async (paymentType) => {
    const res = await PaymentType.create({name: paymentType});
    return res;
}

export const getPaymentTypes = async () => {
    const res = await PaymentType.findAll({});
    return res;
}

export const removePaymentType = async (id) => {
    const res = await PaymentType.destroy({
        where: {
            id: id
        }
    });
    return res;
}