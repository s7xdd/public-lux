"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import MobileSidebar from "./mobile-nav";
import { apiEndpoints } from "@/server-api/config/api.endpoints";
import FetchAPIData from "@/server-api/apifunctions/apifetch";
import axios from "axios";

const NavBar = ({ hostName }: { hostName: string | null }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const path = usePathname();
  const isTargetPage =
    path.includes("/product-detail") ||
    path.includes("/custom") ||
    path.includes("/faq") ||
    path.includes("/login") ||
    path.includes("/register") ||
    path.includes("/orders");
  const [menu, setMenu] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const apiEndpoint = apiEndpoints.menu;
        const response = await FetchAPIData.fetchAPIData(
          { apiEndpoint },
          hostName
        );

        // const response = await axios.get(
        //   "https://tomsher.co/LUX/wp-json/menus/v1/menus/primary-menu"
        // );
        setMenu(response);
        console.log(response);
      } catch (error) {
        setError(error);
        console.error("Error fetching menu:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    console.log(isTargetPage);

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  //   useEffect(() => {
  //     const fetchCategories = async () => {
  //         const apiEndpoint = apiEndpoints.categories;
  //         const response = await FetchAPIData.fetchAPIData(
  //           { apiEndpoint },
  //           hostName
  //         );
  //         setCategories(response.data);
  //         console.log(response.data)
  //     }
  //     fetchCategories();
  //   }, [])

  return (
    <header
      className={`header-main sticky top-0 z-30 h-[100px] font-red-hat-display ${
        isTargetPage
          ? "backdrop-blur-lg bg-opacity-50 bg-black"
          : isScrolled
          ? "backdrop-blur-lg bg-opacity-50 bg-black"
          : "bg-transparent"
      }`}
    >
      <div className="2xl:px-28 xl:px-28 lg:px-15 md:px-5 sm:px-5 xs:px-5 px-3 mx-auto h-auto">
        <div className="top-bar w-full h-[100px] items-center justify-between py-2 mx-auto lg:px-2 flex flex-row">
          <Link
            className="mr-1 hidden xl:block  lg:hidden md:hidden sm:hidden xs:hidden"
            href="/"
          >
            {" "}
            <Image
              alt="logo"
              src="/assets/img/logo.svg"
              width={100} // specify width
              height={50} // specify height
              priority
              className="w-full h-auto"
            />
          </Link>

          <div className="w-full flex flex-row itemms-center justify-between 2xl:hidden  xl:hidden  lg: md: sm: xs:">
            <Link className="mr-1" href="index.html">
              {" "}
              <Image
                alt="logo"
                src="/assets/img/logo.png"
                width={88} // specify width
                height={44} // specify height
                priority
                className="w-full h-auto"
              />
            </Link>
            {/* <Link
                            href="wishlist.html"
                            className="w-[50px] text-center relative lg:hidden md:block sm:hidden xs:hidden flex flex-col items-center justify-center rounded-tl-lg p-1 text-gray-700"
                        >
                            <span className="text-2xl mb-1 text-[#e4dfc9]">
                                <span className="absolute z-10 top-2 -right-1 inline-flex items-center justify-center p-1 h-4 w-4 text-xs font-normal leading-none text-white transform -translate-x-1/2 -translate-y-1/2 bg-[#b88c4f]  rounded-full">
                                    0
                                </span>
                                <svg
                                    width="18pt"
                                    height="18pt"
                                    id="fi_13369080"
                                    enableBackground="new 0 0 100 100"
                                    viewBox="0 0 100 100"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        id="Add_to_Favorite"
                                        d="m50 91c-2.733 0-5.306-1.065-7.242-2.999v-.001l-33.129-33.129c-4.919-4.919-7.629-11.459-7.629-18.417v-.407c0-6.958 2.71-13.499 7.629-18.417s11.461-7.63 18.416-7.63h.41c6.955 0 13.497 2.71 18.416 7.629l3.129 3.129 3.129-3.129c4.919-4.919 11.461-7.629 18.416-7.629h.41c6.955 0 13.497 2.71 18.416 7.629s7.629 11.459 7.629 18.417v.407c0 6.958-2.71 13.499-7.629 18.417l-33.129 33.13c-1.936 1.935-4.509 3-7.242 3zm-3-7.242c1.608 1.605 4.395 1.601 6-.001l33.129-33.127c3.785-3.788 5.871-8.821 5.871-14.176v-.407c0-5.355-2.086-10.389-5.871-14.175s-8.821-5.872-14.174-5.872h-.41c-5.353 0-10.389 2.084-14.174 5.871l-5.25 5.25c-1.172 1.172-3.07 1.172-4.242 0l-5.25-5.25c-3.785-3.787-8.821-5.871-14.174-5.871h-.41c-5.353 0-10.389 2.084-14.174 5.871s-5.871 8.82-5.871 14.175v.407c0 5.355 2.086 10.389 5.871 14.175z"
                                    ></path>
                                </svg>
                            </span>
                            <span className="px-2 text-[10px] text-nowrap">Wishlist</span>
                        </Link> */}
          </div>

          <div className="w-full">
            <div className="w-full flex flex-col justify-center items-center flex-shrink-0 relative z-30 text-[15px]">
              <div className="flex flex-col w-full">
                <div className="relative 2xl:block xl:block lg:hidden md:hidden sm:hidden xs:hidden hidden">
                  <div className="2xl:px-28 xl:px-28 lg:px-15 md:px-5 sm:px-5 xs:px-5 mx-auto">
                    <div className="flex justify-center items-center">
                      <nav className="py-1">
                        <ul className="flex list-none gap-10 items-center justify-center">
                          {/* { menu.map((index, item) => (

                          ))} */}
                          <li>
                            <Link
                              className="uppercase text-white hover:text-primary"
                              href="/product-lists"
                            >
                              Shop ALL
                            </Link>
                          </li>
                          <li>
                            <Link
                              className="uppercase text-white hover:text-primary"
                              href="custom-metal-cards.html"
                            >
                              Custom Metal Cards
                            </Link>
                          </li>
                          <li>
                            <Link
                              className="uppercase text-white hover:text-primary"
                              href="business-credit-cards.html"
                            >
                              Business Credit Cards
                            </Link>
                          </li>
                          <li>
                            <Link
                              className="uppercase text-white hover:text-primary"
                              href="dual-chip-cards.html"
                            >
                              Dual Chip Cards
                            </Link>
                          </li>
                          <li>
                            <Link
                              className="uppercase text-white hover:text-primary"
                              href="jewellery-cards.html"
                            >
                              Jewelry Cards
                            </Link>
                          </li>
                          <li>
                            <Link
                              className="uppercase text-white hover:text-primary"
                              href="metal-nfc-cards.html"
                            >
                              Metal NFC Cards
                            </Link>
                          </li>
                        </ul>
                      </nav>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="hidden md: lg:flex lg:items-center ">
            <div className="flex items-center gap-3">
              <Link
                href="our_stores.html"
                className="relative flex flex-col items-center justify-center rounded-tl-lg p-1 text-white"
              >
                <span className="text-2xl mb-1 text-[#fff]">
                  <svg
                    width="18pt"
                    height="18pt"
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth={0}
                    viewBox="0 0 512 512"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill="none"
                      strokeMiterlimit={10}
                      strokeWidth={32}
                      d="M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z"
                    ></path>
                    <path
                      fill="none"
                      strokeLinecap="round"
                      strokeMiterlimit={10}
                      strokeWidth={32}
                      d="M338.29 338.29L448 448"
                    />
                  </svg>
                </span>
              </Link>
              <Link
                href="#"
                className="relative flex flex-col items-center justify-center rounded-tl-lg p-1 text-white"
                data-drawer-target="drawer-right-myaccount"
                data-drawer-show="drawer-right-myaccount"
                data-drawer-placement="right"
                aria-controls="drawer-right-myaccount"
              >
                <span className="text-2xl mb-1 text-[#e4dfc9]">
                  <svg
                    fill="#ffffff"
                    width="18pt"
                    height="18pt"
                    id="fi_15501313"
                    enableBackground="new 0 0 1024 1024"
                    viewBox="0 0 1024 1024"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="XMLID_3_">
                      <g id="XMLID_1_">
                        <g id="XMLID_16_">
                          <path
                            id="XMLID_24_"
                            d="m695.2 275.5c0 9.8-.7 19.5-2 29.2.4-2.7.7-5.3 1.1-8-2.6 18.3-7.4 36.2-14.5 53.2 1-2.4 2-4.8 3-7.2-5.3 12.6-11.8 24.7-19.4 36-1.9 2.9-4 5.8-6.1 8.6-4.4 5.9 3.8-4.7.7-.9-1.1 1.4-2.2 2.7-3.3 4.1-4.2 5-8.6 9.9-13.2 14.5s-9.5 9.1-14.5 13.2c-1.3 1.1-2.7 2.2-4.1 3.3-3.9 3.1 6.8-5.1.9-.7-2.8 2.1-5.7 4.1-8.6 6.1-11.4 7.6-23.4 14-36 19.4l7.2-3c-17.1 7.1-34.9 12-53.2 14.5 2.7-.4 5.3-.7 8-1.1-19.4 2.6-38.9 2.6-58.3 0 2.7.4 5.3.7 8 1.1-18.3-2.6-36.2-7.4-53.2-14.5l7.2 3c-12.6-5.3-24.7-11.8-36-19.4-2.9-1.9-5.8-4-8.6-6.1-5.9-4.4 4.7 3.8.9.7-1.4-1.1-2.7-2.2-4.1-3.3-5-4.2-9.9-8.6-14.5-13.2s-9.1-9.5-13.2-14.5c-1.1-1.3-2.2-2.7-3.3-4.1-3.1-3.9 5.1 6.8.7.9-2.1-2.8-4.1-5.7-6.1-8.6-7.6-11.4-14-23.4-19.4-36 1 2.4 2 4.8 3 7.2-7.1-17.1-12-34.9-14.5-53.2.4 2.7.7 5.3 1.1 8-2.6-19.4-2.6-38.9 0-58.3-.4 2.7-.7 5.3-1.1 8 2.6-18.3 7.4-36.2 14.5-53.2-1 2.4-2 4.8-3 7.2 5.3-12.6 11.8-24.7 19.4-36 1.9-2.9 4-5.8 6.1-8.6 4.4-5.9-3.8 4.7-.7.9 1.1-1.4 2.2-2.7 3.3-4.1 4.2-5 8.6-9.9 13.2-14.5s9.5-9.1 14.5-13.2c1.3-1.1 2.7-2.2 4.1-3.3 3.9-3.1-6.8 5.1-.9.7 2.8-2.1 5.7-4.1 8.6-6.1 11.4-7.6 23.4-14 36-19.4-2.4 1-4.8 2-7.2 3 17.1-7.1 34.9-12 53.2-14.5-2.7.4-5.3.7-8 1.1 19.4-2.6 38.9-2.6 58.3 0-2.7-.4-5.3-.7-8-1.1 18.3 2.6 36.2 7.4 53.2 14.5-2.4-1-4.8-2-7.2-3 12.6 5.3 24.7 11.8 36 19.4 2.9 1.9 5.8 4 8.6 6.1 5.9 4.4-4.7-3.8-.9-.7 1.4 1.1 2.7 2.2 4.1 3.3 5 4.2 9.9 8.6 14.5 13.2s9.1 9.5 13.2 14.5c1.1 1.3 2.2 2.7 3.3 4.1 3.1 3.9-5.1-6.8-.7-.9 2.1 2.8 4.1 5.7 6.1 8.6 7.6 11.4 14 23.4 19.4 36-1-2.4-2-4.8-3-7.2 7.1 17.1 12 34.9 14.5 53.2-.4-2.7-.7-5.3-1.1-8 1.3 9.7 2 19.4 2 29.1.1 15.7 13.8 30.7 30 30s30.1-13.2 30-30c-.2-49.1-15-98.8-43.7-138.9-29.6-41.5-70-72.5-117.8-90.1-93.3-34.4-204.6-4.2-267.7 72.6-32.9 40.1-52.5 87.9-56.5 139.7-3.8 49.3 8.7 100.3 34.4 142.6 24.8 40.8 62.1 75.1 105.8 94.7 25 11.2 50.1 18.1 77.3 21.3 25.2 3 50.8 1.2 75.7-3.9 95.7-19.4 174.6-101.2 189.2-198 2-13.2 3.4-26.5 3.4-39.9.1-15.7-13.8-30.7-30-30-16.4.7-30 13.1-30.1 29.9z"
                          ></path>
                        </g>
                      </g>
                      <g id="XMLID_2_">
                        <g id="XMLID_17_">
                          <path
                            id="XMLID_25_"
                            d="m828.7 931.7c-21.3 0-42.6 0-63.9 0-50.8 0-101.7 0-152.5 0-61.3 0-122.6 0-183.9 0-52.8 0-105.5 0-158.3 0-24.8 0-49.5.1-74.3 0-2.5 0-5-.2-7.5-.5 2.7.4 5.3.7 8 1.1-4-.6-7.8-1.7-11.5-3.2l7.2 3c-2.8-1.2-5.5-2.6-8.1-4.3s-3.5-4 1.9 1.6c-1-1.1-2.3-2-3.3-3-.3-.3-3.2-3.2-3-3.3 0 0 5.2 7.3 1.6 1.9-1.7-2.5-3.1-5.2-4.3-8.1 1 2.4 2 4.8 3 7.2-1.5-3.7-2.5-7.6-3.2-11.5.4 2.7.7 5.3 1.1 8-.7-5.6-.5-11.4-.5-17 0-9.7 0-19.5 0-29.2 0-19.4 0-38.8 0-58.2 0-11.5.5-23 2-34.4-.4 2.7-.7 5.3-1.1 8 2.8-20.5 8.2-40.6 16.3-59.7-1 2.4-2 4.8-3 7.2 4.5-10.5 9.7-20.7 15.7-30.5 3-4.9 6.1-9.6 9.5-14.2.8-1.1 1.5-2.1 2.3-3.2.4-.5.8-1 1.2-1.6 1.7-2.3-2.8 4-2.7 3.5.4-2.1 4.4-5.5 5.8-7.1 7.2-8.5 15-16.4 23.4-23.8 2.1-1.9 4.3-3.7 6.5-5.5 1-.8 2-1.6 3.1-2.5 3.4-2.8-6.2 4.6-1.4 1.1 4.6-3.4 9.2-6.7 14-9.7 10.9-7 22.5-13.1 34.4-18.2-2.4 1-4.8 2-7.2 3 19.1-8 39.1-13.5 59.7-16.3-2.7.4-5.3.7-8 1.1 16.4-2.1 32.8-2 49.3-2h67.1 156.6c18.6 0 37.1-.4 55.6 2-2.7-.4-5.3-.7-8-1.1 20.5 2.8 40.6 8.2 59.7 16.3-2.4-1-4.8-2-7.2-3 10.5 4.5 20.7 9.7 30.5 15.7 4.9 3 9.6 6.1 14.2 9.5 1.1.8 2.1 1.5 3.2 2.3.5.4 1 .8 1.6 1.2 2.3 1.7-4-2.8-3.5-2.7 2.1.4 5.5 4.4 7.1 5.8 8.5 7.2 16.4 15 23.8 23.4 1.9 2.1 3.7 4.3 5.5 6.5.8 1 1.6 2 2.5 3.1 2.8 3.4-4.6-6.2-1.1-1.4 3.4 4.6 6.7 9.2 9.7 14 7 10.9 13.1 22.5 18.2 34.4-1-2.4-2-4.8-3-7.2 8 19.1 13.5 39.1 16.3 59.7-.4-2.7-.7-5.3-1.1-8 2.3 18 2 36.1 2 54.2v64.2c0 6.7.4 13.6-.5 20.3.4-2.7.7-5.3 1.1-8-.6 4-1.7 7.8-3.2 11.5 1-2.4 2-4.8 3-7.2-1.2 2.8-2.6 5.5-4.3 8.1s-4 3.5 1.6-1.9c-1.1 1-2 2.3-3 3.3-.3.3-3.2 3.2-3.3 3 0 0 7.3-5.2 1.9-1.6-2.5 1.7-5.2 3.1-8.1 4.3l7.2-3c-3.7 1.5-7.6 2.5-11.5 3.2 2.7-.4 5.3-.7 8-1.1-2.3.3-4.5.4-6.9.5-15.7.2-30.7 13.6-30 30 .7 16.1 13.2 30.2 30 30 36.1-.5 70.5-26.6 76.4-63.2 2.2-13.6 1.6-27.4 1.6-41.1 0-18.1 0-36.3 0-54.4 0-12.7.3-25.5-.7-38.2-4.3-57.8-26.9-111.9-65.1-155.6-35.8-41-86-70.6-139.3-81.8-27.4-5.8-54.6-6.1-82.3-6.1-32.8 0-65.6 0-98.5 0-34.9 0-69.7 0-104.6 0-21.2 0-42.8-.9-63.9 1.4-30.3 3.4-58.6 11.1-86.3 23.9-24.5 11.3-47.2 27.2-66.9 45.6-39.8 37.2-68.2 88.3-77.6 142-6.1 35.1-4.5 70.7-4.5 106.2v41.5c0 28.9 15.4 58.1 42.1 71 12.4 6 25.3 8.8 39.1 8.8h15.1 61.1 92 109 113.2 104.7 82.1 47 6.2c15.7 0 30.7-13.8 30-30-.6-16.3-13-30-29.9-30z"
                          ></path>
                        </g>
                      </g>
                    </g>
                  </svg>
                </span>
              </Link>
              <Link
                href="wishlist.html"
                className="relative flex flex-col items-center justify-center rounded-tl-lg p-1 text-white"
              >
                <span className="text-2xl mb-1 text-[#e4dfc9]">
                  <span className="absolute z-10 top-2 -right-1 inline-flex items-center justify-center p-1 h-4 w-4 text-xs font-normal leading-none text-white transform -translate-x-1/2 -translate-y-1/2 bg-[#b88c4f]  rounded-full">
                    0
                  </span>
                  <svg
                    fill="#ffffff"
                    width="18pt"
                    height="18pt"
                    id="fi_13369080"
                    enableBackground="new 0 0 100 100"
                    viewBox="0 0 100 100"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      id="Add_to_Favorite"
                      d="m50 91c-2.733 0-5.306-1.065-7.242-2.999v-.001l-33.129-33.129c-4.919-4.919-7.629-11.459-7.629-18.417v-.407c0-6.958 2.71-13.499 7.629-18.417s11.461-7.63 18.416-7.63h.41c6.955 0 13.497 2.71 18.416 7.629l3.129 3.129 3.129-3.129c4.919-4.919 11.461-7.629 18.416-7.629h.41c6.955 0 13.497 2.71 18.416 7.629s7.629 11.459 7.629 18.417v.407c0 6.958-2.71 13.499-7.629 18.417l-33.129 33.13c-1.936 1.935-4.509 3-7.242 3zm-3-7.242c1.608 1.605 4.395 1.601 6-.001l33.129-33.127c3.785-3.788 5.871-8.821 5.871-14.176v-.407c0-5.355-2.086-10.389-5.871-14.175s-8.821-5.872-14.174-5.872h-.41c-5.353 0-10.389 2.084-14.174 5.871l-5.25 5.25c-1.172 1.172-3.07 1.172-4.242 0l-5.25-5.25c-3.785-3.787-8.821-5.871-14.174-5.871h-.41c-5.353 0-10.389 2.084-14.174 5.871s-5.871 8.82-5.871 14.175v.407c0 5.355 2.086 10.389 5.871 14.175z"
                    ></path>
                  </svg>
                </span>
              </Link>
              <button
                type="button"
                className="relative flex flex-col items-center justify-center rounded-tl-lg p-1 text-white group hover-bg-[#000] "
                data-drawer-target="drawer-right-cart"
                data-drawer-show="drawer-right-cart"
                data-drawer-placement="right"
                aria-controls="drawer-right-cart"
              >
                <span className="text-2xl mb-1 text-[#e4dfc9]">
                  <span className="absolute z-10 top-2 -right-1 inline-flex items-center justify-center p-1 h-4 w-4 text-xs font-normal leading-none text-white transform -translate-x-1/2 -translate-y-1/2 bg-[#b88c4f]  rounded-full">
                    0
                  </span>
                  <svg
                    fill="#ffffff"
                    width="18pt"
                    height="18pt"
                    viewBox="-35 0 512 512.00102"
                    xmlns="http://www.w3.org/2000/svg"
                    id="fi_1656850"
                  >
                    <path d="m443.054688 495.171875-38.914063-370.574219c-.816406-7.757812-7.355469-13.648437-15.15625-13.648437h-73.140625v-16.675781c0-51.980469-42.292969-94.273438-94.273438-94.273438-51.984374 0-94.277343 42.292969-94.277343 94.273438v16.675781h-73.140625c-7.800782 0-14.339844 5.890625-15.15625 13.648437l-38.9140628 370.574219c-.4492192 4.292969.9453128 8.578125 3.8320308 11.789063 2.890626 3.207031 7.007813 5.039062 11.324219 5.039062h412.65625c4.320313 0 8.4375-1.832031 11.324219-5.039062 2.894531-3.210938 4.285156-7.496094 3.835938-11.789063zm-285.285157-400.898437c0-35.175782 28.621094-63.796876 63.800781-63.796876 35.175782 0 63.796876 28.621094 63.796876 63.796876v16.675781h-127.597657zm-125.609375 387.25 35.714844-340.097657h59.417969v33.582031c0 8.414063 6.824219 15.238282 15.238281 15.238282s15.238281-6.824219 15.238281-15.238282v-33.582031h127.597657v33.582031c0 8.414063 6.824218 15.238282 15.238281 15.238282 8.414062 0 15.238281-6.824219 15.238281-15.238282v-33.582031h59.417969l35.714843 340.097657zm0 0"></path>
                  </svg>
                </span>
              </button>
            </div>
          </div>

          <div className="flex lg:hidden">
            <MobileSidebar />
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
