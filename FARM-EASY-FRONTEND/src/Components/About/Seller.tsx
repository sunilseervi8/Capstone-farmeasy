// Section for the display the new product list into the hpome page
const Equipments = () => {
  return (
    <div className="my-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading section */}
        <h1 className="text-center text-3xl font-medium my-10">
          Sell New & Used Farm Equipment
        </h1>
        {/* Card Design */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {images.map((image) => (
            // Card Section with the hover effect
            <div key={image.title}
              className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl 
              transition-shadow duration-300 hover:scale-105 hover:cursor-pointer" >
                {/* Image */}
              <img className="equipImg object-cover w-full h-60"
                src={image.img} alt={image.title} />
                {/* Hover grey Effect */}
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center 
              justify-center opacity-100 hover:opacity-0 transition-opacity duration-300">
                {/* Image title  */}
                <h1 className="text-white text-lg font-semibold">{image.title}</h1>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Equipments;


// Images  for the category section
const images = [
  {
    img: "https://s3.ap-south-1.amazonaws.com/www.beroni.in/farmease-app/categories/Tractors.jpg",
    title: "Tractors"
  },
  {
    img: "https://s3.ap-south-1.amazonaws.com/www.beroni.in/farmease-app/categories/Tillage_Equipment.jpg",
    title: "Tillage Equipment"
  },
  {
    img: "https://s3.ap-south-1.amazonaws.com/www.beroni.in/farmease-app/categories/Seeding_Equipment.jpg",
    title: "Seeding Equipments"
  },
  {
    img: "https://s3.ap-south-1.amazonaws.com/www.beroni.in/farmease-app/categories/Landscaping_Equipment.jpg",
    title: "Landscape Equipment"
  },
  {
    img: "https://s3.ap-south-1.amazonaws.com/www.beroni.in/farmease-app/categories/Crop_Protection.jpg",
    title: "Crop Protection"
  },
  {
    img: "https://s3.ap-south-1.amazonaws.com/www.beroni.in/farmease-app/categories/Harvest_Equipment.jpg",
    title: "Harvest Equipment"
  },
  {
    img: "https://s3.ap-south-1.amazonaws.com/www.beroni.in/farmease-app/categories/Post_Harvest.jpg",
    title: "Post Harvest"
  },
  {
    img: "https://s3.ap-south-1.amazonaws.com/www.beroni.in/farmease-app/categories/Haulage.jpg",
    title: "Haulage"
  }
];

