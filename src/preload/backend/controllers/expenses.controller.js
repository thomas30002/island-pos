import { Expense } from "../models/expense.model";

export async function addExpense(name, amount, date, notes) {
    const expense = await Expense.create({
        name, amount, date, notes
    })
    return expense;
}

export async function getExpenses() {
    const expenses = await Expense.findAll({
        order: [['date', 'desc']]
    });
    return expenses;
}

export async function updateExpense(id, name, amount, date, notes) {
    const expense = await Expense.update({
        name, amount, date, notes
    }, {
        where: {
            id: id
        }
    })
    return expense;
}

export async function removeExpense(id) {
    const expense = await Expense.destroy({
        where: {
            id: id
        }
    })
    return expense;
}