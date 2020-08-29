const jsonDataBase = require('./Data.json');

// //initialize fireBase database
// import * as firebase from 'firebase/database';
// const firebaseConfig = {
// };
// const app = firebase.initializeApp(firebaseConfig);
// const database = firebase.database();
// //initialize fireBase database End

export function getAllProducts() {
  let products = [];
  for (const product of jsonDataBase.productsDataBase) {
    products.push(product);
  }

  return products;
}
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

export function getPriceByProductIdAndColor(productID, color) {
  for (const product of jsonDataBase.productsDataBase) {
    if (product.id == productID) {
      return product.price[product.color.indexOf(color)];
    }
  }
}

export function getProductMainPic(productID) {
  for (const product of jsonDataBase.productsDataBase) {
    if (product.id == productID) {
      return product.pictures[0];
    }
  }
}

export function getProductCoupons() {
  return jsonDataBase.coupons;
}

// get the coupon name from coupon value
export function getCouponName(couponValue) {
  const coupons = jsonDataBase.coupons;

  let couponName = coupons
    .filter((currentValue) => {
      return (
        couponValue === currentValue.substring(currentValue.indexOf('=') + 1)
      );
    })
    .toString();

  return couponName.substring(0, couponName.indexOf('='));
}

//get shipping methods
export function getShippingMethods() {
  return jsonDataBase['shipping-Methods'];
}

export function getShippingMethodName(ShippingFee) {
  let shippingName = '';
  jsonDataBase['shipping-Methods'].forEach((shippingMethod) => {
    if (shippingMethod[1] === parseInt(ShippingFee)) {
      shippingName = shippingMethod[0];
    }
  });
  return shippingName;
}

export function getShippingIndex(ShippingFee) {
  let shippingIndex = 0;
  jsonDataBase['shipping-Methods'].forEach((shippingMethod, index) => {
    if (shippingMethod[1] === parseInt(ShippingFee)) {
      shippingIndex = index;
    }
  });
  return shippingIndex;
}
