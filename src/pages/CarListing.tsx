import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import CarCard from '../components/CarCard';
import { Filter, SlidersHorizontal } from 'lucide-react';
import axios from 'axios';

interface Car {
  _id: string;
  name: string;
  pricePerDay: number;
  image: string;
  features: string[];
  description: string;
  rating: number;
  reviews: number;
  availability: boolean;
}

const CarListing = () => {
  const [searchParams] = useSearchParams();
  const [cars, setCars] = useState<Car[]>([]);
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [filters, setFilters] = useState({
    priceRange: '',
    transmission: ''
  });

  const location = searchParams.get('location');
  const fromDate = searchParams.get('from');
  const toDate = searchParams.get('to');

  // Fetch cars from backend
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/cars', {
          params: {
            location,
            fromDate,
            toDate
          }
        });
        const carsData = response.data.data;
        setCars(carsData);
        setFilteredCars(carsData);
      } catch (error) {
        console.error('Failed to fetch cars:', error);
      }
    };

    fetchCars();
  }, [location, fromDate, toDate]);

  // Filter cars based on UI filters
  useEffect(() => {
    let filtered = [...cars];

    if (filters.priceRange) {
      filtered = filtered.filter(car => {
        const price = car.pricePerDay;
        switch (filters.priceRange) {
          case 'low':
            return price < 1500;
          case 'medium':
            return price >= 1500 && price < 2500;
          case 'high':
            return price >= 2500;
          default:
            return true;
        }
      });
    }

    if (filters.transmission) {
      filtered = filtered.filter(car =>
        car.features.some(feature =>
          feature.toLowerCase().includes(filters.transmission.toLowerCase())
        )
      );
    }

    setFilteredCars(filtered);
  }, [filters, cars]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            Available Cars in {location || "All Locations"}
          </h1>
          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            <span>📍 Location: {location || "Any"}</span>
            <span>📅 From: {fromDate || "Any"}</span>
            <span>📅 To: {toDate || "Any"}</span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <div className="flex items-center space-x-2 mb-6">
                <SlidersHorizontal className="h-5 w-5 text-gray-600" />
                <h2 className="text-xl font-semibold">Filters</h2>
              </div>

              <div className="space-y-6">
                {/* Price */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price Range
                  </label>
                  <select
                    value={filters.priceRange}
                    onChange={(e) =>
                      setFilters({ ...filters, priceRange: e.target.value })
                    }
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">All Prices</option>
                    <option value="low">Under ₹1500</option>
                    <option value="medium">₹1500 - ₹2500</option>
                    <option value="high">Above ₹2500</option>
                  </select>
                </div>

                {/* Transmission */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Transmission
                  </label>
                  <select
                    value={filters.transmission}
                    onChange={(e) =>
                      setFilters({ ...filters, transmission: e.target.value })
                    }
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">All Types</option>
                    <option value="manual">Manual</option>
                    <option value="automatic">Automatic</option>
                  </select>
                </div>

                <button
                  onClick={() =>
                    setFilters({ priceRange: '', transmission: '' })
                  }
                  className="w-full py-2 px-4 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>

          {/* Cars Display */}
          <div className="lg:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">
                Showing {filteredCars.length} of {cars.length} cars
              </p>
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-gray-600" />
                <select className="border border-gray-300 rounded-md px-3 py-1">
                  <option>Sort by Price</option>
                  <option>Sort by Rating</option>
                  <option>Sort by Name</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredCars.map(car => (
                <CarCard key={car._id} car={car} />
              ))}
            </div>

            {filteredCars.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  No cars found matching your criteria.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarListing;
