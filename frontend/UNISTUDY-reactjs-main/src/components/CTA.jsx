import React from 'react';

import ctaImage from "../assets/cta-image.png"
import { motion } from 'framer-motion';
import variants from '../utils/variants';

const CTA = () => {
    return (
        <section className="relative py-12">
            <motion.div 
            className="max-w-7xl mx-auto bg-[#F3F3F3] rounded-md sm:pt-24 pt-8 pb-12 flex flex-col md:flex-row items-center justify-between px-4 sm:px-6 lg:px-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.1 }}
            variants={variants("bottom", 0.4)}
            >
                
                {/* Left Side: Headline, Text, and Button */}
                <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
                    <h2 className="text-3xl font-bold mb-4">Let’s make things happen</h2>
                    <p className="text-lg mb-6">Contact us today to learn more about how our digital marketing services can help your business grow and succeed online.</p>
                    <a href="#contact" className="inline-block px-6 py-3 bg-black text-white font-semibold rounded-md hover:bg-gray-800">Get your free proposal</a>
                </div>

                {/* Right Side: Image */}
                <div className="md:w-1/2 flex justify-center items-center relative">
                    <img
                        src={ctaImage} 
                        alt="CTA Image"
                        className=" md:absolute md:-top-52 md:bottom-0"
                        style={{ transform: 'scale(1.05)' }} 
                    />
                </div>
            </motion.div>
        </section>
    );
};

export default CTA;
