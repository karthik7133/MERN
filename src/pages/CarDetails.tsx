import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import {
  Star, Users, Fuel, Settings, Shield, Clock,
  MapPin, CreditCard
} from 'lucide-react';

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

const CarDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const res = await axios.get(`https://mern-project-au3d.onrender.com/api/cars/${id}`);
        setCar(res.data.data);
      } catch (error) {
        console.error('Failed to fetch car:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Car not found</h2>
          <Link to="/cars" className="text-blue-600 hover:underline">
            Back to cars
          </Link>
        </div>
      </div>
    );
  }

  // Extract values from features
  const seats = car.features.find(f => f.toLowerCase().includes('seater')) || '';
  const transmission = car.features.find(f => ['manual', 'automatic'].includes(f.toLowerCase())) || '';
  const fuel = car.features.find(f => ['petrol', 'diesel', 'electric'].includes(f.toLowerCase())) || '';

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <span>/</span>
          <Link to="/cars" className="hover:text-blue-600">Cars</Link>
          <span>/</span>
          <span className="text-gray-800">{car.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="relative">
                <img
                  src={car.image}
                  alt={car.name}
                  className="w-full h-96 object-cover"
                />
                <div className="absolute top-6 right-6 bg-white px-4 py-2 rounded-full">
                  <span className="text-2xl font-bold text-green-600">₹{car.pricePerDay}</span>
                </div>
              </div>

              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">{car.name}</h1>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1">
                        <Star className="h-5 w-5 text-yellow-400 fill-current" />
                        <span className="text-lg font-semibold">{car.rating}</span>
                      </div>
                      <span className="text-gray-600">({car.reviews} reviews)</span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 mb-8 text-lg">{car.description}</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  {seats && (
                    <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                      <Users className="h-5 w-5 text-blue-600" />
                      <span className="text-sm font-medium">{seats}</span>
                    </div>
                  )}
                  {fuel && (
                    <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                      <Fuel className="h-5 w-5 text-green-600" />
                      <span className="text-sm font-medium">{fuel}</span>
                    </div>
                  )}
                  {transmission && (
                    <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                      <Settings className="h-5 w-5 text-purple-600" />
                      <span className="text-sm font-medium">{transmission}</span>
                    </div>
                  )}
                  <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                    <Shield className="h-5 w-5 text-red-600" />
                    <span className="text-sm font-medium">Insured</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">What's Included</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      'Air Conditioning',
                      'GPS Navigation',
                      'Bluetooth Connectivity',
                      'USB Charging Ports',
                      'Safety Kit',
                      'Spare Tire',
                      'Insurance Coverage',
                      '24/7 Roadside Assistance'
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-8 sticky top-24">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-gray-800 mb-2">₹{car.pricePerDay}</div>
                <p className="text-gray-600">Per day rental</p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <MapPin className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium">Pick-up Location</p>
                    <p className="text-xs text-gray-600">Multiple locations available</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Clock className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="text-sm font-medium">Available 24/7</p>
                    <p className="text-xs text-gray-600">Instant booking confirmation</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <CreditCard className="h-5 w-5 text-purple-600" />
                  <div>
                    <p className="text-sm font-medium">Secure Payment</p>
                    <p className="text-xs text-gray-600">Multiple payment options</p>
                  </div>
                </div>
              </div>

              <Link
                to={`/booking/${car._id}`}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg block text-center"
              >
                Book Now
              </Link>

              <div className="mt-6 text-center text-sm text-gray-500">
                <p>Free cancellation up to 24 hours before pickup</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
