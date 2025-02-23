import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { IoMdArrowBack, IoMdArrowForward } from "react-icons/io";
import { BsChatQuote } from "react-icons/bs";
import testimonialsData from '../utils/testimonialsData';
import variants from '../utils/variants';


const Testimonials = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsToShow, setItemsToShow] = useState(1);

    useEffect(() => {
        const interval = setInterval(() => {
            handleNext();
        }, 20000); // Auto-play every 20 seconds

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, [currentIndex]);

    useEffect(() => {
        // Update number of items to show based on screen size
        const handleResize = () => {
            if (window.innerWidth >= 768) { // Medium devices and up
                setItemsToShow(3);
            } else { // Small devices
                setItemsToShow(1);
            }
        };

        handleResize(); // Initial check
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + itemsToShow) % testimonialsData.length);
    };

    const handlePrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex - itemsToShow + testimonialsData.length) % testimonialsData.length);
    };

    const handleDotClick = (index) => {
        setCurrentIndex(index);
    };

    return (
        <section className="pt-24 pb-8 bg-white" id="testimonials">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                {/* Headline and Description */}
                <motion.div 
                className="flex flex-col md:flex-row gap-4 mb-8"
                initial="hidden"
                whileInView="visible"
                viewport={{ amount: 0.1 }}
                variants={variants("bottom", 0.1)}
                >
                    <div className="flex-shrink-0 bg-primary text-black text-center py-2 px-6 rounded-md">
                        <h2 className="text-2xl font-bold">What Our Clients Say</h2>
                    </div>
                    <div className="md:w-2/3">
                        <p className="text-secondary md:w-1/2">
                            Hear directly from our satisfied clients about their experience working with us.
                        </p>
                    </div>
                </motion.div>

                {/* Testimonials Slider */}
                <div className="relative mb-12">
                    <div className="flex flex-col md:flex-row gap-4 max-w-7xl mx-auto overflow-hidden">
                        {testimonialsData.slice(currentIndex, currentIndex + itemsToShow).map((testimonial) => (
                            <motion.div
                                key={testimonial.id}
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                transition={{ duration: 0.5 }}
                                className={`w-full relative py-5 ${itemsToShow === 1 ? 'md:max-w-md' : 'md:w-1/3'} px-2`}
                            >   <div className='absolute top-0 left-0 z-30'>
                                    <BsChatQuote  className='size-8'/>
                                </div>
                                <div className="bg-white hover:bg-primary rounded-lg border hover:border-primary shadow-lg p-6 cursor-pointer transition-all duration-300 h-48">
                                    <p className="text-lg font-medium mb-4">{testimonial.text}</p>
                                    <p className="text-sm font-semibold text-gray-700">- {testimonial.author}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Dot Navigation */}
                    <div className="absolute mt-5 left-1/2 transform -translate-x-1/2 flex items-center space-x-5 z-10">
                        <button
                            onClick={handlePrevious}
                            className=" text-black"
                        >
                            <IoMdArrowBack />
                        </button>
                        <div className="flex space-x-2">
                            {testimonialsData.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleDotClick(index)}
                                    className={`w-3 h-3 rounded-full ${index >= currentIndex && index < currentIndex + itemsToShow ? 'bg-primary' : 'bg-gray-400'}`}
                                />
                            ))}
                        </div>
                        <button
                            onClick={handleNext}
                            className="text-black"
                        >
                            <IoMdArrowForward />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
