import React from "react";
import SearchForm from "../components/SearchForm";
import CarCard from "../components/CarCard";
import { carsData } from "../data/cars";
import { Shield, Clock, Award, Headphones } from "lucide-react";

const Home = () => {
  const popularCars = carsData.slice(0, 6);

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section flex items-center justify-center text-white">
        <div className="text-center space-y-6 px-4">
          <h1 className="text-4xl md:text-6xl font-bold">
            Find Your Perfect Ride
          </h1>
          <p className="text-xl md:text-2xl text-gray-200">
            Rent premium cars at affordable prices across India
          </p>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-16 px-4 -mt-16 relative z-10">
        <div className="max-w-7xl mx-auto">
          <SearchForm />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-gray-100">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
            Why Choose RentCars?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center space-y-4">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold">Safe & Secure</h3>
              <p className="text-gray-600">
                All our cars are regularly maintained and sanitized
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                <Clock className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold">24/7 Service</h3>
              <p className="text-gray-600">
                Round-the-clock customer support and roadside assistance
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                <Award className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold">Best Prices</h3>
              <p className="text-gray-600">
                Competitive rates with no hidden charges
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                <Headphones className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold">Easy Booking</h3>
              <p className="text-gray-600">
                Simple booking process with instant confirmation
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Cars Section */}
      {/* Popular Cars Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
            Popular Car Selections
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularCars.map((car) => (
              <CarCard key={car._id} car={car} minimal={true} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
