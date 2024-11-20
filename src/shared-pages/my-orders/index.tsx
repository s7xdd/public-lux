import Image from 'next/image';
import React from 'react';

const MyOrders = () => {

    // Sample order data
    const orders = [
        {
            id: 1,
            productName: 'Luxmetallic II',
            color: 'Brushed Gold',
            customerName: 'asd asdxddsad',
            optionalText: 'ad3d',
            cardNumber: '12323 34342 2233',
            cardPlacement: 'Front',
            borders: 'Box Deco (+$10)',
            logo: 'Tarus',
            total: 379,
            image: '/assets/img/card2.png'
        },
        {
            id: 2,
            productName: 'Luxmetallic II',
            color: 'Brushed Gold',
            customerName: 'asd asdxddsad',
            optionalText: 'ad3d',
            cardNumber: '12323 34342 2233',
            cardPlacement: 'Front',
            borders: 'Box Deco (+$10)',
            logo: 'Tarus',
            total: 379,
            image: '/assets/img/card1.png'
        }
    ];

    return (
        <section className="services bg-white py-16 w-full px-0">
            <div className="container mx-auto px-4 md:px-6 lg:px-8">
                <div className="lx-card-listing-section">
                    <div className="border-b-2 mb-[20px] py-3 flex flex-col">
                        <h1 className="text-black text-2xl">My Orders</h1>
                        <div className="block">
                            <nav className="flex py-3" aria-label="Breadcrumb">
                                <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                                    <li className="inline-flex items-center">
                                        <a href="#" className="inline-flex items-center text-sm font-normal text-gray-700 hover:text-[var(--primary-color)]">
                                            <svg className="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"></path>
                                            </svg>
                                            Home
                                        </a>
                                    </li>
                                    <li aria-current="page" />
                                    <div className="flex items-center">
                                        <svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 9 4-4-4-4" />
                                        </svg>
                                        <a href="#" className="inline-flex items-center text-sm font-normal text-gray-700 hover:text-[var(--primary-color)] ms-2.5">
                                            Home
                                        </a>
                                    </div>
                                    <li aria-current="page">
                                        <div className="flex items-center">
                                            <svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 9 4-4-4-4" />
                                            </svg>
                                            <span className="ms-1 text-sm font-normal text-gray-500 md:ms-2 ">
                                                Wishlist
                                            </span>
                                        </div>
                                    </li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                    
                    <div className="flex flex-col gap-10">
                        {/* Map over the orders */}
                        {orders.map((order) => (
                            <div key={order.id} className="flex border rounded-xl gap-4 overflow-hidden group flex-col md:flex-row xl:flex-row">
                                <div className="grid overflow-hidden w-full xl:w-[400px] h-100 bg-[#00000017]">
                                    <Image src={order.image} alt={order.productName} height={200} width={200} />
                                </div>

                                <div className="flex xl:items-center w-full gap-3 p-4 flex-col xl:flex-row justify-center xl:justify-start">
                                    <div className="flex flex-col wrap px-3">
                                        <div className="flex mb-1">
                                            <h2 className="text-xl font-medium text-black m-0">
                                                {order.productName}
                                            </h2>
                                        </div>
                                        <ul className="!list-disc ps-4 text-base text-gray-600 mt-3">
                                            <li>CHOOSE COLOR : {order.color}</li>
                                            <li>YOUR NAME : {order.customerName}</li>
                                            <li>OPTIONAL TEXT : {order.optionalText}</li>
                                            <li>CARD NUMBER (OPTIONAL) : {order.cardNumber}</li>
                                            <li>CARD NUMBER PLACEMENT : {order.cardPlacement}</li>
                                            <li>TEXT ON TOP OF CARD (OPTIONAL) :</li>
                                            <li>ADD BORDERS (OPTIONAL) : {order.borders}</li>
                                            <li>CHOOSE LOGO : {order.logo}</li>
                                        </ul>
                                    </div>

                                    <div className="lx-card-total flex xl:flex-col px-3 xl:flex-1 items-center flex-row gap-2">
                                        <span className="uppercase text-gray-500">Total</span>
                                        <span className="font-bold sm:ms-3 md:ms-0 text-xl text-primary">
                                            AED {order.total}
                                        </span>
                                    </div>

                                    <div className="flex flex-row gap-2 wrap xl:px-10 lg:flex-row xl:flex-col">
                                        <a className="px-5 py-2 border rounded-full border-gray-600 text-black text-center" href="">Cancel Order</a>
                                        <a className="px-5 py-2 border rounded-full border-gray-600 text-black text-center" href="">Contact Support</a>
                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MyOrders;
