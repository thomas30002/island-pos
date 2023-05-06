import { ReceiptSetting } from "../models/receiptSetting.model.js"

const CURRENCY_SETTING_KEY = "ipos-currency";

export const getReceiptSettings = async () => {
    const res = await ReceiptSetting.findOne({
        where: {
            settingid: 1
        }
    });
    return res;
}

export const saveReceiptSettings = async ({header, footer, showCustomerInfo, showComments, logo, currency}) => {
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
            logo,
            currency
        });
    } else {
        return await ReceiptSetting.create({
            settingid: 1, 
            header, footer,
            showCustomerInfo,
            showComments,
            logo,
            currency
        });
    }

    
}



export const getCurrency = () => {
    const currency = localStorage.getItem(CURRENCY_SETTING_KEY) || "";
    return currency;
}

export const setCurrency = (currency) => {
    localStorage.setItem(CURRENCY_SETTING_KEY, currency);
}