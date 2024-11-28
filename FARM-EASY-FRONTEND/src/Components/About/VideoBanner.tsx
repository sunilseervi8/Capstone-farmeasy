import 'aos/dist/aos.css';  
import { useEffect } from 'react';
import AOS from 'aos';  

export default function VideoBanner() {

  useEffect(() => {
    // Initialize AOS with a default animation duration of 1000 milliseconds (1 second)
    AOS.init({ duration: 1000 });
  }, []); // Empty dependency array means this runs only once when the component mounts

  return (
    <div>
      {/* Video Section */}
      <div className="relative w-full h-[80vh] bg-black" data-aos="fade-in">
        {/* Background video, set to autoplay, loop, and muted for a seamless background effect */}
        <video
          className="absolute top-0 left-0 w-full h-full object-cover" // Full-screen positioning and covering for the video
          src="Videos/vid2.mp4" 
          autoPlay 
          loop  
          muted  
        />
        
        {/* Overlay text content above the video */}
        <div
          className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white"
          data-aos="fade-up" // Adds fade-up animation to this section
        >
          {/* Title text with additional delay for animation */}
          <h1 className="text-5xl font-bold mb-4" data-aos="fade-up" data-aos-delay="200">
            Let’s change the way of farming together
          </h1>
        </div>
      </div>
    </div>
  );
}
