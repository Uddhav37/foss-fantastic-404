import React from 'react'
import caseStudies from '../utils/caseStudies'
import { MdOutlineArrowOutward } from "react-icons/md";
import { motion } from 'framer-motion';
import variants from '../utils/variants';

const CaseStudies = () => {
    return (
        <section className=" pt-24 pb-12 bg-white" id="use-cases">
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                {/* Headline and Description */}
                <motion.div className="flex flex-col md:flex-row gap-4 mb-12"
                initial="hidden"
                whileInView="visible"
                viewport={{ amount: 0.1 }}
                variants={variants("bottom", 0.2)}
                >
                    <div className="flex-shrink-0 bg-primary text-black text-center py-2 px-12 rounded-md">
                        <h2 className="text-2xl font-bold">Case Studies</h2>
                    </div>
                    <div className="md:w-2/3">
                        <p className="text-secondary md:w-1/2">
                            Explore Real-Life Examples of Our Proven Digital Marketing Success through Our Case Studies
                        </p>
                    </div>
                </motion.div>

                {/* Case Studies */}
                <motion.div className="bg-black text-white p-8 rounded-md"
                initial="hidden"
                whileInView="visible"
                viewport={{ amount: 0.1 }}
                variants={variants("bottom", 0.3)}
                >
                    <div 
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
                    >
                        {caseStudies.map((study, index) => (
                            <div key={index} className="p-4 border border-gray-700 rounded-md">
                                <h3 className="text-xl font-semibold mb-2">{study.title}</h3>
                                <p className="mb-4">{study.description}</p>
                                <a href={study.link} className="text-primary flex items-center hover:underline">
                                    Learn More <MdOutlineArrowOutward className="ml-2" />
                                </a>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

export default CaseStudies