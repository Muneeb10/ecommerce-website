import React from 'react';
import { Phone, Mail, MapPin, Clock, Facebook, Twitter, Instagram } from 'lucide-react';

const ContactUs = () => {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 grid-cols-1">
          <div className="lg:mb-0 mb-10">
            <div className="group w-full h-full">
              <div className="relative h-full">
                <img src="https://i.pinimg.com/736x/9b/1c/15/9b1c15c20677fb58e5b8b1312e566c8e.jpg" alt="ContactUs tailwind section" className="w-full h-full lg:rounded-l-2xl rounded-2xl bg-blend-multiply bg-indigo-700 object-cover"/>
                <h1 className="font-manrope text-white text-4xl font-bold leading-10 absolute top-11 left-11">Contact us</h1>
                <div className="absolute bottom-0 w-full lg:p-11 p-5">
                  <div className="bg-white rounded-lg p-6 block">
                    <a href="#phone" className="flex items-center mb-6">
                      <Phone className="text-black" size={20} />
                      <h5 className="text-black text-base font-normal leading-6 ml-5">+92 331 0248013</h5>
                    </a>
                    <a href="#mail" className="flex items-center mb-6">
                      <Mail className="text-black" size={20} />
                      <h5 className="text-black text-base font-normal leading-6 ml-5">Pagedone1234@gmail.com</h5>
                    </a>
                    <a href="#map" className="flex items-center">
                      <MapPin className="text-black" size={20} />
                      <h5 className="text-black text-base font-normal leading-6 ml-5">13y Choudary Plaza Islamabad</h5>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#f0f2f3] p-5 lg:p-11 lg:rounded-r-2xl rounded-2xl">
            <h2 className="text-gray-900 font-manrope text-4xl font-semibold leading-10 mb-11">Send Us A Message</h2>
            <input type="text" className="w-full h-12 text-black placeholder-black shadow-sm bg-transparent text-lg font-normal leading-7 rounded-lg border border-gray-400 focus:outline-none pl-4 mb-10" placeholder="Name" />
            <input type="email" className="w-full h-12 text-black placeholder-black shadow-sm bg-transparent text-lg font-normal leading-7 rounded-lg border border-gray-400 focus:outline-none pl-4 mb-10" placeholder="Email" />
            <input type="tel" className="w-full h-12 text-black placeholder-black shadow-sm bg-transparent text-lg font-normal leading-7 rounded-lg border border-gray-400 focus:outline-none pl-4 mb-10" placeholder="Phone" />
            
            <textarea className="w-full h-32 text-gray-600 placeholder-black bg-transparent text-lg shadow-sm font-normal leading-7 rounded-lg border border-gray-400 focus:outline-none p-4 mb-10" placeholder="Message"></textarea>
           <div className='w-full flex justify-center'>
            <button className="w-[50%] h-12 text-white text-base font-semibold leading-6 bg-black rounded-lg transition-all duration-700 hover: shadow-sm">Send</button>
            </div>  
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;