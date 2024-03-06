

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
app.use(express.json());



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






// API endpoint for object detection
app.post('/api/detectObjects', async (req, res) => {
  try {
    const imageData = req.body.imageData; // Assuming imageData is sent in the request body
    const imageBuffer = Buffer.from(imageData, 'base64');
    const imageTensor = tf.node.decodeImage(imageBuffer);
    const predictions = await model.detect(imageTensor);
    res.json(predictions);
  } catch (error) {
    console.error('Error detecting objects:', error);
    res.status(500).json({ error: 'Error detecting objects' });
  }
});





app.get('/model.json', async (req, res) => {
  try {
    // Fetch the model JSON file from GitHub
   // const { data } = await axios.get('https://raw.githubusercontent.com/NimeshHnasaka/New-Self-Service-Restuarent/Test3/frontend/src/tfjs.model/model.json');
   const { data } = await axios.get('https://github.com/NimeshHnasaka/New-Self-Service-Restuarent/blob/ff3dc8a9b7de7aaa5672912810f0f30cf6b80a27/frontend/src/tfjs.model/model.json');
   
   // Set the appropriate headers
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Send the model JSON file as the response
    res.send(data);
  } catch (error) {
    // Handle errors
    console.error('Error fetching model:', error);
    res.status(500).send('Error fetching model');
  }
});




// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

