type Product = {
  name: string;
  price: number;
};

const book: Product = { name: "Book", price: 25 };
const pen: Product = { name: "Pen", price: 5 };
const notebook: Product = { name: "Notebook", price: 15 };


function calculateTotal(p1: Product, p2: Product, p3: Product): number {
  return p1.price + p2.price + p3.price;
}

function isWithinBudget(total: number, budget: number): boolean {
  return total <= budget;
}


const products: Product[] = [book, pen, notebook];

for (const product of products) {
  console.log(`Product: ${product.name} - Price: $${product.price}`);
}


const totalPrice = calculateTotal(book, pen, notebook);
const budget = 50;

console.log(`\nTotal Price: $${totalPrice}`);

if (isWithinBudget(totalPrice, budget)) {
  console.log("You are within budget.");
} else {
  console.log("You are over budget.");
}