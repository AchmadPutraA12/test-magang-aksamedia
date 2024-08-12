import React, { useRef } from 'react';
import OurProject from '../Components/OurProject';
import Footer from '../Components/Footer';
import Navbar from '../Components/Navbar';
import bg from '../assets/bg.png';
import About from '../Components/About';

const Home = () => {
    const ourmenuRef = useRef(null);
    const ouraboutRef = useRef(null);

    const scrollToOurmenu = () => {
        if (ourmenuRef.current) {
            ourmenuRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    const scrollToAbout = () => {
        if (ouraboutRef.current) {
            ouraboutRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <>
            <Navbar scrollToOurmenu={scrollToOurmenu} scrollToAbout={scrollToAbout} />
            <div className="relative h-screen pt-16 bg-white dark:bg-gray-900">
                <img src={bg} alt="Banner" className="w-full h-full object-cover" loading="lazy" />
                <div className="absolute top-0 left-0 right-0 bottom-0 z-10 flex flex-col justify-center items-center text-center p-4 bg-black bg-opacity-50">
                    <h2 className="md:text-7xl text-4xl font-bold text-white mb-6 leading-relaxed">
                        Tugas 1
                    </h2>
                    <p className="text-[#EBEBEB] text-lg md:text-2xl mb-8">
                        React Tailwind
                    </p>
                </div>
            </div>
            <section ref={ourmenuRef} className="pt-24 bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
                <OurProject />
            </section>
            <section ref={ouraboutRef} className="pt-10 bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
                <About />
            </section>
            <Footer />
        </>
    );
};

export default Home;
