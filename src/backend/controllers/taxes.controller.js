import {Taxes} from "../models/taxes.model.js"

export const addTax = async (taxName, taxRate) => {
    const res = await Taxes.create({name: taxName, taxRate: taxRate});
    return res;
};

export const getTaxes = async ()=> {
    const res = await Taxes.findAll();
    return res;
}

export const removeTax = async (id) => {
    const res = await Taxes.destroy({
        where: {
            id
        }
    })

    return res;
}