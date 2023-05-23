import { TAX_TYPES } from "../config/taxType.config";

/**
 * @param {number} price - product price
 * @param {number} taxRate - tax rate percentage
 * @param {string} taxType - INCLUSIVE or EXCLUSIVE or null
 * @description calculates the Tax
 * @returns {number}
 *  */ 
export function calculateTax(
    price,
    taxRate,
    taxType
) {
    if(taxType == TAX_TYPES.EXCLUSIVE) {
        return ((price * taxRate)/100);
    } else if (taxType == TAX_TYPES.INCLUSIVE) {
        return ((price * taxRate)/100);
    } else {
        return 0;
    }
}

/**
 * @param {number} price - product price
 * @param {number} taxRate - tax rate percentage
 * @param {string} taxType - INCLUSIVE or EXCLUSIVE or null
 * @description calculates the Tax
 * @returns {number}
 *  */ 
export function calculatePriceAfterTax( 
    price,
    taxRate,
    taxType
) {
    // const calculatedTax = taxType == TAX_TYPES.EXCLUSIVE ? price + ((price * taxRate)/100) : price;
    // return calculatedTax;
    if(taxType == TAX_TYPES.EXCLUSIVE) {
        return price + calculateTax(price, taxRate, taxType);
    } else if (taxType == TAX_TYPES.INCLUSIVE) {
        return price;
    } else {
        return price;
    }
}