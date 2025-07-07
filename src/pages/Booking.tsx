import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Calendar,
  MapPin,
  CreditCard,
  User,
  Phone,
  Mail,
  CheckCircle,
} from "lucide-react";
import axios from "axios";

interface Car {
  _id: string;
  name: string;
  pricePerDay: number;
  image: string;
  price: string;
}

const Booking = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [car, setCar] = useState<Car | null>(null);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(true);
  const [bookingData, setBookingData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    fromDate: "",
    toDate: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
  });

  // Auto-fill search data when component mounts
  useEffect(() => {
    const fetchCar = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/cars/${id}`);
        setCar(res.data.data); // access the car from res.data.data
      } catch (error) {
        console.error("Failed to fetch car:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCar();
  }, [id]);

  useEffect(() => {
    const storedSearchData = localStorage.getItem("searchData");
    if (storedSearchData) {
      const searchData = JSON.parse(storedSearchData);
      setBookingData((prev) => ({
        ...prev,
        location: searchData.location || "",
        fromDate: searchData.fromDate || "",
        toDate: searchData.toDate || "",
      }));
    }

    const userName = localStorage.getItem("userName");
    if (userName) {
      setBookingData((prev) => ({
        ...prev,
        name: userName,
      }));
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBookingData({
      ...bookingData,
      [e.target.name]: e.target.value,
    });
  };
  const calculateTotal = () => {
    if (!bookingData.fromDate || !bookingData.toDate || !car) return 0;
    const from = new Date(bookingData.fromDate);
    const to = new Date(bookingData.toDate);
    const days = Math.ceil(
      (to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24)
    );
    return days * car.pricePerDay;
  };

  const handleBooking = async () => {
    if (!car) return;
    const user = JSON.parse(sessionStorage.getItem("user") || "{}");

    if (!user?.id) {
      alert("Please log in to book a car.");
      navigate("/login");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/bookings", {
        user:user.id, // <-- added user
        carId: car._id,
        bookingDetails: {
          name: bookingData.name,
          email: bookingData.email,
          phone: bookingData.phone,
          location: bookingData.location,
          fromDate: bookingData.fromDate,
          toDate: bookingData.toDate,
        },
        paymentDetails: {
          cardNumber: bookingData.cardNumber,
          cardName: bookingData.cardName,
          expiryDate: bookingData.expiryDate,
        },
      });

      console.log("✅ Booking Success:", res.data);
      setStep(4); // show success screen
    } catch (error) {
      console.error("❌ Booking Failed:", error);
      alert("Booking failed. Please try again.");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) setStep(2);
    else if (step === 2) setStep(3);
    else handleBooking();
  };

  // ❌ Car not found or still loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!car) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Car not found
      </div>
    );
  }

  if (step === 4) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-8 text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Booking Confirmed!
          </h2>
          <p className="text-gray-600 mb-6">
            Your booking for {car.name} has been confirmed. You'll receive a
            confirmation email shortly.
          </p>
          <button
            onClick={() => navigate("/")}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Car not found
      </div>
    );
  }

  if (step === 4) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-8 text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Booking Confirmed!
          </h2>
          <p className="text-gray-600 mb-6">
            Your booking for {car.name} has been confirmed. You'll receive a
            confirmation email shortly.
          </p>
          <button
            onClick={() => navigate("/")}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-sm">
            <div
              className={`flex items-center ${
                step >= 1 ? "text-blue-600" : "text-gray-400"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${
                  step >= 1 ? "bg-blue-600 text-white" : "bg-gray-200"
                }`}
              >
                1
              </div>
              <span>Details</span>
            </div>
            <div
              className={`flex items-center ${
                step >= 2 ? "text-blue-600" : "text-gray-400"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${
                  step >= 2 ? "bg-blue-600 text-white" : "bg-gray-200"
                }`}
              >
                2
              </div>
              <span>Dates</span>
            </div>
            <div
              className={`flex items-center ${
                step >= 3 ? "text-blue-600" : "text-gray-400"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${
                  step >= 3 ? "bg-blue-600 text-white" : "bg-gray-200"
                }`}
              >
                3
              </div>
              <span>Payment</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                {step === 1 && "Personal Details"}
                {step === 2 && "Booking Details"}
                {step === 3 && "Payment Information"}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {step === 1 && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="flex items-center space-x-2 text-gray-700 font-medium mb-2">
                          <User className="h-4 w-4" />
                          <span>Full Name</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={bookingData.name}
                          onChange={handleInputChange}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="flex items-center space-x-2 text-gray-700 font-medium mb-2">
                          <Mail className="h-4 w-4" />
                          <span>Email</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={bookingData.email}
                          onChange={handleInputChange}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="flex items-center space-x-2 text-gray-700 font-medium mb-2">
                        <Phone className="h-4 w-4" />
                        <span>Phone Number</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={bookingData.phone}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </>
                )}

                {step === 2 && (
                  <>
                    <div>
                      <label className="flex items-center space-x-2 text-gray-700 font-medium mb-2">
                        <MapPin className="h-4 w-4" />
                        <span>Pick-up Location</span>
                      </label>
                      <input
                        type="text"
                        name="location"
                        value={bookingData.location}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter city or area"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="flex items-center space-x-2 text-gray-700 font-medium mb-2">
                          <Calendar className="h-4 w-4" />
                          <span>From Date</span>
                        </label>
                        <input
                          type="date"
                          name="fromDate"
                          value={bookingData.fromDate}
                          onChange={handleInputChange}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          min={new Date().toISOString().split("T")[0]}
                          required
                        />
                      </div>
                      <div>
                        <label className="flex items-center space-x-2 text-gray-700 font-medium mb-2">
                          <Calendar className="h-4 w-4" />
                          <span>To Date</span>
                        </label>
                        <input
                          type="date"
                          name="toDate"
                          value={bookingData.toDate}
                          onChange={handleInputChange}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          min={
                            bookingData.fromDate ||
                            new Date().toISOString().split("T")[0]
                          }
                          required
                        />
                      </div>
                    </div>
                  </>
                )}

                {step === 3 && (
                  <>
                    <div>
                      <label className="flex items-center space-x-2 text-gray-700 font-medium mb-2">
                        <CreditCard className="h-4 w-4" />
                        <span>Card Number</span>
                      </label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={bookingData.cardNumber}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="1234 5678 9012 3456"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-gray-700 font-medium mb-2">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          name="expiryDate"
                          value={bookingData.expiryDate}
                          onChange={handleInputChange}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          placeholder="MM/YY"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-medium mb-2">
                          CVV
                        </label>
                        <input
                          type="text"
                          name="cvv"
                          value={bookingData.cvv}
                          onChange={handleInputChange}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          placeholder="123"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        Cardholder Name
                      </label>
                      <input
                        type="text"
                        name="cardName"
                        value={bookingData.cardName}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </>
                )}

                <div className="flex justify-between">
                  {step > 1 && (
                    <button
                      type="button"
                      onClick={() => setStep(step - 1)}
                      className="px-6 py-3 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      Back
                    </button>
                  )}
                  <button
                    type="submit"
                    className="ml-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    {step === 3 ? "Complete Booking" : "Next"}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <h3 className="text-lg font-semibold mb-4">Booking Summary</h3>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div>
                    <h4 className="font-semibold">{car.name}</h4>
                    <p className="text-sm text-gray-600">{car.price}</p>
                  </div>
                </div>

                {bookingData.fromDate && bookingData.toDate && (
                  <div className="border-t pt-4">
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>From:</span>
                        <span>{bookingData.fromDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>To:</span>
                        <span>{bookingData.toDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Days:</span>
                        <span>
                          {Math.ceil(
                            (new Date(bookingData.toDate).getTime() -
                              new Date(bookingData.fromDate).getTime()) /
                              (1000 * 60 * 60 * 24)
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total:</span>
                    <span>₹{calculateTotal()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
