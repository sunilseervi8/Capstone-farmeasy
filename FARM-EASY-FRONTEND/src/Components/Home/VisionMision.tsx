
export default function VisionMission() {
  return (
    <div className="bg-gray-100 py-10 px-6 lg:px-16 flex flex-col lg:flex-row items-center lg:items-start gap-10">
      {/* Image Section */}
      
      <div className="relative flex-shrink-0 lg:w-1/2">
        <img
          src="https://thumbs.dreamstime.com/b/modern-combine-harvester-wheat-field-under-sun-showing-efficiency-agriculture-working-bright-sky-capturing-essence-322889193.jpg"
          alt="Farmer in field"
          className="rounded-lg shadow-lg h-[70vh] w-[100%]"
        />
      </div>
      {/* Text & Cards Section */}
      <div className="flex-grow">
        {/* Heading */}
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          Modern Agriculture Machines and Cultivation Tools
        </h2>
        <p className="text-gray-600 mb-8">
          At Farm Easy, we believe in revolutionizing the agricultural landscape with sustainable, tech-driven practices. Join us in creating a future where farmers thrive.
        </p>

        {/* Cards for Vision & Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Vision Card with Slant Effect */}
          <div className="relative overflow-hidden">
            <div className="absolute inset-0 bg-yellow-300 skew-y-3 transform origin-bottom-left"></div>
            <div className="relative p-6 rounded-lg shadow-lg z-10 bg-white">
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">Our Vision</h3>
              <p className="text-gray-700">
                Revolutionizing agriculture with sustainable, tech-driven solutions to enhance productivity and income while promoting eco-friendly practices.
              </p>
            </div>
          </div>

          {/* Mission Card with Slant Effect */}
          <div className="relative overflow-hidden">
            <div className="absolute inset-0 bg-green-300 skew-y-3 transform origin-bottom-left"></div>
            <div className="relative p-6 rounded-lg shadow-lg z-10 bg-white">
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">Our Mission</h3>
              <p className="text-gray-700">
                Empowering farmers with data-driven tools, modern equipment, and educational resources to maximize their potential and reduce operational challenges.
              </p>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}
