import React, { useState } from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa';
import processSteps from '../utils/processSteps';

import { motion } from 'framer-motion';
import variants from '../utils/variants';

const WorkingProcess = () => {
    const [openIndex, setOpenIndex] = useState(0); // State to track the open accordion

    const handleToggle = (index) => {
        setOpenIndex(openIndex === index ? -1 : index); // Toggle the accordion
    };

    return (
        <section className="pt-12 bg-white" id="use-cases">
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                {/* Headline and Description */}
                <motion.div className="flex flex-col md:flex-row gap-4 mb-8"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ amount: 0.1 }}
                    variants={variants("bottom", 0.7)}
                >
                    <div className="flex-shrink-0 bg-primary text-black text-center py-2 px-6 rounded-md">
                        <h2 className="text-2xl font-bold">Our Working Process</h2>
                    </div>
                    <div className="md:w-2/3">
                        <p className="text-secondary md:w-1/2">
                            Our Proven Digital Marketing Success through Step-by-Step Guide to Achieving Your Business Goals
                        </p>
                    </div>
                </motion.div>

                {/* Accordion */}
                {processSteps.map((step, index) => (
                    <motion.div
                        key={index}
                        className={`border rounded-md mb-4 overflow-hidden ${openIndex === index ? 'border-primary' : 'border-gray-300'
                            }`}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ amount: 0.1 }}
                        variants={variants("bottom", 0.6)}
                    >
                        <button
                            onClick={() => handleToggle(index)}
                            className={`w-full text-left p-4 flex justify-between items-center  ${openIndex === index ? 'bg-primary' : 'bg-tartiary'}`}
                        >
                            <div className="flex items-center">
                                <span className="text-secondary font-extrabold text-2xl mr-4">{step.number}</span>
                                <h3 className="text-lg font-semibold">{step.question}</h3>
                            </div>
                            <div className='bg-white text-black  border p-1.5  rounded-full'>
                                {openIndex === index ? (
                                    <FaMinus />
                                ) : (
                                    <FaPlus />
                                )}
                            </div>
                        </button>
                        {openIndex === index && (
                            <div className="p-4 bg-primary text-secondary">
                                <hr className='mt-0 mb-5 border-black' />
                                <p>{step.answer}</p>
                            </div>
                        )}
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default WorkingProcess;
