import React, { useContext, useEffect, useState } from 'react'
import NavigationBar from '../../Components/NavigationBar'
import AuthContext from '../../Providers/AuthProvider'
import { Outlet } from 'react-router-dom';
import carousel1 from '../../assets/user/carousel1.jpg'
import carousel2 from '../../assets/user/carousel2.jpg'
import carousel3 from '../../assets/user/carousel3.jpg'


const Home = () => {

  const images = [carousel1,carousel2,carousel3];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Function to navigate to the next slide
  const nextSlide = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      setIsAnimating(false);
    }, 500); // Match animation duration
  };

  // Function to navigate to the previous slide
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



  const{auth} = useContext(AuthContext);
  console.log(auth.role,"vijay ");

  
  return (
    <div>
      <NavigationBar/>
      
      
      <div>
        {<Outlet />}
      </div>


  
     

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



    </div>
  )
}

export default Home
