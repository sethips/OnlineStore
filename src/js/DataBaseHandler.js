const jsonDataBase = require('./Data.json');

export function getProduct(productName) {
  for (const product of jsonDataBase.productsDataBase) {
    if (product.name === productName) {
      return product;
    }
  }
}
