const express = require('express');
const router = express.Router({mergeParams: true});

const listingControllers = require("../controllers/listings");
const checkAuth = require("../middleware/check-auth");

// multer
const multer = require("multer");
const { cloudinary, storage } = require("../cloudinary/index");
const upload = multer({ storage });
// const upload = multer({ dest: 'uploads/' });

router.route("/")
  .get(listingControllers.getAllListings)
  .post(checkAuth, upload.array("images"), listingControllers.createNewListing);

router.get("/mylistings", checkAuth, listingControllers.getMyListings);

router.route("/:id")
  .get(listingControllers.showListing)
  .put(checkAuth, upload.array("images"), listingControllers.editListing)
  .delete(checkAuth, listingControllers.deleteListing);

module.exports = router;
