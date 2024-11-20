import Image from "next/image";

export const CardListingSection = () => {
    return (
      <section className="section-padding py-16 w-full bg-cover bg-center bg-[#f7f7f7]">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex flex-wrap items-center -mx-4">
            <div className="w-full lg:w-1/2 px-4">
              <div className="mb-8">
                <a href="">
                  <Image
                    src="/assets/img/item-1.png"
                    alt="Full Custom Metal Card"
                    className="mx-auto"
                    height={500}
                    width={500}
                  />
                </a>
              </div>
            </div>
  
            <div className="w-full lg:w-1/2 px-4">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-black">Full Custom Metal Card</h2>
              </div>
  
              <p className="text-gray-600 mt-2">
                First impressions matter. Obtain the premium metal Card (single chip) that you’ve always
                wanted and make a statement with it.
              </p>
  
              <div className="mt-4">
                <ul className="list-disc list-inside text-gray-700 mb-6 pl-5">
                  <li>
                    <span className="font-bold text-[#aa8453]">Heaviest metal card</span> in the market (Up
                    to 29 grams)
                  </li>
                  <li>Contact only</li>
                  <li>
                    Solid metal edge to edge or <span className="font-bold text-[#aa8453]">24K Plated</span>
                  </li>
                  <li>Luxury embellishments (Embedding of diamonds)</li>
                  <li>Upload your custom design or logo</li>
                </ul>
              </div>
  
              <p className="text-lg text-gray-700 font-bold mb-2">
                Upgrade your plastic card today and experience the new features
              </p>
  
              <div className="flex mt-8 gap-4 items-center">
                <a
                  href="add-to-cart.html"
                  className="bg-[#aa8453] text-white border border-[#aa8453] rounded-full py-2 px-8 uppercase font-bold transition-all duration-300 hover:bg-[#f0dac6] hover:border-[#f0dac6] hover:text-[#343434]"
                >
                  Get Full Custom Metal Card Now
                </a>
                <span className="text-gray-800">Starting at AED 899</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };