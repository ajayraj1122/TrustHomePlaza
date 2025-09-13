// // import express from 'express';
// // import { createListing, deleteListing, updateListing, getListing, getListings } from '../controllers/listing.controller.js';
// // import { verifyToken } from '../utils/verifyUser.js';

// // const router = express.Router();

// // router.post('/create', verifyToken, createListing);
// // router.delete('/delete/:id', verifyToken, deleteListing);
// // router.post('/update/:id', verifyToken, updateListing);
// // router.get('/get/:id', getListing);
// // router.get('/get', getListings);

// // export default router;

// import express from 'express';
// import { 
//   createListing, 
//   deleteListing, 
//   updateListing, 
//   getListing, 
//   getListings,
//   uploadListingImages,
//   deleteListingImage
// } from '../controllers/listing.controller.js';
// import { verifyToken } from '../utils/verifyUser.js';

// const router = express.Router();

// router.post('/create', verifyToken, uploadListingImages, createListing);
// router.delete('/delete/:id', verifyToken, deleteListing);
// router.post('/update/:id', verifyToken, uploadListingImages, updateListing);
// router.get('/get/:id', getListing);
// router.get('/get', getListings);
// router.post('/delete-image', verifyToken, deleteListingImage);

// export default router;

import express from 'express';
import { 
  createListing, 
  deleteListing, 
  updateListing, 
  getListing, 
  getListings,
  uploadListingImages,
  deleteListingImage
} from '../controllers/listing.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/create', verifyToken, (req, res, next) => {
  // Check if content-type is multipart/form-data (has files)
  if (req.headers['content-type']?.includes('multipart/form-data')) {
    uploadListingImages(req, res, next);
  } else {
    // JSON data, no file upload
    next();
  }
}, createListing);
router.post('/upload-images', verifyToken, uploadListingImages, (req, res) => {
  if (req.files && req.files.length > 0) {
    const imageUrls = req.files.map(file => `/uploads/listings/${file.filename}`);
    res.status(200).json({ imageUrls });
  } else {
    res.status(400).json({ message: 'No images uploaded' });
  }
});
router.delete('/delete/:id', verifyToken, deleteListing);
router.post('/update/:id', verifyToken, uploadListingImages, updateListing);
router.get('/get/:id', getListing);
router.get('/get', getListings);
router.post('/delete-image', verifyToken, deleteListingImage);

export default router;
