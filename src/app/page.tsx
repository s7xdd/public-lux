import Image from "next/image";

export default function Home() {
  return (
    <>
      <section className="bg-[black] -mt-[100px] p-0 relative h-screen flex items-center justify-center">
        <div className="absolute inset-0 z-0 h-full w-full overflow-hidden">
          <iframe
            src="https://player.vimeo.com/video/998198891?background=1&autoplay=1&muted=1&loop=1&controls=0"
            frameBorder={0}
            allow="autoplay; fullscreen; picture-in-picture"
            // allowFullScreen=""
            className="w-full h-full object-cover transform scale-110"
          />
        </div>
        <div className="relative z-10 text-center text-white px-4 md:px-0">
          <div className="mx-auto pt-[150px]">
            <h1 className="tracking-normal text-[40px] md:text-[40px] font-bold leading-tight md:leading-[40px] mb-4">
              Custom Metal Credit or Debit Cards
            </h1>
            <p className="text-[18px] md:text-[25px] mt-4 font-light leading-relaxed">
              Create your own custom design or choose from one of our bestseller
              designs.
            </p>
            <div className="flex justify-center gap-3 items-center mt-8">
              <a
                href=""
                className="bg-primary text-white border border-primary rounded-full py-[13px] px-[50px] font-regular uppercase hover:bg-[#f0dac6] hover:border-[#f0dac6] hover:text-[#343434]"
              >
                Order Now
              </a>
              <a
                href=""
                className="hidden lg:block !bg-transparent border rounded-full py-[13px] px-[50px] font-regular uppercase hover:bg-[#f0dac6] hover:border-[#f0dac6] hover:text-[#343434]"
              >
                Explore Us
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="background-section">
        <div id="card-menu" className="categories-items menu  py-16  w-full px-0">
          <div className="container mx-auto px-4 pb-[50px] md:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-[40px] font-normal text-[#272727]">
                Our Card Categories
              </h2>
              <p className="section-subtitle text-gray-600 text-lg">
                Explore Our Wide Range of Card Options
              </p>
            </div>
            <div className="mb-4 w-full">
              <ul
                className="cat-tab flex justify-between w-full list-none gap-3"
                id="default-styled-tab"
                data-tabs-toggle="#default-styled-tab-content"
                role="tablist"
                data-stagger-appear="fade-up"

              >
                <li className="flex-1 list-none" role="presentation">
                  <button
                    className="w-full inline-block p-2 border border-[#CCB923] rounded-lg categories-item"
                    id="tab-1-styled-tab"
                    data-tabs-target="#styled-tab-1"
                    type="button"
                    role="tab"
                    aria-controls="styled-tab-1"
                    aria-selected="false"
                  >
                    <div className="card-img categories-item-image-border transition-transform duration-500 hover:scale-105">
                      <img
                        src="./assets/img/cards/brushed silver front 1.png"
                        alt="Black Limited Cards"
                        className="mx-auto"
                      />
                    </div>
                    <h6 className="text-gray-800 mt-2">Black Limited Cards</h6>
                  </button>
                </li>
                <li className="flex-1  list-none" role="presentation">
                  <button
                    className="w-full inline-block p-2 border border-[#CCB923] rounded-lg categories-item"
                    id="tab-2-styled-tab"
                    data-tabs-target="#styled-tab-2"
                    type="button"
                    role="tab"
                    aria-controls="styled-tab-2"
                    aria-selected="false"
                  >
                    <div className="card-img categories-item-image-border transition-transform duration-500 hover:scale-105">
                      <img
                        src="./assets/img/cards/brushed blue front.png"
                        alt="Brushed Black Cards"
                        className="mx-auto"
                      />
                    </div>
                    <h6 className="text-gray-800 mt-2">Brushed Black Cards</h6>
                  </button>
                </li>
                <li className="flex-1  list-none" role="presentation">
                  <button
                    className="w-full inline-block p-2 border border-[#CCB923] rounded-lg categories-item"
                    id="tab-3-styled-tab"
                    data-tabs-target="#styled-tab-3"
                    type="button"
                    role="tab"
                    aria-controls="styled-tab-3"
                    aria-selected="false"
                  >
                    <div className="card-img categories-item-image-border transition-transform duration-500 hover:scale-105">
                      <img
                        src="./assets/img/cards/business_credit_card.png"
                        alt="Brushed Blue Cards"
                        className="mx-auto"
                      />
                    </div>
                    <h6 className="text-gray-800 mt-2">Brushed Blue Cards</h6>
                  </button>
                </li>
                <li className="flex-1  list-none" role="presentation">
                  <button
                    className="w-full inline-block p-2 border border-[#CCB923] rounded-lg categories-item"
                    id="tab-4-styled-tab"
                    data-tabs-target="#styled-tab-4"
                    type="button"
                    role="tab"
                    aria-controls="styled-tab-4"
                    aria-selected="false"
                  >
                    <div className="card-img categories-item-image-border transition-transform duration-500 hover:scale-105">
                      <img
                        src="./assets/img/cards/custom_metal_card.png"
                        alt="Brushed Red Cards"
                        className="mx-auto"
                      />
                    </div>
                    <h6 className="text-gray-800 mt-2">Brushed Red Cards</h6>
                  </button>
                </li>
                <li className="flex-1  list-none" role="presentation">
                  <button
                    className="w-full inline-block p-2 border border-[#CCB923] rounded-lg categories-item"
                    id="tab-5-styled-tab"
                    data-tabs-target="#styled-tab-5"
                    type="button"
                    role="tab"
                    aria-controls="styled-tab-5"
                    aria-selected="false"
                  >
                    <div className="card-img categories-item-image-border transition-transform duration-500 hover:scale-105">
                      <img
                        src="./assets/img/cards/dual_chip_card.png"
                        alt="Gold Cards"
                        className="mx-auto"
                      />
                    </div>
                    <h6 className="text-gray-800 mt-2">Gold Cards</h6>
                  </button>
                </li>
              </ul>
            </div>
            <div
              className="max-w-5xl m-auto pt-[50px]"
              id="default-styled-tab-content"
            >
              {/* Black Limited Cards (Tab 1 Content) */}
              <div
                className="hidden p-4 rounded-lg"
                id="styled-tab-1"
                role="tabpanel"
                aria-labelledby="tab-1-styled-tab"
                data-delay={600}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-[30px]">
                  <div className="rotate-card-container">
                    <div className="rotate-card">
                      <div className="front">
                        <img
                          className="bringer-lazy"
                          src="./assets/img/products/front.jpg"
                          data-src="./assets/img/products/front.jpg"
                          alt="Front Image"
                        />
                      </div>
                      <div className="back">
                        <img
                          src="./assets/img/products/back.jpg"
                          alt="Back Image"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center">
                    <div className="menu-info">
                      <h5 className="text-gray-800 text-xl font-semibold">
                        Dual Chip Cards
                      </h5>
                      <p className="text-gray-600 mt-2">
                        A practical, convenient and secure payment solution offering
                        a world-class range of benefits to help your company control
                        expenses and save money. Make everyday business easier while
                        allowing your executives to enjoy a smoother, safer, and
                        more productive travel and business experience.
                      </p>
                      <div className="flex space-x-2 mt-4">
                        <a
                          href="customize-card.html"
                          className="bg-primary text-white border border-primary rounded-full py-[8px] px-[30px] font-regular uppercase hover:bg-[#f0dac6] hover:border-[#f0dac6] hover:text-[#343434]"
                        >
                          Customize Now
                        </a>
                        <a
                          href="#"
                          className="!bg-transparent border border-black text-black rounded-full py-[8px] px-[30px] font-regular uppercase hover:bg-[#f0dac6] hover:border-[#f0dac6] hover:text-[#343434]"
                        >
                          View Details
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Brushed Black Cards (Tab 2 Content) */}
              <div
                className="hidden p-4 rounded-lg"
                id="styled-tab-2"
                role="tabpanel"
                aria-labelledby="tab-2-styled-tab"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-[30px] h-full items-center">
                  <div className="rotate-card-container">
                    <div className="rotate-card">
                      <div className="front">
                        <img
                          src="./assets/img/products/brushed blue front.jpg"
                          alt="Front Image"
                        />
                      </div>
                      <div className="back">
                        <img
                          src="./assets/img/products/brushed blue back.jpg"
                          alt="Back Image"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center">
                    <div className="menu-info">
                      <h5 className="text-gray-800 text-xl font-semibold">
                        Brushed Black Cards
                      </h5>
                      <p className="text-gray-600 mt-2">
                        These cards feature a sleek brushed finish in black, exuding
                        luxury and exclusivity. Perfect for high-end customers who
                        value sophistication and style.
                      </p>
                      <div className="flex space-x-2 mt-4">
                        <a
                          href="#"
                          className="bg-primary text-white border border-primary rounded-full py-[8px] px-[30px] font-regular uppercase hover:bg-[#f0dac6] hover:border-[#f0dac6] hover:text-[#343434]"
                        >
                          Customize Now
                        </a>
                        <a
                          href="#"
                          className="!bg-transparent border border-black text-black rounded-full py-[8px] px-[30px] font-regular uppercase hover:bg-[#f0dac6] hover:border-[#f0dac6] hover:text-[#343434]"
                        >
                          View Details
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Brushed Blue Cards (Tab 3 Content) */}
              <div
                className="hidden p-4 rounded-lg"
                id="styled-tab-3"
                role="tabpanel"
                aria-labelledby="tab-3-styled-tab"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-[30px]">
                  <div className="rotate-card-container">
                    <div className="rotate-card">
                      <div className="front">
                        <img
                          src="./assets/img/products/rinbow brushed.jpg"
                          alt="Front Image"
                        />
                      </div>
                      <div className="back">
                        <img
                          src="./assets/img/products/rinbow brushed back .jpg"
                          alt="Back Image"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center">
                    <div className="menu-info">
                      <h5 className="text-gray-800 text-xl font-semibold">
                        Brushed Blue Cards
                      </h5>
                      <p className="text-gray-600 mt-2">
                        Bold and eye-catching, these brushed blue cards are designed
                        to stand out. Ideal for businesses looking to make a
                        statement with their corporate cards.
                      </p>
                      <div className="flex space-x-2 mt-4">
                        <a
                          href="#"
                          className="bg-primary text-white border border-primary rounded-full py-[8px] px-[30px] font-regular uppercase hover:bg-[#f0dac6] hover:border-[#f0dac6] hover:text-[#343434]"
                        >
                          Customize Now
                        </a>
                        <a
                          href="#"
                          className="!bg-transparent border border-black text-black rounded-full py-[8px] px-[30px] font-regular uppercase hover:bg-[#f0dac6] hover:border-[#f0dac6] hover:text-[#343434]"
                        >
                          View Details
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Brushed Red Cards (Tab 4 Content) */}
              <div
                className="hidden p-4 rounded-lg"
                id="styled-tab-4"
                role="tabpanel"
                aria-labelledby="tab-4-styled-tab"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-[30px] ">
                  <div className="rotate-card-container">
                    <div className="rotate-card">
                      <div className="front">
                        <img
                          src="./assets/img/products/brushed blue front.jpg"
                          alt="Front Image"
                        />
                      </div>
                      <div className="back">
                        <img
                          src="./assets/img/products/brushed blue back.jpg"
                          alt="Back Image"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center">
                    <div className="menu-info">
                      <h5 className="text-gray-800 text-xl font-semibold">
                        Brushed Red Cards
                      </h5>
                      <p className="text-gray-600 mt-2">
                        These vibrant brushed red cards are perfect for those who
                        want to make a bold impression. Their striking color and
                        finish are sure to attract attention.
                      </p>
                      <div className="flex space-x-2 mt-4">
                        <a
                          href="#"
                          className="bg-primary text-white border border-primary rounded-full py-[8px] px-[30px] font-regular uppercase hover:bg-[#f0dac6] hover:border-[#f0dac6] hover:text-[#343434]"
                        >
                          Customize Now
                        </a>
                        <a
                          href="#"
                          className="!bg-transparent border border-black text-black rounded-full py-[8px] px-[30px] font-regular uppercase hover:bg-[#f0dac6] hover:border-[#f0dac6] hover:text-[#343434]"
                        >
                          View Details
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Gold Cards (Tab 5 Content) */}
              <div
                className="hidden p-4 rounded-lg"
                id="styled-tab-5"
                role="tabpanel"
                aria-labelledby="tab-5-styled-tab"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-[30px]">
                  <div className="rotate-card-container">
                    <div className="rotate-card">
                      <div className="front">
                        <img
                          src="./assets/img/products/rinbow brushed.jpg"
                          alt="Front Image"
                        />
                      </div>
                      <div className="back">
                        <img
                          src="./assets/img/products/rinbow brushed back .jpg"
                          alt="Back Image"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center">
                    <div className="menu-info">
                      <h5 className="text-gray-800 text-xl font-semibold">
                        Gold Cards
                      </h5>
                      <p className="text-gray-600 mt-2">
                        Luxurious and elegant, these gold cards exude prestige and
                        exclusivity. Perfect for VIP clients who demand the best.
                      </p>
                      <div className="flex space-x-2 mt-4">
                        <a
                          href="#"
                          className="bg-primary text-white border border-primary rounded-full py-[8px] px-[30px] font-regular uppercase hover:bg-[#f0dac6] hover:border-[#f0dac6] hover:text-[#343434]"
                        >
                          Customize Now
                        </a>
                        <a
                          href="#"
                          className="!bg-transparent border border-black text-black rounded-full py-[8px] px-[30px] font-regular uppercase hover:bg-[#f0dac6] hover:border-[#f0dac6] hover:text-[#343434]"
                        >
                          View Details
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto">
          <div id="card-menu" className="py-16 mx-auto w-full px-0 ">
            <div className="mx-auto px-4 pb-12 md:px-6 lg:px-8">
              <div className="mx-auto pt-12 ">
                {/* Header for the product grid */}
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-4xl font-normal text-gray-800">
                    Explore Our Collection
                  </h2>
                  <a
                    href="#"
                    className="border border-black text-black rounded-full py-2 px-6 uppercase hover:bg-gray-200 hover:border-gray-200 hover:text-gray-800"
                  >
                    Shop All
                  </a>
                </div>
                {/* Product Grid */}
                <div className="grid grid-cols-5 gap-5 text-center mx-auto transform ">
                  {/* Product 1 */}
                  <div className="bg-white border border-gray-300 rounded-lg shadow-lg p-4 hover:shadow-2xl transform transition-transform duration-300 hover:scale-105 relative">
                    <div className="w-full h-64 relative overflow-hidden">
                      <img
                        src="assets/img/products/brushed silver back.jpg"
                        alt="Product 1"
                        className="w-full h-full object-contain rounded-lg"
                      />
                    </div>
                    <h3 className="text-lg font-semibold mt-4">The Unicorn</h3>
                    <h4 className="text-xl text-yellow-600">AED 1199</h4>
                  </div>
                  {/* Product 2 */}
                  <div className="bg-white border border-gray-300 rounded-lg shadow-lg p-4 hover:shadow-2xl transform transition-transform duration-300 hover:scale-105 relative">
                    <div className="w-full h-64 relative overflow-hidden">
                      <img
                        src="./assets/img/products/brushed blue back.jpg"
                        alt="Product 2"
                        className="w-full h-full object-contain rounded-lg"
                      />
                    </div>
                    <h3 className="text-lg font-semibold mt-4">The Phoenix</h3>
                    <h4 className="text-xl text-yellow-600">AED 1299</h4>
                  </div>
                  {/* Product 3 */}
                  <div className="bg-white border border-gray-300 rounded-lg shadow-lg p-4 hover:shadow-2xl transform transition-transform duration-300 hover:scale-105 relative">
                    <div className="w-full h-64 relative overflow-hidden">
                      <img
                        src="./assets/img/products/black brass back.jpg"
                        alt="Product 3"
                        className="w-full h-full object-contain rounded-lg"
                      />
                    </div>
                    <h3 className="text-lg font-semibold mt-4">The Gold Edition</h3>
                    <h4 className="text-xl text-yellow-600">AED 1499</h4>
                  </div>
                  {/* Product 4 */}
                  <div className="bg-white border border-gray-300 rounded-lg shadow-lg p-4 hover:shadow-2xl transform transition-transform duration-300 hover:scale-105 relative">
                    <div className="w-full h-64 relative overflow-hidden">
                      <img
                        src="./assets/img/products/black limited back.jpg"
                        alt="Product 4"
                        className="w-full h-full object-contain rounded-lg"
                      />
                    </div>
                    <h3 className="text-lg font-semibold mt-4">
                      The Silver Edition
                    </h3>
                    <h4 className="text-xl text-yellow-600">AED 1399</h4>
                  </div>
                  {/* Product 5 */}
                  <div className="bg-white border border-gray-300 rounded-lg shadow-lg p-4 hover:shadow-2xl transform transition-transform duration-300 hover:scale-105 relative">
                    <div className="w-full h-64 relative overflow-hidden">
                      <img
                        src="./assets/img/products/rinbow brushed.jpg"
                        alt="Product 5"
                        className="w-full h-full object-contain rounded-lg"
                      />
                    </div>
                    <h3 className="text-lg font-semibold mt-4">
                      The Platinum Edition
                    </h3>
                    <h4 className="text-xl text-yellow-600">AED 1599</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="2xl:px-28 xl:px-28 lg:px-15 md:px-5 sm:px-5 xs:px-5 px-3 h-full bg-no-repeat  py-[100px] mx-auto "
        style={{ backgroundImage: 'url("assets/img/bg1.jpg")' }}
      >
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex flex-wrap items-center -mx-4">
            <div className="w-full lg:w-1/2 px-4">
              <div className="animate-box mb-8">
                <div className="text-center">
                  <a href="post.html">
                    <img src="assets/img/item-1.png" alt="" className="mx-auto" />
                  </a>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 px-4">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-black">How It Works</h1>
              </div>
              <div className="steps-container space-y-4">
                <div className="order-step flex flex-col lg:flex-row items-center lg:justify-between bg-white shadow-lg">
                  <div className="order-step-number flex items-center justify-center w-[100px] h-[100px] lg:w-[130px] lg:h-[130px] text-[#F3D55B]">
                    <span className="text-5xl lg:text-7xl font-thin">01</span>
                  </div>
                  <div className="order-step-content flex-1 lg:max-w-3/5 lg:pl-5">
                    <h2 className="text-2xl lg:text-2xl font-semibold mb-2 text-black">
                      Place Your Order
                    </h2>
                    <p className="text-gray-600 mb-2">
                      Select your preferred metal and customization options, then
                      checkout.
                    </p>
                    <a
                      href="#"
                      className="text-yellow-600 hover:text-yellow-800 transition duration-300"
                    >
                      More...
                    </a>
                  </div>
                </div>
                <div className="order-step flex flex-col lg:flex-row-reverse items-center lg:justify-between bg-white shadow-lg">
                  <div className="order-step-number flex items-center justify-center w-[100px] h-[100px] lg:w-[130px] lg:h-[130px] text-yellow-600">
                    <span className="text-5xl lg:text-7xl font-thin">02</span>
                  </div>
                  <div className="order-step-content flex-1 lg:max-w-3/5 lg:pl-5">
                    <h2 className="text-2xl lg:text-2xl font-semibold mb-2 text-black">
                      Send Your Plastic Card
                    </h2>
                    <p className="text-gray-600 mb-2">
                      Receive a prepaid shipping label and mail your plastic card to
                      us.
                    </p>
                    <a
                      href="#"
                      className="text-yellow-600 hover:text-yellow-800 transition duration-300"
                    >
                      More...
                    </a>
                  </div>
                </div>
                <div className="order-step flex flex-col lg:flex-row items-center lg:justify-between bg-white shadow-lg">
                  <div className="order-step-number flex items-center justify-center w-[100px] h-[100px] lg:w-[130px] lg:h-[130px] text-yellow-600">
                    <span className="text-5xl lg:text-7xl font-thin">03</span>
                  </div>
                  <div className="order-step-content flex-1 lg:max-w-3/5 lg:pl-5">
                    <h2 className="text-2xl lg:text-2xl font-semibold mb-2 text-black">
                      We Craft Your Metal Card
                    </h2>
                    <p className="text-gray-600 mb-2">
                      Our experts create your custom metal card with secure chip
                      transfer.
                    </p>
                    <a
                      href="#"
                      className="text-yellow-600 hover:text-yellow-800 transition duration-300"
                    >
                      More...
                    </a>
                  </div>
                </div>
                <div className="order-step flex flex-col lg:flex-row-reverse items-center lg:justify-between bg-white shadow-lg">
                  <div className="order-step-number flex items-center justify-center w-[100px] h-[100px] lg:w-[130px] lg:h-[130px] text-yellow-600">
                    <span className="text-5xl lg:text-7xl font-thin">04</span>
                  </div>
                  <div className="order-step-content flex-1 lg:max-w-3/5 lg:pl-5">
                    <h2 className="text-2xl lg:text-2xl font-semibold mb-2 text-black">
                      Receive &amp; Enjoy
                    </h2>
                    <p className="text-gray-600 mb-2">
                      Receive your new metal card and start using it immediately.
                    </p>
                    <a
                      href="#"
                      className="text-yellow-600 hover:text-yellow-800 transition duration-300"
                    >
                      More...
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="services  2xl:px-28 xl:px-28 lg:px-15 md:px-5 sm:px-5 xs:px-5 px-3 h-auto mx-auto">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mt-12 mb-[50px] ">
            <h2 className="text-[50px] font-normal text-[#272727]">
              The Luxmetallic Promise
            </h2>
            <p className="text-gray-600">Experience the Luxmetallic Difference</p>
          </div>
          {/* Tab Navigation */}
          <div className="mb-4 flex justify-center ">
            <ul
              className="flex flex-wrap -mb-px text-sm font-medium text-center space-x-4 list-none"
              id="default-tab"
              role="tablist"
              data-stagger-appear="fade-down"
              data-stagger-delay={300}
            >
              <li className="me-2 list-none" role="presentation">
                <button
                  className="inline-block p-4 border-b-2 rounded-full custom-active-tab"
                  id="profile-tab"
                  data-tab="profile"
                  type="button"
                  role="tab"
                  aria-controls="profile"
                  aria-selected="true"
                >
                  Innovative Design
                </button>
              </li>
              <li className="me-2 list-none" role="presentation">
                <button
                  className="inline-block p-4 border-b-2 rounded-full custom-inactive-tab"
                  id="dashboard-tab"
                  data-tab="dashboard"
                  type="button"
                  role="tab"
                  aria-controls="dashboard"
                  aria-selected="false"
                >
                  Personal Touch
                </button>
              </li>
              <li className="me-2 list-none" role="presentation">
                <button
                  className="inline-block p-4 border-b-2 rounded-full custom-inactive-tab"
                  id="settings-tab"
                  data-tab="settings"
                  type="button"
                  role="tab"
                  aria-controls="settings"
                  aria-selected="false"
                >
                  Unmatched Quality
                </button>
              </li>
              <li className="me-2 list-none" role="presentation">
                <button
                  className="inline-block p-4 border-b-2 rounded-full custom-inactive-tab"
                  id="contacts-tab"
                  data-tab="contacts"
                  type="button"
                  role="tab"
                  aria-controls="contacts"
                  aria-selected="false"
                >
                  Expert Craftsmanship
                </button>
              </li>
              <li className="me-2 list-none" role="presentation">
                <button
                  className="inline-block p-4 border-b-2 rounded-full custom-inactive-tab"
                  id="exclusive-tab"
                  data-tab="exclusive"
                  type="button"
                  role="tab"
                  aria-controls="exclusive"
                  aria-selected="false"
                >
                  Exclusive Experience
                </button>
              </li>
              <li className="me-2 list-none" role="presentation">
                <button
                  className="inline-block p-4 border-b-2 rounded-full custom-inactive-tab"
                  id="service-tab"
                  data-tab="service"
                  type="button"
                  role="tab"
                  aria-controls="service"
                  aria-selected="false"
                >
                  Exceptional Service
                </button>
              </li>
            </ul>
          </div>
          {/* Tab Content */}
          <div id="default-tab-content" className="">
            {/* Tab 1: Innovative Design */}
            <div
              className="tab-content active p-4 rounded-lg bg-white"
              id="profile"
              role="tabpanel"
            >
              <div className="flex flex-col lg:flex-row justify-center items-center space-y-6 lg:space-y-0 lg:space-x-10">
                <div className="w-full lg:w-1/2 flex justify-center ">
                  <div className="animate-box relative h-full w-full">
                    <div className="relative w-full h-0 pb-[56.25%]">
                      <iframe
                        src="https://player.vimeo.com/video/998145201?background=1&autoplay=1&muted=1&loop=1"
                        frameBorder={0}
                        allow="autoplay; fullscreen; picture-in-picture"
                        // allowFullScreen=""
                        className="absolute top-0 left-0 w-full h-full"
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full lg:w-1/2 text-center lg:text-left ">
                  <h3 className="text-[30px]  text-gray-800">
                    <span className="Philosopher text-[#B59A30]">Innovative</span>{" "}
                    Design
                  </h3>
                  <p className="text-gray-600 mt-4">
                    At Luxmetallic, our designs are at the forefront of innovation.
                    We combine the latest technology with creative artistry to
                    produce unique cards that stand out. Our focus on innovative
                    design ensures that each card is not only functional but also a
                    work of art.
                  </p>
                  <div className="flex flex-wrap items-center justify-center lg:justify-start mt-4 space-x-2 space-y-2">
                    <span className="px-4 py-2 bg-yellow-200 text-yellow-800 rounded-full">
                      Cutting-Edge Technology
                    </span>
                    <span className="px-4 py-2 !mt-0 bg-yellow-200 text-yellow-800 rounded-full">
                      Creative Artistry
                    </span>
                    <span className="px-4 py-2 !mt-0 bg-yellow-200 text-yellow-800 rounded-full">
                      Unique Designs
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* Tab 2: Personal Touch */}
            <div
              className="tab-content hidden p-4 rounded-lg bg-white"
              id="dashboard"
              role="tabpanel"
            >
              <div className="flex flex-col lg:flex-row justify-center items-center space-y-6 lg:space-y-0 lg:space-x-10">
                <div className="w-full lg:w-1/2 flex justify-center ">
                  <img
                    src="assets/img/2.png"
                    alt="Personal Touch"
                    className="max-w-lg object-cover"
                  />
                </div>
                <div className="w-full lg:w-1/2 text-center lg:text-left ">
                  <h3 className="text-[30px]  text-gray-800">
                    <span className="Philosopher text-[#B59A30]">Personal</span>{" "}
                    Touch
                  </h3>
                  <p className="text-gray-600 mt-4">
                    Every card we create is infused with a personal touch, tailored
                    specifically to your preferences. From choosing materials to
                    selecting finishes, every detail is customized to reflect your
                    individuality and style.
                  </p>
                  <div className="flex flex-wrap items-center justify-center lg:justify-start mt-4 space-x-2 space-y-2">
                    <span className="px-4 py-2 bg-yellow-200 text-yellow-800 rounded-full">
                      Custom Materials
                    </span>
                    <span className="px-4 py-2 !mt-0 bg-yellow-200 text-yellow-800 rounded-full">
                      Unique Finishes
                    </span>
                    <span className="px-4 py-2 !mt-0 bg-yellow-200 text-yellow-800 rounded-full">
                      Personalized Details
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* Tab 3: Unmatched Quality */}
            <div
              className="tab-content hidden p-4 rounded-lg bg-white"
              id="settings"
              role="tabpanel"
            >
              <div className="flex flex-col lg:flex-row justify-center items-center space-y-6 lg:space-y-0 lg:space-x-10">
                <div className="w-full lg:w-1/2 flex justify-center ">
                  <img
                    src="assets/img/4.png"
                    alt="Unmatched Quality"
                    className="max-w-ls object-cover rounded-md"
                  />
                </div>
                <div className="w-full lg:w-1/2 text-center lg:text-left ">
                  <h3 className="text-[30px]  text-gray-800">
                    <span className="Philosopher text-[#B59A30]">Unmatched</span>{" "}
                    Quality
                  </h3>
                  <p className="text-gray-600 mt-4">
                    Quality is our hallmark. Luxmetallic cards are crafted from the
                    finest materials and undergo rigorous testing to ensure they
                    meet the highest standards. Our commitment to quality guarantees
                    that your card will be durable and elegant, standing the test of
                    time.
                  </p>
                  <div className="flex flex-wrap items-center justify-center lg:justify-start mt-4 space-x-2 space-y-2">
                    <span className="px-4 py-2 bg-yellow-200 text-yellow-800 rounded-full">
                      Premium Materials
                    </span>
                    <span className="px-4 py-2 !mt-0 bg-yellow-200 text-yellow-800 rounded-full">
                      Rigorous Testing
                    </span>
                    <span className="px-4 py-2 !mt-0 bg-yellow-200 text-yellow-800 rounded-full">
                      Durability &amp; Elegance
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* Tab 4: Expert Craftsmanship */}
            <div
              className="tab-content hidden p-4 rounded-lg bg-white"
              id="contacts"
              role="tabpanel"
            >
              <div className="flex flex-col lg:flex-row justify-center items-center space-y-6 lg:space-y-0 lg:space-x-10">
                <div className="w-full lg:w-1/2 flex justify-center ">
                  <img
                    src="assets/img/5.webp"
                    alt="Expert Craftsmanship"
                    className="max-w-lg object-cover"
                  />
                </div>
                <div className="w-full lg:w-1/2 text-center lg:text-left ">
                  <h3 className="text-[30px]  text-gray-800">
                    <span className="Philosopher text-[#B59A30]">Expert</span>{" "}
                    Craftsmanship
                  </h3>
                  <p className="text-gray-600 mt-4">
                    Our cards are the product of expert craftsmanship. Skilled
                    artisans meticulously craft each card, ensuring precision and
                    attention to detail in every aspect of the design and production
                    process.
                  </p>
                  <div className="flex flex-wrap items-center justify-center lg:justify-start mt-4 space-x-2 space-y-2">
                    <span className="px-4 py-2 bg-yellow-200 text-yellow-800 rounded-full">
                      Skilled Artisans
                    </span>
                    <span className="px-4 py-2 !mt-0 bg-yellow-200 text-yellow-800 rounded-full">
                      Attention to Detail
                    </span>
                    <span className="px-4 py-2 !mt-0 bg-yellow-200 text-yellow-800 rounded-full">
                      Precision Crafting
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* Tab 5: Exclusive Experience */}
            <div
              className="tab-content hidden p-4 rounded-lg bg-white"
              id="exclusive"
              role="tabpanel"
            >
              <div className="flex flex-col lg:flex-row justify-center items-center space-y-6 lg:space-y-0 lg:space-x-10">
                <div className="w-full lg:w-1/2 flex justify-center ">
                  <img
                    src="assets/img/6.webp"
                    alt="Exclusive Experience"
                    className="max-w-lg object-cover"
                  />
                </div>
                <div className="w-full lg:w-1/2 text-center lg:text-left ">
                  <h3 className="text-[30px]  text-gray-800">
                    <span className="Philosopher text-[#B59A30]">Exclusive</span>{" "}
                    Experience
                  </h3>
                  <p className="text-gray-600 mt-4">
                    Luxmetallic offers an exclusive experience from start to finish.
                    We provide personalized support and guidance throughout the
                    customization process, ensuring that your experience is as
                    unique as the card we create for you.
                  </p>
                  <div className="flex flex-wrap items-center justify-center lg:justify-start mt-4 space-x-2 space-y-2">
                    <span className="px-4 py-2 bg-yellow-200 text-yellow-800 rounded-full">
                      Personalized Support
                    </span>
                    <span className="px-4 py-2 !mt-0 bg-yellow-200 text-yellow-800 rounded-full">
                      Guidance &amp; Expertise
                    </span>
                    <span className="px-4 py-2 !mt-0 bg-yellow-200 text-yellow-800 rounded-full">
                      Unique Experience
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* Tab 6: Exceptional Service */}
            <div
              className="tab-content hidden p-4 rounded-lg bg-white"
              id="service"
              role="tabpanel"
            >
              <div className="flex flex-col lg:flex-row justify-center items-center space-y-6 lg:space-y-0 lg:space-x-10">
                <div className="w-full lg:w-1/2 flex justify-center ">
                  <img
                    src="assets/img/happy-friendship.jpg"
                    alt="Exceptional Service"
                    className="max-w-lg object-cover"
                  />
                </div>
                <div className="w-full lg:w-1/2 text-center lg:text-left ">
                  <h3 className="text-[30px]  text-gray-800">
                    <span className="Philosopher text-[#B59A30]" />
                    Exceptional Service
                  </h3>
                  <p className="text-gray-600 mt-4">
                    We pride ourselves on delivering exceptional service to our
                    clients. From initial consultation to final delivery, we are
                    dedicated to exceeding your expectations and ensuring your
                    satisfaction with every aspect of our service.
                  </p>
                  <div className="flex flex-wrap items-center justify-center lg:justify-start mt-4 space-x-2 space-y-2">
                    <span className="px-4 py-2 bg-yellow-200 text-yellow-800 rounded-full">
                      Client Satisfaction
                    </span>
                    <span className="px-4 py-2 !mt-0 bg-yellow-200 text-yellow-800 rounded-full">
                      Dedicated Support
                    </span>
                    <span className="px-4 py-2 !mt-0 bg-yellow-200 text-yellow-800 rounded-full">
                      Exceeding Expectations
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f1f1f1] pl-[100px] py-16 w-full px-0 !py-16">
        {/* Section Title */}
        <div className="text-center mt-[20px] mb-[50px]">
          <h2 className="text-[40px] font-normal text-[#272727]">
            Our Customer Voices
          </h2>
          <p className="text-gray-600">
            Discover how clients personalized their cards and why they stand out
          </p>
        </div>
        {/* Testimonials Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 overflow-x-auto pl-8 pr-0 mr-0"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {/* Video Testimonial */}
          <div
            className="rounded-lg overflow-hidden shadow-lg h-auto flex flex-col justify-between bg-white p-0 relative min-w-[90%] md:min-w-[45%] lg:min-w-[30%]"
            style={{ scrollSnapAlign: "start" }}
          >
            <img src="assets/img/video-test.png" alt="Video Testimonial" />
            <div className="absolute flex items-end bottom-0 left-0 w-full p-[30px] text-white">
              <div className="flex items-center">
                <div className="mr-4">
                  <img src="assets/img/play-btn.svg" alt="Play Button" />
                </div>
                <div>
                  <h3 className="text-white text-lg font-semibold">Sample Name</h3>
                  <span className="text-sm text-gray-300">Designation Title</span>
                </div>
              </div>
            </div>
          </div>
          {/* Testimonial 1 */}
          <div
            className="rounded-lg shadow-lg h-auto flex flex-col justify-between bg-white p-4 min-w-[90%] md:min-w-[45%] lg:min-w-[30%]"
            style={{ scrollSnapAlign: "start" }}
          >
            <div className="text-black">
              I wanted to do this card since 1 year but it was only available in the
              US and I had concerns about my info safety. Since it's a Dubai
              company, I'm sure my data is safe. The process is so easy. I chose the
              design, and it was made in less than 24 hours. The card quality is 24K
              gold, super luxurious and charming. Most importantly, the design we
              chose was engraved properly with each detail. As you see in the photo,
              my design is Dubai downtown skyline, so it has a lot of details, and I
              was surprised by the quality.
            </div>
            <div className="flex items-center gap-3 mt-5 border-t pt-5">
              <img src="assets/img/google-review.svg" alt="Google Review" />
              <div>
                <h6 className="text-black">Jessica Porter</h6>
                <span className="text-black">
                  Marketing Manager, Adventure Gear Co
                </span>
                <div className="text-black">
                  <span className="bringer-testimonials-stars4" />
                </div>
              </div>
            </div>
          </div>
          {/* Testimonial 2 */}
          <div
            className="rounded-lg shadow-lg h-auto flex flex-col justify-between bg-white p-4 min-w-[90%] md:min-w-[45%] lg:min-w-[30%]"
            style={{ scrollSnapAlign: "start" }}
          >
            <div className="text-black">
              I just received my very first Black Card, and all thanks go to
              LuxMettallic for making it happen 🖤. The quality is beyond what I
              imagined - photos can't capture the luxurious feel and the substantial
              weight of it. Truly a piece of art! #LuxMettallic #BlackCard
              #LuxuryLifestyle
            </div>
            <div className="flex items-center gap-3 mt-5 border-t pt-5">
              <img src="assets/img/google-review.svg" alt="Google Review" />
              <div>
                <h6 className="text-black">Jose Joaquin Miguel</h6>
                <span className="text-black">
                  Marketing Manager, Adventure Gear Co
                </span>
                <div className="text-black">
                  <span className="bringer-testimonials-stars4" />
                </div>
              </div>
            </div>
          </div>
          {/* Testimonial 3 */}
          <div
            className="rounded-lg shadow-lg h-auto flex flex-col justify-between bg-white p-4 min-w-[90%] md:min-w-[45%] lg:min-w-[30%]"
            style={{ scrollSnapAlign: "start" }}
          >
            <div className="text-black">
              Everything is just extraordinary!! Love their services, love their
              products! Just amazing! Also, shipping within 24 hours from DXB to
              Qatar! Didn’t expect that! I highly recommend everyone to upgrade
              their cards to the next level with Luxmetallic! Excellent service.
            </div>
            <div className="flex items-center gap-3 mt-5 border-t pt-5">
              <img src="assets/img/google-review.svg" alt="Google Review" />
              <div>
                <h6 className="text-black">Hassan Hammoud</h6>
                <span className="text-black">
                  Marketing Manager, Adventure Gear Co
                </span>
                <div className="text-black">
                  <span className="bringer-testimonials-stars4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
