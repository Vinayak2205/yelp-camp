const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "636e5825267689bcb4b04db8",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis esse, necessitatibus vel quasi aliquid quidem nemo suscipit porro amet doloremque dolore tempore quam delectus quaerat consequuntur iure est sunt provident?",
      price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      images: [
        {
          url: "https://res.cloudinary.com/dotmpymfx/image/upload/v1663145843/YelpCamp/mxiaopbaq2fpus1jpdyu.jpg",
          filename: "YelpCamp/mxiaopbaq2fpus1jpdyu",
        },
        {
          url: "https://res.cloudinary.com/dotmpymfx/image/upload/v1663156058/YelpCamp/cko6bdgk5lbiiztkbvhx.jpg",
          filename: "YelpCamp/p0yosywdebzizekuu9mt",
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
