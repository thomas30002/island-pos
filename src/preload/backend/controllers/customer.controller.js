import { Customer } from "../models/customer.model"

export async function getCustomers() {
    const res = await Customer.findAll({
        order: [['createdAt', 'DESC']]
    });
    return res;
}

export async function getCustomer(id) {
    const res = await Customer.findOne({
        where: {
            id
        }
    });
    return res;
}

export async function addCustomer(name, email, phone, address) {
    const res = await Customer.create({
        name, email, phone, address
    })

    return res;
}

export async function updateCustomer(id, name, email, phone, address) {
    const res = await Customer.update({
        name, email, phone, address
    }, {where: {
        id
    }});

    return res;
}

export async function removeCustomer(id) {
    const res = await Customer.destroy({
        where: {
            id
        }
    });
    return res;
}

