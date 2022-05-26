const Listing = require("../models/listing");
const User = require("../models/user");

const { cloudinary, storage } = require("../cloudinary/index");

module.exports.getAllListings = async (req, res) => {
  const listings = await Listing.find();
  res.json(listings);
};

module.exports.createNewListing = async (req, res) => {
  // add new listing
  const listing = new Listing(req.body);
  const seller = req.userData;
  listing.email = seller.userEmail;

  // image upload
  listing.seller = seller.userId;
  if (req.files.length > 0) {
    const newImages = req.files.map((image) => ({
      filename: image.filename,
      url: image.path,
    }));
    listing.images.push(...newImages);
  }
  const savedListing = await listing.save();

  // update user
  const user = await User.findById(seller.userId);
  user.listings.push(savedListing._id);
  await user.save();

  return res.json(savedListing);
};

module.exports.getMyListings = async (req, res) => {
  const userId = req.userData.userId;
  const user = await User.findById(userId);
  const userListings = user.listings;

  const listings = await Listing.find({ _id: { $in: userListings } });
  res.json(listings);
};

module.exports.showListing = async (req, res) => {
  const id = req.params.id;
  const listing = await Listing.findById(id);
  res.json(listing);
};

module.exports.editListing = async (req, res) => {
  const listingId = req.params.id;
  const listing = await Listing.findById(listingId);

  const user = req.userData;
  if (listing.seller.equals(user.userId)) {
    await listing.updateOne(req.body);
    res.json(listing);
  } else {
    res.json({ error: "Not Authorized!" });
  }
};

module.exports.deleteListing = async (req, res) => {
  const listingId = req.params.id;
  const listing = await Listing.findById(listingId);

  const user = req.userData;

  if (listing.seller.equals(user.userId)) {
    // unlink from user
    await User.updateOne(
      { _id: user.userId },
      { $pull: { listings: { $in: [listingId] } } }
    );

    // delete images in cloudinary
    for (let image of listing.images) {
      cloudinary.uploader.destroy(image.filename);
    }

    // delete listing
    await listing.deleteOne();
    const listings = await Listing.find();
    res.json(listings);
  } else {
    res.json({ error: "Not Authorized!" });
  }
};
