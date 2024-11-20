import React from "react";
import Image from "next/image";

const Footer = ({ hostName }: { hostName: string | null }) => {
  return (
    <>
      <footer
        id="bringer-footer"
        data-appear="fade-up"
        data-unload="fade-down"
        className="text-gray-200 bg-black"
        style={{
          position: "relative",
          zIndex: 22, 
          background:
            "radial-gradient(circle, rgb(240 234 209 / 18%) 0%, rgb(0 0 0) 100%)",
          backgroundColor: "#000", 
        }}
      >
        <div
          className="w-full m-auto text-center py-10"
        >
          <Image
            src="/assets/img/logo.svg"
            alt="Luxmetallic Logo"
            width={128}
            height={128}
            className="w-32 m-auto mb-4"
            priority
          />
          <p className="text-sm">
            Experience Ultimate Luxury With Luxmetallic Cards
          </p>
        </div>
        <div className="bringer-footer-widgets border-t border-b">
          <div className="container max-w-screen mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-5 gap-8">
              {/* First Group: 3 items */}
              <div className="lg:col-span-3 grid grid-cols-1 lg:grid-cols-3 gap-8 py-10">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                  <ul className="space-y-2">
                    <li>
                      <a href="#" className="hover:underline">
                        Home
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:underline">
                        About us
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:underline">
                        How it works
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:underline">
                        Shop all
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:underline">
                        Contact Us
                      </a>
                    </li>
                  </ul>
                </div>
                <div data-stagger-appear="fade-left">
                  <h3 className="text-lg font-semibold mb-4">
                    Customer Support
                  </h3>
                  <ul className="space-y-2">
                    <li>
                      <a href="#" className="hover:underline">
                        FAQs
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:underline">
                        Shipping Information
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:underline">
                        Privacy policy
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:underline">
                        Terms and conditions
                      </a>
                    </li>
                  </ul>
                </div>
                <div data-stagger-appear="fade-left" data-stagger-delay={300}>
                  <h3 className="text-lg font-semibold mb-4">
                    Start Customization
                  </h3>
                  <ul className="space-y-2">
                    <li>
                      <a href="#" className="hover:underline">
                        Custom metal cards
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:underline">
                        Business credit cards
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:underline">
                        Dual chip cards
                      </a>
                    </li>
                    <li>
                      <a
                        href="jewellery-cards.html"
                        className="hover:underline"
                      >
                        Jewelry cards
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:underline">
                        Metallic NFC cards
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              {/* Second Group: 2 items */}
              <div className="lg:col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-8 border-l pl-8 py-10">
                <div data-stagger-appear="fade-left" data-stagger-delay={400}>
                  <h3 className="text-lg font-semibold mb-4">Address</h3>
                  <p>
                    Oud Metha Road, Umm Hurair 2, Gulf Tower, Block A2, 5th
                    floor, office A14. Dubai-UAE
                  </p>
                </div>
                <div data-stagger-appear="fade-left" data-stagger-delay={500}>
                  <h3 className="text-lg font-semibold mb-4">Contact</h3>
                  <p>
                    Call:{" "}
                    <a href="tel:+0097148328892" className="hover:underline">
                      009714 8328892
                    </a>
                  </p>
                  <p>
                    Email:{" "}
                    <a
                      href="mailto:info@luxmetallic.com"
                      className="hover:underline"
                    >
                      info@luxmetallic.com
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="border-b py-4">
          <div className="container max-w-screen-lg mx-auto flex flex-col gap-5 flex-wrap items-center justify-center px-4">
            <div className="flex space-x-4 items-center justify-center lg:justify-start">
              <Image
                src="/assets/img/visa.png"
                alt="Visa"
                width={32}
                height={32}
              />
              <Image
                src="/assets/img/mastercard.png"
                alt="MasterCard"
                width={32}
                height={32}
              />
              <Image
                src="/assets/img/samsungpay.png"
                alt="Samsung Pay"
                width={32}
                height={32}
              />
              <Image
                src="/assets/img/apple-pay.png"
                alt="Apple Pay"
                width={32}
                height={32}
              />
            </div>
            <div className="text-center lg:text-left">
              <span>In Cooperation with:</span>
              <Image
                src="/assets/img/dubai-sme.png"
                alt="Dubai SME"
                width={80}
                height={32}
                className="inline w-20 h-full mx-2"
              />
            </div>
            <div className="flex justify-center lg:justify-end space-x-6">
              <a href="#">
                <Image
                  src="/assets/img/whatsapp.svg"
                  alt="WhatsApp"
                  width={24}
                  height={24}
                />
              </a>
              <a href="#">
                <Image
                  src="/assets/img/instagram.svg"
                  alt="Instagram"
                  width={24}
                  height={24}
                />
              </a>
              <a href="#">
                <Image
                  src="/assets/img/twitter.svg"
                  alt="Twitter"
                  width={24}
                  height={24}
                />
              </a>
              <a href="#">
                <Image
                  src="/assets/img/youtube.svg"
                  alt="YouTube"
                  width={24}
                  height={24}
                />
              </a>
            </div>
          </div>
        </div>
        <div className="text-sm mt-4 lg:mt-0 text-center py-6">
          Copyright © 2024 Luxmetallic LLC. Designed by
          <a href="#" className="hover:underline">
            {" "}
            Tomsher
          </a>
        </div>
      </footer>
    </>
  );
};

export default Footer;
