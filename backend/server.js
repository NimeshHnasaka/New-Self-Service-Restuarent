// const express = require('express');
// const cors = require('cors');
// const multer = require('multer');
// const mongoose = require('mongoose');
// const app = express();
// const upload = multer();

// // Enable CORS
// app.use(cors());

// // MongoDB connection setup
// mongoose.connect('mongodb://localhost:27017/Restuarent', { useNewUrlParser: true, useUnifiedTopology: true });
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// // Define a schema for storing images
// const imageSchema = new mongoose.Schema({
//     data: Buffer,
//     contentType: String,
//    // objectsDetected: [String],
//     uploadDateTime: { type: Date, default: Date.now } // Add a field for upload date and time
// });
// const Image = mongoose.model('Image', imageSchema);

// // API endpoint for uploading images
// app.post('/api/upload', upload.single('image'), async (req, res) => {
//     try {
//         const newImage = new Image({
//             data: req.file.buffer,
//             contentType: req.file.mimetype
//         });
//         await newImage.save();
//         res.json({ success: true });
//     } catch (error) {
//         console.error('Error uploading image:', error);
//         res.status(500).json({ error: 'Failed to upload image' });
//     }
// });



// // API endpoint for retrieving images
// app.get('/api/images/:id', async (req, res) => {
//     try {
//         // Retrieve the image from MongoDB based on the provided ID
//         const image = await Image.findById(req.params.id);

//         if (!image) {
//             return res.status(404).json({ error: 'Image not found' });
//         }

//         // Set the appropriate content type header
//         res.contentType(image.contentType);

//         // Send the image data
//         res.send(image.data);
//     } catch (error) {
//         console.error('Error retrieving image:', error);
//         res.status(500).json({ error: 'Failed to retrieve image' });
//     }
// });



// // API endpoint for retrieving all images with upload dates
// app.get('/api/images', async (req, res) => {
//     try {
//         // Query the database to fetch all images
//         const images = await Image.find({}, 'uploadDateTime');

//         res.json(images);
//     } catch (error) {
//         console.error('Error retrieving images:', error);
//         res.status(500).json({ error: 'Failed to retrieve images' });
//     }
// });



// // Start the server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });





// const express = require('express');
// const cors = require('cors');
// const multer = require('multer');
// const cloudinary = require('cloudinary').v2;
// const { CloudinaryStorage } = require('multer-storage-cloudinary');
// const mongoose = require('mongoose');
// const app = express();

// // Enable CORS
// app.use(cors());

// // MongoDB connection setup
// mongoose.connect('mongodb://localhost:27017/Restuarent', { useNewUrlParser: true, useUnifiedTopology: true });
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// // Cloudinary configuration
// cloudinary.config({
//   cloud_name: 'dhnfyb9bw',
//   api_key: '377977664553313',
//   api_secret: 'aDFluxAwYLUgfmgQlU11oIpMmGI'
// });

// // Define a schema for storing images (you can choose to omit this if you're not storing images locally)
// const imageSchema = new mongoose.Schema({
//   publicId: String,
//   uploadDateTime: { type: Date, default: Date.now }
// });
// const Image = mongoose.model('Image', imageSchema);

// // Multer storage configuration for Cloudinary
// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: 'uploads', // Change this to your desired folder in Cloudinary
//     allowed_formats: ['jpg', 'png'],
//     transformation: [{ width: 500, height: 500, crop: 'limit' }] // Adjust the transformation as needed
//   }
// });
// const upload = multer({ storage: storage });

// // API endpoint for uploading images
// app.post('/api/upload', upload.single('image'), async (req, res) => {
//   try {
//     // Save the image details to MongoDB (optional)
//     const newImage = new Image({
//       publicId: req.file.public_id
//     });
//     await newImage.save();

//     res.json({ success: true });
//   } catch (error) {
//     console.error('Error uploading image:', error);
//     res.status(500).json({ error: 'Failed to upload image' });
//   }
// });

// // Start the server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// const express = require('express');
// const cors = require('cors');
// const multer = require('multer');
// const cloudinary = require('cloudinary').v2;
// const { CloudinaryStorage } = require('multer-storage-cloudinary');
// const mongoose = require('mongoose');
// const app = express();

// // Enable CORS
// app.use(cors());

// // MongoDB connection setup
// mongoose.connect('mongodb://localhost:27017/Restuarent', { useNewUrlParser: true, useUnifiedTopology: true });
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// // Cloudinary configuration
// cloudinary.config({
//   cloud_name: 'dhnfyb9bw',
//   api_key: '377977664553313',
//   api_secret: 'aDFluxAwYLUgfmgQlU11oIpMmGI'
// });

// // Define a schema for storing images (you can choose to omit this if you're not storing images locally)
// const imageSchema = new mongoose.Schema({
//   publicId: String,
//   uploadDateTime: { type: Date, default: Date.now }
// });
// const Image = mongoose.model('Image', imageSchema);

// // Multer storage configuration for Cloudinary
// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: 'uploads', // Change this to your desired folder in Cloudinary
//     allowed_formats: ['jpg', 'png'],
//     transformation: [{ width: 500, height: 500, crop: 'limit' }] // Adjust the transformation as needed
//   }
// });
// const upload = multer({ storage: storage });

// // // API endpoint for uploading images
// // app.post('/api/upload', upload.single('image'), async (req, res) => {
// //   try {
// //     // Save the image details to MongoDB (optional)
// //     const newImage = new Image({
// //       publicId: req.file.public_id
// //     });
// //     await newImage.save();

// //     // Upload image to Cloudinary
// //     const cloudinaryResponse = await cloudinary.uploader.upload(req.file.path);

// //     res.json({ success: true, url: cloudinaryResponse.url });
// //   } catch (error) {
// //     console.error('Error uploading image:', error);
// //     res.status(500).json({ error: 'Failed to upload image' });
// //   }
// // });

// // API endpoint for uploading images
// app.post('/api/upload', upload.single('file'), async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ error: 'No file uploaded' });
//     }

//     // You can access Cloudinary-specific properties like 'public_id' if needed
//     console.log('Uploaded image public ID:', req.file.public_id);

//     // Send back the Cloudinary URL of the uploaded image
//     res.json({ url: req.file.path });
//   } catch (error) {
//     console.error('Error uploading image:', error);
//     res.status(500).json({ error: 'Failed to upload image' });
//   }
// });

// // Start the server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

const express = require('express');
const cors = require('cors');
const multer = require('multer');
const bodyParser = require('body-parser');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const mongoose = require('mongoose');
const app = express();

// Enable CORS
app.use(cors());


// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));




// MongoDB connection setup
mongoose.connect('mongodb://localhost:27017/Restuarent', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Cloudinary configuration
cloudinary.config({
  cloud_name: 'dhnfyb9bw',
  api_key: '377977664553313',
  api_secret: 'aDFluxAwYLUgfmgQlU11oIpMmGI'
});

// Define a schema for storing images (you can choose to omit this if you're not storing images locally)
const imageSchema = new mongoose.Schema({
  publicId: String,
  uploadDateTime: { type: Date, default: Date.now }
});
const Image = mongoose.model('Image', imageSchema);

// Multer storage configuration for Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads', // Change this to your desired folder in Cloudinary
    allowed_formats: ['jpg', 'png'],
    transformation: [{ width: 500, height: 500, crop: 'limit' }] // Adjust the transformation as needed
  }
});
const upload = multer({ storage: storage });

// API endpoint for uploading images
app.post('/api/upload', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Extract the public ID from the Cloudinary URL
    const publicId = req.file.path.substring(req.file.path.lastIndexOf('/') + 1, req.file.path.lastIndexOf('.'));
    console.log('Uploaded image public ID:', publicId);
    
    // Save the image details to MongoDB (optional)
    const newImage = new Image({
      publicId: publicId
    });
    await newImage.save();

    // Send back the Cloudinary URL of the uploaded image
    res.json({ success: true, url: req.file.path });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ error: 'Failed to upload image' });
  }
});







// API endpoint for fetching all uploaded images
app.get('/api/images', async (req, res) => {
  try {
    // Query MongoDB for all image documents
    const images = await Image.find();
    
    // Construct an array of image URLs
    const imageUrls = images.map(image => {
      return {
        publicId: image.publicId,
        url: `https://res.cloudinary.com/${cloudinary.config().cloud_name}/image/upload/${image.publicId}.jpg` // Adjust the URL format based on your Cloudinary configuration
      };
    });
    
    // Send the array of image URLs as JSON response
    res.json(imageUrls);
  } catch (error) {
    console.error('Error fetching images:', error);
    res.status(500).json({ error: 'Failed to fetch images' });
  }
});





// Define a schema for storing bill details
const billSchema = new mongoose.Schema({
  totalAmount: Number,
  referenceNumber: String,
  detectedObjects: Object,
  createdAt: { type: Date, default: Date.now },
  // Add more fields as needed
});


const Bill = mongoose.model('Bill', billSchema);


// API endpoint for saving bill details
app.post('/api/bill', async (req, res) => {
  try {
    const { totalAmount, referenceNumber, detectedObjects } = req.body;
    const newBill = new Bill({
      totalAmount,
      referenceNumber,
      detectedObjects,

      // Add more fields as needed
    });
    await newBill.save();
    res.status(201).json({ message: 'Bill details saved successfully' });
  } catch (error) {
    console.error('Error saving bill details:', error);
    res.status(500).json({ error: 'Failed to save bill details' });
  }
});










// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});