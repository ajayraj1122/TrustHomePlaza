// import Listing from '../models/listing.model.js';
// import { errorHandler } from '../utils/error.js';

// export const createListing = async (req, res, next) => {
//   try {
//     const listing = await Listing.create(req.body);
//     return res.status(201).json(listing);
//   } catch (error) {
//     next(error);
//   }
// };

// export const deleteListing = async (req, res, next) => {
//   const listing = await Listing.findById(req.params.id);

//   if (!listing) {
//     return next(errorHandler(404, 'Listing not found!'));
//   }

//   if (req.user.id !== listing.userRef) {
//     return next(errorHandler(401, 'You can only delete your own listings!'));
//   }

//   try {
//     await Listing.findByIdAndDelete(req.params.id);
//     res.status(200).json('Listing has been deleted!');
//   } catch (error) {
//     next(error);
//   }
// };

// export const updateListing = async (req, res, next) => {
//   const listing = await Listing.findById(req.params.id);
//   if (!listing) {
//     return next(errorHandler(404, 'Listing not found!'));
//   }
//   if (req.user.id !== listing.userRef) {
//     return next(errorHandler(401, 'You can only update your own listings!'));
//   }

//   try {
//     const updatedListing = await Listing.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );
//     res.status(200).json(updatedListing);
//   } catch (error) {
//     next(error);
//   }
// };

// export const getListing = async (req, res, next) => {
//   try {
//     const listing = await Listing.findById(req.params.id);
//     if (!listing) {
//       return next(errorHandler(404, 'Listing not found!'));
//     }
//     res.status(200).json(listing);
//   } catch (error) {
//     next(error);
//   }
// };

// export const getListings = async (req, res, next) => {
//   try {
//     const limit = parseInt(req.query.limit) || 9;
//     const startIndex = parseInt(req.query.startIndex) || 0;
//     let offer = req.query.offer;

//     if (offer === undefined || offer === 'false') {
//       offer = { $in: [false, true] };
//     }

//     let furnished = req.query.furnished;

//     if (furnished === undefined || furnished === 'false') {
//       furnished = { $in: [false, true] };
//     }

//     let parking = req.query.parking;

//     if (parking === undefined || parking === 'false') {
//       parking = { $in: [false, true] };
//     }

//     let type = req.query.type;

//     if (type === undefined || type === 'all') {
//       type = { $in: ['sale', 'rent'] };
//     }

//     const searchTerm = req.query.searchTerm || '';

//     const sort = req.query.sort || 'createdAt';

//     const order = req.query.order || 'desc';

//     const listings = await Listing.find({
//       name: { $regex: searchTerm, $options: 'i' },
//       offer,
//       furnished,
//       parking,
//       type,
//     })
//       .sort({ [sort]: order })
//       .limit(limit)
//       .skip(startIndex);

//     return res.status(200).json(listings);
//   } catch (error) {
//     next(error);
//   }
// };

import Listing from '../models/listing.model.js';
import { errorHandler } from '../utils/error.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = './uploads/listings/';
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    // Generate unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'listing-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 2 * 1024 * 1024 // 2MB limit per file
  },
  fileFilter: function (req, file, cb) {
    // Check file type
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

export const uploadListingImages = upload.array('images', 6);

export const createListing = async (req, res, next) => {
  try {
    const listingData = { ...req.body };
    
    // If files were uploaded, add their paths to imageUrls
    if (req.files && req.files.length > 0) {
      listingData.imageUrls = req.files.map(file => `/uploads/listings/${file.filename}`);
    }
    
    const listing = await Listing.create(listingData);
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};

export const deleteListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    return next(errorHandler(404, 'Listing not found!'));
  }

  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, 'You can only delete your own listings!'));
  }

  try {
    // Delete associated image files
    if (listing.imageUrls && listing.imageUrls.length > 0) {
      listing.imageUrls.forEach(imageUrl => {
        const imagePath = path.join('.', imageUrl);
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      });
    }

    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json('Listing has been deleted!');
  } catch (error) {
    next(error);
  }
};

export const updateListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    return next(errorHandler(404, 'Listing not found!'));
  }
  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, 'You can only update your own listings!'));
  }

  try {
    const updateData = { ...req.body };
    
    // If new files were uploaded, add their paths
    if (req.files && req.files.length > 0) {
      const newImageUrls = req.files.map(file => `/uploads/listings/${file.filename}`);
      updateData.imageUrls = listing.imageUrls.concat(newImageUrls);
    }

    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
};

export const deleteListingImage = async (req, res, next) => {
  try {
    const { listingId, imageUrl } = req.body;
    const listing = await Listing.findById(listingId);
    
    if (!listing) {
      return next(errorHandler(404, 'Listing not found!'));
    }
    
    if (req.user.id !== listing.userRef) {
      return next(errorHandler(401, 'You can only modify your own listings!'));
    }

    // Remove image from filesystem
    const imagePath = path.join('.', imageUrl);
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    // Remove image URL from listing
    listing.imageUrls = listing.imageUrls.filter(url => url !== imageUrl);
    await listing.save();

    res.status(200).json({ message: 'Image deleted successfully' });
  } catch (error) {
    next(error);
  }
};

export const getListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return next(errorHandler(404, 'Listing not found!'));
    }
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};

export const getListings = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;
    let offer = req.query.offer;

    if (offer === undefined || offer === 'false') {
      offer = { $in: [false, true] };
    }

    let furnished = req.query.furnished;

    if (furnished === undefined || furnished === 'false') {
      furnished = { $in: [false, true] };
    }

    let parking = req.query.parking;

    if (parking === undefined || parking === 'false') {
      parking = { $in: [false, true] };
    }

    let type = req.query.type;

    if (type === undefined || type === 'all') {
      type = { $in: ['sale', 'rent'] };
    }

    const searchTerm = req.query.searchTerm || '';

    const sort = req.query.sort || 'createdAt';

    const order = req.query.order || 'desc';

    const listings = await Listing.find({
      name: { $regex: searchTerm, $options: 'i' },
      offer,
      furnished,
      parking,
      type,
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

    return res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};
