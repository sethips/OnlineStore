import * as mainLogic from './mainLogic';
import * as dataBaseHandler from './DataBaseHandler';
import Payment from 'payment';

function getPicturesForCards(PicArr) {
  let productPictures =
    PicArr.length > 1
      ? `<img
          class="card-img-top position-absolute custom-transparency custom-cursor"
          src="${PicArr[0]}"
          alt=""
          style="z-index: 1;"
          />
          <img
          class="card-img-top custom-cursor"
          src="${PicArr[1]}"
          alt=""
          style="z-index: 1;"
          class="custom-cursor"
        />`
      : ` <img
          class="card-img-top custom-cursor"
          src="${PicArr[0]}"
          alt=""
          style="z-index: 1;"
          class="custom-cursor"
        />`;

  return productPictures;
}

function getPriceForIndexCards(priceArr) {
  let productPrice =
    priceArr.length > 1
      ? priceArr[0].toFixed(2) +
        '$ - ' +
        priceArr[priceArr.length - 1].toFixed(2) +
        '$'
      : priceArr[0].toFixed(2) + '$';

  return productPrice;
}

// creat collection.html product catalog
export function creatProductsCatalog(...args) {
  let indexTemplate = args.map((element) => {
    let currentProduct = dataBaseHandler.getProductById(element);
    if (currentProduct) {
      return `
          <div class="col-6 col-md-4 col-lg-3 mb-4 px-1">
        <div class="card border-0" id="product-${currentProduct.id}">
          <div class="overlay d-flex align-self-end">
            <div class="d-flex flex-column p-2">
              <img
                width="25"
                height="25"
                src="https://image.flaticon.com/icons/svg/1077/1077035.svg"
                class="mb-2 custom-cursor"
                data-toggle="tooltip"
                data-placement="left"
                title="Add To Wishlist"
              />
              <a data-toggle="modal" data-target="#mainModal">
              <img
                width="25"
                height="25"
                src="https://image.flaticon.com/icons/svg/3063/3063986.svg"
                id="quickView-${currentProduct.id}"
                data-toggle="tooltip"
                data-placement="left"
                title="Quick View"
                class="custom-cursor"
              />
            </a>
            </div>
          </div>
          <div class="position-relative overflow-hidden productImageContainer">
          <div
          class="custom-add-to-cart overlay w-100 text-white py-2 rounded-0 productAddToCartSection"
          data-toggle="modal"
          data-target="#mainModal"
        >
          <img
            width="20"
            height="20"
            src="https://image.flaticon.com/icons/svg/833/833314.svg"
            class="custom-cursor"
          />
          <span class="pl-2 custom-cursor">Add to cart</span>
        </div>
            ${getPicturesForCards(currentProduct.pictures)}
          </div>

          <div class="card-body px-0">
            <a class="text-dark product-name" href="products.html?product-id=${
              currentProduct.id
            }">${currentProduct.name}</a>
            <div class="priceColorsDiv d-flex">
              <div class="left-section w-75 py-2 text-muted">
                ${getPriceForIndexCards(currentProduct.price)}
              </div>
              <div class="left-section w-25 pl-4 py-2 text-muted ml-auto">
              </div>
            </div>
          </div>
        </div>
      </div>`;
    }
  });

  return indexTemplate.join('');
}

// creat product.html product carousel bottom of the page
function creatProductsCarousel(...args) {
  let indexTemplate = args.map((element, index) => {
    let currentProduct = dataBaseHandler.getProductById(element);
    if (currentProduct) {
      return `
      <div class="col-6 col-md-3 px-1">
        <div class="card border-0 px-0" id="product-${currentProduct.id}">
          <div class="productImageContainer">
            ${getPicturesForCards(currentProduct.pictures)}
          </div>

          <div class="card-body px-0 text-truncate">
            <a class="text-dark product-name" href="products.html?product-id=${
              currentProduct.id
            }">${currentProduct.name}</a>
            <div class="priceColorsDiv d-flex">
              <div class="left-section w-75 py-2 text-muted">
                ${getPriceForIndexCards(currentProduct.price)}
              </div>
              <div class="left-section w-25 pl-4 py-2 text-muted ml-auto">
              </div>
            </div>
          </div>
      </div>
    </div>`;
    }
  });

  return indexTemplate;
}

// creat index.hmtl featured products section
export function creatFeaturedProducts(...args) {
  let indexTemplate = args.map((element) => {
    let currentProduct = dataBaseHandler.getProductById(element);
    if (currentProduct) {
      return `
      <div class="col-6 col-md-4 col-lg-3 mb-4 px-1">
        <div
          class="card border-0"
          id="product-${currentProduct.id}"
        >
          <div class="overlay align-self-end">
            <div class="d-flex flex-column p-2">
              <img
                width="25"
                height="25"
                src="https://image.flaticon.com/icons/svg/1077/1077035.svg"
                class="mb-2 custom-cursor"
                data-toggle="tooltip"
                data-placement="left"
                title="Add To Wishlist"
              />
              <a data-toggle="modal" data-target="#mainModal">
                <img
                  width="25"
                  height="25"
                  src="https://image.flaticon.com/icons/svg/3063/3063986.svg"
                  id="quickView-${currentProduct.id}"
                  data-toggle="tooltip"
                  data-placement="left"
                  title="Quick View"
                  class="custom-cursor"
                />
              </a>
            </div>
          </div>
          <div class="position-relative productImageContainer">
          ${getPicturesForCards(currentProduct.pictures)}
          </div>

          <div
            class="card-body px-0 position-relative"
            style="z-index: 1;"
          >
            <a
              class="text-dark product-name"
              href="products.html?product-id=${currentProduct.id}"
              >${currentProduct.name}</a
            >
            <div class="priceColorsDiv d-flex">
              <div
                class="left-section w-75 py-2 text-muted position-relative"
              >
                <div class="price-hover-effect">
                  <div
                    class="cart-section custom-cursor w-auto productAddToCartSection"
                    data-toggle="modal"
                    data-target="#mainModal"
                  >
                    <img
                      width="20"
                      height="20"
                      src="https://image.flaticon.com/icons/svg/833/833314.svg"
                    />
                    <span>Add to cart</span>
                  </div>
                  <div class="price-section"><span class="text-14" style="">${getPriceForIndexCards(
                    currentProduct.price
                  )}</span></div>
                </div>
              </div>
              <div
                class="left-section w-25 py-2 text-muted text-right"
              ></div>
            </div>
          </div>
        </div>
      </div>`;
    }
  });

  return indexTemplate.join('');
}

// get images from json database
function getImages(arr) {
  let imagesHtmlTemplate = '';
  for (const [index, element] of arr.entries()) {
    if (index === 0) {
      imagesHtmlTemplate += ` <img
                                src="${element}"
                                alt=""
                                class="img-fluid d-none d-lg-block mb-3 custom-cursor preview-img  active"
                              />`;
    } else {
      imagesHtmlTemplate += ` <img
                                src="${element}"
                                alt=""
                                class="img-fluid mb-3 custom-cursor preview-img"
                              />`;
    }
  }
  return imagesHtmlTemplate;
}

//get images for carousel
function getImagesForCarousel(arr) {
  let imagesHtmlTemplate = '';
  for (const [index, element] of arr.entries()) {
    if (index === 0) {
      imagesHtmlTemplate += ` <div class="carousel-item active">
      <img class="d-block img-fluid  w-100 " src="${element}" alt="First slide">
    </div>`;
    } else {
      imagesHtmlTemplate += ` <div class="carousel-item ">
      <img class="d-block img-fluid  w-100" src="${element}" alt="First slide">
    </div>`;
    }
  }
  return imagesHtmlTemplate;
}

// get colors from json database
function getColors(arr) {
  let colorsHtmlTemplate = '';
  for (const [index, element] of arr.entries()) {
    if (index === 0) {
      colorsHtmlTemplate += `<div class="pb-1 ml-3" style="border-bottom-style: Solid; border-bottom-width: 2px; border-bottom-color:${element};">
                                <div
                                  class="rounded-circle Color-Picker Selected-color custom-cursor"
                                  style="width: 25px; height: 25px; background-color: ${element};"
                                  id="color-${index}"
                                ></div>
                              </div>`;
    } else {
      colorsHtmlTemplate += `<div class="pb-1 ml-3" style="border-bottom-style: hidden; border-bottom-width: 2px; border-bottom-color:${element};">
                                <div
                                  class="rounded-circle Color-Picker custom-cursor"
                                  style="width: 25px; height: 25px; background-color: ${element};"
                                  id="color-${index}"
                                ></div>
                              </div>`;
    }
  }
  return colorsHtmlTemplate;
}

// get sizes from json database
function getSizes(arr) {
  if (arr.length) {
    let outsideHtmlContainer = `<div class="d-flex align-items-center my-4">
                                  <span class="Size-Label">Size: </span>
                                  <div class="w-100">`;
    let insideHtmlTemplate = '';
    for (const [index, element] of arr.entries()) {
      if (index === 0) {
        insideHtmlTemplate += `
        <span class="font-weight-bold mx-2 px-2 custom-cursor Size-Selector selectedSize">
        ${element}</span>`;
      } else {
        insideHtmlTemplate += `
        <span class="font-weight-bold mx-2 px-2 custom-cursor Size-Selector">
        ${element}</span>`;
      }
    }

    return outsideHtmlContainer + insideHtmlTemplate + ` </div></div>`;
  } else {
    return `<div class="d-none align-items-center my-4"></div>`;
  }
}
// get Price from json database
function getPrice(arr) {
  let priceHtmlTemplate = '';
  if (arr.length > 1) {
    priceHtmlTemplate += `<span class="money h2 text-info">
    ${arr[0].toFixed(2)}$</span> <span class="mx-2">-</span>`;
    priceHtmlTemplate += `<span class="money h2 text-info">
    ${arr[arr.length - 1].toFixed(2)}$</span>`;
  } else {
    priceHtmlTemplate += `<span class="money h2 text-info">
    ${arr[0].toFixed(2)} $</span>`;
  }
  return priceHtmlTemplate;
}

//get price for each color
function getPriceForEachColor(priceArr) {
  if (priceArr.length > 1) {
    return `<div class="d-flex align-items-center my-4">
              <span class="money h2 text-info itemPrice">${priceArr[0].toFixed(
                2
              )}$</span>
            </div>`;
  } else {
    return `<div class="d-none align-items-center my-4">
            </div>`;
  }
}

// Get random numbers
function getRandomNumber(min, max) {
  let number = Math.floor(Math.random() * (max - min + 1) + min);
  return number;
}
// get random number for product.html progress bar
const fixedRandomNumber = getRandomNumber(1, 50);

//get random online visitors
export let visitorInterval; // make interval accessible to clear it from index.js
function getVisitorsRightNow() {
  let count = getRandomNumber(20, 100);
  visitorInterval = setInterval(displayVisitors, 2000);
  // the interval call back
  function displayVisitors() {
    var variation = getRandomNumber(-5, 5);
    count += variation;
    document.querySelector('.visitorsCount').textContent = count;
  }
  // temporarily return wait as a placeHolder
  return 'Wait';
}

//get optimal order date
function optimalOrderDate() {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `${24 - hours} hours ${60 - minutes} minutes`;
}

//get estimate delivery date
function getDeliveryDate(days) {
  let date = new Date();
  let daysInWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  date.setDate(date.getDate() + days);

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let dayName = daysInWeek[date.getDay()];
  day = day < 10 ? '0' + day : day;
  month = month < 10 ? '0' + month : month;
  return `${dayName} ${day}/${month}/${date.getFullYear()}`;
}

//! testing new timer concept
function startTimerTwo() {
  let hours = 0,
    minutes = 0,
    seconds = 0;

  //get timer initial starting time from sessionStorage
  let startingTime = sessionStorage.getItem('startTimer');
  // timer set to 7 hours
  let durationInSec = getTimeDiff(startingTime, 7);

  setInterval(function () {
    hours = Math.floor(durationInSec / 3600);
    minutes = Math.floor((durationInSec % 3600) / 60);
    seconds = durationInSec % 60;

    //to display 0 before single digit time
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    // get timer dom elements
    try {
      document.querySelector('.hours').textContent = hours;
      document.querySelector('.minutes').textContent = minutes;
      document.querySelector('.seconds').textContent = seconds;
    } catch {}

    // restart counter from 7 hours if counters done
    if (--durationInSec < 0) {
      durationInSec = getTimeDiff(new Date().getTime(), 7); // 7 hours
    }
  }, 1000);

  //temporarily return time as object for the dom
  return {
    hours:
      Math.floor(durationInSec / 3600) < 10
        ? '0' + Math.floor(durationInSec / 3600)
        : Math.floor(durationInSec / 3600),
    minutes:
      Math.floor((durationInSec % 3600) / 60) < 10
        ? '0' + Math.floor((durationInSec % 3600) / 60)
        : Math.floor((durationInSec % 3600) / 60),
    seconds:
      durationInSec % 60 < 10 ? '0' + (durationInSec % 60) : durationInSec % 60,
  };
}
//!--------------------------

//diff between two dates in seconds for timer
export function getTimeDiff(startingTime, hours) {
  const endTime = new Date(startingTime);
  endTime.setHours(endTime.getHours() + hours);
  const diffTime = Math.abs(endTime - new Date());
  return Math.ceil(diffTime / 1000);
}

// get Description from json database
function getDescription(arr) {
  let descriptionHtmlTemplate = '';
  arr.forEach((element) => {
    for (const [index, item] of element.entries()) {
      if (index === 0) {
        descriptionHtmlTemplate += `<h5 class="mb-4 font-weight-bold" style="font-size: 18px;">
        ${item}
      </h5>`;
      } else {
        descriptionHtmlTemplate += `<p style="font-size: 14px;">
        ${item}
      </p>`;
      }
    }
  });
  return descriptionHtmlTemplate;
}

// if description included the template is for the product page if not the template is for the index.html modal view
export function CreatProductTemplate(product, includeDescription) {
  if (includeDescription) {
    let productSectionTemplate = `<div class="container">
      <div class="row">
        <div class="col-sm-12 col-md-6 mb-5">
          <div class="row">
            <div class="col-12 col-lg-3 img-Selection">
              <div class="d-flex flex-column">
                ${getImages(product.pictures)}
              </div>
            </div>
            <div class="col-12 col-lg-9 order-sm-1 order-lg-2">
              <div class="card border-0 mb-3">
                <img
                  src=" ${product.pictures[0]}"
                  class="img-fluid product-main-image"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
    
        <!-- title and description -->
        <div class="col-sm-12 col-md-6 px-4">
          <h1 class="my-3 FontSize28">${product.name}</h1>
          <p class="my-3">
            <span class="money h2 text-info">${getPrice(product.price)}</span>
          </p>
          <p class="my-3">
            <span class="text-danger font-weight-bold"
              ><img
                src="//cdn.shopify.com/s/files/1/0102/4383/3952/files/flash_15x.png?v=1575378962"
                alt="fire sale"
                class="flash"
              />
              ${getRandomNumber(5, 30)} sold in last ${getRandomNumber(1, 24)}
              hours</span
            >
          </p>
          <p class="my-3" style="font-size: 14px;">
            ${product.ShortDescription}
          </p>
          <div class="text-center my-3">
            <p class="font-weight-bold mb-0">
              HURRY! ONLY
              <span class="number text-info">${fixedRandomNumber}</span> LEFT IN
              STOCK.
            </p>
    
            <!-- progress bar -->
            <div class="progress rounded-0 mb-3" style="height: 10px;">
              <div
                class="progress-bar progress-bar-striped progress-bar-animated bg-info"
                role="progressbar"
                style="width: ${fixedRandomNumber}%;"
                aria-valuenow="${fixedRandomNumber}"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
          </div>
    
          <!-- timer -->
          <div class="time d-none d-lg-flex justify-content-around w-100 my-3">
            <div class="d-flex flex-column align-items-center">
              <span class="time-day days" style="font-size: 40px;"
                >0</span
              ><span>DAYS</span>
            </div>
            <div class="d-flex flex-column align-items-center">
              <span class="time-day hours" style="font-size: 40px;"
                >${startTimerTwo().hours}</span
              ><span>HOURS</span>
            </div>
            <div class="d-flex flex-column align-items-center">
              <span class="time-minutes minutes" style="font-size: 40px;"
                >${startTimerTwo().minutes}</span
              ><span>MINUTES</span>
            </div>
            <div class="d-flex flex-column align-items-center">
              <span class="time-seconds seconds" style="font-size: 40px;"
                >${startTimerTwo().seconds}</span
              ><span>SECONDS</span>
            </div>
          </div>
    
          <!-- color section -->
          <div class="d-flex align-items-center my-4">
            <span class="color-text">Color: </span>
            ${getColors(product.color)}
          </div>
          <!-- size section -->
          ${getSizes(product.size)}
    
          <!-- price of each Color Section -->
          ${getPriceForEachColor(product.price)}
    
          <!-- number of items -->
          <div class="input-group w-25 my-3">
            <div class="input-group-prepend">
              <button
                class="btn btn-light btn-sm input-group-text px-2 custom-cursor product-count"
                id="decrease-1"
              >
                -
              </button>
            </div>
            <input
              type="text"
              class="form-control bg-white text-center px-1 order-quantity-1"
              placeholder=""
              aria-label=""
              value="1"
              readonly
            />
            <div class="input-group-append">
              <button
                class="btn btn-light btn-sm input-group-text px-2 custom-cursor product-count"
                id="increase-1"
              >
                +
              </button>
            </div>
          </div>
    
          <!-- cart buttons -->
          <button
            type="button"
            name=""
            id="cartButton"
            class="btn black-bg text-white btn-block rounded-0"
          >
            ADD TO CART
          </button>
          <button
            type="button"
            name=""
            id="buyNowButton"
            class="btn bg-info text-white btn-block rounded-0"
          >
            BUY IT NOW
          </button>
    
          <!-- shipping estimates -->
          <div class="mt-5 mb-4">
            <span class="font-weight-bold" style="font-size: 15px;"
              >Order in the next
              <span class="bg-info px-2 py-1 text-white shadow-sm mb-5"
                >${optimalOrderDate()}</span
              >
              to get it by <span class="time">${getDeliveryDate(15)}</span>
            </span>
          </div>
    
          <!-- badges -->
          <div class="text-center">
            <img
              src="https://cdn.shopify.com/s/files/1/0102/4383/3952/files/trustseal_499x.png?v=1575378615"
              class="img-fluid"
              alt=""
            />
          </div>
    
          <hr />
    
          <!-- vendor info -->
          <div
            class="d-flex flex-column font-weight-bold text-muted my-3"
            style="font-size: 14px;"
          >
            <span class="my-2">
              Vendor: <span class="vendor">${product.Vendor}</span></span
            >
            <span class="my-2"> SKU: <span class="stock">N/A</span></span>
            <span class="my-2">
              Share: <i class="fa fa-facebook custom-cursor mx-2"></i>
              <i class="fa fa-twitter custom-cursor mx-2"></i>
              <i class="fa fa-envelope custom-cursor mx-2"></i>
              <i class="fa fa-pinterest custom-cursor mx-2"></i>
              <i class="fa fa-tumblr custom-cursor mx-2"></i>
            </span>
            <span class="my-2">
              Real time
              <span class="bg-info pl-2 pr-1 py-1 mr-1 shadow-sm mb-5">
                <span class="text-white visitorsCount"
                  >${getVisitorsRightNow()}</span
                >
                <i class="fa fa-bolt text-white pl-1" aria-hidden="true"></i>
              </span>
              Visitor right now
            </span>
          </div>
        </div>
      </div>
    </div>
    <!-- product description -->
    <div class="bg-light py-4 my-5 px-2 px-md-5">
      <ul
        class="nav flex-column flex-md-row justify-content-center align-items-center bg-light description-nav font-weight-bold"
        id="myTab"
        role="tablist"
      >
        <li class="nav-item  custom-cursor custom-nav">
          <span
            class="nav-link active"
            id="Description-tab"
            data-toggle="tab"
            href="#Description"
            role="tab"
            aria-controls="Description"
            aria-selected="true"
            >Description</span
          >
        </li>
        <li class="nav-item  custom-cursor custom-nav">
          <span
            class="nav-link"
            id="Additional-Information-tab"
            data-toggle="tab"
            href="#Additional-Information"
            role="tab"
            aria-controls="Additional-Information"
            aria-selected="false"
            >Additional-Information</span
          >
        </li>
        <li class="nav-item  custom-cursor custom-nav">
          <span
            class="nav-link"
            id="Reviews-tab"
            data-toggle="tab"
            href="#Reviews"
            role="tab"
            aria-controls="Reviews"
            aria-selected="false"
            >Reviews</span
          >
        </li>
        <li class="nav-item  custom-cursor custom-nav">
          <span
            class="nav-link"
            id="Shipping-Delivery-tab"
            data-toggle="tab"
            href="#Shipping-Delivery"
            role="tab"
            aria-controls="Shipping-Delivery"
            aria-selected="false"
            >Shipping-Delivery</span
          >
        </li>
      </ul>
      <div class="tab-content" id="myTabContent">
        <div
          class="tab-pane fade show active"
          id="Description"
          role="tabpanel"
          aria-labelledby="Description-tab"
        >
          <div class="row w-100 mx-0 pt-4">
            <div class="col-12 ml-sm-4 ml-md-0">
              <div class="firstWrapper" id="#description">
                ${getDescription(product.description)}
              </div>
            </div>
          </div>
        </div>
        <div
          class="tab-pane fade"
          id="Additional-Information"
          role="tabpanel"
          aria-labelledby="Additional-Information-tab"
        >
          <div class="w-100 h-100 d-flex justify-content-center pt-5">
            <h4 class="mr-4">Color:</h4>
            <h4>${product.color.join(', ')}</h4>
          </div>
          <div class="w-100 h-100 d-flex justify-content-center pb-5">
            <h4 class="mr-4">Size:</h4>
            <h4>${
              product.size.lenght > 0
                ? product.size.join(', ')
                : 'Not available '
            }</h4>
          </div>
        </div>
        <div
          class="tab-pane fade"
          id="Reviews"
          role="tabpanel"
          aria-labelledby="Reviews-tab"
        >
          <div class="w-100 h-100 d-flex flex-column text-center py-5" id="reviewStatus">
          <div class="w-100 d-none" id="reviewsDoExist">
            <h4>Please feel free to <span class="custom-cursor" id="writeReview" data-toggle="modal" data-target="#reviewModal" style="color:orange;">write a reviews</span>
            </h4>
          </div>
          <div class="w-100 d-none" id="reviewsDoNotExist">
            <h4>There are no reviews</h4>
            <h4>
              Be the first to <span class="custom-cursor" id="writeReview" data-toggle="modal" data-target="#reviewModal" style="color:orange;">write a review</span>
            </h4
          </div>
          </div>
          
          </div>

          <!-- product reviews  -->
            <div class="w-100" id="productReviewsContainer">
            </div>

        </div>
        <div
          class="tab-pane fade"
          id="Shipping-Delivery"
          role="tabpanel"
          aria-labelledby="Shipping-Delivery-tab"
        >
          <div class="content-wrapper mb-lg-5">
            <div class="p-5">
              <img
                src="https://cdn.shopify.com/s/files/1/1933/6253/files/shipping.jpg?2957050064640912120"
                class="img-fluid float-left mr-4"
                alt=""
              />
              <p class="">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet, excepturi sit molestiae vero soluta totam laboriosam veniam non obcaecati exercitationem quam et, temporibus natus voluptatum aut harum. Corrupti accusamus quibusdam voluptatibus optio maiores quis, excepturi fuga dignissimos autem asperiores. Iure perspiciatis tempore nam rem sint accusamus nisi pariatur impedit voluptas quos, reiciendis numquam inventore laudantium vel, libero ducimus non natus aliquam, consequatur consequuntur quasi fugit aperiam? Consequuntur voluptatibus consequatur nemo distinctio corrupti sequi esse voluptatem mollitia inventore, ullam vel! Ratione nostrum, expedita nemo sapiente veritatis dolorem, architecto cupiditate aut alias laboriosam assumenda modi necessitatibus commodi at maxime ullam deleniti, ipsa quas iure. Exercitationem, minus aliquam! Tempore, totam reiciendis quidem quasi, at cumque deserunt atque eaque non eos amet beatae minima.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- review modal -->
    <div class="modal fade" id="reviewModal">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Write a review</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      <form>
      <div class="form-group d-flex"> 
        <label>Quality</label>
        <div class="ml-5" id="starsGivenByUser">
          <span class="fa fa-star custom-cursor starSize20px rating checked" ></span>
          <span class="fa fa-star custom-cursor starSize20px rating checked"></span>
          <span class="fa fa-star custom-cursor starSize20px rating checked"></span>
          <span class="fa fa-star custom-cursor starSize20px rating checked"></span>
          <span class="fa fa-star custom-cursor starSize20px rating checked"></span>
        </div>
      </div>
     
      <div class="form-group">
          <label for="reviewerName">Your name</label>
          <input type="text" class="form-control" placeholder="john smith" id="reviewerName"/>
          <small id="nameValidationFeedback" class="d-none text-danger">
            Please provide a valid name.
          </small>
      </div>
      <div class="form-group">
          <label for="reviewerName">Your email</label>
          <input type="email" class="form-control" placeholder="example@yourdomain.com" id="reviewerEmail"/>
          <small id="emailValidationFeedback" class="d-none text-danger">
            Please provide a valid email.
          </small>
      </div>
      <div class="form-group">
          <label for="reviewerName">Review Title</label>
          <input type="text" class="form-control" placeholder="Looks great" id="reviewTitle" />
      </div>
      <div class="form-group">
          <label>Review Content</label>
          <textarea class="form-control" placeholder="Write something" id="reviewText"></textarea>
      </div>
  </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
        <button type="button" class="btn btn-primary" id="submitReviewBtn">Submit Your Review</button>
      </div>
    </div>
  </div>
</div>
    `;

    return productSectionTemplate;
  } else {
    let modalSectionTemplate = `<div class="fluid-container">
    <div class="row modalMaxHeight">
      <div class="col-sm-12 col-md-6">
      <div id="productPicturesCarousel" class="carousel slide  position-relative overflow-hidden carouselHoverEffect" data-ride="carousel">
      <div class="carousel-inner modalMaxHeight" >
       ${getImagesForCarousel(product.pictures)}
      </div>
      <a class="carousel-control-prev" href="#productPicturesCarousel" role="button" data-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a class="carousel-control-next" href="#productPicturesCarousel" role="button" data-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>


      <div class="position-absolute py-2  w-100 black-bg text-center custom-cursor carouselHoverEffectedElem" id="modalViewDetailsBtn" style="bottom:-50px; transition: all 0.2s ease-in-out;">
    <span class="text-white">VIEW DETAILS</span>
    </div>

    </div>    
      </div>
  
      <!-- title and description -->
      <div class="col-sm-12 col-md-6 px-4 modalMaxHeight descriptionOverflow" >
        <h1 class="my-3 FontSize28">${product.name}</h1>
        <p class="my-3">
          <span class="money h2 text-info">${getPrice(product.price)}</span>
        </p>
        <p class="my-3">
          <span class="text-danger font-weight-bold"
            ><img
              src="//cdn.shopify.com/s/files/1/0102/4383/3952/files/flash_15x.png?v=1575378962"
              alt="fire sale"
              class="flash"
            />
            ${getRandomNumber(5, 30)} sold in last ${getRandomNumber(1, 24)}
            hours</span
          >
        </p>
        <p class="my-3" style="font-size: 14px;">
          ${product.ShortDescription}
        </p>
        <div class="text-center my-3">
          <p class="font-weight-bold mb-0">
            HURRY! ONLY
            <span class="number text-info">${fixedRandomNumber}</span> LEFT IN
            STOCK.
          </p>
  
          <!-- progress bar -->
          <div class="progress rounded-0 mb-3" style="height: 10px;">
            <div
              class="progress-bar progress-bar-striped progress-bar-animated bg-info"
              role="progressbar"
              style="width: ${fixedRandomNumber}%;"
              aria-valuenow="${fixedRandomNumber}"
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
        </div>
  
        <!-- timer -->
        <div class="time d-none d-lg-flex justify-content-around w-100 my-3">
          <div class="d-flex flex-column align-items-center">
            <span class="time-day days" style="font-size: 40px;"
              >0</span
            ><span>DAYS</span>
          </div>
          <div class="d-flex flex-column align-items-center">
            <span class="time-day hours" style="font-size: 40px;"
              >${startTimerTwo().hours}</span
            ><span>HOURS</span>
          </div>
          <div class="d-flex flex-column align-items-center">
            <span class="time-minutes minutes" style="font-size: 40px;"
              >${startTimerTwo().minutes}</span
            ><span>MINUTES</span>
          </div>
          <div class="d-flex flex-column align-items-center">
            <span class="time-seconds seconds" style="font-size: 40px;"
              >${startTimerTwo().seconds}</span
            ><span>SECONDS</span>
          </div>
        </div>
  
        <!-- color section -->
        <div class="d-flex align-items-center my-4">
          <span class="color-text">Color: </span>
          ${getColors(product.color)}
        </div>
        <!-- size section -->
        ${getSizes(product.size)}
  
        <!-- price of each Color Section -->
        ${getPriceForEachColor(product.price)}
  
        <!-- number of items -->
        <div class="input-group w-25 my-3">
          <div class="input-group-prepend">
            <button
              class="btn btn-light btn-sm input-group-text px-2 custom-cursor product-count"
              id="decrease-1"
            >
              -
            </button>
          </div>
          <input
            type="text"
            class="form-control bg-white text-center px-1 order-quantity-1"
            placeholder=""
            aria-label=""
            value="1"
            readonly
          />
          <div class="input-group-append">
            <button
              class="btn btn-light btn-sm input-group-text px-2 custom-cursor product-count"
              id="increase-1"
            >
              +
            </button>
          </div>
        </div>
  
        <!-- cart buttons -->
        <button
          type="button"
          name=""
          id="cartButton"
          class="btn black-bg text-white btn-block rounded-0"
        >
          ADD TO CART
        </button>
        <button
          type="button"
          name=""
          id="buyNowButton"
          class="btn bg-info text-white btn-block rounded-0"
        >
          BUY IT NOW
        </button>
  
        <!-- shipping estimates -->
        <div class="mt-5 mb-4">
          <span class="font-weight-bold" style="font-size: 15px;"
            >Order in the next
            <span class="bg-info px-2 py-1 text-white shadow-sm mb-5"
              >${optimalOrderDate()}</span
            >
            to get it by <span class="time">${getDeliveryDate(15)}</span>
          </span>
        </div>
  
        <!-- badges -->
        <div class="text-center">
          <img
            src="https://cdn.shopify.com/s/files/1/0102/4383/3952/files/trustseal_499x.png?v=1575378615"
            class="img-fluid"
            alt=""
          />
        </div>
  
        <hr />
  
        <!-- vendor info -->
        <div
          class="d-flex flex-column font-weight-bold text-muted my-3"
          style="font-size: 14px;"
        >
          <span class="my-2">
            Vendor: <span class="vendor">${product.Vendor}</span></span
          >
          <span class="my-2"> SKU: <span class="stock">N/A</span></span>
          <span class="my-2">
            Share: <i class="fa fa-facebook custom-cursor mx-2"></i>
            <i class="fa fa-twitter custom-cursor mx-2"></i>
            <i class="fa fa-envelope custom-cursor mx-2"></i>
            <i class="fa fa-pinterest custom-cursor mx-2"></i>
            <i class="fa fa-tumblr custom-cursor mx-2"></i>
          </span>
          <span class="my-2">
            Real time
            <span class="bg-info pl-2 pr-1 py-1 mr-1 shadow-sm mb-5">
              <span class="text-white visitorsCount"
                >${getVisitorsRightNow()}</span
              >
              <i class="fa fa-bolt text-white pl-1" aria-hidden="true"></i>
            </span>
            Visitor right now
          </span>
        </div>
      </div>
    </div>
  </div>`;

    return modalSectionTemplate;
  }
}

//! fill review in product page
export function addReview(reviewAsObject) {
  let reviewStars = '';

  //get the number of stars from local storage
  // 5 is for the numbers of stars in total
  for (let i = 0; i < 5; i++) {
    if (i < reviewAsObject.stars) {
      reviewStars += '<span class="fa fa-star checked" ></span>';
    } else {
      reviewStars += '<span class="fa fa-star"></span>';
    }
  }

  let templatestring = `
  <div class="card mb-3 w-100">
          <div class="row no-gutters">
            <div class="col-md-3 p-4 d-flex justify-content-center align-items-center">
            <img src="https://image.flaticon.com/icons/svg/149/149071.svg" class="img-fluid" style="max-width: 250px; max-height:250px">
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <div class="card-title">
                <h5>${reviewAsObject.name}</h5>
                <div class="" >
                  ${reviewStars}
                </div>
                </div>                
                <p class="card-text">${reviewAsObject.reviewText}</p>
                <p class="card-text"><small class="text-muted">${reviewAsObject.date}</small></p>
              </div>
            </div>
          </div>
        </div>`;

  document
    .querySelector('#productReviewsContainer')
    .insertAdjacentHTML('afterbegin', templatestring);
}

// fill product.html RELATED PRODUCT bottom carousel
export function fillRelatedProductCarousel(category, productIdToAvoid) {
  let productsIdsArray = mainLogic.getProductsIdBasedOnCategory(category);
  productsIdsArray.splice(productsIdsArray.indexOf(productIdToAvoid), 1);

  let carouselItems = creatProductsCarousel(...productsIdsArray);
  let carouselTemplate = `
            <div
              id="myCarousel-2"
              class="d-none d-md-block carousel slide"
              data-ride="carousel"
              data-interval="0"
            >
              <!-- Carousel indicators -->
              <ol class="carousel-indicators">
                <li
                  data-target="#myCarousel-2"
                  data-slide-to="0"
                  class="active"
                ></li>
                <li data-target="#myCarousel-2" data-slide-to="1"></li>
              </ol>
              <!-- Wrapper for carousel items -->
              <div class="carousel-inner">
                <div class="carousel-item active pt-3 pb-5 h-auto">
                  <div class="row mx-1">
                    ${carouselItems[0]}
                    ${carouselItems[1]}
                    ${carouselItems[2]}
                    ${carouselItems[3]}
                  </div>
                </div>
                <div class="carousel-item pt-3 pb-5 h-auto">
                  <div class="row mx-1">
                    ${carouselItems[4]}
                    ${carouselItems[5]}
                    ${carouselItems[6]}
                    ${carouselItems[7]}
                  </div>
                </div>
              </div>
            </div>

            <!-- carousel for mobile devices -->
            <div
            id="myCarousel-3"
            class="d-md-none carousel slide"
            data-ride="carousel"
            data-interval="0"
          >
            <!-- Carousel indicators -->
            <ol class="carousel-indicators">
              <li
                data-target="#myCarousel-3"
                data-slide-to="0"
                class="active"
              ></li>
              <li data-target="#myCarousel-3" data-slide-to="1"></li>
              <li data-target="#myCarousel-3" data-slide-to="2"></li>
              <li data-target="#myCarousel-3" data-slide-to="3"></li>
            </ol>
            <!-- Wrapper for carousel items -->
            <div class="carousel-inner">
              <div class="carousel-item active pt-3 pb-5 h-auto">
                <div class="row mx-1">
                  ${carouselItems[0]}
                  ${carouselItems[1]}
                  
                </div>
              </div>
              <div class="carousel-item pt-3 pb-5 h-auto">
                <div class="row mx-1">
                ${carouselItems[2]}
                ${carouselItems[3]}
                </div>
              </div>
              <div class="carousel-item pt-3 pb-5 h-auto">
                <div class="row mx-1">
                  ${carouselItems[4]}
                  ${carouselItems[5]}
                  
                </div>
              </div>
              <div class="carousel-item pt-3 pb-5 h-auto">
                <div class="row mx-1">
                ${carouselItems[6]}
                ${carouselItems[7]}
                </div>
              </div>
            </div>
          </div>
  `;

  return carouselTemplate;
}

//--------
export function creatCartPageTemplate() {
  let cartContent = mainLogic.getCartContent();
  let cartPageTemplate = '';
  let increaseDecreaseIndex = 1;

  for (const product of cartContent) {
    let productPicture = dataBaseHandler.getProductMainPic(product.product_id);
    cartPageTemplate += `
                          <tr class="d-flex flex-column d-lg-table-row bg-light top-buffer table-borderless"
                          style="border-bottom: solid white 5px"
                          id="row-${product.cart_id}">
                            <td class="d-none d-lg-table-cell align-middle">                              
                              <button
                                type="button"
                                class="close closeBtn"
                                aria-label="Close"
                                id="closeBtn-${product.cart_id}"
                                style="width: 25px; height: 25px; outline: none;">
                                <img width="24" height="24" src="https://image.flaticon.com/icons/svg/992/992660.svg"
                                class="img-fluid closeBtn">
                              </button>
                            </td>
                            <td class="align-middle">
                              <button
                                type="button"
                                class="close d-lg-none closeBtn"
                                aria-label="Close"
                                id="closeBtn-${product.cart_id}"
                                style="width: 25px; height: 25px; outline: none;"
                              >
                              <img width="24" height="24" src="https://image.flaticon.com/icons/svg/992/992660.svg"
                              class="img-fluid closeBtn">
                              </button>
                              <img
                                width="80"
                                height="100"
                                class="img-fluid"
                                src="${productPicture}"
                                alt="watches"
                              />
                            </td>
                            <td scope="row" class="text-center text-lg-left align-middle">
                              <div class="w-100 d-flex d-lg-none">
                                <span class="text-uppercase">Product:</span
                                ><span class="ml-auto">${
                                  product.product_name
                                }</span>
                              </div>
                              <span class="d-none d-lg-block">${
                                product.product_name
                              } </span>
                              <span class="d-block text-muted text-right text-lg-left small">Color: ${
                                product.product_color
                              }</span>
                              <span class="${
                                product.product_size ? 'd-block' : 'd-none'
                              } text-muted text-right text-lg-left small">Size: ${
      product.product_size
    }</span>
                            </td>
                            <td class="align-middle">
                              <div class="d-flex d-lg-none">
                                <span class="text-uppercase">price:</span>
                                <span class="ml-auto unit-price-${increaseDecreaseIndex}">${product.unit_price.toFixed(
      2
    )}$</span>
                              </div>
                              <span class="d-none d-lg-block unit-price-${increaseDecreaseIndex}">${product.unit_price.toFixed(
      2
    )}$</span>
                            </td>
                            <td class="align-middle">
                              <div class="d-flex d-lg-none">
                                <span class="text-uppercase">Quantity:</span>
                                <div class="input-group ml-auto" style="width: 100px;">
                                  <div class="input-group-prepend">
                                    <button
                                      class="btn btn-light btn-sm input-group-text px-2 custom-cursor product-count cart-${
                                        product.cart_id
                                      }"
                                      id="decrease-${increaseDecreaseIndex}"
                                    >
                                      -
                                    </button>
                                  </div>
                                  <input
                                    type="text"
                                    class="form-control bg-white text-center px-1 order-quantity-${increaseDecreaseIndex}"
                                    placeholder=""
                                    aria-label=""
                                    value="${product.product_quantity}"
                                    readonly
                                  />
                                  <div class="input-group-append">
                                    <button
                                      class="btn btn-light btn-sm input-group-text px-2 custom-cursor product-count cart-${
                                        product.cart_id
                                      }"
                                      id="increase-${increaseDecreaseIndex}"
                                    >
                                      +
                                    </button>
                                  </div>
                                </div>
                              </div>
                              <div class="d-none d-lg-flex input-group mx-auto" style="width: 100px;">
                                <div class="input-group-prepend">
                                  <button
                                    class="btn btn-light btn-sm input-group-text px-2 custom-cursor product-count cart-${
                                      product.cart_id
                                    }"
                                    id="decrease-${increaseDecreaseIndex}"
                                  >
                                    -
                                  </button>
                                </div>
                                <input
                                  type="text"
                                  class="form-control bg-white text-center px-1 order-quantity-${increaseDecreaseIndex}"
                                  placeholder=""
                                  aria-label=""
                                  value="${product.product_quantity}"
                                  readonly
                                />
                                <div class="input-group-append">
                                  <button
                                    class="btn btn-light btn-sm input-group-text px-2 custom-cursor product-count cart-${
                                      product.cart_id
                                    }"
                                    id="increase-${increaseDecreaseIndex}"
                                  >
                                    +
                                  </button>
                                </div>
                              </div>
                            </td>
                            <td class="align-middle">
                              <div class="d-flex d-lg-none">
                                <span class="text-uppercase">Total:</span>
                                <span class="ml-auto totalPrice-${increaseDecreaseIndex}">${product.product_price.toFixed(
      2
    )}$</span>
                              </div>
                              <span class="d-none d-lg-block totalPrice-${increaseDecreaseIndex}">${product.product_price.toFixed(
      2
    )}$</span>
                            </td>
                          </tr>`;

    increaseDecreaseIndex++;
  }

  return cartPageTemplate;
}

// ----
export function displayCart(templateString) {
  if (templateString) {
    document
      .querySelector('#CartPageInsertTemplateHere')
      .insertAdjacentHTML('beforeend', templateString);
  } else {
    showEmptyCartPage();
  }
}

//display cart content in index.html modal
export function displayCartContentInModal() {
  let templateString = `
  <div class="h4 w-100 text-center">Your order</div>
<div class="table-responsive" style="max-height:50vh;">
   <table class="table text-center  mb-0">
      <thead>
         <hr/ >
      </thead>
      <tbody id="CartPageInsertTemplateHere">
         <!-- main section -->
         ${creatCartPageTemplate()}
      </tbody>
   </table>
</div>
<div class="row">
   <div class="col-6 text-right my-3">
      <h5 class="mb-0">Subtotal:</h5>
    </div>
    <div class="col-6 my-3">
      <h5 class="text-left mb-0" id="subtotal"></h5>
    </div>
</div>
<div class="row py-0">
<div class="col-12 ">
   <div class="progress mb-3" style="height: 20px;">
      <div
         class="progress-bar progress-bar-striped progress-bar-animated bg-danger text-center"
         role="progressbar"
         style="width: 50%;"
         >
         50%
      </div>
   </div>
   <p class="small">
      <span
         class="shipping_display h6 bg-danger text-left w-100 py-1 text-white pl-2 rounded free_shipping text-center"
         style="display: none;"
         >CONGRATULATIONS! YOU'VE GOT FREE SHIPPING!</span
         >
      <span class="remaining_free_shipping">
      Spend
      <span class="font-weight-bold amount_to_spend"></span>
      more to reach
      <span class="font-weight-bold">FREE SHIPPING!</span> Continue
      shopping to add more products to your cart and receive free
      shipping for orders over <u>1000$</u>
      </span>
   </p>
</div>
</div>
<div class="row">
<div class="col">
<div class="d-flex align-items-center pl-2 mb-2">
                <input
                  type="checkbox"
                  name=""
                  id="agreeWithCondition"
                  class="mr-2 custom-cursor"
                />
                <label for="agreeWithCondition" class="small conditionText m-0 custom-cursor"
                  ><span class="text-danger font-weight-bold">*</span> I agree with the terms and conditions.</label
                >
              </div>
</div>
</div>

<div class="row">
  <div class="col-12 col-md-6 d-flex justify-content-center justify-content-md-start order-2 order-md-0">
      <button class="btn btn-dark rounded-0 px-4" 
      data-dismiss="modal"
      id="returnToShop">
      Return to shop
    </button>
  </div>
  <div class="col-12 col-md-6 d-flex justify-content-center justify-content-md-end mb-2 mb-md-0">
     <button class="btn btn-dark rounded-0 px-4" id="proceedToCheckoutBtn">
     Proceed to Checkout
      </button>
  </div>
</div>
  `;

  return templateString;
}

//display cart total in the cart.html
export function displayCartTotal(totalAmount) {
  // check if current location is cart.html or index.html
  if (
    window.location.href
      .toString()
      .split(window.location.host)[1]
      .includes('cart.html')
  ) {
    document.querySelector('#subtotal').textContent =
      totalAmount.toFixed(2) + '$';
    document.querySelector('#total').textContent = totalAmount.toFixed(2) + '$';
    mainLogic.saveCartTotalToSessionStorage(totalAmount, totalAmount);

    // check if discount is available and apply it
    if (sessionStorage.getItem('discount')) {
      let discountAmount = mainLogic.calculateDiscountTotal(
        sessionStorage.getItem('discount')
      );
      let total = totalAmount - discountAmount;
      sessionStorage.setItem('discountAmount', discountAmount);
      // sessionStorage.setItem('total', total);
      mainLogic.saveCartTotalToSessionStorage(null, total);
      // mainLogic.calculateDiscount(sessionStorage.getItem('discount'));

      displayDiscount(discountAmount);

      document.querySelector('#total').textContent = total.toFixed(2) + '$';
    }
  } else if (
    //display cart total in the index.html modal
    window.location.href
      .toString()
      .split(window.location.host)[1]
      .includes('index.html') ||
    window.location.href
      .toString()
      .split(window.location.host)[1]
      .includes('collections.html')
  ) {
    document.querySelector('#subtotal').textContent =
      totalAmount.toFixed(2) + '$';
  }

  // cart bottom section calculate the free shipping option
  if (totalAmount <= 1000) {
    document.querySelector('.progress').style.display = 'flex';
    document.querySelector('.free_shipping').style.display = 'none';
    document.querySelector('.remaining_free_shipping').style.display = 'block';
    document.querySelector('.amount_to_spend').textContent =
      (1000 - totalAmount).toFixed(2) + '$';

    document.querySelector('.progress-bar').style.width = `${Math.floor(
      (totalAmount / 1000) * 100
    )}%`;
    document.querySelector('.progress-bar').textContent = `${Math.floor(
      (totalAmount / 1000) * 100
    )}%`;
  } else {
    document.querySelector('.progress').style.display = 'none';
    document.querySelector('.free_shipping').style.display = 'block';
    document.querySelector('.remaining_free_shipping').style.display = 'none';
  }
}

// display discount in cart page
export function displayDiscount(discountTotal) {
  const discountAmount = document.querySelector('#discountAmount');
  const discountTableRow = document.querySelector('#discount');

  discountTableRow.classList.remove('d-none');

  discountAmount.textContent = '-' + discountTotal.toFixed(2) + '$';
  document.querySelector('#total').textContent =
    (mainLogic.calculateCartTotal() - discountTotal).toFixed(2) + '$';

  document.querySelector('#coupon').value = dataBaseHandler.getCouponName(
    sessionStorage.getItem('discount')
  );
}

//--------
export function displayProduct(templateString) {
  if (templateString) {
    document
      .querySelector('#ProductPageInsertTemplateHere')
      .insertAdjacentHTML('beforeend', templateString);
  } else {
    showEmptyCartPage();
  }
}

//---------
export function showEmptyCartPage() {
  document.querySelector('#fullCart').classList.add('d-none');
  document.querySelector('#emptyCart').classList.remove('d-none');
  document.querySelector('#emptyCart').classList.add('d-flex');
}

// auto fill user address if already in localStorage or sessionStorage
// Checkout.html address Section
export function autoFillAddress(addressToShipTo) {
  document.querySelector('#emailOrPhone').value = addressToShipTo.emailOrPhone;
  document.querySelector('#subscribed').checked = addressToShipTo.subscribed;
  addressToShipTo.firstName
    ? (document.querySelector('#FirstName').value = addressToShipTo.firstName)
    : (document.querySelector('#FirstName').value = '');
  document.querySelector('#LastName').value = addressToShipTo.lastName;
  document.querySelector('#Address').value = addressToShipTo.address;
  addressToShipTo.secAddress
    ? (document.querySelector('#secAddress').value = addressToShipTo.secAddress)
    : (document.querySelector('#secAddress').value = '');
  document.querySelector('#zipCode').value = addressToShipTo.zipCode;
  document.querySelector('#City').value = addressToShipTo.city;
  document.querySelector('#countries').value = addressToShipTo.country;

  document.querySelector('#SaveForNextTime').checked =
    addressToShipTo.saveInfosForNextTime;
}

// Checkout.html add cart product to summary
export function addCartElementToSummarySection(cartItem) {
  let templateString = `<div class="d-flex align-items-center my-4">
  <div class="position-relative">
    <img
      src="${dataBaseHandler.getProductMainPic(cartItem.product_id)}"
      alt=""
      width="60"
      class="border rounded px-1"
    />
    <span
      class="position-absolute border bg-secondary rounded-circle text-white text-center align-middle"
      style="
        right: -10px;
        top: -10px;
        z-index: 10;
        width: 20px;
        height: 20px;
        font-size: 12px;
      "
      >${cartItem.product_quantity}</span
    >
  </div>
  <span class="ml-2">
    <span class="d-block text-14"
      >${cartItem.product_name}</span
    >
    <span class="d-block text-14 text-black-50">${cartItem.product_color}</span>
  </span>
  <span class="ml-auto text-14">
    <span>${cartItem.product_price.toFixed(2)}$</span>
  </span>
</div>
`;

  return templateString;
}

// Checkout.html page summarySection
export function displaySummaryTotal() {
  // first check if discount code was submitted
  let discountPart = '';
  if (sessionStorage.getItem('discount')) {
    discountPart = `<div class="d-flex py-1">
    <span class="text-14 text-muted">discount</span>
    <span class="ml-auto text-14">- ${mainLogic
      .calculateDiscountTotal(sessionStorage.getItem('discount'))
      .toFixed(2)}$</span>
  </div>`;
  }

  // -------
  let templateString = `<hr />
  <div class="d-flex py-1">
    <span class="text-14 text-muted">Subtotal</span>
    <span class="ml-auto text-14">${mainLogic
      .calculateCartTotal()
      .toFixed(2)}$</span>
  </div>
  ${discountPart}
  <div class="d-flex py-1">
    <span class="text-14 text-muted">Shipping</span>
    <span class="ml-auto" id="shippingFees" style="font-size:12px">Calculated at next step</span>
  </div>
  <hr />
  <div class="d-flex">
    <span class="text-14">Total</span>
    <span class="ml-auto" id="summaryTotalAmount"
      >${mainLogic.calculateCartTotalWithdiscountAndShipping()}$</span
    >`;

  document.querySelectorAll('#summarySection').forEach((nodeElement) => {
    nodeElement.insertAdjacentHTML('beforeend', templateString);
  });

  document.querySelector('#summaryTotalPrice').textContent =
    mainLogic.calculateCartTotalWithdiscountAndShipping() + '$';
}

export function changeShippingFee(fee) {
  document.querySelectorAll('#shippingFees').forEach((nodeElement) => {
    nodeElement.style.fontSize = '14px';
    nodeElement.textContent =
      fee !== 0 ? parseInt(fee).toFixed(2) + '$' : 'Free';
  });

  document.querySelectorAll('#summaryTotalAmount').forEach((nodeElement) => {
    nodeElement.textContent =
      mainLogic.calculateCartTotalWithdiscountAndShipping() + '$';
  });

  document.querySelector('#summaryTotalPrice').textContent =
    mainLogic.calculateCartTotalWithdiscountAndShipping() + '$';
}

// checkout.html payment section address to ship to
export function autoFillShippingMethodSection() {
  //

  let fee = sessionStorage.getItem('shippingFee');
  changeShippingFee(fee);

  // get where to ship from localStorage or sessionStorage
  if (localStorage.getItem('shipTo')) {
    let parsedAddress = JSON.parse(localStorage.getItem('shipTo'));

    document.querySelector('#emailOrPhoneNumber').textContent =
      parsedAddress.emailOrPhone;

    document.querySelector('#addressToShipTo').textContent = `${
      parsedAddress.address
    }, ${parsedAddress.secAddress ? parsedAddress.secAddress + ',' : ''} ${
      parsedAddress.zipCode
    }, ${parsedAddress.city}, ${parsedAddress.country}`;
  } else if (sessionStorage.getItem('shipTo')) {
    let parsedAddress = JSON.parse(sessionStorage.getItem('shipTo'));

    document.querySelector('#emailOrPhoneNumber').textContent =
      parsedAddress.emailOrPhone;

    document.querySelector('#addressToShipTo').textContent = `${
      parsedAddress.address
    }, ${parsedAddress.secAddress ? parsedAddress.secAddress + ',' : ''} ${
      parsedAddress.zipCode
    }, ${parsedAddress.city}, ${parsedAddress.country}`;
  }
}

//checkout.html show shipping information section
export function showShippingInformationSection() {
  let htmlTemplate = `<div id="addressSection">
  <h5>Contact information</h5>
  <div class="form-group">
    <div class="my-2">
      <input
        type="text"
        class="form-control mt-3"
        id="emailOrPhone"
        placeholder="Email or mobile phone number"
      />
      <span class="d-none text-danger emailWarningText"
        >Enter an email or mobile phone number</span
      >
    </div>
    <div class="d-flex">
      <input class="mx-2 my-1" type="checkbox" name="subscribed" id="subscribed" />
      <label for="subscribed" class="text-black-50 text-14 custom-cursor m-0"
      >Keep me up to date on news and exclusive offers</label>
    </div>   
    
  </div>

  <div>
    <h5>Shipping address</h5>
    <div class="row my-3">
      <div class="col-12 col-md-6 mb-3 mb-md-0">
        <input
          type="text"
          name=""
          id="FirstName"
          class="form-control"
          placeholder="First name (optional)"
        />
      </div>
      <div class="col-12 col-md-6">
        <input
          type="text"
          name=""
          id="LastName"
          class="form-control"
          placeholder="Last name"
        />
        <span class="d-none text-danger lastNameWarningText"
          >Enter a last name</span
        >
      </div>
    </div>
    <input
      type="text"
      name=""
      id="Address"
      class="form-control mt-3"
      placeholder="Address"
    />
    <span class="d-none text-danger addressWarningText"
      >Enter an Address</span
    >
    <input
      type="text"
      name=""
      id="secAddress"
      class="form-control my-3"
      placeholder="Apartment, suite, etc. (optional)  "
    />
    <div class="row my-3">
      <div class="col-12 col-md-6 mb-3 mb-md-0">
        <input
          type="text"
          name=""
          id="zipCode"
          class="form-control"
          placeholder="Postal code"
        />
        <span class="d-none text-danger zipCodeWarningText"
          >Enter a ZIP / postal code</span
        >
      </div>
      <div class="col-12 col-md-6">
        <input
          type="text"
          name=""
          id="City"
          class="form-control"
          placeholder="City"
        />
        <span class="d-none text-danger cityWarningText"
          >Enter a City</span
        >
      </div>
    </div>
    <div class="position-relative my-3">
      <label
        for=""
        class="position-absolute pl-2 text-black-50 text-14"
        >country/region</label
      >
      <select
        class="w-100 form-control h-auto pt-4 pl-2"
        name=""
        id="countries"
      >
        <option disabled="disabled" value="---">---</option>
      </select>
    </div>
    <div class="form-group d-flex">    
      <input
        class="my-1 mx-2 custom-cursor"
        type="checkbox"
        name=""
        id="SaveForNextTime"
      />
      <label for="SaveForNextTime" class="text-black-50 text-14 custom-cursor"
        >Save this information for next time</span
      >
    </div>
  </div>
</div>`;

  document.querySelector('#dynamicSection').innerHTML = '';
  document
    .querySelector('#dynamicSection')
    .insertAdjacentHTML('afterbegin', htmlTemplate);
}

//checkout.html show shipping Method section
export function showShippingMethod() {
  let index = 0;
  let checkedIndex = 0;
  let shippingMethods = dataBaseHandler
    .getShippingMethods()
    .map((shippingMethod) => {
      // check if a shipping method was already selected
      if (sessionStorage.getItem('shippingFee')) {
        checkedIndex = dataBaseHandler.getShippingIndex(
          sessionStorage.getItem('shippingFee')
        );
      }

      let checkedOrNot = index === checkedIndex ? 'checked' : '';
      let partialHtmlTemplate = `<div class="p-3 border rounded mb-3 d-flex" id='shippingMethods'>
        <div class="custom-control custom-radio">
         <input type="radio" id="shippingMethod-${index}" name="shippingMethod" class="custom-control-input custom-cursor" ${checkedOrNot}>
        <label class="custom-control-label custom-cursor" for="shippingMethod-${index}">${
        shippingMethod[0]
      }</label>
      </div>
        <span class="font-weight-bold ml-auto" id='shippingFee-${index}'>${
        shippingMethod[1] === 0 ? 'Free' : shippingMethod[1] + '$'
      }</span>
      </div>`;
      index++;
      return partialHtmlTemplate;
    });

  let htmlTemplate = `<div id="shippingSection">
  <div class="p-3 border rounded text-14">
    <div class="d-flex">
      <span>
        <span class="mr-5 text-muted">Contact</span>
        <span class="d-block d-md-inline-block mt-1" id="emailOrPhoneNumber"></span>
      </span>      
      <span
        class="ml-auto custom-cursor ml-3"
        id="changeEmailOrPhone"
        style="color: #1990c6;"
        >Change</span
      >
    </div>

    <hr />
    <div class="d-flex">
    <span>
      <span class="mr-5 text-muted">Ship to</span>
      <span class="d-block d-md-inline-block mt-1" id="addressToShipTo"></span>
    </span>
      
      <span
        class="ml-auto custom-cursor ml-3"
        id="changeShippingAddress"
        style="color: #1990c6;"
        >Change</span
      >
    </div>
  </div>

  <h4 class="mb-3 mt-5">Shipping method</h4>

  ${shippingMethods.join('')}
</div>`;

  document.querySelector('#dynamicSection').innerHTML = '';
  document
    .querySelector('#dynamicSection')
    .insertAdjacentHTML('afterbegin', htmlTemplate);

  //Display the shipping amount and add event listener to shipping radio buttons
  setTimeout(() => {
    let fee = mainLogic.getShippingFees();
    sessionStorage.setItem('shippingFee', fee);
    changeShippingFee(fee);
    document.querySelectorAll('input[type = radio]').forEach((radioButton) => {
      radioButton.addEventListener('change', () => {
        fee = mainLogic.getShippingFees();
        sessionStorage.setItem('shippingFee', fee);
        changeShippingFee(fee);
      });
    });
  }, 10);
}

export function showPaymentSection() {
  let htmlTemplate = `<div id="paymentSection">
  <div class="p-3 border rounded text-14">
    <div class="d-flex">
      <span>
        <span class="mr-5 text-muted">Contact</span>
        <span class="d-block d-md-inline-block mt-1" id="emailOrPhoneNumber"></span>
      </span>
      <span
        class="ml-auto custom-cursor ml-3"
        id="changeEmailOrPhone"
        style="color: #1990c6;"
        >Change</span
      >
    </div>

    <hr />
    <div class="d-flex">
    <span>
      <span class="mr-5 text-muted">Ship to</span>
      <span class="d-block d-md-inline-block mt-1" id="addressToShipTo"></span>
    </span>      
      <span
        class="ml-auto custom-cursor ml-3"
        id="changeShippingAddress"
        style="color: #1990c6;"
        >Change</span
      >
    </div>

    <hr />
    <div class="d-flex">
    <span>
      <span class="mr-5 text-muted">Method</span>
      <span class="d-block d-md-inline-block mt-1" id="methodOfShipping"></span>
    </span>
      
      <span
        class="ml-auto custom-cursor ml-3"
        id="changeShippingMethod"
        style="color: #1990c6;"
        >Change</span
      >
    </div>
  </div>

  <h4 class="mb-3 mt-5">Payment</h4>

  <div class="p-3 border rounded bg-light">
    <img
      src="https://scdplumbing.co.uk/wp-content/uploads/2019/02/paypal.png"
      alt=""
      class="img-fluid"
    />
    <div class="row my-3">
      <div class="col-12 col-md-6 mb-3">
        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text">
              <img
                width="20"
                height="20"
                src="https://image.flaticon.com/icons/svg/1828/1828439.svg"
              />
            </span>
          </div>
          <input
            type="text"
            class="form-control"
            id="creditCardOwner"
            placeholder="Owner's name"
          />
        </div>
        <span class="d-none text-danger cardNameWarningText"
        >Enter owner full name</span>
      </div>
      <div class="col-12 col-md-6">
        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text">
              <img
                width="20"
                height="20"
                src="https://image.flaticon.com/icons/svg/2922/2922931.svg"
              />
            </span>
          </div>
          <input
            type="text"
            class="form-control"
            id="creditCardNumber"
            placeholder="Credit card number"
          />
        </div>
        <span class="d-none text-danger cardNumberWarningText"
        >Enter card number</span>
      </div>
    </div>
    <div class="row my-3">
      <div class="col-12 col-md-6 mb-3">
        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text">
              <img
                width="20"
                height="20"
                src="https://image.flaticon.com/icons/svg/2370/2370264.svg"
              />
            </span>
          </div>
          <input
            type="month"
            class="form-control"
            id="creditCardExpDate"
            placeholder="Exp date"
          />          
        </div>
        <span class="d-none text-danger cardDateWarningText"
        >Enter card exp date</span>
      </div>
      <div class="col-12 col-md-6 mb-3">
        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text">
              <img
                width="20"
                height="20"
                src="https://image.flaticon.com/icons/svg/962/962805.svg"
                class="loaded"
              />
            </span>
          </div>
          <input
            type="text"
            class="form-control"
            id="creditCardCVV"
            placeholder="CVV"
          />
        </div>
        <span class="d-none text-danger cardCvvWarningText"
        >Enter card CVV</span>
      </div>

      <div class="col-12 d-flex">
        <input class="mr-2 my-1" type="checkbox" name="" id="saveCard" />
        <label class="text-black-50 text-14"
        >Save Credit Card information for next time</label>
    </div>
      
    </div>
  </div>
</div>`;

  document.querySelector('#dynamicSection').innerHTML = '';
  document
    .querySelector('#dynamicSection')
    .insertAdjacentHTML('afterbegin', htmlTemplate);

  // format the credit card using payment.js npm package
  Payment.formatCardNumber(document.querySelector('#creditCardNumber'));
  Payment.formatCardCVC(document.querySelector('#creditCardCVV'));

  autofillCreditCardInfos();
}

export function autoFillPaymentInfosSection() {
  // get where to ship from localStorage or sessionStorage
  if (localStorage.getItem('shipTo')) {
    let parsedAddress = JSON.parse(localStorage.getItem('shipTo'));

    document.querySelector('#emailOrPhoneNumber').textContent =
      parsedAddress.emailOrPhone;

    document.querySelector('#addressToShipTo').textContent = `${
      parsedAddress.address
    }, ${parsedAddress.secAddress ? parsedAddress.secAddress + ',' : ''} ${
      parsedAddress.zipCode
    }, ${parsedAddress.city}, ${parsedAddress.country}`;
  } else if (sessionStorage.getItem('shipTo')) {
    let parsedAddress = JSON.parse(sessionStorage.getItem('shipTo'));

    document.querySelector('#emailOrPhoneNumber').textContent =
      parsedAddress.emailOrPhone;

    document.querySelector('#addressToShipTo').textContent = `${
      parsedAddress.address
    }, ${parsedAddress.secAddress ? parsedAddress.secAddress + ',' : ''} ${
      parsedAddress.zipCode
    }, ${parsedAddress.city}, ${parsedAddress.country}`;
  }

  document.querySelector(
    '#methodOfShipping'
  ).textContent = dataBaseHandler.getShippingMethodName(
    sessionStorage.getItem('shippingFee')
  );
}

export function autofillCreditCardInfos() {
  if (
    localStorage.getItem('cardInfos') ||
    sessionStorage.getItem('cardInfos')
  ) {
    let card =
      JSON.parse(localStorage.getItem('cardInfos')) ??
      JSON.parse(sessionStorage.getItem('cardInfos'));
    document.querySelector('#creditCardOwner').value = card.name;
    document.querySelector('#creditCardNumber').value = card.number;
    document.querySelector('#creditCardExpDate').value = card.expMonth;
    document.querySelector('#creditCardCVV').value = card.cvv;
    document.querySelector('#saveCard').checked = card.saved;
  }
}

export function changeBottomRowBtn() {
  if (sessionStorage.getItem('currentPage') === 'checkoutPage/shippingMethod') {
    //return btn
    let returnBtn = document.querySelector('#returnBtnSection')
      .firstElementChild;
    returnBtn.innerHTML = '&#60; Return to information';
    returnBtn.id = 'ReturnToInformationBtn';

    //continue btn
    let continueBtn = document.querySelector('#continueBtnSection')
      .firstElementChild;
    continueBtn.textContent = 'Continue to payment';
    continueBtn.id = 'ContinueToPayment';

    //TODO change bradCrumb
    document
      .querySelector('#placement')
      .childNodes.forEach((elementNode, index) => {
        // if (elementNode.classList.contains('active')) {
        //   alert('im here');
        // }
        if (elementNode.nodeName !== '#text') {
          if (elementNode.classList.contains('active')) {
            elementNode.classList.remove('active');
          } else if (index === 5) {
            // 5 is the index of the element in the breadCrumb bar
            elementNode.classList.add('active');
          }
        }
      });
  } else if (
    sessionStorage.getItem('currentPage') === 'checkoutPage/paymentPage'
  ) {
    let returnBtn = document.querySelector('#returnBtnSection')
      .firstElementChild;
    returnBtn.innerHTML = '&#60; Return to shipping method';
    returnBtn.id = 'ReturnToInShippingMethodBtn';

    //continue btn
    let continueBtn = document.querySelector('#continueBtnSection')
      .firstElementChild;
    continueBtn.textContent = 'Checkout';
    continueBtn.id = 'checkout';

    //TODO change bradCrumb
    document
      .querySelector('#placement')
      .childNodes.forEach((elementNode, index) => {
        // if (elementNode.classList.contains('active')) {
        //   alert('im here');
        // }
        if (elementNode.nodeName !== '#text') {
          if (elementNode.classList.contains('active')) {
            elementNode.classList.remove('active');
          } else if (index === 7) {
            //7 is the index of the last item in the breadCrumb bar
            elementNode.classList.add('active');
          }
        }
      });
  }
}
