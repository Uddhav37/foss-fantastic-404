import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn } from 'react-icons/fa';
import footerLogo from "../assets/footer-logo.png"
import FooterContact from './FooterContact';
import { motion } from 'framer-motion';
import variants from '../utils/variants';

const Footer = () => {
    return (
        <footer className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className='bg-secondary rounded-t-2xl'>

                {/* first section */}
                <motion.div 
                className="flex flex-col flex-wrap md:flex-row md:items-center md:justify-between gap-6 px-4 sm:px-6 lg:px-8 py-12"
                initial="hidden"
                whileInView="visible"
                viewport={{ amount: 0.1 }}
                variants={variants("bottom", 0.2)}
                >
                    
                    {/* Logo Section */}
                    <div className="">
                        <img src={footerLogo} alt="Logo" className="h-8" />
                    </div>

                    {/* Menu Items Section */}
                    <div className=" flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-8">
                        <a href="#home" className="text-white hover:text-gray-400">Home</a>
                        <a href="#about" className="text-white hover:text-gray-400">About Us</a>
                        <a href="#services" className="text-white hover:text-gray-400">Services</a>
                        <a href="#contact" className="text-white hover:text-gray-400">Contact</a>
                    </div>

                    {/* Social Media Icons Section */}
                    <div className="flex md:justify-end space-x-4">
                        <a href="https://facebook.com" className="text-white hover:text-gray-400">
                            <FaFacebookF />
                        </a>
                        <a href="https://twitter.com" className="text-white hover:text-gray-400">
                            <FaTwitter />
                        </a>
                        <a href="https://linkedin.com" className="text-white hover:text-gray-400">
                            <FaLinkedinIn />
                        </a>
                    </div>
                </motion.div>

                {/* second section */}
                <FooterContact/>

                <hr 
                className='my-4 border-white mx-4 sm:mx-6 lg:mx-8'
                />
                <div className='flex flex-wrap md:gap-8 gap-4 text-white px-4 sm:px-6 lg:px-8 py-5'>
                    <p>© 2025 Positivus. All Rights Reserved.</p>
                    <p className='underline underline-offset-4'><a href="#">Privacy Policy</a></p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
