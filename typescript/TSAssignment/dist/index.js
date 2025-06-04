"use strict";
const book = { name: "Book", price: 25 };
const pen = { name: "Pen", price: 5 };
const notebook = { name: "Notebook", price: 15 };
function calculateTotal(p1, p2, p3) {
    return p1.price + p2.price + p3.price;
}
function isWithinBudget(total, budget) {
    return total <= budget;
}
const products = [book, pen, notebook];
for (const product of products) {
    console.log(`Product: ${product.name} - Price: $${product.price}`);
}
const totalPrice = calculateTotal(book, pen, notebook);
const budget = 50;
console.log(`\nTotal Price: $${totalPrice}`);
if (isWithinBudget(totalPrice, budget)) {
    console.log("You are within budget.");
}
else {
    console.log("You are over budget.");
}
