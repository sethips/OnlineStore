import * as mainLogic from './mainLogic';
import * as dataBaseHandler from './DataBaseHandler';

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
    ${arr[0]}$</span> <span class="mx-2">-</span>`;
    priceHtmlTemplate += `<span class="money h2 text-info">
    ${arr[arr.length - 1]}$</span>`;
  } else {
    priceHtmlTemplate += `<span class="money h2 text-info">
    ${arr[0]} $</span>`;
  }
  return priceHtmlTemplate;
}

//get price for each color
function getPriceForEachColor(priceArr) {
  if (priceArr.length > 1) {
    return `<div class="d-flex align-items-center my-4">
              <span class="money h2 text-info itemPrice">${priceArr[0]}$</span>
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
function getVisitorsRightNow() {
  let count = getRandomNumber(20, 100);
  setInterval(function () {
    var variation = getRandomNumber(-5, 5);

    count += variation;
    document.querySelector('.visitorsCount').textContent = count;
  }, 2000);
  return 'wait';
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

//start Countdown Timer and display Hours, display Minutes, display Secondes
export function startTimer(
  durationInSec,
  daysDomEl,
  hoursDomEl,
  minutesDomEl,
  secondsDomEl
) {
  let hours, minutes, seconds;
  setInterval(function () {
    hours = Math.floor(durationInSec / 3600);
    minutes = Math.floor((durationInSec % 3600) / 60);
    seconds = durationInSec % 60;

    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    //display the countDown To DomElements
    hoursDomEl.textContent = hours;
    minutesDomEl.textContent = minutes;
    secondsDomEl.textContent = seconds;

    //show dom elements
    daysDomEl.classList.remove('text-white');
    hoursDomEl.classList.remove('text-white');
    minutesDomEl.classList.remove('text-white');
    secondsDomEl.classList.remove('text-white');

    if (--durationInSec < 0) {
      durationInSec = duration;
    }
  }, 1000);
}

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

//--------
export function CreatProductTemplate(product) {
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
                                      <h1 class="my-3 FontSize28">${
                                        product.name
                                      }</h1>
                                      <p class="my-3">
                                        <span class="money h2 text-info">${getPrice(
                                          product.price
                                        )}</span>
                                      </p>
                                      <p class="my-3">
                                        <span class="text-danger font-weight-bold"><img src="//cdn.shopify.com/s/files/1/0102/4383/3952/files/flash_15x.png?v=1575378962" alt="fire sale" class="flash"> ${getRandomNumber(
                                          5,
                                          30
                                        )} sold in last ${getRandomNumber(
    1,
    24
  )} hours</span>
                                      </p>
                                      <p class="my-3" style="font-size: 14px;">
                                      ${product.ShortDescription}
                                      </p>
                                      <div class="text-center my-3">
                                        <p class="font-weight-bold mb-0">
                                          HURRY! ONLY <span class="number text-info">${fixedRandomNumber}</span> LEFT IN
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
                                      <div
                                        class="time d-none d-lg-flex justify-content-around w-100 my-3"
                                      >
                                        <div class="d-flex flex-column align-items-center">
                                          <span class="time-day days text-white" style="font-size: 40px;">0</span
                                          ><span>DAYS</span>
                                        </div>
                                        <div class="d-flex flex-column align-items-center">
                                          <span class="time-day hours text-white" style="font-size: 40px;">00</span
                                          ><span>HOURS</span>
                                        </div>
                                        <div class="d-flex flex-column align-items-center">
                                          <span class="time-minutes minutes text-white" style="font-size: 40px;">00</span
                                          ><span>MINUTES</span>
                                        </div>
                                        <div class="d-flex flex-column align-items-center">
                                          <span class="time-seconds seconds text-white" style="font-size: 40px;">00</span
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
                                          <button class="btn btn-light btn-sm input-group-text px-2 custom-cursor product-count"
                                          id="decrease-1">-</button>
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
                                          <button class="btn btn-light btn-sm input-group-text px-2 custom-cursor product-count" id="increase-1">+</button>
                                        </div>
                                      </div>

                                      <!-- cart buttons -->
                                      <button
                                        type="button"
                                        name=""
                                        id="cartButton"
                                        class="btn black-bg text-white btn-block"
                                      >
                                        ADD TO CART
                                      </button>
                                      <button
                                        type="button"
                                        name=""
                                        id=""
                                        class="btn bg-info text-white btn-block"
                                      >
                                        BUY IT NOW
                                      </button>

                                      <!-- shipping estimates -->
                                      <div class="mt-5 mb-4">
                                        <span class="font-weight-bold" style="font-size: 15px;"
                                          >Order in the next
                                          <span
                                            class="bg-info px-2 py-1 text-white rounded shadow-sm mb-5"
                                            >${optimalOrderDate()}</span
                                          >
                                          to get it by <span class="time">${getDeliveryDate(
                                            15
                                          )}</span>
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
                                          Vendor: <span class="vendor">${
                                            product.Vendor
                                          }</span></span
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
                                          <span
                                            class="bg-info pl-2 pr-1 py-1 mr-1 rounded shadow-sm mb-5"
                                            >
                                            <span class="text-white visitorsCount">${getVisitorsRightNow()}</span>
                                            <i class="fa fa-bolt text-white pl-1" aria-hidden="true"
                                            ></i>
                                            </span
                                          >
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
                                    <li class="nav-item custom-nav">
                                      <a
                                        class="nav-link active"
                                        id="Description-tab"
                                        data-toggle="tab"
                                        href="#Description"
                                        role="tab"
                                        aria-controls="Description"
                                        aria-selected="true"
                                        >Description</a
                                      >
                                    </li>
                                    <li class="nav-item custom-nav">
                                      <a
                                        class="nav-link"
                                        id="Additional-Information-tab"
                                        data-toggle="tab"
                                        href="#Additional-Information"
                                        role="tab"
                                        aria-controls="Additional-Information"
                                        aria-selected="false"
                                        >Additional-Information</a
                                      >
                                    </li>
                                    <li class="nav-item custom-nav">
                                      <a
                                        class="nav-link"
                                        id="Reviews-tab"
                                        data-toggle="tab"
                                        href="#Reviews"
                                        role="tab"
                                        aria-controls="Reviews"
                                        aria-selected="false"
                                        >Reviews</a
                                      >
                                    </li>
                                    <li class="nav-item custom-nav">
                                      <a
                                        class="nav-link"
                                        id="Shipping-Delivery-tab"
                                        data-toggle="tab"
                                        href="#Shipping-Delivery"
                                        role="tab"
                                        aria-controls="Shipping-Delivery"
                                        aria-selected="false"
                                        >Shipping-Delivery</a
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
                                        <div class="col-sm-12 col-md-6 ml-sm-4 ml-md-0">
                                          <div class="firstWrapper" id="#description">
                                            ${getDescription(
                                              product.description
                                            )}
                                          </div>
                                        </div>
                                        <div class="col-sm-12 col-md-6 px-0">
                                          <!-- product carousel -->
                                          <div class="row w-100 mx-0 w-100">
                                            <h5
                                              class="font-weight-bold pl-4 mb-0"
                                              style="font-size: 18px;"
                                            >
                                              SHOP THE LOOK
                                            </h5>
                                            <div class="col-12 w-100 p-0">
                                              <div
                                                id="myCarousel"
                                                class="carousel slide"
                                                data-ride="carousel"
                                                data-interval="0"
                                              >
                                                <!-- Carousel indicators -->
                                                <ol class="carousel-indicators">
                                                  <li
                                                    data-target="#myCarousel"
                                                    data-slide-to="0"
                                                    class="active"
                                                  ></li>
                                                  <li data-target="#myCarousel" data-slide-to="1"></li>
                                                </ol>
                                                <!-- Wrapper for carousel items -->
                                                <div class="carousel-inner">
                                                  <div class="item carousel-item active h-auto pt-3 pb-5">
                                                    <div class="row w-100 mx-0 px-3">
                                                      <div class="col-6 px-1">
                                                        <div class="img-box my-3">
                                                          <img
                                                            src="https://cdn.shopify.com/s/files/1/0102/4383/3952/products/accessories-21_1_1a51cd0d-6911-4536-af1c-1a475b3792a6_1512x.jpg"
                                                            class="img-fluid h-auto"
                                                            alt=""
                                                          />
                                                        </div>
                                                      </div>
                                                      <div class="col-6 px-1">
                                                        <div class="img-box my-3">
                                                          <img
                                                            src="https://cdn.shopify.com/s/files/1/0102/4383/3952/products/accessories-14_9e7e1119-5ef5-437f-b1c9-959d06f85d3c_1728x.jpg"
                                                            class="img-fluid h-auto"
                                                            alt=""
                                                          />
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                  <div class="item carousel-item h-auto pt-3 pb-5">
                                                    <div class="row w-100 mx-0 px-3">
                                                      <div class="col-6 px-1">
                                                        <div class="img-box my-3">
                                                          <img
                                                            src="https://cdn.shopify.com/s/files/1/0102/4383/3952/products/accessories-23_421d7906-0b30-4ab1-8f01-392a1419ad6f_1728x.jpg"
                                                            class="img-fluid h-auto"
                                                            alt=""
                                                          />
                                                        </div>
                                                      </div>
                                                      <div class="col-6 px-1">
                                                        <div class="img-box my-3">
                                                          <img
                                                            src="https://cdn.shopify.com/s/files/1/0102/4383/3952/products/accessories-16_64fd0422-07ec-4407-b434-a573bbdf3300_1728x.jpg"
                                                            class="img-fluid h-auto"
                                                            alt=""
                                                          />
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                                <!-- Carousel controls -->
                                                <!-- <a class="carousel-control left carousel-control-prev" href="#myCarousel" data-slide="prev">
                                                      <i class="fa fa-angle-left"></i>
                                                  </a>
                                                  <a class="carousel-control right carousel-control-next" href="#myCarousel" data-slide="next">
                                                      <i class="fa fa-angle-right"></i>
                                                  </a> -->
                                              </div>
                                            </div>
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
                                      <div class="w-100 h-100 d-flex justify-content-center py-5">
                                        <h4 class="mr-4">Color:</h4>
                                        <h4>Products Colors Here</h4>
                                      </div>
                                    </div>
                                    <div
                                      class="tab-pane fade"
                                      id="Reviews"
                                      role="tabpanel"
                                      aria-labelledby="Reviews-tab"
                                    >
                                      <div class="w-100 h-100 d-flex flex-column text-center py-5">
                                        <h4>There are no reviews</h4>
                                        <h4>
                                          Be the first to <span class="text-warning">Write a review</span>
                                        </h4>
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
                                            Vestibulum curae torquent diam diam commodo parturient
                                            penatibus nunc dui adipiscing convallis bulum parturient
                                            suspendisse parturient a.Parturient in parturient scelerisque
                                            nibh lectus quam a natoque adipiscing a vestibulum hendrerit
                                            et pharetra fames.Consequat net Vestibulum parturient
                                            suspendisse parturient a.Parturient in parturient scelerisque
                                            nibh lectus quam a natoque adipiscing a vestibulum hendrerit
                                            et pharetra fames.Consequat netus. Scelerisque adipiscing
                                            bibendum sem vestibulum et in a a a purus lectus faucibus
                                            lobortis tincidunt purus lectus nisl class eros.Condimentum a
                                            et ullamcorper dictumst mus et tristique elementum nam
                                            inceptos hac vestibulum amet elit
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>`;

  return productSectionTemplate;
}

//--------
export function creatCartPageTemplate() {
  let cartContent = mainLogic.getCartContent();
  let cartPageTemplate = '';
  let increaseDecreaseIndex = 1;

  for (const product of cartContent) {
    let productPicture = dataBaseHandler.getProductMainPic(product.product_id);
    cartPageTemplate += `
                          <tr class="d-flex flex-column d-lg-table-row bg-light top-buffer" id="row-${product.cart_id}">
                            <td class="d-none d-lg-table-cell align-middle">
                              <button
                                type="button"
                                class="close text-danger border border-danger rounded-circle closeBtn"
                                aria-label="Close"
                                id="closeBtn-${product.cart_id}"
                                style="width: 25px; height: 25px; outline: none;"
                              >
                                <span class="closeBtn" aria-hidden="true">&times;</span>
                              </button>
                            </td>
                            <td class="align-middle">
                              <button
                                type="button"
                                class="close text-danger d-lg-none border border-danger rounded-circle closeBtn"
                                aria-label="Close"
                                id="closeBtn-${product.cart_id}"
                                style="width: 25px; height: 25px; outline: none;"
                              >
                                <span class="closeBtn" aria-hidden="true">&times;</span>
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
                                ><span class="ml-auto">${product.product_name}</span>
                              </div>
                              <span class="d-none d-lg-block">${product.product_name} </span>
                              <span class="d-block text-muted text-right text-lg-left small">Color: ${product.product_color}</span>
                              <span class="d-block text-muted text-right text-lg-left small">Size: ${product.product_size}</span>
                            </td>
                            <td class="align-middle">
                              <div class="d-flex d-lg-none">
                                <span class="text-uppercase">price:</span>
                                <span class="ml-auto unit-price-${increaseDecreaseIndex}">${product.unit_price}$</span>
                              </div>
                              <span class="d-none d-lg-block unit-price-${increaseDecreaseIndex}">${product.unit_price}$</span>
                            </td>
                            <td class="align-middle">
                              <div class="d-flex d-lg-none">
                                <span class="text-uppercase">Quantity:</span>
                                <div class="input-group ml-auto" style="width: 100px;">
                                  <div class="input-group-prepend">
                                    <button
                                      class="btn btn-light btn-sm input-group-text px-2 custom-cursor product-count cart-${product.cart_id}"
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
                                      class="btn btn-light btn-sm input-group-text px-2 custom-cursor product-count cart-${product.cart_id}"
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
                                    class="btn btn-light btn-sm input-group-text px-2 custom-cursor product-count cart-${product.cart_id}"
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
                                    class="btn btn-light btn-sm input-group-text px-2 custom-cursor product-count cart-${product.cart_id}"
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
                                <span class="ml-auto totalPrice-${increaseDecreaseIndex}">${product.product_price}$</span>
                              </div>
                              <span class="d-none d-lg-block totalPrice-${increaseDecreaseIndex}">${product.product_price}$</span>
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

//display cart total in the cart.html
export function displayCartTotal(totalAmount) {
  document.querySelector('#subtotal').textContent = totalAmount + '$';
  document.querySelector('#total').textContent = totalAmount + '$';
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

    document.querySelector('#total').textContent = total + '$';
  }

  // cart bottom section calculate the free shipping option
  if (totalAmount <= 1000) {
    document.querySelector('.progress').style.display = 'flex';
    document.querySelector('.free_shipping').style.display = 'none';
    document.querySelector('.remaining_free_shipping').style.display = 'block';
    document.querySelector('.amount_to_spend').textContent =
      1000 - totalAmount + '$';

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

  discountAmount.textContent = '-' + discountTotal + '$';
  document.querySelector('#total').textContent =
    mainLogic.calculateCartTotal() - discountTotal + '$';
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
export function showEmptyCartPage() {
  document.querySelector('#fullCart').classList.add('d-none');
  document.querySelector('#emptyCart').classList.remove('d-none');
  document.querySelector('#emptyCart').classList.add('d-flex');
}

// auto fill user address if already in localStorage or sessionStorage
// Checkout.html address Section
export function autoFillAddress(addressToShipTo) {
  document.querySelector('#emailOrPhone').value = addressToShipTo.emailOrPhone;
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
}

// Checkout.html page summarySection
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
    <span>${cartItem.product_price}$</span>
  </span>
</div>
`;

  document.querySelectorAll('#summarySection').forEach((nodeElement) => {
    nodeElement.insertAdjacentHTML('beforeend', templateString);
  });
}

// Checkout.html page summarySection
export function displaySummaryTotal() {
  // first check if discount code was submitted
  let discountPart = '';
  if (sessionStorage.getItem('discount')) {
    discountPart = `<div class="d-flex py-1">
    <span class="text-14 text-muted">discount</span>
    <span class="ml-auto text-14">- ${mainLogic.calculateDiscountTotal(
      sessionStorage.getItem('discount')
    )}$</span>
  </div>`;
  }

  // -------
  let templateString = `<hr />
  <div class="d-flex py-1">
    <span class="text-14 text-muted">Subtotal</span>
    <span class="ml-auto text-14">${mainLogic.calculateCartTotal()}$</span>
  </div>
  ${discountPart}
  <div class="d-flex py-1">
    <span class="text-14 text-muted">Shipping</span>
    <span class="ml-auto" style="font-size: 12px">Calculated at next step</span>
  </div>
  <hr />
  <div class="d-flex">
    <span class="text-14">Total</span>
    <span class="ml-auto"
      ><span class="mr-3 text-muted" style="font-size: 12px;"
        >USD</span
      >${
        discountPart !== ''
          ? mainLogic.calculateCartTotal() -
            mainLogic.calculateDiscountTotal(sessionStorage.getItem('discount'))
          : mainLogic.calculateCartTotal()
      }$</span
    >`;

  // document
  //   .querySelector('#summarySection')
  //   .insertAdjacentHTML('beforeend', templateString);

  document.querySelectorAll('#summarySection').forEach((nodeElement) => {
    nodeElement.insertAdjacentHTML('beforeend', templateString);
  });

  document.querySelector('#summaryTotalPrice').textContent =
    discountPart !== ''
      ? mainLogic.calculateCartTotal() -
        mainLogic.calculateDiscountTotal(sessionStorage.getItem('discount')) +
        '$'
      : mainLogic.calculateCartTotal() + '$';
}
