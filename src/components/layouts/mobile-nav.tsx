import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

const MobileSidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  // useEffect(() => {
  //   const handleClickOutside = (event: MouseEvent) => {
  //     if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
  //       setSidebarOpen(false);
  //     }
  //   };

  //   // Add event listener
  //   document.addEventListener("mousedown", handleClickOutside);

  //   // Remove event listener on cleanup
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);

  const handleClick = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="relative">
      {/* Menu Icon */}
      { !sidebarOpen && (

        <div onClick={handleClick} className="p-2 cursor-pointer rounded-lg bg-blue-600">
          <svg
            width="20px"
            height="20px"
            viewBox="0 0 24 24"
            fill="#ffffff"
            xmlns="http://www.w3.org/2000/svg"
            >
            <path
              d="M4 6H20M4 12H20M4 18H20"
              stroke="#ffffff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              />
          </svg>
      </div>
            )}

      {/* Sidebar */}
      <div
        ref={sidebarRef}
      className={`fixed top-0 right-0 h-[100vh] w-[400px] z-10 bg-black opacity-90 text-white p-6 transition-transform duration-300 font-semibold ${
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end mt-5 mb-10" onClick={handleClick}>
        <svg
            width="40px"
            height="40px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="cursor-pointer"
          >
            <path
              d="M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12Z"
              stroke="#ffffff"
              stroke-width="1.5"
            />
            <path
              d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5"
              stroke="#ffffff"
              stroke-width="1.5"
              stroke-linecap="round"
            />
          </svg>
        </div>
        <ul className="space-y-5 text-white text-[32px] z-10 ml-6">
          <li className="uppercase"><Link href={'/'}>Shop All</Link></li>
          <li className="uppercase"><Link href={'/'}>Custom Metal Cards</Link></li>
          <li className="uppercase"><Link href={'/'}>Business Credit Cards</Link></li>
          <li className="uppercase"><Link href={'/'}>Dual Chip Cards</Link></li>
          <li className="uppercase"><Link href={'/'}>Jewelry Cards</Link></li>
          <li className="uppercase"><Link href={'/'}>Metal NFC Cards</Link></li>
        </ul>
      </div>
    </div>
  );
};

export default MobileSidebar;
