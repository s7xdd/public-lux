"use client";
import { apiEndpoints } from "@/server-api/config/api.endpoints";
import { useEffect, useRef, useState } from "react";
import FetchAPIData from "@/server-api/apifunctions/apifetch";
import Image from "next/image";
import {
  makeMoveable,
  DraggableProps,
  ScalableProps,
  RotatableProps,
  Rotatable,
  Draggable,
  Scalable,
  PinchableProps,
  Pinchable,
} from "react-moveable";
import MoveableHelper from "moveable-helper";
import html2canvas from "html2canvas";
import LoadingSkeleton from "@/components/common/card-skeleton";
import { Label } from "@mui/icons-material";


const Moveable = makeMoveable<DraggableProps & ScalableProps & RotatableProps>([
  Draggable,
  Scalable,
  Rotatable,
]);

const CustomizationSection = ({ hostName, slug }) => {
  const [image, setImage] = useState<string | null>(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [imageName, setImageName] = useState<string | null>(null);
  const [isVisibleName, setIsVisibleName] = useState(false);
  const [isVisibleOptional, setIsVisibleOptional] = useState(false);
  const [isVisibleNumber, setIsVisibleNumber] = useState(false);
  const [isVisibleTopNumber, setIsVisibleTopNumber] = useState(false)
  const [isVisibleImage, setIsVisibleImage] = useState(false);
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [cardPlacement, setCardPlacement] = useState<'front' | 'back'>('front');
  const [logos, setLogos] = useState([]);
  const [customLogo, setCustomLogo] = useState(false);
  const [isBorderVisible, setIsBorderVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [product, setProduct] = useState<any>(null);
  const [borders, setBorders] = useState<any>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [allVariations, setAllVariations] = useState<any>(null);
  const [formLabels, setFormLabels] = useState([]);
  const [selectedVariationId, setSelectedVariationId] = useState(null);
  const [selectedBorderId, setSelectedBorderId] = useState(null);
  const [displayBorder, setDisplayBorder] = useState(null);
  const [isDragging, setIsDragging] = useState({
    name: false,
    optional: false,
    number: false,
    topnumber: false,
    image: false,
  });
  const [inputValues, setInputValues] = useState({
    name: "",
    optional: "",
    number: "",
    topnumber: "",
  });
  const [cardFront, setCardFront] = useState('')
  const [cardBack, setCardBack] = useState('')

  const [helper] = useState(() => new MoveableHelper());

  // Refs for each draggable item
  const targetRef1 = useRef<HTMLDivElement>(null);
  const targetRef2 = useRef<HTMLDivElement>(null);
  const targetRef3 = useRef<HTMLDivElement>(null);
  const targetRef4 = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  // State for tracking position, scale, and rotation of each element
  const [elementValues, setElementValues] = useState({
    name: { left: 40, scale: 1, top: 300, height: 40, width: 100, rotate: 0 },
    optional: { left: 40, scale: 1, top: 330, height: 40, rotate: 0 },
    number: { left: 150, scale: 1, top: 250, height: 40, rotate: 0 },
    topnumber: { left: 180, scale: 1, top: 120, height: 40, rotate: 0 },
    image: { left: 200, scale: 1, top: 150, height: 200, width: 200, rotate: 0 },
  });


  // Check if the click is outside of the elements
  const handleClickOutside = (e: MouseEvent) => {
    if (targetRef1.current && !targetRef1.current.contains(e.target as Node)) {
      setIsVisibleName(false);
    }
    if (targetRef2.current && !targetRef2.current.contains(e.target as Node)) {
      setIsVisibleOptional(false);
    }
    if (targetRef3.current && !targetRef3.current.contains(e.target as Node)) {
      setIsVisibleNumber(false);
    }
    if (targetRef4.current && !targetRef4.current.contains(e.target as Node)) {
      setIsVisibleTopNumber(false);
    }
    if (imageRef.current && !imageRef.current.contains(e.target as Node)) {
      setIsVisibleImage(false);
    }
  };


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
        );
        setProduct(retVal);
        console.log(retVal)
        setCardFront(
          retVal.images[0]?.src || "/assets/img/detail-page/card-f.png"
        );
        setCardBack(retVal.images[1]?.src || "/assets/img/detail-page/card-b.jpg")
        console.log(retVal)
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
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside); // Cleanup on component unmount
    };
  }, []);

  // // Fetch data for the selected variation
  // const fetchVariationData = async (variationId) => {
  //   try {
  //     const apiEndpoint = apiEndpoints.products.productDetails(variationId);
  //     const variationDetails = await FetchAPIData.fetchAPIData(
  //       { apiEndpoint },
  //     );
  //     setVariationData(variationDetails);
  //     return variationDetails; // Return the fetched data
  //   } catch (err) {
  //     console.error("Error fetching variation data:", err);
  //     setError("Failed to load variation details.");
  //   }
  // };

  // Get attribute options from Product data and map them to variations
  const attributeOptions = product?.attributes[0]?.options || [];
  const variationIds = product?.variations || [];

  useEffect(() => {
    const fetchAllVariationData = async (variationIds) => {

      try {
        const tempFormLabels = product?.wcpa_form_fields?.wcpaData?.fields?.sec_0671f4cac4b395?.fields;
        setFormLabels(tempFormLabels)

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

          variationDetails.galleryImages = galleryImages;
          return variationDetails; // Return variation details along with images
        });

        const allVariationDetails = await Promise.all(variationPromises);

        // console.log(
        //   formLabels
        //     .flat()
        //     .find((label) => label.elementId === "text_1044961101")?.label || 'Default Label'
        // );

        const borderField = product.wcpa_form_fields.wcpaData.fields.sec_0671f4cac4b395.fields
          .flat() // Flatten the array to make it easier to search
          .find((field) => field.label === "ADD BORDERS (OPTIONAL)");

        if (borderField && Array.isArray(borderField.values)) {
          setBorders(borderField.values);
        }

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
    setCardFront(selectedVariation?.galleryImages[0]?.url ||
      product?.images[0]?.src ||
      "/assets/img/detail-page/card-f.png")
    setCardBack(selectedVariation?.galleryImages[1]?.url ||
      product?.images[1]?.src ||
      "/assets/img/detail-page/card-b.jpg")
  };

  const addBorder = (label) => {
    setSelectedBorderId(label);
    if (label === 'None') {
      setDisplayBorder(null)
    } else {
      const selectedBorder = borders.find((border) => border.label === label);
      if (selectedBorder) {
        setDisplayBorder(selectedBorder.image);
      }
    }
  };



  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Create a URL for the selected image file
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl); // Set the image preview
      setImageName(file.name); // Optionally store the image name
    }
  };

  // Update input values
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  // Handle Drag events to update position and show drag handles
  const handleDragStart = (text: string) => {
    setIsDragging((prev) => ({ ...prev, [text]: true }));
  };

  const handleDragEnd = (text: string) => {
    setIsDragging((prev) => ({ ...prev, [text]: false }));
  };

  // Handle Drag events to update position
  const handleDrag = (e: any, text: string) => {
    setElementValues((prevValues) => ({
      ...prevValues,
      [text]: {
        ...prevValues[text],
        left: e.left,
        top: e.top,
      },
    }));
  };

  // Handle Scale events to update width and height
  const handleScale = (e: any, text: string) => {
    setElementValues((prevValues) => ({
      ...prevValues,
      [text]: {
        ...prevValues[text],
        scale: e.scale[0],
      },
    }));
  };

  // Handle Rotate events to update rotation
  const handleRotate = (e: any, text: string) => {
    setElementValues((prevValues) => ({
      ...prevValues,
      [text]: {
        ...prevValues[text],
        rotate: e.rotate,
      },
    }));
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      alert("Form submitted");
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const toggleCard = () => {
    setIsCardFlipped(!isCardFlipped);
  };

  const handleTextClick = (target) => {
    switch (target) {
      case 'name':
        setIsVisibleName((prev) => !prev);
        break;
      case 'optional':
        setIsVisibleOptional((prev) => !prev);
        break;
      case 'number':
        setIsVisibleNumber((prev) => !prev);
        break;
      case 'topnumber':
        setIsVisibleTopNumber((prev) => !prev)
        break;
      case 'image':
        setIsVisibleImage((prev) => !prev)
        break;
      default:
        break;
    }
  };

  const getFieldByElementId = (elementId, field = 'label', Default) => {
    return formLabels
      .flat()
      .find((label) => label.elementId === elementId)?.[field] || Default;
  };
  

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCardPlacement(event.target.value as 'front' | 'back');
  };

  const handleSubmit = () => {
    const containerRef = document.getElementById("captureContainer");

    // Use html2canvas to capture the container as an image
    html2canvas(containerRef).then((canvas) => {
      const dataUrl = canvas.toDataURL("image/png");

      // Create a temporary link to download the image
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "final-image.png";
      link.click();
    });
  };

  return (
    <section>
      <div className="flex flex-col md:flex-row h-100 md:h-[calc(100vh-100px)]">
        {/* Left section */}
        <div className="w-full md:w-2/3 bg-gray-100 relative flex-1">
          {/* Action area for displaying total price and action buttons */}
          <div className="lx-action-area z-10 flex justify-between items-center p-5 border-b bg-white absolute top-0 w-full">
            <span className="text-2xl font-bold text-primary rounded-lg">
              {product && (
                <div>AED {product.price}</div>
              )}
            </span>
            <div className="lx-actions flex gap-2">
              <div className="flex items-center space-x-2">
                {/* Copy Button (visible on screens 500px and wider) */}
                <a
                  href="#"
                  className="items-center justify-center aspect-square min-w-[40px] bg-gray-200 rounded hover:bg-[#a77b3f] group hidden sm:flex"
                >
                  <svg
                    className="w-6 h-6 text-white dark:text-gray-600 group-hover:text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 4v3a1 1 0 0 1-1 1h-3m4 10v1a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h2m11-3v10a1 1 0 0 1-1 1h-7a1 1 0 0 1-1-1V7.87a1 1 0 0 1 .24-.65l2.46-2.87a1 1 0 0 1 .76-.35H18a1 1 0 0 1 1 1Z"
                    />
                  </svg>
                  <div className="absolute top-full mt-2 hidden group-hover:flex flex-col items-center">
                    <div className="relative bg-black text-white text-sm font-medium py-1 px-2 rounded shadow-lg text-nowrap">
                      Copy
                    </div>
                  </div>
                </a>

                {/* Download Button (visible on screens 500px and wider) */}
                <a
                  href="#"
                  className="relative lx-download-img flex rounded justify-center items-center aspect-square min-w-[40px] bg-gray-200 hover:bg-[#a77b3f] group hidden sm:flex"
                >
                  <svg
                    className="w-6 h-6 text-gray-800 dark:text-gray-600 group-hover:text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 13V4M7 14H5a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-2m-1-5-4 5-4-5m9 8h.01"
                    />
                  </svg>
                  <div className="absolute top-full mt-2 hidden group-hover:flex flex-col items-center">
                    <div className="relative bg-black text-white text-sm font-medium py-1 px-2 rounded shadow-lg text-nowrap">
                      Save Image
                    </div>
                  </div>
                </a>

                {/* More Options Button (visible on screens below 500px) */}
                <div className="relative flex sm:hidden">
                  <button
                    id="more-options"
                    className="flex items-center justify-center aspect-square min-w-[40px] bg-gray-200 rounded hover:bg-[#a77b3f]"
                  >
                    <svg
                      className="w-6 h-6 text-gray-800 dark:text-gray-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5zm0 4.5a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5zm0 4.5a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5z"
                      />
                    </svg>
                  </button>

                  {/* Dropdown Menu */}
                  <div
                    id="dropdown-menu"
                    className="absolute top-full mt-2 hidden flex-col items-center bg-white rounded-md shadow-xl w-28 overflow-hidden"
                  >
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 font-semibold hover:bg-gray-300 transition duration-200 ease-in-out"
                    >
                      Copy
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 font-semibold hover:bg-gray-300 transition duration-200 ease-in-out"
                    >
                      Save Image
                    </a>
                  </div>
                </div>
              </div>

              {/* Reset All Button */}
              <a
                href="#"
                className="relative bg-gray-200 text-gray-700 font-semibold py-2 min-w-[40px] aspect-square flex items-center justify-center rounded hover:bg-[#a77b3f] transition duration-200 group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  className="w-6 h-6 fill-current group-hover:text-white"
                >
                  <path
                    d="M15.312 11.424a5.5 5.5 0 0 1-9.201 2.466l-.312-.311h2.433a.75.75 0 0 0 0-1.5H3.989a.75.75 0 0 0-.75.75v4.242a.75.75 0 0 0 1.5 0v-2.43l.31.31a7 7 0 0 0 11.712-3.138.75.75 0 0 0-1.449-.39Zm1.23-3.723a.75.75 0 0 0 .219-.53V2.929a.75.75 0 0 0-1.5 0V5.36l-.31-.31A7 7 0 0 0 3.239 8.188a.75.75 0 1 0 1.448.389A5.5 5.5 0 0 1 13.89 6.11l.311.31h-2.432a.75.75 0 0 0 0 1.5h4.243a.75.75 0 0 0 .53-.219Z"
                    clipRule="evenodd"
                  />
                </svg>

                {/* Tooltip for Reset All */}
                <div className="absolute top-full mt-2 hidden group-hover:flex flex-col items-center">
                  <div className="relative bg-black text-white text-sm font-medium py-1 px-2 rounded shadow-lg text-nowrap">
                    Reset All
                  </div>
                </div>
              </a>

              {/* Add to Cart Button */}
              <a
                href="#"
                className="flex items-center bg-[#b88c4f] text-nowrap text-white py-2 px-4 rounded hover:bg-[#a77b3f] transition duration-200"
              >
                Add to Cart
              </a>
            </div>
          </div>

          {/* Card area for displaying the card */}
          <div className="h-full min-h-[500px] flex items-center justify-center flex-col relative">
            <div id="captureContainer" className="flex flex-col overflow-hidden md:flex-row items-center justify-center gap-8 mb-12 ">
              {loading ? (
                <div>loading</div>
              ) : (
                isCardFlipped ? (
                  <div className="relative">
                    <Image
                      src={cardBack}
                      height={400}
                      width={400}
                      alt="Card Back Preview"
                      className="w-full h-300 object-cover object-center shadow-lg border border-gray-300 rounded-lg"
                    />

                    {cardPlacement === 'back' && (
                      <div
                        ref={targetRef3}
                        onClick={() => handleTextClick('number')}
                        style={{
                          position: "absolute",
                          left: 30,
                          top: 200,
                          width: elementValues.number.width,
                          height: elementValues.number.height,
                          transform: `rotate(${elementValues.number.rotate}deg)`,
                          color: "white",
                          padding: "8px",
                          fontSize: "20px",
                          borderRadius: "4px",
                          cursor: "move",
                        }}
                      >
                        {inputValues.number}
                      </div>

                    )}
                  </div>
                ) : (
                  <div className="relative">
                    <Image
                      src={cardFront}
                      height={400}
                      width={400}
                      alt="Card Front Preview"
                      className="w-full h-300 object-cover object-center shadow-lg border border-gray-300 rounded-lg"
                    />
                    {displayBorder && (
                      <div
                        className="absolute top-0 left-0 w-full h-full pointer-events-none"
                        style={{
                          backgroundImage: `url(${displayBorder})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          borderRadius: "inherit",
                        }}
                      />
                    )}
                    <div
                      onClick={() => handleTextClick('image')}
                      ref={imageRef}
                      style={{
                        position: "absolute",
                        left: elementValues.image.left,
                        top: elementValues.image.top,
                        width: elementValues.image.width,   // This will be dynamically set via scaling
                        transform: `scale(${elementValues.image.scale}) rotate(${elementValues.image.rotate}deg)`,
                        transformOrigin: "center center", // Ensures rotation is centered
                        overflow: "hidden", // Prevents image from overflowing outside the container
                      }}
                    >
                      {image && customLogo && (
                        <Image
                          src={image}
                          alt="Uploaded Preview"
                          width={elementValues.image.width}  // You need to specify a fixed width for Next.js Image component
                          height={elementValues.image.height}  // You need to specify a fixed height for Next.js Image component
                          style={{
                            objectFit: "contain", // Or "cover", depending on how you want to fit the image
                          }}
                        />
                      )}
                    </div>


                    {/* Draggable text on top of the image */}
                    <div
                      onClick={() => handleTextClick('name')}
                      ref={targetRef1}
                      style={{
                        position: "absolute",
                        left: elementValues.name.left,
                        top: elementValues.name.top,
                        height: elementValues.name.height * elementValues.name.scale, // Scale the height
                        transform: `scale(${elementValues.name.scale}) rotate(${elementValues.name.rotate}deg)`,
                        color: "white",
                        padding: "8px",
                        fontSize: `${20 * elementValues.name.scale}px`,
                        borderRadius: "4px",
                        cursor: "move",

                      }}
                    >
                      {inputValues.name}
                    </div>

                    <div
                      ref={targetRef2}
                      onClick={() => handleTextClick('optional')}
                      style={{
                        position: "absolute",
                        left: elementValues.optional.left,
                        top: elementValues.optional.top,
                        height: elementValues.optional.height * elementValues.optional.scale, // Scale the height
                        transform: `scale(${elementValues.optional.scale}) rotate(${elementValues.optional.rotate}deg)`,
                        color: "white",
                        padding: "8px",
                        fontSize: `${20 * elementValues.optional.scale}px`,
                        borderRadius: "4px",
                        cursor: "move",
                      }}
                    >
                      {inputValues.optional}
                    </div>


                    {cardPlacement === 'front' && (
                      <div
                        ref={targetRef3}
                        onClick={() => handleTextClick('number')}
                        style={{
                          position: "absolute",
                          left: elementValues.number.left,
                          top: elementValues.number.top,
                          height: elementValues.number.height * elementValues.number.scale, // Scale the height
                          transform: `scale(${elementValues.number.scale}) rotate(${elementValues.number.rotate}deg)`,
                          color: "white",
                          padding: "8px",
                          fontSize: `${20 * elementValues.number.scale}px`,
                          borderRadius: "4px",
                          cursor: "move",
                        }}
                      >
                        {inputValues.number}
                      </div>

                    )}


                    <div
                      onClick={() => handleTextClick('topnumber')}
                      ref={targetRef4}
                      style={{
                        position: "absolute",
                        left: elementValues.topnumber.left,
                        top: elementValues.topnumber.top,
                        height: elementValues.topnumber.height * elementValues.topnumber.scale, // Scale the height
                        transform: `scale(${elementValues.topnumber.scale}) rotate(${elementValues.topnumber.rotate}deg)`,
                        color: "white",
                        padding: "8px",
                        fontSize: `${20 * elementValues.topnumber.scale}px`,
                        borderRadius: "4px",
                        cursor: "move",
                      }}
                    >
                      {inputValues.topnumber}
                    </div>


                    {/* Moveable components to handle drag, scale, and rotate interactions for each item */}
                    {image && isVisibleImage && (
                      <Moveable
                        target={imageRef.current}
                        draggable={true}
                        scalable={true}
                        keepRatio={true}
                        rotatable={true}
                        onDrag={(e) => handleDrag(e, "image")}
                        onScale={(e) => handleScale(e, "image")}
                        onRotate={(e) => handleRotate(e, "image")}
                        visible={isDragging.image} // Only visible when it's being dragged
                      />
                    )}


                    {/* Conditionally render Moveable based on visibility */}
                    {isVisibleName && (
                      <Moveable
                        target={targetRef1.current}
                        draggable={true}
                        scalable={true}
                        keepRatio={true}
                        rotatable={true}
                        onDragStart={() => handleDragStart("name")}
                        onDrag={(e) => handleDrag(e, "name")}
                        onScale={(e) => handleScale(e, "name")}
                        onRotate={(e) => handleRotate(e, "name")}
                        visible={isDragging.name} // Only visible when it's being dragged
                      />
                    )}
                    {isVisibleOptional && (

                      <Moveable
                        target={targetRef2.current}
                        draggable={true}
                        scalable={true}
                        keepRatio={true}
                        rotatable={true}
                        onDragStart={() => handleDragStart("optional")}
                        onDragEnd={() => handleDragEnd("optional")}
                        onDrag={(e) => handleDrag(e, "optional")}
                        onScale={(e) => handleScale(e, "optional")}
                        onRotate={(e) => handleRotate(e, "optional")}
                        visible={isDragging.optional}
                      />
                    )}
                    {isVisibleNumber && (

                      <Moveable
                        target={targetRef3.current}
                        draggable={true}
                        scalable={true}
                        keepRatio={true}
                        rotatable={true}
                        onDragStart={() => handleDragStart("number")}
                        onDragEnd={() => handleDragEnd("number")}
                        onDrag={(e) => handleDrag(e, "number")}
                        onScale={(e) => handleScale(e, "number")}
                        onRotate={(e) => handleRotate(e, "number")}
                        visible={isDragging.number}
                      />

                    )}

                    {isVisibleTopNumber && (
                      <Moveable
                        target={targetRef4.current}
                        draggable={true}
                        scalable={true}
                        keepRatio={true}
                        rotatable={true}
                        onDragStart={() => handleDragStart("topnumber")}
                        onDragEnd={() => handleDragEnd("topnumber")}
                        onDrag={(e) => handleDrag(e, "topnumber")}
                        onScale={(e) => handleScale(e, "topnumber")}
                        onRotate={(e) => handleRotate(e, "topnumber")}
                        visible={isDragging.topnumber} // Only visible when it's being dragged
                      />
                    )}

                  </div>
                )
              )}
            </div>

            {/* Button to switch card front */}
            <button
              onClick={toggleCard}
              className="bg-primary text-white border border-primary rounded-full py-[13px] px-[32px] font-regular uppercase hover:bg-[#f0dac6] hover:border-[#f0dac6] hover:text-[#343434] absolute bottom-8"
            >
              Switch front
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/3 bg-white p-6 shadow-lg rounded-lg overflow-y-auto">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Custom Card</h1>

          {/* Large device customization options */}
          <div className="hidden md:block">
            <div>
              <div className="mb-6">
                <label
                  htmlFor="add-borders"
                  className="block pb-3 border-b border-gray-300 text-gray-800 font-semibold mb-2"
                >
                  Choose Variant
                </label>


                {/* <select
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
                </select> */}

                <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2">
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

              {/* Input for Your Name */}
              <div className="mb-6">
                <label className="block text-gray-800 font-semibold mb-1">
                {getFieldByElementId("text_1044961101", 'label', "Your Name")}
                </label>
                <input
                  type="text"
                  name="name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AE9164] focus:border-[#AE9164] placeholder-gray-400"
                  placeholder="Your name"
                  value={inputValues.name}
                  onChange={handleInputChange}
                />
              </div>

              {/* Input for Optional Text */}
              <div className="mb-6">
                <label className="block text-gray-800 font-semibold mb-1">
                {getFieldByElementId("text-0672336657", 'label', "Optional Text")}
                </label>
                {/* <input
                  type="text"
                  
                /> */}

                <input
                  type="text"
                  name="optional"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AE9164] focus:border-[#AE9164] placeholder-gray-400"
                  placeholder="Optional text"
                  value={inputValues.optional}
                  onChange={handleInputChange}
                />

              </div>

              {/* Input for Card Number (Optional) */}
              <div className="mb-6">
                <label className="block text-gray-800 font-semibold mb-1">
                {getFieldByElementId("number_1044996642", 'label', "Card Number (Optional)")}
                </label>
                <input
                  type="text"
                  name="number"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AE9164] focus:border-[#AE9164] placeholder-gray-400"
                  placeholder="Enter card number"
                  value={inputValues.number}
                  onChange={handleInputChange}
                />
              </div>

              {/* Card Number Placement (Front or Back) */}
              <div className="mb-6">
                <label className="block text-gray-800 font-semibold mb-4">
                {getFieldByElementId("radio_7208132280", 'label', "Card Number Placement")}
                </label>
                <div className="flex items-center mb-4">
                  <input
                    type="radio"
                    id="no-branding"
                    name="remove-branding"
                    value="front"
                    className="mr-2 focus:ring-[#AE9164] text-[#b88c4f]"
                    checked={cardPlacement === 'front'}
                    onChange={handleRadioChange}
                  />
                  <label htmlFor="no-branding" className="text-gray-800 m-0">
                    Front
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="yes-branding"
                    name="remove-branding"
                    value="back"
                    className="mr-2 focus:ring-[#AE9164] text-[#b88c4f]"
                    checked={cardPlacement === 'back'}
                    onChange={handleRadioChange}
                  />
                  <label htmlFor="yes-branding" className="text-gray-800 m-0">
                    Back (+10)
                  </label>
                  {cardPlacement === 'back' && (
                    <span className="ml-2 bg-black text-white text-sm font-bold px-2 py-1 rounded-full">
                      $10.00
                    </span>
                  )}
                </div>
              </div>

              {/* Input for Text on Top of Card (Optional) */}
              <div className="mb-6">
                <label className="block text-gray-800 font-semibold mb-1">
                  {getFieldByElementId("radio_72081d32280", 'label', "Text on top of card (optional)")}
                </label>
                <input
                  type="text"
                  name="topnumber"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AE9164] focus:border-[#AE9164] placeholder-gray-400"
                  placeholder="Enter card number"
                  value={inputValues.topnumber}
                  onChange={handleInputChange}
                />
              </div>

              {/* Add Borders (Optional) */}
              <div className="mb-6">
                <label
                  htmlFor="add-borders"
                  className="block text-gray-800 font-semibold mb-4 pb-3 border-b border-gray-300"
                >
                   {getFieldByElementId("image_2833661161", 'label', "Add Borders")}
                </label>
                <div className="lx-colors grid grid-cols-[repeat(auto-fill,minmax(90px,1fr))] gap-2 mt-4">
                  {borders.map((border) => (
                    <div
                      onClick={() => addBorder(border.label)}
                      key={border.label}
                      className={`aspect-square bg-gray-100 rounded-md p-4 pt-0 transition duration-300 cursor-pointer logo-option border-2 
                        ${selectedBorderId === border.label ? 'border-[#AE9164]' : 'border-transparent'} hover:border-[#AE9164]`}
                    >
                      <Image
                        src={border.image}
                        height={20}
                        width={20}
                        alt="Brushed Black Logo"
                        className="w-full h-full object-contain rounded-md lx-card-logo"
                      />
                      <p className="text-center text-sm text-gray-600 truncate">
                        {border.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Choose Logo */}
              <div className="mb-6">
                <label
                  htmlFor="choose-logo"
                  className="block text-gray-800 font-semibold mb-4 pb-3 border-b border-gray-300"
                >
                  {getFieldByElementId("radio_2580742084", 'label', "Choose Logo")}
                </label>
                <div className="lx-colors grid grid-cols-[repeat(auto-fill,minmax(90px,1fr))] gap-2">

                  {/* Logo Options */}
                  <div
                    className="aspect-square bg-gray-100 rounded-md p-4 pt-0 transition duration-300 cursor-pointer logo-option border-transparent border-2 hover:border-[#AE9164]"
                    onClick={() => setCustomLogo(false)}>
                    <Image
                      src="/assets/img/no-logo.png"
                      alt="Brushed Black Logo"
                      height={20}
                      width={20}
                      className="w-full h-full object-contain rounded-md lx-card-logo"
                    />
                    <p className="text-center text-sm text-gray-600 truncate">
                      None
                    </p>
                  </div>

                  <div
                    className="logo-option bg-gray-100 lx-card-logo cursor-pointer p-4 pt-0 rounded-lg flex-1 text-center transition duration-200 border-transparent border-2 hover:border-[#AE9164] relative"
                    onClick={() => setCustomLogo(true)}
                  >
                    <Image
                      src="/assets/img/custom-logo.png"
                      height={20}
                      width={20}
                      alt="Brushed Black Logo"
                      className="w-full object-contain rounded-md lx-card-logo"
                    />
                    <p className="text-center w-min px-2 mx-auto py-1 bg-black rounded-full text-white text-xs font-semibold text-nowrap">
                      AED 5
                    </p>
                    <p className="mt-4 text-center text-sm text-gray-600">
                      Custom Logo
                    </p>
                  </div>
                </div>
                {customLogo && (
                  <div>
                    {/* File input */}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      style={{ marginBottom: "20px" }}
                    />

                    {/* Display image preview if available */}
                    {image ? (
                      <div>
                        <h3>Selected Image:</h3>
                        <Image
                          src={image}
                          height={350}
                          width={350}
                          alt="Preview"
                          style={{
                            maxWidth: "100%",
                            maxHeight: "400px",
                            objectFit: "contain",
                            border: "1px solid #ddd",
                            borderRadius: "8px",
                            marginBottom: "20px",
                          }}
                        />
                      </div>
                    ) : (
                      <p>No image selected yet.</p>
                    )}
                  </div>

                )}
              </div>

              {/* Add to Cart Button */}
              <button className="w-full bg-[#AE9164] py-3 rounded-full text-white text-lg font-bold hover:bg-[#9d7c47] transition duration-200 mt-4" onClick={handleSubmit}>
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        <div className="block md:hidden">
          <div id="stepper" className="w-full">
            {/* Step content */}
            <div className="p-5">
              <div className="mb-6 mt-6">
                <div className="flex justify-between">
                  <button
                    onClick={() => setCurrentStep(currentStep > 1 ? currentStep - 1 : 1)}
                    className="bg-gray-200 px-4 py-2 rounded-full text-sm"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setCurrentStep(currentStep < 4 ? currentStep + 1 : 4)}
                    className="bg-gray-200 px-4 py-2 rounded-full text-sm"
                  >
                    Next
                  </button>
                </div>
              </div>

              {/* Step 1: Choose Color */}
              {currentStep === 1 && (
                <div>
                  <label htmlFor="add-borders" className="block pb-3 border-b border-gray-300 text-gray-800 font-semibold mb-2">
                    Choose Color
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2">
                    {allVariations ? (
                      allVariations.map((variation) => (
                        <div
                          key={variation.id}
                          className={`bg-white p-3 rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer ${selectedVariationId === variation.id ? "border-2 border-primary box-border" : ""
                            }`}
                          onClick={() => handleVariationChange(variation.id)}
                          style={{ boxSizing: "border-box" }}
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
                          <h3 className="text-center font-semibold text-[13px] text-gray-800">{variation.name.split("-")[1]}</h3>
                        </div>
                      ))
                    ) : (
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
              )}

              {/* Step 2: Your Name */}
              {currentStep === 2 && (
                <div>
                  <label className="block text-gray-800 font-semibold mb-1">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AE9164] focus:border-[#AE9164] placeholder-gray-400"
                    placeholder="Your name"
                    value={inputValues.name}
                    onChange={handleInputChange}
                  />
                </div>
              )}

              {/* Step 3: Card Number Placement */}
              {currentStep === 3 && (
                <div>
                  <label className="block text-gray-800 font-semibold mb-4">Card number placement</label>
                  <div className="flex items-center mb-4">
                    <input
                      type="radio"
                      id="no-branding"
                      name="remove-branding"
                      value="front"
                      className="mr-2 focus:ring-[#AE9164] text-[#b88c4f]"
                      checked={cardPlacement === "front"}
                      onChange={handleRadioChange}
                    />
                    <label htmlFor="no-branding" className="text-gray-800 m-0">
                      Front
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="yes-branding"
                      name="remove-branding"
                      value="back"
                      className="mr-2 focus:ring-[#AE9164] text-[#b88c4f]"
                      checked={cardPlacement === "back"}
                      onChange={handleRadioChange}
                    />
                    <label htmlFor="yes-branding" className="text-gray-800 m-0">
                      Back (+10)
                    </label>
                    {cardPlacement === "back" && (
                      <span className="ml-2 bg-black text-white text-sm font-bold px-2 py-1 rounded-full">$10.00</span>
                    )}
                  </div>
                </div>
              )}

              {/* Step 4: Choose Logo */}
              {currentStep === 4 && (
                <div>
                  <label htmlFor="choose-logo" className="block text-gray-800 font-semibold mb-4 pb-3 border-b border-gray-300">
                    Choose Logo
                  </label>
                  <div className="lx-colors grid grid-cols-[repeat(auto-fill,minmax(90px,1fr))] gap-2">
                    <div className="aspect-square bg-gray-100 rounded-md p-4 pt-0 transition duration-300 cursor-pointer logo-option border-transparent border-2 hover:border-[#AE9164]" onClick={() => setCustomLogo(false)}>
                      <Image src="/assets/img/no-logo.png" alt="Brushed Black Logo" height={20} width={20} className="w-full h-full object-contain rounded-md lx-card-logo" />
                      <p className="text-center text-sm text-gray-600 truncate">None</p>
                    </div>

                    <div
                      className="logo-option bg-gray-100 lx-card-logo cursor-pointer p-4 pt-0 rounded-lg flex-1 text-center transition duration-200 border-transparent border-2 hover:border-[#AE9164] relative"
                      onClick={() => setCustomLogo(true)}
                    >
                      <Image src="/assets/img/custom-logo.png" height={20} width={20} alt="Brushed Black Logo" className="w-full object-contain rounded-md lx-card-logo" />
                      <p className="text-center w-min px-2 mx-auto py-1 bg-black rounded-full text-white text-xs font-semibold text-nowrap">AED 5</p>
                      <p className="mt-4 text-center text-sm text-gray-600">Custom Logo</p>
                    </div>
                  </div>
                  {customLogo && (
                    <div>
                      <input type="file" accept="image/*" onChange={handleFileChange} style={{ marginBottom: "20px" }} />
                      {image ? (
                        <div>
                          <h3>Selected Image:</h3>
                          <Image
                            src={image}
                            height={350}
                            width={350}
                            alt="Preview"
                            style={{
                              maxWidth: "100%",
                              maxHeight: "400px",
                              objectFit: "contain",
                              border: "1px solid #ddd",
                              borderRadius: "8px",
                              marginBottom: "20px",
                            }}
                          />
                        </div>
                      ) : (
                        <p>No image selected yet.</p>
                      )}
                    </div>
                  )}
                  {/* Add to Cart Button */}
                  <button
                    className="w-full bg-[#AE9164] py-3 rounded-full text-white text-lg font-bold hover:bg-[#9d7c47] transition duration-200 mt-4"
                    onClick={handleSubmit}
                  >
                    Add to Cart
                  </button>
                </div>
              )}



            </div>
          </div>
        </div>
      </div>
    </section >
  );
};

export default CustomizationSection;