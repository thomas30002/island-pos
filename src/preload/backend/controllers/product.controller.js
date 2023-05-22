import { Product } from "../models/product.model.js"
import { Category } from "../models/category.model.js"
import { Taxes } from "../models/taxes.model.js";

export async function getProducts() {
    const res = await Product.findAll({
        order: [['createdAt', 'DESC']],
        include: [Category, Taxes]
    });
    return res;
}

export async function getProduct(id) {
    const res = await Product.findOne({
        where: {
            id
        },
        include: [Category, Taxes]
    });
    return res;
}

export async function addProduct(name, price, cost, sku, barcode, soldBy, image, CategoryId, TaxId) {
    const res = await Product.create({
        name, price, cost, sku, barcode, soldBy, image, CategoryId, TaxId
    });
    return res;
}

export async function removeProduct(id) {
    const res = await Product.destroy({
        where: {
            id
        }
    });
    return res;
}

export async function updateProduct(id, name, price, cost, sku, barcode, soldBy, image, CategoryId, TaxId) {
    const res = Product.update({
        name, price, cost, sku, barcode, soldBy, image, CategoryId, TaxId
    }, {
        where: {
            id
        }
    });
    return res;
}

export async function getCategories() {
    const res = await Category.findAll({
        order: [['name', 'ASC']]
    });
    return res;
}

export async function addCategory(name) {
    const res = await Category.create({
        name: name
    });

    return res;
}

export async function removeCategory(id) {
    const res = await Category.destroy({
        where: {
            id
        }
    })
    return res;
}