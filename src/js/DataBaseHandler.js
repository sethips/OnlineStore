const jsonDataBase = require('./Data.json');

export function getProductByName(productName) {
  for (const product of jsonDataBase.productsDataBase) {
    if (product.name === productName) {
      return product;
    }
  }
}

export function getProductById(productId) {
  for (const product of jsonDataBase.productsDataBase) {
    if (product.id == productId) {
      return product;
    }
  }
}
