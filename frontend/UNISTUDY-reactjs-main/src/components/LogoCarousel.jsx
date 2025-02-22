// src/components/LogoCarousel.js
import React from 'react';
import { motion } from 'framer-motion';

// Example logo imports
import Logo1 from "../assets/logos/amazon.png";
import Logo2 from "../assets/logos/dribble.png";
import Logo3 from "../assets/logos/hubspot.png";
import Logo4 from "../assets/logos/notion.png";
import Logo5 from "../assets/logos/netflix.png";
import Logo6 from "../assets/logos/zoom.png";
import variants from '../utils/variants';

const LogoCarousel = () => {
    return (
        <div

            className=" pt-24 overflow-hidden">
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ amount: 0.1 }}
                variants={variants("right", 0.3)}
                className="flex space-x-12 justify-between items-center animate-marquee">
                {/* <img src={Logo1} alt="Brand 1" className="h-12" />
                <img src={Logo2} alt="Brand 2" className="h-12" />
                <img src={Logo3} alt="Brand 3" className="h-12" />
                <img src={Logo4} alt="Brand 4" className="h-12" />
                <img src={Logo5} alt="Brand 5" className="h-12" />
                <img src={Logo6} alt="Brand 6" className="h-12" /> */}
            </motion.div>
        </div>
    );
};

export default LogoCarousel;
