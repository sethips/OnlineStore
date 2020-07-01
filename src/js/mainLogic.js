import * as databaseHandler from './DataBaseHandler';

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

// ------
function getProductProperties() {
  let addedProduct = {};

  // get cart id from how many items in the local storage
  addedProduct.cart_id = Object.entries(localStorage).length;

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

// ---------
function getCurrentIndexFromLocalStorage() {
  if (Object.keys(localStorage).length !== 0) {
    let indexArr = Object.keys(localStorage).sort();
    let fullIndex = indexArr[indexArr.length - 1];
    return parseInt(fullIndex.substring(fullIndex.indexOf('-') + 1)) + 1;
  } else {
    return 1; // index of next item to add to the card
  }
}

// --------
function checkIfProductInCart(productId, color, size) {
  for (const cartProduct of Object.entries(localStorage)) {
    let currentProduct = JSON.parse(cartProduct[1]);
    if (
      currentProduct.product_id === productId &&
      currentProduct.product_color === color &&
      currentProduct.product_size === size
    ) {
      return cartProduct[0];
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
  let productCount = Object.entries(localStorage).length;

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
    cartContent.push(JSON.parse(keyValueArr[1]));
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
