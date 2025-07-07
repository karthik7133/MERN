import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Users, Fuel, Settings } from 'lucide-react';

interface Car {
  _id: string;
  name: string;
  pricePerDay: number;
  image: string;
  features: string[];
  description: string;
  rating: number;
  reviews: number;
}

interface CarCardProps {
  car: Car;
  minimal?: boolean; // 👈 Prop to toggle simplified view
}

const CarCard: React.FC<CarCardProps> = ({ car, minimal = false }) => {
  const seats = car.features.find(f => f.toLowerCase().includes('seater')) || '';
  const transmission = car.features.find(f => ['manual', 'automatic'].includes(f.toLowerCase())) || '';
  const fuel = car.features.find(f => ['petrol', 'diesel', 'electric'].includes(f.toLowerCase())) || '';

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden card-hover">
      <div className="relative">
        <img
          src={car.image}
          alt={car.name}
          className="w-full h-48 object-cover"
        />

        {/* ✅ Show price only if not minimal */}
        {!minimal && (
          <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-semibold text-green-600">
            ₹{car.pricePerDay}/day
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{car.name}</h3>

        {/* ✅ Always show features */}
        <div className="flex items-center space-x-4 text-gray-600 mb-4">
          {seats && (
            <div className="flex items-center space-x-1">
              <Users className="h-4 w-4" />
              <span className="text-sm">{seats}</span>
            </div>
          )}
          {fuel && (
            <div className="flex items-center space-x-1">
              <Fuel className="h-4 w-4" />
              <span className="text-sm">{fuel}</span>
            </div>
          )}
          {transmission && (
            <div className="flex items-center space-x-1">
              <Settings className="h-4 w-4" />
              <span className="text-sm">{transmission}</span>
            </div>
          )}
        </div>

        {/* ✅ Show rating but skip View Details if minimal */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="text-sm text-gray-600">
              {car.rating} ({car.reviews} reviews)
            </span>
          </div>

          {!minimal && (
            <Link
              to={`/car/${car._id}`}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              View Details
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default CarCard;
