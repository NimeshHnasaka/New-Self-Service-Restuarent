import React from 'react';
import './ObjectDetection.css'
function ShowImage({ imageUrl }) {
  return (
    <div>
      <h2>Uploaded Image</h2>
      <img src={imageUrl} alt="Uploaded" style={{ maxWidth: '100%' }} />
    </div>
  );
}

export default ShowImage;

