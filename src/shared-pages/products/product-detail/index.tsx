"use client";

import { ProductDetailProps } from "@/types/products/types";
import React, { useEffect, useState } from "react";
import FetchAPIData from "@/server-api/apifunctions/apifetch";
import { apiEndpoints } from "@/server-api/config/api.endpoints";
import Image from "next/image";
import apiPost from "@/server-api/apifunctions/apipost";
import LoadingSkeleton from "@/components/common/card-skeleton";

const ProductDetail = ({ hostName, slug }: ProductDetailProps) => {
  const [product, setProduct] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [cardFront, setCardFront] = useState('')
  const [cardBack, setCardBack] = useState('')
  // const [selectedVariation, setSelectedVariation] = useState<number | null>(
  //   null
  // );
  const [allVariations, setAllVariations] = useState<any>(null);
  const [selectedVariationId, setSelectedVariationId] = useState(null);
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

  useEffect(() => {
    const fetchAllVariationData = async (variationIds) => {
      try {
        const variationPromises = variationIds.map(async (variationId) => {
          const apiEndpoint = apiEndpoints.products.productDetails(variationId);
          const variationDetails = await FetchAPIData.fetchAPIData({ apiEndpoint });

          let galleryImages = [];
          const galleryImageIds = variationDetails.meta_data.find(
            (meta) => meta.key === 'woo_variation_gallery_images'
          )?.value;

          if (Array.isArray(galleryImageIds)) {
            // Fetch gallery image details for the variation
            galleryImages = await Promise.all(
              galleryImageIds.map(async (imageId) => {
                const apiEndpoint = apiEndpoints.products.productImage(imageId);
                const response = await FetchAPIData.fetchAPIData({ apiEndpoint });

                return {
                  id: imageId,
                  url: response.source_url,
                  width: response.media_details.width,
                  height: response.media_details.height,
                };
              })
            );
          }

          // Add gallery images to variation details
          variationDetails.galleryImages = galleryImages;
          return variationDetails; // Return variation details along with images
        });

        const allVariationDetails = await Promise.all(variationPromises);

        setAllVariations(allVariationDetails);
        console.log("All Variations with Gallery Images:", allVariationDetails);

      } catch (err) {
        console.error("Error fetching variation data:", err);
        setError("Failed to load variation details.");
      }
    };

    if (product?.variations && product.variations.length > 0) {
      fetchAllVariationData(product.variations);
    }
  }, [product]);


  const handleVariationChange = async (id) => {
    setSelectedVariationId(id);
    const selectedVariation = allVariations.find(variation => variation.id === id);
    setCardFront(
    selectedVariation?.images?.[0]?.src ||
    product?.images[0]?.src ||
    "/assets/img/detail-page/card-f.png");
  setCardBack(
    selectedVariation?.images?.[1]?.src ||
    product?.images[1]?.src ||
    "/assets/img/detail-page/card-b.jpg");
  };


  // // Fetch data for the selected variation
  // const fetchVariationData = async (variationId: any) => {
  //   try {
  //     const apiEndpoint = apiEndpoints.products.productDetails(variationId);
  //     const variationDetails = await FetchAPIData.fetchAPIData(
  //       { apiEndpoint },
  //       hostName
  //     );
  //     setVariationData(variationDetails);
  //   } catch (err) {
  //     console.error("Error fetching variation data:", err);
  //     setError("Failed to load variation details.");
  //   }
  // };

  // const handleVariationChange = (
  //   event: React.ChangeEvent<HTMLSelectElement>
  // ) => {
  //   const variationId = parseInt(event.target.value);
  //   setSelectedVariation(variationId);
  //   fetchVariationData(variationId);
  // };

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
  // const frontImageSrc =
  //   variationData?.images?.[0]?.src ||
  //   product?.images[0]?.src ||
  //   "/assets/img/detail-page/card-f.png";
  // const backImageSrc =
  //   variationData?.images?.[1]?.src ||
  //   product?.images[1]?.src ||
  //   "/assets/img/detail-page/card-b.jpg";

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
                    src={cardFront}
                    height={300}
                    width={300}
                    alt="Card Front Preview"
                    className="w-full h-300 object-cover object-center shadow-lg border border-gray-300 rounded-lg"
                  />
                  <div className="absolute bottom-[6px] left-[25px]">
                    {side === "front" && (
                      <>
                        <div className="">
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
                    src={cardBack}
                    height={300}
                    width={300}
                    alt="Card Back Preview"
                    className="w-full h-300 object-cover object-center shadow-lg border border-gray-300 rounded-lg"
                  />
                  <div className="lx-card-info-b absolute bottom-[6px] left-[25px]">
                    {side === "back" && (
                      <>
                        <div className="">
                          <label htmlFor="card-name">Name</label>
                          <p id="cardName-b" className="uppercase text-lg sm:text-xl">
                            {name}
                          </p>
                        </div>
                        <div className="lx-card-number">
                          <label htmlFor="card-number">Card Number</label>
                          <p id="cardNumber-b" className="uppercase text-lg sm:text-xl">
                            {number}
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {allVariations && (
                <>
                  {/* Variation Selector */}
                  <div className="max-w-3xl mx-auto mb-8">
                    <label
                      htmlFor="variation-select"
                      className="block mb-2 font-medium text-gray-800"
                    >
                      Choose a Metal Finish:
                    </label>
                    <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-2">
                      {allVariations ? (
                        allVariations.map((variation) => (
                          <div
                            key={variation.id}
                            className={`bg-white p-3 rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer ${selectedVariationId === variation.id ? "border-2 border-primary box-border" : ""}`}
                            onClick={() => handleVariationChange(variation.id)} // Set the selected item
                            style={{ boxSizing: "border-box" }} // Ensure border is inside the box sizing
                          >

                            <div className="relative w-full h-20 mb-1">
                              <Image
                                src={variation.images[0].src}
                                alt={variation.name}
                                layout="fill"
                                objectFit="cover"
                                className="rounded-md"
                              />
                            </div>
                            <h3 className="text-center font-semibold text-[13px] text-gray-800">
                              {variation.name.split('-')[1]}
                            </h3>
                          </div>
                        ))
                      ) : (
                        // Skeleton loader when `allVariations` is not yet available
                        Array.from({ length: 8 }).map((_, index) => (
                          <div key={index} className="bg-white p-2 rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
                            <div className="relative w-full h-20 mb-1">
                              <LoadingSkeleton width="100%" height="100%" variant="rectangular" />
                            </div>
                            <LoadingSkeleton width="60%" height={20} className="mx-auto mt-2" />
                          </div>
                        ))
                      )}
                    </div>

                  </div>
                </>
              )}





              {/* Display Selected Variation Details */}
              {/* {variationData && (
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
              )} */}
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
