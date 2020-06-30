// imported Modules
import * as DataBaseHandler from './DataBaseHandler';
import * as Ui_Updater from './UI-Updater';
import * as DomModules from './DomModules';
import * as mainLogic from './mainLogic';

// Local Variables
const DomElements = DomModules.DOMElements;
let visitedProduct = '';

// sessionStorage
//set timer initial starting time to sessionStorage
if (!sessionStorage.getItem('startTimer')) {
  sessionStorage.setItem('startTimer', new Date());
}

// dom element load event
//
// product.html product template insert on Load
document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('#InsertTemplateHere')) {
    // get product id from URL
    let productParameterString = window.location.search;
    let productParameter = parseInt(
      productParameterString.substring(productParameterString.indexOf('=') + 1)
    );

    visitedProduct = DataBaseHandler.getProductById(productParameter);
    const productTemplate = Ui_Updater.CreatProductTemplate(visitedProduct);
    Ui_Updater.displayProduct(productTemplate);
  }

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
    if (
      (e.target.id === 'decrease') &
      (parseInt(document.querySelector('.order-quantity').value) > 1)
    ) {
      document.querySelector('.order-quantity').value =
        parseInt(document.querySelector('.order-quantity').value) - 1;
    } else if (e.target.id === 'increase') {
      document.querySelector('.order-quantity').value =
        parseInt(document.querySelector('.order-quantity').value) + 1;
    }
  }

  //
  // add to cart button click event
  if (e.target.id === 'cartButton') {
    mainLogic.addProductToCart();
  }
});
