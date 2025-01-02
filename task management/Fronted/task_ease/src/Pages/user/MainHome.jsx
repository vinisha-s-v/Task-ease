import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import carousel1 from '../../assets/user/carousel1.jpg';
import carousel2 from '../../assets/user/carousel2.jpg';
import carousel3 from '../../assets/user/carousel3.jpg';
import FooterHome from '../../Components/FooterHome';

const MainHome = () => {
  const images = [carousel1, carousel2, carousel3];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();

  // Function to navigate to the next slide
  const nextSlide = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      setIsAnimating(false);
    }, 500); // Match animation duration
  };

  // Function to navigate to the previous slide
  const prevSlide = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex - 1 < 0 ? images.length - 1 : prevIndex - 1
      );
      setIsAnimating(false);
    }, 500); // Match animation duration
  };

  // Automatically move to the next slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(nextSlide, 3000); // 3000ms = 3 seconds
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  const handleLoginSelection = (option) => {
    if (option === 'admin') {
      navigate('/admin-login');
    } else if (option === 'user') {
      navigate('/login');
    }
  };

  return (
    <div>
      {/* Header */}
      <header className="border-gray-200 bg-blue-300 py-2">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    {/* Left Navigation Links */}
    <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1">
      <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-blue-300 md:dark:bg-blue-300 dark:border-gray-700">
        <li>
          <a
            href="#about"
            className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-700 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
          >
            About
          </a>
        </li>
        <li>
          <a
            href="#service"
            className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-700 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
          >
            Services
          </a>
        </li>
        <li>
          <a
            href="#contact"
            className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-700 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
          >
            Contact
          </a>
        </li>
      </ul>
    </div>

    {/* Login Dropdown */}
    <div className="relative md:order-2">
      <select
        className="bg-blue-700 text-white py-2 px-4 rounded focus:outline-none"
        onChange={(e) => handleLoginSelection(e.target.value)}
      >
        <option value="">Login</option>
        <option value="admin">Admin Login</option>
        <option value="user">User Login</option>
      </select>
    </div>
  </div>
</header>


      {/* Carousel */}
      <div className="relative w-full h-screen overflow-hidden rounded-lg">
        <div
          className={`absolute flex w-full h-screen transition-transform duration-1000 ease-in-out`}
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              className="w-full h-full object-cover flex-shrink-0"
              alt={`Slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Previous Button */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-lg focus:outline-none z-10"
        >
          ❮
        </button>

        {/* Next Button */}
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-lg focus:outline-none z-10"
        >
          ❯
        </button>
      </div>

      {/* Carousel Indicators */}
      <div className="flex justify-center space-x-2 mt-4">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${
              currentIndex === index
                ? "bg-blue-500"
                : "bg-gray-300 hover:bg-gray-500"
            }`}
          ></button>
        ))}
      </div>

      {/* Footer */}
      <FooterHome />
    </div>
  );
};

export default MainHome;
