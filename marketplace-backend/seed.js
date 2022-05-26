const mongoose = require('mongoose');
async function main() {
  await mongoose.connect("mongodb://localhost:27017/marketplace-backend");
}
main().catch((err) => console.log(err));

const Listing = require("./models/listing");
const User = require("./models/listing");

title = [
  "Sipder Man Toy",
  "Batman Toy",
  "Superman Toy",
  "Aquaman Toy",
  "Cyborg Toy",
];
price = [5, 10, 15, 20, 25];
email = [
  "phan@gmail.com",
  "phan@gmail.com",
  "phan@gmail.com",
  "phuong@gmail.com",
  "phuong@gmail.com",
];

const seedDB = async () => {
  console.log('adding listings\n...');
  await User.deleteMany({});
  await Listing.deleteMany({});
  for (let i = 0; i < 5; i++) {
    const listing = new Listing({
      title: title[i],
      price: price[i],
      email: email[i],
    });
    await listing.save();
  }
  console.log('connection close');
  mongoose.connection.close();
};

seedDB()