import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Booking {
  bookingId: string;
  car: {
    name: string;
    image: string;
  };
  bookingDetails: {
    name: string;
    email: string;
    phone: string;
    location: string;
    fromDate: string;
    toDate: string;
  };
  totalAmount: number;
  totalDays: number;
  status: string;
  createdAt: string;
}

const MyBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Add this to your MyBookings component
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const user = JSON.parse(sessionStorage.getItem("user") || "{}");

        if (!token || !user?.id) {
          navigate("/login");
          return;
        }

        const res = await axios.get(
          `http://localhost:5000/api/bookings/user/${user.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setBookings(res.data.data);
      } catch (err) {
        console.error("Failed to fetch bookings", err);
        setError("Something went wrong while fetching your bookings.");
      } finally {
        setLoading(false); // ✅ always executed
      }
    };

    fetchBookings();
  }, [navigate]);

  if (loading) return <div>Loading bookings...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (bookings.length === 0) return <div>No bookings found</div>;
  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">My Bookings</h2>

      {bookings.length === 0 ? (
        <p className="text-gray-600">You have no bookings yet.</p>
      ) : (
        <div className="space-y-6">
          {bookings.map((booking, index) => (
            <div
              key={booking.bookingId}
              className="bg-white shadow-md p-4 rounded-lg"
            >
              <h3 className="text-xl font-semibold mb-2">
                {index + 1}. {booking.car.name}
              </h3>
              <div className="w-full h-40 relative rounded mb-4 overflow-hidden">
                <img
                  src={booking.car.image}
                  alt={booking.car.name}
                  className="absolute inset-0 w-full h-full object-contain"
                />
              </div>

              <p>
                <strong>Booking ID:</strong> {booking.bookingId}
              </p>
              <p>
                <strong>Name:</strong> {booking.bookingDetails.name}
              </p>
              <p>
                <strong>Email:</strong> {booking.bookingDetails.email}
              </p>
              <p>
                <strong>Phone:</strong> {booking.bookingDetails.phone}
              </p>
              <p>
                <strong>Location:</strong> {booking.bookingDetails.location}
              </p>
              <p>
                <strong>From:</strong> {booking.bookingDetails.fromDate}
              </p>
              <p>
                <strong>To:</strong> {booking.bookingDetails.toDate}
              </p>
              <p>
                <strong>Total Days:</strong> {booking.totalDays}
              </p>
              <p>
                <strong>Total Amount:</strong> ₹{booking.totalAmount}
              </p>
              <p>
                <strong>Status:</strong> {booking.status}
              </p>
              <p className="text-sm text-gray-500">
                Booked on {new Date(booking.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
