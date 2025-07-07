const axios = require('axios');
const carsData = require('./cars.json');
console.log("🚀 Upload script started...");

async function uploadCars() {
  for (const car of carsData) {
    try {
      const response = await axios.post('http://localhost:5000/api/cars', car);
      console.log(`✅ Uploaded: ${car.name}`);
    } catch (error) {
      console.error(`❌ Failed: ${car.name}`, error.response?.data || error.message);
    }
  }
}

uploadCars();
