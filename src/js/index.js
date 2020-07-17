// imported Modules
import * as DataBaseHandler from './DataBaseHandler';
import * as Ui_Updater from './UI-Updater';
import * as DomModules from './DomModules';
import * as mainLogic from './mainLogic';

// Local Variables
const DomElements = DomModules.DOMElements;
let visitedProduct = '';

//Get user ip address and country
if (!sessionStorage.getItem('ipAddress')) {
  // write ipAddress to sessionStorage
  mainLogic.getIpAddress();

  // get country from ip address
  if (!sessionStorage.getItem('country')) {
    let geoLocationInterval = setInterval(() => {
      if (sessionStorage.getItem('ipAddress')) {
        mainLogic.getGeoLocation(sessionStorage.getItem('ipAddress'));
        clearInterval(geoLocationInterval);
      }
    }, 200);
  }
}
// sessionStorage
//set timer initial starting time to sessionStorage
if (!sessionStorage.getItem('startTimer')) {
  sessionStorage.setItem('startTimer', new Date());
}

// dom element load event
//
// insert code on any page Load
document.addEventListener('DOMContentLoaded', () => {
  // check cart number of items
  mainLogic.incrementOrDecrementCartBadge();

  if (document.querySelector('#ProductPageInsertTemplateHere')) {
    // get product id from URL
    let productParameterString = window.location.search;
    let productParameter = parseInt(
      productParameterString.substring(productParameterString.indexOf('=') + 1)
    );

    visitedProduct = DataBaseHandler.getProductById(productParameter);
    const productTemplate = Ui_Updater.CreatProductTemplate(visitedProduct);
    Ui_Updater.displayProduct(productTemplate);

    // get timer dom elements
    const daysDomEl = document.querySelector('.days');
    const hoursDomEl = document.querySelector('.hours');
    const minutesDomEl = document.querySelector('.minutes');
    const secondsDomEl = document.querySelector('.seconds');
    //get timer initial starting time from sessionStorage
    const startingTime = sessionStorage.getItem('startTimer');
    // timer set to 7 hours
    const timeDiffInSec = Ui_Updater.getTimeDiff(startingTime, 7);
    // start Timer and display It On dom
    Ui_Updater.startTimer(
      timeDiffInSec,
      daysDomEl,
      hoursDomEl,
      minutesDomEl,
      secondsDomEl
    );
  }

  // cart.html populate on load
  if (document.querySelector('#CartPageInsertTemplateHere')) {
    let cartPageTemplate = Ui_Updater.creatCartPageTemplate();
    Ui_Updater.displayCart(cartPageTemplate);
    const cartTotal = mainLogic.calculateCartTotal();
    Ui_Updater.displayCartTotal(cartTotal);
  }

  // checkout.html auto fill address if already filled and countries load
  if (document.querySelectorAll('.shippingAddressSection')) {
    //  countries load
    if (document.querySelector('#countries')) {
      document
        .querySelector('#countries')
        .insertAdjacentHTML('beforeend', mainLogic.getCountriesListInHtml());

      // select current country based on the ip address
      if (sessionStorage.getItem('country')) {
        document.querySelector('#countries').value = sessionStorage.getItem(
          'country'
        );
      } else {
        let currentCountry = setInterval(() => {
          if (sessionStorage.getItem('country')) {
            document.querySelector('#countries').value = sessionStorage.getItem(
              'country'
            );
            clearInterval(currentCountry);
          }
        });
      }
    }

    // auto fill address if it exist in the localStorage or sessionStorage
    if (localStorage.getItem('shipTo')) {
      let addressToShipTo = JSON.parse(localStorage.getItem('shipTo'));
      Ui_Updater.autoFillAddress(addressToShipTo);
    } else if (sessionStorage.getItem('shipTo')) {
      let addressToShipTo = JSON.parse(sessionStorage.getItem('shipTo'));
      Ui_Updater.autoFillAddress(addressToShipTo);
    }
  }

  if (document.querySelector('#summarySection')) {
    const cartContent = mainLogic.getCartContent();
    if (cartContent) {
      cartContent.forEach((productInCart) => {
        Ui_Updater.addCartElementToSummarySection(productInCart);
      });

      Ui_Updater.displaySummaryTotal();
    }
  }
});

//
//
//  body all click events
DomElements.body.addEventListener('click', (e) => {
  // product.html product image selection event
  if (e.target.className.includes('preview-img')) {
    if (e.target.src !== document.querySelector('.product-main-image').src) {
      for (const element of e.target.parentNode.children) {
        element.classList.remove('active');
      }
      e.target.classList.add('active');
      document.querySelector('.product-main-image').src = e.target.src;
    }
  }

  // product.html product color selection event
  if (e.target.className.includes('Color-Picker')) {
    for (const element of e.target.parentNode.parentNode.children) {
      if (!element.className.includes('color-text')) {
        element.style.borderBottomStyle = 'hidden';
        element.children[0].classList.remove('Selected-color');
      }
    }
    if (!e.target.className.includes('Selected-color')) {
      e.target.classList.add('Selected-color');
      e.target.parentNode.style.borderBottomStyle = 'Solid';
      //check if each color has it own price
      if (visitedProduct.price.length > 1) {
        let priceID = e.target.id.substring(e.target.id.indexOf('-') + 1);
        document.querySelector('.itemPrice').textContent =
          visitedProduct.price[priceID] + '$';
      }
    }
  }

  // product.html product size selection event
  if (e.target.className.includes('Size-Selector')) {
    if (!e.target.className.includes('selectedSize')) {
      for (const element of e.target.parentNode.children) {
        if (!element.className.includes('Size-Label')) {
          element.classList.remove('selectedSize');
        }
      }
      e.target.classList.add('selectedSize');
    }
  }

  // product.html increase and decrease product count events
  if (e.target.className.includes('product-count')) {
    let id = e.target.id.substring(e.target.id.indexOf('-') + 1);
    if (
      (e.target.id === `decrease-${id}`) &
      (parseInt(document.querySelector(`.order-quantity-${id}`).value) > 1)
    ) {
      // cart.html has two order-quantity inputs for responsiveness
      if (
        Array.from(document.querySelectorAll(`.order-quantity-${id}`)).length >
        1
      ) {
        document
          .querySelectorAll(`.order-quantity-${id}`)
          .forEach((elementNode) => {
            elementNode.value = parseInt(elementNode.value) - 1;
          });
      } else {
        document.querySelector(`.order-quantity-${id}`).value =
          parseInt(document.querySelector(`.order-quantity-${id}`).value) - 1;
      }

      // decrease the total price on the cart.html page
      if (document.querySelector(`.totalPrice-${id}`)) {
        mainLogic.editProductCountInLocalStorage(e, id);
        const cartTotal = mainLogic.calculateCartTotal();
        Ui_Updater.displayCartTotal(cartTotal);
      }
    } else if (e.target.id === `increase-${id}`) {
      // cart.html has two order-quantity inputs for responsiveness
      if (
        Array.from(document.querySelectorAll(`.order-quantity-${id}`)).length >
        1
      ) {
        document
          .querySelectorAll(`.order-quantity-${id}`)
          .forEach((elementNode) => {
            elementNode.value = parseInt(elementNode.value) + 1;
          });
      } else {
        document.querySelector(`.order-quantity-${id}`).value =
          parseInt(document.querySelector(`.order-quantity-${id}`).value) + 1;
      }

      // decrease the total price on the cart.html page
      if (document.querySelector(`.totalPrice-${id}`)) {
        mainLogic.editProductCountInLocalStorage(e, id);
        const cartTotal = mainLogic.calculateCartTotal();
        Ui_Updater.displayCartTotal(cartTotal);
      }
    }
  }

  //----
  // add to cart button click event
  if (e.target.id === 'cartButton') {
    e.target.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: none; display: block; shape-rendering: auto;" width="24px" height="24px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
    <circle cx="50" cy="50" fill="none" stroke="#ffffff" stroke-width="5" r="46" stroke-dasharray="216.76989309769573 74.25663103256524" transform="rotate(353.677 50.0001 50.0001)">
      <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="0.5s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>
    </circle></svg>`;

    setTimeout(() => {
      e.target.innerHTML = '';
      e.target.textContent = 'ADD TO CART';
    }, 500);

    mainLogic.addProductToCart();
  }

  // delete product from cart
  if (e.target.className.includes('closeBtn')) {
    let rowID = 0;
    if (e.target.id) {
      rowID = e.target.id.substring(e.target.id.indexOf('-') + 1);
    } else {
      rowID = e.target.parentNode.id.substring(
        e.target.parentNode.id.indexOf('-') + 1
      );
    }
    let elementToDelete = document.querySelector(`#row-${rowID}`);
    // elementToDelete.classList.add('tableRowAnimation');
    // setTimeout(() => {
    elementToDelete.parentNode.removeChild(elementToDelete);
    // }, 500);

    Object.entries(localStorage).forEach((element) => {
      if (element[0].substring(0, element[0].indexOf('-')) === 'product') {
        let parsedElement = JSON.parse(element[1]);
        if (parsedElement.cart_id === parseInt(rowID)) {
          localStorage.removeItem(element[0]);
        }
      }
    });
    const cartTotal = mainLogic.calculateCartTotal();
    Ui_Updater.displayCartTotal(cartTotal);
    mainLogic.incrementOrDecrementCartBadge();

    if (mainLogic.getHowManyProductInCart() === 0) {
      Ui_Updater.showEmptyCartPage();
    }
  }

  // clear cart button press
  if (e.target.id === 'clearCart') {
    Object.keys(localStorage).forEach((key) => {
      if (key.substring(0, key.indexOf('-')) === 'product') {
        localStorage.removeItem(key);
      }
    });

    Ui_Updater.showEmptyCartPage();
    mainLogic.incrementOrDecrementCartBadge();
  }

  // check if conditions are accepted
  const conditionCheckBox = document.querySelector('#agreeWithCondition');
  const conditionText = document.querySelector('.conditionText');
  const messageToSeller = document.querySelector('#specialInstruction');
  if (e.target.id === 'proceedToCheckout') {
    if (conditionCheckBox.checked) {
      // save customer message
      if (messageToSeller.value) {
        const message = messageToSeller.value;
        sessionStorage.setItem('message', message);
      }

      // go to checkout from
      window.location.href = '';
    } else {
      // highlight condition checkbox
      conditionText.classList.add('blink_me');
      setTimeout(() => {
        conditionText.classList.remove('blink_me');
      }, 500);
    }
  }

  // checkout.html continue to shipping button press
  if (e.target.id === 'continueToShipping') {
    //
    // contact info section
    // email of phone section (required)
    let infoMissing = 0;
    const shippingAddress = {};
    const emailOrPhone = document.querySelector('#emailOrPhone');
    const emailRegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const phoneRegEp = /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/;
    if (
      phoneRegEp.test(emailOrPhone.value) ||
      emailRegExp.test(emailOrPhone.value)
    ) {
      emailOrPhone.classList.remove('border', 'border-danger');
      document.querySelector('.emailWarningText').classList.add('d-none');
      shippingAddress.emailOrPhone = emailOrPhone.value; // save input as a phoneNumber or email
    } else {
      infoMissing++;
      emailOrPhone.classList.add('border', 'border-danger');
      document.querySelector('.emailWarningText').classList.remove('d-none');
    }

    //FirstName input (optional)
    const firstName = document.querySelector('#FirstName');
    if (firstName.value) {
      shippingAddress.firstName = firstName.value;
    }

    //LastName input (required)
    const lastName = document.querySelector('#LastName');
    if (lastName.value) {
      lastName.classList.remove('border', 'border-danger');
      document.querySelector('.lastNameWarningText').classList.add('d-none');
      shippingAddress.lastName = lastName.value;
    } else {
      infoMissing++;
      lastName.classList.add('border', 'border-danger');
      document.querySelector('.lastNameWarningText').classList.remove('d-none');
    }

    // address input (required)
    const address = document.querySelector('#Address');
    if (address.value) {
      address.classList.remove('border', 'border-danger');
      document.querySelector('.addressWarningText').classList.add('d-none');
      shippingAddress.address = address.value;
    } else {
      infoMissing++;
      address.classList.add('border', 'border-danger');
      document.querySelector('.addressWarningText').classList.remove('d-none');
    }

    //secAddress input (optional)
    const secAddress = document.querySelector('#secAddress');
    if (secAddress.value) {
      shippingAddress.secAddress = secAddress.value;
    }

    //zipCode input (required)
    const zipCode = document.querySelector('#zipCode');
    if (zipCode.value) {
      zipCode.classList.remove('border', 'border-danger');
      document.querySelector('.zipCodeWarningText').classList.add('d-none');
      shippingAddress.zipCode = zipCode.value;
    } else {
      infoMissing++;
      zipCode.classList.add('border', 'border-danger');
      document.querySelector('.zipCodeWarningText').classList.remove('d-none');
    }

    // city input (required)
    const city = document.querySelector('#City');
    if (city.value) {
      city.classList.remove('border', 'border-danger');
      document.querySelector('.cityWarningText').classList.add('d-none');
      shippingAddress.city = city.value;
    } else {
      infoMissing++;
      city.classList.add('border', 'border-danger');
      document.querySelector('.cityWarningText').classList.remove('d-none');
    }
    //

    const country = document.querySelector('#countries');
    if (country.value) {
      shippingAddress.country = country.value;
    }

    // check if all required infos are entered
    if (infoMissing === 0) {
      // check if save for next time checked
      if (document.querySelector('#SaveForNextTime').checked) {
        localStorage.setItem('shipTo', JSON.stringify(shippingAddress));
      } else {
        sessionStorage.setItem('shipTo', JSON.stringify(shippingAddress));
      }
    }
  }

  //checkout.html showSummary button click
  if (
    e.target.id === 'showSummary' ||
    e.target.parentNode.id === 'showSummary'
  ) {
    document
      .querySelector('#showSummaryChevron')
      .classList.toggle('chevronRotate');

    // change summary text
    document.querySelector('#showSummaryText').textContent ===
    'Show order summary'
      ? (document.querySelector('#showSummaryText').textContent =
          'Hide order summary')
      : (document.querySelector('#showSummaryText').textContent =
          'Show order summary');
  }
});

// coupon code apply event
// check if coupon section is available
if (document.querySelector('#coupon')) {
  const couponTextInput = document.querySelector('#coupon');
  const discountTableRow = document.querySelector('#discount');
  const couponWarningText = document.querySelector('#couponWaringText');
  // enter keypress event
  couponTextInput.addEventListener('keypress', (e) => {
    if (e.keyCode === 13) {
      const discount = mainLogic.checkCoupon(couponTextInput.value);

      // if the discount code exist in the json DataBase
      if (discount) {
        sessionStorage.setItem('discount', discount);
        Ui_Updater.displayDiscount(mainLogic.calculateDiscountTotal(discount));
      } else {
        discountTableRow.classList.add('d-none');
        setTimeout(() => {
          couponWarningText.textContent = '*type your code and press Enter';
          couponWarningText.classList.remove('text-danger');
        }, 3000);
        couponWarningText.textContent = '*invalid coupon code';
        couponWarningText.classList.add('text-danger');
        document.querySelector('#total').textContent =
          mainLogic.calculateCartTotal() + '$';
      }
    }
  });
}
