import 'aos/dist/aos.css';
import  { useEffect, useRef, useState } from 'react';
import AOS from 'aos';
import {useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {RootState} from '../../Redux/Store';
import FunctionCard from '../../Components/Home/FunctionalCard';

const images = [
  'Images/Home1.jfif',
  'Images/Home2.jfif',
  'Images/Home3.jfif'
];

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const functionalCardRef = useRef<HTMLDivElement>(null); 
  const navigate = useNavigate();
  const authUser = useSelector((state: RootState) => state.auth.user);


  useEffect(() => {
    AOS.init({ duration: 1000 }); // Initialize AOS with animation duration

    // Set up an interval to change images automatically
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

  const handleButtonClick = ()=>{
    if (authUser?.token) {
      functionalCardRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/login');
    }
  }

  return (
    <div>
      {/* Image Carousel Section */}
      <div className="relative w-full h-[80vh] bg-black" data-aos="fade-in">
        {/* Images with fading effect */}
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Slide ${index + 1}`}
            className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}

        {/* Text and Button Overlay */}
        <div
          className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white"
          data-aos="fade-up"
        >
          <h1 className="text-5xl font-bold mb-4" data-aos="fade-up" data-aos-delay="200">
            Let’s change the way of farming together
          </h1>
          <button
          onClick={handleButtonClick}
            className="mt-4 px-8 py-3 text-lg bg-[#000d6b] rounded-lg hover:bg-[#000d6c] transition"
            data-aos="zoom-in"
            data-aos-delay="400"
          >
            Start now
          </button>
        </div>
      </div>
      <div ref={functionalCardRef}>
        <FunctionCard /> {/* Render the FunctionCard component */}
      </div>

    </div>
  );
}
