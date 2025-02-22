
import React from 'react';
import { servicesData } from '../utils/services';

import LinkIcon from "../assets/link-icon.png"
import { motion } from 'framer-motion';
import variants from '../utils/variants';

const Services = () => {
    return (
        <section className=" pt-24 pb-16 bg-white" id="services">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Headline and Description */}
                <motion.div className="flex flex-col md:flex-row gap-4 mb-12"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ amount: 0.1 }}
                    variants={variants("bottom", 0.3)}
                >
                    <div className="flex-shrink-0  bg-primary text-black text-center py-2 px-16 rounded-md">
                        <h2 className="text-2xl font-bold"
                        >Services</h2>
                    </div>
                    <div className="md:w-2/3">
                        <p
                            className="text-secondary md:w-2/3"

                        >
                            At this platform, we offer a range of services to help Students to have an better environment. These services include:
                        </p>
                    </div>
                </motion.div>

                {/* Service Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {servicesData.map((service, index) => (
                        <motion.div
                            key={index}
                            className={`flex flex-col sm:flex-row md:justify-between md:items-center gap-6 p-6 rounded-lg border border-[#191A23] ${service.backgroundColor} ${service.textColor} `}

                            initial="hidden"
                            whileInView="visible"
                            viewport={{ amount: 0.1 }}
                            variants={variants("bottom", 0.5)}
                        >
                            <div className='md:w-1/2 flex flex-col h-full justify-between'>
                                <button className={`text-xl  py-1.5 font-semibold mb-2 rounded-sm sm:w-60  ${service.foregroundColor}`}>{service.title}</button>

                                <a
                                    href="#"
                                    className={`flex items-center gap-4 py-2 rounded-md text-black  hover:bg-opacity-80`}
                                >
                                    <img src={LinkIcon} alt="link icon" className={`size-6 rounded-full ${service.foregroundColor}`} />
                                    <span className='text-lg font-medium'> Learn More</span>
                                </a>
                            </div>

                            <div className='md:w-1/2 order-first sm:order-last'>
                                <img
                                    src={service.image}
                                    alt={service.title}
                                    className="w-full  object-cover rounded-md mb-4"
                                />
                            </div>

                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
