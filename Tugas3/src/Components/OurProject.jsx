import React from "react";
import Rejo from "../assets/rejo.png"
import Ziqma from "../assets/ziqma.png"
import Unesa from "../assets/unesa.png"

const OurProject = React.forwardRef((props, ref) => {
    return (
        <>
            <div ref={ref} className=""></div>
            <div className="my-24 md:px-14 px-4 max-w-screen-2xl mx-auto" id="features">
                <div className="flex flex-col lg:flex-row justify-between items-start gap-10">
                    <div className="lg:w-1/4">
                        <h3 className="text-3xl text-Primary font-bold lg:w-1/2 mb-3">
                            PROJECT
                        </h3>
                        <p className="text-base text-tartiary">
                            Project yang pernah saya kerjakan selama 1 tahun setelah mengikuti msib studi independen batch 5.
                        </p>
                    </div>
                    <div className="w-full lg:w-3/4">
                        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 items-start md:gap-12 gap-8">
                            <div className="bg-[rgba(255, 255, 255,0.04)] rounded-[35px] h-96 shadow-3xl p-8 flex justify-center items-center hover:-translate-y-4 transsition-all duration-300 cursor-pointer">
                                <div>
                                    <a href="https://kedairejo.my.id" target="_blank">
                                        <img src={Rejo} alt="" className="rounded-[15px] px-5 py-7 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]" loading="lazy" />
                                        <h5 className="text-2xl font-semibold text-Primary px-5 text-center mt-5">
                                            Kedai Rejo
                                        </h5>
                                    </a>
                                </div>
                            </div>
                            <div className="bg-[rgba(255, 255, 255,0.04)] rounded-[35px] h-96 shadow-3xl p-8 flex justify-center items-center hover:-translate-y-4 transsition-all duration-300 cursor-pointer md:mt-16">
                                <div>
                                    <a href="https://ziqma.achmadputraa.my.id" target="_blank">
                                        <img src={Ziqma} alt="" className="rounded-[15px] px-5 py-7 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]" loading="lazy" />
                                        <h5 className="text-2xl font-semibold text-Primary px-5 text-center mt-5">
                                            Ziqma collection
                                        </h5>
                                    </a>
                                </div>
                            </div>
                            <div className="bg-[rgba(255, 255, 255,0.04)] rounded-[35px] h-96 shadow-3xl p-8 flex justify-center items-center hover:-translate-y-4 transsition-all duration-300 cursor-pointer">
                                <div>
                                    <a href="https://wbs.fbs.unesa.ac.id/zi/pengaduan" target="_blank">
                                        <img src={Unesa} alt="" className="rounded-[15px] px-5 py-7 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]" loading="lazy" />
                                        <h5 className="text-2xl font-semibold text-Primary px-5 text-center mt-5">
                                            Zona Integeritas Kampus UNESA
                                        </h5>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
});

export default OurProject;