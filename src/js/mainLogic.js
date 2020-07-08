import * as databaseHandler from './DataBaseHandler';
//--------
export function addProductToCart() {
  let productToAdd = getProductProperties();

  let productInCartId = checkIfProductInCart(
    productToAdd.product_id,
    productToAdd.product_color,
    productToAdd.product_size
  ); //check if the product is already in the cart

  if (productInCartId) {
    const editedProduct = addRepeatedProduct(
      productInCartId,
      productToAdd.product_price,
      productToAdd.product_quantity
    );

    localStorage.setItem(productInCartId, JSON.stringify(editedProduct));
  } else {
    //store the cart in localeStorage
    let currentIndex = getCurrentIndexFromLocalStorage();
    localStorage.setItem(
      `product-${currentIndex}`,
      JSON.stringify(productToAdd)
    );
  }

  incrementOrDecrementCartBadge();
}

// ---------
function getCurrentIndexFromLocalStorage() {
  let localStorageCartItems = [];
  Object.keys(localStorage).forEach((key) => {
    if (key.substring(0, key.indexOf('-')) === 'product') {
      localStorageCartItems.push(key);
    }
  });
  if (localStorageCartItems.length > 0) {
    let indexArr = localStorageCartItems.sort();
    let fullIndex = indexArr[indexArr.length - 1];
    return parseInt(fullIndex.substring(fullIndex.indexOf('-') + 1)) + 1;
  } else {
    return 1; // index of next item to add to the card
  }
}
//----------
export function getHowManyProductInCart() {
  let counter = 0;
  Object.entries(localStorage).forEach((element) => {
    if (element[0].substring(0, element[0].indexOf('-')) === 'product') {
      counter++;
    }
  });

  return counter;
}

// ------
function getProductProperties() {
  let addedProduct = {};

  // get cart id from how many items in the local storage
  //addedProduct.cart_id = Object.entries(localStorage).length; OLD
  addedProduct.cart_id = getHowManyProductInCart();

  // get product id
  addedProduct.product_id = window.location.search.substring(
    window.location.search.indexOf('=') + 1
  );

  //get product name
  addedProduct.product_name = databaseHandler.getProductById(
    addedProduct.product_id
  ).name;

  //get the color
  let product_color_collection = document.querySelectorAll('.Color-Picker');
  product_color_collection.forEach((element) => {
    if (element.className.includes('Selected-color')) {
      addedProduct.product_color = element.style.backgroundColor;
    }
  });

  // get the size
  let product_size_collection = document.querySelectorAll('.Size-Selector');
  product_size_collection.forEach((element) => {
    if (element.className.includes('selectedSize')) {
      addedProduct.product_size = element.textContent.trim();
    }
  });

  //get product unit price
  addedProduct.unit_price = databaseHandler.getPriceByProductIdAndColor(
    addedProduct.product_id,
    addedProduct.product_color
  );

  //get quantity
  addedProduct.product_quantity = document.querySelector(
    '.order-quantity-1'
  ).value;
  let quantity = parseInt(addedProduct.product_quantity);

  // get product price
  addedProduct.product_price =
    databaseHandler.getPriceByProductIdAndColor(
      addedProduct.product_id,
      addedProduct.product_color
    ) * quantity;

  return addedProduct;
}

// --------
function checkIfProductInCart(productId, color, size) {
  for (const cartProduct of Object.entries(localStorage)) {
    if (
      cartProduct[0].substring(0, cartProduct[0].indexOf('-')) === 'product'
    ) {
      let currentProduct = JSON.parse(cartProduct[1]);
      if (
        currentProduct.product_id === productId &&
        currentProduct.product_color === color &&
        currentProduct.product_size === size
      ) {
        return cartProduct[0];
      }
    }
  }

  return false;
}

// add selected product to already existing product in cart
function addRepeatedProduct(cartProductKey, price, quantity) {
  let product = JSON.parse(localStorage.getItem(cartProductKey));

  product.product_price = parseInt(product.product_price) + parseInt(price);

  product.product_quantity =
    parseInt(product.product_quantity) + parseInt(quantity);

  return product;
}

//--------
export function incrementOrDecrementCartBadge() {
  let productCount = getHowManyProductInCart();

  if (productCount >= 1) {
    document.querySelector('.cart-badge-navbar').style.display = 'block';
    document.querySelector('.cart-badge').style.display = 'block';

    document.querySelector('.cart-badge-navbar').textContent = productCount;
    document.querySelector('.cart-badge').textContent = productCount;
  } else {
    document.querySelector('.cart-badge-navbar').style.display = 'none';
    document.querySelector('.cart-badge').style.display = 'none';

    document.querySelector('.cart-badge-navbar').textContent = productCount;
    document.querySelector('.cart-badge').textContent = productCount;
  }
}

// get the cart content from local storage as an array of object
export function getCartContent() {
  let cartContent = [];
  Object.entries(localStorage).forEach((keyValueArr) => {
    if (
      keyValueArr[0].substring(0, keyValueArr[0].indexOf('-')) === 'product'
    ) {
      cartContent.push(JSON.parse(keyValueArr[1]));
    }
  });

  return cartContent;
}

//decrease or increase product count in local storage and calculate tha total price
export function editProductCountInLocalStorage(e, id) {
  // decrease the total price on the cart.html page
  if (document.querySelector(`.totalPrice-${id}`)) {
    let unitPriceText = document.querySelector(`.unit-price-${id}`).textContent;
    let unit_price = parseInt(
      unitPriceText.substring(0, unitPriceText.indexOf('$'))
    );
    let quantity = parseInt(
      document.querySelector(`.order-quantity-${id}`).value
    );

    document.querySelectorAll(`.totalPrice-${id}`).forEach((element) => {
      element.textContent = unit_price * quantity + '$';
    });

    //* edit the local storage product values

    //get the string cart-? from button classes
    let currentLocalStorageItem = e.target.className.substr(
      e.target.className.indexOf('cart')
    );
    // get tha cart number and convert it to int
    currentLocalStorageItem = currentLocalStorageItem.substring(
      currentLocalStorageItem.indexOf('-') + 1
    );

    // edit the local storage entry using cart number
    Object.entries(localStorage).forEach((localStorageElement) => {
      let parsedLocalStorageElement = JSON.parse(localStorageElement[1]);
      if (
        parsedLocalStorageElement.cart_id === parseInt(currentLocalStorageItem)
      ) {
        parsedLocalStorageElement.product_quantity = document.querySelector(
          `.order-quantity-${id}`
        ).value;
        parsedLocalStorageElement.product_price = unit_price * quantity;

        localStorage.setItem(
          localStorageElement[0],
          JSON.stringify(parsedLocalStorageElement)
        );
      }
    });
  }
}

// calculate cart total
export function calculateCartTotal() {
  let totalAmount = 0;
  Object.entries(localStorage).forEach((element) => {
    if (element[0].substring(0, element[0].indexOf('-')) === 'product') {
      let parsedElement = JSON.parse(element[1]);
      totalAmount += parsedElement.product_price;
    }
  });

  //localStorage.setItem('cartTotal', totalAmount);
  return totalAmount;
}

export function checkCoupon(couponCode) {
  const coupons = databaseHandler.getProductCoupons();
  for (const code of coupons) {
    if (code.substring(0, code.indexOf('=')) === couponCode) {
      return parseInt(code.substring(code.indexOf('=') + 1));
    }
  }
}

// calculate discount
export function calculateDiscount(discount) {
  const discountAmount = document.querySelector('#discountAmount');
  const discountTableRow = document.querySelector('#discount');

  discountTableRow.classList.remove('d-none');
  const discountTotal = Math.floor((calculateCartTotal() * discount) / 100);
  discountAmount.textContent = '-' + discountTotal + '$';
  document.querySelector('#total').textContent =
    calculateCartTotal() - discountTotal + '$';
}
