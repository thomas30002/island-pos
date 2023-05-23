import { TAX_TYPES } from "../config/taxType.config";

/**
 * @param {number} price - product price
 * @param {number} taxRate - tax rate percentage
 * @param {string} taxType - INCLUSIVE or EXCLUSIVE or null
 * @description calculates the final price after Tax Calculation
 * @returns {number}
 *  */ 
export function calculatePriceAfterTax(
    price,
    taxRate,
    taxType
) {
    const priceAfterTax = taxType == TAX_TYPES.EXCLUSIVE ? price + ((price * taxRate)/100) : price;
    return priceAfterTax;
}