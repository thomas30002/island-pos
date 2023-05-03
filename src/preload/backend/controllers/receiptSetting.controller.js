import { ReceiptSetting } from "../models/receiptSetting.model.js"

export const getReceiptSettings = async () => {
    const res = await ReceiptSetting.findOne({
        where: {
            id: 1
        }
    })
    return res;
}

export const saveReceiptSettings = async ({header, footer, showCustomerInfo, showComments, logo}) => {
    const res = await ReceiptSetting.create({
        id: 1, 
        header, footer,
        showCustomerInfo,
        showComments,
        logo
    })
    return res;
}