import React, { useState, useEffect } from 'react';
import ShowImage from './ShowImage'; // Assuming you have your ShowImage component defined in a separate file
import axios from 'axios';

function AllImages() {
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    // Function to fetch all uploaded image URLs from your server
    const fetchImageUrls = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/images'); // Assuming your API endpoint for fetching images is '/api/images'
        setImageUrls(response.data); // Assuming response.data is an array of image URLs
      } catch (error) {
        console.error('Error fetching image URLs:', error);
      }
    };

    fetchImageUrls(); // Call the function to fetch image URLs when the component mounts
  }, []); // Empty dependency array to ensure this effect runs only once

  return (
    <div>
      <h1>All Uploaded Images</h1>
      <div className="image-grid">
        {imageUrls.map((imageUrl, index) => (
          <ShowImage key={index} imageUrl={imageUrl} />
        ))}
      </div>
    </div>
  );
}

export default AllImages;