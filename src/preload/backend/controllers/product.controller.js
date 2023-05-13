import { Product } from "../models/product.model.js"
import { Category } from "../models/category.model.js"

export async function getProducts() {
    const res = await Product.findAll({
        order: [['createdAt', 'DESC']],
        include: Category
    });
    return res;
}

export async function getProduct(id) {
    const res = await Product.findOne({
        where: {
            id
        }
    });
    return res;
}

export async function addProduct(name, price, cost, sku, barcode, soldby, image, categoryId) {
    const res = await Product.create({
        name, price, cost, sku, barcode, soldby, image, categoryId
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