"use client";

import React, { useEffect, useState } from "react";
import FetchAPIData from "@/server-api/apifunctions/apifetch";
import { apiEndpoints } from "@/server-api/config/api.endpoints";
import { ProductListingProps } from "@/types/products/types";
import { useRouter } from "next/navigation";
import { routes } from "@/config/routes";
import Image from "next/image";
import LoadingSkeleton from "@/components/common/card-skeleton";

const ProductCardSkeleton = () => {
  return (
    <div className="flex flex-col border rounded-xl gap-3 p-4 items-center">
      {/* Image Skeleton */}
      <LoadingSkeleton width={300} height={300} variant="rectangular" />

      {/* Title Skeleton */}
      <LoadingSkeleton
        width="80%"
        height={20}
        variant="text"
        className="mt-2"
      />

      {/* Price Skeleton */}
      <LoadingSkeleton
        width="50%"
        height={20}
        variant="text"
        className="mt-2"
      />
    </div>
  );
};

const ProductListing = ({ hostName, slug = null }: ProductListingProps) => {
  const [productData, setProductData] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const router = useRouter();

  const fetchProducts = async () => {
    const retVal = await FetchAPIData.fetchAPIData(
      {
        apiEndpoint: apiEndpoints.products.productLists,
        slug,
      },
      hostName
    );
    if (Array.isArray(retVal)) {
      setProductData(retVal);
      setLoading(false);
    } else {
      console.error("API did not return an array:", retVal);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [slug]);

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedCategory(event.target.value);
  };

  // Manage Category filtering from backend
  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredProducts(productData);
    } else {
      setFilteredProducts(
        productData.filter((product) =>
          product.categories.some(
            (category: any) => category.slug === selectedCategory
          )
        )
      );
    }
  }, [selectedCategory, productData]);

  const getCategories = () => {
    const categoriesSet = new Set<string>(["All"]);
    productData.forEach((product) => {
      product?.categories?.forEach((category: any) => {
        categoriesSet.add(category.slug);
      });
    });
    return Array.from(categoriesSet);
  };

  return (
    <>
      <section className="bg-black relative flex items-center justify-center h-[640px] -mt-[100px] p-0">
        <div className="absolute inset-0 h-full w-full overflow-hidden">
          <Image
            src="/assets/img/shop-all/banner.png"
            layout="fill"
            objectFit="cover"
            alt="Banner"
          />
        </div>
        <div className="relative z-10 text-center text-white px-4 md:px-0 pt-[150px]">
          <h1 className="text-[40px] font-bold leading-tight md:leading-[40px] mb-4">
            Discover the Collection
          </h1>
          <p className="text-[18px] md:text-[25px] font-light leading-relaxed mt-4">
            Explore our curated selection of pre-designed cards, crafted to
            elevate your style.
          </p>
        </div>
      </section>

      <section className="services bg-white pt-[50px] w-full px-0">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="lx-card-listing-section">
            <div className="lx-card-list-head border-b-2 mb-5 py-3 flex justify-between items-center">
              <h2 className="text-black text-2xl">Pre-Designed Cards</h2>
              <div className="lx-filter flex items-center">
                <p className="lx-filter-label text-lg font-medium text-gray-900 mr-5">
                  Filter by Category:
                </p>
                <select
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                  className="lx-select rounded-full px-4 pr-8 border-gray-300 text-gray-700 sm:text-sm py-2"
                >
                  {getCategories().map(
                    (categorySlug: string, index: number) => {
                      const category = productData
                        .flatMap((product: any) => product?.categories)
                        .find((cat: any) => cat.slug === categorySlug);

                      return (
                        <option key={index} value={categorySlug}>
                          {category?.name || "All"}
                        </option>
                      );
                    }
                  )}
                </select>
              </div>
            </div>

            <div className="lx-card-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6">
              {loading ? (
                Array.from({ length: 4 }).map((_, index) => (
                  <ProductCardSkeleton key={index} />
                ))
              ) : filteredProducts?.length > 0 ? (
                filteredProducts.map((data: any, i: number) => (
                  <div
                    key={i}
                    className="lx-card flex flex-col border rounded-xl gap-3 p-4 transition ease-in-out hover:border-[#C7AD44] relative group items-center"
                  >
                    <div className="relative overflow-hidden w-full flex justify-center">
                      <Image
                        src={data?.images[0]?.src || "/default-image.jpg"}
                        width={300}
                        height={300}
                        alt="Product image"
                      />
                      <span className="absolute top-2 left-2 px-2 py-1 bg-primary text-[11px] text-white rounded-lg">
                        Best Seller
                      </span>
                      <a
                        className="absolute cursor-pointer text-[12px] md:text[14px] whitespace-nowrap bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full group-hover:translate-y-0 px-4 py-2 text-white btn-primary rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"
                        onClick={() =>
                          router.push(routes.product.productsDetail(data?.id))
                        }
                      >
                        Add to Cart
                      </a>
                    </div>
                    <div className="flex flex-col items-center justify-center text-center px-3">
                      <h3 className="text-lg font-medium text-black m-0">
                        {data?.name}
                      </h3>
                      <h4 className="text-lg text-primary font-bold">
                        AED {data?.price}
                      </h4>
                    </div>
                  </div>
                ))
              ) : (
                <p>No products found in this category.</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductListing;
