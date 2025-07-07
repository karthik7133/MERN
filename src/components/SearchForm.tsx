import React, { useState } from 'react';
import { Search, MapPin, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SearchForm = () => {
  const [searchData, setSearchData] = useState({
    location: '',
    fromDate: '',
    toDate: ''
  });
  const navigate = useNavigate();

  const indianStates = [
    'Andhra Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat',
    'Haryana',  'Karnataka', 'Kerala', 'Tamil Nadu',
    'Telangana'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchData.location && searchData.fromDate && searchData.toDate) {
      // Store search data in localStorage for booking page
      localStorage.setItem('searchData', JSON.stringify(searchData));
      navigate(`/cars?location=${searchData.location}&from=${searchData.fromDate}&to=${searchData.toDate}`);
    }
  };

  return (
    <div className="search-container rounded-2xl p-8 shadow-2xl max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Find Your Perfect Car
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Location */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-gray-700 font-medium">
              <MapPin className="h-4 w-4" />
              <span>Pick-up Location</span>
            </label>
            <select
              value={searchData.location}
              onChange={(e) => setSearchData({...searchData, location: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">Select State</option>
              {indianStates.map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>

          {/* From Date */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-gray-700 font-medium">
              <Calendar className="h-4 w-4" />
              <span>From Date</span>
            </label>
            <input
              type="date"
              value={searchData.fromDate}
              onChange={(e) => setSearchData({...searchData, fromDate: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              min={new Date().toISOString().split('T')[0]}
              required
            />
          </div>

          {/* To Date */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-gray-700 font-medium">
              <Calendar className="h-4 w-4" />
              <span>To Date</span>
            </label>
            <input
              type="date"
              value={searchData.toDate}
              onChange={(e) => setSearchData({...searchData, toDate: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              min={searchData.fromDate || new Date().toISOString().split('T')[0]}
              required
            />
          </div>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="btn-primary inline-flex items-center space-x-2 px-8 py-3 text-lg"
          >
            <Search className="h-5 w-5" />
            <span>Search Cars</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;