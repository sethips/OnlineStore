import * as databaseHandler from './DataBaseHandler';
import countries from 'countries-list';
import * as ui_updater from './UI-Updater';
//--------
export function addProductToCart(productId = null) {
  let productToAdd = getProductProperties(productId);

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

//------
export function deleteAllProductsInCart() {
  Object.entries(localStorage).forEach((element) => {
    if (element[0].substring(0, element[0].indexOf('-')) === 'product') {
      localStorage.removeItem(element[0]);
    }
  });
}

//TODO make this function work for product.html and index.html

// ------
function getProductProperties(productId) {
  let addedProduct = {};

  // get cart id from how many items in the local storage
  //addedProduct.cart_id = Object.entries(localStorage).length; OLD
  addedProduct.cart_id = getHowManyProductInCart();

  // get product id if passed param is null get it from page link
  productId
    ? (addedProduct.product_id = productId)
    : (addedProduct.product_id = window.location.search.substring(
        window.location.search.indexOf('=') + 1
      ));

  //get product name
  addedProduct.product_name = databaseHandler.getProductById(
    addedProduct.product_id
  ).name;

  //get the color form products.html page color selector or directly from database

  if (
    window.location.href
      .toString()
      .split(window.location.host)[1]
      .includes('products.html')
  ) {
    let product_color_collection = document.querySelectorAll('.Color-Picker');
    product_color_collection.forEach((element) => {
      if (element.classList.contains('Selected-color')) {
        addedProduct.product_color = element.style.backgroundColor;
      }
    });
  } else {
    addedProduct.product_color = databaseHandler.getProductById(
      addedProduct.product_id
    ).color[0];
  }

  // get the size form products.html page size selector or directly from database if product has sizes

  if (
    window.location.href
      .toString()
      .split(window.location.host)[1]
      .includes('products.html')
  ) {
    let product_size_collection = document.querySelectorAll('.Size-Selector');
    product_size_collection.forEach((element) => {
      if (element.classList.contains('selectedSize')) {
        addedProduct.product_size = element.textContent.trim();
      }
    });
  } else {
    addedProduct.product_size = databaseHandler.getProductById(
      addedProduct.product_id
    ).size[0];
  }

  //get product unit price
  addedProduct.unit_price = databaseHandler.getPriceByProductIdAndColor(
    addedProduct.product_id,
    addedProduct.product_color
  );
  // add two decimal point
  addedProduct.unit_price = addedProduct.unit_price;

  //get quantity form products.html page quantity selector or directly from database
  if (
    window.location.href
      .toString()
      .split(window.location.host)[1]
      .includes('products.html')
  ) {
    addedProduct.product_quantity = document.querySelector(
      '.order-quantity-1'
    ).value;
  } else {
    addedProduct.product_quantity = 1;
  }

  let quantity = parseInt(addedProduct.product_quantity);

  // get product price
  addedProduct.product_price =
    databaseHandler.getPriceByProductIdAndColor(
      addedProduct.product_id,
      addedProduct.product_color
    ) * quantity;
  // add two decimal point
  addedProduct.product_price = addedProduct.product_price;

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
  if (document.querySelector('.cart-badge-navbar')) {
    let productCount = getHowManyProductInCart();

    if (productCount >= 1) {
      document.querySelectorAll('.cart-badge-navbar').forEach((element) => {
        element.style.display = 'block';
      });

      document.querySelectorAll('.cart-badge-navbar').forEach((element) => {
        element.textContent = productCount;
      });
    } else {
      document.querySelectorAll('.cart-badge-navbar').forEach((element) => {
        element.style.display = 'none';
      });

      document.querySelectorAll('.cart-badge-navbar').forEach((element) => {
        element.textContent = productCount;
      });
    }
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
      element.textContent = (unit_price * quantity).toFixed(2) + '$';
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
      // only apply modification to products
      if (
        localStorageElement[0].substring(
          0,
          localStorageElement[0].indexOf('-')
        ) === 'product'
      ) {
        let parsedLocalStorageElement = JSON.parse(localStorageElement[1]);
        if (
          parsedLocalStorageElement.cart_id ===
          parseInt(currentLocalStorageItem)
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
      totalAmount += parseInt(parsedElement.product_price);
    }
  });

  //localStorage.setItem('cartTotal', totalAmount);
  return totalAmount;
}

//calculate cart total including discount and shipping fes if available
export function calculateCartTotalWithdiscountAndShipping() {
  let cartTotal = calculateCartTotal();
  let discount = sessionStorage.getItem('discount')
    ? calculateDiscountTotal(sessionStorage.getItem('discount'))
    : 0;
  let shipping = getShippingFees() ? getShippingFees() : 0;

  let amountToPay = (cartTotal + shipping - discount).toFixed(2);

  sessionStorage.setItem('amountToPay', amountToPay);
  return amountToPay;
}

// save cartTotal to sessionStorage
export function saveCartTotalToSessionStorage(subtotal, cartTotal) {
  if (subtotal) {
    sessionStorage.setItem('subtotal', subtotal);
  }
  if (cartTotal) {
    sessionStorage.setItem('total', cartTotal);
  }
}

export function calculateDiscountTotal(discount) {
  let cartTotal = calculateCartTotal();

  return (cartTotal * discount) / 100;
}

//get shipping method price from json database
export function getShippingFees() {
  let fee;
  document.querySelectorAll('input[type = radio]').forEach((nodeElement) => {
    if (nodeElement.checked) {
      let shippingIndex = nodeElement.id.substring(
        nodeElement.id.indexOf('-') + 1
      );
      fee = databaseHandler.getShippingMethods()[shippingIndex][1];
    }
  });
  return fee;
}

export function checkCoupon(couponCode) {
  const coupons = databaseHandler.getProductCoupons();
  for (const code of coupons) {
    if (code.substring(0, code.indexOf('=')) === couponCode) {
      return parseInt(code.substring(code.indexOf('=') + 1));
    }
  }
}

// calculate discount and call ui-updater displayDiscount to display it in the cart page
// export function calculateDiscount(discount) {
//   const discountTotal = calculateDiscountTotal(discount);
//   ui_updater.displayDiscount(discountTotal);
// }

// get countries list from installed npm package countries
export function getCountriesListInHtml() {
  const countryCodes = Object.keys(countries.countries);
  const countryNames = countryCodes.map((countryCode) => {
    return countries.countries[countryCode].name;
  });

  const htmlSortedCountries = countryNames.sort().map((countryName) => {
    return `<option value="${countryName}">${countryName}</option>`;
  });
  return htmlSortedCountries.join('');
}

//Get user ip address from jsonip.com and save it to sessionStorage
export function getIpAddress() {
  let userIpAddress = '';
  fetch('https://jsonip.com/')
    .then((response) => {
      return response.json();
    })
    .then((jsonResponse) => {
      userIpAddress = jsonResponse.ip;
      sessionStorage.setItem('ipAddress', userIpAddress);
    })
    .catch((err) => alert(err));
}

// get geoLocationFrom ip address
export function getGeoLocation(ipAddress) {
  const apiAccessKey = '5ccaac31a6b0b3b1b8847556bddd1b9a';
  let country = null;
  fetch(`https://api.ipstack.com/${ipAddress}?access_key=${apiAccessKey}`)
    .then((response) => {
      return response.json();
    })
    .then((jsonResponse) => {
      country = jsonResponse.country_name;
      sessionStorage.setItem('country', country);
    })
    .catch((err) => {
      alert(err);
    });
}

//! credit card formatting
export function formatCardNumber(cardNumber) {
  const regex = /^(\d{0,4})(\d{0,4})(\d{0,4})(\d{0,4})$/g;
  const onlyNumbers = cardNumber.replace(/[^\d]/g, '');

  return onlyNumbers.replace(regex, (regex, $1, $2, $3, $4) =>
    [$1, $2, $3, $4].filter((group) => !!group).join(' ')
  );
}

//-----
export function removeMultipleItemsFromSessionStorage(...args) {
  args.forEach((key) => {
    sessionStorage.removeItem(key);
  });
}

//-----
export function getProductsIdBasedOnCategory(category) {
  let allProducts = databaseHandler.getAllProducts();
  let productsIds = [];
  if (category.toLowerCase() === 'all') {
    allProducts.forEach((element) => {
      productsIds.push(element.id);
    });
    productsIds.sort(() => 0.5 - Math.random());
  } else {
    category === 'menClothing'
      ? (category = `men's Clothing`)
      : category === `womenClothing`
      ? (category = `women's Clothing`)
      : (category = category);

    allProducts.forEach((element) => {
      if (element.Category.toLowerCase() === category.toLowerCase()) {
        productsIds.push(element.id);
      }
    });
  }
  return productsIds;
}

//------- element  only clicked element on the categories menu
export function switchSelectedItem(clickedEl) {
  document.querySelectorAll('.categoriesList').forEach((element) => {
    for (let item of element.children) {
      if (item.id === clickedEl.id) {
        item.classList.add('categoriesSelectedItem');
      } else {
        item.classList.remove('categoriesSelectedItem');
      }
    }
  });
}
