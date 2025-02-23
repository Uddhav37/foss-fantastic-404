import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import contactImg from "../assets/contact.png"
import variants from '../utils/variants'

const Contact = () => {

    return (
        <section className="pt-24 pb-12 bg-white" id="contact">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Headline and Description */}
                <motion.div
                    className="flex flex-col md:flex-row gap-4 mb-8"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ amount: 0.1 }}
                    variants={variants("bottom", 0.2)}
                >
                    <div className="flex-shrink-0 bg-primary text-black text-center py-2 px-10 rounded-md">
                        <h2 className="text-2xl font-bold">Contact Us</h2>
                    </div>
                    <div className="md:w-2/3">
                        <p className="text-secondary md:w-1/2">
                            Connect with Us: <br /> Let's Discuss Your Digital Marketing Needs
                        </p>
                    </div>
                </motion.div>

                {/* contact form */}
                <div
                    className="flex flex-col md:flex-row justify-between bg-tartiary rounded-lg md:p-8 p-4">
                    {/* Left Side: Form */}
                    <motion.div className="w-full md:w-1/2 p-4"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ amount: 0.1 }}
                        variants={variants("right", 0.3)}
                    >
                        <form className="space-y-4">
                            {/* Radio Inputs */}
                            <div className="flex flex-col md:flex-row md:space-x-4 items-start justify-start">
                                <label className="flex items-center">
                                    <input type="radio" name="contact-type" className="mr-2" value="general" />
                                    General Inquiry
                                </label>
                                <label className="flex items-center mt-2 md:mt-0">
                                    <input type="radio" name="contact-type" className="mr-2" value="support" />
                                    Support
                                </label>
                            </div>

                            {/* Name Input */}
                            <div>
                                <label htmlFor="name" className="block text-sm  font-medium text-gray-700">Name</label>
                                <input type="text" id="name" name="name" className="mt-2 py-2.5 px-4 block w-full  rounded-md shadow-sm 
                                focus:outline-none focus:ring focus:ring-primary" />
                            </div>

                            {/* Email Input */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                <input type="email" id="email" name="email" className="mt-2 py-2.5 px-4 block w-full  rounded-md shadow-sm 
                                focus:outline-none focus:ring focus:ring-primary" />
                            </div>

                            {/* Text Area */}
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                                <textarea id="message" name="message" rows="6" className="mt-2 mb-5 py-2.5 px-4 block w-full  rounded-md shadow-sm 
                                focus:outline-none focus:ring focus:ring-primary"></textarea>
                            </div>

                            {/* Send Message Button */}
                            <button type="submit" className="inline-block px-6 py-3 bg-black text-white font-semibold rounded-md hover:bg-gray-800">
                                Send Message
                            </button>
                        </form>
                    </motion.div>

                    {/* Right Side: Image */}
                    <motion.div 
                    className="relative md:flex justify-end items-center md:w-1/3 md:-m-8 overflow-hidden"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ amount: 0.1 }}
                    variants={variants("right", 0.2)}
                    >
                        <img src={contactImg} alt="Contact" 
                        className="md:absolute md:block hidden top-0 bottom-0 -right-8 h-full" 
                     
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default Contact