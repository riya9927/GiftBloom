import React from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import NewsletterBox from '../components/NewsletterBox';

const About = () => {
  return (
    <div>
      {/* Header Section */}
      <div className="text-4xl text-center pt-10 border-t border-gray-300">
        <Title text1="ABOUT" text2="US" />
      </div>

      {/* About Section */}
      <div className="my-12 flex flex-col md:flex-row items-center gap-12 px-6 md:px-16">
        <img
          className="w-full md:max-w-[450px] rounded-lg shadow-lg"
          src={assets.about_img}
          alt="About GiftBloom"
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/3 text-gray-700">
          <p className="leading-relaxed text-justify">
            Welcome to <span className="font-semibold">GiftBloom</span>, your one-stop destination for thoughtfully curated gifts. We’re passionate about the art of gifting and the happiness it brings to every moment of life.
          </p>
          <p className="leading-relaxed text-justify">
            At GiftBloom, we go beyond ordinary. Our mission is to transform every celebration into a memory with gifts that speak from the heart. Be it personalized keepsakes, trendy gadgets, or wellness hampers, we offer a spectrum of options for all personalities and occasions.
          </p>
          <p className="leading-relaxed text-justify">
            Thank you for choosing us to be a part of your special moments. We’re honored to add a little sparkle to your celebrations and bring joy to your gifting journey.
          </p>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="text-4xl text-center py-6">
        <Title text1="WHY" text2="CHOOSE GIFTBLOOM?" />
      </div>
      <div className="flex flex-col md:flex-row text-sm mb-16 gap-6 px-6 md:px-16">
        {[
          {
            title: 'Handpicked Quality',
            description:
              'Every product in our collection is meticulously chosen to ensure it combines style, durability, and purpose.',
          },
          {
            title: 'Effortless Gifting',
            description:
              'Our user-friendly platform simplifies the gifting process with easy navigation, thoughtful categories, and suggestions for every occasion.',
          },
          {
            title: 'Customer First',
            description:
              'We prioritize your satisfaction with hassle-free returns, exceptional customer service, and prompt support.',
          },
        ].map((item, index) => (
          <div
            key={index}
            className="border px-10 md:px-14 py-8 flex flex-col gap-4 rounded-lg bg-white shadow-md"
          >
            <b className="text-lg text-gray-800">{item.title}</b>
            <p className="text-gray-600 leading-relaxed">{item.description}</p>
          </div>
        ))}
      </div>

      {/* Newsletter Section */}
      <NewsletterBox />
    </div>
  );
};

export default About;
