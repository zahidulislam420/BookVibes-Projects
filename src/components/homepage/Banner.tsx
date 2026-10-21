import Image from 'next/image';
import React from 'react';
import bannerImg from '@/assets/hero_img.jpg'

const Banner = () => {
    return (
        <section className='py-20'>
        <div className='container mx-auto grid grid-cols-2 gap-4 items-center bg-slate-300 rounded-4xl p-4'>
            <div className='space-y-4'>
               <h2 className='font-bold text-5xl'>
                Books to freshen up <br/> your bookshelf
                </h2>
               <button className='btn btn-success'>View the task</button>
            </div>
            <div>
               <Image src={bannerImg} alt='Banner'/>
            </div>
        </div>
        </section>
    );
};

export default Banner;