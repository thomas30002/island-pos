import { Sale, ProductSales } from "../models/sale.model";
// import { Customer } from "../models/customer.model"
// import { PaymentType } from "../models/paymentTypes.model";
// import { Product } from "../models/product.model";
// import { Discount } from "../models/discount.model";

export async function addSale(customerType, cartTotal, taxTotal, payableTotal, discountValue, isDiscountApplied, CustomerId, PaymentTypeId, DiscountId, products) {
    const sale = await Sale.create({
        customerType, cartTotal, taxTotal, payableTotal, discountValue, isDiscountApplied, CustomerId, PaymentTypeId, DiscountId
    })


    try {
        const SaleId = sale.dataValues.id;
        products.forEach(async product => {
            await ProductSales.create({
                ProductId: product.id,
                SaleId,
                quantity: product.quantity,
                price: product.price,
            });
        });
    } catch (error) {
        console.log("Error saving sale products");
        console.error(error);
    }

    return sale;
}

export async function getSales() {
    const sales = await Sale.findAll({
        // include: [Customer, Discount, Product, PaymentType]
        include: [{all: true}]
    });
    return sales;
}