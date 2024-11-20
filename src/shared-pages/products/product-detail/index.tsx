"use client";

import { ProductDetailProps } from "@/types/products/types";
import React, { useEffect, useState } from "react";
import FetchAPIData from "@/server-api/apifunctions/apifetch";
import { apiEndpoints } from "@/server-api/config/api.endpoints";
import Image from "next/image";
import apiPost from "@/server-api/apifunctions/apipost";

const ProductDetail = ({ hostName, slug }: ProductDetailProps) => {
  const [product, setProduct] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedVariation, setSelectedVariation] = useState<number | null>(
    null
  );
  const [variationData, setVariationData] = useState<any>(null);
  const [side, setSide] = useState("front");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  // Fetching products using ID - to change to slug
  useEffect(() => {
    if (!slug) {
      console.error("Product slug is undefined");
      return;
    }

    const fetchProduct = async () => {
      try {
        const apiEndpoint = apiEndpoints.products.productDetails(slug);
        const retVal = await FetchAPIData.fetchAPIData(
          { apiEndpoint },
          hostName
        );
        setProduct(retVal);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Failed to load product details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug, hostName]);

  // Fetch data for the selected variation
  const fetchVariationData = async (variationId: any) => {
    try {
      const apiEndpoint = apiEndpoints.products.productDetails(variationId);
      const variationDetails = await FetchAPIData.fetchAPIData(
        { apiEndpoint },
        hostName
      );
      setVariationData(variationDetails);
    } catch (err) {
      console.error("Error fetching variation data:", err);
      setError("Failed to load variation details.");
    }
  };

  const handleVariationChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const variationId = parseInt(event.target.value);
    setSelectedVariation(variationId);
    fetchVariationData(variationId);
  };

  const formatCardNumber = (value: any) => {
    // Remove all non-numeric characters
    const cleanValue = value.replace(/\D/g, "");

    // Add a space after every 4 digits
    const formattedValue = cleanValue.replace(/(\d{4})(?=\d)/g, "$1 ");
    const limitedValue = cleanValue.slice(0, 16);

    return formattedValue;
  };

  const handleChange = (e: any) => {
    const formattedNumber = formatCardNumber(e.target.value);
    setNumber(formattedNumber);
  };

  // Get attribute options from Product data and map them to variations
  const attributeOptions = product?.attributes[0]?.options || [];
  const variationIds = product?.variations || [];

  // Determine the images to display (either from selected variation or default product or placeholder)
  const frontImageSrc =
    variationData?.images?.[0]?.src ||
    product?.images[0]?.src ||
    "/assets/img/detail-page/card-f.png";
  const backImageSrc =
    variationData?.images?.[1]?.src ||
    product?.images[1]?.src ||
    "/assets/img/detail-page/card-b.jpg";

  const handleAddToCart = async (e: Event) => {
    e.preventDefault();

    const data = {
      name: name,
      number: number,
      side: side,
      variation: variationData,
    };

    console.log(data);

    const handleAddToCart = async (data) => {
      const postAPIValues = {
        apiEndpoint: apiEndpoints.products.addToCart,
        hostName: window.location.hostname,
        ...data,
      };
      try {
        const response = await apiPost.postAPI(postAPIValues);
        console.log("Added to cart", response);
      } catch (error) {
        console.error("Error in adding to cart", error);
      } finally {
        setLoading(false);
      }
    };

    handleAddToCart(data);
  };

  return (
    <>
      <section>
        <div className="text-center mt-5 mb-12">
          <h2 className="text-4xl font-normal text-[#272727]">
            Customize Your Card
          </h2>
          <p className="text-gray-600">
            Discover how clients personalized their cards and why they stand
            out.
          </p>
        </div>

        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          {/* To insert skeleton */}
          {loading ? (
            <p>Loading product details...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <div>
              {/* Card Images */}
              <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-12">
                <div className="max-w-lg relative group">
                  <Image
                    src={frontImageSrc}
                    height={300}
                    width={300}
                    alt="Card Front Preview"
                    className="w-full h-300 object-cover object-center shadow-lg border border-gray-300 rounded-lg"
                  />
                  <div className="absolute bottom-[6px] left-[25px]">
                    {side === "front" && (
                      <>
                        <div className="mb-2">
                          <label htmlFor="card-name">Card Name</label>
                          <p
                            id="cardName-f"
                            className="uppercase text-xl md:case text-md lg:text-xl"
                          >
                            {name}
                          </p>
                        </div>
                        <div className="">
                          <label htmlFor="card-Number">Card Number</label>
                          <p
                            id="cardName-f"
                            className="uppercase text-xl md:text-text-md lg:text-xl"
                          >
                            {number}
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="max-w-lg relative">
                  <Image
                    src={backImageSrc}
                    height={300}
                    width={300}
                    alt="Card Back Preview"
                    className="w-full h-300 object-cover object-center shadow-lg border border-gray-300 rounded-lg"
                  />
                  <div className="lx-card-info-b absolute bottom-[6px] left-[25px]">
                    {side === "back" && (
                      <>
                        <div className="lx-card-name mb-2">
                          <label htmlFor="card-name">Card Name</label>
                          <p
                            id="cardName-b"
                            className="uppercase text-lg sm:text-xl"
                          >
                            {name}
                          </p>
                        </div>
                        <div className="lx-card-number">
                          <label htmlFor="card-number">Card Number</label>
                          <p
                            id="cardNumber-b"
                            className="uppercase text-lg sm:text-xl"
                          >
                            {number}
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
              

              {/* Variation Selector */}
              <div className="max-w-xl mx-auto mb-8">
                <label
                  htmlFor="variation-select"
                  className="block mb-2 font-medium text-gray-800"
                >
                  Choose a Metal Finish:
                </label>
                <select
                  id="variation-select"
                  value={selectedVariation || ""}
                  onChange={handleVariationChange}
                  className="w-full p-3 bg-white text-gray-900 rounded-lg border border-gray-300 focus:outline-none focus:border-yellow-500"
                >
                  <option value="" disabled>
                    Select a finish
                  </option>
                  {attributeOptions.map((option: string, index: number) => (
                    <option key={index} value={variationIds[index]}>
                      {option}
                    </option>
                  ))}
                </select>
                
                <div className=" grid grid-cols-[repeat(auto-fill,minmax(90px,1fr))] gap-5 mt-4 relative h-[100%] ">
                  <div
                    className="flex flex-col items-center justify-center rounded-md p-4 transition duration-300 hover:bg-opacity-80 cursor-pointer relative"
                    style={{ backgroundColor: "rgb(212, 175, 55)" }}
                  >
                    <div className="absolute right-[-8px] top-[-10px] bg-[#bc8c54] rounded-full border-2 border-white p-[1px] hidden">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-5 h-5 text-white"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <p className="text-center w-min px-3 mx-auto py-1 mb-2 bg-black rounded-full text-white text-xs font-semibold text-nowrap">
                      AED 25
                    </p>
                    <p className="text-center text-sm text-gray-600">
                      Brushed Gold
                    </p>
                  </div>
                  <div
                    className="flex flex-col items-center justify-center rounded-md p-4 transition duration-300 hover:bg-opacity-80 cursor-pointer relative"
                    style={{ backgroundColor: "rgb(74, 74, 74)" }}
                  >
                    <div className="absolute right-[-8px] top-[-10px] bg-[#bc8c54] rounded-full border-2 border-white p-[1px] hidden">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-5 h-5 text-white"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <p className="text-center w-min px-3 mx-auto py-1 mb-2 bg-black rounded-full text-white text-xs font-semibold text-nowrap">
                      AED 25
                    </p>
                    <p className="text-center text-sm text-gray-300">
                      Matte Black
                    </p>
                  </div>
                  <div
                    className="flex flex-col items-center justify-center rounded-md p-4 transition duration-300 hover:bg-opacity-80 cursor-pointer relative"
                    style={{ backgroundColor: "rgb(0, 188, 212)" }}
                  >
                    <div className="absolute right-[-8px] top-[-10px] bg-[#bc8c54] rounded-full border-2 border-white p-[1px] hidden">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-5 h-5 text-white"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <p className="text-center w-min px-3 mx-auto py-1 mb-2 bg-black rounded-full text-white text-xs font-semibold text-nowrap">
                      AED 25
                    </p>
                    <p className="text-center text-sm text-gray-600">
                      Ocean Blue
                    </p>
                  </div>
                  <div
                    className="flex flex-col items-center justify-center rounded-md p-4 transition duration-300 hover:bg-opacity-80 cursor-pointer relative"
                    style={{ backgroundColor: "rgb(149, 165, 166)" }}
                  >
                    <div className="absolute right-[-8px] top-[-10px] bg-[#bc8c54] rounded-full border-2 border-white p-[1px] hidden">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-5 h-5 text-white"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <p className="text-center w-min px-3 mx-auto py-1 mb-2 bg-black rounded-full text-white text-xs font-semibold text-nowrap">
                      AED 25
                    </p>
                    <p className="text-center text-sm text-gray-300">
                      Brushed Silver
                    </p>
                  </div>
                  <div
                    className="flex flex-col items-center justify-center rounded-md p-4 transition duration-300 hover:bg-opacity-80 cursor-pointer relative"
                    style={{ backgroundColor: "rgb(52, 152, 219)" }}
                  >
                    <div className="absolute right-[-8px] top-[-10px] bg-[#bc8c54] rounded-full border-2 border-white p-[1px] hidden">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-5 h-5 text-white"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <p className="text-center w-min px-3 mx-auto py-1 mb-2 bg-black rounded-full text-white text-xs font-semibold text-nowrap">
                      AED 25
                    </p>
                    <p className="text-center text-sm text-gray-600">
                      Sky Blue
                    </p>
                  </div>
                </div>

              </div>



              {/* Display Selected Variation Details */}
              {variationData && (
                <div className="max-w-lg mx-auto bg-gray-100 p-0 rounded-lg shadow-md flex flex-col items-center">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Selected Card Details:
                  </h3>
                  <p className="text-gray-700">Card: {variationData.name}</p>
                  <p className="text-gray-700">
                    Price:{" "}
                    <span className="font-semibold">{variationData.price}</span>{" "}
                    DHS
                  </p>
                </div>
              )}
            </div>
          )}
          <div className="bg-gray-100 p-8 rounded-lg shadow-lg max-w-lg mx-auto">
            <h2 className="text-center text-2xl font-bold text-gray-800 mb-6">
              Add Card Details
            </h2>
            <form
              action="#"
              method="POST"
              className="space-y-6 lx-card-form text-black"
            >
              {/* Name Input */}
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Name on Card"
                  className="w-full p-3 bg-white text-black rounded-lg border border-gray-300 focus:outline-none focus:border-yellow-500"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={30}
                  // required=""
                />
              </div>
              {/* Card Number Input (Optional) */}
              <div>
                <input
                  type="text"
                  name="card_number"
                  placeholder="Card Number (Optional)"
                  className="w-full p-3 bg-white text-gray-900 rounded-lg border border-gray-300 focus:outline-none focus:border-yellow-500"
                  value={number}
                  onChange={handleChange}
                  maxLength={19}
                />
              </div>
              <div className="flex justify-center space-x-8">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="card_location"
                    defaultValue="front"
                    className="form-radio text-[#aa8453] h-5 w-5"
                    value={"front"}
                    onChange={() => setSide("front")}
                    // defaultChecked=""
                  />
                  <span className="ml-3 text-gray-900">Front of Card</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="card_location"
                    defaultValue="back"
                    className="form-radio text-[#aa8453] h-5 w-5"
                    value={"back"}
                    onChange={() => setSide("back")}
                  />
                  <span className="ml-3 text-gray-900">Back of Card</span>
                </label>
              </div>
              {/* Submit Button */}
              <div>
                {/* <a
                    href="add-to-cart.html"
                    className="bg-primary text-center text-white border border-primary rounded-full py-[8px] px-[30px] font-regular uppercase hover:bg-[#f0dac6] hover:border-[#f0dac6] hover:text-[#343434] w-100 block "
                  >
                    Continue
                  </a> */}
                <button
                  type="submit"
                  onClick={handleAddToCart}
                  className="bg-primary w-full py-3 font-normal text-white rounded-full hover:bg-[#b59a30] focus:outline-none transition-all"
                >
                  Add to cart
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDetail;
