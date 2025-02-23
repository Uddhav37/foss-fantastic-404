import React from 'react'
import { motion } from 'framer-motion'
import variants from '../utils/variants'

const FooterContact = () => {
    return (
        <>
            <motion.div 
            className="flex flex-col py-8 px-4 sm:px-6 lg:px-8 md:flex-row gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.1 }}
            variants={variants("bottom", 0.3)}
            >

                {/* Left Side: Button and Contact Info */}
                <div className="flex-1 space-y-4">
                    <button className="bg-primary text-black hover:bg-transparent border-primary border hover:text-white px-6 py-2 rounded-md transition-all duration-300">
                    Contact us:
                    </button>
                    <div className="text-white">
                        <p><strong>Email:</strong> contact@example.com</p>
                        <p><strong>Phone:</strong> +123 456 7890</p>
                        <p><strong>Address:</strong> 1234 Example St, City, Country</p>
                    </div>
                </div>

                {/* Right Side: Form */}
                <div className="flex-1 bg-[#292A32] justify-center items-center p-8 rounded-md">
                    <form className="flex flex-col justify-center items-center h-20  md:flex-row gap-4">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className=" flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        <button
                            type="submit"
                            className="bg-primary text-black hover:bg-transparent border-primary border hover:text-white px-6 py-2 rounded-md transition-all duration-300"
                        >
                            Subscribe
                        </button>
                    </form>
                </div>

            </motion.div>
        </>
    )
}

export default FooterContact