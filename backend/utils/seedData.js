const Car = require('../models/Car');

const carsData = [
  {
    name: "Toyota Innova",
    price: "₹1800/day",
    pricePerDay: 1800,
    image: "https://imgd.aeplcdn.com/1920x1080/n/cw/ec/140809/innova-crysta-exterior-right-front-three-quarter-2.png?isig=0&q=80",
    features: ["7 Seater", "AC", "Manual", "Petrol"],
    description: "Spacious and comfortable SUV perfect for family trips",
    rating: 4.5,
    reviews: 120,
    category: "SUV",
    transmission: "Manual",
    fuelType: "Petrol",
    seats: 7,
    location: "Mumbai"
  },
  {
    name: "Mahindra XUV700",
    price: "₹2000/day",
    pricePerDay: 2000,
    image: "https://elegantautoretail.com/cdn/shop/articles/Mahindra_XUV700_Specifications_And_Accessories_7bd41ed2-ecbf-421e-8aee-41a3a84617b8_1240x.jpg?v=1742817258",
    features: ["7 Seater", "AC", "Automatic", "Diesel"],
    description: "Premium SUV with advanced features and powerful performance",
    rating: 4.7,
    reviews: 89,
    category: "SUV",
    transmission: "Automatic",
    fuelType: "Diesel",
    seats: 7,
    location: "Delhi"
  },
  {
    name: "Ford Mustang",
    price: "₹3500/day",
    pricePerDay: 3500,
    image: "https://imgd.aeplcdn.com/664x374/cw/ec/23766/Ford-Mustang-Exterior-126883.jpg?wm=0&q=80",
    features: ["2 Seater", "AC", "Automatic", "Petrol"],
    description: "Iconic sports car for those who love speed and style",
    rating: 4.8,
    reviews: 156,
    category: "Sports",
    transmission: "Automatic",
    fuelType: "Petrol",
    seats: 2,
    location: "Bangalore"
  },
  {
    name: "Suzuki Swift",
    price: "₹1200/day",
    pricePerDay: 1200,
    image: "https://www.marutisuzuki.com/-/media/images/maruti/marutisuzuki/car/car-profile-shots/solid-redn.ashx",
    features: ["5 Seater", "AC", "Manual", "Petrol"],
    description: "Compact and fuel-efficient car perfect for city driving",
    rating: 4.3,
    reviews: 203,
    category: "Compact",
    transmission: "Manual",
    fuelType: "Petrol",
    seats: 5,
    location: "Chennai"
  },
  {
    name: "Tata Tiago",
    price: "₹1000/day",
    pricePerDay: 1000,
    image: "https://images.unsplash.com/photo-1611902029807-570da6122e2e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8VGF0YSUyMFRpYWdvfGVufDB8fDB8fHww",
    features: ["5 Seater", "AC", "Manual", "Petrol"],
    description: "Affordable and reliable hatchback for budget-conscious travelers",
    rating: 4.2,
    reviews: 167,
    category: "Economy",
    transmission: "Manual",
    fuelType: "Petrol",
    seats: 5,
    location: "Pune"
  }
];

const seedCars = async () => {
  try {
    await Car.deleteMany({});
    await Car.insertMany(carsData);
    console.log('✅ Cars data seeded successfully');
  } catch (error) {
    console.error('❌ Error seeding cars data:', error);
  }
};

module.exports = { seedCars };