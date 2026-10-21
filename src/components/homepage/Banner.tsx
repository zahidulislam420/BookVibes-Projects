import Image from 'next/image';
import React from 'react';
import bannerImg from '@/assets/hero_img.jpg';
import Link from 'next/link';

const Banner = () => {
    return (
        <section className="site-container banner-section">
          <div className="banner-panel">
            <div className="banner-copy">
              <h1>Books to freshen up your bookshelf</h1>
              <Link className="primary-button" href="/books">
                View the list
              </Link>
            </div>
            <Image
              className="banner-image"
              src={bannerImg}
              alt="A selection of books for your bookshelf"
              priority
            />
          </div>
        </section>
    );
};

export default Banner;