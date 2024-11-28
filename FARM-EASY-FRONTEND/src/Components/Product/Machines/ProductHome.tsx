import ProductCards from "./ProductCards";
import Spinner from '../../Features/Spinner/Spinner';
import { useEffect, useState } from "react";
import { getAllProducts } from "../../../Service/Productservice";
import { GetAllRentals } from "../../../Service/RentalService";
import RentalsCard from '../Rentals/RentalsCard';

const ProductPage = () => {
  const [productData, setProductData] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [rentalData, setRentalData] = useState<Rent[]>([]);

  interface Product {
    productName: string;
    productDescription: string;
    productPrice: string;
    sellerId: string;
    datePosted: string;
    productImageUrl: string;
    productcategory: string;
    ProductStock: number;
  }

  interface Rent {
    rentalId: string;
    rentalTitle: string;
    rentalDescription: string;
    rentalPrice: number;
    image: string;
    userId: string;
  }

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data: Product[] = await getAllProducts();
        setProductData(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchProducts();

    const fetchRentals = async () => {
      try {
        const serverRentals: Rent[] = await GetAllRentals();
        setRentalData(serverRentals);
      } catch (error) {
        console.error("Error fetching rentals:", error);
      }
    };

    fetchRentals();
  }, []);

  const filteredProducts = productData.filter((product) => {
    const matchesCategory = selectedCategory === "All" || selectedCategory === "New";
    const matchesSearch = product.productName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const filteredRentals = rentalData.filter((rental) => {
    const matchesCategory = selectedCategory === "All" || selectedCategory === "Rental";
    const matchesSearch = rental.rentalTitle.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="min-h-screen w-full bg-[#E0F2FE] p-6">
      {loading ? (
        <Spinner imageUrl="Videos/Spinner2.gif" altText="Loading content..." />
      ) : (
        <div className="flex flex-col gap-8 p-5">
          <div className="relative p-6 bg-[#000d6b] rounded-lg shadow-md mx-auto max-w-4xl w-full text-white">
            <h1 className="text-3xl font-semibold text-center mb-4">Search Products and Rentals</h1>
            <div className="flex justify-center items-center space-x-3">
              <select
                className="border border-gray-300 bg-white text-gray-700 p-2 rounded-lg"
                value={selectedCategory}
                onChange={handleCategoryChange}
              >
                <option value="All">All</option>
                <option value="New">New</option>
                <option value="Rental">Rental</option>
              </select>
              <input
                type="text"
                placeholder="Search by product or rental name"
                className="border border-gray-300 p-2 rounded-lg flex-grow text-black"
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <button className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700">Search</button>
            </div>
          </div>

          <div className="flex flex-col gap-12">
            {selectedCategory === "All" || selectedCategory === "New" ? (
              <>
                <h2 className="text-2xl font-bold text-blue-600 text-center">New Products</h2>
                <ProductCards productData={filteredProducts} />
              </>
            ) : null}

            {selectedCategory === "All" || selectedCategory === "Rental" ? (
              <>
                <h2 className="text-2xl font-bold text-blue-600 text-center mt-8">Rental Products</h2>
                <RentalsCard rentalsData={filteredRentals} />
              </>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
