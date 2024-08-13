import React from 'react';
import Achmad from '../assets/achmad.jpg'

const About = React.forwardRef((props, ref) => {
    return (
        <>
            <div ref={ref} className=""></div>
            <div className='md:px-14 px-4 py-4 mx-auto space-y-10'>
                <h1 className='text-3xl font-bold text-primary text-center mt-10 mb-20'>ABOUT US</h1>
                <div className='flex flex-col md:flex-row justify-between items-center gap-8'>
                    <div className='bg-[rgba(255, 255, 255,0.04)] h-72 md:h-96 w-full md:w-96 shadow-3xl p-8 flex justify-center items-center'>
                        <img src={Achmad} alt='' className='shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] p-5 rounded-lg max-w-full' loading="lazy" />
                    </div>
                    <div className='md:w-2/3 w-full'>
                        <h2 className='md:text-5xl text-3xl font-bold text-primary mb-5 leading-normal'>Biodata<span className='text-secondary'></span></h2>
                        <p className='text-tartiary text-base md:text-lg mb-7'>
                            Saya Adalah mahasiswa dari Intitut Teknologi Adhi Tama Surabaya pengalaman saya di bidang web developer adalah membangun sistem yang bagus dan interaktif
                            dengan kebutuhan user serta pengalaman saya di studi independen msib 5 tentang laravel backend serta saya juga memahami react js sebagai front end serta memahami konsep membangun
                            website dengan web monolite maupun microservice.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
});

export default About;
