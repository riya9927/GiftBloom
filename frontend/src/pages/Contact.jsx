// import React from 'react'
// import Title from '../components/Title'
// import { assets } from '../assets/assets'
// import NewsletterBox from '../components/NewsletterBox'

// const contact = () => {
//   return (
//     <div>
//       <div className='text-center text-2xl pt-10 border-t'>
//         <Title text1={'CONTACT'} text2={'US'} />
//       </div>
//       <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
//       <img className='w-full md:max-w-[480px]' src={assets.contact_img} alt="" />
//       <div className='flex flex-col justify-center items-start gap-6'>
//         <p className='font-semibold text-xl text-gray-600'>Our Store</p>
//         <p>Shop No. 24, Ground Floor,<br />Infinity Mall, Andheri West,<br />Mumbai, Maharashtra - 400053<br />India</p>
//         <p className='font-semibold text-xl text-gray-600'>Careers at GiftBloom</p>
//         <p className='text-gray-500'>Join the GiftBloom team and be a part of crafting unforgettable moments, one gift at a time!</p>
//         <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>Explore Jobs</button>
//         <p></p>
//       </div>
//       </div>
//       <NewsletterBox />
//     </div>
//   )
// }

// export default contact

import React from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import NewsletterBox from '../components/NewsletterBox';

const ContactInfo = ({ icon, title, content }) => (
  <div className="bg-[#faf6f6] p-6 rounded-lg">
    <div className="flex flex-col items-center text-center">
      <img src={icon} alt={title} className="w-8 h-8 mb-2" />
      <h3 className="text-gray-800 font-medium mb-1">{title}</h3>
      <p className="text-gray-600 text-sm">{content}</p>
    </div>
  </div>
);

const Contact = () => {
  const contactInfo = [
    { icon: assets.phone_icon, title: 'Phone', content: <a href="tel:+91 9999999999">+91 9999999999</a> },
    { icon: assets.whatsapp_icon, title: 'Whatsapp', content: <a href="tel:+91 9999966666">+91 9999966666</a>},
    { icon: assets.email_icon, title: 'Email', content: <a href="mailto:contact@giftbloom.com">contact@giftbloom.com</a> },
    { 
      icon: assets.shop_icon, 
      title: 'Our Shop', 
      content: 'Shop No. 24, Ground Floor, Infinity Mall, Andheri West, Mumbai, Maharashtra - 400053 India' 
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="text-center text-2xl pt-10 border-t">
        <Title text1="GET IN" text2="TOUCH" />
        <p className="mt-4 text-base text-gray-500 max-w-2xl mx-auto">
          Have a question or need assistance? We're here to help! Reach out to us through any of the following channels.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-12">
        {contactInfo.map((info, index) => (
          <ContactInfo key={index} {...info} />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="h-full min-h-[600px]">
          <iframe
            title="GiftBloom Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.280368877799!2d72.83183067500243!3d19.136555982079827!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b7c7e955f80f%3A0x9d4b1dc6fc786d76!2sInfinity%20Mall%2C%20Andheri%20West!5e0!3m2!1sen!2sin!4v1682426871451!5m2!1sen!2sin"
            className="w-full h-full rounded-lg"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <div className="bg-white p-8 min-h-[600px]">
          <h2 className="text-2xl font-bold mb-8">Send Us a Message</h2>
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Name</label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#cd7f32]"
                placeholder="Your Name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#cd7f32]"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
              <input
                type="text"
                id="subject"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#cd7f32]"
                placeholder="How can we help?"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message</label>
              <textarea
                id="message"
                rows={6}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#cd7f32]"
                placeholder="Type your message here..."
              />
            </div>

            <button
              type="submit"
              className="border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500 w-full"
            >
              Send Now
            </button>
          </form>
        </div>
      </div>

      <div className="text-center mb-16">
        <h3 className="text-2xl font-bold mb-4">Store Hours</h3>
        <div className="text-gray-600">
          <p>Monday - Saturday: 10:00 AM - 9:00 PM</p>
          <p>Sunday: 11:00 AM - 8:00 PM</p>
        </div>
      </div>

      <NewsletterBox />
    </div>
  );
};

export default Contact;