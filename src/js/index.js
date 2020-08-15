// imported Modules
import * as DataBaseHandler from './DataBaseHandler';
import * as Ui_Updater from './UI-Updater';
import * as DomModules from './DomModules';
import * as mainLogic from './mainLogic';
import Swal from 'sweetalert';

// Local Variables
const DomElements = DomModules.DOMElements;
let visitedProduct = '';
let modalProductId = null;
const loadingSvg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: none; display: block; shape-rendering: auto;" width="24px" height="24px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
<circle cx="50" cy="50" fill="none" stroke="#ffffff" stroke-width="5" r="46" stroke-dasharray="216.76989309769573 74.25663103256524" transform="rotate(353.677 50.0001 50.0001)">
  <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="0.5s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>
</circle></svg>`;

//! Get user ip address and country
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

//! dom element load event
//! insert code on any page Load respectively
document.addEventListener('DOMContentLoaded', () => {
  // auto Load index.html featured Product from database based on exact product ids
  if (document.querySelector('#indexCardSection')) {
    let productsArray = mainLogic.getProductsIdBasedOnCategory('all');
    document
      .querySelector('#indexCardSection')
      .insertAdjacentHTML(
        'afterbegin',
        Ui_Updater.creatFeaturedProducts(...productsArray)
      );
  }

  // auto Load collection.html Product catalog from database based on exact product ids
  if (document.querySelector('#collectionProductSection')) {
    let productsArray = mainLogic.getProductsIdBasedOnCategory('all');
    document
      .querySelector('#collectionProductSection')
      .insertAdjacentHTML(
        'afterbegin',
        Ui_Updater.creatProductsCatalog(...productsArray)
      );
  }

  // check cart number of items
  mainLogic.incrementOrDecrementCartBadge();

  //! insert product infos into product page
  if (document.querySelector('#ProductPageInsertTemplateHere')) {
    //save current location to sessionStorage
    sessionStorage.setItem('currentPage', 'ProductPage');

    // get product id from URL if current page ins product.html
    let productParameterString = window.location.search;
    let productParameter = parseInt(
      productParameterString.substring(productParameterString.indexOf('=') + 1)
    );

    visitedProduct = DataBaseHandler.getProductById(productParameter);
    const productTemplate = Ui_Updater.CreatProductTemplate(
      visitedProduct,
      true
    );
    Ui_Updater.displayProduct(productTemplate);
  }

  //! cart.html populate on load
  if (document.querySelector('#CartPageInsertTemplateHere')) {
    // save current location to sessionStorage
    sessionStorage.setItem('currentPage', 'CartPage');

    let cartPageTemplate = Ui_Updater.creatCartPageTemplate();
    Ui_Updater.displayCart(cartPageTemplate);
    const cartTotal = mainLogic.calculateCartTotal();
    Ui_Updater.displayCartTotal(cartTotal);
  }

  //! checkout.html load shipping method instead of shipping information section when shipping infos already submitted
  if (document.querySelector('#dynamicSection')) {
    if (
      (sessionStorage.getItem('shipTo') || localStorage.getItem('shipTo')) &&
      sessionStorage.getItem('currentPage') === 'checkoutPage/shippingMethod'
    ) {
      Ui_Updater.showShippingMethod();
      Ui_Updater.autoFillShippingMethodSection();
      Ui_Updater.changeBottomRowBtn();
    } else {
      Ui_Updater.showShippingInformationSection();
    }
  }

  //! checkout.html load payment section instead of shipping method when shipping method already submitted

  if (document.querySelector('#dynamicSection')) {
    if (
      sessionStorage.getItem('shippingFee') &&
      sessionStorage.getItem('currentPage') === 'checkoutPage/paymentPage'
    ) {
      Ui_Updater.showPaymentSection();
      Ui_Updater.autoFillPaymentInfosSection();
      Ui_Updater.changeBottomRowBtn();
    } else {
      // Ui_Updater.showShippingInformationSection();
    }
  }

  //! checkout.html auto fill address if already filled and load countries
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
    if (
      document.querySelector('#dynamicSection') &&
      document.querySelector('#addressSection')
    ) {
      if (localStorage.getItem('shipTo')) {
        let addressToShipTo = JSON.parse(localStorage.getItem('shipTo'));
        Ui_Updater.autoFillAddress(addressToShipTo);
      } else if (sessionStorage.getItem('shipTo')) {
        let addressToShipTo = JSON.parse(sessionStorage.getItem('shipTo'));
        Ui_Updater.autoFillAddress(addressToShipTo);
      }
    }
  }

  //! add cart content to summary section in checkout page
  if (document.querySelector('#summarySection')) {
    const cartContent = mainLogic.getCartContent();
    if (cartContent) {
      let summaryCartTemplate = '';
      cartContent.forEach((productInCart) => {
        summaryCartTemplate += Ui_Updater.addCartElementToSummarySection(
          productInCart
        );
      });

      // add all cart items to both summery section in checkout.html
      document
        .querySelectorAll('#summarySection')
        .forEach((nodeElement, index) => {
          // make summary section overflow when only in large screen
          if (index === 1) {
            nodeElement.insertAdjacentHTML(
              'beforeend',
              `<div style="max-height:70vh; overflow-y:scroll">${summaryCartTemplate}</div>`
            );
          } else {
            nodeElement.insertAdjacentHTML('beforeend', summaryCartTemplate);
          }
        });
      Ui_Updater.displaySummaryTotal();
    }
  }
});

//
//
//!  all body click events
DomElements.body.addEventListener('click', (e) => {
  //! index.html product image click
  if (e.target.classList.contains('card-img-top')) {
    let clickedProduct = e.target.parentNode.parentNode.id.substring(
      e.target.parentNode.parentNode.id.indexOf('-') + 1
    );

    location.href = `products.html?product-id=${clickedProduct}`;
  }
  //! index.html product cards Quick View icon click
  if (e.target.id.includes('quickView')) {
    //get product id from clicked icon
    modalProductId = parseInt(
      e.target.id.substring(e.target.id.indexOf('-') + 1)
    );

    //get product info using product id
    const productToView = DataBaseHandler.getProductById(modalProductId);
    // store it globally in visitedProduct for the modal in index.html
    visitedProduct = productToView;

    const productTemplate = Ui_Updater.CreatProductTemplate(
      productToView,
      false
    );
    document.querySelector('#mainModalBody').innerHTML = productTemplate;
  }

  //! index.html modal view details button click
  if (
    e.target.id === 'modalViewDetailsBtn' ||
    e.target.parentNode.id === 'modalViewDetailsBtn'
  ) {
    location.href = `products.html?product-id=${modalProductId}`;
  }

  //index.html close modal clear current visitor counter
  if (
    e.target.id === 'modalCloseBtn' ||
    e.target.parentNode.id === 'modalCloseBtn'
  ) {
    clearInterval(Ui_Updater.visitorInterval);

    //clear modal content
    setTimeout(() => {
      document.querySelector('#mainModalBody').innerHTML = `<svg
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    style="
      margin: auto;
      background: none;
      display: block;
      shape-rendering: auto;
    "
    width="24px"
    height="24px"
    viewBox="0 0 100 100"
    preserveAspectRatio="xMidYMid"
  >
    <circle
      cx="50"
      cy="50"
      fill="none"
      stroke="#000000"
      stroke-width="5"
      r="46"
      stroke-dasharray="216.76989309769573 74.25663103256524"
      transform="rotate(353.677 50.0001 50.0001)"
    >
      <animateTransform
        attributeName="transform"
        type="rotate"
        repeatCount="indefinite"
        dur="0.5s"
        values="0 50 50;360 50 50"
        keyTimes="0;1"
      ></animateTransform>
    </circle>
  </svg>`;
    }, 500);
  }

  //! index.html featured product add to cart click event
  if (
    e.target.classList.contains('productAddToCartSection') |
    e.target.parentNode.classList.contains('productAddToCartSection')
  ) {
    //TODO add selected to cart (all default options)
    let cardToGetIdFrom = null;
    let _target = e.target.parentNode;

    // safety switch for while loop
    let safety = 50;
    //travel up the dom tree to get the product id
    while (safety > 0 && cardToGetIdFrom === null) {
      if (_target.id && _target.id.includes('product-')) {
        cardToGetIdFrom = _target;
      }

      _target = _target.parentNode;
      safety--;
    }

    if (cardToGetIdFrom.id.includes('product-')) {
      mainLogic.addProductToCart(
        cardToGetIdFrom.id.substring(cardToGetIdFrom.id.indexOf('-') + 1)
      );
    }

    // fill the modal with cart content and display it
    document.querySelector(
      '#mainModalBody'
    ).innerHTML = Ui_Updater.displayCartContentInModal();
    const cartTotal = mainLogic.calculateCartTotal();
    Ui_Updater.displayCartTotal(cartTotal);
  }

  //! index.html cart modal proceed to checkout button click
  if (e.target.id === 'proceedToCheckoutBtn') {
    if (document.querySelector('#agreeWithCondition').checked) {
      // go to checkout from
      window.location.href = 'checkout.html';

      //save current location to sessionStorage
      sessionStorage.setItem('currentPage', 'checkoutPage/ShippingAddress');
    } else {
      //  condition checkbox not checked
      Swal({
        'background-color': '#f4f4f4',
        text:
          'YOU MUST AGREE WITH THE TERMS AND CONDITIONS OF SALES TO CHECK OUT.',
        icon: 'warning',
        buttons: false,
      });
    }
  }

  //index.html sign up button clicked
  if (e.target.id === 'signUpBtn') {
    let email = document.querySelector('#email');
    const emailRegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let LocalStorageEmails = JSON.parse(
      localStorage.getItem('subscribedEmails')
    );

    if (emailRegExp.test(email.value)) {
      if (LocalStorageEmails && LocalStorageEmails.includes(email.value)) {
        Swal({
          'background-color': '#f4f4f4',
          text: 'Email already subscribed',
          icon: 'warning',
          buttons: false,
        });
      } else {
        if (LocalStorageEmails) {
          LocalStorageEmails.push(email.value);
          localStorage.setItem(
            'subscribedEmails',
            JSON.stringify(LocalStorageEmails)
          );
        } else {
          localStorage.setItem(
            'subscribedEmails',
            JSON.stringify([email.value])
          );
        }
        Swal({
          icon: 'success',
          'background-color': '#f4f4f4',
          text: `Thanks for contacting us. We'll get back to you as soon as possible.`,
          buttons: false,
        });
      }
    } else {
      Swal({
        'background-color': '#f4f4f4',
        text: 'YOU MUST ENTER A VALID EMAIL ADDRESS',
        icon: 'warning',
        buttons: false,
      });
    }
  }

  //! product.html product image selection event
  if (e.target.className.includes('preview-img')) {
    if (e.target.src !== document.querySelector('.product-main-image').src) {
      for (const element of e.target.parentNode.children) {
        element.classList.remove('active');
      }
      e.target.classList.add('active');
      document.querySelector('.product-main-image').src = e.target.src;
    }
  }

  //! product.html product color selection event
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
          visitedProduct.price[priceID].toFixed(2) + '$';
      }
    }
  }

  //! product.html product size selection event
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

  //! product.html increase and decrease product count events
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

      // increase the total price on the cart.html page
      if (document.querySelector(`.totalPrice-${id}`)) {
        mainLogic.editProductCountInLocalStorage(e, id);
        const cartTotal = mainLogic.calculateCartTotal();
        Ui_Updater.displayCartTotal(cartTotal);
      }
    }
  }

  //----
  //! product.html add to cart button click event
  if (e.target.id === 'cartButton') {
    e.target.innerHTML = loadingSvg;

    setTimeout(() => {
      e.target.innerHTML = '';
      e.target.textContent = 'ADD TO CART';
    }, 500);

    // id im currently viewing product.html the modalProductId will be null
    mainLogic.addProductToCart(modalProductId);
  }

  //! cart.html delete product from cart
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

  //! cart.html clear cart button press
  if (e.target.id === 'clearCart') {
    Swal({
      'background-color': '#f4f4f4',
      title: 'Clear the cart ?',
      icon: 'warning',
      buttons: {
        cancel: 'Cancel',
        Clear: true,
      },
    }).then((response) => {
      // check if user accepted to clear
      if (response) {
        Object.keys(localStorage).forEach((key) => {
          if (key.substring(0, key.indexOf('-')) === 'product') {
            localStorage.removeItem(key);
          }
        });

        Ui_Updater.showEmptyCartPage();
        mainLogic.incrementOrDecrementCartBadge();
      }
    });
  }

  //! cart.html proceedTo Checkout and check if conditions are accepted
  const conditionCheckBox = document.querySelector('#agreeWithCondition');
  const messageToSeller = document.querySelector('#specialInstruction');
  if (e.target.id === 'proceedToCheckout') {
    if (conditionCheckBox.checked) {
      // save customer message
      if (messageToSeller.value) {
        const message = messageToSeller.value;
        sessionStorage.setItem('message', message);
      }

      // go to checkout from
      window.location.href = 'checkout.html';

      //save current location to sessionStorage
      sessionStorage.setItem('currentPage', 'checkoutPage/ShippingAddress');
    } else {
      //  condition checkbox not checked
      Swal({
        'background-color': '#f4f4f4',
        text:
          'YOU MUST AGREE WITH THE TERMS AND CONDITIONS OF SALES TO CHECK OUT.',
        icon: 'warning',
        buttons: false,
      });
    }
  }

  //! checkout.html return to cart btn
  if (e.target.id === 'returnToCartBtn') {
    location.href = '/src/cart.html';
  }

  //! checkout.html continue to shipping button press
  if (e.target.id === 'continueToShipping') {
    //
    // contact info section
    // email of phone section (required)
    let infoMissing = 0;
    const shippingAddress = {};
    const emailOrPhone = document.querySelector('#emailOrPhone');
    const emailRegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const phoneRegExp = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    if (
      phoneRegExp.test(emailOrPhone.value) ||
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

    //check if user subscribe to news letter
    shippingAddress.subscribed = document.querySelector('#subscribed').checked;

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

    shippingAddress.saveInfosForNextTime = document.querySelector(
      '#SaveForNextTime'
    ).checked;

    // check if all required infos are entered
    if (infoMissing === 0) {
      // check if save for next time checked
      if (document.querySelector('#SaveForNextTime').checked) {
        localStorage.setItem('shipTo', JSON.stringify(shippingAddress));
        sessionStorage.removeItem('shipTo');
      } else {
        sessionStorage.setItem('shipTo', JSON.stringify(shippingAddress));
        localStorage.removeItem('shipTo');
      }
      // continue To Shipping button animation
      e.target.innerHTML = loadingSvg;
      setTimeout(() => {
        e.target.innerHTML = '';
        e.target.textContent = 'Continue to payment';
        e.target.id = 'ContinueToPayment';
        Ui_Updater.showShippingMethod();
        Ui_Updater.autoFillShippingMethodSection();
        Ui_Updater.changeBottomRowBtn();
      }, 300);

      sessionStorage.setItem('currentPage', 'checkoutPage/shippingMethod');
    }
  }

  //! checkout.html showSummary button click
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
          'Hide order summary ')
      : (document.querySelector('#showSummaryText').textContent =
          'Show order summary');
  }

  //! checkout.html change button or return to information buttons click
  if (
    e.target.id === 'changeEmailOrPhone' ||
    e.target.id === 'changeShippingAddress' ||
    e.target.id === 'ReturnToInformationBtn'
  ) {
    sessionStorage.setItem('currentPage', 'checkoutPage/ShippingAddress');
    location.reload();
  }

  //! checkout.html change button or return to shipping method buttons click
  if (
    e.target.id === 'changeShippingMethod' ||
    e.target.id === 'ReturnToInShippingMethodBtn'
  ) {
    sessionStorage.setItem('currentPage', 'checkoutPage/shippingMethod');
    location.reload();
  }

  //! checkout.html continue to payment button press
  if (e.target.id === 'ContinueToPayment') {
    sessionStorage.setItem('currentPage', 'checkoutPage/paymentPage');
    Ui_Updater.showPaymentSection();
    Ui_Updater.autoFillPaymentInfosSection();

    setTimeout(() => {
      Ui_Updater.changeBottomRowBtn();
    }, 300);
  }

  //! checkout.html payment checkout button press
  if (e.target.id === 'checkout') {
    let missingInput = 0;
    const card = new Object();

    if (document.querySelector('#creditCardOwner').value) {
      if (
        !document
          .querySelector('.cardNameWarningText')
          .classList.contains('d-none')
      ) {
        document.querySelector('.cardNameWarningText').classList.add('d-none');
      }
      card.name = document.querySelector('#creditCardOwner').value;
    } else {
      missingInput++;
      document.querySelector('.cardNameWarningText').classList.remove('d-none');
    }

    if (document.querySelector('#creditCardNumber').value) {
      if (
        !document
          .querySelector('.cardNumberWarningText')
          .classList.contains('d-none')
      ) {
        document
          .querySelector('.cardNumberWarningText')
          .classList.add('d-none');
      }
      card.number = document.querySelector('#creditCardNumber').value;
    } else {
      missingInput++;
      document
        .querySelector('.cardNumberWarningText')
        .classList.remove('d-none');
    }

    if (document.querySelector('#creditCardExpDate').value) {
      if (
        !document
          .querySelector('.cardDateWarningText')
          .classList.contains('d-none')
      ) {
        document.querySelector('.cardDateWarningText').classList.add('d-none');
      }
      card.expMonth = document.querySelector('#creditCardExpDate').value;
    } else {
      missingInput++;
      document.querySelector('.cardDateWarningText').classList.remove('d-none');
    }

    if (document.querySelector('#creditCardCVV').value) {
      if (
        !document
          .querySelector('.cardCvvWarningText')
          .classList.contains('d-none')
      ) {
        document.querySelector('.cardCvvWarningText').classList.add('d-none');
      }
      card.cvv = document.querySelector('#creditCardCVV').value;
    } else {
      missingInput++;
      document.querySelector('.cardCvvWarningText').classList.remove('d-none');
    }

    document.querySelector('#saveCard').checked
      ? (card.saved = true)
      : (card.saved = false);

    if (missingInput === 0) {
      e.target.innerHTML = loadingSvg;
      document.querySelector('#saveCard').checked
        ? localStorage.setItem('cardInfos', JSON.stringify(card))
        : sessionStorage.setItem('cardInfos', JSON.stringify(card));
      setTimeout(() => {
        mainLogic.deleteAllProductsInCart();
        mainLogic.removeMultipleItemsFromSessionStorage(
          'total',
          'shippingFee',
          'subtotal',
          'discountAmount',
          'amountToPay',
          'discount',
          'currentPage'
        );
        location.href = 'orderStatus.html';
      }, 1000);
    }
  }

  // orderStatus.html button click
  if (e.target.id === 'goBackToHome') {
    location.href = 'index.html';
  }
});

// coupon code apply event
//! cart.html check if coupon section is available
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
        sessionStorage.removeItem('discount');
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
