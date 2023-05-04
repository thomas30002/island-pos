import { ReceiptSetting } from "../models/receiptSetting.model.js"

export const getReceiptSettings = async () => {
    const res = await ReceiptSetting.findOne({
        where: {
            settingid: 1
        }
    });
    return res;
}

export const saveReceiptSettings = async ({header, footer, showCustomerInfo, showComments, logo}) => {
    const settings = await ReceiptSetting.findOne({
        where: {
            settingid: 1
        }
    })

    if(settings != null && settings != undefined) {
        return await settings.update({
            header, footer,
            showCustomerInfo,
            showComments,
            logo
        });
    } else {
        return await ReceiptSetting.create({
            settingid: 1, 
            header, footer,
            showCustomerInfo,
            showComments,
            logo
        });
    }

    
}