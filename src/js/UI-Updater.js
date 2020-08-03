import * as mainLogic from './mainLogic';
import * as dataBaseHandler from './DataBaseHandler';
import Payment from 'payment';

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
              <span class="time-day days text-white" style="font-size: 40px;"
                >0</span
              ><span>DAYS</span>
            </div>
            <div class="d-flex flex-column align-items-center">
              <span class="time-day hours text-white" style="font-size: 40px;"
                >00</span
              ><span>HOURS</span>
            </div>
            <div class="d-flex flex-column align-items-center">
              <span class="time-minutes minutes text-white" style="font-size: 40px;"
                >00</span
              ><span>MINUTES</span>
            </div>
            <div class="d-flex flex-column align-items-center">
              <span class="time-seconds seconds text-white" style="font-size: 40px;"
                >00</span
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
            id=""
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
                ${getDescription(product.description)}
              </div>
            </div>
            <div class="col-sm-12 col-md-6 px-0">
              <!-- product carousel -->
              <div class="row w-100 mx-0 w-100">
                <h5 class="font-weight-bold pl-4 mb-0" style="font-size: 18px;">
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
                Vestibulum curae torquent diam diam commodo parturient penatibus
                nunc dui adipiscing convallis bulum parturient suspendisse
                parturient a.Parturient in parturient scelerisque nibh lectus quam a
                natoque adipiscing a vestibulum hendrerit et pharetra
                fames.Consequat net Vestibulum parturient suspendisse parturient
                a.Parturient in parturient scelerisque nibh lectus quam a natoque
                adipiscing a vestibulum hendrerit et pharetra fames.Consequat netus.
                Scelerisque adipiscing bibendum sem vestibulum et in a a a purus
                lectus faucibus lobortis tincidunt purus lectus nisl class
                eros.Condimentum a et ullamcorper dictumst mus et tristique
                elementum nam inceptos hac vestibulum amet elit
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>`;

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
            <span class="time-day days text-white" style="font-size: 40px;"
              >0</span
            ><span>DAYS</span>
          </div>
          <div class="d-flex flex-column align-items-center">
            <span class="time-day hours text-white" style="font-size: 40px;"
              >00</span
            ><span>HOURS</span>
          </div>
          <div class="d-flex flex-column align-items-center">
            <span class="time-minutes minutes text-white" style="font-size: 40px;"
              >00</span
            ><span>MINUTES</span>
          </div>
          <div class="d-flex flex-column align-items-center">
            <span class="time-seconds seconds text-white" style="font-size: 40px;"
              >00</span
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
          id=""
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
                              <span class="d-block text-muted text-right text-lg-left small">Size: ${
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

//display cart total in the cart.html
export function displayCartTotal(totalAmount) {
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
