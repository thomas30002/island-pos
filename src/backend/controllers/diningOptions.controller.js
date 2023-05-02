import {DiningOption} from "../models/diningOption.model.js"

export const addDiningOption = async (optionName) => {
    const res = await DiningOption.create({name: optionName});
    return res;
};

export const getDiningOptions = async ()=> {
    const res = await DiningOption.findAll();
    return res;
}

export const removeDiningOption = async (id) => {
    const res = await DiningOption.destroy({
        where: {
            id
        }
    })

    return res;
}