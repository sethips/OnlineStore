export function displayProduct(product) {
  let pageTemplate = `<!-- main section -->
    <div class="container">
      <div class="row">
        <div class="col-sm-12 col-md-6 mb-5">
          <div class="row">
            <div class="col-3 order-sm-2 order-lg-1"></div>
            <div class="col-12 col-lg-9 order-sm-1 order-lg-2">
              <div class="card border-0">
                <img src="${product.pictures[0]}" class="img-fluid" alt="" />
              </div>
            </div>
          </div>
        </div>
    
        <!-- title and description -->
        <div class="col-sm-12 col-md-6 px-4">
          <h1 class="my-3 FontSize28">${product.name}</h1>
          <p class="my-3">
            <span class="money h2 text-info">${product.price}</span>
          </p>
          <p class="my-3">
            <span class="text-danger"> 11 sold in last 15 hours</span>
          </p>
          <p class="my-3" style="font-size: 14px;">
            MUS ADIPISCING NISL Condimentum mi curae adipiscing a viverra id vel
            curae nec parturient elementum pharetra ante a orci a ad praesent
            himenaeos ultrices conubia a maecenas.A nisi elementum fringilla
            sodales...
          </p>
          <div class="text-center my-3">
            <p class="font-weight-bold mb-0">
              HURRY! ONLY <span class="number text-info">15</span> LEFT IN STOCK.
            </p>
    
            <!-- progress bar -->
            <div class="progress rounded-0 mb-3" style="height: 10px;">
              <div
                class="progress-bar progress-bar-striped progress-bar-animated bg-info"
                role="progressbar"
                style="width: 25%;"
                aria-valuenow="25"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
          </div>
    
          <!-- timer -->
          <div class="time d-none d-lg-flex justify-content-around w-100 my-3">
            <div class="d-flex flex-column align-items-center">
              <span class="time-day" style="font-size: 40px;">0</span
              ><span>DAYS</span>
            </div>
            <div class="d-flex flex-column align-items-center">
              <span class="time-day" style="font-size: 40px;">00</span
              ><span>HOURS</span>
            </div>
            <div class="d-flex flex-column align-items-center">
              <span class="time-minutes" style="font-size: 40px;">50</span
              ><span>MINUTES</span>
            </div>
            <div class="d-flex flex-column align-items-center">
              <span class="time-seconds" style="font-size: 40px;">00</span
              ><span>SECONDS</span>
            </div>
          </div>
    
          <!-- color section -->
          <div class="d-flex align-items-center my-4">
            <span>Color: </span>
            <div
              class="pb-1 ml-3"
              style="border-bottom: solid 2px ${product.color[0]};"
            >
              <div
                class="rounded-circle"
                style="width: 25px; height: 25px; background-color: ${
                  product.color[0]
                };"
              ></div>
            </div>
          </div>
    
          <!-- number of items -->
          <div class="input-group w-25 my-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon1">-</span>
            </div>
            <input
              type="text"
              class="form-control text-center"
              placeholder=""
              aria-label=""
              aria-describedby="basic-addon1"
              value="1"
            />
            <div class="input-group-append">
              <span class="input-group-text" id="basic-addon1">+</span>
            </div>
          </div>
    
          <!-- cart buttons -->
          <button
            type="button"
            name=""
            id=""
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
            ADD TO CART
          </button>
    
          <!-- shipping estimates -->
          <div class="mt-5 mb-4">
            <span class="font-weight-bold" style="font-size: 15px;"
              >Order in the next
              <span class="bg-info px-2 py-1 text-white rounded shadow-sm mb-5"
                >1 hours 1 minutes</span
              >
              to get it by <span class="time">Monday 06/29/2020</span>
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
              <span class="bg-info px-2 py-1 text-white rounded shadow-sm mb-5"
                >66</span
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
                <h5 class="mb-4 font-weight-bold" style="font-size: 18px;">
                  ${product.description.title - 1}
                </h5>
                <p style="font-size: 14px;">
                  ${product.description.p - (1)[0]}
                </p>
    
                <p style="font-size: 14px;">
                  ${product.description.p - (1)[1]}
                </p>
    
                <h5 class="my-4 font-weight-bold" style="font-size: 18px;">
                  ${product.description.title - 2}
                </h5>
    
                <p style="font-size: 14px;">
                  ${product.description.p - (2)[0]}
                </p>
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
            <h4>Color:</h4>
            <h4>${product.color[0]}</h4>
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
    </div>
    `;

  console.log(pageTemplate);
}
