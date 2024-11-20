import React from 'react'

const Faq = () => {

    return (
        <>
            <section
                className="lx-faq bg-white py-16 w-full px-0 text-black"
                data-appear="fade-up"
                data-delay={200}
                data-tp-count={2}
                data-unload="fade-up"
            >
                <div className="container mx-auto px-4 md:px-6 lg:px-8">
                    <div className="max-w-3xl  shadow-lg  mx-auto p-6 bg-white rounded-lg">
                        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
                            Frequently Asked Questions
                        </h1>
                        <div className="faq mb-2">
                            <div className="faq-question cursor-pointer p-4 bg-[#e2d9b5] rounded-md mb-2 hover:bg-[#d4c793]">
                                What is your return policy?
                            </div>
                            <div className="faq-answer hidden p-4 bg-gray-100 border-l-4 border-[#B88C4F] rounded-md">
                                Our return policy allows returns within 30 days of purchase. Please
                                ensure the item is in its original condition.
                            </div>
                        </div>
                        <div className="faq mb-2">
                            <div className="faq-question cursor-pointer p-4 bg-[#e2d9b5] rounded-md mb-2 hover:bg-[#d4c793]">
                                How do I track my order?
                            </div>
                            <div className="faq-answer hidden p-4 bg-gray-100 border-l-4 border-[#B88C4F] rounded-md">
                                You can track your order using the tracking number provided in your
                                confirmation email.
                            </div>
                        </div>
                        <div className="faq mb-2">
                            <div className="faq-question cursor-pointer p-4 bg-[#e2d9b5] rounded-md mb-2 hover:bg-[#d4c793]">
                                Do you offer international shipping?
                            </div>
                            <div className="faq-answer hidden p-4 bg-gray-100 border-l-4 border-[#B88C4F] rounded-md">
                                Yes, we offer international shipping to select countries. Please check
                                our shipping policy for more details.
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

export default Faq