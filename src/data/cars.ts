interface Car {
  id: number;
  name: string;
  price: string;
  image: string;
  features: string[];
  description: string;
  rating: number;
  reviews: number;
}

export const carsData: Car[] = [
  {
    id: 1,
    name: "Toyota Innova",
    price: "₹1800/day",
    image: "https://imgd.aeplcdn.com/1920x1080/n/cw/ec/140809/innova-crysta-exterior-right-front-three-quarter-2.png?isig=0&q=80",
    features: ["7 Seater", "AC", "Manual", "Petrol"],
    description: "Spacious and comfortable SUV perfect for family trips",
    rating: 4.5,
    reviews: 120
  },
  {
    id: 2,
    name: "Mahindra XUV700",
    price: "₹2000/day",
    image: "https://elegantautoretail.com/cdn/shop/articles/Mahindra_XUV700_Specifications_And_Accessories_7bd41ed2-ecbf-421e-8aee-41a3a84617b8_1240x.jpg?v=1742817258",
    features: ["7 Seater", "AC", "Automatic", "Diesel"],
    description: "Premium SUV with advanced features and powerful performance",
    rating: 4.7,
    reviews: 89
  },
  {
    id: 3,
    name: "Ford Mustang",
    price: "₹3500/day",
    image: "https://imgd.aeplcdn.com/664x374/cw/ec/23766/Ford-Mustang-Exterior-126883.jpg?wm=0&q=80",
    features: ["2 Seater", "AC", "Automatic", "Petrol"],
    description: "Iconic sports car for those who love speed and style",
    rating: 4.8,
    reviews: 156
  },
  {
    id: 4,
    name: "Suzuki Swift",
    price: "₹1200/day",
    image: "https://www.marutisuzuki.com/-/media/images/maruti/marutisuzuki/car/car-profile-shots/solid-redn.ashx",
    features: ["5 Seater", "AC", "Manual", "Petrol"],
    description: "Compact and fuel-efficient car perfect for city driving",
    rating: 4.3,
    reviews: 203
  },
  {
    id: 5,
    name: "Tata Tiago",
    price: "₹1000/day",
    image: "https://images.unsplash.com/photo-1611902029807-570da6122e2e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8VGF0YSUyMFRpYWdvfGVufDB8fDB8fHww",
    features: ["5 Seater", "AC", "Manual", "Petrol"],
    description: "Affordable and reliable hatchback for budget-conscious travelers",
    rating: 4.2,
    reviews: 167
  },
  {
    id: 6,
    name: "Renault Kwid",
    price: "₹900/day",
    image: "https://imgd.aeplcdn.com/664x374/n/qkcb8cb_1710963.jpg?q=80",
    features: ["5 Seater", "AC", "Manual", "Petrol"],
    description: "Stylish and economical car with modern features",
    rating: 4.1,
    reviews: 134
  },
  {
    id: 7,
    name: "Maruti Baleno",
    price: "₹1300/day",
    image: "https://imgd.aeplcdn.com/1056x594/n/t4frrua_1559467.jpg?q=80",
    features: ["5 Seater", "AC", "Manual", "Petrol"],
    description: "Premium hatchback with excellent fuel efficiency",
    rating: 4.4,
    reviews: 178
  },
  {
    id: 8,
    name: "Hyundai Verna",
    price: "₹1600/day",
    image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/41197/hyundai-verna-right-front-three-quarter7.jpeg?q=80",
    features: ["5 Seater", "AC", "Automatic", "Petrol"],
    description: "Elegant sedan with premium interiors and smooth performance",
    rating: 4.6,
    reviews: 145
  },
  {
    id: 9,
    name: "Tata Harrier",
    price: "₹1800/day",
    image: "https://images.unsplash.com/photo-1628573042918-a91e94c2c906?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dGF0YSUyMGhhcnJpZXJ8ZW58MHx8MHx8fDA%3D",
    features: ["5 Seater", "AC", "Manual", "Diesel"],
    description: "Robust SUV with commanding presence and advanced safety features",
    rating: 4.5,
    reviews: 112
  },
  {
    id: 10,
    name: "Honda City",
    price: "₹1500/day",
    image: "https://imgd.aeplcdn.com/1056x594/n/cw/ec/134287/city-exterior-right-front-three-quarter-76.jpeg?isig=0&q=80",
    features: ["5 Seater", "AC", "CVT", "Petrol"],
    description: "Reliable sedan with spacious cabin and smooth driving experience",
    rating: 4.5,
    reviews: 189
  }
];