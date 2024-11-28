import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

const Gallery = () => {

  const navigate = useNavigate();

  const projects = [
    { title: "Products", category: "Farming Machineries", image: "../../../public/Images/HOME/Tactor.jpg", path: "/producthome"},
    { title: "Crops", category: "Seasonal", image: "../../../public/Images/HOME/download.jpg", alt: "vegetables", path: "/crops" },
    { title: "Machineries", category: "Rental", image: "../../../public/Images/rental.jpg", alt: "Rentals", path:"rentals" },
    { title: "Modern Agriculture Techniques", category: "Awareness on", image: "../../../public/Images/HOME/Awareness.webp", alt: "Awareness", path:"/awarenessvideos" },
    { title: "Loans", category: "Check for", image: "../../../public/Images/HOME/Loan.jpg", alt: "Loans"  },
    { title: "Insurances", category: "Apply for", image: "../../../public/Images/HOME/insurance.webp", alt: "Insurance" }
  ];
  // savings 
  const [showSavings, setShowSavings] = useState(true);
  useEffect(() => {
    const interval = setInterval(() => {
      setShowSavings((prevShowSavings) => !prevShowSavings);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleCategory=(path:any)=>{
    if (typeof path === 'string') {
      navigate(path);
    } else {
      console.error("Invalid path:", path); // Log if path is not a string
    }
  };

  return (
    <div className="bg-white min-h-screen text-white p-14">
      {/* Farm our commitment section */}
      {/* Gallery Header */}
      <h1 className="text-center text-3xl font-semibold text-teal-500 mb-4 text-txt-blue" >Explore Services</h1>

      <h1 className="text-center text-black font-bold text-2xl pb-10">
        Your <span className="text-txt-blue ">Farm</span>, Your &nbsp;
        <span
          className={`inline-block transition-transform duration-500 text-red-500 ${showSavings ? 'rotate-y-180' : 'rotate-y-0'
            }`}
          style={{
            display: 'inline-block',
            transform: showSavings ? 'rotateX(360deg)' : 'rotateX(0deg)',
            transition: 'transform 0.8s ease-in-out',

          }}
        >
          {showSavings ? ' Fund' : 'Trust'}
        </span>
        , Our <span className="text-[#f0b718]"> Commitment</span>
      </h1>
      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <div key={index} 
          className="relative group cursor-pointer"
          onClick={()=> handleCategory(project.path)}>
            {/* Image */}
            <img
              src={project.image}
              alt={project.alt}
              className="w-full h-48 object-cover rounded-lg group-hover:opacity-80 transition-opacity duration-300"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-end p-4 rounded-lg group-hover:bg-opacity-60 transition-all duration-300">
              <p className="text-yellow-400 font-bold text-sm">{project.category}</p>
              <h3 className="text-xl font-semibold">{project.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Gallery;
